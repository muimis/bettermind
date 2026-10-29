'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Compass,
  Brain,
  Leaf,
  Sparkles,
  Heart,
  CheckCircle2,
  Calendar,
  Clock,
  Video,
  Building2,
  Shield,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  HelpCircle,
  X,
  Phone,
  Mail,
  User,
  Globe,
  FileText
} from '@/components/icons';

type Service = {
  id: string;
  name: string;
  slug: string;
  service_group: string;
  description: string;
  duration_minutes: number;
  allowed_mode: string;
  requires_initial_consult: boolean;
  fee: number;
};

type Slot = {
  start_time: string;
  end_time: string;
  display_ist: string;
};

type BasketItem = {
  service: Service;
  mode: 'online' | 'in_person';
  start_time: string;
  end_time: string;
};

const STEPS = [
  { num: 1, title: 'Choose Services', sub: 'Select one or more' },
  { num: 2, title: 'Select Times', sub: 'Zero-clash scheduling' },
  { num: 3, title: 'Your Details', sub: 'Confidential & secure' },
  { num: 4, title: 'Confirm Care Plan', sub: 'Instant confirmation' }
];

const GROUP_META: Record<string, { icon: any; color: string; bg: string }> = {
  'Start here': { icon: Compass, color: '#124E47', bg: '#EDF6F4' },
  'Mind': { icon: Brain, color: '#3949AB', bg: '#EEF2FB' },
  'Body': { icon: Leaf, color: '#2E694F', bg: '#EEF7F2' },
  'Wellness': { icon: Heart, color: '#A36100', bg: '#FEF7ED' }
};

