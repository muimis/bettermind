'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Brain,
  Award,
  Leaf,
  Sparkles,
  Compass,
  ArrowRight,
  Calendar,
  Clock,
  Shield,
  ShieldCheck,
  Video,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Heart
} from '@/components/icons';

// Clinical Problem-Solution Consultations with Verified Clinician Profiles & Real Photography
const CONSULTATIONS = [
  {
    id: 'talk-therapy',
    category: 'mind',
    tag: 'Anxiety & Racing Thoughts',
    feelingChip: '⚡ Racing Loops & Anxiety',
    problem: 'Your thoughts won’t stop spiraling. Catastrophic worry, depressive heaviness, or unhealed relational trauma is exhausting your daily peace.',
    weDoTitle: 'We do 1-on-1 Clinical Psychotherapy for you.',
    whatHappens: 'Dr. Meera Sen uses evidence-backed CBT, Acceptance & Commitment Therapy (ACT), and EMDR trauma integration in a confidential, safe space to break repetitive anxiety loops and rebuild durable emotional grounding.',
    clinician: 'Dr. Meera Sen, Ph.D.',
    clinicianRole: 'Senior Clinical Psychologist (NIMHANS)',
    credentials: 'RCI Registered · 11+ Years Experience',
    photo: '/images/meera-sen.jpg',
    duration: '50 min',
    fee: '₹1,800',
    mode: 'Online Video Pan-India · Partner Clinic Hub',
    accentColor: '#3949AB',
    softBg: '#EEF2FB',
    borderColor: '#D1DBF6',
    icon: Brain,
    availableNext: 'Today at 4:30 PM (IST)',
    protocolPills: ['Cognitive Restructuring', 'EMDR Trauma Reset', 'Relational Boundaries']
  },
  {
    id: 'psychiatry',
    category: 'brain',
    tag: 'ADHD, Focus & Mood Biology',
    feelingChip: '🧠 ADHD, Fog & Mood Swings',
    problem: 'You cannot focus, your moods swing sharply, or you suspect your brain biology and neurotransmitters need an objective medical diagnostic workup.',
    weDoTitle: 'We do Neuropsychiatry & Medical Diagnostic Evaluation for you.',
    whatHappens: 'Dr. Arun Nair conducts a comprehensive diagnostic workup of your neurochemistry, adult ADHD markers, and circadian sleep architecture — offering medical clarity and monitored, conservative prescriptions if appropriate.',
    clinician: 'Dr. Arun Nair, MD',
    clinicianRole: 'Senior Consultant Psychiatrist (NIMHANS)',
    credentials: 'NMC Registered · 14+ Years Experience',
    photo: '/images/arun-nair.jpg',
    duration: '45 min',
    fee: '₹2,200',
    mode: 'Online Video Pan-India · Partner Clinic Hub',
    accentColor: '#124E47',
    softBg: '#EDF6F4',
    borderColor: '#C3E2DC',
    icon: Award,
    availableNext: 'Tomorrow at 11:00 AM (IST)',
    protocolPills: ['Neurotransmitter Workup', 'Adult ADHD Testing', 'Sleep Architecture Review']
  },
  {
    id: 'nutrition',
    category: 'gut',
    tag: 'Gut-Brain Axis & Burnout Fatigue',
    feelingChip: '🌿 Gut Distress & Burnout',
    problem: 'Chronic stress has disrupted your digestive tract (IBS), triggered afternoon brain fog, or trapped you in cycles of emotional burnout eating.',
    weDoTitle: 'We do Gut-Brain Nutritional Psychiatry for you.',
    whatHappens: 'Over 90% of serotonin is manufactured in the gut. Priya Sharma analyzes your microbiome-gut-brain axis and builds a practical, anti-inflammatory food protocol designed around authentic Indian meals to stabilize neurotransmitter production.',
    clinician: 'Priya Sharma, RD',
    clinicianRole: 'Lead Clinical Dietitian (Manipal)',
    credentials: 'IDA Certified · Gut-Brain Specialist',
    photo: '/images/priya-sharma.jpg',
    duration: '45 min',
    fee: '₹1,500',
    mode: 'Online Video Pan-India · Partner Clinic Hub',
    accentColor: '#2E694F',
    softBg: '#EEF7F2',
    borderColor: '#CBE6D6',
    icon: Leaf,
    availableNext: 'Friday at 3:00 PM (IST)',
    protocolPills: ['Microbiome Gut-Brain Protocol', 'Circadian Insulin Balancing', 'Anti-Inflammatory Food Plan']
  },
  {
    id: 'somatic',
    category: 'body',
    tag: 'Physical Panic & Nervous System Lock',
    feelingChip: '🫀 Physical Panic & Tension',
    problem: 'Your body is locked in sympathetic fight-or-flight. You carry chronic tightness in your chest or clenched jaw, where talk therapy alone isn’t reaching.',
    weDoTitle: 'We do Somatic Vagus Reset & Nervous System Recalibration for you.',
    whatHappens: 'Rajesh Kumar guides you through gentle polyvagal somatic movement, vagus nerve stimulation, and restorative autonomic breathwork to release physical tension held in muscle fascia and restore parasympathetic calm.',
    clinician: 'Rajesh Kumar, M.Sc.',
    clinicianRole: 'Certified Somatic Therapist (SVYASA)',
    credentials: 'SEP Certified · Vagal Tonus Practitioner',
    photo: '/images/rajesh-kumar.jpg',
    duration: '60 min',
    fee: '₹1,400',
    mode: 'Online Video Pan-India · Partner Clinic Hub',
    accentColor: '#B45330',
    softBg: '#FBF1EC',
    borderColor: '#F0D5C9',
    icon: Sparkles,
    availableNext: 'Today at 6:00 PM (IST)',
    protocolPills: ['Polyvagal Nerve Release', 'Diaphragm Recalibration', 'Autonomic Nervous Reset']
  }
];

