'use client';

import React from 'react';
import Link from 'next/link';
import SentenceReply from '@/components/SentenceReply';
import { FIRST_SESSION_STAGES } from '@/content/sentences';
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
  Shield,
  Clock,
  Award,
  Phone
} from '@/components/icons';

const PRACTICES = [
  {
    id: 'clinical-psychology',
    num: '01',
    label: 'The Mind',
    title: 'Quiet racing thoughts & restore cognitive clarity',
    lead: 'Dr. Meera Sen, Ph.D.',
    credential: 'Senior Clinical Psychologist · NIMHANS alumna',
    desc: 'An unhurried, deeply confidential space to process complex life decisions, resolve recurring worry loops, and untangle chronic mental noise.',
    duration: '50 min',
    fee: '₹1,800',
    color: '#163A32',
    icon: Brain,
    photo: '/images/meera-sen.jpg',
    slug: 'clinical-psychology'
  },
  {
    id: 'therapeutic-yoga',
    num: '02',
    label: 'The Body',
    title: 'Release stored tension in neck, chest & jaw',
    lead: 'Rajesh Kumar, M.Sc.',
    credential: 'Somatic Therapist · SVYASA alumnus',
    desc: 'When cognitive stress locks into your musculature, targeted polyvagal breathwork and somatic movement guide your autonomic nervous system out of fight-or-flight freeze.',
    duration: '60 min',
    fee: '₹1,400',
    color: '#8C5835',
    icon: Sparkles,
    photo: '/images/rajesh-kumar.jpg',
    slug: 'therapeutic-yoga'
  },
  {
    id: 'dietetics-nutrition',
    num: '03',
    label: 'The Rhythm',
    title: 'Restore daytime stamina, gut comfort & sleep',
    lead: 'Priya Sharma, RD',
    credential: 'Lead Clinical Dietitian · Manipal alumna',
    desc: 'Clinical nutrition targeting the enteric gut-brain axis to soothe stress-induced digestion, eliminate afternoon brain fog, and optimize natural serotonin synthesis.',
    duration: '45 min',
    fee: '₹1,500',
    color: '#8C5835',
    icon: Leaf,
    photo: '/images/priya-sharma.jpg',
    slug: 'dietetics-nutrition'
  },
  {
    id: 'psychiatry-consultation',
    num: '04',
    label: 'The Biology',
    title: 'Considerate medical review of neurobiology & sleep',
    lead: 'Dr. Arun Nair, MD',
    credential: 'Senior Consultant Psychiatrist · NIMHANS alumnus',
    desc: 'Conservative, thoughtful psychiatric evaluation of neurochemical factors, severe insomnia, or safe medication reviews, closely coordinated with psychological care.',
    duration: '45 min',
    fee: '₹2,200',
    color: '#163A32',
    icon: Award,
    photo: '/images/arun-nair.jpg',
    slug: 'psychiatry-consultation'
  }
];