function formatIST(iso: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
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

// Generate Google Calendar Link
function makeGoogleCalendarUrl(title: string, startIso: string, endIso: string, details: string, location: string) {
  const formatGCal = (iso: string) => {
    return new Date(iso).toISOString().replace(/-|:|\.\d\d\d/g, '');
  };
  const dates = `${formatGCal(startIso)}/${formatGCal(endIso)}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
}

// ========================================================
// STEP 1: SELECT SERVICES
// ========================================================
function StepServices({
  services,
  basket,
  onToggle
}: {
  services: Service[];
  basket: BasketItem[];
  onToggle: (s: Service) => void;
}) {
  const [filter, setFilter] = useState<string>('All');
  const groups = ['Start here', 'Mind', 'Body', 'Wellness'];

  const filteredGroups = filter === 'All' ? groups : [filter];

  return (
    <div className="booking-step-content">
      <div className="step-intro-box">
        <h2 className="step-main-title">Select Your Care Services</h2>
        <p className="step-sub-desc">
          You can select multiple disciplines in one appointment. Our booking engine ensures your times never clash.
        </p>
      </div>

      {/* Quick filter pills */}
      <div className="b-filter-pills-row">
        {['All', 'Start here', 'Mind', 'Body', 'Wellness'].map(g => (
          <button
            key={g}
            type="button"
            className={`b-filter-pill ${filter === g ? 'active' : ''}`}
            onClick={() => setFilter(g)}
          >
            {g === 'All' ? 'All Disciplines' : g}
          </button>
        ))}
      </div>

      <div className="services-selector-stack">
        {filteredGroups.map(groupName => {
          const items = services.filter(s => s.service_group === groupName);
          if (!items.length) return null;
          const meta = GROUP_META[groupName] || { icon: Compass, color: '#124E47', bg: '#EDF6F4' };
          const GroupIcon = meta.icon;

          return (
            <div key={groupName} className="b-group-wrapper">
              <div className="b-group-header" style={{ color: meta.color }}>
                <span className="b-group-icon" style={{ background: meta.bg }}>
                  <GroupIcon size={16} />
                </span>
                <span className="b-group-title">{groupName}</span>
              </div>

              <div className="b-group-cards">
                {items.map(service => {
                  const selected = basket.some(b => b.service.id === service.id);
                  const isFree = service.fee === 0;

                  return (
                    <div
                      key={service.id}
                      className={`b-service-card ${selected ? 'selected' : ''}`}
                      onClick={() => onToggle(service)}
                      role="checkbox"
                      aria-checked={selected}
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          onToggle(service);
                        }
                      }}
                    >
                      <div className="bsc-top">
                        <div className="bsc-info">
                          <h3 className="bsc-title">{service.name}</h3>
                          <div className="bsc-meta">
                            <span className="bsc-time"><Clock size={13} /> {service.duration_minutes} min</span>
                            <span className="bsc-sep">·</span>
                            <span className="bsc-mode">
                              {service.allowed_mode === 'both' ? 'Online or In-Person' : service.allowed_mode}
                            </span>
                          </div>
                        </div>

                        <div className="bsc-action-badge">
                          <div className="bsc-fee">
                            {isFree ? (
                              <span className="free-text">₹0 · Free</span>
                            ) : (
                              <span>₹{service.fee.toLocaleString('en-IN')}</span>
                            )}
                          </div>
                          <div className={`bsc-check-circle ${selected ? 'checked' : ''}`}>
                            {selected ? <CheckCircle2 size={20} /> : <div className="plus-icon">+</div>}
                          </div>
                        </div>
                      </div>

                      <p className="bsc-desc">{service.description}</p>

                      {service.requires_initial_consult && (
                        <div className="bsc-req-badge">
                          <Shield size={12} />
                          <span>Requires Initial Care Assessment or prior psychiatric triage</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ========================================================
// STEP 2: SELECT TIMES (Auto-loading with morning/afternoon/evening)
// ========================================================
function StepTimes({
  basket,
  onUpdateItem
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

  // Auto-fetch slots for each service on initial render
  useEffect(() => {
    basket.forEach((item, idx) => {
      const dateKey = `date_${idx}`;
      const defaultDate = dates[dateKey] || addDays(today, 1);
      if (!dates[dateKey]) {
        setDates(prev => ({ ...prev, [dateKey]: defaultDate }));
      }
      const slotKey = `${item.service.id}_${item.mode}_${defaultDate}`;
      if (!slots[slotKey] && !loading[slotKey]) {
        fetchSlots(item.service.id, item.mode, defaultDate);
      }
    });
  }, [basket, dates, fetchSlots, loading, slots, today]);

  // Group slots by time of day
  const groupSlots = (slotList: Slot[]) => {
    const morning: Slot[] = [];
    const afternoon: Slot[] = [];
    const evening: Slot[] = [];

    slotList.forEach(slot => {
      const dateObj = new Date(slot.start_time);
      const istHours = (dateObj.getUTCHours() + 5 + (dateObj.getUTCMinutes() + 30 >= 60 ? 1 : 0)) % 24;
      if (istHours < 12) {
        morning.push(slot);
      } else if (istHours < 17) {
        afternoon.push(slot);
      } else {
        evening.push(slot);
      }
    });

    return { morning, afternoon, evening };
  };

  return (
    <div className="booking-step-content">
      <div className="step-intro-box">
        <h2 className="step-main-title">Select Appointment Times</h2>
        <p className="step-sub-desc">
          Choose a date and preferred time slot for each service. All times are displayed in Indian Standard Time (IST).
        </p>
      </div>

      <div className="time-pickers-stack">
        {basket.map((item, idx) => {
          const dateKey = `date_${idx}`;
          const currentDate = dates[dateKey] || addDays(today, 1);
          const modeForItem = item.mode;
          const slotKey = `${item.service.id}_${modeForItem}_${currentDate}`;
          const availableSlots = slots[slotKey] || [];
          const isLoading = loading[slotKey];
          const grouped = groupSlots(availableSlots);

          return (
            <div key={item.service.id} className="time-service-card">
              <div className="tsc-header">
                <div>
                  <h3 className="tsc-service-title">{item.service.name}</h3>
                  <div className="tsc-sub-meta">
                    <Clock size={13} /> {item.service.duration_minutes} min duration
                  </div>
                </div>

                {/* Mode Selector Pill Buttons */}
                {item.service.allowed_mode === 'both' && (
                  <div className="tsc-mode-selector">
                    <button
                      type="button"
                      className={`mode-toggle-btn ${modeForItem === 'online' ? 'active' : ''}`}
                      onClick={() => {
                        onUpdateItem(idx, { mode: 'online', start_time: '', end_time: '' });
                        fetchSlots(item.service.id, 'online', currentDate);
                      }}
                    >
                      <Video size={14} />
                      <span>Online Video</span>
                    </button>
                    <button
                      type="button"
                      className={`mode-toggle-btn ${modeForItem === 'in_person' ? 'active' : ''}`}
                      onClick={() => {
                        onUpdateItem(idx, { mode: 'in_person', start_time: '', end_time: '' });
                        fetchSlots(item.service.id, 'in_person', currentDate);
                      }}
                    >
                      <Building2 size={14} />
                      <span>In-Person Clinic Hub</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Date Selection Chips (Next 7 days) */}
              <div className="tsc-date-section">
                <div className="tsc-section-label">1. Choose Date</div>
                <div className="tsc-dates-scroll">
                  {[1, 2, 3, 4, 5, 6, 7].map(n => {
                    const d = addDays(today, n);
                    const dateObj = new Date(d + 'T12:00:00+05:30');
                    const dayName = dateObj.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'short' });
                    const dayNum = dateObj.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short' });
                    const isSelected = currentDate === d;

                    return (
                      <button
                        key={d}
                        type="button"
                        className={`date-box-btn ${isSelected ? 'active' : ''}`}
                        onClick={() => {
                          setDates(prev => ({ ...prev, [dateKey]: d }));
                          onUpdateItem(idx, { start_time: '', end_time: '' });
                          fetchSlots(item.service.id, modeForItem, d);
                        }}
                      >
                        <span className="db-weekday">{dayName}</span>
                        <span className="db-day">{dayNum}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slot Selection */}
              <div className="tsc-slots-section">
                <div className="tsc-section-label">2. Select Time Slot (IST)</div>

                {isLoading && (
                  <div className="slots-loading-state">
                    <div className="spinner"></div>
                    <span>Checking specialist availability in IST…</span>
                  </div>
                )}

                {!isLoading && availableSlots.length === 0 && (
                  <div className="slots-empty-state">
                    <p>No open slots for this service on this date.</p>
                    <span className="slots-empty-hint">Please choose a different date from the row above.</span>
                  </div>
                )}

                {!isLoading && availableSlots.length > 0 && (
                  <div className="slots-grouping-container">
                    {/* Morning */}
                    {grouped.morning.length > 0 && (
                      <div className="slot-day-block">
                        <div className="slot-time-group-title">🌅 Morning (9:00 AM – 12:00 PM)</div>
                        <div className="slots-chip-grid">
                          {grouped.morning.map(slot => renderSlotButton(slot, item, idx, basket, onUpdateItem))}
                        </div>
                      </div>
                    )}

                    {/* Afternoon */}
                    {grouped.afternoon.length > 0 && (
                      <div className="slot-day-block">
                        <div className="slot-time-group-title">☀️ Afternoon (12:00 PM – 5:00 PM)</div>
                        <div className="slots-chip-grid">
                          {grouped.afternoon.map(slot => renderSlotButton(slot, item, idx, basket, onUpdateItem))}
                        </div>
                      </div>
                    )}

                    {/* Evening */}
                    {grouped.evening.length > 0 && (
                      <div className="slot-day-block">
                        <div className="slot-time-group-title">🌙 Evening (5:00 PM – 8:00 PM)</div>
                        <div className="slots-chip-grid">
                          {grouped.evening.map(slot => renderSlotButton(slot, item, idx, basket, onUpdateItem))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Selected Slot Confirmation Bar */}
              {item.start_time && (
                <div className="tsc-selected-slot-bar">
                  <CheckCircle2 size={16} className="bar-check" />
                  <span>
                    Selected: <strong>{formatIST(item.start_time)}</strong> ({item.mode === 'online' ? 'Online Video' : 'In-Person Clinic Hub'})
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Render individual slot chip with clash detection
function renderSlotButton(
  slot: Slot,
  item: BasketItem,
  idx: number,
  basket: BasketItem[],
  onUpdateItem: (idx: number, update: Partial<BasketItem>) => void
) {
  const isSelected = item.start_time === slot.start_time;

  // Check clash with other basket items
  const clashesWith = basket.find((b, i) => {
    if (i === idx || !b.start_time || !b.end_time) return false;
    return !(slot.end_time <= b.start_time || slot.start_time >= b.end_time);
  });

  const isClash = !!clashesWith;

  return (
    <button
      key={slot.start_time}
      type="button"
      className={`slot-chip-btn ${isSelected ? 'selected' : ''} ${isClash ? 'clash' : ''}`}
      disabled={isClash}
      title={isClash ? `Clashes with ${clashesWith.service.name}` : undefined}
      onClick={() => onUpdateItem(idx, { start_time: slot.start_time, end_time: slot.end_time })}
    >
      <span className="slot-time-text">{slot.display_ist}</span>
      {isClash && <span className="clash-tag">Clashes</span>}
    </button>
  );
}

// ========================================================
// STEP 3: PATIENT DETAILS
// ========================================================
function StepDetails({
  details,
  onChange
}: {
  details: {
    bookingFor: string;
    name: string;
    email: string;
    phone: string;
    language: string;
    notes: string;
    consent: boolean;
  };
  onChange: (k: string, v: string | boolean) => void;
}) {
  return (
    <div className="booking-step-content">
      <div className="step-intro-box">
        <h2 className="step-main-title">Your Contact & Session Preferences</h2>
        <p className="step-sub-desc">
          We collect only the essential details required to coordinate your appointment. Your data is end-to-end encrypted under the DPDP Act.
        </p>
      </div>

      <div className="details-form-container">
        {/* Who is this booking for */}
        <div className="form-group">
          <label className="form-label">Who is this appointment for? *</label>
          <div className="radio-pills-row">
            {[
              { id: 'myself', label: 'For Myself' },
              { id: 'dependent', label: 'My Child / Minor Ward' },
              { id: 'family', label: 'Spouse / Family Member' }
            ].map(opt => (
              <label key={opt.id} className={`radio-pill-item ${details.bookingFor === opt.id ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="bookingFor"
                  value={opt.id}
                  checked={details.bookingFor === opt.id}
                  onChange={e => onChange('bookingFor', e.target.value)}
                  className="sr-only"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Full Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="patient-name">Full Name *</label>
          <div className="input-with-icon">
            <User size={16} className="input-icon" />
            <input
              id="patient-name"
              className="form-input"
              value={details.name}
              onChange={e => onChange('name', e.target.value)}
              placeholder="e.g. Aditi Sharma"
              required
            />
          </div>
        </div>

        {/* Email & Phone Row */}
        <div className="form-row-2col">
          <div className="form-group">
            <label className="form-label" htmlFor="patient-email">Email Address *</label>
            <div className="input-with-icon">
              <Mail size={16} className="input-icon" />
              <input
                id="patient-email"
                type="email"
                className="form-input"
                value={details.email}
                onChange={e => onChange('email', e.target.value)}
                placeholder="aditi@example.com"
                required
              />
            </div>
            <span className="field-hint">Confirmation & secure video link are sent here.</span>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="patient-phone">Phone Number (WhatsApp) *</label>
            <div className="input-with-icon">
              <Phone size={16} className="input-icon" />
              <input
                id="patient-phone"
                type="tel"
                className="form-input"
                value={details.phone}
                onChange={e => onChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
                required
              />
            </div>
            <span className="field-hint">For appointment SMS/WhatsApp reminders.</span>
          </div>
        </div>

        {/* Preferred Language */}
        <div className="form-group">
          <label className="form-label" htmlFor="patient-lang">Preferred Language for Consultation</label>
          <div className="input-with-icon">
            <Globe size={16} className="input-icon" />
            <select
              id="patient-lang"
              className="form-input form-select"
              value={details.language}
              onChange={e => onChange('language', e.target.value)}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Kannada">Kannada</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Tamil">Tamil</option>
              <option value="Bengali">Bengali</option>
            </select>
          </div>
          <span className="field-hint">We will prioritize a specialist fluent in your preferred language.</span>
        </div>

        {/* Optional Context Note */}
        <div className="form-group">
          <label className="form-label" htmlFor="patient-notes">
            Brief context or reason for visit (Optional)
          </label>
          <textarea
            id="patient-notes"
            className="form-input form-textarea"
            value={details.notes}
            onChange={e => onChange('notes', e.target.value)}
            placeholder="e.g. Dealing with severe workplace burnout and insomnia for past 3 months (Do not include sensitive medical records here)"
            rows={3}
          />
          <span className="field-hint">General non-clinical context only. Detailed history is discussed during your consultation.</span>
        </div>

        {/* Consent and Emergency Disclaimer */}
        <div className="b-consent-card">
          <label className="consent-checkbox-label">
            <input
              type="checkbox"
              checked={details.consent}
              onChange={e => onChange('consent', e.target.checked)}
              className="consent-box"
              required
            />
            <span className="consent-text">
              I understand that Better Mind is an outpatient scheduled clinic and does <strong>not</strong> provide emergency or 24/7 crisis psychiatric care. In a medical or psychological crisis, I will reach out to <strong>Tele-MANAS (14416)</strong>, <strong>KIRAN (1800-599-0019)</strong>, or visit hospital casualty.
              I consent to Better Mind storing my contact information to manage and coordinate this booking in accordance with the <em>Digital Personal Data Protection Act, 2023</em>.
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

// ========================================================
// STEP 4: REVIEW & CONFIRM
// ========================================================
function StepReview({
  basket,
  details,
  onConfirm,
  confirming,
  error
}: {
  basket: BasketItem[];
  details: {
    bookingFor: string;
    name: string;
    email: string;
    phone: string;
    language: string;
    notes: string;
  };
  onConfirm: () => void;
  confirming: boolean;
  error: string;
}) {
  const totalFee = basket.reduce((acc, item) => acc + item.service.fee, 0);
  const totalMinutes = basket.reduce((acc, item) => acc + item.service.duration_minutes, 0);

  return (
    <div className="booking-step-content">
      <div className="step-intro-box">
        <h2 className="step-main-title">Review & Confirm Your Care Plan</h2>
        <p className="step-sub-desc">
          Please review your scheduled appointments and contact details below before confirming.
        </p>
      </div>

      <div className="review-cards-layout">
        {/* Appointments Summary */}
        <div className="review-section-card">
          <div className="rsc-header">
            <Calendar size={18} />
            <h3>Your Appointments ({basket.length} {basket.length === 1 ? 'Service' : 'Services'})</h3>
          </div>

          <div className="review-items-stack">
            {basket.map((item, idx) => (
              <div key={item.service.id} className="review-service-row">
                <div className="rsr-left">
                  <div className="rsr-index">{idx + 1}</div>
                  <div>
                    <h4 className="rsr-name">{item.service.name}</h4>
                    <div className="rsr-meta">
                      <span>{item.mode === 'online' ? '💻 Online Video Session' : '🏥 In-Person Clinic Hub Visit'}</span>
                      <span>·</span>
                      <span>{item.service.duration_minutes} min</span>
                    </div>
                  </div>
                </div>

                <div className="rsr-right">
                  <div className="rsr-time">{formatIST(item.start_time)} IST</div>
                  <div className="rsr-fee">
                    {item.service.fee === 0 ? 'Free Intake' : `₹${item.service.fee.toLocaleString('en-IN')}`}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="review-totals-bar">
            <div>
              <span className="rt-label">Total Time:</span> <strong>{totalMinutes} Minutes</strong>
            </div>
            <div>
              <span className="rt-label">Total Consultation Fee:</span>{' '}
              <strong className="rt-fee">
                {totalFee === 0 ? '₹0 · Complimentary' : `₹${totalFee.toLocaleString('en-IN')}`}
              </strong>
            </div>
          </div>
        </div>

        {/* Contact Details Summary */}
        <div className="review-section-card">
          <div className="rsc-header">
            <User size={18} />
            <h3>Your Contact Details</h3>
          </div>

          <div className="review-details-grid">
            <div className="rdg-cell">
              <span className="rdg-label">Full Name</span>
              <span className="rdg-val">{details.name}</span>
            </div>
            <div className="rdg-cell">
              <span className="rdg-label">Email</span>
              <span className="rdg-val">{details.email}</span>
            </div>
            <div className="rdg-cell">
              <span className="rdg-label">Phone</span>
              <span className="rdg-val">{details.phone}</span>
            </div>
            <div className="rdg-cell">
              <span className="rdg-label">Language</span>
              <span className="rdg-val">{details.language}</span>
            </div>
          </div>

          <div className="review-doctor-assignment-note">
            <Shield size={16} className="note-shield" />
            <span>
              <strong>Practitioner Assignment:</strong> A qualified specialist from each service faculty will be matched to your timeslot based on language and schedule. Their name, clinical registration, and room link will appear instantly on your confirmation page.
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="booking-error-banner" role="alert">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="confirm-action-footer">
        <button
          type="button"
          className="btn-primary btn-lg btn-confirm-booking"
          onClick={onConfirm}
          disabled={confirming}
        >
          {confirming ? (
            <>
              <div className="spinner-white"></div>
              <span>Securing Your Appointments…</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={18} />
              <span>Confirm & Book Appointment</span>
            </>
          )}
        </button>
        <p className="confirm-micro-copy">
          No advance payment required for triage. Free cancellation or rescheduling up to 4 hours in advance.
        </p>
      </div>
    </div>
  );
}

// ========================================================
// LIVE BOOKING SIDEBAR DRAWER (STAYS VISIBLE)
// ========================================================
function BookingSummarySidebar({
  basket,
  step
}: {
  basket: BasketItem[];
  step: number;
}) {
  const totalFee = basket.reduce((acc, i) => acc + i.service.fee, 0);
  const totalMinutes = basket.reduce((acc, i) => acc + i.service.duration_minutes, 0);

  return (
    <aside className="booking-summary-sidebar" aria-label="Selected Care Plan Summary">
      <div className="bss-header">
        <h3 className="bss-title">Your Care Plan</h3>
        <span className="bss-count-badge">{basket.length} {basket.length === 1 ? 'service' : 'services'}</span>
      </div>

      {basket.length === 0 ? (
        <div className="bss-empty">
          <Compass size={32} className="bss-empty-icon" />
          <p>No services selected yet.</p>
          <span>Choose one or more disciplines from the catalogue to get started.</span>
        </div>
      ) : (
        <div className="bss-items-list">
          {basket.map(item => (
            <div key={item.service.id} className="bss-item-card">
              <div className="bss-item-title">{item.service.name}</div>
              <div className="bss-item-sub">
                <span>{item.service.duration_minutes}m</span> ·{' '}
                <span>{item.service.fee === 0 ? 'Free' : `₹${item.service.fee.toLocaleString('en-IN')}`}</span>
              </div>

              {item.start_time ? (
                <div className="bss-item-scheduled">
                  <CheckCircle2 size={13} className="sch-check" />
                  <span>{formatIST(item.start_time)} IST</span>
                </div>
              ) : step > 0 ? (
                <div className="bss-item-pending">
                  <Clock size={13} />
                  <span>Time not selected yet</span>
                </div>
              ) : null}
            </div>
          ))}

          <div className="bss-footer-totals">
            <div className="bss-total-line">
              <span>Total Session Time</span>
              <strong>{totalMinutes} min</strong>
            </div>
            <div className="bss-total-line highlight">
              <span>Estimated Investment</span>
              <strong className="bss-total-fee">
                {totalFee === 0 ? '₹0 · Free' : `₹${totalFee.toLocaleString('en-IN')}`}
              </strong>
            </div>
          </div>
        </div>
      )}

      <div className="bss-guarantees">
        <div className="bss-g-line">
          <Shield size={14} />
          <span>Strict no-overlap database lock</span>
        </div>
        <div className="bss-g-line">
          <FileText size={14} />
          <span>Tax invoices for OPD insurance</span>
        </div>
      </div>
    </aside>
  );
}

// ========================================================
// MAIN BOOKING PAGE CONTROLLER
// ========================================================
export default function BookPage() {
  const [step, setStep] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [details, setDetails] = useState({
    bookingFor: 'myself',
    name: '',
    email: '',
    phone: '',
    language: 'English',
    notes: '',
    consent: false
  });
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState<{
    reference: string;
    token: string;
    items?: any[];
  } | null>(null);

  useEffect(() => {
    fetch('/api/staff/services')
      .then(r => r.json())
      .then(d => {
        const loaded: Service[] = d.services || [];
        setServices(loaded);

        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          const serviceParam = params.get('service');
          if (serviceParam && loaded.length > 0) {
            const matched = loaded.find(s => s.slug === serviceParam || s.id === serviceParam);
            if (matched) {
              const defaultMode = matched.allowed_mode === 'in_person' ? 'in_person' : 'online';
              setBasket([{ service: matched, mode: defaultMode, start_time: '', end_time: '' }]);
            }
          }
        }
      })
      .catch(() => {});
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
    setBasket(prev => prev.map((item, i) => (i === idx ? { ...item, ...update } : item)));
  };

  const updateDetails = (k: string, v: string | boolean) => {
    setDetails(prev => ({ ...prev, [k]: v }));
  };

  const canNext = () => {
    if (step === 0) return basket.length > 0;
    if (step === 1) return basket.every(b => b.start_time && b.end_time);
    if (step === 2) return details.name.trim() !== '' && details.email.trim() !== '' && details.phone.trim() !== '' && details.consent;
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
      if (!res.ok) throw new Error(data.error || 'Booking reservation could not be completed. Please try again.');
      setConfirmed({
        reference: data.booking.booking_reference,
        token: data.booking.secure_token,
        items: data.booking.items || []
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setConfirming(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (confirmed) {
    const firstItem = confirmed.items?.[0];
    const googleCalUrl = firstItem
      ? makeGoogleCalendarUrl(
          `Better Mind Appointment: ${firstItem.service?.name || 'Consultation'}`,
          firstItem.start_time,
          firstItem.end_time,
          `Booking Reference: ${confirmed.reference}\nPractitioner: ${firstItem.practitioner?.name || 'Specialist'}\nBetter Mind Clinic`,
          firstItem.mode === 'online' ? 'Online Video Room' : 'Partner Clinic Hub (Location to confirm)'
        )
      : '#';

    return (
      <div className="booking-page-wrap">
        <div className="container booking-confirmed-container">
          <div className="confirmed-success-card">
            <div className="confirmed-check-bubble">
              <CheckCircle2 size={40} className="check-icon" />
            </div>

            <h1 className="confirmed-title">Your Care Plan is Confirmed</h1>
            <div className="confirmed-ref-badge">
              Booking Reference: <strong>{confirmed.reference}</strong>
            </div>

            <p className="confirmed-email-notice">
              A comprehensive confirmation and calendar invite have been sent to <strong>{details.email}</strong>.
            </p>

            {/* Scheduled items list with assigned doctors */}
            <div className="confirmed-services-summary">
              <h3 className="css-heading">Scheduled Sessions & Assigned Specialists</h3>
              <div className="css-cards-stack">
                {(confirmed.items || []).map((item: any, i: number) => (
                  <div key={item.id || i} className="confirmed-item-card">
                    <div className="cic-top">
                      <div className="cic-service-name">{item.service?.name || 'Care Session'}</div>
                      <div className="cic-mode">
                        {item.mode === 'online' ? '💻 Online Video' : '🏥 In-Person Clinic Hub'}
                      </div>
                    </div>
                    <div className="cic-doctor">
                      With <strong>{item.practitioner?.name || 'Specialist Clinician'}</strong>
                      {item.practitioner?.qualifications && (
                        <span className="cic-quals"> ({item.practitioner.qualifications})</span>
                      )}
                    </div>
                    <div className="cic-time">
                      <Calendar size={14} />
                      <span>{formatIST(item.start_time)} IST</span>
                    </div>

                    {item.mode === 'online' && item.meeting_link && (
                      <div className="cic-meeting-box">
                        <span>Encrypted Video Link:</span>
                        <a href={item.meeting_link} target="_blank" rel="noopener noreferrer" className="meeting-btn">
                          Launch Video Room
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar & Management Actions */}
            <div className="confirmed-actions-row">
              <a
                href={googleCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline btn-lg"
              >
                <Calendar size={18} />
                <span>Add to Google Calendar</span>
              </a>

              <Link href={`/booking/${confirmed.token}`} className="btn-primary btn-lg">
                <span>Manage Session in Booking Hub →</span>
              </Link>
            </div>

            {/* Preparation tips */}
            <div className="confirmed-prep-tips">
              <h4 className="cpt-title">Preparing for your session:</h4>
              <ul>
                <li><strong>Online Video:</strong> Join from a quiet, private room with headphones and stable internet.</li>
                <li><strong>In-Person Clinic Hub:</strong> Please arrive 10 minutes prior at your confirmed partner clinic center.</li>
                <li><strong>Need to reschedule?</strong> You can reschedule free of charge up to 4 hours in advance via your personal booking hub.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE STEPPER FORM VIEW
  return (
    <div className="booking-page-wrap">
      {/* Header Banner */}
      <section className="booking-hero-strip">
        <div className="container">
          <div className="bhs-inner">
            <div>
              <h1 className="bhs-title">Book an Appointment</h1>
              <p className="bhs-sub">
                Online video sessions across India and in-person visits at partner clinic hubs. All times in IST.
              </p>
            </div>
            <div className="bhs-contact-support">
              <span>Need help booking?</span>
              <a href="tel:+918047182200" className="bhs-phone-link">
                <Phone size={14} /> 080 4718 2200
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Stepper Bar */}
      <div className="booking-stepper-bar">
        <div className="container">
          <div className="stepper-track">
            {STEPS.map((s, idx) => {
              const isCurrent = idx === step;
              const isPast = idx < step;
              return (
                <div key={s.num} className={`stepper-step ${isCurrent ? 'active' : ''} ${isPast ? 'completed' : ''}`}>
                  <div className="stepper-circle">
                    {isPast ? <CheckCircle2 size={16} /> : s.num}
                  </div>
                  <div className="stepper-labels">
                    <span className="stepper-title">{s.title}</span>
                    <span className="stepper-sub">{s.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two Column Layout (Form + Live Sidebar) */}
      <div className="container booking-main-layout">
        <div className="booking-form-column">
          {step === 0 && (
            <StepServices services={services} basket={basket} onToggle={toggleService} />
          )}
          {step === 1 && (
            <StepTimes basket={basket} onUpdateItem={updateBasketItem} />
          )}
          {step === 2 && (
            <StepDetails details={details} onChange={updateDetails} />
          )}
          {step === 3 && (
            <StepReview
              basket={basket}
              details={details}
              onConfirm={handleConfirm}
              confirming={confirming}
              error={error}
            />
          )}

          {/* Stepper Navigation Buttons */}
          <div className="booking-nav-buttons">
            {step > 0 && (
              <button
                type="button"
                className="btn-outline"
                onClick={() => {
                  setStep(s => s - 1);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            )}

            {step < 3 && (
              <button
                type="button"
                className="btn-primary btn-next-step"
                disabled={!canNext()}
                onClick={() => {
                  setStep(s => s + 1);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
              >
                <span>
                  {step === 0
                    ? `Continue with ${basket.length} ${basket.length === 1 ? 'Service' : 'Services'}`
                    : 'Proceed to Next Step'}
                </span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Live Summary Sidebar */}
        <div className="booking-sidebar-column">
          <BookingSummarySidebar basket={basket} step={step} />
        </div>
      </div>
    </div>
  );
}
