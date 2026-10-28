'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Brain,
  Leaf,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  Shield,
  Heart,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  Video,
  Building2,
  Users,
  Award,
  Lock,
  Smile,
  HelpCircle,
  FileText
} from '@/components/icons';

// What brings you to Better Mind? (Interactive, empathetic self-triage)
const concerns = [
  {
    id: 'anxiety',
    icon: '🍃',
    title: 'Anxiety & Panic',
    shortDesc: 'Racing thoughts, social worry, tightness in chest, or panic spikes.',
    recommendation: 'Clinical Psychology & CBT Psychotherapy',
    practitioner: 'Dr. Meera Sen',
    duration: '50 min',
    fee: '₹1,800',
    link: '/book'
  },
  {
    id: 'depression',
    icon: '🌧️',
    title: 'Low Mood & Exhaustion',
    shortDesc: 'Feeling emotionally drained, disconnected, hopeless, or losing interest in life.',
    recommendation: 'Therapy & Mind-Body Stabilization',
    practitioner: 'Dr. Meera Sen & Dr. Arun Nair',
    duration: '50 min',
    fee: '₹1,800',
    link: '/book'
  },
  {
    id: 'burnout',
    icon: '💼',
    title: 'Work Stress & Burnout',
    shortDesc: 'Brain fog, deadline exhaustion, somatic fatigue, and chronic irritability.',
    recommendation: 'Somatic Reset & Resilience Therapy',
    practitioner: 'Rajesh Kumar & Dr. Meera Sen',
    duration: '60 min',
    fee: '₹1,400',
    link: '/book'
  },
  {
    id: 'adhd',
    icon: '⚡',
    title: 'ADHD & Focus Difficulties',
    shortDesc: 'Struggling with attention, procrastination, task paralysis, or restlessness.',
    recommendation: 'Psychiatry & Neurodevelopmental Evaluation',
    practitioner: 'Dr. Arun Nair (MD, NIMHANS)',
    duration: '45 min',
    fee: '₹2,200',
    link: '/book'
  },
  {
    id: 'gut',
    icon: '🥗',
    title: 'Gut, Sleep & Tension',
    shortDesc: 'Insomnia, stress-induced gut flares (IBS), muscular guarding, and low energy.',
    recommendation: 'Gut-Brain Nutrition & Somatic Breathwork',
    practitioner: 'Priya Sharma & Rajesh Kumar',
    duration: '45 min',
    fee: '₹1,500',
    link: '/book'
  },
  {
    id: 'unsure',
    icon: '🧭',
    title: 'Unsure Where to Start',
    shortDesc: 'Feeling overwhelmed and wanting a trained human to listen and guide your steps.',
    recommendation: 'Complimentary Initial Care Assessment',
    practitioner: 'Ananya Roy (Care Coordinator)',
    duration: '45 min',
    fee: '₹0 · Free',
    link: '/book'
  }
];

// The 4 Core Disciplines
const coreServices = [
  {
    tag: 'Mind & Emotions',
    name: 'Clinical Psychology & Psychotherapy',
    tagline: 'Compassionate, evidence-based talk therapy',
    desc: 'A safe, non-judgmental space to unpack trauma, break anxiety loops, heal relational wounds, and build grounded emotional coping mechanisms with licensed clinical psychologists.',
    approaches: ['CBT & ACT', 'Trauma-informed & EMDR', 'Non-judgmental safe space'],
    duration: '50 min',
    fee: '₹1,800',
    badge: 'RCI-Licensed',
    color: '#3949AB',
    bg: '#EEF2FB',
    icon: Brain
  },
  {
    tag: 'Medical & Neurobiology',
    name: 'Psychiatry & Medical Evaluation',
    tagline: 'Comprehensive assessment & thoughtful medical care',
    desc: 'Medical diagnosis, mood spectrum management, adult ADHD evaluations, and careful prescription guidance by senior psychiatrists. Medication is conservative, monitored, and partnered with therapy.',
    approaches: ['Diagnostic evaluation', 'Conservative prescriptions', 'Sleep & mood chemistry'],
    duration: '45 min',
    fee: '₹2,200',
    badge: 'NMC Registered MD',
    color: '#124E47',
    bg: '#EDF6F4',
    icon: Award
  },
  {
    tag: 'Gut-Brain Axis',
    name: 'Gut-Brain & Clinical Nutrition',
    tagline: 'Food as medicine for mood and cognitive stability',
    desc: 'Over 90% of serotonin is produced in the digestive tract. Our registered clinical dietitians create anti-inflammatory, neuro-supportive nutrition plans tailored to authentic Indian foods.',
    approaches: ['Microbiome health', 'Blood sugar & mood balance', 'Indian cultural food plans'],
    duration: '45 min',
    fee: '₹1,500',
    badge: 'Registered Dietitian',
    color: '#2E694F',
    bg: '#EEF7F2',
    icon: Leaf
  },
  {
    tag: 'Nervous System',
    name: 'Somatic Movement & Yoga Therapy',
    tagline: 'Physical nervous system recalibration',
    desc: '1-on-1 somatic releases and polyvagal breathing for trauma-induced physical tension, panic attacks, and autonomic hyperarousal. Release what the conscious mind has stored in the body.',
    approaches: ['Vagus nerve reset', 'Panic & tension release', 'Gentle somatic movement'],
    duration: '60 min',
    fee: '₹1,400',
    badge: 'Certified Somatic',
    color: '#B45330',
    bg: '#FBF1EC',
    icon: Sparkles
  }
];

