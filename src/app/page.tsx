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
  Users,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Heart
} from '@/components/icons';

// Clinical Problem-Solution Consultations
const CONSULTATIONS = [
  {
    id: 'talk-therapy',
    category: 'mind',
    tag: 'Anxiety & Racing Loops',
    feeling: 'Racing thoughts, panic attacks, or emotional overwhelm',
    problem: 'Your thoughts won’t stop spiraling. Anxiety, depressive heaviness, or unhealed relational trauma is draining your daily peace.',
    weDoTitle: 'We do 1-on-1 Clinical Psychotherapy for you.',
    whatHappens: 'Dr. Meera Sen uses evidence-backed CBT, ACT, and EMDR trauma integration in a confidential, safe space to dissolve repetitive anxiety loops and rebuild deep emotional stability.',
    clinician: 'Dr. Meera Sen, Ph.D.',
    clinicianRole: 'Senior Clinical Psychologist (NIMHANS)',
    credentials: 'RCI Registered · 11+ Years Experience',
    initial: 'MS',
    duration: '50 min',
    fee: '₹1,800',
    mode: 'Online Video Pan-India · Partner Clinic Hub',
    accentColor: '#3949AB',
    softBg: '#EEF2FB',
    borderColor: '#D1DBF6',
    icon: Brain,
    availableNext: 'Tomorrow, 11:00 AM'
  },
  {
    id: 'psychiatry',
    category: 'brain',
    tag: 'ADHD, Focus & Mood Biology',
    feeling: 'Severe mood swings, brain fog, or suspected ADHD',
    problem: 'You cannot focus, your moods fluctuate unpredictably, or you suspect your brain biology and neurotransmitters require medical clarity.',
    weDoTitle: 'We do Neuropsychiatry & Medical Diagnostic Evaluation for you.',
    whatHappens: 'Dr. Arun Nair performs a thorough diagnostic evaluation of your neurochemistry, adult ADHD biomarkers, and sleep architecture — providing medical clarity and monitored, conservative prescriptions if indicated.',
    clinician: 'Dr. Arun Nair, MD',
    clinicianRole: 'Senior Consultant Psychiatrist (NIMHANS)',
    credentials: 'NMC Registered · 14+ Years Experience',
    initial: 'AN',
    duration: '45 min',
    fee: '₹2,200',
    mode: 'Online Video Pan-India · Partner Clinic Hub',
    accentColor: '#124E47',
    softBg: '#EDF6F4',
    borderColor: '#C3E2DC',
    icon: Award,
    availableNext: 'Today, 4:30 PM'
  },
  {
    id: 'nutrition',
    category: 'gut',
    tag: 'Gut-Brain Axis & Burnout Fatigue',
    feeling: 'Stress-induced gut distress, IBS, or burnout fatigue',
    problem: 'Stress has inflamed your digestive tract (IBS), wrecked your sleep, or triggered cycles of afternoon fatigue and burnout eating.',
    weDoTitle: 'We do Gut-Brain Nutritional Psychiatry for you.',
    whatHappens: 'Over 90% of serotonin is produced in the gut. Priya Sharma analyzes your microbiome-gut-brain axis and builds an anti-inflammatory dietary protocol using authentic Indian foods to stabilize neurotransmitters.',
    clinician: 'Priya Sharma, RD',
    clinicianRole: 'Lead Clinical Dietitian (Manipal)',
    credentials: 'IDA Certified · Gut-Brain Specialist',
    initial: 'PS',
    duration: '45 min',
    fee: '₹1,500',
    mode: 'Online Video Pan-India · Partner Clinic Hub',
    accentColor: '#2E694F',
    softBg: '#EEF7F2',
    borderColor: '#CBE6D6',
    icon: Leaf,
    availableNext: 'Friday, 3:00 PM'
  },
  {
    id: 'somatic',
    category: 'body',
    tag: 'Physical Panic & Nervous System Lock',
    feeling: 'Clenched jaw, chest tightness, or fight-or-flight panic',
    problem: 'Your body is trapped in sympathetic overdrive. You carry physical tension in your chest and neck, or feel acute panic where talking alone isn’t enough.',
    weDoTitle: 'We do Somatic Vagus Reset & Nervous System Recalibration for you.',
    whatHappens: 'Rajesh Kumar guides you through gentle polyvagal somatic movement, vagus nerve stimulation, and restorative autonomic breathwork to release trauma held in physical tissue and restore physiological calm.',
    clinician: 'Rajesh Kumar, M.Sc.',
    clinicianRole: 'Certified Somatic Therapist (SVYASA)',
    credentials: 'SEP Certified · Vagal Tonus Practitioner',
    initial: 'RK',
    duration: '60 min',
    fee: '₹1,400',
    mode: 'Online Video Pan-India · Partner Clinic Hub',
    accentColor: '#B45330',
    softBg: '#FBF1EC',
    borderColor: '#F0D5C9',
    icon: Sparkles,
    availableNext: 'Today, 6:00 PM'
  }
];

