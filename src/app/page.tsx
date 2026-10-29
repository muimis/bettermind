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
  ShieldCheck,
  Video,
  Building2,
  CheckCircle2,
  ChevronDown,
  Heart
} from '@/components/icons';

// The Specialists: Real, Empathetic Humans in Your Corner
const SPECIALISTS = [
  {
    id: 'clinical-psychology',
    name: 'Dr. Meera Sen, Ph.D.',
    shortName: 'Dr. Meera',
    discipline: 'Psychotherapy',
    tag: 'Mind',
    desc: 'A safe, confidential space to quiet racing thoughts, work through complex decisions, and find emotional clarity.',
    credential: 'Senior Practitioner · NIMHANS alumna',
    photo: '/images/meera-sen.jpg',
    duration: '50 min',
    fee: '₹1,800',
    color: 'var(--color-mind)',
    icon: Brain
  },
  {
    id: 'psychiatry-consultation',
    name: 'Dr. Arun Nair, MD',
    shortName: 'Dr. Arun',
    discipline: 'Focus & Medical Review',
    tag: 'Mind & Body',
    desc: 'Thoughtful medical clarity for adult focus, sleep cycles, and unhurried reviews of your wellness prescriptions.',
    credential: 'Senior Psychiatrist · NIMHANS alumnus',
    photo: '/images/arun-nair.jpg',
    duration: '45 min',
    fee: '₹2,200',
    color: 'var(--color-mind)',
    icon: Award
  },
  {
    id: 'dietetics-nutrition',
    name: 'Priya Sharma, RD',
    shortName: 'Priya',
    discipline: 'Gut-Brain Nutrition',
    tag: 'Body',
    desc: 'Realistic, enjoyable food guidance to soothe your digestion, lift brain fog, and restore steady all-day energy.',
    credential: 'Registered Dietitian · Manipal alumna',
    photo: '/images/priya-sharma.jpg',
    duration: '45 min',
    fee: '₹1,500',
    color: 'var(--color-body)',
    icon: Leaf
  },
  {
    id: 'therapeutic-yoga',
    name: 'Rajesh Kumar, M.Sc.',
    shortName: 'Rajesh',
    discipline: 'Somatic Bodywork',
    tag: 'Body',
    desc: 'Gentle breath and somatic movement to help tight shoulders, neck, and nervous tension finally release.',
    credential: 'Somatic Practitioner · SVYASA alumnus',
    photo: '/images/rajesh-kumar.jpg',
    duration: '60 min',
    fee: '₹1,400',
    color: 'var(--color-wellness)',
    icon: Sparkles
  }
];

const FAQS = [
  {
    q: 'What if I don’t know who I should talk to first?',
    a: 'That is completely normal. Most people start with our free 15-minute call with Ananya. She listens to what you are experiencing and gently suggests who would be most helpful to meet first.'
  },
  {
    q: 'Can I see a therapist and a dietitian or doctor at the same clinic?',
    a: 'Yes. All our specialists are part of one integrated practice. They coordinate quietly behind the scenes so your care feels whole, cohesive, and you never have to repeat yourself.'
  },
  {
    q: 'Can I do my sessions from home or my phone?',
    a: 'Yes. Most people join video sessions from the privacy of their room or home. You simply click a secure link on your phone or laptop — no apps to download.'
  },
  {
    q: 'What if my schedule changes and I need to reschedule?',
    a: 'Life is unpredictable. You can reschedule or cancel any session with zero penalty up to 4 hours before your appointment directly from your confirmation email.'
  }
];

