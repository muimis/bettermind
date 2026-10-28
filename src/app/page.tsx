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
  MapPin,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Video,
  Building2,
  Users
} from '@/components/icons';

// 4 Core Consumer Disciplines (Everything in ONE place: service, clinician, duration, price, and booking link)
const DISCIPLINES = [
  {
    id: 'psychotherapy',
    tag: 'Talk Therapy',
    name: 'Clinical Psychology',
    benefit: 'Safe, non-judgmental psychotherapy for anxiety, depression, burnout, and trauma.',
    clinician: 'Dr. Meera Sen, Ph.D.',
    quals: 'Senior Psychologist · NIMHANS',
    initial: 'MS',
    fee: '₹1,800',
    duration: '50 min',
    color: '#3949AB',
    bg: '#EEF2FB',
    icon: Brain,
    available: 'Tomorrow'
  },
  {
    id: 'psychiatry',
    tag: 'Medical Care',
    name: 'Psychiatry Consultation',
    benefit: 'Diagnostic evaluation, adult ADHD, mood stabilization, and mindful medication care.',
    clinician: 'Dr. Arun Nair, MD',
    quals: 'Senior Psychiatrist · NIMHANS',
    initial: 'AN',
    fee: '₹2,200',
    duration: '45 min',
    color: '#124E47',
    bg: '#EDF6F4',
    icon: Award,
    available: 'Today'
  },
  {
    id: 'nutrition',
    tag: 'Gut-Brain Axis',
    name: 'Clinical Nutrition',
    benefit: 'Microbiome restoration and anti-inflammatory food plans to stabilize mood and energy.',
    clinician: 'Priya Sharma, RD',
    quals: 'Clinical Dietitian · Manipal',
    initial: 'PS',
    fee: '₹1,500',
    duration: '45 min',
    color: '#2E694F',
    bg: '#EEF7F2',
    icon: Leaf,
    available: 'Fri'
  },
  {
    id: 'somatic',
    tag: 'Nervous System',
    name: 'Somatic Reset & Breath',
    benefit: '1-on-1 vagus nerve movement and body breathwork to release physical panic and tension.',
    clinician: 'Rajesh Kumar, M.Sc.',
    quals: 'Somatic Practitioner · SVYASA',
    initial: 'RK',
    fee: '₹1,400',
    duration: '60 min',
    color: '#B45330',
    bg: '#FBF1EC',
    icon: Sparkles,
    available: 'Today'
  }
];

