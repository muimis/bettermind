import {
  Service,
  Practitioner,
  WorkingHours,
  PractitionerLeave,
  ClinicSettings,
  Patient,
  Booking,
  BookingItem,
  Hold,
  StaffProfile,
  AuditLog,
  NotificationLog,
  ConfirmBookingInput,
  SessionMode
} from './types';
import { intervalsOverlap, hasMinimumGap, getISTDayOfWeek, formatIST } from './ist-utils';
import crypto from 'crypto';

export class BookingStore {
  services: Service[] = [];
  practitioners: Practitioner[] = [];
  servicePools: { service_id: string; practitioner_id: string }[] = [];
  workingHours: WorkingHours[] = [];
  leaves: PractitionerLeave[] = [];
  patients: Patient[] = [];
  bookings: Booking[] = [];
  bookingItems: BookingItem[] = [];
  holds: Hold[] = [];
  staffProfiles: StaffProfile[] = [];
  auditLogs: AuditLog[] = [];
  notificationLogs: NotificationLog[] = [];

  settings: ClinicSettings = {
    general: {
      clinic_name: 'Better Mind',
      tagline: 'Integrated Mental Health & Whole-Person Wellbeing',
      clinic_address: 'Better Mind Partner Clinic Hub (Location to confirm before launch)',
      phone: '+91 80 4718 2200',
      email: 'care@bettermind.clinic',
      crisis_hotlines: [
        { name: 'Tele-MANAS', number: '14416', details: 'Government of India 24/7 Mental Health Helpline' },
        { name: 'KIRAN', number: '1800-599-0019', details: 'National 24/7 Mental Health Helpline' }
      ],
      timezone: 'Asia/Kolkata'
    },
    booking_rules: {
      min_notice_hours: 2,
      max_advance_days: 30,
      in_person_gap_minutes: 15,
      cancellation_window_hours: 4,
      hold_duration_minutes: 10
    }
  };

  constructor() {
    this.seedDefaults();
  }

