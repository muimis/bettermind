'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Brain,
  Award,
  Leaf,
  Sparkles,
  Heart,
  Clock,
  Video,
  Building2,
  CheckCircle2,
  ArrowRight,
  Shield,
  Users
} from '@/components/icons';

type ServiceDetail = {
  id: string;
  slug: string;
  group: string;
  name: string;
  tagline: string;
  duration: string;
  fee: string;
  feeNote: string;
  modes: string;
  indications: string[];
  whatToExpect: string;
  credentials: string;
  clinicalPractitioner: string;
  color: string;
  bg: string;
  icon: any;
  suitableFor: string[];
};

const fullServices: ServiceDetail[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    slug: 'initial-assessment',
    group: 'Orientation',
    name: 'Gentle Orientation & Care Coordination',
    tagline: 'A quiet 15-minute introductory conversation to understand your needs and recommend your ideal starting path',
    duration: '15 min',
    fee: '₹0 · Complimentary',
    feeNote: 'Complimentary orientation for anyone exploring care with Better Mind',
    modes: 'Online Video or Bangalore Suites',
    color: '#8C5835',
    bg: '#FBF8F5',
    icon: Compass,
    suitableFor: [
      'Overthinking & Cognitive Load',
      'Body Tension & Nervous System',
      'Energy, Gut & Sleep Rhythm',
      'Stress & Daily Resilience'
    ],
    indications: [
      'Unsure whether your mind or body needs attention first',
      'Seeking an unpressured introduction before scheduling a full session',
      'Wondering how psychotherapy, somatic breathwork, and nutrition connect',
      'Looking for recommendations on the right practitioner for your rhythm and language'
    ],
    whatToExpect:
      'You meet with Ananya Roy, our Lead Care Coordinator. In an unhurried, gentle conversation, we listen to what feels heavy in your daily life, answer all questions about therapy modalities, and match you with the practitioner best suited to your schedule and comfort.',
    credentials: 'Led by certified psychiatric social work specialist (TISS alumna)',
    clinicalPractitioner: 'Ananya Roy, MSW'
  },
  {
    id: '22222222-2222-2222-2222-222222222221',
    slug: 'clinical-psychology',
    group: 'The Mind',
    name: 'Psychotherapy & Cognitive Clarity',
    tagline: 'Evidence-based cognitive, relational, and trauma-informed dialogue to untangle thoughts and restore internal calm',
    duration: '50 min',
    fee: '₹1,800',
    feeNote: 'Unhurried 50-minute private consultation · Receipt provided for insurance reimbursement',
    modes: 'Online Video or Bangalore Suites',
    color: '#163A32',
    bg: '#F2F6F4',
    icon: Brain,
    suitableFor: ['Overthinking & Cognitive Load', 'Stress & Daily Resilience'],
    indications: [
      'Racing thoughts, anticipatory dread, or persistent cognitive overwhelm',
      'Feeling emotionally drained, disconnected, or carrying heavy life transitions',
      'Desire to dismantle relentless self-criticism and establish healthy boundaries',
      'Looking for an unhurried, confidential thinking partner to navigate life and relationships'
    ],
    whatToExpect:
      'A confidential, collaborative dialogue grounded in Cognitive Behavioral Therapy (CBT), Acceptance and Commitment Therapy (ACT), and somatic trauma integration. You unpack recurring emotional friction, build adaptive coping tools, and regain a sense of clarity in a safe, unhurried space.',
    credentials: 'Delivered by RCI-licensed Clinical Psychologists (M.Phil / Ph.D. NIMHANS)',
    clinicalPractitioner: 'Dr. Meera Sen, Ph.D.'
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    slug: 'psychiatry-consultation',
    group: 'The Mind',
    name: 'Consultative Psychiatry & Neurobiology',
    tagline: 'Considerate medical evaluation and neurochemical guidance when your nervous system needs deeper clinical support',
    duration: '45 min',
    fee: '₹2,200',
    feeNote: '45-minute consultative evaluation · Compliant with Telemedicine Practice Guidelines',
    modes: 'Online Video or Bangalore Suites',
    color: '#163A32',
    bg: '#F2F6F4',
    icon: Award,
    suitableFor: ['Overthinking & Cognitive Load', 'Energy, Gut & Sleep Rhythm'],
    indications: [
      'Persistent mood heaviness or severe anxiety that has not shifted through talk therapy alone',
      'Significant circadian disruptions, sleep fragmentation, or chronic morning exhaustion',
      'Seeking a considerate second medical opinion on current medications',
      'Desire for safe, monitored guidance on neurobiological health and holistic treatment planning'
    ],
    whatToExpect:
      'A considerate medical examination covering neurobiology, family medical history, lab investigations (thyroid, vitamin deficiencies), and lifestyle triggers. Prescriptions, if necessary, are conservative, carefully monitored, and always harmonized with psychological and somatic care.',
    credentials: 'Delivered by NMC-registered Senior Consultant Psychiatrists (MD Psychiatry NIMHANS)',
    clinicalPractitioner: 'Dr. Arun Nair, MD'
  },
  {
    id: '33333333-3333-3333-3333-333333333331',
    slug: 'dietetics-nutrition',
    group: 'The Rhythm',
    name: 'Gut-Brain Clinical Nutrition',
    tagline: 'Strengthening the microbiome-gut-brain axis to steady daily mood, mental clarity, and metabolic ease',
    duration: '45 min',
    fee: '₹1,500',
    feeNote: 'Includes personalized 2-week dietary framework adapted to authentic Indian eating',
    modes: 'Online Video or Bangalore Suites',
    color: '#8C5835',
    bg: '#FBF8F5',
    icon: Leaf,
    suitableFor: ['Energy, Gut & Sleep Rhythm', 'Stress & Daily Resilience'],
    indications: [
      'Digestive discomfort, bloating, or stomach tension that flares during high-stress weeks',
      'Afternoon brain fog, severe sugar cravings, or energy spikes followed by sudden crashes',
      'Hormonal fluctuations affecting emotional steadiness and restful recovery',
      'Desire to nourish your gut microbiome to naturally support serotonin and dopamine pathways'
    ],
    whatToExpect:
      'An integrative nutritional assessment that examines how your digestive tract influences neurotransmitter synthesis and mood. We identify inflammatory triggers, optimize prebiotic and probiotic intake, and craft practical meal rhythms adapted to your lifestyle that prevent afternoon mental slumps.',
    credentials: 'Delivered by Registered Clinical Dietitians (IDA certified, Manipal alumna)',
    clinicalPractitioner: 'Priya Sharma, RD'
  },
  {
    id: '33333333-3333-3333-3333-333333333332',
    slug: 'therapeutic-yoga',
    group: 'The Body',
    name: 'Somatic Breath & Tension Release',
    tagline: 'Private 1-on-1 somatic movement and polyvagal breathwork to discharge accumulated physical stress',
    duration: '60 min',
    fee: '₹1,400',
    feeNote: 'Private 1-on-1 somatic session adapted to your mobility and comfort level',
    modes: 'Online Video or Bangalore Suites',
    color: '#8C5835',
    bg: '#FBF8F5',
    icon: Sparkles,
    suitableFor: ['Body Tension & Nervous System', 'Stress & Daily Resilience'],
    indications: [
      'Physical tension headaches, jaw clenching, tight shoulders, or persistent muscular guarding',
      'Feeling physically wired or unable to turn off the body’s fight-or-flight alarm system at night',
      'Desire to complement psychotherapy with physiological nervous-system grounding',
      'Looking for tangible, physiological tools to calm racing adrenaline in real time'
    ],
    whatToExpect:
      'A safe, paced 1-on-1 session featuring restorative somatic movement, polyvagal vagus nerve stimulation, and restorative breathwork. You learn how to shift your body out of chronic fight-or-flight overdrive into parasympathetic safety and deep ease.',
    credentials: 'Delivered by Certified Somatic Experiencing Practitioners & Yoga Therapists (SVYASA M.Sc)',
    clinicalPractitioner: 'Rajesh Kumar, M.Sc.'
  },
  {
    id: '44444444-4444-4444-4444-444444444441',
    slug: 'mindfulness-stress-management',
    group: 'The Rhythm',
    name: 'Mindfulness & Mental Resilience',
    tagline: 'Practical cognitive grounding tools and heart-rate variability micro-practices for high-pressure lives',
    duration: '45 min',
    fee: '₹1,200',
    feeNote: 'Includes take-home audio exercises and daily resilience micro-toolkit',
    modes: 'Online Video or Bangalore Suites',
    color: '#8C5835',
    bg: '#FBF8F5',
    icon: Heart,
    suitableFor: ['Overthinking & Cognitive Load', 'Stress & Daily Resilience'],
    indications: [
      'Demanding leadership, engineering, or creative roles with constant context-switching',
      'Difficulty disconnecting from work communications and ruminating late into the evening',
      'Desire for grounded, secular, science-backed mindfulness without spiritual dogma',
      'Building proactive resilience before acute stress accumulates into burnout'
    ],
    whatToExpect:
      'Evidence-based training in Mindfulness-Based Stress Reduction (MBSR) and Heart Rate Variability (HRV) breathing. You leave with practical 2-to-3 minute micro-practices that can be utilized at your desk or before high-pressure situations to restore calm within moments.',
    credentials: 'Delivered by certified mindfulness facilitators and cognitive coaches',
    clinicalPractitioner: 'Rajesh Kumar & Ananya Roy'
  }
];

