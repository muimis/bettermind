'use client';

import React from 'react';
import Link from 'next/link';
import SentenceReply from '@/components/SentenceReply';
import { FIRST_SESSION_STAGES } from '@/content/sentences';
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
  ChevronDown
} from '@/components/icons';

// 4 Focused Consultations with Verified Clinician Profiles
const CONSULTATIONS = [
  {
    id: 'clinical-psychology',
    tag: 'Mind',
    title: '1-on-1 Clinical Psychotherapy',
    struggle: 'Your thoughts won’t stop spiraling. Anxiety, depressive heaviness, or unhealed trauma is draining your peace.',
    clinician: 'Dr. Meera Sen, Ph.D.',
    role: 'Senior Clinical Psychologist (NIMHANS)',
    credentials: 'RCI Registered · 11+ Yrs Exp',
    photo: '/images/meera-sen.jpg',
    duration: '50 min',
    fee: '₹1,800',
    color: 'var(--color-mind)',
    icon: Brain
  },
  {
    id: 'psychiatry-consultation',
    tag: 'Brain',
    title: 'Neuropsychiatry & Medical Evaluation',
    struggle: 'You cannot focus, moods fluctuate sharply, or your brain biology requires an objective medical diagnostic workup.',
    clinician: 'Dr. Arun Nair, MD',
    role: 'Senior Consultant Psychiatrist (NIMHANS)',
    credentials: 'NMC Registered · 14+ Yrs Exp',
    photo: '/images/arun-nair.jpg',
    duration: '45 min',
    fee: '₹2,200',
    color: 'var(--color-mind)',
    icon: Award
  },
  {
    id: 'dietetics-nutrition',
    tag: 'Body',
    title: 'Gut-Brain Nutritional Psychiatry',
    struggle: 'Stress has inflamed your digestion (IBS), wrecked your sleep, or triggered afternoon fatigue and burnout eating.',
    clinician: 'Priya Sharma, RD',
    role: 'Lead Clinical Dietitian (Manipal)',
    credentials: 'IDA Certified · Gut-Brain Specialist',
    photo: '/images/priya-sharma.jpg',
    duration: '45 min',
    fee: '₹1,500',
    color: 'var(--color-body)',
    icon: Leaf
  },
  {
    id: 'therapeutic-yoga',
    tag: 'Body',
    title: 'Somatic Vagus Reset & Recalibration',
    struggle: 'Your body is locked in sympathetic panic. You carry physical tension where talking alone isn’t enough.',
    clinician: 'Rajesh Kumar, M.Sc.',
    role: 'Certified Somatic Therapist (SVYASA)',
    credentials: 'SEP Certified · Vagal Tonus Practitioner',
    photo: '/images/rajesh-kumar.jpg',
    duration: '60 min',
    fee: '₹1,400',
    color: 'var(--color-wellness)',
    icon: Sparkles
  }
];

// Clean Native Questions
const FAQS = [
  {
    q: 'How do I know which consultation is right for me?',
    a: 'Use the sentence navigator above, or start with our Complimentary 15-Minute Care Intake (₹0). Our coordinator listens to your symptoms and routes you to the exact specialist without pressure.'
  },
  {
    q: 'Can I book multiple specialists on the same day?',
    a: 'Yes. Our scheduling database guarantees zero time clash. You can book psychotherapy and gut-brain nutrition in one basket with seamless buffer times.'
  },
  {
    q: 'How do online video sessions work compared to partner clinic hubs?',
    a: 'Video sessions run in your browser via encrypted 1080p WebRTC (no app download). For in-person care, we operate dedicated, soundproofed consultation suites at designated partner clinic hubs in major metros.'
  },
  {
    q: 'What is your rescheduling and cancellation policy?',
    a: 'You can reschedule or cancel any session with zero fee up to 4 hours prior directly through your encrypted confirmation link.'
  }
];

