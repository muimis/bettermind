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

// Problem-Solution Consultations
// Directly addresses the exact person, their acute pain point, and the specific consultation we do for them.
const CONSULTATIONS = [
  {
    id: 'talk-therapy',
    pill: 'For Racing Thoughts & Emotional Overwhelm',
    problem: 'Your thoughts won’t stop spiraling. Anxiety, depression, or old trauma is exhausting your everyday peace.',
    weDoTitle: 'We do 1-on-1 Clinical Psychology & Psychotherapy for you.',
    whatHappens: 'Dr. Meera Sen (NIMHANS) creates a safe, confidential space using CBT, ACT, and EMDR to break repetitive negative loops, process relational wounds, and rebuild durable emotional grounding.',
    clinician: 'Dr. Meera Sen, Ph.D.',
    clinicianRole: 'Senior Clinical Psychologist (NIMHANS)',
    initial: 'MS',
    duration: '50 min',
    fee: '₹1,800',
    mode: 'Online Video or Indiranagar Clinic',
    color: '#3949AB',
    bg: '#EEF2FB',
    icon: Brain,
    availableNext: 'Tomorrow'
  },
  {
    id: 'psychiatry',
    pill: 'For Severe Mood Swings, Brain Fog & ADHD',
    problem: 'You can’t focus, your moods swing sharply, or you suspect your brain biology needs an objective medical evaluation.',
    weDoTitle: 'We do Neuropsychiatry & Medical Diagnostic Evaluation for you.',
    whatHappens: 'Dr. Arun Nair (MD, NIMHANS) conducts a thorough diagnostic workup of your neurochemistry, adult ADHD markers, and sleep architecture — offering medical clarity and monitored, conservative prescriptions if appropriate.',
    clinician: 'Dr. Arun Nair, MD',
    clinicianRole: 'Senior Consultant Psychiatrist (NIMHANS)',
    initial: 'AN',
    duration: '45 min',
    fee: '₹2,200',
    mode: 'Online Video or Indiranagar Clinic',
    color: '#124E47',
    bg: '#EDF6F4',
    icon: Award,
    availableNext: 'Today'
  },
  {
    id: 'nutrition',
    pill: 'For Stress-Induced Gut Distress & Low Energy',
    problem: 'Chronic stress has disrupted your digestive tract (IBS), sleep quality, or triggered cycles of emotional burnout eating.',
    weDoTitle: 'We do Gut-Brain Nutritional Psychiatry for you.',
    whatHappens: 'Over 90% of serotonin is manufactured in the gut. Priya Sharma (RD, Manipal) analyzes your microbiome axis and builds a practical, anti-inflammatory food protocol designed around authentic Indian diets to stabilize neurotransmitters.',
    clinician: 'Priya Sharma, RD',
    clinicianRole: 'Lead Clinical Dietitian (Manipal)',
    initial: 'PS',
    duration: '45 min',
    fee: '₹1,500',
    mode: 'Online Video or Indiranagar Clinic',
    color: '#2E694F',
    bg: '#EEF7F2',
    icon: Leaf,
    availableNext: 'Friday'
  },
  {
    id: 'somatic',
    pill: 'For Physical Panic, Clenched Tension & Shallow Breathing',
    problem: 'Your body is locked in fight-or-flight. You feel tight in your chest, carry a clenched jaw, or have panic attacks where talk therapy alone isn’t enough.',
    weDoTitle: 'We do Somatic Vagus Reset & Nervous System Recalibration for you.',
    whatHappens: 'Rajesh Kumar (SVYASA) guides you 1-on-1 through polyvagal somatic movement and autonomic breathwork to release trauma held in physical muscle tissue and gently signal safety to your nervous system.',
    clinician: 'Rajesh Kumar, M.Sc.',
    clinicianRole: 'Certified Somatic Therapist (SVYASA)',
    initial: 'RK',
    duration: '60 min',
    fee: '₹1,400',
    mode: 'Online Video or Indiranagar Clinic',
    color: '#B45330',
    bg: '#FBF1EC',
    icon: Sparkles,
    availableNext: 'Today'
  }
];

