import { NextResponse } from 'next/server';
import { globalBookingStore } from '@/lib/booking-store';

export async function GET(req: Request) {
  try {
    const services = globalBookingStore.getServices(true); // Include hidden
    return NextResponse.json({ success: true, services });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, service_group, description, duration_minutes, buffer_minutes, allowed_mode, fee, requires_initial_consult, actor_email } = body;

    if (!name || !service_group || !description || !duration_minutes) {
      return NextResponse.json({ error: 'Please provide all required service fields.' }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newService = globalBookingStore.addService({
      name,
      slug,
      service_group,
      description,
      duration_minutes: Number(duration_minutes),
      buffer_minutes: Number(buffer_minutes) || 10,
      allowed_mode: allowed_mode || 'both',
      fee: Number(fee) || 0,
      requires_initial_consult: Boolean(requires_initial_consult),
      is_active: true
    });

    // If practitioners passed, link to pool
    if (Array.isArray(body.practitioner_ids)) {
      for (const pId of body.practitioner_ids) {
        globalBookingStore.linkPractitionerToService(newService.id, pId);
      }
    }

    // Audit log
    globalBookingStore.auditLogs.push({
      id: crypto.randomUUID(),
      actor_email: actor_email || 'admin@bettermind.clinic',
      action: 'add_service',
      entity_type: 'service',
      entity_id: newService.id,
      details: { name: newService.name, slug: newService.slug },
      created_at: new Date().toISOString()
    });

    return NextResponse.json({ success: true, service: newService });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, is_active, name, description, duration_minutes, fee, actor_email } = body;

    if (!id) {
      return NextResponse.json({ error: 'Service ID required.' }, { status: 400 });
    }

    const updates: any = {};
    if (typeof is_active === 'boolean') updates.is_active = is_active;
    if (name) updates.name = name;
    if (description) updates.description = description;
    if (duration_minutes) updates.duration_minutes = Number(duration_minutes);
    if (fee !== undefined) updates.fee = Number(fee);

    const updated = globalBookingStore.updateService(id, updates);

    // Audit log
    globalBookingStore.auditLogs.push({
      id: crypto.randomUUID(),
      actor_email: actor_email || 'admin@bettermind.clinic',
      action: 'update_service',
      entity_type: 'service',
      entity_id: id,
      details: updates,
      created_at: new Date().toISOString()
    });

    return NextResponse.json({ success: true, service: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
