import { NextResponse } from 'next/server';
import { globalBookingStore } from '@/lib/booking-store';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    const practitionerId = searchParams.get('practitioner_id');
    const status = searchParams.get('status');
    const serviceId = searchParams.get('service_id');
    const search = searchParams.get('search')?.toLowerCase();

    // 1. Fetch bookings
    let bookings = globalBookingStore.bookings.map(b => {
      const patient = globalBookingStore.patients.find(p => p.id === b.patient_id);
      const items = globalBookingStore.bookingItems.filter(bi => bi.booking_id === b.id).map(bi => ({
        ...bi,
        service: globalBookingStore.getServiceById(bi.service_id),
        practitioner: bi.practitioner_id ? globalBookingStore.getPractitionerById(bi.practitioner_id) : undefined
      }));
      return { ...b, patient, items };
    });

    // 2. Role-Level Access Enforcement (Practitioner sees only their own patients & items)
    if (role === 'practitioner' && practitionerId) {
      bookings = bookings
        .map(b => {
          const myItems = (b.items || []).filter(item => item.practitioner_id === practitionerId);
          return myItems.length > 0 ? { ...b, items: myItems } : null;
        })
        .filter(Boolean) as typeof bookings;
    }

    // 3. Search and Filters
    if (status && status !== 'all') {
      bookings = bookings.filter(b => b.status === status);
    }

    if (serviceId && serviceId !== 'all') {
      bookings = bookings.filter(b => b.items?.some(i => i.service_id === serviceId));
    }

    if (search) {
      bookings = bookings.filter(b =>
        b.booking_reference.toLowerCase().includes(search) ||
        b.patient?.full_name.toLowerCase().includes(search) ||
        b.patient?.phone.includes(search) ||
        b.patient?.email.toLowerCase().includes(search)
      );
    }

    // Sort descending by created_at
    bookings.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({ success: true, bookings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST: Manual Intake Booking entered by Coordinator/Admin for a caller
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { full_name, email, phone, preferred_language, notes, items, actor_email } = body;

    if (!full_name || !phone || !email || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required patient or service details.' }, { status: 400 });
    }

    const booking = globalBookingStore.confirmBooking({
      full_name,
      email,
      phone,
      preferred_language: preferred_language || 'English',
      notes: notes ? `[Manual Phone/Message Intake] ${notes}` : '[Manual Intake]',
      consent_version: 'v1.0 (Verbal consent taken by desk)',
      items
    });

    // Log audit
    globalBookingStore.auditLogs.push({
      id: crypto.randomUUID(),
      actor_email: actor_email || 'coordinator@bettermind.clinic',
      action: 'manual_intake_booking',
      entity_type: 'booking',
      entity_id: booking.id,
      details: { reference: booking.booking_reference },
      created_at: new Date().toISOString()
    });

    return NextResponse.json({ success: true, booking });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