// Specialist Clinicians (Human, approachable, verified)
const specialists = [
  {
    name: 'Dr. Arun Nair',
    role: 'Senior Consultant Psychiatrist',
    quals: 'MD Psychiatry (NIMHANS) · MBBS',
    langs: 'English · Hindi · Malayalam',
    initial: 'AN',
    color: '#124E47',
    bg: '#EDF6F4',
    focus: 'Adult ADHD, Bipolar Spectrum, Panic Disorders & Sleep Architecture',
    quote: 'Medication is never a substitute for understanding your story. When used thoughtfully alongside therapy, it restores the biological calm needed to heal.'
  },
  {
    name: 'Dr. Meera Sen',
    role: 'Senior Clinical Psychologist',
    quals: 'M.Phil Clinical Psychology (NIMHANS) · Ph.D.',
    langs: 'English · Hindi · Bengali',
    initial: 'MS',
    color: '#3949AB',
    bg: '#EEF2FB',
    focus: 'Complex Trauma, Depression, Anxiety & Existential Burnout',
    quote: 'Therapy is not about fixing what is broken; it is about uncovering how your coping mechanisms protected you, and building safer ways forward.'
  },
  {
    name: 'Priya Sharma',
    role: 'Gut-Brain Clinical Dietitian',
    quals: 'M.Sc. Clinical Nutrition (Manipal) · RD',
    langs: 'English · Hindi',
    initial: 'PS',
    color: '#2E694F',
    bg: '#EEF7F2',
    focus: 'Gut-Brain Microbiome Axis, Metabolic Mood Stability & Stress Eating',
    quote: 'Your brain chemistry depends heavily on your digestive biology. Nourishing the microbiome creates the quiet foundation for mental calm.'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Somatic Movement Therapist',
    quals: 'M.Sc. Yoga Therapy (SVYASA) · Somatic Practitioner',
    langs: 'English · Hindi · Tamil',
    initial: 'RK',
    color: '#B45330',
    bg: '#FBF1EC',
    focus: 'Polyvagal Nervous System Reset, Somatic Trauma & Chronic Tension',
    quote: 'The body remembers what the conscious mind buries. When we teach your nervous system that this moment is safe, healing accelerates.'
  },
  {
    name: 'Ananya Roy',
    role: 'Lead Care Coordinator & Triage Specialist',
    quals: 'MSW Psychiatric Social Work (TISS)',
    langs: 'English · Hindi · Kannada',
    initial: 'AR',
    color: '#124E47',
    bg: '#EDF6F4',
    focus: 'Patient Intake, Compassionate Triage & Cross-Discipline Coordination',
    quote: 'Reaching out for help should not feel like taking on a second job. My promise is to make your care journey seamless, gentle, and clear.'
  }
];

