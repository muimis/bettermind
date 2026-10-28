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
  HelpCircle,
  FileCheck,
  Zap,
  Users
} from '@/components/icons';

type ServiceDetail = {
  id: string;
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
    group: 'Start here',
    name: 'Initial Care Assessment & Triage',
    tagline: 'Objective, compassionate intake to map your personalized care plan',
    duration: '45 min',
    fee: '₹0 · Complimentary',
    feeNote: 'Free first intake triage for all new patients',
    modes: 'Online Video or Partner Clinic Hub',
    color: '#124E47',
    bg: '#EDF6F4',
    icon: Compass,
    suitableFor: ['Anxiety & Panic', 'Depression & Burnout', 'Adult ADHD & Focus', 'Gut-Brain & Chronic Stress'],
    indications: [
      'Unsure whether you need a Psychiatrist, Psychologist, or Holistic Wellness specialist',
      'Feeling overwhelmed by multiple competing physical and emotional symptoms',
      'Seeking a coordinated second opinion on your mental health journey',
      'Never attended therapy before and looking for a safe, low-pressure introduction'
    ],
    whatToExpect:
      'You meet with our Lead Clinical Care Coordinator. We listen without rush to your medical history, sleep, mood fluctuations, and daily triggers. Together, we co-create a structured, multi-disciplinary recommendation matching you with the ideal specialists.',
    credentials: 'Led by licensed clinical psychiatric social workers (TISS alumni)',
    clinicalPractitioner: 'Ananya Roy, MSW'
  },
  {
    id: '22222222-2222-2222-2222-222222222221',
    group: 'Mind',
    name: 'Clinical Psychology & Psychotherapy',
    tagline: 'Evidence-based cognitive, trauma-informed, and relational talk therapy',
    duration: '50 min',
    fee: '₹1,800',
    feeNote: 'Medical invoice with RCI number provided for insurance reimbursement',
    modes: 'Online Video or Partner Clinic Hub',
    color: '#3949AB',
    bg: '#EEF2FB',
    icon: Brain,
    suitableFor: ['Anxiety & Panic', 'Depression & Burnout', 'Complex Trauma (PTSD)'],
    indications: [
      'Generalized anxiety, panic attacks, social phobias, or intrusive catastrophic thoughts',
      'Persistent low mood, lack of vitality, chronic grief, or existential emptiness',
      'Past developmental, relational, or acute trauma requiring EMDR or TF-CBT',
      'Workplace burnout, perfectionism, boundary setting, and relationship distress'
    ],
    whatToExpect:
      'A deeply collaborative dialogue using CBT, Acceptance and Commitment Therapy (ACT), and somatic trauma integration. You identify root emotional patterns, develop adaptive coping tools, and dismantle chronic cycles of self-criticism in a confidential setting.',
    credentials: 'Delivered by RCI-licensed Clinical Psychologists (M.Phil / Ph.D. NIMHANS/CIP)',
    clinicalPractitioner: 'Dr. Meera Sen, Ph.D.'
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    group: 'Mind',
    name: 'Psychiatry Consultation & Medical Diagnosis',
    tagline: 'Medical psychiatric evaluation, neurochemical assessment, and pharmacotherapy',
    duration: '45 min',
    fee: '₹2,200',
    feeNote: 'Compliant with Telemedicine Practice Guidelines (2020)',
    modes: 'Online Video or Partner Clinic Hub',
    color: '#3949AB',
    bg: '#EEF2FB',
    icon: Award,
    suitableFor: ['Anxiety & Panic', 'Depression & Burnout', 'Adult ADHD & Focus'],
    indications: [
      'Moderate to severe depression or anxiety that has not resolved through therapy alone',
      'Diagnostic evaluation for Adult ADHD, bipolar spectrum, or mood instability',
      'Severe insomnia, sleep fragmentation, or circadian rhythm disruption',
      'Comprehensive medication review, second opinions, or safe deprescribing protocols'
    ],
    whatToExpect:
      'A comprehensive medical examination covering neurobiology, family medical history, lab investigations (thyroid, vitamin deficiencies), and diagnostic criteria. Prescriptions are conservative, evidence-based, and always coordinated with psychological therapy.',
    credentials: 'Delivered by NMC-registered Senior Consultant Psychiatrists (MD Psychiatry NIMHANS)',
    clinicalPractitioner: 'Dr. Arun Nair, MD'
  },
  {
    id: '33333333-3333-3333-3333-333333333331',
    group: 'Body',
    name: 'Clinical Dietetics & Gut-Brain Nutrition',
    tagline: 'Targeting the microbiome-gut-brain axis for emotional and metabolic stability',
    duration: '45 min',
    fee: '₹1,500',
    feeNote: 'Includes personalized 2-week tailored dietary plan & recipe guide',
    modes: 'Online Video or Partner Clinic Hub',
    color: '#2E694F',
    bg: '#EEF7F2',
    icon: Leaf,
    suitableFor: ['Depression & Burnout', 'Gut-Brain & Chronic Stress'],
    indications: [
      'Irritable Bowel Syndrome (IBS), bloating, or digestive flare-ups triggered by stress',
      'Brain fog, chronic afternoon fatigue, sugar cravings, and blood glucose crashes',
      'Hormonal mood changes, PCOS-related anxiety, and metabolic distress',
      'Seeking to support neurotransmitter synthesis through anti-inflammatory eating'
    ],
    whatToExpect:
      'A thorough nutritional and lifestyle assessment that respects authentic Indian dietary habits. We pinpoint nutritional deficiencies, optimize prebiotic and probiotic microbiome intake, and stabilize metabolic spikes that trigger panic or depressive lethargy.',
    credentials: 'Delivered by Registered Clinical Dietitians (IDA certified, Manipal alumni)',
    clinicalPractitioner: 'Priya Sharma, RD'
  },
  {
    id: '33333333-3333-3333-3333-333333333332',
    group: 'Body',
    name: 'Therapeutic Yoga & Somatic Movement',
    tagline: '1-on-1 private somatic nervous system recalibration and physical grounding',
    duration: '60 min',
    fee: '₹1,400',
    feeNote: 'Private 1-on-1 clinical session adapted to all fitness levels',
    modes: 'Online Video or Partner Clinic Hub',
    color: '#2E694F',
    bg: '#EEF7F2',
    icon: Sparkles,
    suitableFor: ['Anxiety & Panic', 'Complex Trauma (PTSD)', 'Gut-Brain & Chronic Stress'],
    indications: [
      'Physical tension headaches, jaw clenching, tight chest, or persistent somatic guarding',
      'Autonomic nervous system hyperarousal (feeling constantly on edge or in fight-or-flight)',
      'Trauma-induced somatic numbness, dissociation, or difficulty feeling present in the body',
      'Desire to deepen psychological therapy through body-based polyvagal grounding'
    ],
    whatToExpect:
      'A safe, paced 1-on-1 session featuring restorative somatic movement, polyvagal vagus nerve stimulation, and restorative breathwork. You learn how to shift your body out of sympathetic overdrive into parasympathetic safety and rest.',
    credentials: 'Delivered by Certified Somatic Experiencing Practitioners & Yoga Therapists (SVYASA M.Sc)',
    clinicalPractitioner: 'Rajesh Kumar, SEP'
  },
  {
    id: '44444444-4444-4444-4444-444444444441',
    group: 'Wellness',
    name: 'Mindfulness & Stress Resilience',
    tagline: 'Practical heart-rate variability pacing and cognitive resilience skills',
    duration: '45 min',
    fee: '₹1,200',
    feeNote: 'Includes take-home audio exercises and daily resilience toolkit',
    modes: 'Online Video or Partner Clinic Hub',
    color: '#A36100',
    bg: '#FEF7ED',
    icon: Heart,
    suitableFor: ['Anxiety & Panic', 'Depression & Burnout', 'Gut-Brain & Chronic Stress'],
    indications: [
      'High-stress corporate or startup careers with relentless cognitive demands',
      'Difficulty unwinding at night, racing thoughts, or anticipatory dread',
      'Desire for structured, science-backed mindfulness without spiritual dogma',
      'Preventing mild stress from snowballing into clinical depression or anxiety'
    ],
    whatToExpect:
      'Interactive skill-building in Mindfulness-Based Stress Reduction (MBSR) and Heart Rate Variability (HRV) breathing. You leave with practical micro-practices that can be used at your desk or before high-pressure situations to restore calm within minutes.',
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
            <Link href="/" className="bc-link">Home</Link>
            <span className="bc-sep">/</span>
            <span className="bc-current">Services Catalogue</span>
          </div>
          <h1 className="services-main-title">Comprehensive Clinical Services</h1>
          <p className="services-hero-subtext">
            Every service at Better Mind operates as part of an integrated whole. Book a single specialist or combine psychology, psychiatry, nutrition, and yoga into one coordinated, zero-clash care plan.
          </p>

          <div className="services-quick-stats">
            <div className="sqs-item">
              <CheckCircle2 size={16} className="sqs-icon" />
              <span>NMC & RCI Licensed Clinicians</span>
            </div>
            <div className="sqs-item">
              <CheckCircle2 size={16} className="sqs-icon" />
              <span>Online IST & Partner Clinic Hubs</span>
            </div>
            <div className="sqs-item">
              <CheckCircle2 size={16} className="sqs-icon" />
              <span>Insurance Reimbursement Invoices</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter by Primary Challenge */}
      <section className="services-filter-section">
        <div className="container">
          <div className="filter-card">
            <div className="filter-label">Filter by what you are navigating:</div>
            <div className="filter-chips-row">
              {['All', 'Anxiety & Panic', 'Depression & Burnout', 'Complex Trauma (PTSD)', 'Adult ADHD & Focus', 'Gut-Brain & Chronic Stress'].map(tag => (
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
              <article key={service.id} className="detailed-service-card" style={{ borderLeft: `5px solid ${service.color}` }}>
                <div className="dsc-grid">
                  {/* Left Column: Core Info */}
                  <div className="dsc-left-col">
                    <div className="dsc-group-row">
                      <span className="dsc-group-badge" style={{ background: service.bg, color: service.color }}>
                        <IconComp size={15} />
                        <span>{service.group}</span>
                      </span>
                      <span className="dsc-duration-pill">
                        <Clock size={13} /> {service.duration}
                      </span>
                      <span className="dsc-mode-pill">
                        <Video size={13} /> {service.modes}
                      </span>
                    </div>

                    <h2 className="dsc-title">{service.name}</h2>
                    <div className="dsc-tagline">{service.tagline}</div>

                    <div className="dsc-section-block">
                      <h4 className="dsc-subheading">What happens during the session</h4>
                      <p className="dsc-narrative">{service.whatToExpect}</p>
                    </div>

                    <div className="dsc-section-block">
                      <h4 className="dsc-subheading">When to consider this care discipline</h4>
                      <ul className="dsc-indications-list">
                        {service.indications.map((ind, i) => (
                          <li key={i}>
                            <CheckCircle2 size={15} className="dsc-check" style={{ color: service.color }} />
                            <span>{ind}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="dsc-practitioner-footer">
                      <Users size={15} />
                      <span>{service.credentials} · <strong>{service.clinicalPractitioner}</strong></span>
                    </div>
                  </div>

                  {/* Right Column: Pricing & Booking Action */}
                  <div className="dsc-right-col">
                    <div className="dsc-pricing-box">
                      <div className="dsc-price-label">Consultation Fee</div>
                      <div className="dsc-price-amount">{service.fee}</div>
                      <div className="dsc-price-note">{service.feeNote}</div>

                      <div className="dsc-guarantee-list">
                        <div className="dg-item">
                          <CheckCircle2 size={13} />
                          <span>Zero cancellation fee up to 4 hrs</span>
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

                      <Link href="/book" className="btn-primary btn-full dsc-book-btn">
                        <span>Book this Discipline</span>
                        <ArrowRight size={15} />
                      </Link>

                      <div className="dsc-intake-hint">
                        Not sure? Book the <strong>Free Initial Assessment</strong> first.
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
            <span className="section-eyebrow">How Multiple Services Connect</span>
            <h2>Recommended multi-disciplinary combinations</h2>
            <p className="section-lead">
              Our clinic allows booking multiple services in one visit. Here are three clinically proven care pairings our doctors frequently recommend:
            </p>
          </div>

          <div className="synergy-cards-grid">
            <div className="synergy-card">
              <div className="synergy-tag">Mind + Body Reset</div>
              <h3 className="synergy-title">Psychotherapy + Somatic Yoga</h3>
              <p className="synergy-desc">
                For persistent panic attacks, complex trauma, or chronic stress. Talk therapy processes the narrative memory, while somatic movement grounds the autonomic nervous system to prevent fight-or-flight triggers.
              </p>
              <div className="synergy-pairing">
                <span>50m Clinical Psychology</span> + <span>60m Somatic Yoga</span>
              </div>
            </div>

            <div className="synergy-card">
              <div className="synergy-tag">Biology + Neurochemistry</div>
              <h3 className="synergy-title">Psychiatry + Gut-Brain Nutrition</h3>
              <p className="synergy-desc">
                For treatment-resistant depression, brain fog, and chronic fatigue. Medical psychiatric evaluation balances neurotransmitters, while anti-inflammatory gut nutrition optimizes the microbiome synthesis of serotonin.
              </p>
              <div className="synergy-pairing">
                <span>45m Psychiatry</span> + <span>45m Gut Nutrition</span>
              </div>
            </div>

            <div className="synergy-card">
              <div className="synergy-tag">The Complete Roadmap</div>
              <h3 className="synergy-title">Care Assessment + Psychology</h3>
              <p className="synergy-desc">
                The ideal starting path for first-time patients. Start with an objective triage consultation to clarify diagnoses and goals, followed immediately by focused talk therapy with your assigned clinical psychologist.
              </p>
              <div className="synergy-pairing">
                <span>45m Free Intake</span> + <span>50m Clinical Psychology</span>
              </div>
            </div>
          </div>

          <div className="synergy-action-center">
            <Link href="/book" className="btn-primary btn-lg">
              <span>Build Your Custom Multi-Service Booking</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Pre-Footer Help */}
      <section className="services-footer-banner">
        <div className="container sfb-inner">
          <div>
            <h3>Need guidance selecting the right service?</h3>
            <p>Our care coordinator Ananya is available to answer any questions by phone or email.</p>
          </div>
          <div className="sfb-actions">
            <a href="tel:+918047182200" className="btn-outline">
              <span>Call 080 4718 2200</span>
            </a>
            <Link href="/book" className="btn-primary">
              <span>Start Free Triage</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