// Essential Patient FAQs
const FAQS = [
  {
    q: 'How do I know which consultation is right for my current situation?',
    a: 'If you’re unsure, start with our complimentary Initial Care Intake (₹0 · 45 min). Ananya Roy, MSW (TISS), listens to what you’re experiencing and routes you to the exact psychologist, psychiatrist, or dietitian suited for your situation.'
  },
  {
    q: 'Can I combine multiple consultations on the same day?',
    a: 'Yes. Our booking system was built specifically so you can schedule therapy and nutrition on the same day without your times clashing. The database guarantees zero schedule overlap.'
  },
  {
    q: 'Can I do my sessions from home or at the Indiranagar clinic?',
    a: 'Both options are open to you. All consultations are available via encrypted HD video calls from home, or at our quiet, acoustic-soundproofed clinic on 14th Main Rd, Indiranagar, Bengaluru.'
  },
  {
    q: 'What if I need to cancel or reschedule my appointment?',
    a: 'You can reschedule or cancel with zero penalty up to 4 hours before your session directly through your secure confirmation link.'
  }
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bm-ps-site">
      {/* 1. HERO: DIRECT PROBLEM-SOLUTION HOOK */}
      <section className="ps-hero">
        <div className="container ps-hero-container">
          <div className="ps-hero-badge">
            <span className="ps-dot-pulse"></span>
            <span>Online & Indiranagar Sanctuary, Bengaluru</span>
          </div>

          <h1 className="ps-hero-title">
            You’re carrying too much.<br />
            <em>Let’s find the exact consultation for you.</em>
          </h1>

          <p className="ps-hero-lead">
            When your mind is overwhelmed, generic advice doesn’t help. We connect your exact struggle with the specialist trained to resolve it — psychiatry, therapy, nutrition, or somatic care.
          </p>

          <div className="ps-hero-actions">
            <a href="#consultations" className="btn-ps-primary">
              <Calendar size={17} />
              <span>Explore Consultations for You</span>
            </a>
            <Link href="/book" className="btn-ps-ghost">
              <Compass size={17} />
              <span>Unsure? Free 15-Min Intake (₹0)</span>
            </Link>
          </div>

          <div className="ps-hero-trust-bar">
            <span>🛡️ 100% Confidential</span>
            <span>·</span>
            <span>🌿 No Referral Required</span>
            <span>·</span>
            <span>⏱️ Zero-Clash Scheduling</span>
          </div>
        </div>
      </section>

      {/* 2. CORE PROBLEM-SOLUTION CONSULTATION MATRIX */}
      <section className="ps-consultations-section" id="consultations">
        <div className="container">
          <div className="ps-section-header">
            <span className="ps-eyebrow">Focused Consultations</span>
            <h2>We don’t do generic consultations. We do the exact care you need.</h2>
            <p>Select what you are struggling with right now. See the exact specialist and approach built for you.</p>
          </div>

          <div className="ps-cards-stack">
            {CONSULTATIONS.map(item => {
              const IconComp = item.icon;
              return (
                <div key={item.id} className="ps-consult-card" style={{ borderLeft: `4px solid ${item.color}` }}>
                  <div className="pcc-left">
                    <span className="pcc-pill" style={{ color: item.color, background: item.bg }}>
                      <IconComp size={14} />
                      <span>{item.pill}</span>
                    </span>

                    <div className="pcc-problem-box">
                      <span className="pcc-problem-label">If your struggle is:</span>
                      <p className="pcc-problem-text">"{item.problem}"</p>
                    </div>

                    <h3 className="pcc-we-do-title">{item.weDoTitle}</h3>
                    <p className="pcc-what-happens">{item.whatHappens}</p>

                    <div className="pcc-doctor-line">
                      <div className="pcc-avatar" style={{ background: item.color }}>
                        {item.initial}
                      </div>
                      <div>
                        <strong>{item.clinician}</strong>
                        <span>{item.clinicianRole}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pcc-right">
                    <div className="pcc-pricing-box">
                      <span className="pcc-fee">{item.fee}</span>
                      <span className="pcc-dur">Per {item.duration} session</span>
                      <span className="pcc-mode">{item.mode}</span>
                      <span className="pcc-avail-tag">Next Available: {item.availableNext}</span>
                    </div>

                    <Link href="/book" className="btn-pcc-book" style={{ background: item.color }}>
                      <span>Book This Consultation</span>
                      <ArrowRight size={15} />
                    </Link>

                    <span className="pcc-cancel-note">Free cancellation up to 4 hrs</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Complimentary Triage Intake for Undefined Struggles */}
          <div className="ps-triage-callout">
            <div className="ptc-content">
              <span className="ptc-icon"><Compass size={24} /></span>
              <div>
                <span className="ptc-eyebrow">Not Sure What You Need?</span>
                <h3>We do a Complimentary 15-Minute Intake Consultation for you.</h3>
                <p>
                  If everything feels heavy at once and you can’t tell whether you need therapy, a psychiatrist, or a dietitian — spend 45 minutes with our Clinical Care Coordinator, Ananya Roy, MSW (TISS). She will listen to your symptoms and map your care plan without any pressure.
                </p>
              </div>
            </div>
            <Link href="/book" className="btn-ps-primary ptc-btn">
              <span>Start Free Intake (₹0)</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM WITH FRAGMENTED CARE — AND OUR SOLUTION */}
      <section className="ps-contrast-section">
        <div className="container">
          <div className="ps-contrast-grid">
            <div className="ps-problem-col">
              <span className="ps-col-label bad">The Problem with Traditional Healthcare</span>
              <h3>You repeat your trauma. Doctors never talk.</h3>
              <p>
                You visit a psychiatrist in a crowded hospital, a therapist in an app, and your gut or physical panic is dismissed as unrelated. You spend hours coordinating your own care, repeating painful stories over and over.
              </p>
            </div>

            <div className="ps-solution-col">
              <span className="ps-col-label good">The Better Mind Solution</span>
              <h3>One unified practice. All specialists in sync.</h3>
              <p>
                Your psychologist, psychiatrist, dietitian, and somatic therapist operate as one team. They review your care collaboratively, share medical notes securely, and ensure you never have to repeat your story.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE INDIRANAGAR CLINIC SANCTUARY */}
      <section className="ps-sanctuary-section" id="sanctuary">
        <div className="container ps-sanctuary-container">
          <div className="ps-sanctuary-visual">
            <img
              src="/images/sanctuary.jpg"
              alt="Better Mind Clinic Sanctuary Interior in Indiranagar Bengaluru"
              className="ps-sanctuary-img"
            />
            <div className="ps-sanctuary-tag">Indiranagar Clinic · Bengaluru</div>
          </div>

          <div className="ps-sanctuary-text">
            <span className="ps-eyebrow">Physical Clinic</span>
            <h2>A quiet sanctuary designed for emotional safety.</h2>
            <p>
              Located in Indiranagar, Bengaluru, our practice is architecturally soundproofed with acoustic seals, natural diffused sunlight, and zero hospital waiting-room noise.
            </p>

            <div className="ps-sanctuary-points">
              <div className="psp-item">
                <MapPin size={17} className="psp-icon" />
                <span>14th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru</span>
              </div>
              <div className="psp-item">
                <Clock size={17} className="psp-icon" />
                <span>Monday to Saturday: 8:30 AM – 8:30 PM IST</span>
              </div>
              <div className="psp-item">
                <CheckCircle2 size={17} className="psp-icon" />
                <span>GST medical invoices provided for corporate wellness and OPD insurance</span>
              </div>
            </div>

            <div className="ps-sanctuary-btns">
              <Link href="/book" className="btn-ps-primary">
                <span>Book In-Person Consultation</span>
                <ArrowRight size={15} />
              </Link>
              <a
                href="https://maps.google.com/?q=Indiranagar+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ps-secondary"
              >
                <span>View on Maps</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ESSENTIAL PATIENT FAQS */}
      <section className="ps-faq-section" id="faqs">
        <div className="container ps-faq-container">
          <div className="ps-section-header">
            <span className="ps-eyebrow">Clear Answers</span>
            <h2>Questions you might have before booking</h2>
          </div>

          <div className="ps-faq-stack">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`ps-faq-item ${isOpen ? 'active' : ''}`}>
                  <button
                    type="button"
                    className="pfaq-trigger"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="pfaq-icon">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pfaq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FOCUSED FINAL CTA */}
      <section className="ps-final-cta">
        <div className="container ps-cta-container">
          <h2>Ready to be heard?</h2>
          <p>Book your first consultation today. No referrals needed, zero clash guaranteed.</p>
          <div className="ps-cta-buttons">
            <Link href="/book" className="btn-ps-primary btn-lg">
              <Calendar size={18} />
              <span>Book Your Consultation</span>
            </Link>
            <a href="tel:+918047182200" className="btn-ps-secondary btn-lg">
              <span>Call Clinic: 080 4718 2200</span>
            </a>
          </div>
        </div>
      </section>

      {/* 7. DISCREET 24/7 HELPLINE STRIP */}
      <footer className="ps-crisis-footer">
        <div className="container ps-crisis-inner">
          <div className="pcf-left">
            <Shield size={14} />
            <span>Outpatient clinic. In acute emotional crisis or danger, call toll-free 24/7:</span>
          </div>
          <div className="pcf-right">
            <span><strong>Tele-MANAS: 14416</strong></span>
            <span>·</span>
            <span><strong>KIRAN: 1800-599-0019</strong> (Govt. of India)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
