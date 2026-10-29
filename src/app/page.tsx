'use client';

import React from 'react';
import Link from 'next/link';
import {
  Brain,
  Leaf,
  Sparkles,
  Compass,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Video,
  Building2,
  Phone
} from '@/components/icons';

const PRACTICES = [
  {
    id: 'clinical-psychology',
    num: '01',
    label: 'The Mind',
    title: 'Quiet racing thoughts & cognitive load',
    lead: 'Dr. Meera Sen, Ph.D.',
    credential: 'NIMHANS alumna',
    desc: 'A confidential, unhurried space to process difficult decisions, quiet mental noise, and restore emotional clarity.',
    duration: '50 min',
    fee: '₹1,800',
    color: 'var(--color-mind)',
    icon: Brain,
    photo: '/images/meera-sen.jpg',
    slug: 'clinical-psychology',
    actionText: 'Reserve Mind Session'
  },
  {
    id: 'therapeutic-yoga',
    num: '02',
    label: 'The Body',
    title: 'Release stored tension in neck, chest & jaw',
    lead: 'Rajesh Kumar, M.Sc.',
    credential: 'SVYASA alumnus',
    desc: 'When stress locks into your muscles, gentle somatic breathwork and movement helps your nervous system physically exhale.',
    duration: '60 min',
    fee: '₹1,400',
    color: 'var(--color-wellness)',
    icon: Sparkles,
    photo: '/images/rajesh-kumar.jpg',
    slug: 'therapeutic-yoga',
    actionText: 'Reserve Body Session'
  },
  {
    id: 'dietetics-nutrition',
    num: '03',
    label: 'The Rhythm',
    title: 'Restore daytime energy, gut health & restful sleep',
    lead: 'Priya Sharma, RD',
    credential: 'Manipal alumna',
    desc: 'Gut-brain nutritional medicine to steady your daily focus, soothe digestion, and renew deep nighttime recovery.',
    duration: '45 min',
    fee: '₹1,500',
    color: 'var(--color-body)',
    icon: Leaf,
    photo: '/images/priya-sharma.jpg',
    slug: 'dietetics-nutrition',
    actionText: 'Reserve Rhythm Session'
  }
];

const SPECIALISTS = [
  {
    id: 'clinical-psychology',
    name: 'Dr. Meera Sen, Ph.D.',
    role: 'Psychotherapy & Cognitive Clarity',
    credential: 'Senior Psychologist · NIMHANS alumna',
    photo: '/images/meera-sen.jpg',
    duration: '50 min',
    fee: '₹1,800'
  },
  {
    id: 'therapeutic-yoga',
    name: 'Rajesh Kumar, M.Sc.',
    role: 'Somatic Breath & Tension Release',
    credential: 'Somatic Practitioner · SVYASA alumnus',
    photo: '/images/rajesh-kumar.jpg',
    duration: '60 min',
    fee: '₹1,400'
  },
  {
    id: 'dietetics-nutrition',
    name: 'Priya Sharma, RD',
    role: 'Gut-Brain Nutrition & Metabolism',
    credential: 'Clinical Nutritionist · Manipal alumna',
    photo: '/images/priya-sharma.jpg',
    duration: '45 min',
    fee: '₹1,500'
  },
  {
    id: 'psychiatry-consultation',
    name: 'Dr. Arun Nair, MD',
    role: 'Focus & Medical Prescription Review',
    credential: 'Senior Psychiatrist · NIMHANS alumnus',
    photo: '/images/arun-nair.jpg',
    duration: '45 min',
    fee: '₹2,200'
  }
];

