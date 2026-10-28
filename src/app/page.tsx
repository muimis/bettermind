'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Brain,
  Leaf,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  Shield,
  Heart,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Video,
  Building2,
  Users,
  Award,
  Lock,
  Smile,
  HelpCircle,
  FileText
} from '@/components/icons';

// Services Catalogue Data
const SERVICES_DATA = [
  {
    id: 'talk-therapy',
    group: 'Mind',
    name: 'Clinical Psychology & Talk Therapy',
    tagline: 'Trauma-informed, cognitive, and relational psychotherapy',
    desc: 'Evidence-based talk therapy with licensed clinical psychologists to work through anxiety, depression, relational wounds, trauma, and burnout.',
    duration: '50 min',
    fee: '₹1,800',
    feeNumber: 1800,
    allowed_mode: 'Online or Indiranagar Clinic',
    doctor: 'Dr. Meera Sen, Ph.D. (NIMHANS)',
    doctorInitial: 'MS',
    color: '#3949AB',
    bg: '#EEF2FB',
    icon: Brain,
    availableSlots: ['Tomorrow, 10:30 AM', 'Tomorrow, 3:00 PM', 'Fri, 11:00 AM']
  },
  {
    id: 'psychiatry',
    group: 'Mind',
    name: 'Psychiatry & Medical Evaluation',
    tagline: 'Neurobiology, medical diagnosis & mindful prescriptions',
    desc: 'Comprehensive psychiatric evaluation, adult ADHD assessments, and monitored medical management by senior MD psychiatrists from NIMHANS.',
    duration: '45 min',
    fee: '₹2,200',
    feeNumber: 2200,
    allowed_mode: 'Online or Indiranagar Clinic',
    doctor: 'Dr. Arun Nair, MD (NIMHANS)',
    doctorInitial: 'AN',
    color: '#124E47',
    bg: '#EDF6F4',
    icon: Award,
    availableSlots: ['Today, 4:30 PM', 'Tomorrow, 11:30 AM', 'Sat, 10:00 AM']
  },
  {
    id: 'nutrition',
    group: 'Body',
    name: 'Gut-Brain & Clinical Nutrition',
    tagline: 'Microbiome restoration & metabolic mood stabilization',
    desc: 'Over 90% of serotonin is synthesized in the gut. Tailored food plans designed around authentic Indian diets to reduce neuroinflammation and stabilize energy.',
    duration: '45 min',
    fee: '₹1,500',
    feeNumber: 1500,
    allowed_mode: 'Online or Indiranagar Clinic',
    doctor: 'Priya Sharma, RD (Manipal)',
    doctorInitial: 'PS',
    color: '#2E694F',
    bg: '#EEF7F2',
    icon: Leaf,
    availableSlots: ['Tomorrow, 2:00 PM', 'Fri, 4:00 PM', 'Sat, 11:30 AM']
  },
  {
    id: 'somatic',
    group: 'Body',
    name: 'Somatic Movement & Vagus Reset',
    tagline: '1-on-1 nervous system grounding & tension release',
    desc: 'Gentle polyvagal movement and somatic breathwork to release physical panic, muscle guarding, and autonomic hyperarousal stored in the body.',
    duration: '60 min',
    fee: '₹1,400',
    feeNumber: 1400,
    allowed_mode: 'Online or Indiranagar Clinic',
    doctor: 'Rajesh Kumar (SVYASA)',
    doctorInitial: 'RK',
    color: '#B45330',
    bg: '#FBF1EC',
    icon: Sparkles,
    availableSlots: ['Today, 6:00 PM', 'Tomorrow, 9:30 AM', 'Sat, 4:00 PM']
  },
  {
    id: 'triage',
    group: 'Start here',
    name: 'Initial Care Assessment & Triage',
    tagline: 'Complimentary consultation to find your ideal path',
    desc: 'Spend 45 minutes with our clinical care coordinator. We listen to your symptoms, answer questions, and co-design your personal care roadmap.',
    duration: '45 min',
    fee: '₹0 · Free',
    feeNumber: 0,
    allowed_mode: 'Online or Indiranagar Clinic',
    doctor: 'Ananya Roy, MSW (TISS)',
    doctorInitial: 'AR',
    color: '#124E47',
    bg: '#EDF6F4',
    icon: Compass,
    availableSlots: ['Today, 3:00 PM', 'Tomorrow, 10:00 AM', 'Fri, 12:00 PM']
  }
];