// Interactive Feeling Filters
const FEELING_PILLS = [
  { id: 'all', label: 'All Consultations' },
  { id: 'talk-therapy', label: '⚡ Racing Thoughts & Anxiety' },
  { id: 'psychiatry', label: '🧠 ADHD, Brain Fog & Mood' },
  { id: 'nutrition', label: '🌿 Gut Distress & Fatigue' },
  { id: 'somatic', label: '🫀 Physical Tension & Panic' },
  { id: 'unsure', label: '🧭 Unsure / Everything at Once' }
];

// Client FAQs
const CLIENT_FAQS = [
  {
    q: 'How do I know which consultation is right for my current situation?',
    a: 'If you are unsure where to begin, book our Complimentary 15-Minute Intake Consultation (₹0). Ananya Roy, MSW (TISS), listens to what you are experiencing without judgment and connects you to the exact specialist suited to your needs.'
  },
  {
    q: 'Can I book sessions with multiple specialists on the same day?',
    a: 'Yes. Our clinical booking engine is built with a zero-overlap database guarantee. You can seamlessly schedule psychotherapy and gut-brain nutrition on the same day without time conflicts.'
  },
  {
    q: 'How do online video sessions work compared to partner clinic hubs?',
    a: 'Both formats maintain the same high standard of clinical care. Online sessions take place via secure 1080p WebRTC encrypted video directly in your browser with zero app installation. For in-person sessions, we operate at quiet, acoustic-soundproofed consultation suites at designated partner clinic hubs across major cities.'
  },
  {
    q: 'What is your rescheduling and cancellation policy?',
    a: 'You can cancel or reschedule any consultation with zero penalty up to 4 hours before your appointment directly from your secure confirmation link.'
  }
];

