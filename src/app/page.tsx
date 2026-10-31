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
  Phone,
  Heart
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
      {/* 1. SERENE SANCTUARY HERO */}
      <section className="bm-sanctuary-hero" id="start">
        <div className="container bm-hero-inner">
          <div className="bm-hero-badge-pill">
            <span className="bm-live-beacon" />
            <span>A quiet space where the noise stops · Bangalore Suites & Pan-India Video</span>
          </div>

          <h1 className="bm-sanctuary-heading">
            You do not have to carry <br />
            <em>the weight of the world alone.</em>
          </h1>

          <p className="bm-sanctuary-lead">
            Unhurried psychotherapy, somatic nervous system release, gut-brain medicine, and consultative psychiatry. Completely confidential, and free of clinical labels.
          </p>

          <div className="bm-sanctuary-cta-row">
            <Link href="/book?service=initial-assessment" className="bm-btn-sanctuary-primary">
              <Compass size={16} />
              <span>Begin with a Free 15-Minute Conversation</span>
              <ArrowRight size={14} />
            </Link>
            <Link href="/book" className="bm-btn-sanctuary-secondary">
              <Calendar size={15} />
              <span>Reserve a 50-Min Session</span>
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

          {/* Hero Fine-Art Illustration Frame */}
          <div className="bm-hero-art-showcase">
            <div className="bm-hero-art-frame">
              <img
                src="/images/sanctuary-art.jpg"
                alt="Sanctuary living space overlooking serene bamboo garden in soft daylight"
                className="bm-hero-art-image"
              />
            </div>
            <div className="bm-hero-art-caption">
              <span>Indiranagar Bangalore Private Suites & High-Definition Encrypted Video Across India</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SENSORY BREATHING PAUSE (INTERACTIVE CALM) */}
      <section className="bm-breath-section" aria-label="Interactive Breathing Moment">
        <div className="container">
          <div className="bm-breath-card">
            <div className="bm-breath-visual">
              <div className="bm-breath-ring" />
              <div className="bm-breath-orb">
                <span className="bm-breath-word">Breathe</span>
              </div>
            </div>
            <div className="bm-breath-content">
              <span className="bm-breath-tag">A Gentle Moment for Your Nervous System</span>
              <h3 className="bm-breath-title">If your mind is racing right now, take a slow breath.</h3>
              <p className="bm-breath-text">
                Notice the tension in your shoulders and chest. There is no checklist here, no ticking timer, and zero pressure. Take all the time you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR INSTITUTIONAL PILLARS */}
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
              <h4 className="bm-standard-heading">One Unified Care Record</h4>
              <p className="bm-standard-desc">
                Our 4 faculties coordinate quietly on one medical record so you never have to repeat your story.
              </p>
            </div>

            <div className="bm-standard-card">
              <span className="bm-standard-num">03</span>
              <h4 className="bm-standard-heading">Zero Scheduling Conflict</h4>
              <p className="bm-standard-desc">
                Atomic database concurrency guarantees no overlapping slots across multiple disciplines.
              </p>
            </div>

            <div className="bm-standard-card">
              <span className="bm-standard-num">04</span>
              <h4 className="bm-standard-heading">Acoustic & Digital Discretion</h4>
              <p className="bm-standard-desc">
                1080p encrypted video with zero downloads, or soundproofed suites in Indiranagar, Bangalore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE BESPOKE CARE DISCOVERY */}
      <SentenceReply />

      {/* 5. STORY: THERAPY AS AN EXHALE */}
      <section className="bm-story-section" id="philosophy">
        <div className="container">
          <div className="bm-story-grid">
            <div className="bm-story-image-wrap">
              <img
                src="/images/serene-mind-art.jpg"
                alt="Person resting comfortably in sunlit room with tea and soft breeze"
                className="bm-story-image"
              />
            </div>
            <div className="bm-story-body">
              <span className="bm-eyebrow-label">Our Philosophy of Care</span>
              <h2 className="bm-story-title">
                Therapy should feel like an exhale, <br />
                <em>never an interrogation.</em>
              </h2>
              <p className="bm-story-lead">
                Most healthcare environments treat you like a broken machine with a diagnostic code. At Better Mind, we understand that high-performing leaders, founders, and creators carry enormous cognitive and emotional friction.
              </p>
              <p className="bm-story-text">
                We do not pathologize your exhaustion. We give your nervous system, your racing thoughts, and your biological rhythms the unhurried space to unwind, with deeply compassionate clinicians who listen without judgment.
              </p>

              <div className="bm-story-features">
                <div className="bm-story-feat-item">
                  <Clock size={18} className="bm-feat-icon" />
                  <div>
                    <strong>Unhurried 50–60 Min Sessions</strong>
                    <p>No 10-minute rushed consultations. Plenty of time to speak, reflect, and be heard.</p>
                  </div>
                </div>

                <div className="bm-story-feat-item">
                  <Heart size={18} className="bm-feat-icon" />
                  <div>
                    <strong>Zero Diagnostic Stigma</strong>
                    <p>We treat you as a whole person navigating a complex life, not a pathological case.</p>
                  </div>
                </div>

                <div className="bm-story-feat-item">
                  <Shield size={18} className="bm-feat-icon" />
                  <div>
                    <strong>100% Confidential Care</strong>
                    <p>Protected under the DPDP Act 2023 with strict patient-practitioner privilege.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE FOUR UNIFIED DISCIPLINES */}
      <section className="bm-disciplines-section" id="disciplines">
        <div className="container">
          <div className="bm-section-intro-clean">
            <span className="bm-eyebrow-label">Unified Faculties</span>
            <h2 className="bm-practices-title">Four disciplines. One coordinated care plan.</h2>
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
                    <span>Reserve Session</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHAT TO EXPECT: FIRST SESSION FLOW */}
      <section className="bm-flow-section" id="first-session">
        <div className="container">
          <div className="bm-section-intro-clean">
            <span className="bm-eyebrow-label">Session Architecture</span>
            <h2 className="bm-practices-title">What happens when you arrive.</h2>
            <p className="bm-section-sub">
              Therapy should never feel intimidating. Here is how your first 50 minutes unfold:
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

      {/* 8. THE SPECIALISTS ROSTER */}
      <section className="bm-team-section" id="specialists">
        <div className="container">
          <div className="bm-section-intro-clean">
            <span className="bm-eyebrow-label">The Specialists</span>
            <h2 className="bm-practices-title">India's most thoughtful mental health collective.</h2>
            <p className="bm-section-sub">
              Senior faculty dedicated to unhurried, evidence-based, compassionate care.
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

      {/* 9. WHERE WE MEET (DUAL SPACES) */}
      <section className="bm-spaces-section" id="sanctuary">
        <div className="container">
          <div className="bm-section-intro-clean">
            <span className="bm-eyebrow-label">Where We Meet</span>
            <h2 className="bm-practices-title">From your private room or in our quiet Bangalore suites.</h2>
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

      {/* 10. KIND FIRST STEP BANNER (ANANYA ROY) */}
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
            <span className="bm-intro-badge">✦ A GENTLE FIRST STEP</span>
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

      {/* 11. MOBILE-FIRST STICKY THUMB DOCK */}
      <div className="bm-mobile-dock" aria-label="Quick Actions">
        <Link href="/book?service=initial-assessment" className="bm-dock-btn-primary">
          <Compass size={15} />
          <div className="bm-dock-text-group">
            <span className="bm-dock-main">Free 15m Intake</span>
            <span className="bm-dock-sub">Talk with Ananya Roy</span>
          </div>
        </Link>
        <Link href="/book" className="bm-dock-btn-secondary" title="Reserve a Consultation">
          <Calendar size={15} />
          <span>Reserve Session</span>
        </Link>
      </div>
    </div>
  );
}