// Essential Consumer FAQs (Only what patients actually care about)
const FAQS = [
  {
    q: 'How do I know which specialist to book first?',
    a: 'If you’re unsure, book our complimentary Initial Care Assessment (₹0 · 45 min). Our care coordinator, Ananya Roy (TISS), will listen to what you’re experiencing and route you to the right therapist, doctor, or nutritionist.'
  },
  {
    q: 'Can I do my sessions online or visit the clinic in person?',
    a: 'Both! You can consult from home via private, encrypted video, or visit our quiet, soundproofed clinic in Indiranagar, Bengaluru. You can even combine online therapy with in-person somatic sessions.'
  },
  {
    q: 'Can I reschedule or cancel if something comes up?',
    a: 'Yes. You can cancel or reschedule with zero fee up to 4 hours before your session directly through your private confirmation link.'
  }
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bm-minimal-site">
      {/* 1. HERO SECTION: ICONIC, HUMAN, ZERO-CLUTTER */}
      <section className="min-hero">
        <div className="container min-hero-container">
          <div className="min-hero-pill">
            <span className="min-pulse-dot"></span>
            <span>Online & Indiranagar Sanctuary, Bengaluru</span>
          </div>

          <h1 className="min-hero-title">
            Healthcare that listens to the <em>whole</em> of you.
          </h1>

          <p className="min-hero-lead">
            Psychiatry, therapy, gut-brain nutrition, and somatic movement — coordinated under one roof. No repeat stories, no schedule clashes.
          </p>

          <div className="min-hero-actions">
            <Link href="/book" className="btn-min-primary">
              <Calendar size={17} />
              <span>Book a Consultation</span>
            </Link>
            <Link href="/book" className="btn-min-ghost">
              <Compass size={17} />
              <span>Unsure? Free 15-Min Triage (₹0)</span>
            </Link>
          </div>

          <div className="min-hero-trust">
            <span>🛡️ 100% Confidential</span>
            <span>·</span>
            <span>🌿 No Referral Needed</span>
            <span>·</span>
            <span>⏱️ Zero-Clash Scheduling</span>
          </div>
        </div>
      </section>

      {/* 2. THE 4 CORE DISCIPLINES: ALL-IN-ONE CONSUMER CARDS (NO DUPLICATE PRICING TABLE) */}
      <section className="min-disciplines-section" id="services">
        <div className="container">
          <div className="min-section-header">
            <span className="min-eyebrow">Our Care</span>
            <h2>Four disciplines. One coordinated practice.</h2>
            <p>Book a single session or combine multiple disciplines in one appointment.</p>
          </div>

          <div className="min-disciplines-grid">
            {DISCIPLINES.map(item => {
              const IconComponent = item.icon;
              return (
                <div key={item.id} className="min-discipline-card" style={{ borderTop: `3px solid ${item.color}` }}>
                  <div className="mdc-top">
                    <span className="mdc-tag" style={{ color: item.color, background: item.bg }}>
                      <IconComponent size={14} />
                      <span>{item.tag}</span>
                    </span>
                    <span className="mdc-avail">Next: {item.available}</span>
                  </div>

                  <h3 className="mdc-name">{item.name}</h3>
                  <p className="mdc-benefit">{item.benefit}</p>

                  <div className="mdc-clinician">
                    <div className="mdc-avatar" style={{ background: item.color }}>
                      {item.initial}
                    </div>
                    <div>
                      <strong>{item.clinician}</strong>
                      <span>{item.quals}</span>
                    </div>
                  </div>

                  <div className="mdc-footer">
                    <div className="mdc-price">
                      <strong>{item.fee}</strong>
                      <span>/ {item.duration}</span>
                    </div>
                    <Link href="/book" className="btn-mdc-book" style={{ background: item.color }}>
                      <span>Book</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Complimentary Triage Callout */}
          <div className="min-triage-card">
            <div className="mtc-left">
              <div className="mtc-badge">Complimentary · 45 Min</div>
              <h3>Not sure where to begin? Start with our care coordinator.</h3>
              <p>
                Tell us what you’re feeling. Ananya Roy, MSW (TISS), will listen to your symptoms and map out your care roadmap without any sales pressure.
              </p>
            </div>
            <Link href="/book" className="btn-min-primary mtc-btn">
              <span>Start Free Triage (₹0)</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. WHY BETTER MIND: 3 CONSUMER PROMISES (NO VERBOSE ACADEMIC LECTURES) */}
      <section className="min-promises-section">
        <div className="container">
          <div className="min-promises-grid">
            <div className="min-promise-box">
              <div className="mpb-icon">🤝</div>
              <h4>One Coordinated Team</h4>
              <p>Your therapist, psychiatrist, and nutritionist talk to each other. You never have to repeat your story over and over.</p>
            </div>

            <div className="min-promise-box">
              <div className="mpb-icon">⏱️</div>
              <h4>Zero-Clash Scheduling</h4>
              <p>Combine talk therapy and nutrition on the same day. Our engine guarantees your times never overlap.</p>
            </div>

            <div className="min-promise-box">
              <div className="mpb-icon">🔒</div>
              <h4>Private & Frictionless</h4>
              <p>Manage everything through a secure link. No mandatory passwords, no public apps, and 100% medical privacy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE INDIRANAGAR SANCTUARY: VISUAL PEACE & SERENITY */}
      <section className="min-sanctuary-section" id="sanctuary">
        <div className="container min-sanctuary-container">
          <div className="min-sanctuary-image-wrap">
            <img
              src="/images/sanctuary.jpg"
              alt="Better Mind Clinic Sanctuary Interior in Indiranagar Bengaluru"
              className="min-sanctuary-img"
            />
            <div className="min-sanctuary-badge">Indiranagar Clinic · Bengaluru</div>
          </div>

          <div className="min-sanctuary-content">
            <span className="min-eyebrow">The Clinic Sanctuary</span>
            <h2>A quiet place to pause and heal.</h2>
            <p>
              Tucked away in Indiranagar, our clinic is architecturally soundproofed with acoustic doors, diffused natural sunlight, and zero clinical waiting-room buzzers.
            </p>

            <div className="min-sanctuary-details">
              <div className="msd-row">
                <MapPin size={17} className="msd-icon" />
                <span>14th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru</span>
              </div>
              <div className="msd-row">
                <Clock size={17} className="msd-icon" />
                <span>Monday – Saturday: 8:30 AM – 8:30 PM IST</span>
              </div>
              <div className="msd-row">
                <CheckCircle2 size={17} className="msd-icon" />
                <span>GST medical invoices provided for corporate wellness & OPD insurance</span>
              </div>
            </div>

            <div className="min-sanctuary-actions">
              <Link href="/book" className="btn-min-primary">
                <span>Book In-Person Session</span>
                <ArrowRight size={15} />
              </Link>
              <a
                href="https://maps.google.com/?q=Indiranagar+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-min-secondary"
              >
                <span>View on Maps</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ONLY 3 ESSENTIAL CONSUMER FAQS */}
      <section className="min-faq-section" id="faqs">
        <div className="container min-faq-container">
          <div className="min-section-header">
            <span className="min-eyebrow">Clear Answers</span>
            <h2>Common questions</h2>
          </div>

          <div className="min-faq-stack">
            {FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`min-faq-item ${isOpen ? 'active' : ''}`}>
                  <button
                    type="button"
                    className="mfaq-question"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span className="mfaq-chevron">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="mfaq-answer">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CLEAN, SERENE CALL TO ACTION */}
      <section className="min-cta-section">
        <div className="container min-cta-container">
          <h2>Ready to feel supported?</h2>
          <p>Book your first session today. No referrals required.</p>
          <div className="min-cta-actions">
            <Link href="/book" className="btn-min-primary btn-lg">
              <Calendar size={18} />
              <span>Book an Appointment</span>
            </Link>
            <a href="tel:+918047182200" className="btn-min-secondary btn-lg">
              <span>Call Us: 080 4718 2200</span>
            </a>
          </div>
        </div>
      </section>

      {/* 7. DISCREET 24/7 CRISIS STRIP */}
      <footer className="min-crisis-footer">
        <div className="container min-crisis-inner">
          <div className="mcf-left">
            <Shield size={14} />
            <span>Outpatient clinic. In acute distress, call toll-free:</span>
          </div>
          <div className="mcf-right">
            <span><strong>Tele-MANAS: 14416</strong></span>
            <span>·</span>
            <span><strong>KIRAN: 1800-599-0019</strong> (24/7 Govt. of India)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
