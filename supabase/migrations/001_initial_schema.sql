-- ====================================================================
-- Better Mind: Database Schema & Booking Engine (Phase 1)
-- ====================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS btree_gist;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Services Table (Services are data: staff can add/hide with 0 code changes)
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    service_group TEXT NOT NULL CHECK (service_group IN ('Start here', 'Mind', 'Body', 'Wellness')),
    description TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
    buffer_minutes INTEGER NOT NULL DEFAULT 10 CHECK (buffer_minutes >= 0),
    allowed_mode TEXT NOT NULL DEFAULT 'both' CHECK (allowed_mode IN ('online', 'in_person', 'both')),
    fee NUMERIC(10, 2) DEFAULT 0.00, -- Marked "to confirm" in UI
    requires_initial_consult BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Practitioners Table
CREATE TABLE IF NOT EXISTS practitioners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID, -- Links to auth.users if Supabase Auth is active
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    gender TEXT CHECK (gender IN ('male', 'female', 'non_binary', 'prefer_not_to_say')),
    languages TEXT[] NOT NULL DEFAULT ARRAY['English'],
    bio TEXT NOT NULL DEFAULT 'Practitioner details to confirm.',
    qualifications TEXT NOT NULL DEFAULT 'Qualifications to confirm.',
    registration_number TEXT NOT NULL DEFAULT 'Registration to confirm.',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Service Practitioner Pool (Many-to-Many: which practitioners can deliver which services)
CREATE TABLE IF NOT EXISTS service_practitioner_pool (
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (service_id, practitioner_id)
);

-- 5. Practitioner Working Hours (Weekly recurring schedule)
-- Day of week: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
CREATE TABLE IF NOT EXISTS practitioner_working_hours (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT valid_working_hours CHECK (end_time > start_time)
);

-- 6. Practitioner Leaves (Planned time off: practitioner is NEVER available during leave)
CREATE TABLE IF NOT EXISTS practitioner_leaves (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    practitioner_id UUID NOT NULL REFERENCES practitioners(id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    reason TEXT NOT NULL DEFAULT 'Leave',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT valid_leave_range CHECK (end_time > start_time),
    CONSTRAINT no_overlapping_leaves EXCLUDE USING gist (
        practitioner_id WITH =,
        tstzrange(start_time, end_time, '[)') WITH &&
    )
);

-- 7. Clinic Settings (Controlled from Staff Desk)
CREATE TABLE IF NOT EXISTS clinic_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Patients Table (Minimum data collected: no diagnoses or prescriptions)
CREATE TABLE IF NOT EXISTS patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    preferred_language TEXT NOT NULL DEFAULT 'English',
    consent_recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    consent_version TEXT NOT NULL DEFAULT 'v1.0',
    notes TEXT, -- Optional "What brings you in?" note
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_patients_contact ON patients(phone, email);

-- 9. Bookings Table (The overall basket/booking container)
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_reference TEXT NOT NULL UNIQUE, -- Human readable, e.g. BM-2026-8942
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE RESTRICT,
    status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed')),
    secure_token TEXT NOT NULL UNIQUE, -- Cryptographically secure token for patient self-service link
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_secure_token ON bookings(secure_token);

-- 10. Booking Items Table (The individual service appointments within a booking)
-- THIS IS THE CORE ENGINE ENFORCING NO DOUBLE BOOKING AT THE DATABASE LEVEL
CREATE TABLE IF NOT EXISTS booking_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
    practitioner_id UUID REFERENCES practitioners(id) ON DELETE RESTRICT,
    mode TEXT NOT NULL CHECK (mode IN ('online', 'in_person')),
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'confirmed' 
        CHECK (status IN ('awaiting_time', 'confirmed', 'rescheduled', 'cancelled', 'completed')),
    meeting_link TEXT, -- Online session link (Phase 1 auto-generated room)
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT valid_item_time_range CHECK (end_time > start_time),

    -- CORE EXCLUSION CONSTRAINT:
    -- Guarantees that a practitioner holds AT MOST ONE active booking in any overlapping time range.
    -- Cancelled and awaiting_time bookings do not lock the slot.
    CONSTRAINT no_practitioner_double_booking EXCLUDE USING gist (
        practitioner_id WITH =,
        tstzrange(start_time, end_time, '[)') WITH &&
    ) WHERE (status NOT IN ('cancelled', 'awaiting_time'))
);

CREATE INDEX IF NOT EXISTS idx_booking_items_range ON booking_items USING gist (
    practitioner_id,
    tstzrange(start_time, end_time, '[)')
);
CREATE INDEX IF NOT EXISTS idx_booking_items_times ON booking_items(start_time, end_time);

-- 11. Holds Table (Temporary claims on a slot while patient fills in details; auto-expires)
CREATE TABLE IF NOT EXISTS holds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    mode TEXT NOT NULL CHECK (mode IN ('online', 'in_person')),
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    session_token TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT valid_hold_time_range CHECK (end_time > start_time)
);

CREATE INDEX IF NOT EXISTS idx_holds_active ON holds(service_id, start_time, end_time, expires_at);