// Verified Specialists Faculty
const SPECIALISTS = [
  {
    name: 'Dr. Arun Nair',
    role: 'Senior Consultant Psychiatrist',
    quals: 'MD Psychiatry (NIMHANS) · MBBS',
    reg: 'KMC Reg # 64921',
    langs: 'English · Hindi · Malayalam',
    initial: 'AN',
    color: '#124E47',
    bg: '#EDF6F4',
    status: 'Available Today',
    tags: ['Adult ADHD', 'Mood Spectrum', 'Sleep Architecture', 'Panic Disorders'],
    quote: 'Medication is never a replacement for your story. Partnered with therapy, it provides the biological calm to heal.'
  },
  {
    name: 'Dr. Meera Sen',
    role: 'Senior Clinical Psychologist',
    quals: 'M.Phil Clinical Psychology (NIMHANS) · Ph.D.',
    reg: 'RCI Reg # A39104',
    langs: 'English · Hindi · Bengali',
    initial: 'MS',
    color: '#3949AB',
    bg: '#EEF2FB',
    status: 'Available Tomorrow',
    tags: ['Complex Trauma', 'Depression', 'Existential Burnout', 'CBT & EMDR'],
    quote: 'Therapy is about uncovering how your coping mechanisms protected you, and building safer ways forward.'
  },
  {
    name: 'Priya Sharma',
    role: 'Lead Gut-Brain Clinical Dietitian',
    quals: 'M.Sc. Clinical Nutrition (Manipal) · RD',
    reg: 'IDA Reg # 54321',
    langs: 'English · Hindi',
    initial: 'PS',
    color: '#2E694F',
    bg: '#EEF7F2',
    status: 'Available This Week',
    tags: ['Gut-Brain Axis', 'Metabolic Mood Support', 'PCOS', 'Stress Eating'],
    quote: 'Your brain chemistry depends on your digestive biology. Nourishing the microbiome creates the foundation for calm.'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Somatic & Polyvagal Therapist',
    quals: 'M.Sc. Yoga Therapy (SVYASA) · Somatic Practitioner',
    reg: 'YCB Reg # 99887',
    langs: 'English · Hindi · Tamil',
    initial: 'RK',
    color: '#B45330',
    bg: '#FBF1EC',
    status: 'Available Today',
    tags: ['Polyvagal Reset', 'Trauma Somatics', 'Pranayama', 'Chronic Tension'],
    quote: 'The body remembers what the conscious mind buries. When we teach the nervous system safety, healing accelerates.'
  },
  {
    name: 'Ananya Roy',
    role: 'Lead Care Coordinator & Triage Specialist',
    quals: 'MSW Psychiatric Social Work (TISS)',
    reg: 'KAPS Reg # 1120',
    langs: 'English · Hindi · Kannada',
    initial: 'AR',
    color: '#124E47',
    bg: '#EDF6F4',
    status: 'Available Daily',
    tags: ['Initial Intake', 'Patient Advocacy', 'Cross-Disciplinary Coordination'],
    quote: 'Reaching out for help shouldn’t feel like taking on a second job. My promise is to make your care journey seamless.'
  }
];

