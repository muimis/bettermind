import { NextResponse } from 'next/server';
import { globalBookingStore } from '@/lib/booking-store';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bookingId } = await params;
    const body = await req.json();
    const { action, actor_email } = body;

    if (action === 'reassign') {
      const { booking_item_id, new_practitioner_id } = body;
      if (!booking_item_id || !new_practitioner_id) {
        return NextResponse.json({ error: 'Missing booking_item_id or new_practitioner_id.' }, { status: 400 });
      }
      const updatedItem = globalBookingStore.reassignPractitioner(
        booking_item_id,
        new_practitioner_id,
        actor_email || 'coordinator@bettermind.clinic'
      );
      return NextResponse.json({ success: true, updatedItem });
    }

    if (action === 'reschedule') {
      const { booking_item_id, new_start_time, new_end_time } = body;
      if (!booking_item_id || !new_start_time || !new_end_time) {
        return NextResponse.json({ error: 'Missing time details.' }, { status: 400 });
      }
      const updatedItem = globalBookingStore.rescheduleItem(
        booking_item_id,
        new_start_time,
        new_end_time,
        true // Staff override
      );
      return NextResponse.json({ success: true, updatedItem });
    }

    if (action === 'cancel') {
      const { reason } = body;
      const cancelledBooking = globalBookingStore.cancelBooking(
        bookingId,
        reason || 'Desk cancellation',
        actor_email || 'coordinator@bettermind.clinic'
      );
      return NextResponse.json({ success: true, cancelledBooking });
    }

    if (action === 'add_service') {
      const { service_id, mode } = body;
      if (!service_id || !mode) {
        return NextResponse.json({ error: 'Missing service or mode.' }, { status: 400 });
      }
      const newItem = globalBookingStore.addServiceToBooking(bookingId, service_id, mode);
      return NextResponse.json({ success: true, newItem });
    }

    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
