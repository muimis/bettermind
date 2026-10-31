'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Brain,
  Leaf,
  Sparkles,
  Award,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Video,
  Building2,
  Shield,
  Clock,
  Phone,
  MapPin,
  Heart
} from '@/components/icons';

// 5 Core Booking Disciplines
const BOOKING_SERVICES = [
  {
    id: 'initial-assessment',
    slug: 'initial-assessment',
    tabName: 'Free 15m Intro',
    name: 'Complimentary Care Orientation',
    badge: 'RECOMMENDED FOR FIRST-TIME VISITORS',
    clinician: 'Ananya Roy, MSW',
    credentials: 'Lead Care Coordinator · TISS alumna',
    experience: '8+ yrs patient advocacy & triage',
    duration: '15 min',
    fee: '₹0 · Free',
    feeRaw: 0,
    photo: '/images/ananya-roy.jpg',
    summary: 'Speak privately with our Practice Coordinator to discuss your situation, ask any questions, and co-design your care pathway before committing.',
    modes: ['1080p Encrypted Video', 'Phone Call'],
    nextSlot: 'Today at 4:00 PM & 5:30 PM IST',
    icon: Compass,
    color: '#124E47'
  },
  {
    id: 'clinical-psychology',
    slug: 'clinical-psychology',
    tabName: 'Psychotherapy',
    name: 'Psychotherapy & Cognitive Clarity',
    badge: 'THE MIND',
    clinician: 'Dr. Meera Sen, Ph.D.',
    credentials: 'Senior Clinical Psychologist · NIMHANS alumna',
    experience: '11+ yrs clinical experience · RCI Licensed',
    duration: '50 min',
    fee: '₹1,800',
    feeRaw: 1800,
    photo: '/images/meera-sen.jpg',
    summary: 'An unhurried, private space to process complex life challenges, resolve persistent worry loops, and untangle burnout without clinical judgment.',
    modes: ['1080p Encrypted Video', 'Bangalore Private Suites'],
    nextSlot: 'Tomorrow at 10:30 AM & 3:00 PM IST',
    icon: Brain,
    color: '#163A32'
  },
  {
    id: 'therapeutic-yoga',
    slug: 'therapeutic-yoga',
    tabName: 'Somatic Release',
    name: 'Somatic Breath & Tension Release',
    badge: 'THE BODY',
    clinician: 'Rajesh Kumar, M.Sc.',
    credentials: 'Somatic Therapist · SVYASA alumnus',
    experience: 'Vagal tonus practitioner · Certified SEP',
    duration: '60 min',
    fee: '₹1,400',
    feeRaw: 1400,
    photo: '/images/rajesh-kumar.jpg',
    summary: 'When chronic stress locks into your musculature, polyvagal breathwork and somatic movement gently down-regulate your autonomic nervous system.',
    modes: ['1080p Encrypted Video', 'Bangalore Private Suites'],
    nextSlot: 'Today at 6:00 PM & Tomorrow at 9:00 AM IST',
    icon: Sparkles,
    color: '#8C5835'
  },
  {
    id: 'dietetics-nutrition',
    slug: 'dietetics-nutrition',
    tabName: 'Gut-Brain Nutrition',
    name: 'Gut-Brain Clinical Nutrition',
    badge: 'THE RHYTHM',
    clinician: 'Priya Sharma, RD',
    credentials: 'Lead Clinical Dietitian · Manipal alumna',
    experience: 'IDA Certified Gut-Brain Specialist',
    duration: '45 min',
    fee: '₹1,500',
    feeRaw: 1500,
    photo: '/images/priya-sharma.jpg',
    summary: 'Targeted nutrition for the enteric nervous system to soothe stress-induced digestion, eliminate afternoon brain fog, and optimize natural sleep cycles.',
    modes: ['1080p Encrypted Video', 'Bangalore Private Suites'],
    nextSlot: 'Tomorrow at 11:30 AM & 4:00 PM IST',
    icon: Leaf,
    color: '#8C5835'
  },
  {
    id: 'psychiatry-consultation',
    slug: 'psychiatry-consultation',
    tabName: 'Psychiatry & Sleep',
    name: 'Consultant Neuropsychiatry & Sleep',
    badge: 'THE BIOLOGY',
    clinician: 'Dr. Arun Nair, MD',
    credentials: 'Senior Psychiatrist · NIMHANS alumnus',
    experience: '14+ yrs practice · NMC Registered',
    duration: '45 min',
    fee: '₹2,200',
    feeRaw: 2200,
    photo: '/images/arun-nair.jpg',
    summary: 'Conservative, considerate medical evaluation of neurochemistry, chronic insomnia, and safe medication reviews in coordination with your therapy.',
    modes: ['1080p Encrypted Video', 'Bangalore Private Suites'],
    nextSlot: 'Tomorrow at 2:00 PM & 5:00 PM IST',
    icon: Award,
    color: '#163A32'
  }
];