// FAQs
const FAQS = [
  {
    q: 'How does Better Mind coordinate multiple specialists for me?',
    a: 'Unlike fragmented hospitals where you visit different doctors who never talk, our clinical team works as one practice. Your psychologist, psychiatrist, dietitian, and somatic therapist review your case collaboratively, ensuring your treatment is unified without you having to repeat your story over and over.'
  },
  {
    q: 'Can I do sessions online, or do I have to visit the Indiranagar clinic?',
    a: 'Every discipline is available both online via encrypted HD video calls and in-person at our quiet Indiranagar clinic. You can even mix them: attend therapy online from home while visiting Indiranagar for somatic movement.'
  },
  {
    q: 'What makes your booking engine zero-clash?',
    a: 'When you select multiple services (e.g. Psychology + Nutrition), our PostgreSQL engine blocks overlapping times at the database level. It enforces clean buffers so you never get double-booked or rushed between appointments.'
  },
  {
    q: 'Do I get medical receipts for health insurance and corporate wellness?',
    a: 'Yes. Every booking includes a GST-compliant digital invoice with the doctor’s official medical registration numbers (RCI, NMC, IDA) suitable for corporate reimbursement and OPD insurance claims.'
  },
  {
    q: 'What is your rescheduling and cancellation policy?',
    a: 'You can reschedule or cancel your session with zero penalties up to 4 hours before your scheduled appointment time directly from your confirmation link.'
  }
];

