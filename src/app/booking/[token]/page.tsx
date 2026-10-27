import { notFound } from 'next/navigation';
import Link from 'next/link';

// Server-side: fetch booking from token via internal API
async function getBooking(token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/staff/bookings?token=${token}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.booking || null;
  } catch {
    return null;
  }
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata', weekday: 'long', day: 'numeric', month: 'long',
    year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
  });
}

const STATUS_LABELS: Record<string, string> = {
  confirmed: 'Confirmed', cancelled: 'Cancelled', completed: 'Completed',
  awaiting_time: 'Awaiting time', rescheduled: 'Rescheduled'
};
const STATUS_COLORS: Record<string, string> = {
  confirmed: 'var(--status-confirmed)', cancelled: 'var(--status-cancelled)',
  completed: 'var(--status-confirmed)', awaiting_time: 'var(--status-awaiting)',
  rescheduled: 'var(--status-rescheduled)'
};

export default async function BookingPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const booking = await getBooking(token);

  if (!booking) {
    return (
      <div className="booking-view-page">
        <div className="container">
          <div className="booking-not-found">
            <div className="bnf-icon">🔒</div>
            <h1>Booking not found</h1>
            <p>This link may be invalid, expired, or already used. Please check your confirmation email for the correct link.</p>
            <Link href="/book" className="btn-primary">Make a new booking</Link>
          </div>
        </div>
      </div>
    );
  }

  const patient = booking.patient;
  const items = booking.items || [];

  return (
    <div className="booking-view-page">
      <div className="container">
        <Link href="/" className="back-link">← Better Mind</Link>

        <div className="bv-header">
          <div className="bv-ref">
            Booking <strong>{booking.booking_reference}</strong>
          </div>
          <div className="bv-status" style={{ color: STATUS_COLORS[booking.status] || 'inherit' }}>
            {STATUS_LABELS[booking.status] || booking.status}
          </div>
        </div>

        <div className="bv-patient-card">
          <div className="bv-section-title">Patient</div>
          <div className="bv-detail"><span>Name</span><span>{patient?.full_name}</span></div>
          <div className="bv-detail"><span>Email</span><span>{patient?.email}</span></div>
          <div className="bv-detail"><span>Phone</span><span>{patient?.phone}</span></div>
          <div className="bv-detail"><span>Language</span><span>{patient?.preferred_language}</span></div>
        </div>

        <div className="bv-items">
          <div className="bv-section-title">Appointment{items.length > 1 ? 's' : ''}</div>
          {items.map((item: any) => (
            <div key={item.id} className="bv-item-card">
              <div className="bv-item-service">{item.service?.name || 'Service'}</div>
              <div className="bv-item-practitioner">
                {item.practitioner ? `With ${item.practitioner.name.replace(' (Sample Practitioner)', '').replace(' (Sample Coordinator)', '')}` : ''}
              </div>
              <div className="bv-item-time">{formatTime(item.start_time)} IST</div>
              <div className="bv-item-meta">
                <span className={`item-status-badge status-${item.status}`}>
                  {STATUS_LABELS[item.status] || item.status}
                </span>
                <span className="item-mode">
                  {item.mode === 'online' ? '💻 Online' : '🏥 In person'}
                </span>
                <span className="item-duration">{item.service?.duration_minutes} min</span>
              </div>
              {item.mode === 'online' && item.meeting_link && (
                <div className="bv-meeting-link">
                  💻 <a href={item.meeting_link} target="_blank" rel="noopener noreferrer">Join online session</a>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bv-actions">
          <p className="bv-cancel-note">
            To cancel or reschedule, please contact the clinic at least 4 hours before your appointment.
            Email: <strong>care@bettermind.clinic</strong> (to confirm) or call your confirmation email number.
          </p>
        </div>

        <div className="bv-crisis">
          Better Mind is not an emergency service. In a crisis, call <strong>Tele-MANAS: 14416</strong> or <strong>KIRAN: 1800-599-0019</strong> (24/7, toll-free).
        </div>
      </div>
    </div>
  );
}