export default function HomePage() {
  const [selectedFeeling, setSelectedFeeling] = useState<string>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const displayedConsultations = selectedFeeling === 'all' || selectedFeeling === 'unsure'
    ? CONSULTATIONS
    : CONSULTATIONS.filter(c => c.id === selectedFeeling);

  return (
    <div className="bm-lux-site">
      {/* 1. EDITORIAL LUXURY HERO */}
      <section className="lux-hero">
        <div className="lux-hero-ambient-glow" aria-hidden="true" />
        <div className="container lux-hero-content">
          {/* Status Pill */}
          <div className="lux-hero-pill">
            <span className="lux-live-dot" />
            <span className="lux-pill-text">Online Pan-India & Partner Clinic Hubs</span>
            <span className="lux-pill-divider">·</span>
            <span className="lux-pill-sub">Zero Clinician Clash</span>
          </div>

          {/* Main Direct-Address Headline */}
          <h1 className="lux-hero-title">
            When your mind feels heavy,<br />
            <span className="lux-title-italic">we do the exact consultation for you.</span>
          </h1>

          {/* Consumer-Oriented Subhead */}
          <p className="lux-hero-lead">
            Not generic advice. Not repeating your story four times. We connect what you are carrying right now directly with the licensed specialist trained to resolve it.
          </p>

          {/* Interactive Feeling Selector */}
          <div className="lux-feeling-selector-box">
            <span className="lux-feeling-label">What are you navigating right now?</span>
            <div className="lux-feeling-chips">
              {FEELING_PILLS.map(pill => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => {
                    setSelectedFeeling(pill.id);
                    if (pill.id === 'unsure') {
                      const el = document.getElementById('free-intake');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    } else if (pill.id !== 'all') {
                      const el = document.getElementById('consultations');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`lux-feeling-chip ${selectedFeeling === pill.id ? 'active' : ''}`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
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

          {/* Trust Guarantees */}
          <div className="lux-trust-strip">
            <div className="lux-trust-item">
              <ShieldCheck size={16} />
              <span>End-to-End Encrypted</span>
            </div>
            <span className="lux-trust-dot">·</span>
            <div className="lux-trust-item">
              <CheckCircle2 size={16} />
              <span>NMC & RCI Licensed Clinicians</span>
            </div>
            <span className="lux-trust-dot">·</span>
            <div className="lux-trust-item">
              <Clock size={16} />
              <span>Unhurried 45–60 Min Sessions</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE CONSULTATION MATRIX (DIRECT PROBLEM-SOLUTION) */}
      <section className="lux-matrix-section" id="consultations">
        <div className="container">
          <div className="lux-section-header">
            <span className="lux-eyebrow">Personalized Care</span>
            <h2 className="lux-section-title">We don’t do generic consultations. We do the exact care you need.</h2>
            <p className="lux-section-desc">
              Every consultation is led 1-on-1 by an accredited specialist. Choose your acute challenge below to see your care path and next available opening.
            </p>
          </div>

          {/* Grid of Problem-Solution Cards */}
          <div className="lux-cards-grid">
            {displayedConsultations.map(item => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  className="lux-card"
                  style={{
                    borderTop: `3px solid ${item.accentColor}`
                  }}
                >
                  {/* Card Header & Tag */}
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

                  {/* Specialist Identity */}
                  <div className="lux-specialist-box">
                    <div
                      className="lux-specialist-avatar"
                      style={{ backgroundColor: item.accentColor }}
                    >
                      {item.initial}
                    </div>
                    <div className="lux-specialist-meta">
                      <strong className="lux-doc-name">{item.clinician}</strong>
                      <span className="lux-doc-role">{item.clinicianRole}</span>
                      <span className="lux-doc-cred">{item.credentials}</span>
                    </div>
                  </div>

                  {/* Pricing & Duration Bar */}
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

          {/* 3. COMPLIMENTARY INTAKE TRIAGE BANNER */}
          <div className="lux-triage-card" id="free-intake">
            <div className="lux-triage-inner">
              <div className="lux-triage-icon-wrap">
                <Compass size={28} />
              </div>
              <div className="lux-triage-body">
                <span className="lux-triage-badge">Complimentary First Step</span>
                <h3 className="lux-triage-heading">
                  Not sure what you need? We do a 15-Minute Intake Consultation for you at ₹0.
                </h3>
                <p className="lux-triage-text">
                  When everything feels heavy at once, choosing between a psychologist, psychiatrist, or gut-brain dietitian can feel paralyzing. Spend 15 minutes with our Lead Care Coordinator, Ananya Roy, MSW (TISS). She will listen to your symptoms and map your care plan without any pressure.
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

      {/* 4. THE COORDINATED SYNCHRONY ENGINE (WHY CLIENTS CHOOSE US) */}
      <section className="lux-synchrony-section">
        <div className="container">
          <div className="lux-sync-container">
            <div className="lux-sync-info">
              <span className="lux-eyebrow">The Better Mind Model</span>
              <h2 className="lux-sync-title">Your mental health is whole-body. Your care should be too.</h2>
              <p className="lux-sync-desc">
                In traditional healthcare, you visit a psychiatrist in a hospital, a therapist in an app, and your gut flare-ups are dismissed. You repeat your trauma four times and get conflicting advice.
              </p>
              <p className="lux-sync-desc">
                At Better Mind, your psychologist, psychiatrist, dietitian, and somatic therapist work as one coordinated team around you. One unified medical record. Zero repeating your story.
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
                <span>Active Integrated Care Protocol</span>
              </div>

              <div className="lux-sync-center-node">
                <strong>You (The Patient)</strong>
                <span>One Unified Medical File</span>
              </div>

              <div className="lux-sync-orbit-grid">
                <div className="lux-orbit-item item-mind">
                  <Brain size={20} />
                  <div>
                    <strong>Clinical Psychology</strong>
                    <span>Worry Loops & Trauma</span>
                  </div>
                </div>

                <div className="lux-orbit-item item-brain">
                  <Award size={20} />
                  <div>
                    <strong>Neuropsychiatry</strong>
                    <span>Neurochemistry & Sleep</span>
                  </div>
                </div>

                <div className="lux-orbit-item item-gut">
                  <Leaf size={20} />
                  <div>
                    <strong>Gut-Brain Nutrition</strong>
                    <span>Microbiome & Energy</span>
                  </div>
                </div>

                <div className="lux-orbit-item item-somatic">
                  <Sparkles size={20} />
                  <div>
                    <strong>Somatic Therapy</strong>
                    <span>Vagal Tone & Body Calm</span>
                  </div>
                </div>
              </div>

              <div className="lux-sync-guarantee-strip">
                <ShieldCheck size={16} />
                <span>Protected by HIPAA-grade security & medical privacy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DUAL CARE DELIVERY EXPERIENCE (ONLINE PAN-INDIA & PARTNER HUBS) */}
      <section className="lux-experience-section">
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
              <div className="lux-exp-header">
                <div className="lux-exp-icon video-icon">
                  <Video size={24} />
                </div>
                <span className="lux-exp-badge">Pan-India & International</span>
              </div>
              <h3 className="lux-exp-title">Encrypted Video Consultations</h3>
              <p className="lux-exp-text">
                Connect with our senior clinicians from anywhere across India. No waiting rooms, no traffic, and complete discretion.
              </p>
              <ul className="lux-exp-list">
                <li>
                  <CheckCircle2 size={16} />
                  <span>1080p secure WebRTC encrypted connection</span>
                </li>
                <li>
                  <CheckCircle2 size={16} />
                  <span>Join in 1 click from phone or browser (no app download)</span>
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

            {/* Format 2: Partner Clinic Hubs */}
            <div className="lux-exp-card">
              <div className="lux-exp-header">
                <div className="lux-exp-icon clinic-icon">
                  <Building2 size={24} />
                </div>
                <span className="lux-exp-badge">Designated Partner Hubs</span>
              </div>
              <h3 className="lux-exp-title">Partner Clinic Hubs</h3>
              <p className="lux-exp-text">
                For patients who benefit from tactile, in-person presence, we hold dedicated consultation hours at partner clinic hubs in major metro centers.
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
                  <span>Confirmed hub locations & entry passes shared prior to launch</span>
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
      </section>

      {/* 6. CLIENT QUESTIONS & ANSWERS (FAQS) */}
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

      {/* 7. GRAND CLOSING CALL TO ACTION */}
      <section className="lux-closing-cta">
        <div className="container lux-cta-container">
          <span className="lux-cta-eyebrow">Begin Your Care</span>
          <h2 className="lux-cta-headline">Your peace of mind is not a luxury. It’s your foundation.</h2>
          <p className="lux-cta-subhead">
            Book your consultation today. All appointments include free rescheduling up to 4 hours prior.
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

      {/* 8. 24/7 CRISIS SAFETY STRIP */}
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