-- 12. Staff Profiles (Login-protected desk users)
CREATE TABLE IF NOT EXISTS staff_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE, -- References auth.users
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'coordinator', 'practitioner')),
    practitioner_id UUID REFERENCES practitioners(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Audit Logs (Who viewed or changed what)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    actor_email TEXT NOT NULL DEFAULT 'system',
    action TEXT NOT NULL, -- e.g. 'reassign', 'reschedule', 'cancel', 'add_service'
    entity_type TEXT NOT NULL, -- e.g. 'booking_item', 'service', 'practitioner'
    entity_id UUID NOT NULL,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. Notification Logs (Confirmations, reminders - neutral wording, no service named)
CREATE TABLE IF NOT EXISTS notification_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    recipient TEXT NOT NULL,
    channel TEXT NOT NULL CHECK (channel IN ('email', 'sms', 'whatsapp')),
    template_name TEXT NOT NULL,
    subject TEXT,
    content TEXT NOT NULL,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- Stored Procedures & Atomic Booking Engine Functions
-- ====================================================================

-- Helper: Clean expired holds
CREATE OR REPLACE FUNCTION purge_expired_holds()
RETURNS void AS $$
BEGIN
    DELETE FROM holds WHERE expires_at <= NOW();
END;
$$ LANGUAGE plpgsql;

-- Stored Procedure: Reassign Practitioner with strict availability check
CREATE OR REPLACE FUNCTION reassign_practitioner(
    p_booking_item_id UUID,
    p_new_practitioner_id UUID,
    p_actor_email TEXT DEFAULT 'coordinator'
)
RETURNS JSONB AS $$
DECLARE
    v_item RECORD;
    v_is_in_pool BOOLEAN;
    v_is_free BOOLEAN;
    v_old_practitioner_id UUID;
    v_patient_name TEXT;
    v_booking_ref TEXT;
BEGIN
    -- 1. Fetch booking item
    SELECT bi.*, b.booking_reference, p.full_name AS patient_name
    INTO v_item
    FROM booking_items bi
    JOIN bookings b ON bi.booking_id = b.id
    JOIN patients p ON b.patient_id = p.id
    WHERE bi.id = p_booking_item_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Booking item not found.';
    END IF;

    v_old_practitioner_id := v_item.practitioner_id;

    -- 2. Check if new practitioner is in the service pool
    SELECT EXISTS (
        SELECT 1 FROM service_practitioner_pool
        WHERE service_id = v_item.service_id AND practitioner_id = p_new_practitioner_id
    ) INTO v_is_in_pool;

    IF NOT v_is_in_pool THEN
        RAISE EXCEPTION 'Practitioner does not deliver this service.';
    END IF;

    -- 3. Check if new practitioner is on leave during that time
    IF EXISTS (
        SELECT 1 FROM practitioner_leaves
        WHERE practitioner_id = p_new_practitioner_id
          AND tstzrange(start_time, end_time, '[)') && tstzrange(v_item.start_time, v_item.end_time, '[)')
    ) THEN
        RAISE EXCEPTION 'Practitioner is on leave during this time.';
    END IF;

    -- 4. Check if new practitioner has a clashing booking
    IF EXISTS (
        SELECT 1 FROM booking_items
        WHERE practitioner_id = p_new_practitioner_id
          AND id != p_booking_item_id
          AND status NOT IN ('cancelled', 'awaiting_time')
          AND tstzrange(start_time, end_time, '[)') && tstzrange(v_item.start_time, v_item.end_time, '[)')
    ) THEN
        RAISE EXCEPTION 'Practitioner already has an appointment during this slot.';
    END IF;

    -- 5. Perform the update (protected also by the exclusion constraint)
    UPDATE booking_items
    SET practitioner_id = p_new_practitioner_id,
        updated_at = NOW()
    WHERE id = p_booking_item_id;

    -- 6. Log audit event
    INSERT INTO audit_logs (actor_email, action, entity_type, entity_id, details)
    VALUES (
        p_actor_email,
        'reassign',
        'booking_item',
        p_booking_item_id,
        jsonb_build_object(
            'old_practitioner_id', v_old_practitioner_id,
            'new_practitioner_id', p_new_practitioner_id,
            'booking_reference', v_item.booking_reference
        )
    );

    -- 7. Log neutral notification
    INSERT INTO notification_logs (booking_id, recipient, channel, template_name, subject, content)
    VALUES (
        v_item.booking_id,
        v_item.patient_name,
        'email',
        'practitioner_reassigned',
        'Update regarding your Better Mind appointment',
        'Your appointment schedule remains unchanged, but your assigned care specialist has been updated.'
    );

    RETURN jsonb_build_object('success', TRUE, 'booking_item_id', p_booking_item_id);
END;
$$ LANGUAGE plpgsql;

-- Stored Procedure: Cancel Booking with slot release
CREATE OR REPLACE FUNCTION cancel_booking(
    p_booking_id UUID,
    p_reason TEXT DEFAULT 'Patient requested cancellation',
    p_actor_email TEXT DEFAULT 'patient'
)
RETURNS JSONB AS $$
DECLARE
    v_booking RECORD;
BEGIN
    SELECT * INTO v_booking FROM bookings WHERE id = p_booking_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Booking not found.';
    END IF;

    -- Update booking status
    UPDATE bookings SET status = 'cancelled', updated_at = NOW() WHERE id = p_booking_id;

    -- Update items status -> Immediately frees GiST exclusion constraint slots
    UPDATE booking_items SET status = 'cancelled', updated_at = NOW() WHERE booking_id = p_booking_id;

    -- Audit log
    INSERT INTO audit_logs (actor_email, action, entity_type, entity_id, details)
    VALUES (p_actor_email, 'cancel', 'booking', p_booking_id, jsonb_build_object('reason', p_reason));

    RETURN jsonb_build_object('success', TRUE, 'booking_id', p_booking_id);
END;
$$ LANGUAGE plpgsql;