export default function HomePage() {
  return (
    <div className="bm-site-wrap">
      {/* 1. WELCOMING, HUMAN HERO */}
      <section className="bm-hero-minimal" id="start">
        <div className="container bm-hero-inner">
          <div className="bm-hero-badge">
            <span className="bm-live-dot" />
            <span className="bm-label-mono">Online Video Across India · Quiet Metro Suites</span>
          </div>

          <h1 className="bm-hero-heading">
            A quiet space to think, reset, and{' '}
            <span className="bm-voice-visitor bm-heading-italic">feel steady.</span>
          </h1>

          <p className="bm-hero-lead">
            In a fast-moving world, you don’t need a diagnosis or a label. You just need someone sharp, thoughtful, and unhurried to talk with. Dedicated support for your mind, focus, and body.
          </p>

          <div className="bm-hero-cta-row">
            <Link href="/book" className="bm-hero-btn-primary">
              <Calendar size={17} />
              <span>Book a 1-on-1 Session</span>
              <ArrowRight size={15} />
            </Link>
            <Link href="/book?service=initial-assessment" className="bm-hero-btn-secondary">
              <Compass size={17} />
              <span>Talk to someone first (Free · 15m)</span>
            </Link>
          </div>

          <div className="bm-hero-guarantees">
            <span>✓ 100% Confidential</span>
            <span className="bm-dot">·</span>
            <span>✓ Zero Clinical Labels</span>
            <span className="bm-dot">·</span>
            <span>✓ Unhurried Conversations</span>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS ON YOUR MIND (SENTENCE-AND-REPLY) */}
      <SentenceReply />

      {/* 3. MEET YOUR SPECIALISTS */}
      <section className="bm-section-clean" id="services">
        <div className="container">
          <div className="bm-clean-header">
            <span className="bm-label-mono" style={{ color: 'var(--color-mind)' }}>
              Your Care Team
            </span>
            <h2 className="bm-clean-title">Thoughtful humans in your corner.</h2>
            <p className="bm-section-sub">
              Experienced, accredited specialists dedicated to listening, calming your nervous system, and helping you thrive.
            </p>
          </div>

          <div className="bm-consultations-grid">
            {SPECIALISTS.map(item => {
              const IconComp = item.icon;
              return (
                <div key={item.id} className="bm-clean-card">
                  <div className="bm-card-badge-row">
                    <span className="bm-label-mono bm-group-chip" style={{ color: item.color }}>
                      <IconComp size={13} />
                      <span>{item.discipline}</span>
                    </span>
                    <span className="bm-label-mono bm-card-duration">{item.duration}</span>
                  </div>

                  <div className="bm-card-doctor-strip">
                    <img src={item.photo} alt={item.name} className="bm-card-doc-img" />
                    <div>
                      <strong className="bm-doc-name">{item.name}</strong>
                      <span className="bm-doc-meta">{item.credential}</span>
                    </div>
                  </div>

                  <p className="bm-card-struggle">
                    {item.desc}
                  </p>

                  <div className="bm-card-bottom-row">
                    <div className="bm-card-price-box">
                      <strong className="bm-card-price">{item.fee}</strong>
                      <span className="bm-card-mode">Video or In-Person</span>
                    </div>

                    <Link href={`/book?service=${item.id}`} className="bm-btn-card-book">
                      <span>Reserve with {item.shortName}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WHAT YOUR FIRST SESSION FEELS LIKE */}
      <section className="bm-section-clean bm-bg-surface" id="first-session">
        <div className="container">
          <div className="bm-clean-header">
            <span className="bm-label-mono" style={{ color: 'var(--color-body)' }}>
              First Session
            </span>
            <h2 className="bm-clean-title">What your first session feels like.</h2>
            <p className="bm-section-sub">
              No interrogations, no clipboards, no rushing. Here is how we spend our time together.
            </p>
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

      {/* 5. WHERE WE MEET (HOME OR SANCTUARY) */}
      <section className="bm-section-clean" id="online-or-in-person">
        <div className="container">
          <div className="bm-clean-header">
            <span className="bm-label-mono" style={{ color: 'var(--color-mind)' }}>
              Comfort & Space
            </span>
            <h2 className="bm-clean-title">Join from your home, or visit a quiet suite.</h2>
          </div>

          <div className="bm-formats-grid">
            <div className="bm-format-card">
              <img src="/images/telehealth.jpg" alt="Online video consultation from home" className="bm-format-img" />
              <div className="bm-format-body">
                <span className="bm-label-mono bm-format-tag">Pan-India & International</span>
                <h3>From your private space</h3>
                <p>Join a private, encrypted video room from wherever you feel most comfortable. One tap on your phone or laptop with zero app downloads.</p>
                <Link href="/book" className="bm-format-link">
                  <span>Book online session</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="bm-format-card">
              <img src="/images/sanctuary.jpg" alt="Quiet in-person consultation room" className="bm-format-img" />
              <div className="bm-format-body">
                <span className="bm-label-mono bm-format-tag">Metro Partner Hubs</span>
                <h3>In a quiet sanctuary</h3>
                <p>For when you prefer physical presence. Dedicated, soundproofed consultation suites in quiet metro hubs, designed like a serene living room.</p>
                <Link href="/book" className="bm-format-link">
                  <span>Book in-person session</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GENTLE INTAKE BANNER */}
      <section className="container bm-intake-banner-wrap" id="intake">
        <div className="bm-intake-card">
          <div className="bm-intake-left">
            <div className="bm-intake-icon-wrap">
              <Compass size={28} />
            </div>
            <div>
              <span className="bm-label-mono bm-intake-badge">Gentle First Step</span>
              <h3 className="bm-intake-heading">Not sure who to start with? Let's have a 15-minute chat.</h3>
              <p className="bm-intake-text">
                Speak privately with our Care Coordinator, Ananya. No cost, no clinical questions, and zero obligation. Just a kind conversation to help you find your footing.
              </p>
            </div>
          </div>
          <Link href="/book?service=initial-assessment" className="bm-btn-intake">
            <span>Talk with Ananya (Free)</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 7. CLEAR, REASSURING FAQS */}
      <section className="bm-section-clean" id="questions">
        <div className="container bm-faq-container">
          <div className="bm-clean-header">
            <span className="bm-label-mono" style={{ color: 'var(--color-quiet-text)' }}>
              Clear Answers
            </span>
            <h2 className="bm-clean-title">Common questions</h2>
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

      {/* 8. MOBILE-FIRST STICKY THUMB DOCK */}
      <div className="bm-mobile-dock" aria-label="Quick Actions">
        <Link href="/book" className="bm-dock-btn-primary">
          <Calendar size={16} />
          <div className="bm-dock-text-group">
            <span className="bm-dock-main">Reserve a Session</span>
            <span className="bm-dock-sub">From ₹1,400</span>
          </div>
        </Link>
        <Link href="/book?service=initial-assessment" className="bm-dock-btn-secondary" title="Free 15-minute introductory call">
          <Compass size={16} />
          <span>Free 15m Chat</span>
        </Link>
      </div>
    </div>
  );
}