export default function ServicesPage() {
  const [filterTag, setFilterTag] = useState<string>('All');

  const filtered = filterTag === 'All'
    ? fullServices
    : fullServices.filter(s => s.suitableFor.includes(filterTag));

  return (
    <div className="services-page">
      {/* Hero Header */}
      <section className="services-hero-header">
        <div className="container">
          <div className="breadcrumb-nav">
            <Link href="/" className="bc-link">Sanctuary Home</Link>
            <span className="bc-sep">/</span>
            <span className="bc-current">Disciplines & Practices</span>
          </div>
          <span className="bm-sanctuary-badge" style={{ marginBottom: '14px' }}>
            INTEGRATED SANCTUARY CARE
          </span>
          <h1 className="services-main-title">Coordinated care for the whole person.</h1>
          <p className="services-hero-subtext">
            Rather than isolating symptoms into medical silos, our collective connects unhurried psychotherapy, somatic nervous system release, gut-brain medicine, and restorative rhythms into one calm continuum.
          </p>

          <div className="services-quick-stats">
            <div className="sqs-item">
              <CheckCircle2 size={15} className="sqs-icon" />
              <span>NIMHANS & SVYASA Alumni</span>
            </div>
            <div className="sqs-item">
              <CheckCircle2 size={15} className="sqs-icon" />
              <span>Bangalore Suites & Pan-India Video</span>
            </div>
            <div className="sqs-item">
              <CheckCircle2 size={15} className="sqs-icon" />
              <span>Zero Diagnostic Labels</span>
            </div>
            <div className="sqs-item">
              <CheckCircle2 size={15} className="sqs-icon" />
              <span>Strict No-Overlap Scheduling</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter by Experience */}
      <section className="services-filter-section">
        <div className="container">
          <div className="filter-card">
            <div className="filter-label">What would you like support with today?</div>
            <div className="filter-chips-row">
              {[
                'All',
                'Overthinking & Cognitive Load',
                'Body Tension & Nervous System',
                'Energy, Gut & Sleep Rhythm',
                'Stress & Daily Resilience'
              ].map(tag => (
                <button
                  key={tag}
                  type="button"
                  className={`filter-chip-btn ${filterTag === tag ? 'active' : ''}`}
                  onClick={() => setFilterTag(tag)}
                >
                  {tag === 'All' ? 'All Disciplines' : tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services List Showcase */}
      <section className="services-content-section">
        <div className="container services-cards-stack">
          {filtered.map(service => {
            const IconComp = service.icon;
            return (
              <article key={service.id} className="detailed-service-card" style={{ borderLeft: `4px solid ${service.color}` }}>
                <div className="dsc-grid">
                  {/* Left Column: Core Info */}
                  <div className="dsc-left-col">
                    <div className="dsc-group-row">
                      <span className="dsc-group-badge" style={{ background: service.bg, color: service.color }}>
                        <IconComp size={14} />
                        <span>{service.group}</span>
                      </span>
                      <span className="dsc-duration-pill">
                        <Clock size={12} /> {service.duration}
                      </span>
                      <span className="dsc-mode-pill">
                        <Video size={12} /> {service.modes}
                      </span>
                    </div>

                    <h2 className="dsc-title">{service.name}</h2>
                    <div className="dsc-tagline">{service.tagline}</div>

                    <div className="dsc-section-block">
                      <h4 className="dsc-subheading">What happens during the session</h4>
                      <p className="dsc-narrative">{service.whatToExpect}</p>
                    </div>

                    <div className="dsc-section-block">
                      <h4 className="dsc-subheading">When to consider this discipline</h4>
                      <ul className="dsc-indications-list">
                        {service.indications.map((ind, i) => (
                          <li key={i}>
                            <CheckCircle2 size={14} className="dsc-check" style={{ color: service.color }} />
                            <span>{ind}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="dsc-practitioner-footer">
                      <Users size={14} />
                      <span>{service.credentials} · <strong>{service.clinicalPractitioner}</strong></span>
                    </div>
                  </div>

                  {/* Right Column: Pricing & Booking Action */}
                  <div className="dsc-right-col">
                    <div className="dsc-pricing-box">
                      <div className="dsc-price-label">Session Fee</div>
                      <div className="dsc-price-amount">{service.fee}</div>
                      <div className="dsc-price-note">{service.feeNote}</div>

                      <div className="dsc-guarantee-list">
                        <div className="dg-item">
                          <CheckCircle2 size={13} />
                          <span>Free cancellation up to 4 hrs</span>
                        </div>
                        <div className="dg-item">
                          <CheckCircle2 size={13} />
                          <span>100% confidential under DPDP Act</span>
                        </div>
                        <div className="dg-item">
                          <CheckCircle2 size={13} />
                          <span>No overlapping slots in your plan</span>
                        </div>
                      </div>

                      <Link href={`/book?service=${service.slug}`} className="btn-primary btn-full dsc-book-btn">
                        <span>Reserve this Discipline</span>
                        <ArrowRight size={14} />
                      </Link>

                      <div className="dsc-intake-hint">
                        Prefer an introductory chat? Book the <strong>Free 15m Orientation</strong> first.
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Multi-Service Synergy Guide */}
      <section className="section synergy-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Natural Synergy</span>
            <h2>How multiple disciplines support one another.</h2>
            <p className="section-lead">
              Our clinic allows combining multiple practices into one coordinated visit without scheduling clashes. Here are three harmonious pairings frequently recommended by our collective:
            </p>
          </div>

          <div className="synergy-cards-grid">
            <div className="synergy-card">
              <div className="synergy-tag">Mind + Body Reset</div>
              <h3 className="synergy-title">Psychotherapy + Somatic Breathwork</h3>
              <p className="synergy-desc">
                For persistent racing thoughts and tight shoulders. Talk therapy helps unpack cognitive stress, while gentle somatic movement regulates the autonomic nervous system to release physical guarding.
              </p>
              <div className="synergy-pairing">
                <span>50m Psychotherapy</span> + <span>60m Somatic Breath</span>
              </div>
            </div>

            <div className="synergy-card">
              <div className="synergy-tag">Rhythm + Neurobiology</div>
              <h3 className="synergy-title">Consultative Psychiatry + Gut Nutrition</h3>
              <p className="synergy-desc">
                For persistent brain fog, sluggish mornings, and low mood. Considerate medical guidance steadies neurochemistry, while gut-microbiome nutrition optimizes natural serotonin pathways.
              </p>
              <div className="synergy-pairing">
                <span>45m Psychiatry</span> + <span>45m Gut Nutrition</span>
              </div>
            </div>

            <div className="synergy-card">
              <div className="synergy-tag">The Gentle Starting Path</div>
              <h3 className="synergy-title">Orientation + Psychotherapy</h3>
              <p className="synergy-desc">
                The most reassuring starting path for anyone new to Better Mind. Begin with a 15-minute orientation to map your intentions, followed by unhurried talk therapy with your assigned psychologist.
              </p>
              <div className="synergy-pairing">
                <span>15m Orientation</span> + <span>50m Psychotherapy</span>
              </div>
            </div>
          </div>

          <div className="synergy-action-center">
            <Link href="/book" className="btn-primary btn-lg">
              <span>Build Your Custom Session Schedule</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Pre-Footer Help */}
      <section className="services-footer-banner">
        <div className="container sfb-inner">
          <div>
            <h3>Need quiet guidance selecting the right discipline?</h3>
            <p>Our care coordinator Ananya is available to answer your questions by phone or email in complete confidence.</p>
          </div>
          <div className="sfb-actions">
            <a href="tel:+918047182200" className="btn-outline">
              <span>Call 080 4718 2200</span>
            </a>
            <Link href="/book?service=initial-assessment" className="btn-primary">
              <span>Book Free 15m Orientation</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
