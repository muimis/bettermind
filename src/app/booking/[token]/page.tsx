import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Video,
  Building2,
  CheckCircle2,
  Shield,
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  User,
  AlertCircle,
  ExternalLink
} from '@/components/icons';

async function getBooking(token: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/staff/bookings?token=${token}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.booking || null;
  } catch {
    return null;
  }
}

function formatIST(iso: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

function makeGoogleCalendarUrl(title: string, startIso: string, endIso: string, details: string, location: string) {
  const formatGCal = (iso: string) => {
    return new Date(iso).toISOString().replace(/-|:|\.\d\d\d/g, '');
  };
  const dates = `${formatGCal(startIso)}/${formatGCal(endIso)}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
}

const STATUS_LABELS: Record<string, string> = {
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
  completed: 'Completed',
  awaiting_time: 'Awaiting Time',
  rescheduled: 'Rescheduled'
};

const STATUS_CLASSES: Record<string, string> = {
  confirmed: 'status-badge-confirmed',
  cancelled: 'status-badge-cancelled',
  completed: 'status-badge-completed',
  awaiting_time: 'status-badge-awaiting',
  rescheduled: 'status-badge-rescheduled'
};

export default async function BookingPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const booking = await getBooking(token);

  if (!booking) {
    return (
      <div className="patient-hub-page">
        <div className="container">
          <div className="hub-not-found-card">
            <div className="hnf-icon">🔒</div>
            <h1 className="hnf-title">Booking Link Not Found</h1>
            <p className="hnf-desc">
              This secure access token may be expired, mistyped, or invalidated. Please check your confirmation email for the verified link or contact the clinic desk.
            </p>
            <div className="hnf-actions">
              <Link href="/book" className="btn-primary">
                Make a New Appointment
              </Link>
              <Link href="/" className="btn-outline">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const patient = booking.patient;
  const items = booking.items || [];

  return (
    <div className="patient-hub-page">
      <div className="container patient-hub-container">
        {/* Breadcrumb Header */}
        <div className="hub-header-nav">
          <Link href="/" className="back-link">
            <ArrowLeft size={16} />
            <span>Better Mind Clinic</span>
          </Link>
          <div className="hub-privacy-badge">
            <Shield size={14} />
            <span>Secure Patient Portal · DPDP Act 2023 Protected</span>
          </div>
        </div>

        {/* Status Hero Card */}
        <div className="hub-status-hero">
          <div className="hsh-left">
            <span className="hsh-label">Booking Reference</span>
            <h1 className="hsh-ref">{booking.booking_reference}</h1>
            <div className="hsh-meta">
              Created on {new Date(booking.created_at).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>

          <div className="hsh-right">
            <span className={`hub-status-pill ${STATUS_CLASSES[booking.status] || ''}`}>
              {STATUS_LABELS[booking.status] || booking.status}
            </span>
          </div>
        </div>

        {/* 2-Column Grid: Appointments on Left, Patient Info & Help on Right */}
        <div className="hub-grid-layout">
          {/* Main Column: Appointments */}
          <div className="hub-main-column">
            <h2 className="hub-section-heading">
              Scheduled Care Sessions ({items.length})
            </h2>

            <div className="hub-appointments-stack">
              {items.map((item: any) => {
                const isOnline = item.mode === 'online';
                const calUrl = makeGoogleCalendarUrl(
                  `Better Mind: ${item.service?.name || 'Session'}`,
                  item.start_time,
                  item.end_time,
                  `Booking: ${booking.booking_reference}\nDoctor: ${item.practitioner?.name || 'Specialist'}\nBetter Mind Clinic`,
                  isOnline ? 'Encrypted Video Consultation' : 'Better Mind Partner Clinic Hub'
                );

                return (
                  <article key={item.id} className="hub-session-card">
                    <div className="hsc-header">
                      <div className="hsc-service-name">{item.service?.name || 'Care Discipline'}</div>
                      <span className={`hsc-status ${STATUS_CLASSES[item.status] || ''}`}>
                        {STATUS_LABELS[item.status] || item.status}
                      </span>
                    </div>

                    {/* Practitioner Profile Snippet */}
                    <div className="hsc-doctor-row">
                      <div className="hsc-doctor-avatar">
                        {item.practitioner?.name ? item.practitioner.name.charAt(0) : 'D'}
                      </div>
                      <div className="hsc-doctor-info">
                        <div className="hsc-doc-name">
                          With <strong>{item.practitioner?.name || 'Assigned Specialist Clinician'}</strong>
                        </div>
                        {item.practitioner?.qualifications && (
                          <div className="hsc-doc-quals">{item.practitioner.qualifications}</div>
                        )}
                        {item.practitioner?.registration_number && (
                          <div className="hsc-doc-reg">{item.practitioner.registration_number}</div>
                        )}
                      </div>
                    </div>

                    {/* Time & Mode Details */}
                    <div className="hsc-details-row">
                      <div className="hsc-detail-cell">
                        <Calendar size={16} className="hsc-icon" />
                        <div>
                          <span className="cell-label">Date & Time (IST)</span>
                          <strong className="cell-val">{formatIST(item.start_time)}</strong>
                        </div>
                      </div>

                      <div className="hsc-detail-cell">
                        {isOnline ? <Video size={16} className="hsc-icon" /> : <Building2 size={16} className="hsc-icon" />}
                        <div>
                          <span className="cell-label">Format</span>
                          <strong className="cell-val">
                            {isOnline ? '💻 Online Video Session' : '🏥 Partner Clinic Hub'}
                          </strong>
                        </div>
                      </div>

                      <div className="hsc-detail-cell">
                        <Clock size={16} className="hsc-icon" />
                        <div>
                          <span className="cell-label">Duration</span>
                          <strong className="cell-val">{item.service?.duration_minutes} Minutes</strong>
                        </div>
                      </div>
                    </div>

                    {/* Video Meeting Link or Clinic Address */}
                    {isOnline ? (
                      <div className="hsc-video-box">
                        <div className="hvb-info">
                          <Video size={18} />
                          <div>
                            <strong>Online Video Room Link:</strong>
                            <span>Join directly from your phone or browser. No app install required.</span>
                          </div>
                        </div>
                        {item.meeting_link ? (
                          <a href={item.meeting_link} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm">
                            <span>Join Video Room</span>
                            <ExternalLink size={14} />
                          </a>
                        ) : (
                          <span className="hvb-pending">Link activates 15 mins prior</span>
                        )}
                      </div>
                    ) : (
                      <div className="hsc-location-box">
                        <MapPin size={18} />
                        <div>
                          <strong>Partner Clinic Hub:</strong> Location details and access code sent via WhatsApp & Email prior to session.
                          <div className="hlb-landmark">Dedicated quiet consultation suite · Confidential reception</div>
                        </div>
                      </div>
                    )}

                    {/* Calendar export */}
                    <div className="hsc-card-actions">
                      <a href={calUrl} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm">
                        <Calendar size={14} />
                        <span>Add to Google Calendar</span>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Preparation tips */}
            <div className="hub-prep-card">
              <h3 className="hpc-title">What to have ready 10 minutes before:</h3>
              <ul className="hpc-list">
                <li><strong>Private Room:</strong> Choose a quiet, well-lit space where you won&apos;t be interrupted.</li>
                <li><strong>Audio & Video:</strong> Wired or Bluetooth headphones help maintain crystal-clear audio and emotional privacy.</li>
                <li><strong>No Prescriptions Needed:</strong> You don&apos;t need prior medical files or tests. Your practitioner will guide the assessment.</li>
              </ul>
            </div>
          </div>

          {/* Sidebar Column: Patient & Clinic Policies */}
          <div className="hub-sidebar-column">
            {/* Patient Info Card */}
            <div className="hub-sidebar-card">
              <h3 className="hsc-side-title">
                <User size={16} /> Patient Information
              </h3>
              <div className="hsc-info-lines">
                <div className="info-line">
                  <span className="il-label">Full Name</span>
                  <span className="il-val">{patient?.full_name}</span>
                </div>
                <div className="info-line">
                  <span className="il-label">Email</span>
                  <span className="il-val">{patient?.email}</span>
                </div>
                <div className="info-line">
                  <span className="il-label">Phone</span>
                  <span className="il-val">{patient?.phone}</span>
                </div>
                <div className="info-line">
                  <span className="il-label">Language</span>
                  <span className="il-val">{patient?.preferred_language || 'English'}</span>
                </div>
              </div>
            </div>

            {/* Reschedule & Help Card */}
            <div className="hub-sidebar-card">
              <h3 className="hsc-side-title">Need to Make Changes?</h3>
              <p className="side-card-desc">
                You can reschedule or cancel without penalty up to <strong>4 hours before</strong> your appointment time.
              </p>
              <div className="side-card-actions">
                <a href="tel:+918047182200" className="btn-outline btn-full btn-sm">
                  <Phone size={14} />
                  <span>Call Desk: 080 4718 2200</span>
                </a>
                <a href="mailto:care@bettermind.clinic" className="btn-ghost btn-full btn-sm">
                  <Mail size={14} />
                  <span>Email: care@bettermind.clinic</span>
                </a>
              </div>
            </div>

            {/* Emergency Hotline Box */}
            <div className="hub-crisis-card">
              <div className="hcc-title">Emergency Notice</div>
              <p className="hcc-text">
                Better Mind is an outpatient scheduled clinic. For active psychological crises or medical emergencies, call national 24/7 helplines:
              </p>
              <div className="hcc-numbers">
                <div><strong>Tele-MANAS:</strong> <a href="tel:14416">14416</a></div>
                <div><strong>KIRAN:</strong> <a href="tel:18005990019">1800-599-0019</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