// Curated FAQs (What patients actually wonder)
const faqs = [
  {
    q: 'How do I know which specialist or service I should book?',
    a: 'If you are unsure, start with our complimentary Initial Care Assessment (₹0). You will spend 45 minutes with our clinical care coordinator who will listen to your symptoms, answer your questions, and connect you with the exact right psychologist, psychiatrist, or dietitian.'
  },
  {
    q: 'Can I attend my sessions online, or do I need to visit in person?',
    a: 'You can choose either! All our therapy, psychiatry, and nutrition appointments are available via high-definition, encrypted video calls from the privacy of your home. If you prefer in-person care, our serene, acoustic-isolated clinic in Indiranagar, Bengaluru is open Monday through Saturday.'
  },
  {
    q: 'Can I book multiple services in one appointment without times clashing?',
    a: 'Yes. Our booking system is built specifically for integrated healthcare. You can select talk therapy, psychiatry, and nutrition together in a single booking basket. Our engine automatically guarantees that your chosen time slots never clash.'
  },
  {
    q: 'Will my sessions and data remain strictly confidential?',
    a: 'Absolutely. We adhere to the Digital Personal Data Protection (DPDP) Act of India and strict clinical ethics. We never sell data, never share diagnoses with employers, and maintain end-to-end encrypted medical confidentiality.'
  },
  {
    q: 'What is your cancellation and rescheduling policy?',
    a: 'We understand that life happens. You can reschedule or cancel your session with zero penalties up to 4 hours before your scheduled appointment time directly through your secure confirmation link.'
  }
];

