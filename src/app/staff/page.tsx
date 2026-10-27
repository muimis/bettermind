'use client';
import { useState, useEffect } from 'react';

type User = { email: string; name: string; role: string; practitioner_id?: string };
type Booking = any;

function formatTime(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata', weekday: 'short', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  });
}

const STATUS_LABELS: Record<string, string> = {
  confirmed: 'Confirmed', cancelled: 'Cancelled', completed: 'Completed',
  awaiting_time: 'Awaiting', rescheduled: 'Rescheduled'
};

// --- Login ---
function LoginScreen({ onLogin }: { onLogin: (u: User) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const DEMO_USERS = [
    { label: 'Admin', email: 'admin@bettermind.clinic', pw: 'admin' },
    { label: 'Coordinator', email: 'coordinator@bettermind.clinic', pw: 'coord' },
    { label: 'Dr. Arun Nair', email: 'dr.arun@bettermind.clinic', pw: 'arun' },
    { label: 'Dr. Meera Sen', email: 'dr.meera@bettermind.clinic', pw: 'meera' },
  ];

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/staff/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      onLogin(data.user);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="staff-login-page">
      <div className="staff-login-card">
        <div className="slc-logo">Better Mind</div>
        <h1 className="slc-title">Staff desk</h1>
        <p className="slc-sub">Sign in to access the booking dashboard.</p>

        <form onSubmit={handleLogin} className="slc-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="staff@bettermind.clinic" required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button className="btn-primary btn-full" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="demo-section">
          <div className="demo-title">Demo credentials</div>
          <div className="demo-grid">
            {DEMO_USERS.map(u => (
              <button key={u.email} className="demo-btn" onClick={() => { setEmail(u.email); setPassword(u.pw); }}>
                {u.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Dashboard ---
function Dashboard({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    fetch('/api/staff/bookings')
      .then(r => r.json())
      .then(d => {
        setBookings(d.bookings || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase();
    return (
      b.booking_reference?.toLowerCase().includes(q) ||
      b.patient?.full_name?.toLowerCase().includes(q) ||
      b.patient?.email?.toLowerCase().includes(q) ||
      b.patient?.phone?.includes(q)
    );
  });

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  };

  return (
    <div className="staff-dashboard">
      {/* Sidebar */}
      <aside className="staff-sidebar">
        <div className="ss-brand">Better Mind</div>
        <div className="ss-user">
          <div className="ss-user-name">{user.name}</div>
          <div className="ss-user-role">{user.role}</div>
        </div>
        <nav className="ss-nav">
          <div className="ss-nav-item active">📋 Bookings</div>
        </nav>
        <button className="ss-logout" onClick={onLogout}>Sign out</button>
      </aside>

      {/* Main */}
      <main className="staff-main">
        <div className="staff-topbar">
          <h1 className="staff-page-title">Bookings</h1>
        </div>

        {/* Stats */}
        <div className="staff-stats">
          {[
            { label: 'Total', value: stats.total, color: 'var(--text-main)' },
            { label: 'Confirmed', value: stats.confirmed, color: 'var(--status-confirmed)' },
            { label: 'Completed', value: stats.completed, color: 'var(--text-muted)' },
            { label: 'Cancelled', value: stats.cancelled, color: 'var(--status-cancelled)' },
          ].map(stat => (
            <div className="stat-card" key={stat.label}>
              <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="staff-search-bar">
          <input
            className="form-input search-input"
            placeholder="Search by name, email, phone, or reference…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Bookings Table */}
        {loading ? (
          <div className="staff-loading">Loading bookings…</div>
        ) : filtered.length === 0 ? (
          <div className="staff-empty">
            {search ? 'No bookings match your search.' : 'No bookings yet. Patient bookings will appear here.'}
          </div>
        ) : (
          <div className="bookings-table-wrap">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Patient</th>
                  <th>Services</th>
                  <th>First appointment</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b: Booking) => {
                  const items = b.items || [];
                  const firstItem = items[0];
                  return (
                    <tr key={b.id} onClick={() => setSelectedBooking(b)} className="booking-row">
                      <td className="td-ref">{b.booking_reference}</td>
                      <td>
                        <div className="td-patient-name">{b.patient?.full_name}</div>
                        <div className="td-patient-contact">{b.patient?.email}</div>
                      </td>
                      <td>
                        {items.map((item: any) => (
                          <div key={item.id} className="td-service">{item.service?.name || '—'}</div>
                        ))}
                      </td>
                      <td>{firstItem ? formatTime(firstItem.start_time) : '—'}</td>
                      <td>
                        <span className={`status-badge status-${b.status}`}>
                          {STATUS_LABELS[b.status] || b.status}
                        </span>
                      </td>
                      <td><button className="btn-ghost btn-sm">View →</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Booking Detail Drawer */}
      {selectedBooking && (
        <div className="drawer-overlay" onClick={() => setSelectedBooking(null)}>
          <div className="booking-drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <div>
                <div className="drawer-ref">{selectedBooking.booking_reference}</div>
                <div className={`status-badge status-${selectedBooking.status}`}>
                  {STATUS_LABELS[selectedBooking.status]}
                </div>
              </div>
              <button className="drawer-close" onClick={() => setSelectedBooking(null)}>✕</button>
            </div>

            <div className="drawer-section">
              <div className="drawer-section-title">Patient</div>
              <div className="drawer-detail"><span>Name</span><span>{selectedBooking.patient?.full_name}</span></div>
              <div className="drawer-detail"><span>Email</span><span>{selectedBooking.patient?.email}</span></div>
              <div className="drawer-detail"><span>Phone</span><span>{selectedBooking.patient?.phone}</span></div>
              <div className="drawer-detail"><span>Language</span><span>{selectedBooking.patient?.preferred_language}</span></div>
            </div>

            {(selectedBooking.items || []).map((item: any) => (
              <div key={item.id} className="drawer-section">
                <div className="drawer-section-title">{item.service?.name}</div>
                <div className="drawer-detail"><span>Time</span><span>{formatTime(item.start_time)} IST</span></div>
                <div className="drawer-detail"><span>Mode</span><span>{item.mode === 'online' ? '💻 Online' : '🏥 In person'}</span></div>
                <div className="drawer-detail"><span>Duration</span><span>{item.service?.duration_minutes} min</span></div>
                <div className="drawer-detail">
                  <span>Practitioner</span>
                  <span>{item.practitioner?.name?.replace(' (Sample Practitioner)', '').replace(' (Sample Coordinator)', '') || '—'}</span>
                </div>
                <div className="drawer-detail">
                  <span>Status</span>
                  <span className={`status-badge status-${item.status}`}>{STATUS_LABELS[item.status]}</span>
                </div>
                {item.meeting_link && (
                  <div className="drawer-detail">
                    <span>Meeting link</span>
                    <a href={item.meeting_link} target="_blank" rel="noopener noreferrer" className="meeting-link-small">Join →</a>
                  </div>
                )}
              </div>
            ))}

            <BookingActions booking={selectedBooking} userRole={user.role} onRefresh={() => {
              fetch('/api/staff/bookings')
                .then(r => r.json())
                .then(d => {
                  setBookings(d.bookings || []);
                  setSelectedBooking(null);
                });
            }} />
          </div>
        </div>
      )}
    </div>
  );
}

// --- Booking Actions (Cancel / Complete) ---
function BookingActions({ booking, userRole, onRefresh }: { booking: Booking; userRole: string; onRefresh: () => void }) {
  const [actionLoading, setActionLoading] = useState('');
  const [error, setError] = useState('');

  const doAction = async (action: string) => {
    setActionLoading(action);
    setError('');
    try {
      const res = await fetch(`/api/staff/bookings/${booking.id}/actions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Action failed');
      onRefresh();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setActionLoading('');
    }
  };

  if (!['admin', 'coordinator'].includes(userRole)) return null;
  if (booking.status === 'cancelled') return <div className="drawer-note">This booking has been cancelled.</div>;
  if (booking.status === 'completed') return <div className="drawer-note">This booking is complete.</div>;

  return (
    <div className="drawer-actions">
      {error && <div className="booking-error">{error}</div>}
      <button className="btn-outline btn-sm" onClick={() => doAction('cancel')} disabled={!!actionLoading}>
        {actionLoading === 'cancel' ? 'Cancelling…' : 'Cancel booking'}
      </button>
      <button className="btn-primary btn-sm" onClick={() => doAction('complete')} disabled={!!actionLoading}>
        {actionLoading === 'complete' ? 'Completing…' : 'Mark as completed'}
      </button>
    </div>
  );
}

// --- Main Staff Page ---
export default function StaffPage() {
  const [user, setUser] = useState<User | null>(null);

  if (!user) return <LoginScreen onLogin={setUser} />;
  return <Dashboard user={user} onLogout={() => setUser(null)} />;
}