const SPECIALISTS = [
  {
    id: 'clinical-psychology',
    name: 'Dr. Meera Sen, Ph.D.',
    role: 'Psychotherapy & Cognitive Clarity',
    credential: 'Senior Clinical Psychologist · NIMHANS alumna',
    experience: '11+ yrs clinical experience · RCI Licensed',
    photo: '/images/meera-sen.jpg',
    duration: '50 min',
    fee: '₹1,800'
  },
  {
    id: 'therapeutic-yoga',
    name: 'Rajesh Kumar, M.Sc.',
    role: 'Somatic Breath & Tension Release',
    credential: 'Somatic Therapist · SVYASA alumnus',
    experience: 'Vagal tonus practitioner · Certified SEP',
    photo: '/images/rajesh-kumar.jpg',
    duration: '60 min',
    fee: '₹1,400'
  },
  {
    id: 'dietetics-nutrition',
    name: 'Priya Sharma, RD',
    role: 'Gut-Brain Nutrition & Metabolism',
    credential: 'Lead Clinical Dietitian · Manipal alumna',
    experience: 'IDA Certified Gut-Brain Specialist',
    photo: '/images/priya-sharma.jpg',
    duration: '45 min',
    fee: '₹1,500'
  },
  {
    id: 'psychiatry-consultation',
    name: 'Dr. Arun Nair, MD',
    role: 'Neuropsychiatry & Prescription Review',
    credential: 'Senior Psychiatrist · NIMHANS alumnus',
    experience: '14+ yrs practice · NMC Registered',
    photo: '/images/arun-nair.jpg',
    duration: '45 min',
    fee: '₹2,200'
  },
  {
    id: 'initial-assessment',
    name: 'Ananya Roy, MSW',
    role: 'Practice Coordinator & Intake Bridge',
    credential: 'Lead Care Coordinator · TISS alumna',
    experience: 'Psychiatric social work · Patient advocacy',
    photo: '/images/ananya-roy.jpg',
    duration: '15 min',
    fee: 'Complimentary'
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
            <span>INTEGRATED SANCTUARY & COLLECTIVE · BANGALORE SUITES & PAN-INDIA ENCRYPTED VIDEO</span>
          </div>

          <h1 className="bm-sanctuary-heading">
            A quiet sanctuary <br />
            <em>for the overloaded mind.</em>
          </h1>

          <p className="bm-sanctuary-lead">
            Unhurried psychotherapy, somatic nervous system release, gut-brain medicine, and consultative psychiatry. Completely confidential, and free of clinical labels.
          </p>

          <div className="bm-sanctuary-cta-row">
            <Link href="/book" className="bm-btn-sanctuary-primary">
              <Calendar size={15} />
              <span>Request Private Consultation</span>
              <ArrowRight size={14} />
            </Link>
            <Link href="/book?service=initial-assessment" className="bm-btn-sanctuary-secondary">
              <Compass size={15} />
              <span>Complimentary 15m Intake</span>
            </Link>
          </div>

          <div className="bm-sanctuary-reassurances">
            <span>NIMHANS, TISS & SVYASA Alumni</span>
            <span className="bm-dot">·</span>
            <span>100% Confidential</span>
            <span className="bm-dot">·</span>
            <span>Zero Diagnostic Labels</span>
            <span className="bm-dot">·</span>
            <span>DPDP Act 2023 Compliant</span>
          </div>
        </div>
      </section>

      {/* 2. INSTITUTIONAL ACCREDITATION & HERITAGE REGISTRY (ELEVATED ALTERNATIVE TO MARQUEE) */}
      <section className="bm-standards-strip" aria-label="Clinical Standards and Accreditations">
        <div className="container">
          <div className="bm-standards-grid">
            <div className="bm-standard-card">
              <span className="bm-standard-num">01</span>
              <h4 className="bm-standard-heading">Institutional Pedigree</h4>
              <p className="bm-standard-desc">
                Clinicians trained at NIMHANS, TISS, Manipal, and SVYASA with verified statutory registrations.
              </p>
            </div>

            <div className="bm-standard-card">
              <span className="bm-standard-num">02</span>
              <h4 className="bm-standard-heading">Unified Care Record</h4>
              <p className="bm-standard-desc">
                Our 4 faculties coordinate quietly on one medical record so you never have to repeat your story.
              </p>
            </div>

            <div className="bm-standard-card">
              <span className="bm-standard-num">03</span>
              <h4 className="bm-standard-heading">Zero Scheduling Clash</h4>
              <p className="bm-standard-desc">
                Atomic database concurrency guarantees no overlapping slots across multiple disciplines.
              </p>
            </div>

            <div className="bm-standard-card">
              <span className="bm-standard-num">04</span>
              <h4 className="bm-standard-heading">Discreet Discretion</h4>
              <p className="bm-standard-desc">
                1080p encrypted video with zero downloads, or soundproofed suites in Indiranagar, Bangalore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE BESPOKE REFLECTION ATELIER (THE CENTERPIECE) */}
      <SentenceReply />

      {/* 4. FULL-BLEED ARCHITECTURAL SANCTUARY SHOWCASE */}
      <section className="bm-hero-media-wrap" id="sanctuary">
        <div className="container">
          <div className="bm-hero-media-card">
            <img
              src="/images/sanctuary.jpg"
              alt="Better Mind quiet sanctuary living room with wood slats and botanical daylight"
              className="bm-media-img"
            />
            <div className="bm-media-overlay">
              <span className="bm-overlay-tag">Indiranagar · Bangalore Private Suites</span>
              <h2 className="bm-media-title">Step into a space where the noise of the world stops.</h2>
              <p className="bm-media-text">
                Whether connecting from your home via encrypted video or visiting our acoustic-soundproofed Bangalore suites, you experience unhurried human medicine designed to restore equilibrium.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE FOUR UNIFIED DISCIPLINES (EDITORIAL ATELIER INDEX) */}
      <section className="bm-disciplines-section" id="disciplines">
        <div className="container">
          <div className="bm-section-intro-clean">
            <span className="bm-eyebrow-label">Practices & Disciplines</span>
            <h2 className="bm-practices-title">Four paths to complete equilibrium.</h2>
            <p className="bm-section-sub">
              Choose where your mind or body requires support today. Transparent fees, unhurried consultations, and zero clinical labels.
            </p>
          </div>

          <div className="bm-disciplines-list">
            {PRACTICES.map(item => (
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
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHAT TO EXPECT: THE FIRST SESSION FLOW */}
      <section className="bm-flow-section" id="first-session">
        <div className="container">
          <div className="bm-section-intro-clean">
            <span className="bm-eyebrow-label">Session Architecture</span>
            <h2 className="bm-practices-title">What happens when you arrive.</h2>
            <p className="bm-section-sub">
              Therapy should never feel like an interrogation. Here is how your first 50 minutes unfold:
            </p>
          </div>

          <div className="bm-flow-grid">
            {FIRST_SESSION_STAGES.map(stage => (
              <div key={stage.step} className="bm-flow-card">
                <div className="bm-flow-step-num">{stage.step}</div>
                <div className="bm-flow-duration">{stage.duration}</div>
                <h4 className="bm-flow-title">{stage.title}</h4>
                <p className="bm-flow-desc">{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. THE SPECIALISTS ROSTER (EDITORIAL PORTRAIT GALLERY) */}
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

      {/* 8. WHERE WE MEET (DUAL SPACES) */}
      <section className="bm-spaces-section" id="spaces">
        <div className="container">
          <div className="bm-section-intro-clean">
            <span className="bm-eyebrow-label">Where We Meet</span>
            <h2 className="bm-practices-title">From your private room or in our quiet suites.</h2>
            <p className="bm-section-sub">
              Care designed around your schedule, without clinical waiting rooms or bureaucratic friction.
            </p>
          </div>

          <div className="bm-spaces-editorial-grid">
            <div className="bm-space-card">
              <div className="bm-space-img-wrap">
                <img src="/images/telehealth.jpg" alt="Comfortable telehealth session in private room" className="bm-space-photo" />
              </div>
              <div className="bm-space-body">
                <div className="bm-space-icon-badge">
                  <Video size={18} />
                </div>
                <h3>Pan-India Encrypted Video</h3>
                <p>Launch high-definition 1080p video with one tap on your laptop or phone. Zero apps to download, zero waiting rooms, and end-to-end encrypted under the DPDP Act.</p>
                <Link href="/book" className="bm-space-link">
                  <span>Schedule online session</span>
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
                <h3>Bangalore Sanctuary Suites</h3>
                <p>Acoustic-soundproofed consultation suites in quiet Indiranagar hubs, curated with warm natural woods, linen upholstery, and discreet private check-in.</p>
                <Link href="/book" className="bm-space-link">
                  <span>Schedule in-person session</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. KIND FIRST STEP BANNER (ANANYA ROY) */}
      <section className="container bm-intro-chat-section" id="intro">
        <div className="bm-intro-chat-card">
          <div className="bm-intro-chat-avatar-wrap">
            <img
              src="/images/ananya-roy.jpg"
              alt="Ananya Roy, Lead Care Coordinator"
              className="bm-intro-chat-avatar"
            />
          </div>
          <div className="bm-intro-chat-content">
            <span className="bm-eyebrow-label">A Gentle First Step</span>
            <h3 className="bm-intro-heading">Not sure where to begin? Have an unhurried 15-minute conversation.</h3>
            <p className="bm-intro-desc">
              Speak privately with our Practice Coordinator, Ananya Roy (MSW, TISS alumna). No cost, no clinical questionnaires, and zero obligation. Just a kind human conversation to help you navigate your options.
            </p>
          </div>
          <Link href="/book?service=initial-assessment" className="bm-btn-intro-chat">
            <span>Talk with Ananya (Free 15m)</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* 10. MOBILE-FIRST STICKY THUMB DOCK */}
      <div className="bm-mobile-dock" aria-label="Quick Actions">
        <Link href="/book" className="bm-dock-btn-primary">
          <Calendar size={15} />
          <div className="bm-dock-text-group">
            <span className="bm-dock-main">Reserve Consultation</span>
            <span className="bm-dock-sub">Online Video & Bangalore Suites</span>
          </div>
        </Link>
        <Link href="/book?service=initial-assessment" className="bm-dock-btn-secondary" title="Complimentary 15-minute introductory call">
          <Compass size={15} />
          <span>Free 15m Intake</span>
        </Link>
      </div>
    </div>
  );
}
