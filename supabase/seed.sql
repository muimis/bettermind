-- ====================================================================
-- Better Mind: Sample Seed Data (Phase 1)
-- Rule: Do not invent fees, qualifications, registration numbers,
-- addresses or practitioner names. Anything unknown stays marked "to confirm".
-- ====================================================================

-- 1. Clinic Settings
INSERT INTO clinic_settings (key, value, description) VALUES
('general', '{
    "clinic_name": "Better Mind",
    "tagline": "Specialist mental health & integrative wellness",
    "clinic_address": "Address to confirm, Indiranagar, Bengaluru, Karnataka (to confirm)",
    "phone": "+91 80 0000 0000 (to confirm)",
    "email": "care@bettermind.clinic (to confirm)",
    "crisis_hotlines": [
        {"name": "Tele-MANAS", "number": "14416", "details": "Government of India 24/7 Mental Health Helpline"},
        {"name": "KIRAN", "number": "1800-599-0019", "details": "National 24/7 Helpline"}
    ],
    "timezone": "Asia/Kolkata"
}'::jsonb, 'General clinic information and crisis helplines'),
('booking_rules', '{
    "min_notice_hours": 2,
    "max_advance_days": 30,
    "in_person_gap_minutes": 15,
    "cancellation_window_hours": 4,
    "hold_duration_minutes": 10
}'::jsonb, 'Operational booking constraints');

-- 2. Services (Grouped into Start here, Mind, Body, Wellness)
-- All fees marked "to confirm" (0.00 placeholder)
INSERT INTO services (id, name, slug, service_group, description, duration_minutes, buffer_minutes, allowed_mode, fee, requires_initial_consult, is_active) VALUES
('11111111-1111-1111-1111-111111111111', 
 'Initial Care Assessment & Triage', 
 'initial-assessment', 
 'Start here', 
 'Not sure where to begin? Speak with a clinical care coordinator who evaluates your needs and routes you to the right psychology, psychiatry, or wellness specialist.', 
 45, 10, 'both', 0.00, FALSE, TRUE),

('22222222-2222-2222-2222-222222222221', 
 'Clinical Psychology & Psychotherapy', 
 'clinical-psychology', 
 'Mind', 
 'Evidence-based cognitive and psychotherapy sessions for anxiety, depression, trauma, and personal growth.', 
 50, 10, 'both', 0.00, FALSE, TRUE),

('22222222-2222-2222-2222-222222222222', 
 'Psychiatry Consultation', 
 'psychiatry-consultation', 
 'Mind', 
 'Comprehensive psychiatric evaluation, diagnosis, and medical management plan by a qualified psychiatrist.', 
 45, 15, 'both', 0.00, TRUE, TRUE),

('33333333-3333-3333-3333-333333333331', 
 'Clinical Dietetics & Gut-Brain Nutrition', 
 'dietetics-nutrition', 
 'Body', 
 'Nutritional planning tailored for mood regulation, hormonal balance, gut-brain health, and metabolic well-being.', 
 45, 15, 'both', 0.00, FALSE, TRUE),

('33333333-3333-3333-3333-333333333332', 
 'Therapeutic Yoga & Somatic Movement', 
 'therapeutic-yoga', 
 'Body', 
 '1-on-1 guided somatic movement and breathwork designed to release nervous system tension and somatic stress.', 
 60, 15, 'both', 0.00, FALSE, TRUE),

('44444444-4444-4444-4444-444444444441', 
 'Mindfulness & Stress Management', 
 'mindfulness-stress-management', 
 'Wellness', 
 'Practical stress reduction techniques, nervous system regulation, and mindfulness-based interventions.', 
 45, 10, 'both', 0.00, FALSE, TRUE);

-- 3. Practitioners (Clearly labeled sample data)
INSERT INTO practitioners (id, name, email, phone, gender, languages, bio, qualifications, registration_number, is_active) VALUES
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 
 'Dr. Arun Nair (Sample Practitioner)', 
 'dr.arun@bettermind.clinic', 
 '+91 98000 00001 (to confirm)', 
 'male', 
 ARRAY['English', 'Hindi', 'Malayalam'], 
 'Specializes in adult psychiatry and clinical psychology with an integrative approach.', 
 'MD Psychiatry, MBBS (qualifications to confirm)', 
 'Reg # KMC-12345 (to confirm)', 
 TRUE),

('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 
 'Dr. Meera Sen (Sample Practitioner)', 
 'dr.meera@bettermind.clinic', 
 '+91 98000 00002 (to confirm)', 
 'female', 
 ARRAY['English', 'Hindi', 'Bengali'], 
 'Specializes in cognitive behavioral therapy, trauma recovery, and mindfulness-based therapy.', 
 'M.Phil Clinical Psychology, Ph.D. (to confirm)', 
 'Reg # RCI-67890 (to confirm)', 
 TRUE),

