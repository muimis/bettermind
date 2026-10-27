import { describe, it, expect, beforeEach } from 'vitest';
import { BookingStore } from '../src/lib/booking-store';
import { formatIST, intervalsOverlap, hasMinimumGap } from '../src/lib/ist-utils';

describe('Better Mind: Database & Booking Rules Engine', () => {
  let store: BookingStore;

  beforeEach(() => {
    store = new BookingStore();
  });

  // Acceptance Test 1: Concurrency Collision
  it('enforces exclusion: exactly one booking succeeds when two try to take the last open slot', () => {
    // Psychiatry only has 1 practitioner in the pool (Dr. Arun Nair)
    const psychiatry = store.services.find(s => s.slug === 'psychiatry-consultation')!;
    const slotStart = '2026-11-10T10:00:00+05:30';
    const slotEnd = '2026-11-10T10:45:00+05:30';

    // Patient 1 books the slot
    const booking1 = store.confirmBooking({
      full_name: 'Patient One',
      email: 'patient1@example.com',
      phone: '+919999900001',
      items: [
        { service_id: psychiatry.id, mode: 'online', start_time: slotStart, end_time: slotEnd }
      ]
    });

    expect(booking1.status).toBe('confirmed');
    expect(booking1.items?.[0].practitioner?.name).toContain('Dr. Arun Nair');

    // Patient 2 attempts to book the EXACT SAME slot at the same moment
    expect(() => {
      store.confirmBooking({
        full_name: 'Patient Two',
        email: 'patient2@example.com',
        phone: '+919999900002',
        items: [
          { service_id: psychiatry.id, mode: 'online', start_time: slotStart, end_time: slotEnd }
        ]
      });
    }).toThrow(/EXCLUSION_VIOLATION/);
  });

  // Acceptance Test 2: Multi-Service Booking (3 Services, No Overlap, In-Person Gap Enforced)
  it('allows a patient to book 3 services without overlap, enforcing the 15-minute gap for in-person', () => {
    const assessment = store.services.find(s => s.slug === 'initial-assessment')!; // 45m
    const psychology = store.services.find(s => s.slug === 'clinical-psychology')!; // 50m
    const yoga = store.services.find(s => s.slug === 'therapeutic-yoga')!; // 60m

    // Service 1: 09:00 - 09:45 (online)
    // Gap: 15 mins (09:45 - 10:00)
    // Service 2: 10:00 - 10:50 (in-person)
    // Gap: 20 mins (10:50 - 11:10) >= 15m
    // Service 3: 11:10 - 12:10 (in-person)
    const booking = store.confirmBooking({
      full_name: 'Multi Care Patient',
      email: 'multicare@example.com',
      phone: '+919999900003',
      items: [
        {
          service_id: assessment.id,
          mode: 'online',
          start_time: '2026-11-10T09:00:00+05:30',
          end_time: '2026-11-10T09:45:00+05:30'
        },
        {
          service_id: psychology.id,
          mode: 'in_person',
          start_time: '2026-11-10T10:00:00+05:30',
          end_time: '2026-11-10T10:50:00+05:30'
        },
        {
          service_id: yoga.id,
          mode: 'in_person',
          start_time: '2026-11-10T11:10:00+05:30',
          end_time: '2026-11-10T12:10:00+05:30'
        }
      ]
    });

    expect(booking.status).toBe('confirmed');
    expect(booking.items?.length).toBe(3);
    // All 3 services have assigned practitioners from their respective pools
    expect(booking.items?.[0].practitioner).toBeDefined();
    expect(booking.items?.[1].practitioner).toBeDefined();
    expect(booking.items?.[2].practitioner).toBeDefined();
  });

  // Acceptance Test 2b: Multi-Service Rejection on Overlap
  it('rejects a booking if any two services in the basket overlap', () => {
    const psychology = store.services.find(s => s.slug === 'clinical-psychology')!;
    const nutrition = store.services.find(s => s.slug === 'dietetics-nutrition')!;

    expect(() => {
      store.confirmBooking({
        full_name: 'Overlap Patient',
        email: 'overlap@example.com',
        phone: '+919999900004',
        items: [
          {
            service_id: psychology.id,
            mode: 'online',
            start_time: '2026-11-10T10:00:00+05:30',
            end_time: '2026-11-10T10:50:00+05:30'
          },
          {
            service_id: nutrition.id,
            mode: 'online',
            start_time: '2026-11-10T10:30:00+05:30', // Clashes with psychology
            end_time: '2026-11-10T11:15:00+05:30'
          }
        ]
      });
    }).toThrow(/overlap/i);
  });

  // Acceptance Test 2c: In-Person Gap Rejection
  it('rejects an in-person session if there is less than a 15-minute gap', () => {
    const psychology = store.services.find(s => s.slug === 'clinical-psychology')!;
    const yoga = store.services.find(s => s.slug === 'therapeutic-yoga')!;

    expect(() => {
      store.confirmBooking({
        full_name: 'No Gap Patient',
        email: 'nogap@example.com',
        phone: '+919999900005',
        items: [
          {
            service_id: psychology.id,
            mode: 'in_person',
            start_time: '2026-11-10T10:00:00+05:30',
            end_time: '2026-11-10T10:50:00+05:30'
          },
          {
            service_id: yoga.id,
            mode: 'in_person',
            start_time: '2026-11-10T10:55:00+05:30', // Only 5 mins gap (< 15 mins)
            end_time: '2026-11-10T11:55:00+05:30'
          }
        ]
      });
    }).toThrow(/minimum 15-minute gap/i);
  });

  // Acceptance Test 3: Cancellation Immediately Frees Slot
  it('frees the slot immediately when a booking is cancelled, allowing another patient to take it', () => {
    const psychiatry = store.services.find(s => s.slug === 'psychiatry-consultation')!;
    const slotStart = '2026-11-10T14:00:00+05:30';
    const slotEnd = '2026-11-10T14:45:00+05:30';

    // Patient 1 books
    const booking1 = store.confirmBooking({
      full_name: 'Patient Cancel',
      email: 'cancel@example.com',
      phone: '+919999900006',
      items: [{ service_id: psychiatry.id, mode: 'online', start_time: slotStart, end_time: slotEnd }]
    });

    // Verify slot is now taken
    expect(() => {
      store.confirmBooking({
        full_name: 'Patient Wait',
        email: 'wait@example.com',
        phone: '+919999900007',
        items: [{ service_id: psychiatry.id, mode: 'online', start_time: slotStart, end_time: slotEnd }]
      });
    }).toThrow(/EXCLUSION_VIOLATION/);

    // Cancel Booking 1
    store.cancelBooking(booking1.id, 'Patient had an emergency');

    // Patient 2 can now successfully book that exact slot!
    const booking2 = store.confirmBooking({
      full_name: 'Patient Wait',
      email: 'wait@example.com',
      phone: '+919999900007',
      items: [{ service_id: psychiatry.id, mode: 'online', start_time: slotStart, end_time: slotEnd }]
    });

    expect(booking2.status).toBe('confirmed');
  });

  // Acceptance Test 4: Reassign Only Offers Free Practitioners
  it('reassigns a practitioner and rejects assignment to a practitioner who has a clash', () => {
    const psychology = store.services.find(s => s.slug === 'clinical-psychology')!; // Dr. Arun & Dr. Meera
    const slotStart = '2026-11-10T11:00:00+05:30';
    const slotEnd = '2026-11-10T11:50:00+05:30';

    // Book Dr. Arun for a separate session
    const bookingA = store.confirmBooking({
      full_name: 'Busy Person',
      email: 'busy@example.com',
      phone: '+919999900008',
      items: [{ service_id: psychology.id, mode: 'online', start_time: slotStart, end_time: slotEnd }]
    });

    // Book another session at the same time (allocated to Dr. Meera)
    const bookingB = store.confirmBooking({
      full_name: 'Second Person',
      email: 'second@example.com',
      phone: '+919999900009',
      items: [{ service_id: psychology.id, mode: 'online', start_time: slotStart, end_time: slotEnd }]
    });

    const itemB = bookingB.items![0];
    const arun = store.practitioners.find(p => p.email === 'dr.arun@bettermind.clinic')!;

    // Reassigning itemB to Dr. Arun must fail because Dr. Arun is already booked at that slot!
    expect(() => {
      store.reassignPractitioner(itemB.id, arun.id, 'coordinator@bettermind.clinic');
    }).toThrow(/already has an appointment/i);
  });

  // Acceptance Test 5: Practitioner on Leave Never Appears Free
  it('never marks a practitioner as free if they are on leave', () => {
    const drMeera = store.practitioners.find(p => p.email === 'dr.meera@bettermind.clinic')!;
    const drArun = store.practitioners.find(p => p.email === 'dr.arun@bettermind.clinic')!;

    // Put Dr. Meera on leave for all of Nov 11, 2026
    store.addLeave(
      drMeera.id,
      '2026-11-11T00:00:00+05:30',
      '2026-11-11T23:59:59+05:30',
      'Annual Medical Conference'
    );

    // Initial Assessment pool consists of Dr. Meera and Ananya Roy
    const assessment = store.services.find(s => s.slug === 'initial-assessment')!;
    const slots = store.getAvailableSlots(assessment.id, 'online', '2026-11-11');

    // Each slot should only have capacity = 1 (Ananya Roy only, Dr. Meera excluded)
    expect(slots.length).toBeGreaterThan(0);
    for (const slot of slots) {
      expect(slot.free_capacity).toBe(1);
    }
  });

  // Acceptance Test 6: Hold Expiry Returns Slot
  it('releases an expired hold back into the free capacity', () => {
    const dietetics = store.services.find(s => s.slug === 'dietetics-nutrition')!; // Only Priya Sharma in pool (capacity = 1)
    const slotStart = '2026-11-12T10:00:00+05:30';
    const slotEnd = '2026-11-12T10:45:00+05:30';

    // Place a hold
    const hold = store.createSlotHold(dietetics.id, 'online', slotStart, slotEnd, 'session_abc_123');
    expect(hold.id).toBeDefined();

    // Trying to hold again should fail (capacity = 1)
    expect(() => {
      store.createSlotHold(dietetics.id, 'online', slotStart, slotEnd, 'session_xyz_789');
    }).toThrow(/no longer available/);

    // Simulate hold expiration by backdating expires_at by 15 minutes
    hold.expires_at = new Date(Date.now() - 15 * 60 * 1000).toISOString();

    // Now another patient can hold it!
    const newHold = store.createSlotHold(dietetics.id, 'online', slotStart, slotEnd, 'session_xyz_789');
    expect(newHold.id).toBeDefined();
  });

  // Acceptance Test 7: Returning Patient Preference
  it('automatically assigns returning patients to their previous practitioner if free', () => {
    const psychology = store.services.find(s => s.slug === 'clinical-psychology')!;
    const drMeera = store.practitioners.find(p => p.email === 'dr.meera@bettermind.clinic')!;

    // First booking
    const booking1 = store.confirmBooking({
      full_name: 'Loyal Patient',
      email: 'loyal@example.com',
      phone: '+919999900010',
      items: [
        {
          service_id: psychology.id,
          mode: 'online',
          start_time: '2026-11-10T09:00:00+05:30',
          end_time: '2026-11-10T09:50:00+05:30'
        }
      ]
    });

    // Manually mark this item as completed and assigned to Dr. Meera
    const item1 = booking1.items![0];
    item1.status = 'completed';
    item1.practitioner_id = drMeera.id;
    item1.practitioner = drMeera;

    // Second booking later in the week by the same patient
    const booking2 = store.confirmBooking({
      full_name: 'Loyal Patient',
      email: 'loyal@example.com',
      phone: '+919999900010',
      items: [
        {
          service_id: psychology.id,
          mode: 'online',
          start_time: '2026-11-13T10:00:00+05:30',
          end_time: '2026-11-13T10:50:00+05:30'
        }
      ]
    });

    // The returning patient should automatically get Dr. Meera again!
    expect(booking2.items![0].practitioner?.id).toBe(drMeera.id);
  });

  // Acceptance Test 8: Services are Data (Add service with 0 code change)
  it('allows staff to add a new service and have it immediately active without code changes', () => {
    const newService = store.addService({
      name: 'Sound Therapy & Acoustic Healing',
      slug: 'sound-therapy',
      service_group: 'Wellness',
      description: 'Himalayan singing bowl frequency therapy for deep vagus nerve stimulation.',
      duration_minutes: 45,
      buffer_minutes: 15,
      allowed_mode: 'in_person',
      fee: 0.0,
      requires_initial_consult: false,
      is_active: true
    });

    const rajesh = store.practitioners.find(p => p.email === 'rajesh.kumar@bettermind.clinic')!;
    store.linkPractitionerToService(newService.id, rajesh.id);

    const activeServices = store.getServices();
    expect(activeServices.some(s => s.slug === 'sound-therapy')).toBe(true);

    const slots = store.getAvailableSlots(newService.id, 'in_person', '2026-11-16');
    expect(slots.length).toBeGreaterThan(0);
  });

  // Acceptance Test 9: Notifications never name the service
  it('ensures notification logs never disclose sensitive service names', () => {
    const psychology = store.services.find(s => s.slug === 'clinical-psychology')!;
    const booking = store.confirmBooking({
      full_name: 'Private Person',
      email: 'private@example.com',
      phone: '+919999900011',
      items: [
        {
          service_id: psychology.id,
          mode: 'online',
          start_time: '2026-11-10T15:00:00+05:30',
          end_time: '2026-11-10T15:50:00+05:30'
        }
      ]
    });

    const notif = store.notificationLogs.find(n => n.booking_id === booking.id)!;
    expect(notif).toBeDefined();
    expect(notif.subject).toBe('Your Better Mind appointment confirmation');
    // Does NOT say "Clinical Psychology & Psychotherapy"
    expect(notif.content).not.toContain('Clinical Psychology');
    expect(notif.content).toContain('Your appointment with Better Mind has been confirmed');
  });

  // Acceptance Test 10: Export includes all bookings
  it('includes every booking in the data export file', () => {
    const assessment = store.services.find(s => s.slug === 'initial-assessment')!;
    store.confirmBooking({
      full_name: 'Export Test Patient',
      email: 'export@example.com',
      phone: '+919999900012',
      items: [
        {
          service_id: assessment.id,
          mode: 'online',
          start_time: '2026-11-10T16:00:00+05:30',
          end_time: '2026-11-10T16:45:00+05:30'
        }
      ]
    });

    const exported = store.exportAllBookings();
    expect(exported.length).toBeGreaterThan(0);
    expect(exported.some(e => e.patient_email === 'export@example.com')).toBe(true);
  });
});