export default function HomePage() {
  // Hero Live Booking Widget State
  const [selectedServiceId, setSelectedServiceId] = useState<string>('talk-therapy');
  const [selectedMode, setSelectedMode] = useState<'online' | 'in_person'>('online');
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number>(0);

  // Discipline Filter
  const [activeTab, setActiveTab] = useState<string>('All');

  // FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Selected Service for the Hero Widget
  const activeHeroService = SERVICES_DATA.find(s => s.id === selectedServiceId) || SERVICES_DATA[0];

  // Filtered Services for the catalogue grid
  const filteredServices = activeTab === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.group === activeTab);

  return (
    <div className="bm-webapp-page">
      {/* ========================================================
          1. HERO SECTION: DUAL-COLUMN WEB APPLICATION HERO
          ======================================================== */}
      <section className="app-hero-section">
        <div className="container app-hero-container">
          {/* Left Column: Value Proposition & Social Proof */}
          <div className="app-hero-left">
            <div className="app-hero-pill">
              <span className="live-dot-pulse"></span>
              <span>Online Video & Indiranagar Sanctuary Clinic · Bengaluru</span>
            </div>

            <h1 className="app-hero-headline">
              Whole-person mental health.<br />
              <span className="app-hero-gradient">Coordinated under one roof.</span>
            </h1>

            <p className="app-hero-subtext">
              Better Mind unites licensed psychotherapy, medical psychiatry, gut-brain nutrition, and somatic healing in one continuous care plan. Book one specialist or combine disciplines with guaranteed zero-clash scheduling.
            </p>

            <div className="app-hero-actions-row">
              <Link href="/book" className="btn-app-primary">
                <Calendar size={18} />
                <span>Book an Appointment</span>
              </Link>
              <Link href="/book" className="btn-app-secondary">
                <Compass size={18} />
                <span>Free 15-Min Triage Intake (₹0)</span>
              </Link>
            </div>

            {/* Live Trust Metrics Dashboard */}
            <div className="app-stats-row">
              <div className="app-stat-card">
                <span className="app-stat-num">12+ Yrs</span>
                <span className="app-stat-label">NIMHANS & TISS Clinical Leadership</span>
              </div>
              <div className="app-stat-divider"></div>
              <div className="app-stat-card">
                <span className="app-stat-num">Zero Clash</span>
                <span className="app-stat-label">Multi-Service Booking Engine</span>
              </div>
              <div className="app-stat-divider"></div>
              <div className="app-stat-card">
                <span className="app-stat-num">100%</span>
                <span className="app-stat-label">Confidential & DPDP Compliant</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Booking Engine Card */}
          <div className="app-hero-right">
            <div className="live-booking-widget">
              <div className="lbw-header">
                <div>
                  <span className="lbw-badge">Live Clinic Booking</span>
                  <h3 className="lbw-title">Find an open consultation slot</h3>
                </div>
                <div className="lbw-live-chip">
                  <span className="live-dot-pulse"></span>
                  <span>Slots Open</span>
                </div>
              </div>

              {/* Service Selection Tabs */}
              <div className="lbw-service-chips">
                {SERVICES_DATA.map(service => (
                  <button
                    key={service.id}
                    type="button"
                    className={`lbw-chip ${selectedServiceId === service.id ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedServiceId(service.id);
                      setSelectedSlotIndex(0);
                    }}
                  >
                    <span>{service.name.split(' ')[0]} {service.name.split(' ')[1] || ''}</span>
                  </button>
                ))}
              </div>

              {/* Mode Toggle: Online vs Clinic */}
              <div className="lbw-mode-toggle-group">
                <button
                  type="button"
                  className={`lbw-mode-btn ${selectedMode === 'online' ? 'active' : ''}`}
                  onClick={() => setSelectedMode('online')}
                >
                  <Video size={15} />
                  <span>Online Video Call</span>
                </button>
                <button
                  type="button"
                  className={`lbw-mode-btn ${selectedMode === 'in_person' ? 'active' : ''}`}
                  onClick={() => setSelectedMode('in_person')}
                >
                  <Building2 size={15} />
                  <span>Indiranagar Clinic</span>
                </button>
              </div>

              {/* Dynamic Doctor & Slot Preview Box */}
              <div className="lbw-preview-box">
                <div className="lbw-doc-row">
                  <div className="lbw-avatar" style={{ background: activeHeroService.color }}>
                    {activeHeroService.doctorInitial}
                  </div>
                  <div className="lbw-doc-info">
                    <h4 className="lbw-doc-name">{activeHeroService.doctor}</h4>
                    <span className="lbw-doc-spec">{activeHeroService.tagline}</span>
                  </div>
                  <div className="lbw-doc-price">
                    <span className="lbw-fee">{activeHeroService.fee}</span>
                    <span className="lbw-dur">{activeHeroService.duration}</span>
                  </div>
                </div>

                {/* Available Slots */}
                <div className="lbw-slots-section">
                  <span className="lbw-slots-label">Select Open Slot:</span>
                  <div className="lbw-slots-grid">
                    {activeHeroService.availableSlots.map((slot, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`lbw-slot-pill ${selectedSlotIndex === index ? 'active' : ''}`}
                        onClick={() => setSelectedSlotIndex(index)}
                      >
                        <Clock size={12} />
                        <span>{slot}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button: Directly transfers to /book */}
              <Link href="/book" className="btn-lbw-submit">
                <span>Book This Slot ({activeHeroService.fee})</span>
                <ArrowRight size={16} />
              </Link>

              <div className="lbw-guarantee">
                <Shield size={13} />
                <span>Instant reservation token · Free cancellation up to 4 hrs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. HOW INTEGRATED CARE WORKS (INTERACTIVE 4-PILLAR FLOW)
          ======================================================== */}
      <section className="app-workflow-section" id="how-it-works">
        <div className="container">
          <div className="app-section-header">
            <span className="app-eyebrow">The Better Mind Standard</span>
            <h2>How our coordinated practice works</h2>
            <p>From your first tap to ongoing recovery, all disciplines communicate so you never fall through the cracks.</p>
          </div>

          <div className="app-steps-grid">
            <div className="app-step-card">
              <div className="asc-num-badge">01</div>
              <div className="asc-icon-wrap" style={{ background: '#EDF6F4', color: '#124E47' }}>
                <Compass size={22} />
              </div>
              <h3 className="asc-title">1. Intake or Direct Choice</h3>
              <p className="asc-desc">
                Know what you need? Book psychology, psychiatry, or nutrition directly. Unsure? Start with our free 15-minute intake coordinator triage.
              </p>
            </div>

            <div className="app-step-card">
              <div className="asc-num-badge">02</div>
              <div className="asc-icon-wrap" style={{ background: '#EEF2FB', color: '#3949AB' }}>
                <Calendar size={22} />
              </div>
              <h3 className="asc-title">2. Zero-Clash Scheduling</h3>
              <p className="asc-desc">
                Pick individual sessions or stack disciplines in one visit. Our database engine locks slots in real-time, preventing schedule overlaps.
              </p>
            </div>

            <div className="app-step-card">
              <div className="asc-num-badge">03</div>
              <div className="asc-icon-wrap" style={{ background: '#EEF7F2', color: '#2E694F' }}>
                <Users size={22} />
              </div>
              <h3 className="asc-title">3. Multidisciplinary Review</h3>
              <p className="asc-desc">
                Your psychiatrist, psychologist, and clinical dietitian consult collaboratively. You never have to repeat your traumatic history across different clinics.
              </p>
            </div>

            <div className="app-step-card">
              <div className="asc-num-badge">04</div>
              <div className="asc-icon-wrap" style={{ background: '#FEF7ED', color: '#A36100' }}>
                <Shield size={22} />
              </div>
              <h3 className="asc-title">4. Private & Sustainable</h3>
              <p className="asc-desc">
                Manage your care through a cryptographically secure token link. Zero public accounts, zero data sharing, and full DPDP Act compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. COMPREHENSIVE SERVICE CATALOGUE (INTERACTIVE APP GRID)
          ======================================================== */}
      <section className="app-catalogue-section" id="services">
        <div className="container">
          <div className="app-section-header-split">
            <div>
              <span className="app-eyebrow">Our Clinical Disciplines</span>
              <h2>Care options tailored to your life</h2>
              <p>Choose an individual session or combine services into a coordinated care plan.</p>
            </div>

            {/* Filter Pills */}
            <div className="catalogue-filter-bar">
              {['All', 'Mind', 'Body', 'Start here'].map(tab => (
                <button
                  key={tab}
                  type="button"
                  className={`cat-pill-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'All' ? 'All Disciplines' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="app-services-grid">
            {filteredServices.map(service => {
              const ServiceIcon = service.icon;
              return (
                <div key={service.id} className="app-service-card" style={{ borderTop: `4px solid ${service.color}` }}>
                  <div className="asc-top-bar">
                    <span className="asc-badge-group" style={{ background: service.bg, color: service.color }}>
                      <ServiceIcon size={16} />
                      <span>{service.group}</span>
                    </span>
                    <span className="asc-duration-chip">
                      <Clock size={12} />
                      <span>{service.duration}</span>
                    </span>
                  </div>

                  <h3 className="asc-card-name">{service.name}</h3>
                  <p className="asc-card-desc">{service.desc}</p>

                  <div className="asc-doc-tag">
                    <span className="asc-avatar-tiny" style={{ background: service.color }}>
                      {service.doctorInitial}
                    </span>
                    <span>{service.doctor}</span>
                  </div>

                  <div className="asc-card-footer">
                    <div className="asc-fee-box">
                      <span className="asc-fee-amount">{service.fee}</span>
                      <span className="asc-fee-note">{service.allowed_mode}</span>
                    </div>

                    <Link href="/book" className="btn-asc-book" style={{ background: service.color }}>
                      <span>Book Slot</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Complimentary Assessment Banner */}
          <div className="app-assessment-callout">
            <div className="aac-content">
              <span className="aac-icon"><Compass size={28} /></span>
              <div>
                <h3>Unsure which specialist or modality you need?</h3>
                <p>Book our <strong>Initial Care Assessment & Triage (₹0 · 45 min)</strong>. Our clinical care coordinator will listen to your symptoms, explain your options, and match you with the right specialist.</p>
              </div>
            </div>
            <Link href="/book" className="btn-app-primary aac-btn">
              <span>Start Free Triage</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. VERIFIED SPECIALISTS FACULTY (CREDENTIALS & DIRECT BOOK)
          ======================================================== */}
      <section className="app-team-section" id="specialists">
        <div className="container">
          <div className="app-section-header">
            <span className="app-eyebrow">Medical & Psychological Leadership</span>
            <h2>Meet your specialist clinicians</h2>
            <p>Our faculty holds rigorous clinical training from premier national institutions (NIMHANS, TISS, Manipal) with deep human empathy.</p>
          </div>

          <div className="app-team-grid">
            {SPECIALISTS.map(doc => (
              <div key={doc.name} className="app-doctor-card">
                <div className="adc-header">
                  <div className="adc-avatar-large" style={{ background: doc.color }}>
                    {doc.initial}
                  </div>
                  <div className="adc-meta">
                    <h3 className="adc-name">{doc.name}</h3>
                    <div className="adc-role" style={{ color: doc.color }}>{doc.role}</div>
                    <div className="adc-quals">{doc.quals}</div>
                    <div className="adc-reg">{doc.reg}</div>
                  </div>
                </div>

                <div className="adc-status-row">
                  <span className="adc-status-pill">
                    <span className="live-dot-pulse"></span>
                    <span>{doc.status}</span>
                  </span>
                  <span className="adc-langs">
                    <Users size={12} />
                    <span>{doc.langs}</span>
                  </span>
                </div>

                <div className="adc-tags-wrap">
                  {doc.tags.map((t, idx) => (
                    <span key={idx} className="adc-tag">{t}</span>
                  ))}
                </div>

                <blockquote className="adc-quote">
                  "{doc.quote}"
                </blockquote>

                <div className="adc-footer">
                  <Link href="/book" className="btn-app-secondary btn-full">
                    <span>Book with {doc.name.split(' ')[0]}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. THE INDIRANAGAR SANCTUARY (PHYSICAL CLINIC OVERVIEW)
          ======================================================== */}
      <section className="app-sanctuary-section" id="sanctuary">
        <div className="container">
          <div className="app-sanctuary-card">
            <div className="sanctuary-info">
              <span className="app-eyebrow">Indiranagar Clinic</span>
              <h2>A calm sanctuary in the heart of Bengaluru</h2>
              <p>
                Whether you consult from home over video or visit us in person, our Indiranagar practice is designed for emotional safety, acoustic isolation, and sensory calm.
              </p>

              <div className="sanctuary-features-grid">
                <div className="sfg-item">
                  <div className="sfg-icon-box"><Shield size={20} /></div>
                  <div>
                    <h4>Architectural Acoustic Isolation</h4>
                    <p>Every therapy suite is soundproofed with acoustic seals so your deepest conversations remain entirely private.</p>
                  </div>
                </div>

                <div className="sfg-item">
                  <div className="sfg-icon-box"><Heart size={20} /></div>
                  <div>
                    <h4>Sensory Low-Stimulus Design</h4>
                    <p>Zero clinical waiting-room buzzers, natural biophilic plants, and soft diffused lighting to ease autonomic nervous tension.</p>
                  </div>
                </div>

                <div className="sfg-item">
                  <div className="sfg-icon-box"><FileText size={20} /></div>
                  <div>
                    <h4>Medical Insurance Receipts</h4>
                    <p>Official GST-compliant medical tax invoices with doctor license numbers provided for corporate insurance claim reimbursements.</p>
                  </div>
                </div>
              </div>

              <div className="sanctuary-contact-bar">
                <div className="scb-item">
                  <MapPin size={16} />
                  <span>14th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru</span>
                </div>
                <div className="scb-item">
                  <Clock size={16} />
                  <span>Mon – Sat: 8:30 AM – 8:30 PM IST</span>
                </div>
                <div className="scb-item">
                  <Phone size={16} />
                  <span><a href="tel:+918047182200">+91 80 4718 2200</a></span>
                </div>
              </div>

              <div className="sanctuary-action-row">
                <Link href="/book" className="btn-app-primary">
                  <Calendar size={18} />
                  <span>Book In-Person Consultation</span>
                </Link>
                <a
                  href="https://maps.google.com/?q=Indiranagar+Bengaluru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-app-secondary"
                >
                  <MapPin size={16} />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Visual Clinic Suite Card Deck */}
            <div className="sanctuary-visual-deck">
              <div className="deck-card active">
                <div className="deck-badge">Suite 01</div>
                <h4>Psychotherapy & Psychoanalysis</h4>
                <p>Comfortable low-stimulus armchairs, natural oak surfaces, and noise-cancelling acoustic insulation.</p>
              </div>
              <div className="deck-card">
                <div className="deck-badge">Suite 02</div>
                <h4>Somatic & Movement Reset</h4>
                <p>Dedicated space for yoga therapy, polyvagal vagus nerve reset, and physical breathwork.</p>
              </div>
              <div className="deck-card">
                <div className="deck-badge">Suite 03</div>
                <h4>Neuropsychiatry & Medical Room</h4>
                <p>Clinical diagnostic evaluation, vitals monitoring, and confidential prescription consultations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. TRANSPARENT PRICING & CLINICAL INVESTMENT TABLE
          ======================================================== */}
      <section className="app-pricing-section" id="pricing">
        <div className="container">
          <div className="app-section-header">
            <span className="app-eyebrow">Clear Pricing</span>
            <h2>Transparent fees. Zero surprises.</h2>
            <p>Quality mental health care requires trust. Every fee is published clearly with no hidden clinic surcharges.</p>
          </div>

          <div className="app-pricing-table">
            <div className="apt-header">
              <span>Discipline</span>
              <span>Session Length</span>
              <span>Practitioner Qualification</span>
              <span>Consultation Fee</span>
              <span>Action</span>
            </div>

            {SERVICES_DATA.map(s => (
              <div key={s.id} className="apt-row">
                <div className="apt-col-service">
                  <strong>{s.name}</strong>
                  <span>{s.allowed_mode}</span>
                </div>
                <div className="apt-col-time">{s.duration}</div>
                <div className="apt-col-doc">{s.doctor}</div>
                <div className="apt-col-fee">{s.fee}</div>
                <div className="apt-col-action">
                  <Link href="/book" className="btn-apt-book">
                    <span>Book</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="apt-guarantees-row">
            <div className="apt-guarantee-item">
              <CheckCircle2 size={18} className="apt-icon-check" />
              <span>GST medical receipts for corporate wellness and insurance claims</span>
            </div>
            <div className="apt-guarantee-item">
              <CheckCircle2 size={18} className="apt-icon-check" />
              <span>Free cancellation or rescheduling up to 4 hours before session</span>
            </div>
            <div className="apt-guarantee-item">
              <CheckCircle2 size={18} className="apt-icon-check" />
              <span>Weekly sliding-scale slots available for students in financial distress</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. FREQUENTLY ASKED QUESTIONS (APP ACCORDION)
          ======================================================== */}
      <section className="app-faq-section" id="faqs">
        <div className="container app-faq-container">
          <div className="app-section-header">
            <span className="app-eyebrow">Frequently Asked Questions</span>
            <h2>Everything you need to know</h2>
            <p>Simple answers to help you feel confident before starting your care journey.</p>
          </div>

          <div className="app-faq-stack">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`app-faq-card ${isOpen ? 'active' : ''}`}>
                  <button
                    type="button"
                    className="afc-trigger"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="afc-question">{faq.q}</span>
                    <span className="afc-icon">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="afc-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          8. CALL TO ACTION & CLINIC DESK BANNER
          ======================================================== */}
      <section className="app-final-cta-section">
        <div className="container">
          <div className="app-final-cta-card">
            <div className="afc-inner">
              <span className="afc-badge">Your Journey Begins Here</span>
              <h2>Ready to experience coordinated healthcare?</h2>
              <p>
                No medical referrals required. No complex accounts to set up. Pick your service, pick your time, and let our specialist faculty support your healing.
              </p>

              <div className="afc-buttons-row">
                <Link href="/book" className="btn-app-primary btn-lg">
                  <Calendar size={18} />
                  <span>Book an Appointment</span>
                </Link>
                <Link href="/services" className="btn-app-secondary btn-lg">
                  <span>Explore All Services</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          9. 24/7 TOLL-FREE CRISIS HOTLINES STRIP
          ======================================================== */}
      <section className="app-crisis-strip">
        <div className="container app-crisis-inner">
          <div className="acs-left">
            <Shield size={16} />
            <span><strong>Emergency Support Notice:</strong> Better Mind is an outpatient clinic. If you or someone you know is in acute danger or distress:</span>
          </div>
          <div className="acs-right">
            <span>Call <strong>Tele-MANAS: 14416</strong></span>
            <span>·</span>
            <span><strong>KIRAN: 1800-599-0019</strong> (24/7 Govt. of India Toll-Free Helplines)</span>
          </div>
        </div>
      </section>
    </div>
  );
}