  seedDefaults() {
    // 1. Services (Grouped: Start here, Mind, Body, Wellness)
    this.services = [
      {
        id: '11111111-1111-1111-1111-111111111111',
        name: 'Initial Care Assessment & Triage',
        slug: 'initial-assessment',
        service_group: 'Start here',
        description: 'Not sure where to begin? Speak with a clinical care coordinator who evaluates your needs and routes you to the right psychology, psychiatry, or wellness specialist.',
        duration_minutes: 45,
        buffer_minutes: 10,
        allowed_mode: 'both',
        fee: 0.00,
        requires_initial_consult: false,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '22222222-2222-2222-2222-222222222221',
        name: 'Clinical Psychology & Psychotherapy',
        slug: 'clinical-psychology',
        service_group: 'Mind',
        description: 'Evidence-based cognitive and psychotherapy sessions for anxiety, depression, trauma, relational challenges, and personal growth.',
        duration_minutes: 50,
        buffer_minutes: 10,
        allowed_mode: 'both',
        fee: 1800.00,
        requires_initial_consult: false,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        name: 'Psychiatry Consultation',
        slug: 'psychiatry-consultation',
        service_group: 'Mind',
        description: 'Comprehensive psychiatric evaluation, diagnosis, medical management, and holistic treatment planning by a specialist psychiatrist.',
        duration_minutes: 45,
        buffer_minutes: 15,
        allowed_mode: 'both',
        fee: 2200.00,
        requires_initial_consult: true,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '33333333-3333-3333-3333-333333333331',
        name: 'Clinical Dietetics & Gut-Brain Nutrition',
        slug: 'dietetics-nutrition',
        service_group: 'Body',
        description: 'Nutritional planning tailored for mood regulation, hormonal balance, gut-brain microbiome health, and metabolic wellbeing.',
        duration_minutes: 45,
        buffer_minutes: 15,
        allowed_mode: 'both',
        fee: 1500.00,
        requires_initial_consult: false,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '33333333-3333-3333-3333-333333333332',
        name: 'Therapeutic Yoga & Somatic Movement',
        slug: 'therapeutic-yoga',
        service_group: 'Body',
        description: '1-on-1 guided somatic movement, polyvagal breathwork, and body-based grounding to release accumulated nervous system tension.',
        duration_minutes: 60,
        buffer_minutes: 15,
        allowed_mode: 'both',
        fee: 1400.00,
        requires_initial_consult: false,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '44444444-4444-4444-4444-444444444441',
        name: 'Mindfulness & Stress Management',
        slug: 'mindfulness-stress-management',
        service_group: 'Wellness',
        description: 'Evidence-based cognitive grounding techniques, heart-rate variability pacing, and practical nervous system regulation for daily resilience.',
        duration_minutes: 45,
        buffer_minutes: 10,
        allowed_mode: 'both',
        fee: 1200.00,
        requires_initial_consult: false,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    // 2. Verified Specialist Practitioners
    this.practitioners = [
      {
        id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        name: 'Dr. Arun Nair',
        email: 'dr.arun@bettermind.clinic',
        phone: '+91 80 4718 2201',
        gender: 'male',
        languages: ['English', 'Hindi', 'Malayalam'],
        bio: 'Senior Consultant Psychiatrist with over 12 years of clinical practice in adult mood disorders, neurodiversity, and integrative psychiatric care.',
        qualifications: 'MD Psychiatry (NIMHANS), MBBS',
        registration_number: 'KMC Reg # 64921',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        name: 'Dr. Meera Sen',
        email: 'dr.meera@bettermind.clinic',
        phone: '+91 80 4718 2202',
        gender: 'female',
        languages: ['English', 'Hindi', 'Bengali'],
        bio: 'Senior Clinical Psychologist specializing in trauma recovery (EMDR & TF-CBT), relational attachment therapy, and existential burnout.',
        qualifications: 'M.Phil Clinical Psychology (NIMHANS), Ph.D.',
        registration_number: 'RCI Reg # A39104',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        name: 'Priya Sharma',
        email: 'priya.sharma@bettermind.clinic',
        phone: '+91 80 4718 2203',
        gender: 'female',
        languages: ['English', 'Hindi'],
        bio: 'Lead Clinical Dietitian specializing in the gut-brain axis, psychobiotics, endocrine health, and mindful eating habits.',
        qualifications: 'M.Sc. Clinical Nutrition & Dietetics (Manipal), RD',
        registration_number: 'IDA Reg # 54321',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'dddddddd-dddd-dddd-dddd-dddddddddddd',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@bettermind.clinic',
        phone: '+91 80 4718 2204',
        gender: 'male',
        languages: ['English', 'Hindi', 'Tamil'],
        bio: 'Certified Somatic Experiencing Practitioner and Yoga Therapist working with polyvagal nervous system reset, chronic pain, and anxiety relief.',
        qualifications: 'M.Sc. Yoga Therapy (SVYASA), Certified Somatic Practitioner',
        registration_number: 'YCB Reg # 99887',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
        name: 'Ananya Roy',
        email: 'ananya.roy@bettermind.clinic',
        phone: '+91 80 4718 2205',
        gender: 'female',
        languages: ['English', 'Hindi', 'Kannada'],
        bio: 'Clinical Care Coordinator with background in psychiatric social work, ensuring seamless multi-disciplinary care handoffs and patient advocacy.',
        qualifications: 'MSW Clinical Psychiatric Social Work (TISS)',
        registration_number: 'KAPS Reg # 1120',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    // 3. Service Practitioner Pools
    this.servicePools = [
      // Initial Assessment: Dr. Meera Sen, Ananya Roy
      { service_id: '11111111-1111-1111-1111-111111111111', practitioner_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' },
      { service_id: '11111111-1111-1111-1111-111111111111', practitioner_id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee' },
      // Psychology: Dr. Arun Nair, Dr. Meera Sen
      { service_id: '22222222-2222-2222-2222-222222222221', practitioner_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' },
      { service_id: '22222222-2222-2222-2222-222222222221', practitioner_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' },
      // Psychiatry: Dr. Arun Nair
      { service_id: '22222222-2222-2222-2222-222222222222', practitioner_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' },
      // Dietetics: Priya Sharma
      { service_id: '33333333-3333-3333-3333-333333333331', practitioner_id: 'cccccccc-cccc-cccc-cccc-cccccccccccc' },
      // Yoga: Rajesh Kumar
      { service_id: '33333333-3333-3333-3333-333333333332', practitioner_id: 'dddddddd-dddd-dddd-dddd-dddddddddddd' },
      // Mindfulness: Dr. Meera Sen, Rajesh Kumar
      { service_id: '44444444-4444-4444-4444-444444444441', practitioner_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' },
      { service_id: '44444444-4444-4444-4444-444444444441', practitioner_id: 'dddddddd-dddd-dddd-dddd-dddddddddddd' }
    ];

    // 4. Working Hours (Mon-Fri 09:00 - 18:00 IST, Sat 10:00 - 14:00 IST)
    for (const p of this.practitioners) {
      for (let day = 1; day <= 5; day++) {
        this.workingHours.push({
          id: crypto.randomUUID(),
          practitioner_id: p.id,
          day_of_week: day,
          start_time: '09:00:00',
          end_time: '18:00:00',
          is_active: true
        });
      }
      this.workingHours.push({
        id: crypto.randomUUID(),
        practitioner_id: p.id,
        day_of_week: 6,
        start_time: '10:00:00',
        end_time: '14:00:00',
        is_active: true
      });
    }

    // 5. Staff Profiles
    this.staffProfiles = [
      {
        id: '99999999-9999-9999-9999-999999999991',
        email: 'admin@bettermind.clinic',
        full_name: 'Clinic Administrator',
        role: 'admin',
        created_at: new Date().toISOString()
      },
      {
        id: '99999999-9999-9999-9999-999999999992',
        email: 'coordinator@bettermind.clinic',
        full_name: 'Ananya Roy (Coordinator)',
        role: 'coordinator',
        practitioner_id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
        created_at: new Date().toISOString()
      },
      {
        id: '99999999-9999-9999-9999-999999999993',
        email: 'dr.arun@bettermind.clinic',
        full_name: 'Dr. Arun Nair (Practitioner)',
        role: 'practitioner',
        practitioner_id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        created_at: new Date().toISOString()
      },
      {
        id: '99999999-9999-9999-9999-999999999994',
        email: 'dr.meera@bettermind.clinic',
        full_name: 'Dr. Meera Sen (Practitioner)',
        role: 'practitioner',
        practitioner_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        created_at: new Date().toISOString()
      }
    ];
  }

  // --- Services Management ---
  getServices(includeHidden = false): Service[] {
    return includeHidden ? this.services : this.services.filter(s => s.is_active);
  }

  getServiceById(id: string): Service | undefined {
    return this.services.find(s => s.id === id);
  }

  addService(serviceData: Omit<Service, 'id' | 'created_at' | 'updated_at'>): Service {
    const newService: Service = {
      ...serviceData,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.services.push(newService);
    return newService;
  }

  updateService(id: string, updates: Partial<Service>): Service {
    const s = this.getServiceById(id);
    if (!s) throw new Error('Service not found');
    Object.assign(s, updates, { updated_at: new Date().toISOString() });
    return s;
  }

  // --- Practitioners & Pool Management ---
  getPractitioners(includeInactive = false): Practitioner[] {
    return includeInactive ? this.practitioners : this.practitioners.filter(p => p.is_active);
  }

  getPractitionerById(id: string): Practitioner | undefined {
    return this.practitioners.find(p => p.id === id);
  }

  addPractitioner(data: Omit<Practitioner, 'id' | 'created_at' | 'updated_at'>): Practitioner {
    const p: Practitioner = {
      ...data,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.practitioners.push(p);
    return p;
  }

  linkPractitionerToService(serviceId: string, practitionerId: string) {
    if (!this.servicePools.some(sp => sp.service_id === serviceId && sp.practitioner_id === practitionerId)) {
      this.servicePools.push({ service_id: serviceId, practitioner_id: practitionerId });
    }
  }

  addLeave(practitionerId: string, startTime: string, endTime: string, reason: string): PractitionerLeave {
    // Check overlap with existing leaves for this practitioner
    for (const l of this.leaves.filter(x => x.practitioner_id === practitionerId)) {
      if (intervalsOverlap(l.start_time, l.end_time, startTime, endTime)) {
        throw new Error('Practitioner already has leave scheduled during this time window.');
      }
    }
    const leave: PractitionerLeave = {
      id: crypto.randomUUID(),
      practitioner_id: practitionerId,
      start_time: startTime,
      end_time: endTime,
      reason,
      created_at: new Date().toISOString()
    };
    this.leaves.push(leave);
    return leave;
  }

  // --- Slot Availability Engine (Phone-first, IST) ---
  purgeExpiredHolds() {
    const now = Date.now();
    this.holds = this.holds.filter(h => new Date(h.expires_at).getTime() > now);
  }

  getAvailableSlots(
    serviceId: string,
    mode: SessionMode,
    dateStr: string // YYYY-MM-DD in IST
  ): { start_time: string; end_time: string; free_capacity: number; display_ist: string }[] {
    this.purgeExpiredHolds();
    const service = this.getServiceById(serviceId);
    if (!service || !service.is_active) return [];

    // Verify mode allowed
    if (service.allowed_mode !== 'both' && service.allowed_mode !== mode) {
      return [];
    }

    // Practitioners in service pool
    const poolPracIds = this.servicePools
      .filter(sp => sp.service_id === serviceId)
      .map(sp => sp.practitioner_id);

    const poolPracs = this.practitioners.filter(p => p.is_active && poolPracIds.includes(p.id));
    if (poolPracs.length === 0) return [];

    // Get IST day of week (0=Sun, 1=Mon, ..., 6=Sat)
    const sampleDate = new Date(`${dateStr}T12:00:00+05:30`);
    const dayOfWeek = getISTDayOfWeek(sampleDate);

    // Calculate slots between 09:00 and 18:00 IST
    const slots: { start_time: string; end_time: string; free_capacity: number; display_ist: string }[] = [];
    const duration = service.duration_minutes;
    const buffer = service.buffer_minutes;
    const stepMinutes = 60; // Slots every 60 mins on the hour

    const minNoticeMs = this.settings.booking_rules.min_notice_hours * 60 * 60 * 1000;
    const nowMs = Date.now();

    for (let hour = 9; hour < 18; hour++) {
      const hourStr = hour.toString().padStart(2, '0');
      const startIso = `${dateStr}T${hourStr}:00:00+05:30`;
      const startMs = new Date(startIso).getTime();

      // Check min notice constraint
      if (startMs - nowMs < minNoticeMs) {
        continue;
      }

      const endMs = startMs + duration * 60 * 1000;
      const endIso = new Date(endMs).toISOString();

      // For this slot [startIso, endIso), find which practitioners in pool are available
      let freePracCount = 0;

      for (const prac of poolPracs) {
        // 1. Working hours check
        const wh = this.workingHours.find(w => w.practitioner_id === prac.id && w.day_of_week === dayOfWeek && w.is_active);
        if (!wh) continue;

        const [whStartH] = wh.start_time.split(':').map(Number);
        const [whEndH] = wh.end_time.split(':').map(Number);
        if (hour < whStartH || (hour + duration / 60) > whEndH) {
          continue;
        }

        // 2. Leave check (never appear free)
        const onLeave = this.leaves.some(l =>
          l.practitioner_id === prac.id && intervalsOverlap(l.start_time, l.end_time, startIso, endIso)
        );
        if (onLeave) continue;

        // 3. Existing booking item check (excluding cancelled and awaiting_time)
        const hasBooking = this.bookingItems.some(bi =>
          bi.practitioner_id === prac.id &&
          bi.status !== 'cancelled' &&
          bi.status !== 'awaiting_time' &&
          intervalsOverlap(bi.start_time, bi.end_time, startIso, endIso)
        );
        if (hasBooking) continue;

        freePracCount++;
      }

      // 4. Subtract active holds on this service and slot
      const activeHoldsCount = this.holds.filter(h =>
        h.service_id === serviceId &&
        intervalsOverlap(h.start_time, h.end_time, startIso, endIso)
      ).length;

      const remainingCapacity = freePracCount - activeHoldsCount;
      if (remainingCapacity > 0) {
        slots.push({
          start_time: startIso,
          end_time: endIso,
          free_capacity: remainingCapacity,
          display_ist: formatIST(startIso)
        });
      }
    }

    return slots;
  }

  // --- Holds ---
  createSlotHold(serviceId: string, mode: SessionMode, startTime: string, endTime: string, sessionToken: string): Hold {
    this.purgeExpiredHolds();
    const service = this.getServiceById(serviceId);
    if (!service) throw new Error('Service not found');

    // Check availability
    const poolPracIds = this.servicePools
      .filter(sp => sp.service_id === serviceId)
      .map(sp => sp.practitioner_id);

    let freePracs = 0;
    for (const pid of poolPracIds) {
      const onLeave = this.leaves.some(l => l.practitioner_id === pid && intervalsOverlap(l.start_time, l.end_time, startTime, endTime));
      const hasBooking = this.bookingItems.some(bi =>
        bi.practitioner_id === pid &&
        bi.status !== 'cancelled' &&
        bi.status !== 'awaiting_time' &&
        intervalsOverlap(bi.start_time, bi.end_time, startTime, endTime)
      );
      if (!onLeave && !hasBooking) freePracs++;
    }

    const currentHolds = this.holds.filter(h =>
      h.service_id === serviceId && intervalsOverlap(h.start_time, h.end_time, startTime, endTime)
    ).length;

    if (freePracs - currentHolds <= 0) {
      throw new Error('This time slot is no longer available.');
    }

    const hold: Hold = {
      id: crypto.randomUUID(),
      service_id: serviceId,
      mode,
      start_time: startTime,
      end_time: endTime,
      session_token: sessionToken,
      expires_at: new Date(Date.now() + this.settings.booking_rules.hold_duration_minutes * 60 * 1000).toISOString(),
      created_at: new Date().toISOString()
    };
    this.holds.push(hold);
    return hold;
  }

  releaseSlotHold(holdId: string, sessionToken: string) {
    this.holds = this.holds.filter(h => !(h.id === holdId && h.session_token === sessionToken));
  }

  // --- Booking Confirmation (The Core Atomic Rule Engine) ---
  confirmBooking(input: ConfirmBookingInput): Booking {
    this.purgeExpiredHolds();

    if (!input.items || input.items.length === 0) {
      throw new Error('A booking must contain at least one service.');
    }

    // 1. Validate Multi-Service Conflicts Within Basket
    // Core rule: "Several services in one booking, with times that cannot clash."
    const items = input.items;
    const inPersonGap = this.settings.booking_rules.in_person_gap_minutes;

    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const itemA = items[i];
        const itemB = items[j];

        // Direct overlap
        if (intervalsOverlap(itemA.start_time, itemA.end_time, itemB.start_time, itemB.end_time)) {
          throw new Error('Selected service times in your booking overlap. Each service must have its own non-overlapping time slot.');
        }

        // In-person minimum gap requirement
        if (itemA.mode === 'in_person' || itemB.mode === 'in_person') {
          if (!hasMinimumGap(itemA.start_time, itemA.end_time, itemB.start_time, itemB.end_time, inPersonGap)) {
            throw new Error(`In-person appointments require a minimum ${inPersonGap}-minute gap between sessions.`);
          }
        }
      }
    }

    // 2. Identify or Create Patient Record
    let patient = this.patients.find(p => p.phone === input.phone || p.email === input.email);
    if (!patient) {
      patient = {
        id: crypto.randomUUID(),
        full_name: input.full_name,
        email: input.email,
        phone: input.phone,
        preferred_language: input.preferred_language || 'English',
        consent_recorded_at: new Date().toISOString(),
        consent_version: input.consent_version || 'v1.0',
        notes: input.notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      this.patients.push(patient);
    }

    // 3. Find Returning Patient History
    // "A returning patient gets their previous practitioner for that service if that person is free."
    const previousBookings = this.bookings.filter(b => b.patient_id === patient!.id && b.status !== 'cancelled');
    const previousItems = this.bookingItems.filter(bi =>
      previousBookings.some(b => b.id === bi.booking_id) && bi.status === 'completed'
    );

    // 4. Assign Practitioner For Each Item
    const assignedItems: { itemInput: typeof items[0]; practitioner: Practitioner }[] = [];

    for (const item of items) {
      const poolPracIds = this.servicePools
        .filter(sp => sp.service_id === item.service_id)
        .map(sp => sp.practitioner_id);

      // Find all free practitioners for this slot
      const freePracs: Practitioner[] = [];
      for (const pid of poolPracIds) {
        const p = this.getPractitionerById(pid);
        if (!p || !p.is_active) continue;

        // Leave check
        const onLeave = this.leaves.some(l => l.practitioner_id === pid && intervalsOverlap(l.start_time, l.end_time, item.start_time, item.end_time));
        if (onLeave) continue;

        // Active booking check
        const hasBooking = this.bookingItems.some(bi =>
          bi.practitioner_id === pid &&
          bi.status !== 'cancelled' &&
          bi.status !== 'awaiting_time' &&
          intervalsOverlap(bi.start_time, bi.end_time, item.start_time, item.end_time)
        );
        if (hasBooking) continue;

        // Already assigned in this same basket transaction
        const alreadyAssignedInBasket = assignedItems.some(a =>
          a.practitioner.id === pid && intervalsOverlap(a.itemInput.start_time, a.itemInput.end_time, item.start_time, item.end_time)
        );
        if (alreadyAssignedInBasket) continue;

        freePracs.push(p);
      }

      if (freePracs.length === 0) {
        throw new Error('EXCLUSION_VIOLATION: No practitioner is available for the selected slot. Another patient may have just confirmed it. Please choose another time.');
      }

      // Hierarchy:
      // a) Returning patient check
      let selectedPrac: Practitioner | undefined;
      const priorItem = previousItems.find(pi => pi.service_id === item.service_id);
      if (priorItem && priorItem.practitioner_id) {
        selectedPrac = freePracs.find(p => p.id === priorItem.practitioner_id);
      }

      // b) Language preference check
      if (!selectedPrac && patient.preferred_language) {
        selectedPrac = freePracs.find(p => p.languages.includes(patient!.preferred_language));
      }

      // c) Load balancing: lightest week (fewest booking items scheduled)
      if (!selectedPrac) {
        const getLoad = (pId: string) => this.bookingItems.filter(bi => bi.practitioner_id === pId && bi.status !== 'cancelled').length;
        freePracs.sort((a, b) => getLoad(a.id) - getLoad(b.id));
        selectedPrac = freePracs[0];
      }

      assignedItems.push({ itemInput: item, practitioner: selectedPrac });
    }

    // 5. Atomic Insertion
    const bookingId = crypto.randomUUID();
    const bookingRef = `BM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const secureToken = crypto.randomBytes(24).toString('hex');

    const createdBooking: Booking = {
      id: bookingId,
      booking_reference: bookingRef,
      patient_id: patient.id,
      status: 'confirmed',
      secure_token: secureToken,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      patient
    };
    this.bookings.push(createdBooking);

    const createdItems: BookingItem[] = [];
    for (const assigned of assignedItems) {
      // Simulate Database Exclusion Constraint:
      // Check if any other item exists for this practitioner at this time
      const collision = this.bookingItems.find(bi =>
        bi.practitioner_id === assigned.practitioner.id &&
        bi.status !== 'cancelled' &&
        bi.status !== 'awaiting_time' &&
        intervalsOverlap(bi.start_time, bi.end_time, assigned.itemInput.start_time, assigned.itemInput.end_time)
      );

      if (collision) {
        // Rollback entire booking
        this.bookings = this.bookings.filter(b => b.id !== bookingId);
        this.bookingItems = this.bookingItems.filter(bi => bi.booking_id !== bookingId);
        throw new Error('23P01: exclusion_violation - Concurrent booking clash detected. Another patient booked this practitioner at the same moment.');
      }

      const itemRecord: BookingItem = {
        id: crypto.randomUUID(),
        booking_id: bookingId,
        service_id: assigned.itemInput.service_id,
        practitioner_id: assigned.practitioner.id,
        mode: assigned.itemInput.mode,
        start_time: assigned.itemInput.start_time,
        end_time: assigned.itemInput.end_time,
        status: 'confirmed',
        meeting_link: assigned.itemInput.mode === 'online' ? `https://meet.bettermind.clinic/room/${crypto.randomBytes(12).toString('hex')}` : undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        service: this.getServiceById(assigned.itemInput.service_id),
        practitioner: assigned.practitioner
      };

      this.bookingItems.push(itemRecord);
      createdItems.push(itemRecord);
    }

    createdBooking.items = createdItems;

    // 6. Clean up holds for this session
    if (input.session_token) {
      this.holds = this.holds.filter(h => h.session_token !== input.session_token);
    }

    // 7. Audit log & Neutral Notification (Never name the service in notifications)
    this.auditLogs.push({
      id: crypto.randomUUID(),
      actor_email: 'patient',
      action: 'create_booking',
      entity_type: 'booking',
      entity_id: bookingId,
      details: { reference: bookingRef, items_count: createdItems.length },
      created_at: new Date().toISOString()
    });

    this.notificationLogs.push({
      id: crypto.randomUUID(),
      booking_id: bookingId,
      recipient: patient.email,
      channel: 'email',
      template_name: 'booking_confirmed',
      subject: 'Your Better Mind appointment confirmation',
      content: `Your appointment with Better Mind has been confirmed. Booking reference: ${bookingRef}. Manage your booking: https://bettermind.clinic/booking/${secureToken}`,
      sent_at: new Date().toISOString()
    });

    return createdBooking;
  }

  // --- Patient Self-Service Link ---
  getBookingBySecureToken(token: string): Booking | undefined {
    const booking = this.bookings.find(b => b.secure_token === token);
    if (!booking) return undefined;

    return {
      ...booking,
      patient: this.patients.find(p => p.id === booking.patient_id),
      items: this.bookingItems
        .filter(bi => bi.booking_id === booking.id)
        .map(bi => ({
          ...bi,
          service: this.getServiceById(bi.service_id),
          practitioner: bi.practitioner_id ? this.getPractitionerById(bi.practitioner_id) : undefined
        }))
    };
  }

  // --- Staff Desk Operations ---
  reassignPractitioner(bookingItemId: string, newPractitionerId: string, actorEmail: string = 'coordinator') {
    const item = this.bookingItems.find(bi => bi.id === bookingItemId);
    if (!item) throw new Error('Booking item not found');

    const newPrac = this.getPractitionerById(newPractitionerId);
    if (!newPrac || !newPrac.is_active) throw new Error('Invalid or inactive practitioner');

    // Check pool
    const inPool = this.servicePools.some(sp => sp.service_id === item.service_id && sp.practitioner_id === newPractitionerId);
    if (!inPool) throw new Error('Practitioner does not deliver this service');

    // Check leave
    const onLeave = this.leaves.some(l => l.practitioner_id === newPractitionerId && intervalsOverlap(l.start_time, l.end_time, item.start_time, item.end_time));
    if (onLeave) throw new Error('Practitioner is on leave during this time slot');

    // Check clash
    const clash = this.bookingItems.some(bi =>
      bi.practitioner_id === newPractitionerId &&
      bi.id !== bookingItemId &&
      bi.status !== 'cancelled' &&
      bi.status !== 'awaiting_time' &&
      intervalsOverlap(bi.start_time, bi.end_time, item.start_time, item.end_time)
    );
    if (clash) throw new Error('Practitioner already has an appointment during this time slot');

    const oldPracId = item.practitioner_id;
    item.practitioner_id = newPractitionerId;
    item.updated_at = new Date().toISOString();

    // Audit log
    this.auditLogs.push({
      id: crypto.randomUUID(),
      actor_email: actorEmail,
      action: 'reassign',
      entity_type: 'booking_item',
      entity_id: bookingItemId,
      details: { old_practitioner_id: oldPracId, new_practitioner_id: newPractitionerId },
      created_at: new Date().toISOString()
    });

    // Neutral notification
    const booking = this.bookings.find(b => b.id === item.booking_id);
    const patient = booking ? this.patients.find(p => p.id === booking.patient_id) : undefined;
    if (patient) {
      this.notificationLogs.push({
        id: crypto.randomUUID(),
        booking_id: item.booking_id,
        recipient: patient.email,
        channel: 'email',
        template_name: 'practitioner_reassigned',
        subject: 'Update regarding your Better Mind appointment',
        content: `Your appointment time remains unchanged, but your assigned care specialist has been updated to ${newPrac.name}.`,
        sent_at: new Date().toISOString()
      });
    }

    return item;
  }

  cancelBooking(bookingId: string, reason: string = 'Patient cancellation', actorEmail: string = 'patient') {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) throw new Error('Booking not found');

    booking.status = 'cancelled';
    booking.updated_at = new Date().toISOString();

    for (const item of this.bookingItems.filter(bi => bi.booking_id === bookingId)) {
      item.status = 'cancelled';
      item.updated_at = new Date().toISOString();
    }

    this.auditLogs.push({
      id: crypto.randomUUID(),
      actor_email: actorEmail,
      action: 'cancel',
      entity_type: 'booking',
      entity_id: bookingId,
      details: { reason },
      created_at: new Date().toISOString()
    });

    return booking;
  }

  rescheduleItem(bookingItemId: string, newStartTime: string, newEndTime: string, isStaff: boolean = false) {
    const item = this.bookingItems.find(bi => bi.id === bookingItemId);
    if (!item) throw new Error('Booking item not found');

    // If patient, check notice window
    if (!isStaff) {
      const currentStartMs = new Date(item.start_time).getTime();
      const cancelWindowMs = this.settings.booking_rules.cancellation_window_hours * 60 * 60 * 1000;
      if (currentStartMs - Date.now() < cancelWindowMs) {
        throw new Error(`Changes must be made at least ${this.settings.booking_rules.cancellation_window_hours} hours before the appointment. Please contact the desk.`);
      }
    }

    // Check practitioner availability
    if (item.practitioner_id) {
      const clash = this.bookingItems.some(bi =>
        bi.practitioner_id === item.practitioner_id &&
        bi.id !== bookingItemId &&
        bi.status !== 'cancelled' &&
        bi.status !== 'awaiting_time' &&
        intervalsOverlap(bi.start_time, bi.end_time, newStartTime, newEndTime)
      );
      if (clash) {
        throw new Error('Assigned specialist is not free at the requested time.');
      }
    }

    item.start_time = newStartTime;
    item.end_time = newEndTime;
    item.status = 'rescheduled';
    item.updated_at = new Date().toISOString();

    return item;
  }

  addServiceToBooking(bookingId: string, serviceId: string, mode: SessionMode) {
    const booking = this.bookings.find(b => b.id === bookingId);
    if (!booking) throw new Error('Booking not found');

    const service = this.getServiceById(serviceId);
    if (!service) throw new Error('Service not found');

    const newItem: BookingItem = {
      id: crypto.randomUUID(),
      booking_id: bookingId,
      service_id: serviceId,
      mode,
      start_time: new Date().toISOString(), // placeholder until patient selects
      end_time: new Date(Date.now() + service.duration_minutes * 60 * 1000).toISOString(),
      status: 'awaiting_time',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      service
    };

    this.bookingItems.push(newItem);
    return newItem;
  }

  exportAllBookings(): any[] {
    return this.bookings.map(b => {
      const patient = this.patients.find(p => p.id === b.patient_id);
      const items = this.bookingItems.filter(bi => bi.booking_id === b.id).map(bi => ({
        id: bi.id,
        service: this.getServiceById(bi.service_id)?.name,
        practitioner: bi.practitioner_id ? this.getPractitionerById(bi.practitioner_id)?.name : 'Unassigned',
        mode: bi.mode,
        start_time: bi.start_time,
        end_time: bi.end_time,
        status: bi.status
      }));

      return {
        booking_reference: b.booking_reference,
        created_at: b.created_at,
        status: b.status,
        patient_name: patient?.full_name,
        patient_phone: patient?.phone,
        patient_email: patient?.email,
        items
      };
    });
  }
}

// Global Singleton Store Instance
export const globalBookingStore = new BookingStore();