export default function HomePage() {
  return (
    <div className="bm-site-wrap">
      {/* 1. MINIMAL HERO */}
      <section className="bm-hero-minimal" id="start">
        <div className="container bm-hero-inner">
          <div className="bm-hero-badge">
            <span className="bm-live-dot" />
            <span className="bm-label-mono">Online Across India · Designated Partner Clinic Hubs</span>
          </div>

          <h1 className="bm-hero-heading">
            When your mind feels heavy, we coordinate the{' '}
            <span className="bm-voice-visitor bm-heading-italic">exact care for you.</span>
          </h1>

          <p className="bm-hero-lead">
            Not generic advice. Not repeating your trauma four times. One synchronized clinic uniting medical psychiatry, clinical psychotherapy, gut-brain nutrition, and somatic nervous system therapy around you.
          </p>

          <div className="bm-hero-cta-row">
            <Link href="/book" className="bm-hero-btn-primary">
              <Calendar size={17} />
              <span>Book a Consultation</span>
              <ArrowRight size={15} />
            </Link>
            <Link href="/book?service=initial-assessment" className="bm-hero-btn-secondary">
              <Compass size={17} />
              <span>Free 15-Min Care Intake (₹0)</span>
            </Link>
          </div>

          <div className="bm-hero-guarantees">
            <span>✓ NMC & RCI Accredited</span>
            <span className="bm-dot">·</span>
            <span>✓ Zero Scheduling Overlap</span>
            <span className="bm-dot">·</span>
            <span>✓ 100% Confidential</span>
          </div>
        </div>
      </section>

      {/* 2. THE SENTENCE-AND-REPLY NAVIGATOR (MAIN INTERACTIVE COMPONENT) */}
      <SentenceReply />

      {/* 3. FOUR DIRECT CONSULTATIONS (CLEAN, FOCUSED CARDS) */}
      <section className="bm-section-clean" id="services">
        <div className="container">
          <div className="bm-clean-header">
            <span className="bm-label-mono" style={{ color: 'var(--color-mind)' }}>
              Targeted Clinical Care
            </span>
            <h2 className="bm-clean-title">No generic consultations. Just the exact care you need.</h2>
          </div>

          <div className="bm-consultations-grid">
            {CONSULTATIONS.map(item => {
              const IconComp = item.icon;
              return (
                <div key={item.id} className="bm-clean-card">
                  <div className="bm-card-badge-row">
                    <span className="bm-label-mono bm-group-chip" style={{ color: item.color }}>
                      <IconComp size={13} />
                      <span>{item.tag}</span>
                    </span>
                    <span className="bm-label-mono bm-card-duration">{item.duration}</span>
                  </div>

                  <h3 className="bm-card-service-name">{item.title}</h3>

                  <p className="bm-card-struggle">
                    <em>"{item.struggle}"</em>
                  </p>

                  <div className="bm-card-doctor-strip">
                    <img src={item.photo} alt={item.clinician} className="bm-card-doc-img" />
                    <div>
                      <strong className="bm-doc-name">{item.clinician}</strong>
                      <span className="bm-doc-meta">{item.role}</span>
                      <span className="bm-doc-badge">{item.credentials}</span>
                    </div>
                  </div>

                  <div className="bm-card-bottom-row">
                    <div className="bm-card-price-box">
                      <strong className="bm-card-price">{item.fee}</strong>
                      <span className="bm-card-mode">Video or Partner Hub</span>
                    </div>

                    <Link href={`/book?service=${item.id}`} className="bm-btn-card-book">
                      <span>Book</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FIRST SESSION TIMELINE (5 CRISP STAGES) */}
      <section className="bm-section-clean bm-bg-surface" id="first-session">
        <div className="container">
          <div className="bm-clean-header">
            <span className="bm-label-mono" style={{ color: 'var(--color-body)' }}>
              What to Expect
            </span>
            <h2 className="bm-clean-title">Your first session in five unhurried stages.</h2>
          </div>

          <div className="bm-timeline-row">
            {FIRST_SESSION_STAGES.map(stage => (
              <div key={stage.step} className="bm-timeline-col">
                <span className="bm-timeline-step-num">{stage.step}</span>
                <span className="bm-timeline-duration">{stage.duration}</span>
                <h4 className="bm-timeline-title">{stage.title}</h4>
                <p className="bm-timeline-desc">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TWO SEAMLESS FORMATS (ONLINE VIDEO & PARTNER HUBS) */}
      <section className="bm-section-clean" id="online-or-in-person">
        <div className="container">
          <div className="bm-clean-header">
            <span className="bm-label-mono" style={{ color: 'var(--color-mind)' }}>
              Care Formats
            </span>
            <h2 className="bm-clean-title">Comfort in your own home, or focus in a quiet sanctuary.</h2>
          </div>

          <div className="bm-formats-grid">
            <div className="bm-format-card">
              <img src="/images/telehealth.jpg" alt="Online video consultation" className="bm-format-img" />
              <div className="bm-format-body">
                <span className="bm-label-mono bm-format-tag">Pan-India & International</span>
                <h3>Encrypted Video Sessions</h3>
                <p>Connect with accredited clinicians from anywhere. 1080p secure WebRTC directly in your browser with zero app download.</p>
                <Link href="/book" className="bm-format-link">
                  <span>Book online session</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="bm-format-card">
              <img src="/images/sanctuary.jpg" alt="Acoustic partner consultation suite" className="bm-format-img" />
              <div className="bm-format-body">
                <span className="bm-label-mono bm-format-tag">Designated Partner Hubs</span>
                <h3>Partner Clinic Hubs</h3>
                <p>For patients who prefer tactile, in-person presence. Dedicated acoustic-soundproofed consultation suites across major metro centers.</p>
                <Link href="/book" className="bm-format-link">
                  <span>Book partner hub session</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPLIMENTARY INTAKE BANNER */}
      <section className="container bm-intake-banner-wrap" id="intake">
        <div className="bm-intake-card">
          <div className="bm-intake-left">
            <div className="bm-intake-icon-wrap">
              <Compass size={28} />
            </div>
            <div>
              <span className="bm-label-mono bm-intake-badge">Complimentary First Step</span>
              <h3 className="bm-intake-heading">Not sure where to begin? We do a 15-Minute Intake for you at ₹0.</h3>
              <p className="bm-intake-text">
                Speak with our Lead Care Coordinator, Ananya Roy, MSW (TISS alumni). She listens to what you are carrying and maps your care without pressure.
              </p>
            </div>
          </div>
          <Link href="/book?service=initial-assessment" className="bm-btn-intake">
            <span>Start Free Intake (₹0)</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 7. NATIVE FAQ SECTION (CLEAN & MINIMALIST) */}
      <section className="bm-section-clean" id="questions">
        <div className="container bm-faq-container">
          <div className="bm-clean-header">
            <span className="bm-label-mono" style={{ color: 'var(--color-quiet-text)' }}>
              Clear Answers
            </span>
            <h2 className="bm-clean-title">Frequently asked questions</h2>
          </div>

          <div className="bm-native-faq-list">
            {FAQS.map((faq, i) => (
              <details key={i} className="bm-faq-details">
                <summary className="bm-faq-summary">
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className="bm-faq-chevron" />
                </summary>
                <div className="bm-faq-content">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