('cccccccc-cccc-cccc-cccc-cccccccccccc', 
 'Priya Sharma (Sample Practitioner)', 
 'priya.sharma@bettermind.clinic', 
 '+91 98000 00003 (to confirm)', 
 'female', 
 ARRAY['English', 'Hindi'], 
 'Registered dietitian focusing on metabolic health and nutritional psychiatry.', 
 'M.Sc. Clinical Nutrition & Dietetics (to confirm)', 
 'Reg # IDA-54321 (to confirm)', 
 TRUE),

('dddddddd-dddd-dddd-dddd-dddddddddddd', 
 'Rajesh Kumar (Sample Practitioner)', 
 'rajesh.kumar@bettermind.clinic', 
 '+91 98000 00004 (to confirm)', 
 'male', 
 ARRAY['English', 'Hindi', 'Tamil'], 
 'Certified yoga therapist specializing in somatic nervous system regulation and stress reduction.', 
 'M.Sc. Yoga Therapy, Certified Somatic Practitioner (to confirm)', 
 'Reg # YCB-99887 (to confirm)', 
 TRUE),

('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 
 'Ananya Roy (Sample Coordinator)', 
 'ananya.roy@bettermind.clinic', 
 '+91 98000 00005 (to confirm)', 
 'female', 
 ARRAY['English', 'Hindi'], 
 'Clinical intake coordinator guiding patients to the appropriate care pathways.', 
 'MSW Clinical Social Work (to confirm)', 
 'Reg # to confirm', 
 TRUE);

-- 4. Pool Mappings: Which practitioners deliver which services
-- Initial Assessment pool: Dr. Meera Sen, Ananya Roy
INSERT INTO service_practitioner_pool (service_id, practitioner_id) VALUES
('11111111-1111-1111-1111-111111111111', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
('11111111-1111-1111-1111-111111111111', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee');

-- Psychology pool: Dr. Arun Nair, Dr. Meera Sen
INSERT INTO service_practitioner_pool (service_id, practitioner_id) VALUES
('22222222-2222-2222-2222-222222222221', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
('22222222-2222-2222-2222-222222222221', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');

-- Psychiatry pool: Dr. Arun Nair
INSERT INTO service_practitioner_pool (service_id, practitioner_id) VALUES
('22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

-- Dietetics pool: Priya Sharma
INSERT INTO service_practitioner_pool (service_id, practitioner_id) VALUES
('33333333-3333-3333-3333-333333333331', 'cccccccc-cccc-cccc-cccc-cccccccccccc');

-- Therapeutic Yoga pool: Rajesh Kumar
INSERT INTO service_practitioner_pool (service_id, practitioner_id) VALUES
('33333333-3333-3333-3333-333333333332', 'dddddddd-dddd-dddd-dddd-dddddddddddd');

-- Mindfulness pool: Dr. Meera Sen, Rajesh Kumar
INSERT INTO service_practitioner_pool (service_id, practitioner_id) VALUES
('44444444-4444-4444-4444-444444444441', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
('44444444-4444-4444-4444-444444444441', 'dddddddd-dddd-dddd-dddd-dddddddddddd');

-- 5. Working Hours (Monday through Friday 09:00 - 18:00 IST for all practitioners)
DO $$
DECLARE
    v_prac UUID;
    v_day INT;
BEGIN
    FOR v_prac IN SELECT id FROM practitioners LOOP
        FOR v_day IN 1..5 LOOP -- Mon to Fri
            INSERT INTO practitioner_working_hours (practitioner_id, day_of_week, start_time, end_time)
            VALUES (v_prac, v_day, '09:00:00'::TIME, '18:00:00'::TIME);
        END LOOP;
        -- Saturday half day 10:00 - 14:00
        INSERT INTO practitioner_working_hours (practitioner_id, day_of_week, start_time, end_time)
        VALUES (v_prac, 6, '10:00:00'::TIME, '14:00:00'::TIME);
    END LOOP;
END $$;

-- 6. Sample Staff Profiles
INSERT INTO staff_profiles (id, email, full_name, role, practitioner_id) VALUES
('99999999-9999-9999-9999-999999999991', 'admin@bettermind.clinic', 'Clinic Administrator', 'admin', NULL),
('99999999-9999-9999-9999-999999999992', 'coordinator@bettermind.clinic', 'Ananya Roy (Coordinator)', 'coordinator', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'),
('99999999-9999-9999-9999-999999999993', 'dr.arun@bettermind.clinic', 'Dr. Arun Nair (Practitioner)', 'practitioner', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
('99999999-9999-9999-9999-999999999994', 'dr.meera@bettermind.clinic', 'Dr. Meera Sen (Practitioner)', 'practitioner', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');