export default function HomePage() {
  const [selectedConcern, setSelectedConcern] = useState<string>('anxiety');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeConcernData = concerns.find(c => c.id === selectedConcern) || concerns[0];

  return (
    <div className="home-page-minimal">
      {/* 1. HERO SECTION: CALM, EMPATHETIC, MINIMALIST */}
      <section className="zen-hero-section">
        <div className="container zen-hero-container">
          <div className="zen-hero-badge">
            <span className="zen-badge-pulse"></span>
            <span>Compassionate Care · Online & Indiranagar Sanctuary, Bengaluru</span>
          </div>

          <h1 className="zen-hero-title">
            Healthcare that listens to the <em>whole</em> of you.
          </h1>

          <p className="zen-hero-subtitle">
            When life feels overwhelming, your mind, body, and sleep feel it together.
            We bring psychiatry, therapy, gut-brain nutrition, and somatic healing into one gentle, coordinated care plan.
          </p>

          <div className="zen-hero-actions">
            <Link href="/book" className="btn-zen-primary">
              <Calendar size={18} />
              <span>Book a Consultation</span>
            </Link>
            <Link href="/book" className="btn-zen-secondary">
              <Compass size={18} />
              <span>Unsure? Start Free Assessment (₹0)</span>
            </Link>
          </div>

          <div className="zen-trust-strip">
            <div className="zen-trust-item">
              <Shield size={16} className="zen-trust-icon" />
              <span>100% Confidential</span>
            </div>
            <div className="zen-trust-item">
              <Heart size={16} className="zen-trust-icon" />
              <span>No Medical Referral Needed</span>
            </div>
            <div className="zen-trust-item">
              <CheckCircle2 size={16} className="zen-trust-icon" />
              <span>Zero-Clash Scheduling</span>
            </div>
            <div className="zen-trust-item">
              <Building2 size={16} className="zen-trust-icon" />
              <span>Online or In-Person (Indiranagar)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "WHAT BRINGS YOU HERE?" INTERACTIVE SELF-SELECTION */}
      <section className="zen-concerns-section" id="concerns">
        <div className="container">
          <div className="zen-section-header">
            <span className="zen-eyebrow">Start Here</span>
            <h2>What feels heavy right now?</h2>
            <p>Select what you are experiencing. We’ll show you the gentlest path forward.</p>
          </div>

          <div className="zen-concerns-pill-grid">
            {concerns.map(c => (
              <button
                key={c.id}
                type="button"
                className={`zen-concern-chip ${selectedConcern === c.id ? 'active' : ''}`}
                onClick={() => setSelectedConcern(c.id)}
              >
                <span className="chip-emoji">{c.icon}</span>
                <span className="chip-title">{c.title}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Recommendation Card */}
          <div className="zen-recommend-box">
            <div className="zrec-left">
              <div className="zrec-badge">Recommended Starting Point</div>
              <h3 className="zrec-title">{activeConcernData.recommendation}</h3>
              <p className="zrec-desc">{activeConcernData.shortDesc}</p>
              <div className="zrec-details">
                <span><strong>Specialist:</strong> {activeConcernData.practitioner}</span>
                <span><strong>Duration:</strong> {activeConcernData.duration}</span>
                <span><strong>Consultation Fee:</strong> {activeConcernData.fee}</span>
              </div>
            </div>
            <div className="zrec-right">
              <Link href={activeConcernData.link} className="btn-zen-primary btn-full">
                <span>Book This Consultation</span>
                <ArrowRight size={16} />
              </Link>
              <span className="zrec-note">Zero paperwork · Pick online or clinic</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR 4 CORE DISCIPLINES (CLEAR & APPROACHABLE) */}
      <section className="zen-services-section" id="services">
        <div className="container">
          <div className="zen-section-header">
            <span className="zen-eyebrow">Our Disciplines</span>
            <h2>Integrated care under one roof</h2>
            <p>Book one specialist, or combine disciplines in a single visit without double-booking.</p>
          </div>

          <div className="zen-services-grid">
            {coreServices.map(service => {
              const ServiceIcon = service.icon;
              return (
                <div key={service.name} className="zen-service-card" style={{ borderTop: `3px solid ${service.color}` }}>
                  <div className="zsc-top">
                    <span className="zsc-icon" style={{ background: service.bg, color: service.color }}>
                      <ServiceIcon size={22} />
                    </span>
                    <span className="zsc-badge">{service.badge}</span>
                  </div>

                  <div className="zsc-tag">{service.tag}</div>
                  <h3 className="zsc-name">{service.name}</h3>
                  <p className="zsc-desc">{service.desc}</p>

                  <ul className="zsc-approaches">
                    {service.approaches.map((app, i) => (
                      <li key={i}>
                        <CheckCircle2 size={13} style={{ color: service.color }} />
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="zsc-footer">
                    <div className="zsc-price-box">
                      <span className="zsc-fee">{service.fee}</span>
                      <span className="zsc-duration">{service.duration}</span>
                    </div>
                    <Link href="/book" className="zsc-book-btn" style={{ color: service.color }}>
                      <span>Book</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Complimentary Triage Banner */}
          <div className="zen-triage-banner">
            <div className="ztb-content">
              <span className="ztb-icon"><Compass size={24} /></span>
              <div>
                <h4>Unsure which discipline is right for you?</h4>
                <p>Book our <strong>Initial Care Assessment & Triage (₹0 · 45 min)</strong>. Our clinical care coordinator will listen to your story and design your personalized care roadmap.</p>
              </div>
            </div>
            <Link href="/book" className="btn-zen-secondary ztb-btn">
              <span>Start Free Triage</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. MEET YOUR SPECIALIST TEAM */}
      <section className="zen-team-section" id="specialists">
        <div className="container">
          <div className="zen-section-header">
            <span className="zen-eyebrow">Verified Clinicians</span>
            <h2>Meet your specialist care team</h2>
            <p>Rigorous training from premier institutions (NIMHANS, TISS, Manipal) paired with deep human warmth.</p>
          </div>

          <div className="zen-team-grid">
            {specialists.map(doctor => (
              <div key={doctor.name} className="zen-doctor-card">
                <div className="zdoc-header">
                  <div className="zdoc-avatar" style={{ background: doctor.color }}>
                    {doctor.initial}
                  </div>
                  <div className="zdoc-meta">
                    <h3 className="zdoc-name">{doctor.name}</h3>
                    <div className="zdoc-role" style={{ color: doctor.color }}>{doctor.role}</div>
                    <div className="zdoc-quals">{doctor.quals}</div>
                  </div>
                </div>

                <div className="zdoc-langs">
                  <Users size={13} />
                  <span>{doctor.langs}</span>
                </div>

                <div className="zdoc-focus">
                  <strong>Areas of Focus:</strong> {doctor.focus}
                </div>

                <blockquote className="zdoc-quote">
                  "{doctor.quote}"
                </blockquote>

                <div className="zdoc-action">
                  <Link href="/book" className="btn-zen-secondary btn-full">
                    <span>Book with {doctor.name.split(' ')[0]}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (3 GENTLE STEPS) */}
      <section className="zen-steps-section" id="how-it-works">
        <div className="container">
          <div className="zen-section-header">
            <span className="zen-eyebrow">Zero Friction</span>
            <h2>How booking works</h2>
            <p>Designed to be simple, fast, and stress-free when you are already dealing with enough.</p>
          </div>

          <div className="zen-steps-grid">
            <div className="zen-step-item">
              <div className="zstep-number">01</div>
              <h3>Choose Your Care</h3>
              <p>Pick psychotherapy, psychiatry, nutrition, or somatic yoga. You can combine multiple disciplines in one appointment.</p>
            </div>

            <div className="zen-step-item">
              <div className="zstep-number">02</div>
              <h3>Pick a Clashing-Free Slot</h3>
              <p>Choose video consultation or in-person at our Indiranagar clinic. Our engine guarantees your times never conflict.</p>
            </div>

            <div className="zen-step-item">
              <div className="zstep-number">03</div>
              <h3>Confirm & Connect</h3>
              <p>Receive your secure link instantly. No mandatory passwords, no public directories, and 100% confidential care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INDIRANAGAR SANCTUARY & LOCATION */}
      <section className="zen-location-section" id="sanctuary">
        <div className="container">
          <div className="zen-location-card">
            <div className="zloc-info">
              <span className="zen-eyebrow">In-Person Care</span>
              <h2>The Indiranagar Sanctuary</h2>
              <p>
                A peaceful physical clinic tucked away from Bengaluru’s traffic. Designed with acoustic soundproofing, sensory calm lighting, and private entrances so your visit feels restorative.
              </p>
              
              <div className="zloc-details-list">
                <div className="zloc-item">
                  <MapPin size={18} className="zloc-icon" />
                  <div>
                    <strong>Better Mind Clinic</strong>
                    <span>14th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038</span>
                  </div>
                </div>
                <div className="zloc-item">
                  <Clock size={18} className="zloc-icon" />
                  <div>
                    <strong>Consultation Hours</strong>
                    <span>Monday to Saturday: 8:30 AM – 8:30 PM IST</span>
                  </div>
                </div>
                <div className="zloc-item">
                  <Phone size={18} className="zloc-icon" />
                  <div>
                    <strong>Direct Clinic Desk</strong>
                    <span><a href="tel:+918047182200">+91 80 4718 2200</a> · care@bettermind.clinic</span>
                  </div>
                </div>
              </div>

              <div className="zloc-actions">
                <Link href="/book" className="btn-zen-primary">
                  <span>Book In-Person Session</span>
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="https://maps.google.com/?q=Indiranagar+Bengaluru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-zen-secondary"
                >
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            <div className="zloc-perks">
              <div className="zperk-box">
                <Shield size={20} className="zperk-icon" />
                <h4>Acoustic Soundproofing</h4>
                <p>Every therapy room is architecturally sound-isolated so your words stay entirely private.</p>
              </div>
              <div className="zperk-box">
                <Heart size={20} className="zperk-icon" />
                <h4>Sensory Low-Stimulus</h4>
                <p>Gentle natural light, calming botanical greenery, and zero loud waiting room buzzers.</p>
              </div>
              <div className="zperk-box">
                <FileText size={20} className="zperk-icon" />
                <h4>Insurance Reimbursement</h4>
                <p>Official medical invoices with RCI/NMC registration numbers provided for claim submissions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="zen-faq-section" id="faqs">
        <div className="container zen-faq-container">
          <div className="zen-section-header">
            <span className="zen-eyebrow">Common Questions</span>
            <h2>Everything you need to know</h2>
            <p>Clear answers to help you feel completely comfortable before your first visit.</p>
          </div>

          <div className="zen-faq-stack">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`zen-faq-card ${isOpen ? 'active' : ''}`}>
                  <button
                    type="button"
                    className="zfaq-trigger"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="zfaq-q-text">{faq.q}</span>
                    <span className="zfaq-icon">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="zfaq-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. CALM FINAL CTA */}
      <section className="zen-final-cta-section">
        <div className="container">
          <div className="zen-cta-box">
            <span className="zen-cta-leaf">🌿</span>
            <h2>Take your first gentle step today.</h2>
            <p>
              You don’t have to know the whole journey right now. Just book your first session or free triage chat, and let our team support you from here.
            </p>
            <div className="zen-cta-buttons">
              <Link href="/book" className="btn-zen-primary btn-lg">
                <Calendar size={18} />
                <span>Book an Appointment</span>
              </Link>
              <Link href="/services" className="btn-zen-secondary btn-lg">
                <span>View Full Services Guide</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. DISCREET 24/7 CRISIS HELP BAR */}
      <section className="zen-crisis-bar">
        <div className="container zen-crisis-inner">
          <div className="zcb-left">
            <Shield size={16} />
            <span><strong>In immediate crisis?</strong> Better Mind is an outpatient practice. If you are experiencing acute distress:</span>
          </div>
          <div className="zcb-right">
            <span>Call <strong>Tele-MANAS: 14416</strong></span>
            <span>·</span>
            <span><strong>KIRAN: 1800-599-0019</strong> (24/7 Toll-Free, Govt. of India)</span>
          </div>
        </div>
      </section>
    </div>
  );
}