// Patient FAQs
const CLIENT_FAQS = [
  {
    q: 'How do I know which consultation is right for my current situation?',
    a: 'If you are unsure where to begin, start with our Complimentary 15-Minute Care Intake (₹0). Our Clinical Care Coordinator, Ananya Roy, MSW (TISS alumni), listens to your symptoms without pressure and connects you to the exact psychologist, psychiatrist, or dietitian suited to your needs.'
  },
  {
    q: 'Can I combine multiple specialists on the same day?',
    a: 'Yes. Our clinical scheduling engine is engineered with a guaranteed zero-overlap database rule. You can schedule psychotherapy and gut-brain nutrition on the same day without your appointments ever clashing.'
  },
  {
    q: 'How do online video sessions work compared to partner clinic hubs?',
    a: 'Both formats maintain identical clinical excellence. Online sessions are held in our encrypted 1080p WebRTC video suites directly in your browser with zero app installation. For in-person visits, we hold dedicated hours at acoustic-soundproofed consultation suites at designated partner clinic hubs across metro centers.'
  },
  {
    q: 'What is your rescheduling and cancellation policy?',
    a: 'You can reschedule or cancel any session with zero penalty up to 4 hours before your appointment time directly through your encrypted confirmation link.'
  }
];

export default function HomePage() {
  // Hero interactive concierge state
  const [activeConciergeIdx, setActiveConciergeIdx] = useState<number>(0);
  // Synchrony interactive case study state
  const [activeSyncSpecialist, setActiveSyncSpecialist] = useState<number>(0);
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activeConsultation = CONSULTATIONS[activeConciergeIdx];

  return (
    <div className="bm-lux-site">
      {/* 1. ASYMMETRICAL LUXURY HERO WITH LIVE CONCIERGE WIDGET */}
      <section className="lux-hero-editorial">
        <div className="lux-hero-ambient-glow" aria-hidden="true" />
        <div className="container lux-hero-layout">
          {/* Left Column: Communication-Driven Value Proposition */}
          <div className="lux-hero-left">
            <div className="lux-hero-pill">
              <span className="lux-live-dot" />
              <span className="lux-pill-text">Integrated Online Clinic · Pan-India Video & Partner Suites</span>
            </div>

            <h1 className="lux-hero-title">
              Real relief begins when your <span className="lux-title-italic">whole self is heard.</span>
            </h1>

            <p className="lux-hero-lead">
              Not generic self-help. Not repeating your trauma four times. We coordinate psychiatry, psychotherapy, gut-brain nutrition, and somatic nervous system therapy into one synchronized care plan around you.
            </p>

            <div className="lux-hero-actions">
              <a href="#consultations" className="lux-btn-primary">
                <Calendar size={18} />
                <span>Explore Consultations for You</span>
                <ArrowRight size={16} />
              </a>
              <Link href="/book" className="lux-btn-secondary">
                <Compass size={18} />
                <span>Free 15-Min Care Intake (₹0)</span>
              </Link>
            </div>

            <div className="lux-hero-trust-bar">
              <div className="lux-trust-item">
                <ShieldCheck size={16} />
                <span>100% Confidential</span>
              </div>
              <span className="lux-trust-dot">·</span>
              <div className="lux-trust-item">
                <CheckCircle2 size={16} />
                <span>NMC & RCI Accredited</span>
              </div>
              <span className="lux-trust-dot">·</span>
              <div className="lux-trust-item">
                <Clock size={16} />
                <span>Zero Schedule Overlap</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Consultation Concierge Widget */}
          <div className="lux-hero-right">
            <div className="lux-concierge-card">
              <div className="lux-concierge-header">
                <div className="lux-concierge-title-row">
                  <span className="lux-concierge-eyebrow">Interactive Matcher</span>
                  <span className="lux-concierge-live-tag">
                    <span className="lux-pulse-small" /> Live Openings Today
                  </span>
                </div>
                <h3 className="lux-concierge-heading">What is feeling heaviest right now?</h3>
              </div>

              {/* Interactive Symptom Chips */}
              <div className="lux-concierge-chips">
                {CONSULTATIONS.map((c, idx) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveConciergeIdx(idx)}
                    className={`lux-concierge-chip ${activeConciergeIdx === idx ? 'active' : ''}`}
                    aria-pressed={activeConciergeIdx === idx}
                  >
                    <span>{c.feelingChip}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Matched Consultation Preview Box */}
              <div className="lux-concierge-preview" style={{ borderColor: activeConsultation.borderColor }}>
                <div className="lux-preview-doctor-row">
                  <img
                    src={activeConsultation.photo}
                    alt={activeConsultation.clinician}
                    className="lux-preview-avatar-img"
                  />
                  <div className="lux-preview-doc-info">
                    <div className="lux-doc-title-line">
                      <strong>{activeConsultation.clinician}</strong>
                      <span className="lux-verified-badge" title="Verified NMC/RCI License">✓ Verified</span>
                    </div>
                    <span className="lux-preview-doc-role">{activeConsultation.clinicianRole}</span>
                    <span className="lux-preview-doc-cred">{activeConsultation.credentials}</span>
                  </div>
                </div>

                <div className="lux-preview-care-promise">
                  <span className="lux-promise-label">Matched Care Protocol:</span>
                  <h4>{activeConsultation.weDoTitle}</h4>
                </div>

                {/* Protocol Highlights */}
                <div className="lux-preview-pills">
                  {activeConsultation.protocolPills.map((pill, i) => (
                    <span key={i} className="lux-micro-pill">{pill}</span>
                  ))}
                </div>

                {/* Slot & Action */}
                <div className="lux-preview-action-row">
                  <div className="lux-preview-price">
                    <strong className="lux-price-big">{activeConsultation.fee}</strong>
                    <span className="lux-price-sub">{activeConsultation.duration} · Video or Partner Hub</span>
                    <span className="lux-slot-available-pill">{activeConsultation.availableNext}</span>
                  </div>

                  <Link
                    href={`/book?service=${activeConsultation.id}`}
                    className="lux-btn-concierge-book"
                    style={{ backgroundColor: activeConsultation.accentColor }}
                  >
                    <span>Book Consultation</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE CONSULTATION MATRIX (DIRECT PROBLEM-SOLUTION WITH REAL CLINICIAN PHOTOGRAPHY) */}
      <section className="lux-matrix-section" id="consultations">
        <div className="container">
          <div className="lux-section-header">
            <span className="lux-eyebrow">Personalized Care</span>
            <h2 className="lux-section-title">We don’t do generic consultations. We do the exact care you need.</h2>
            <p className="lux-section-desc">
              Every consultation is led 1-on-1 by an accredited specialist. Choose your acute challenge below to see your care path and next available opening.
            </p>
          </div>

          {/* Grid of Cards with Real Clinician Portraits */}
          <div className="lux-cards-grid">
            {CONSULTATIONS.map(item => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  className="lux-card"
                  style={{ borderTop: `3px solid ${item.accentColor}` }}
                >
                  <div className="lux-card-top">
                    <span
                      className="lux-card-tag"
                      style={{ color: item.accentColor, backgroundColor: item.softBg }}
                    >
                      <IconComp size={14} />
                      <span>{item.tag}</span>
                    </span>
                    <span className="lux-slot-badge">Next: {item.availableNext}</span>
                  </div>

                  {/* Problem Callout Box */}
                  <div className="lux-problem-box">
                    <span className="lux-problem-caption">If your struggle is:</span>
                    <p className="lux-problem-quote">"{item.problem}"</p>
                  </div>

                  {/* We Do Promise */}
                  <h3 className="lux-card-promise">{item.weDoTitle}</h3>

                  {/* Clinical Description */}
                  <p className="lux-card-description">{item.whatHappens}</p>

                  {/* Clinician Profile with Real Photograph */}
                  <div className="lux-specialist-box">
                    <img
                      src={item.photo}
                      alt={item.clinician}
                      className="lux-card-doctor-photo"
                    />
                    <div className="lux-specialist-meta">
                      <strong className="lux-doc-name">{item.clinician}</strong>
                      <span className="lux-doc-role">{item.clinicianRole}</span>
                      <span className="lux-doc-cred">{item.credentials}</span>
                    </div>
                  </div>

                  {/* Pricing and Direct Book Button */}
                  <div className="lux-card-footer">
                    <div className="lux-card-price-block">
                      <span className="lux-price-main">{item.fee}</span>
                      <span className="lux-price-sub">{item.duration} · Video or Partner Hub</span>
                    </div>

                    <Link
                      href={`/book?service=${item.id}`}
                      className="lux-card-book-btn"
                      style={{ backgroundColor: item.accentColor }}
                    >
                      <span>Book Consultation</span>
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Complimentary Triage Intake Banner */}
          <div className="lux-triage-card" id="free-intake">
            <div className="lux-triage-inner">
              <div className="lux-triage-icon-wrap">
                <Compass size={32} />
              </div>
              <div className="lux-triage-body">
                <span className="lux-triage-badge">Complimentary First Step</span>
                <h3 className="lux-triage-heading">
                  Not sure what you need? We do a 15-Minute Intake Consultation for you at ₹0.
                </h3>
                <p className="lux-triage-text">
                  When everything feels heavy at once, choosing between a psychologist, psychiatrist, or gut-brain dietitian can feel paralyzing. Spend 15 minutes with our Lead Care Coordinator, Ananya Roy, MSW (TISS alumni). She listens without rush or pressure and maps your personalized clinical path.
                </p>
                <div className="lux-triage-details">
                  <span>⏱️ 15 Minutes</span>
                  <span>·</span>
                  <span>🏷️ ₹0 Complimentary</span>
                  <span>·</span>
                  <span>🔒 Strictly Confidential</span>
                </div>
              </div>
              <div className="lux-triage-action">
                <Link href="/book" className="lux-btn-triage">
                  <span>Start Free Intake (₹0)</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE COORDINATED CARE SYNCHRONY HUB (INTERACTIVE CASE DEMO) */}
      <section className="lux-synchrony-section" id="method">
        <div className="container">
          <div className="lux-sync-container">
            <div className="lux-sync-info">
              <span className="lux-eyebrow">The Better Mind Model</span>
              <h2 className="lux-sync-title">Your mental health is whole-body. Your care should be too.</h2>
              <p className="lux-sync-desc">
                In traditional healthcare, you visit a psychiatrist in a hospital, a therapist in an app, and your gut flare-ups are dismissed. You repeat your trauma four times and get conflicting advice.
              </p>
              <p className="lux-sync-desc">
                At Better Mind, your psychologist, psychiatrist, dietitian, and somatic therapist operate as <strong>one coordinated practice around you</strong>. One shared electronic medical chart. Zero repeating your story.
              </p>

              <div className="lux-sync-checklist">
                <div className="lux-sync-check-item">
                  <CheckCircle2 size={18} className="lux-check-icon" />
                  <div>
                    <strong>One Shared EHR Chart</strong>
                    <span>Your clinicians review progress collaboratively before every follow-up.</span>
                  </div>
                </div>
                <div className="lux-sync-check-item">
                  <CheckCircle2 size={18} className="lux-check-icon" />
                  <div>
                    <strong>Zero Medication-Therapy Conflicts</strong>
                    <span>Psychiatrists and psychotherapists align closely on treatment intensity.</span>
                  </div>
                </div>
                <div className="lux-sync-check-item">
                  <CheckCircle2 size={18} className="lux-check-icon" />
                  <div>
                    <strong>Accelerated Remission</strong>
                    <span>Addressing mind, neurochemistry, and gut together cuts recovery time significantly.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Synchrony Visual Interactive Card */}
            <div className="lux-sync-diagram-card">
              <div className="lux-sync-patient-badge">
                <span className="lux-sync-pulse" />
                <span>Live Case Demonstration: Anxiety + Insomnia + IBS</span>
              </div>

              <div className="lux-sync-center-node">
                <strong>You (The Patient)</strong>
                <span>One Unified Medical Record · 4 Synchronized Doctors</span>
              </div>

              {/* Interactive Tabs for the 4 Specialists */}
              <div className="lux-sync-orbit-grid">
                {CONSULTATIONS.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveSyncSpecialist(i)}
                    className={`lux-orbit-item ${activeSyncSpecialist === i ? 'active' : ''}`}
                  >
                    <img src={c.photo} alt={c.clinician} className="lux-orbit-doc-thumb" />
                    <div>
                      <strong>{c.clinician}</strong>
                      <span>{c.tag}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Specialist Sync Note */}
              <div className="lux-sync-active-note">
                <span className="lux-active-note-tag">Collaborative Action:</span>
                <p>
                  <strong>{CONSULTATIONS[activeSyncSpecialist].clinician}</strong> reviews clinical progress notes with the team weekly, ensuring therapies and nutritional protocols reinforce rather than clash with any medical prescriptions.
                </p>
              </div>

              <div className="lux-sync-guarantee-strip">
                <ShieldCheck size={16} />
                <span>Protected by HIPAA-grade security & medical privacy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DUAL CARE DELIVERY SHOWCASE (RICH PHOTOGRAPHY) */}
      <section className="lux-experience-section" id="experience">
        <div className="container">
          <div className="lux-section-header">
            <span className="lux-eyebrow">Two Seamless Formats</span>
            <h2 className="lux-section-title">Care designed around your privacy and comfort.</h2>
            <p className="lux-section-desc">
              Whether you prefer the intimacy of your own home or the focus of a physical suite, your clinical team is ready for you.
            </p>
          </div>

          <div className="lux-experience-grid">
            {/* Format 1: Online Pan-India */}
            <div className="lux-exp-card">
              <div className="lux-exp-img-wrap">
                <img
                  src="/images/telehealth.jpg"
                  alt="Encrypted video therapy session from home"
                  className="lux-exp-cover-img"
                />
                <span className="lux-exp-badge-overlay">Pan-India & Global</span>
              </div>
              <div className="lux-exp-card-body">
                <h3 className="lux-exp-title">Encrypted Video Consultations</h3>
                <p className="lux-exp-text">
                  Connect with our senior clinicians from anywhere across India. No traffic, no crowded waiting rooms, and total privacy in your own space.
                </p>
                <ul className="lux-exp-list">
                  <li>
                    <CheckCircle2 size={16} />
                    <span>1080p secure WebRTC encrypted connection</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} />
                    <span>Join in 1 click from phone or browser (no app download needed)</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} />
                    <span>Digital prescriptions & GST OPD invoices provided instantly</span>
                  </li>
                </ul>
                <div className="lux-exp-action">
                  <Link href="/book" className="lux-btn-exp">
                    <span>Book Online Video Session</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Format 2: Partner Clinic Hubs */}
            <div className="lux-exp-card">
              <div className="lux-exp-img-wrap">
                <img
                  src="/images/sanctuary.jpg"
                  alt="Acoustic consultation sanctuary interior"
                  className="lux-exp-cover-img"
                />
                <span className="lux-exp-badge-overlay">Designated Partner Hubs</span>
              </div>
              <div className="lux-exp-card-body">
                <h3 className="lux-exp-title">Partner Clinic Hubs</h3>
                <p className="lux-exp-text">
                  For patients who benefit from tactile, in-person presence, we operate dedicated consultation suites at designated healthcare partner hubs across metro centers.
                </p>
                <ul className="lux-exp-list">
                  <li>
                    <CheckCircle2 size={16} />
                    <span>Acoustic-soundproofed, quiet consultation suites</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} />
                    <span>Zero crowded hospital waiting rooms or public exposure</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} />
                    <span>Confirmed hub locations & private entry passes shared prior to session</span>
                  </li>
                </ul>
                <div className="lux-exp-action">
                  <Link href="/book" className="lux-btn-exp">
                    <span>Book Partner Hub Session</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PATIENT QUESTIONS & ANSWERS (FAQS) */}
      <section className="lux-faq-section" id="faqs">
        <div className="container lux-faq-container">
          <div className="lux-section-header">
            <span className="lux-eyebrow">Clear Answers</span>
            <h2 className="lux-section-title">Common questions before your first appointment</h2>
          </div>

          <div className="lux-faq-accordion">
            {CLIENT_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`lux-faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="lux-faq-question"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="lux-faq-toggle">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="lux-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. GRAND CLOSING CALL TO ACTION */}
      <section className="lux-closing-cta">
        <div className="container lux-cta-container">
          <span className="lux-cta-eyebrow">Begin Your Care</span>
          <h2 className="lux-cta-headline">Your peace of mind is not a luxury. It’s your foundation.</h2>
          <p className="lux-cta-subhead">
            Book your first consultation today. All appointments include free rescheduling up to 4 hours prior.
          </p>

          <div className="lux-cta-buttons">
            <Link href="/book" className="lux-btn-cta-primary">
              <Calendar size={18} />
              <span>Book Your Consultation</span>
              <ArrowRight size={16} />
            </Link>
            <a href="tel:+918047182200" className="lux-btn-cta-secondary">
              <span>Direct Clinic Helpline: 080 4718 2200</span>
            </a>
          </div>
        </div>
      </section>

      {/* 7. DISCREET STATUTORY CRISIS STRIP */}
      <aside className="lux-crisis-bar" aria-label="Crisis Helplines">
        <div className="container lux-crisis-inner">
          <div className="lux-crisis-left">
            <Shield size={15} />
            <span>Outpatient clinic. In acute emotional emergency or self-harm distress, please call toll-free 24/7:</span>
          </div>
          <div className="lux-crisis-right">
            <span>Tele-MANAS: <strong>14416</strong></span>
            <span className="lux-crisis-sep">·</span>
            <span>KIRAN: <strong>1800-599-0019</strong> (Govt. of India)</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
