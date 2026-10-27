export type ServiceGroup = 'Start here' | 'Mind' | 'Body' | 'Wellness';
export type SessionMode = 'online' | 'in_person';
export type AllowedMode = 'online' | 'in_person' | 'both';
export type BookingStatus = 'confirmed' | 'cancelled' | 'completed';
export type ItemStatus = 'awaiting_time' | 'confirmed' | 'rescheduled' | 'cancelled' | 'completed';
export type StaffRole = 'admin' | 'coordinator' | 'practitioner';

export interface Service {
  id: string;
  name: string;
  slug: string;
  service_group: ServiceGroup;
  description: string;
  duration_minutes: number;
  buffer_minutes: number;
  allowed_mode: AllowedMode;
  fee: number; // sample data, marked "to confirm"
  requires_initial_consult: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Practitioner {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'non_binary' | 'prefer_not_to_say';
  languages: string[];
  bio: string;
  qualifications: string;
  registration_number: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface WorkingHours {
  id: string;
  practitioner_id: string;
  day_of_week: number; // 0 = Sun, 1 = Mon, ..., 6 = Sat
  start_time: string; // "09:00:00"
  end_time: string; // "18:00:00"
  is_active: boolean;
}

export interface PractitionerLeave {
  id: string;
  practitioner_id: string;
  start_time: string; // ISO timestamptz
  end_time: string; // ISO timestamptz
  reason: string;
  created_at: string;
}

export interface ClinicSettings {
  general: {
    clinic_name: string;
    tagline: string;
    clinic_address: string;
    phone: string;
    email: string;
    crisis_hotlines: { name: string; number: string; details: string }[];
    timezone: string;
  };
  booking_rules: {
    min_notice_hours: number;
    max_advance_days: number;
    in_person_gap_minutes: number;
    cancellation_window_hours: number;
    hold_duration_minutes: number;
  };
}

export interface Patient {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  preferred_language: string;
  consent_recorded_at: string;
  consent_version: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  booking_reference: string;
  patient_id: string;
  status: BookingStatus;
  secure_token: string;
  created_at: string;
  updated_at: string;
  patient?: Patient;
  items?: BookingItem[];
}

export interface BookingItem {
  id: string;
  booking_id: string;
  service_id: string;
  practitioner_id?: string;
  mode: SessionMode;
  start_time: string; // ISO timestamptz
  end_time: string; // ISO timestamptz
  status: ItemStatus;
  meeting_link?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  service?: Service;
  practitioner?: Practitioner;
}

export interface Hold {
  id: string;
  service_id: string;
  mode: SessionMode;
  start_time: string; // ISO timestamptz
  end_time: string; // ISO timestamptz
  session_token: string;
  expires_at: string; // ISO timestamptz
  created_at: string;
}

export interface StaffProfile {
  id: string;
  user_id?: string;
  email: string;
  full_name: string;
  role: StaffRole;
  practitioner_id?: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  actor_email: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: Record<string, any>;
  created_at: string;
}

export interface NotificationLog {
  id: string;
  booking_id: string;
  recipient: string;
  channel: 'email' | 'sms' | 'whatsapp';
  template_name: string;
  subject?: string;
  content: string;
  sent_at: string;
}

export interface BasketItemInput {
  service_id: string;
  mode: SessionMode;
  start_time: string; // ISO timestamptz
  end_time: string; // ISO timestamptz
}

export interface ConfirmBookingInput {
  full_name: string;
  email: string;
  phone: string;
  preferred_language?: string;
  consent_version?: string;
  notes?: string;
  items: BasketItemInput[];
  session_token?: string;
}