export default function HomePage() {
  return (
    <div className="bm-site-wrap">
      {/* 1. EDITORIAL SANCTUARY HERO */}
      <section className="bm-sanctuary-hero" id="start">
        <div className="container bm-hero-inner">
          <div className="bm-hero-eyebrow">
            <span className="bm-live-beacon" />
            <span>Sanctuary & Collective · Bangalore Suites & Pan-India Video</span>
          </div>

          <h1 className="bm-sanctuary-heading">
            A quiet sanctuary <br />
            <em>for the overloaded mind.</em>
          </h1>

          <p className="bm-sanctuary-lead">
            Unhurried psychotherapy, somatic nervous system release, and gut-brain restoration. Completely confidential, and free of clinical labels.
          </p>

          <div className="bm-sanctuary-cta-row">
            <Link href="/book" className="bm-btn-sanctuary-primary">
              <Calendar size={15} />
              <span>Reserve a Session (From ₹1,400)</span>
              <ArrowRight size={14} />
            </Link>
            <Link href="/book?service=initial-assessment" className="bm-btn-sanctuary-secondary">
              <Compass size={15} />
              <span>Speak with Ananya (Free 15m)</span>
            </Link>
          </div>

          <div className="bm-sanctuary-reassurances">
            <span>100% Confidential</span>
            <span className="bm-dot">·</span>
            <span>Zero Diagnostic Labels</span>
            <span className="bm-dot">·</span>
            <span>NIMHANS & SVYASA Alumni</span>
            <span className="bm-dot">·</span>
            <span>Unhurried 50m Sessions</span>
          </div>
        </div>
      </section>

      {/* 2. THE EDITORIAL MARQUEE (QUIET AUTHORITY) */}
      <section className="bm-marquee-wrap" aria-label="Credentials and Commitments">
        <div className="bm-marquee-track">
          <span>✦ NIMHANS ALUMNI</span>
          <span>✦ RCI LICENSED PSYCHOTHERAPY</span>
          <span>✦ SOMATIC NERVOUS SYSTEM RELEASE</span>
          <span>✦ GUT-BRAIN CLINICAL NUTRITION</span>
          <span>✦ UNHURRIED 50-MINUTE SESSIONS</span>
          <span>✦ ZERO DIAGNOSTIC LABELS</span>
          <span>✦ ENCRYPTED VIDEO PAN-INDIA</span>
          <span>✦ QUIET METRO SANCTUARIES</span>
          <span>✦ NIMHANS ALUMNI</span>
          <span>✦ RCI LICENSED PSYCHOTHERAPY</span>
          <span>✦ SOMATIC NERVOUS SYSTEM RELEASE</span>
          <span>✦ GUT-BRAIN CLINICAL NUTRITION</span>
          <span>✦ UNHURRIED 50-MINUTE SESSIONS</span>
          <span>✦ ZERO DIAGNOSTIC LABELS</span>
          <span>✦ ENCRYPTED VIDEO PAN-INDIA</span>
          <span>✦ QUIET METRO SANCTUARIES</span>
        </div>
      </section>

      {/* 3. FULL-BLEED SANCTUARY VISUAL SHOWCASE */}
      <section className="bm-hero-media-wrap" id="sanctuary">
        <div className="container">
          <div className="bm-hero-media-card">
            <img
              src="/images/sanctuary.jpg"
              alt="Better Mind quiet sanctuary living room with wood slats and botanical light"
              className="bm-media-img"
            />
            <div className="bm-media-overlay">
              <span className="bm-overlay-tag">Indiranagar · Bangalore Sanctuary Suites</span>
              <h2 className="bm-media-title">Step into a space where the noise of the world stops.</h2>
              <p className="bm-media-text">
                Whether you connect from your private room on your phone or visit one of our soundproofed metro suites, you experience unhurried human care designed to restore your equilibrium.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE THREE CORE DISCIPLINES (EDITORIAL ATELIER INDEX) */}
      <section className="bm-disciplines-section" id="disciplines">
        <div className="container">
          <div className="bm-section-intro-clean">
            <span className="bm-eyebrow-label">Practices & Disciplines</span>
            <h2 className="bm-practices-title">Three paths to feeling grounded.</h2>
            <p className="bm-section-sub">
              Choose where your mind or body needs support today. Transparent fees, unhurried sessions, and zero judgment.
            </p>
          </div>

          <div className="bm-disciplines-list">
            {PRACTICES.map(item => {
              const IconComp = item.icon;
              return (
                <div key={item.id} className="bm-discipline-row">
                  <span className="bm-discipline-num">{item.num}</span>

                  <div className="bm-discipline-thumb">
                    <img src={item.photo} alt={item.lead} />
                  </div>

                  <div className="bm-discipline-info">
                    <div className="bm-discipline-badge-row">
                      <span className="bm-discipline-pill" style={{ color: item.color }}>
                        {item.label}
                      </span>
                    </div>
                    <h3 className="bm-discipline-title">{item.title}</h3>
                    <p className="bm-discipline-lead">
                      {item.lead} <span>· {item.credential}</span>
                    </p>
                    <p className="bm-discipline-desc">{item.desc}</p>
                  </div>

                  <div className="bm-discipline-meta-action">
                    <span className="bm-discipline-fee">{item.duration} · {item.fee}</span>
                    <Link href={`/book?service=${item.slug}`} className="bm-discipline-cta">
                      <span>Reserve</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. THE SPECIALISTS ROSTER (EDITORIAL PORTRAIT GALLERY) */}
      <section className="bm-team-section" id="specialists">
        <div className="container">
          <div className="bm-section-intro-clean">
            <span className="bm-eyebrow-label">The Collective</span>
            <h2 className="bm-practices-title">Quiet expertise in your corner.</h2>
            <p className="bm-section-sub">
              India's foremost mental health practitioners, dedicated to unhurried, human care.
            </p>
          </div>

          <div className="bm-team-grid">
            {SPECIALISTS.map(spec => (
              <div key={spec.id} className="bm-team-member-card">
                <div className="bm-team-img-wrap">
                  <img src={spec.photo} alt={spec.name} className="bm-team-img" />
                </div>
                <div className="bm-team-meta">
                  <strong className="bm-team-name">{spec.name}</strong>
                  <span className="bm-team-role">{spec.role}</span>
                  <span className="bm-team-cred">{spec.credential}</span>
                  <div className="bm-team-rate-row">
                    <span className="bm-team-fee">{spec.fee} · {spec.duration}</span>
                    <Link href={`/book?service=${spec.id}`} className="bm-team-book-link">
                      <span>Reserve</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHERE WE MEET (DUAL SPACES) */}
      <section className="bm-spaces-section" id="spaces">
        <div className="container">
          <div className="bm-section-intro-clean">
            <span className="bm-eyebrow-label">Where We Meet</span>
            <h2 className="bm-practices-title">From your sofa or in our quiet suites.</h2>
            <p className="bm-section-sub">
              Care designed around your comfort, without clinical waiting rooms or friction.
            </p>
          </div>

          <div className="bm-spaces-editorial-grid">
            <div className="bm-space-card">
              <div className="bm-space-img-wrap">
                <img src="/images/telehealth.jpg" alt="Comfortable telehealth session at home" className="bm-space-photo" />
              </div>
              <div className="bm-space-body">
                <div className="bm-space-icon-badge">
                  <Video size={18} />
                </div>
                <h3>From your sofa</h3>
                <p>Join encrypted video from your phone or laptop with one tap. High-definition, private, with zero apps to install.</p>
                <Link href="/book" className="bm-space-link">
                  <span>Book online session</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="bm-space-card">
              <div className="bm-space-img-wrap">
                <img src="/images/sanctuary.jpg" alt="In-person quiet sanctuary suite" className="bm-space-photo" />
              </div>
              <div className="bm-space-body">
                <div className="bm-space-icon-badge">
                  <Building2 size={18} />
                </div>
                <h3>In our Bangalore sanctuary</h3>
                <p>Soundproofed, private consultation suites in quiet metro hubs, designed like a serene living room free from clinical sterile cues.</p>
                <Link href="/book" className="bm-space-link">
                  <span>Book in-person session</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. KIND FIRST STEP BANNER */}
      <section className="container bm-intro-chat-section" id="intro">
        <div className="bm-intro-chat-card">
          <div className="bm-intro-chat-content">
            <span className="bm-eyebrow-label">A Gentle First Step</span>
            <h3 className="bm-intro-heading">Not sure where to begin? Have a 15-minute conversation.</h3>
            <p className="bm-intro-desc">
              Speak privately with our Care Coordinator, Ananya. No cost, no clinical questionnaires, and zero obligation. Just a kind human conversation to help you find your footing.
            </p>
          </div>
          <Link href="/book?service=initial-assessment" className="bm-btn-intro-chat">
            <span>Talk with Ananya (Free 15m)</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* 8. MOBILE-FIRST STICKY THUMB DOCK */}
      <div className="bm-mobile-dock" aria-label="Quick Actions">
        <Link href="/book" className="bm-dock-btn-primary">
          <Calendar size={15} />
          <div className="bm-dock-text-group">
            <span className="bm-dock-main">Reserve a Session</span>
            <span className="bm-dock-sub">From ₹1,400 · Online & Hubs</span>
          </div>
        </Link>
        <Link href="/book?service=initial-assessment" className="bm-dock-btn-secondary" title="Free 15-minute introductory call">
          <Compass size={15} />
          <span>Free 15m Intro</span>
        </Link>
      </div>
    </div>
  );
}
