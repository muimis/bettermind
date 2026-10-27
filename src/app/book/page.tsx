'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type Service = {
  id: string; name: string; slug: string; service_group: string;
  description: string; duration_minutes: number; allowed_mode: string;
  requires_initial_consult: boolean; fee: number;
};
type Slot = { start_time: string; end_time: string; display_ist: string };
type BasketItem = {
  service: Service; mode: 'online' | 'in_person';
  start_time: string; end_time: string;
};

const STEPS = ['Services', 'Times', 'Details', 'Confirm'];

const MODE_LABELS: Record<string, string> = { online: 'Online', in_person: 'In person' };

function formatTime(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata', weekday: 'short', month: 'short',
    day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
  });
}

function todayIST() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
}

function addDays(base: string, n: number) {
  const d = new Date(base + 'T00:00:00+05:30');
  d.setDate(d.getDate() + n);
  return d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
}

// ---- Step 1: Select Services ----
function StepServices({
  services, basket, onToggle
}: {
  services: Service[];
  basket: BasketItem[];
  onToggle: (s: Service) => void;
}) {
  const groups = ['Start here', 'Mind', 'Body', 'Wellness'];
  const groupMeta: Record<string, { icon: string; color: string; bg: string }> = {
    'Start here': { icon: '🧭', color: '#1f5e58', bg: '#eaf3f2' },
    'Mind': { icon: '🧠', color: '#3f51b5', bg: '#edf0fa' },
    'Body': { icon: '🌿', color: '#c46442', bg: '#fcf0eb' },
    'Wellness': { icon: '✨', color: '#b26a00', bg: '#fdf5e6' }
  };

  return (
    <div className="step-content">
      <h2 className="step-heading">Choose your services</h2>
      <p className="step-subheading">You can select one or more. We will arrange the times to suit you.</p>
      {groups.map(g => {
        const items = services.filter(s => s.service_group === g);
        if (!items.length) return null;
        const meta = groupMeta[g];
        return (
          <div key={g} className="booking-group">
            <div className="booking-group-label" style={{ color: meta.color }}>
              <span style={{ background: meta.bg, borderRadius: '50%', padding: '2px 6px' }}>{meta.icon}</span>
              {g}
            </div>
            {items.map(s => {
              const selected = basket.some(b => b.service.id === s.id);
              return (
                <button
                  key={s.id}
                  className={`service-select-card ${selected ? 'selected' : ''}`}
                  onClick={() => onToggle(s)}
                  aria-pressed={selected}
                >
                  <div className="ssc-top">
                    <div className="ssc-name">{s.name}</div>
                    <div className={`ssc-check ${selected ? 'checked' : ''}`}>
                      {selected ? '✓' : '+'}
                    </div>
                  </div>
                  <div className="ssc-desc">{s.description}</div>
                  <div className="ssc-meta">
                    {s.duration_minutes} min ·{' '}
                    {s.allowed_mode === 'both' ? 'Online or in person' : MODE_LABELS[s.allowed_mode]}
                    {s.requires_initial_consult && (
                      <span className="ssc-badge">Requires initial assessment first</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// ---- Step 2: Select Times ----
function StepTimes({
  basket, onUpdateItem
}: {
  basket: BasketItem[];
  onUpdateItem: (idx: number, update: Partial<BasketItem>) => void;
}) {
  const [slots, setSlots] = useState<Record<string, Slot[]>>({});
  const [dates, setDates] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const today = todayIST();

  const fetchSlots = useCallback(async (serviceId: string, mode: 'online' | 'in_person', date: string) => {
    const key = `${serviceId}_${mode}_${date}`;
    setLoading(prev => ({ ...prev, [key]: true }));
    try {
      const res = await fetch(`/api/staff/services?action=slots&service_id=${serviceId}&mode=${mode}&date=${date}`);
      const data = await res.json();
      setSlots(prev => ({ ...prev, [key]: data.slots || [] }));
    } catch {
      setSlots(prev => ({ ...prev, [key]: [] }));
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  }, []);

  return (
    <div className="step-content">
      <h2 className="step-heading">Choose a time for each service</h2>
      <p className="step-subheading">Times that clash with another service in your booking are blocked automatically.</p>
      {basket.map((item, idx) => {
        const dateKey = `date_${idx}`;
        const currentDate = dates[dateKey] || addDays(today, 1);
        const modeForItem = item.mode;
        const slotKey = `${item.service.id}_${modeForItem}_${currentDate}`;
        const availableSlots = slots[slotKey] || [];
        const isLoading = loading[slotKey];

        // Check if this slot overlaps with other selected items
        const selectedTime = item.start_time;

        return (
          <div key={item.service.id} className="time-picker-card">
            <div className="tpc-header">
              <div className="tpc-service-name">{item.service.name}</div>
              <div className="tpc-duration">{item.service.duration_minutes} min</div>
            </div>

            {/* Mode selector */}
            {item.service.allowed_mode === 'both' && (
              <div className="tpc-mode">
                {(['online', 'in_person'] as const).map(m => (
                  <button
                    key={m}
                    className={`mode-btn ${modeForItem === m ? 'active' : ''}`}
                    onClick={() => {
                      onUpdateItem(idx, { mode: m, start_time: '', end_time: '' });
                    }}
                  >
                    {m === 'online' ? '💻 Online' : '🏥 In person'}
                  </button>
                ))}
              </div>
            )}

            {/* Date picker */}
            <div className="tpc-date-row">
              <label className="tpc-label">Date</label>
              <div className="date-chips">
                {[1, 2, 3, 4, 5, 6, 7].map(n => {
                  const d = addDays(today, n);
                  const label = new Date(d + 'T12:00:00+05:30').toLocaleDateString('en-IN', {
                    timeZone: 'Asia/Kolkata', weekday: 'short', day: 'numeric', month: 'short'
                  });
                  const isSelected = currentDate === d;
                  return (
                    <button
                      key={d}
                      className={`date-chip ${isSelected ? 'active' : ''}`}
                      onClick={() => {
                        setDates(prev => ({ ...prev, [dateKey]: d }));
                        onUpdateItem(idx, { start_time: '', end_time: '' });
                        fetchSlots(item.service.id, modeForItem, d);
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slots */}
            <div className="tpc-slots-row">
              <label className="tpc-label">Available times (IST)</label>
              {!slots[slotKey] && !isLoading && (
                <button className="btn-ghost btn-sm" onClick={() => fetchSlots(item.service.id, modeForItem, currentDate)}>
                  Show available times
                </button>
              )}
              {isLoading && <div className="tpc-loading">Loading slots…</div>}
              {!isLoading && slots[slotKey] && (
                <div className="slots-grid">
                  {availableSlots.length === 0 && (
                    <div className="no-slots">No slots available on this date. Try another day.</div>
                  )}
                  {availableSlots.map(slot => {
                    const isSelected = item.start_time === slot.start_time;
                    // Check clash with other basket items
                    const clashes = basket.some((b, i) =>
                      i !== idx && b.start_time && b.end_time &&
                      !(slot.end_time <= b.start_time || slot.start_time >= b.end_time)
                    );
                    return (
                      <button
                        key={slot.start_time}
                        className={`slot-chip ${isSelected ? 'selected' : ''} ${clashes ? 'clashes' : ''}`}
                        disabled={clashes}
                        title={clashes ? 'Clashes with another service in your booking' : undefined}
                        onClick={() => onUpdateItem(idx, { start_time: slot.start_time, end_time: slot.end_time })}
                      >
                        {slot.display_ist}
                        {clashes && <span className="clash-label"> ✗</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {selectedTime && (
              <div className="tpc-selected">
                ✓ Selected: {formatTime(selectedTime)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---- Step 3: Details Form ----
function StepDetails({
  details, onChange
}: {
  details: { name: string; email: string; phone: string; language: string; notes: string; consent: boolean };
  onChange: (k: string, v: string | boolean) => void;
}) {
  return (
    <div className="step-content">
      <h2 className="step-heading">Your details</h2>
      <p className="step-subheading">We collect only what is needed to confirm your appointment. No clinical notes in this form.</p>
      <div className="details-form">
        <div className="form-group">
          <label className="form-label">Full name *</label>
          <input className="form-input" value={details.name} onChange={e => onChange('name', e.target.value)} placeholder="Your full name" />
        </div>
        <div className="form-group">
          <label className="form-label">Email address *</label>
          <input className="form-input" type="email" value={details.email} onChange={e => onChange('email', e.target.value)} placeholder="your@email.com" />
        </div>
        <div className="form-group">
          <label className="form-label">Phone number *</label>
          <input className="form-input" type="tel" value={details.phone} onChange={e => onChange('phone', e.target.value)} placeholder="+91 98000 00000" />
        </div>
        <div className="form-group">
          <label className="form-label">Preferred language</label>
          <select className="form-input" value={details.language} onChange={e => onChange('language', e.target.value)}>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Tamil">Tamil</option>
            <option value="Bengali">Bengali</option>
            <option value="Kannada">Kannada</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Optional note (general context only — no clinical details)</label>
          <textarea className="form-input form-textarea" value={details.notes} onChange={e => onChange('notes', e.target.value)} placeholder="Anything helpful for the coordinator (optional)" rows={3} />
        </div>
        <div className="consent-block">
          <label className="consent-label">
            <input type="checkbox" checked={details.consent} onChange={e => onChange('consent', e.target.checked)} className="consent-checkbox" />
            <span>
              I understand Better Mind is not an emergency service. In a crisis, I will call <strong>Tele-MANAS (14416)</strong> or <strong>KIRAN (1800-599-0019)</strong>.
              I consent to Better Mind storing my contact details to manage this appointment, as described in their privacy policy.
              <span className="consent-version"> (Consent v1.0)</span>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ---- Step 4: Review & Confirm ----
function StepReview({
  basket, details, onConfirm, confirming, error
}: {
  basket: BasketItem[];
  details: { name: string; email: string; phone: string; language: string; notes: string; consent: boolean };
  onConfirm: () => void;
  confirming: boolean;
  error: string;
}) {
  return (
    <div className="step-content">
      <h2 className="step-heading">Review your booking</h2>
      <p className="step-subheading">Your practitioner will be assigned at confirmation.</p>
      <div className="review-card">
        <div className="review-section">
          <div className="review-section-title">Your appointment</div>
          {basket.map(item => (
            <div key={item.service.id} className="review-item">
              <div className="review-item-name">{item.service.name}</div>
              <div className="review-item-meta">
                {MODE_LABELS[item.mode]} · {formatTime(item.start_time)} IST · {item.service.duration_minutes} min
              </div>
            </div>
          ))}
        </div>
        <div className="review-section">
          <div className="review-section-title">Your details</div>
          <div className="review-detail"><span>Name</span><span>{details.name}</span></div>
          <div className="review-detail"><span>Email</span><span>{details.email}</span></div>
          <div className="review-detail"><span>Phone</span><span>{details.phone}</span></div>
          <div className="review-detail"><span>Language</span><span>{details.language}</span></div>
        </div>
      </div>
      {error && <div className="booking-error">{error}</div>}
      <button className="btn-primary btn-lg" onClick={onConfirm} disabled={confirming}>
        {confirming ? 'Confirming…' : 'Confirm booking'}
      </button>
      <p className="review-note">
        By confirming, you agree to the consent statement provided. Your practitioner will be shown in your confirmation email.
      </p>
    </div>
  );
}

// ---- Booking Summary Sidebar ----
function BookingSummary({ basket, step }: { basket: BasketItem[]; step: number }) {
  if (!basket.length) return null;
  return (
    <div className="booking-summary">
      <div className="bs-title">Your booking</div>
      {basket.map(item => (
        <div key={item.service.id} className="bs-item">
          <div className="bs-item-name">{item.service.name}</div>
          {item.start_time && (
            <div className="bs-item-time">{formatTime(item.start_time)} · {MODE_LABELS[item.mode]}</div>
          )}
          {!item.start_time && step > 0 && (
            <div className="bs-item-time pending">Time not selected</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ---- Main Booking Page ----
export default function BookPage() {
  const [step, setStep] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [details, setDetails] = useState({ name: '', email: '', phone: '', language: 'English', notes: '', consent: false });
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState<{ reference: string; token: string } | null>(null);

  useEffect(() => {
    fetch('/api/staff/services')
      .then(r => r.json())
      .then(d => setServices(d.services || []));
  }, []);

  const toggleService = (s: Service) => {
    setBasket(prev => {
      const exists = prev.find(b => b.service.id === s.id);
      if (exists) return prev.filter(b => b.service.id !== s.id);
      const defaultMode = s.allowed_mode === 'in_person' ? 'in_person' : 'online';
      return [...prev, { service: s, mode: defaultMode, start_time: '', end_time: '' }];
    });
  };

  const updateBasketItem = (idx: number, update: Partial<BasketItem>) => {
    setBasket(prev => prev.map((item, i) => i === idx ? { ...item, ...update } : item));
  };

  const updateDetails = (k: string, v: string | boolean) => {
    setDetails(prev => ({ ...prev, [k]: v }));
  };

  const canNext = () => {
    if (step === 0) return basket.length > 0;
    if (step === 1) return basket.every(b => b.start_time && b.end_time);
    if (step === 2) return details.name && details.email && details.phone && details.consent;
    return true;
  };

  const handleConfirm = async () => {
    setConfirming(true);
    setError('');
    try {
      const res = await fetch('/api/staff/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: details.name,
          email: details.email,
          phone: details.phone,
          preferred_language: details.language,
          notes: details.notes,
          consent_version: 'v1.0',
          items: basket.map(b => ({
            service_id: b.service.id,
            mode: b.mode,
            start_time: b.start_time,
            end_time: b.end_time
          }))
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Booking failed. Please try again.');
      setConfirmed({ reference: data.booking.booking_reference, token: data.booking.secure_token });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setConfirming(false);
    }
  };

  if (confirmed) {
    return (
      <div className="booking-page">
        <div className="booking-confirmed">
          <div className="confirmed-icon">✅</div>
          <h1 className="confirmed-title">Booking confirmed</h1>
          <div className="confirmed-ref">Reference: <strong>{confirmed.reference}</strong></div>
          <p className="confirmed-desc">
            We have sent a confirmation to <strong>{details.email}</strong>.
            Your practitioner will be named in that confirmation. All times are in IST.
          </p>
          <p className="confirmed-desc">
            To view, reschedule, or cancel: <Link href={`/booking/${confirmed.token}`} className="confirmed-link">Manage your booking →</Link>
          </p>
          <div className="confirmed-crisis">
            In a crisis? Call <strong>Tele-MANAS: 14416</strong> or <strong>KIRAN: 1800-599-0019</strong> (24/7 toll-free).
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-header">
        <Link href="/" className="back-link">← Better Mind</Link>
        <h1 className="booking-title">Book an appointment</h1>
        <p className="booking-subtitle">Online and in-person sessions available. All times in IST.</p>
      </div>

      {/* Progress */}
      <div className="booking-progress">
        {STEPS.map((s, i) => (
          <div key={s} className={`progress-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
            <div className="progress-dot">{i < step ? '✓' : i + 1}</div>
            <div className="progress-label">{s}</div>
          </div>
        ))}
      </div>

      <div className="booking-layout">
        <div className="booking-main">
          {step === 0 && <StepServices services={services} basket={basket} onToggle={toggleService} />}
          {step === 1 && <StepTimes basket={basket} onUpdateItem={updateBasketItem} />}
          {step === 2 && <StepDetails details={details} onChange={updateDetails} />}
          {step === 3 && <StepReview basket={basket} details={details} onConfirm={handleConfirm} confirming={confirming} error={error} />}

          <div className="booking-nav">
            {step > 0 && (
              <button className="btn-outline" onClick={() => setStep(s => s - 1)}>← Back</button>
            )}
            {step < 3 && (
              <button
                className="btn-primary"
                disabled={!canNext()}
                onClick={() => setStep(s => s + 1)}
              >
                {step === 0 ? `Continue with ${basket.length} service${basket.length !== 1 ? 's' : ''}` : 'Continue →'}
              </button>
            )}
          </div>
        </div>

        <div className="booking-aside">
          <BookingSummary basket={basket} step={step} />
        </div>
      </div>

      {/* Crisis line on booking page */}
      <div className="booking-crisis-footer">
        Better Mind is not an emergency service. In a crisis, call <strong>Tele-MANAS: 14416</strong> or <strong>KIRAN: 1800-599-0019</strong>.
      </div>
    </div>
  );
}