export default function HomePage() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('initial-assessment');
  const [selectedMode, setSelectedMode] = useState<'online' | 'in_person'>('online');

  const activeService = BOOKING_SERVICES.find(s => s.id === selectedServiceId) || BOOKING_SERVICES[0];
  const ActiveIcon = activeService.icon;

  return (
    <div className="bm-booking-site-wrap">
      {/* 1. HERO WITH BUILT-IN INSTANT BOOKING CONSOLE */}
      <section className="bm-book-hero" id="book-now">
        <div className="container">
          <div className="bm-hero-content-stack">
            <div className="bm-hero-badge-pill">
              <span className="bm-live-beacon" />
              <span>Direct Appointments · NIMHANS & TISS Clinicians · No Subscription Needed</span>
            </div>

            <h1 className="bm-hero-main-title">
              Book Private Mental Health Consultations <br className="bm-br-desktop" />
              <em>in 60 Seconds.</em>
            </h1>

            <p className="bm-hero-subtitle">
              Unhurried 50-minute clinical sessions. Zero diagnostic labels, 100% confidential.
              Meet on encrypted 1080p video pan-India or in our private Indiranagar, Bangalore suites.
            </p>
          </div>

          {/* Interactive Fast Booking Console */}
          <div className="bm-fast-book-console" aria-label="Interactive Quick Booking Console">
            <div className="bm-console-header">
              <span className="bm-console-step-indicator">STEP 1 OF 2 · SELECT DISCIPLINE & MODE</span>
              <span className="bm-console-instant-tag">⚡ Live Availability</span>
            </div>

            {/* Quick Service Tabs */}
            <div className="bm-console-tabs-row" role="tablist">
              {BOOKING_SERVICES.map(s => {
                const isSelected = s.id === selectedServiceId;
                const TabIcon = s.icon;
                return (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedServiceId(s.id)}
                    className={`bm-console-tab ${isSelected ? 'active' : ''}`}
                  >
                    <TabIcon size={14} />
                    <span className="bm-tab-name">{s.tabName}</span>
                    <span className="bm-tab-fee">{s.feeRaw === 0 ? 'Free' : `₹${s.feeRaw}`}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Service Card Preview */}
            <div className="bm-console-preview-body">
              <div className="bm-preview-clinician-col">
                <img
                  src={activeService.photo}
                  alt={activeService.clinician}
                  className="bm-preview-avatar"
                />
                <div className="bm-preview-clinician-info">
                  <span className="bm-preview-badge">{activeService.badge}</span>
                  <h3 className="bm-preview-title">{activeService.name}</h3>
                  <div className="bm-preview-doctor-name">
                    <strong>{activeService.clinician}</strong>
                    <span> · {activeService.credentials}</span>
                  </div>
                  <p className="bm-preview-desc">{activeService.summary}</p>
                </div>
              </div>

              {/* Booking Action Column */}
              <div className="bm-preview-action-col">
                {/* Format / Mode Selector */}
                <div className="bm-mode-selector-wrap">
                  <span className="bm-field-label">Consultation Format:</span>
                  <div className="bm-mode-toggle-group">
                    <button
                      type="button"
                      onClick={() => setSelectedMode('online')}
                      className={`bm-mode-btn ${selectedMode === 'online' ? 'active' : ''}`}
                    >
                      <Video size={14} />
                      <span>Online Video</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMode('in_person')}
                      className={`bm-mode-btn ${selectedMode === 'in_person' ? 'active' : ''}`}
                    >
                      <Building2 size={14} />
                      <span>Bangalore Suite</span>
                    </button>
                  </div>
                </div>

                {/* Next Available Slot Preview */}
                <div className="bm-slot-preview-box">
                  <div className="bm-slot-label-row">
                    <Clock size={13} />
                    <span>Next Open Slot:</span>
                  </div>
                  <strong className="bm-slot-highlight">{activeService.nextSlot}</strong>
                  <span className="bm-slot-subtext">Instant calendar lock · Zero double-booking</span>
                </div>

                {/* Investment & Direct CTA Button */}
                <div className="bm-console-cta-row">
                  <div className="bm-rate-block">
                    <span className="bm-rate-duration">{activeService.duration} Consultation</span>
                    <strong className="bm-rate-price">{activeService.fee}</strong>
                  </div>

                  <Link
                    href={`/book?service=${activeService.slug}`}
                    className="bm-btn-console-book"
                  >
                    <span>Choose Time & Book</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Guarantees Footer inside Console */}
            <div className="bm-console-guarantees-bar">
              <div className="bm-cgb-item">
                <CheckCircle2 size={13} />
                <span>NIMHANS, TISS & SVYASA Alumni</span>
              </div>
              <div className="bm-cgb-item">
                <Shield size={13} />
                <span>100% Confidential (DPDP Act 2023)</span>
              </div>
              <div className="bm-cgb-item">
                <Heart size={13} />
                <span>Zero Diagnostic Stigma</span>
              </div>
              <div className="bm-cgb-item">
                <Calendar size={13} />
                <span>Free Rescheduling up to 4h Prior</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ALL SPECIALISTS & DISCIPLINES CATALOGUE */}
      <section className="bm-catalogue-section" id="specialists">
        <div className="container">
          <div className="bm-section-header-compact">
            <span className="bm-eyebrow-accent">CLINICAL SPECIALISTS & DISCIPLINES</span>
            <h2 className="bm-section-title">Select a Specialist & Reserve Your Slot</h2>
            <p className="bm-section-desc">
              All appointments are 1-on-1, strictly confidential, and conducted without clinical labeling.
              Pay per consultation with zero recurring subscriptions.
            </p>
          </div>

          <div className="bm-cards-grid">
            {BOOKING_SERVICES.map(item => (
              <div key={item.id} className="bm-service-booking-card">
                <div className="bm-sbc-header">
                  <div className="bm-sbc-avatar-wrap">
                    <img src={item.photo} alt={item.clinician} className="bm-sbc-avatar" />
                  </div>
                  <div className="bm-sbc-meta">
                    <span className="bm-sbc-badge">{item.badge}</span>
                    <h3 className="bm-sbc-title">{item.name}</h3>
                    <div className="bm-sbc-doctor">{item.clinician}</div>
                    <span className="bm-sbc-cred">{item.credentials}</span>
                  </div>
                </div>

                <p className="bm-sbc-desc">{item.summary}</p>

                <div className="bm-sbc-specs">
                  <div className="bm-spec-tag">
                    <Clock size={12} />
                    <span>{item.duration}</span>
                  </div>
                  <div className="bm-spec-tag">
                    <Video size={12} />
                    <span>Online & In-Clinic</span>
                  </div>
                </div>

                <div className="bm-sbc-footer">
                  <div className="bm-sbc-fee-block">
                    <span className="bm-sbc-fee-label">Consultation Fee</span>
                    <strong className="bm-sbc-fee-val">{item.fee}</strong>
                  </div>

                  <Link href={`/book?service=${item.slug}`} className="bm-sbc-book-btn">
                    <span>Book Now</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (3 CLEAR STEPS) */}
      <section className="bm-how-section" id="how-it-works">
        <div className="container">
          <div className="bm-section-header-compact">
            <span className="bm-eyebrow-accent">SIMPLE, STREAMLINED CARE</span>
            <h2 className="bm-section-title">How Your Booking Works</h2>
            <p className="bm-section-desc">No complicated intake questionnaires, no bureaucratic waiting.</p>
          </div>

          <div className="bm-steps-row">
            <div className="bm-step-item">
              <div className="bm-step-num">01</div>
              <h4 className="bm-step-heading">Choose Your Discipline</h4>
              <p className="bm-step-text">
                Select psychotherapy, somatic work, gut-brain medicine, or a free 15-minute intake. Transparent pricing with zero hidden charges.
              </p>
            </div>

            <div className="bm-step-item">
              <div className="bm-step-num">02</div>
              <h4 className="bm-step-heading">Pick Your Slot</h4>
              <p className="bm-step-text">
                Live calendar integration guarantees your preferred time is locked immediately. Receive direct calendar invites with zero friction.
              </p>
            </div>

            <div className="bm-step-item">
              <div className="bm-step-num">03</div>
              <h4 className="bm-step-heading">Private 1-on-1 Consultation</h4>
              <p className="bm-step-text">
                Join high-definition encrypted 1080p video with zero app downloads, or arrive at our private, soundproofed Indiranagar suites in Bangalore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LOCATION & HELPLINE BAR */}
      <section className="bm-location-strip" id="location">
        <div className="container bm-location-grid">
          <div className="bm-loc-col">
            <div className="bm-loc-icon-wrap">
              <Building2 size={20} />
            </div>
            <div>
              <h4 className="bm-loc-title">Indiranagar Bangalore Suites</h4>
              <p className="bm-loc-desc">100-Ft Road, Indiranagar, Bangalore 560038 · Private valet & discreet check-in.</p>
            </div>
          </div>

          <div className="bm-loc-col">
            <div className="bm-loc-icon-wrap">
              <Video size={20} />
            </div>
            <div>
              <h4 className="bm-loc-title">Pan-India Telehealth Video</h4>
              <p className="bm-loc-desc">Encrypted 1080p WebRTC consultations across Mumbai, Delhi NCR, Hyderabad & all India.</p>
            </div>
          </div>

          <div className="bm-loc-col">
            <div className="bm-loc-icon-wrap">
              <Phone size={20} />
            </div>
            <div>
              <h4 className="bm-loc-title">Direct Clinic Desk</h4>
              <p className="bm-loc-desc">
                Call <a href="tel:+918047182200" className="bm-phone-link">080 4718 2200</a> · Mon – Sat: 8:30 AM – 8:30 PM IST.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. STICKY MOBILE BOOKING DOCK */}
      <div className="bm-mobile-booking-dock" aria-label="Mobile Quick Booking">
        <Link href="/book?service=initial-assessment" className="bm-mbd-free-btn">
          <Compass size={14} />
          <div className="bm-mbd-text">
            <strong>Free 15m Intake</strong>
            <span>Talk with Ananya</span>
          </div>
        </Link>
        <Link href="/book" className="bm-mbd-book-btn">
          <Calendar size={14} />
          <span>Book Session</span>
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
