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

// Care Disciplines & Catalogue
const services = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    group: 'Start here',
    name: 'Initial Care Assessment & Triage',
    tagline: 'Best starting point if you feel overwhelmed or unsure',
    desc: 'Spend 45 minutes with our Clinical Care Coordinator. We listen to your symptoms, review your health history, and co-create an evidence-based roadmap routing you to the right psychology, psychiatry, nutrition, or somatic specialist.',
    duration: '45 min',
    fee: '₹0 · Complimentary',
    feeSub: 'Free 1st intake triage',
    mode: 'Online or Indiranagar Clinic',
    color: '#124E47',
    bg: '#EDF6F4',
    icon: Compass,
    highlights: ['Comprehensive mental health intake', 'Symptom & severity screening', 'Personalized care recommendation', 'No referral required'],
    practitioner: 'Led by Ananya Roy, MSW (TISS)'
  },
  {
    id: '22222222-2222-2222-2222-222222222221',
    group: 'Mind',
    name: 'Clinical Psychology & Psychotherapy',
    tagline: 'Cognitive, trauma-informed, and relational talk therapy',
    desc: 'Evidence-based psychotherapy for anxiety, depression, burnout, emotional regulation, grief, relationship distress, and OCD. Our psychologists draw from Cognitive Behavioral Therapy (CBT), Acceptance and Commitment Therapy (ACT), and EMDR.',
    duration: '50 min',
    fee: '₹1,800',
    feeSub: 'Per session · Insurance receipt provided',
    mode: 'Online or Indiranagar Clinic',
    color: '#3949AB',
    bg: '#EEF2FB',
    icon: Brain,
    highlights: ['Licensed RCI Clinical Psychologists', 'CBT, ACT, and EMDR approaches', 'Safe, non-judgmental space', 'Collaborative treatment goals'],
    practitioner: 'With Dr. Meera Sen, Ph.D. (NIMHANS)'
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    group: 'Mind',
    name: 'Psychiatry & Medical Evaluation',
    tagline: 'Medical diagnostic assessment, brain chemistry, and medication management',
    desc: 'Comprehensive psychiatric evaluation by a specialist medical doctor. We assess neurobiological factors, mood disorders, adult ADHD, anxiety, psychosis, and sleep disruptions, integrating careful medical management with psychotherapy.',
    duration: '45 min',
    fee: '₹2,200',
    feeSub: 'Per session · Telemedicine compliant',
    mode: 'Online or Indiranagar Clinic',
    color: '#3949AB',
    bg: '#EEF2FB',
    icon: Award,
    highlights: ['NMC Registered MD Psychiatrists', 'Thorough diagnostic workup', 'Conservative, monitored prescriptions', 'Coordinated therapy handoff'],
    practitioner: 'With Dr. Arun Nair, MD (NIMHANS)'
  },
  {
    id: '33333333-3333-3333-3333-333333333331',
    group: 'Body',
    name: 'Clinical Dietetics & Gut-Brain Nutrition',
    tagline: 'Nutritional psychiatry, microbiome health, and metabolic mood balance',
    desc: 'Over 90% of serotonin is manufactured in the gut. Our clinical dietitians design evidence-based dietary protocols to reduce neuroinflammation, stabilize neurotransmitters, balance blood sugar, and address gut-brain axis issues.',
    duration: '45 min',
    fee: '₹1,500',
    feeSub: 'Per session · Customized plan included',
    mode: 'Online or Indiranagar Clinic',
    color: '#2E694F',
    bg: '#EEF7F2',
    icon: Leaf,
    highlights: ['Microbiome & gut-brain balance', 'Metabolic mood stabilization', 'Culturally tailored Indian diets', 'Eating behavior support'],
    practitioner: 'With Priya Sharma, RD (Manipal)'
  },
  {
    id: '33333333-3333-3333-3333-333333333332',
    group: 'Body',
    name: 'Therapeutic Yoga & Somatic Movement',
    tagline: '1-on-1 nervous system grounding and polyvagal tension release',
    desc: 'Trauma and chronic stress are physically stored in muscular guarding and autonomic dysregulation. 1-on-1 guided somatic movement, polyvagal-informed breathwork, and gentle physical grounding to help your nervous system feel safe again.',
    duration: '60 min',
    fee: '₹1,400',
    feeSub: 'Per 60-min private session',
    mode: 'Online or Indiranagar Clinic',
    color: '#2E694F',
    bg: '#EEF7F2',
    icon: Sparkles,
    highlights: ['1-on-1 private somatic guidance', 'Vagus nerve reset techniques', 'Complements trauma talk therapy', 'Adapted for physical limitations'],
    practitioner: 'With Rajesh Kumar, M.Sc (SVYASA)'
  },
  {
    id: '44444444-4444-4444-4444-444444444441',
    group: 'Wellness',
    name: 'Mindfulness & Stress Resilience',
    tagline: 'Practical nervous system pacing and cognitive resilience skills',
    desc: 'Structured, skills-focused coaching in mindfulness-based stress reduction (MBSR), heart rate variability breathing, and cognitive defusion to prevent corporate burnout and restore mental clarity.',
    duration: '45 min',
    fee: '₹1,200',
    feeSub: 'Per session · Practical toolkit provided',
    mode: 'Online or Indiranagar Clinic',
    color: '#A36100',
    bg: '#FEF7ED',
    icon: Heart,
    highlights: ['Heart Rate Variability (HRV) tools', 'Cognitive defusion practices', 'Burnout recovery strategies', 'Take-home audio exercises'],
    practitioner: 'With Rajesh Kumar & Ananya Roy'
  }
];

// Specialist Care Team Data
const team = [
  {
    name: 'Dr. Arun Nair',
    role: 'Senior Consultant Psychiatrist',
    quals: 'MD Psychiatry (NIMHANS) · MBBS',
    reg: 'KMC Reg # 64921',
    exp: '12+ Years Clinical Experience',
    langs: 'English · Hindi · Malayalam',
    bio: 'Dr. Arun trained at the National Institute of Mental Health and Neurosciences (NIMHANS). He specializes in adult affective disorders, neurodevelopmental conditions (ADHD), and integrative neuropsychiatry, emphasizing conservative medical management partnered with psychotherapeutic lifestyle changes.',
    interests: ['Adult ADHD & Focus', 'Mood & Bipolar Spectrum', 'Anxiety & Panic Disorders', 'Sleep Architecture'],
    initial: 'AN',
    color: '#124E47',
    quote: '"Medication is never a replacement for understanding a person’s story. When combined thoughtfully with therapy, it provides the biological stability to heal."'
  },
  {
    name: 'Dr. Meera Sen',
    role: 'Senior Clinical Psychologist & Psychotherapist',
    quals: 'M.Phil Clinical Psychology (NIMHANS) · Ph.D.',
    reg: 'RCI Reg # A39104',
    exp: '10+ Years Clinical Experience',
    langs: 'English · Hindi · Bengali',
    bio: 'Dr. Meera is an RCI-licensed clinical psychologist with extensive expertise in treating complex trauma, depression, anxiety, and relational attachment injuries. She integrates CBT, Acceptance and Commitment Therapy (ACT), and EMDR to foster deep, durable psychological resilience.',
    interests: ['Trauma & PTSD (EMDR)', 'Depression & Existential Burnout', 'OCD & Phobias', 'Relational Patterns'],
    initial: 'MS',
    color: '#3949AB',
    quote: '"Therapy is not about fixing what is broken; it is about uncovering how your coping mechanisms protected you, and building safer ways forward."'
  },
  {
    name: 'Priya Sharma',
    role: 'Lead Clinical Dietitian & Gut-Brain Nutritionist',
    quals: 'M.Sc. Clinical Nutrition & Dietetics (Manipal), RD',
    reg: 'IDA Reg # 54321',
    exp: '8+ Years Clinical Experience',
    langs: 'English · Hindi',
    bio: 'Priya specializes in the gut-brain microbiome axis and nutritional psychiatry. She works closely with our medical and psychological team to design anti-inflammatory, neuro-supportive nutritional plans tailored to authentic Indian food cultures and modern metabolic lifestyles.',
    interests: ['Gut-Brain Axis & IBS', 'Metabolic Mood Support', 'PCOS & Hormonal Dysregulation', 'Mindful Eating'],
    initial: 'PS',
    color: '#2E694F',
    quote: '"Your brain chemistry relies on your digestive biology. Nourishing the microbiome creates the biochemical foundation for mood stability."'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Somatic Movement & Certified Yoga Therapist',
    quals: 'M.Sc. Yoga Therapy (SVYASA), Certified Somatic Practitioner',
    reg: 'YCB Reg # 99887',
    exp: '9+ Years Clinical Experience',
    langs: 'English · Hindi · Tamil',
    bio: 'Rajesh bridges traditional Indian yogic sciences with modern polyvagal autonomic theory and Somatic Experiencing. He provides gentle 1-on-1 nervous system recalibration for individuals experiencing trauma-related hyperarousal, panic attacks, and muscular tension.',
    interests: ['Polyvagal Autonomic Regulation', 'Somatic Trauma Release', 'Pranayama for Anxiety', 'Chronic Tension Relief'],
    initial: 'RK',
    color: '#B45330',
    quote: '"The body remembers what the conscious mind tries to bury. When we gently teach the nervous system that the present moment is safe, healing accelerates."'
  },
  {
    name: 'Ananya Roy',
    role: 'Lead Care Coordinator & Triage Specialist',
    quals: 'MSW Clinical Psychiatric Social Work (TISS)',
    reg: 'KAPS Reg # 1120',
    exp: '7+ Years Patient Advocacy',
    langs: 'English · Hindi · Kannada',
    bio: 'Ananya leads patient triage and care integration at Better Mind. With a clinical background from the Tata Institute of Social Sciences (TISS), she ensures patients find the exact right specialist match, guides first-time visitors, and manages interdisciplinary care communication.',
    interests: ['Initial Intake & Assessment', 'Patient Advocacy', 'Cross-Disciplinary Coordination', 'Crisis Prevention'],
    initial: 'AR',
    color: '#124E47',
    quote: '"Reaching out for help shouldn’t feel like taking on a second job. My mission is to make your care journey seamless, clear, and reassuring from day one."'
  }
];

// Interactive FAQs
const faqs = [
  {
    q: 'How does Better Mind differ from seeing an independent therapist or doctor?',
    a: 'Traditional mental healthcare is heavily fragmented: you visit a psychiatrist in one hospital, a therapist in another clinic, and your nutrition or physical tension is never addressed. At Better Mind, our entire clinical team operates as one unified practice. Your psychologist, psychiatrist, dietitian, and somatic therapist consult together on your care plan, share insights on our secure platform, and ensure your treatment is coordinated without you having to repeat your trauma or history over and over.'
  },
  {
    q: 'Can I book multiple services in one appointment?',
    a: 'Yes! That is one of our defining features. You can choose Psychology, Nutrition, and Yoga in a single booking session. Our booking engine automatically checks practitioner availability across pools and enforces strict no-clash rules so your appointment times flow comfortably without overlapping.'
  },
  {
    q: 'How do I choose between Psychiatry and Clinical Psychology?',
    a: 'A Clinical Psychologist focuses on talk therapy (CBT, ACT, trauma recovery) to understand thought patterns, emotional trauma, and behavioral changes. A Psychiatrist is a medical doctor who evaluates neurochemistry, can order lab tests, diagnose clinical disorders, and prescribe and monitor medication. If you are unsure which one you need, simply book our Complimentary Initial Care Assessment — our care coordinator will help you decide.'
  },
  {
    q: 'How do you assign my practitioner, and will I see the same person for repeat visits?',
    a: 'When you choose a service and slot, our system assigns a qualified specialist from that service pool based on your language preference and availability. You see their name and credentials on your booking confirmation. For all follow-up sessions, our system prioritizes the same practitioner by default to ensure therapeutic continuity.'
  },
  {
    q: 'Are online video sessions as effective as in-person visits in Bengaluru?',
    a: 'Clinical research demonstrates that structured video psychotherapy and psychiatric consultations achieve equivalent clinical outcomes to in-person visits for depression, anxiety, OCD, and stress. Our online sessions take place via secure, high-definition, encrypted video links. For those in Bengaluru, our calm, sensory-friendly clinic in Indiranagar offers private, sound-insulated consultation suites.'
  },
  {
    q: 'What is your cancellation and rescheduling policy?',
    a: 'We respect that life is unpredictable. You can reschedule or cancel your appointment free of charge up to 4 hours before the scheduled time using the self-service secure link provided in your confirmation email or by contacting our desk. Within the 4-hour window, please contact the clinic directly.'
  },
  {
    q: 'Are your fees covered by health insurance in India?',
    a: 'Many modern corporate wellness insurance plans and comprehensive outpatient health insurance policies (OPD cover) now reimburse consultations with licensed clinical psychologists and psychiatrists. Following each session, we issue a formal medical invoice with the practitioner’s RCI or NMC registration number and diagnostic code for submission to your insurer.'
  },
  {
    q: 'What happens if I experience an acute crisis between sessions?',
    a: 'Better Mind is an outpatient scheduled clinic and does not operate a 24-hour emergency casualty. If you or someone you know experiences severe psychiatric distress, acute suicidal ideation, or imminent risk, you must contact national 24/7 crisis helplines immediately: Tele-MANAS at 14416 (toll-free) or KIRAN at 1800-599-0019, or visit the nearest hospital emergency room (such as NIMHANS in Bengaluru).'
  }
];

export default function HomePage() {
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeDoctorTab, setActiveDoctorTab] = useState<string>('All');

  const filteredServices = selectedGroup === 'All'
    ? services
    : services.filter(s => s.group === selectedGroup);

  const filteredTeam = activeDoctorTab === 'All'
    ? team
    : team.filter(m => m.name === activeDoctorTab);

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge-pill">
              <span className="badge-dot"></span>
              <span>RCI & NMC Certified Specialists · Indiranagar Clinic & Online</span>
            </div>

            <h1 className="hero-headline">
              Healthcare that listens to the <em>whole</em> of you.
            </h1>

            <p className="hero-subtext">
              When your mind is overwhelmed, your sleep, gut, and nervous system feel it. Better Mind unites medical psychiatry, psychotherapy, gut-brain nutrition, and somatic therapy in one seamless, coordinated care plan.
            </p>

            <div className="hero-cta-group">
              <Link href="/book" className="btn-primary btn-lg hero-cta-btn">
                <Calendar size={18} />
                <span>Book an Appointment</span>
              </Link>
              <a href="#pathways" className="btn-outline btn-lg">
                <span>Explore Care Pathways</span>
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="hero-trust-bar">
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-icon" />
                <span>Zero-clash scheduling</span>
              </div>
              <div className="trust-item">
                <Lock size={16} className="trust-icon" />
                <span>100% Confidential (DPDP Act)</span>
              </div>
              <div className="trust-item">
                <Heart size={16} className="trust-icon" />
                <span>No account required</span>
              </div>
            </div>
          </div>

          {/* Hero Interactive Triage Card */}
          <div className="hero-card-column">
            <div className="triage-highlight-card">
              <div className="thc-badge">
                <Compass size={16} />
                <span>Unsure where to begin?</span>
              </div>
              <h3 className="thc-title">Initial Care Assessment & Triage</h3>
              <p className="thc-desc">
                Tell us what you are experiencing. Our clinical care coordinator evaluates your symptoms and matches you with the ideal specialist across our psychiatry, psychology, and wellness faculty.
              </p>
              <div className="thc-meta-row">
                <span className="thc-meta-tag"><Clock size={13} /> 45 Minutes</span>
                <span className="thc-meta-tag"><Video size={13} /> Online or In-Person</span>
                <span className="thc-fee-tag">₹0 · Free 1st Intake</span>
              </div>
              <Link href="/book" className="btn-primary btn-full">
                <span>Start Free Assessment</span>
                <ArrowRight size={16} />
              </Link>
              <div className="thc-footer-note">
                <Shield size={13} />
                <span>Conducted by licensed psychiatric social worker</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY INTEGRATED CARE (THE BETTER MIND METHOD) */}
      <section className="section philosophy-section" id="philosophy">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">The Better Mind Philosophy</span>
            <h2>Why fragmented healthcare fails mental health</h2>
            <p className="section-lead">
              You are not a collection of isolated parts. Your mental clarity, emotional resilience, digestive microbiome, and physical tension are deeply intertwined.
            </p>
          </div>

          <div className="philosophy-comparison-grid">
            {/* The Old Way */}
            <div className="comparison-card old-way">
              <div className="comparison-card-tag bad-tag">Traditional Fragmented Care</div>
              <h3 className="comparison-title">4 appointments. 4 separate clinics. Zero coordination.</h3>
              <ul className="comparison-list">
                <li>
                  <span className="comp-cross">✕</span>
                  <span>You have to repeat your painful history from scratch to every new practitioner.</span>
                </li>
                <li>
                  <span className="comp-cross">✕</span>
                  <span>Psychiatrists and psychotherapists rarely communicate, leaving you to mediate your own treatment.</span>
                </li>
                <li>
                  <span className="comp-cross">✕</span>
                  <span>Body symptoms — gut distress, chronic fatigue, muscle guarding — are dismissed as unrelated.</span>
                </li>
                <li>
                  <span className="comp-cross">✕</span>
                  <span>You juggle different apps, confusing schedules, and double-booked calendar clashes.</span>
                </li>
              </ul>
            </div>

            {/* The Better Mind Way */}
            <div className="comparison-card new-way">
              <div className="comparison-card-tag good-tag">The Better Mind Unified Model</div>
              <h3 className="comparison-title">One coordinated care plan. All specialists working as one team.</h3>
              <ul className="comparison-list">
                <li>
                  <span className="comp-check">✓</span>
                  <span><strong>One Unified Clinical Roster:</strong> Your therapist, psychiatrist, and nutritionist review your case collaboratively.</span>
                </li>
                <li>
                  <span className="comp-check">✓</span>
                  <span><strong>Whole-Person Healing:</strong> We address brain chemistry, emotional patterns, gut microbiome, and somatic tension together.</span>
                </li>
                <li>
                  <span className="comp-check">✓</span>
                  <span><strong>Smart Clash Prevention:</strong> Book multiple disciplines in a single visit without overlapping times.</span>
                </li>
                <li>
                  <span className="comp-check">✓</span>
                  <span><strong>Dedicated Care Coordinator:</strong> A clinical advocate stays with you through every stage of your recovery journey.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Care Pillars Grid */}
          <div className="care-pillars-grid">
            <div className="pillar-box">
              <div className="pillar-icon-wrap" style={{ background: '#EDF6F4', color: '#124E47' }}>
                <Compass size={24} />
              </div>
              <h4 className="pillar-title">1. Clinical Triage</h4>
              <p className="pillar-desc">
                We never guess. Every journey starts with objective assessment to ensure you get the right therapy without wasted time or money.
              </p>
            </div>
            <div className="pillar-box">
              <div className="pillar-icon-wrap" style={{ background: '#EEF2FB', color: '#3949AB' }}>
                <Brain size={24} />
              </div>
              <h4 className="pillar-title">2. Mind & Chemistry</h4>
              <p className="pillar-desc">
                CBT, ACT, and trauma therapy paired with careful medical psychiatric diagnostics when biological stabilization is needed.
              </p>
            </div>
            <div className="pillar-box">
              <div className="pillar-icon-wrap" style={{ background: '#EEF7F2', color: '#2E694F' }}>
                <Leaf size={24} />
              </div>
              <h4 className="pillar-title">3. Gut & Biology</h4>
              <p className="pillar-desc">
                Dietary science targeting the microbiome-gut-brain axis to support neurotransmitter synthesis and reduce chronic neuroinflammation.
              </p>
            </div>
            <div className="pillar-box">
              <div className="pillar-icon-wrap" style={{ background: '#FEF7ED', color: '#A36100' }}>
                <Sparkles size={24} />
              </div>
              <h4 className="pillar-title">4. Somatic Grounding</h4>
              <p className="pillar-desc">
                Polyvagal yoga and somatic movement to discharge physical nervous system tension that talk therapy alone cannot reach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CARE PATHWAYS & SERVICES CATALOGUE */}
      <section className="section services-catalogue-section" id="pathways">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Our Clinical Disciplines</span>
            <h2>Services tailored to your care plan</h2>
            <p className="section-lead">
              Book one specialist or assemble your complete multidisciplinary team. Choose online or in-person sessions at our Indiranagar clinic.
            </p>
          </div>

          {/* Group Filter Tabs */}
          <div className="service-tabs-row" role="tablist">
            {['All', 'Start here', 'Mind', 'Body', 'Wellness'].map(group => (
              <button
                key={group}
                type="button"
                role="tab"
                aria-selected={selectedGroup === group}
                className={`service-tab-btn ${selectedGroup === group ? 'active' : ''}`}
                onClick={() => setSelectedGroup(group)}
              >
                {group === 'All' ? 'All Services' : group}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="services-showcase-grid">
            {filteredServices.map(service => {
              const IconComp = service.icon;
              return (
                <div key={service.id} className="service-showcase-card" style={{ borderTop: `4px solid ${service.color}` }}>
                  <div className="ssc-header-top">
                    <span className="ssc-group-pill" style={{ background: service.bg, color: service.color }}>
                      <IconComp size={15} />
                      <span>{service.group}</span>
                    </span>
                    <span className="ssc-duration-badge">
                      <Clock size={13} /> {service.duration}
                    </span>
                  </div>

                  <h3 className="ssc-title">{service.name}</h3>
                  <div className="ssc-tagline">{service.tagline}</div>
                  <p className="ssc-desc">{service.desc}</p>

                  <div className="ssc-highlights">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="ssc-h-item">
                        <CheckCircle2 size={14} className="h-check" style={{ color: service.color }} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="ssc-practitioner-line">
                    <Users size={14} />
                    <span>{service.practitioner}</span>
                  </div>

                  <div className="ssc-card-footer">
                    <div className="ssc-price-box">
                      <div className="ssc-price">{service.fee}</div>
                      <div className="ssc-price-sub">{service.feeSub}</div>
                    </div>
                    <Link href={`/book`} className="btn-primary btn-sm ssc-book-btn">
                      <span>Book Service</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="catalogue-footer-note">
            <span>Looking for full clinical documentation or medical indications?</span>
            <Link href="/services" className="btn-outline btn-sm">
              View Detailed Clinical Catalogue →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHAT HAPPENS IN YOUR FIRST SESSION */}
      <section className="section first-session-section" id="first-session">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Transparent & Reassuring</span>
            <h2>What happens in your first session</h2>
            <p className="section-lead">
              Starting therapy or psychiatry can feel daunting. We eliminate the guesswork with a clear, respectful, and pressure-free process.
            </p>
          </div>

          <div className="session-steps-timeline">
            {/* Step 1 */}
            <div className="timeline-step-card">
              <div className="step-counter-badge">1</div>
              <div className="step-card-content">
                <div className="step-time-tag">Minutes 00 – 10</div>
                <h3 className="step-header-title">A Safe, Grounded Welcome</h3>
                <p className="step-body-text">
                  You enter our quiet Indiranagar consultation room or encrypted HD video room. Your clinician introduces themselves, outlines confidentiality under the Mental Healthcare Act and DPDP Act, and establishes that you control the pace of the conversation.
                </p>
                <div className="step-tip-box">
                  💡 <strong>Your comfort comes first:</strong> You are never pressured to talk about anything before you are ready.
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="timeline-step-card">
              <div className="step-counter-badge">2</div>
              <div className="step-card-content">
                <div className="step-time-tag">Minutes 10 – 30</div>
                <h3 className="step-header-title">Listening to Your Whole Story</h3>
                <p className="step-body-text">
                  We explore what brought you in, what feels heavy, your sleep patterns, physical energy, work environment, and what coping mechanisms you’ve tried. We view your symptoms with empathy, seeking to understand the root causes rather than slapping on labels.
                </p>
                <div className="step-tip-box">
                  💡 <strong>No judgment:</strong> We explore mind, body, and lifestyle together without blame or shame.
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="timeline-step-card">
              <div className="step-counter-badge">3</div>
              <div className="step-card-content">
                <div className="step-time-tag">Minutes 30 – 45</div>
                <h3 className="step-header-title">Co-Creating Your Care Roadmap</h3>
                <p className="step-body-text">
                  Instead of prescribing rigid treatments, we explain clinical findings in plain language. We collaboratively discuss whether talk therapy (CBT/ACT), medical psychiatric support, dietary adjustments, or somatic grounding is the best next step.
                </p>
                <div className="step-tip-box">
                  💡 <strong>Shared decisions:</strong> You always have the final say on all treatment recommendations.
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="timeline-step-card">
              <div className="step-counter-badge">4</div>
              <div className="step-card-content">
                <div className="step-time-tag">Minutes 45 – 50</div>
                <h3 className="step-header-title">Clear, Pressure-Free Next Steps</h3>
                <p className="step-body-text">
                  You receive a concise written summary of the session, any grounding exercises discussed, and optional scheduling recommendations. You are never locked into long financial packages or rigid contracts.
                </p>
                <div className="step-tip-box">
                  💡 <strong>Zero lock-in:</strong> Book session-by-session at your own pace and financial comfort.
                </div>
              </div>
            </div>
          </div>

          <div className="first-session-cta-box">
            <div className="fsc-text">
              <h3>Ready to speak with someone who understands?</h3>
              <p>Appointments available today and throughout the week. Online across India or in person in Indiranagar, Bengaluru.</p>
            </div>
            <Link href="/book" className="btn-primary btn-lg">
              <Calendar size={18} />
              <span>Book Your First Session</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. MEET OUR SPECIALIST FACULTY */}
      <section className="section team-section" id="team">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Medical & Psychological Leadership</span>
            <h2>Meet our specialist clinical faculty</h2>
            <p className="section-lead">
              Our clinicians bring rigorous training from premier institutions (NIMHANS, CIP, TISS) paired with deep human warmth and empathy.
            </p>
          </div>

          {/* Doctor filter pills */}
          <div className="team-filter-bar">
            {['All', 'Dr. Arun Nair', 'Dr. Meera Sen', 'Priya Sharma', 'Rajesh Kumar', 'Ananya Roy'].map(name => (
              <button
                key={name}
                type="button"
                className={`team-pill-btn ${activeDoctorTab === name ? 'active' : ''}`}
                onClick={() => setActiveDoctorTab(name)}
              >
                {name === 'All' ? 'All Specialists' : name}
              </button>
            ))}
          </div>

          <div className="team-detailed-grid">
            {filteredTeam.map(doctor => (
              <div key={doctor.name} className="doctor-profile-card">
                <div className="doc-card-header">
                  <div className="doc-avatar-large" style={{ background: doctor.color }}>
                    {doctor.initial}
                  </div>
                  <div className="doc-meta-info">
                    <h3 className="doc-name">{doctor.name}</h3>
                    <div className="doc-role" style={{ color: doctor.color }}>{doctor.role}</div>
                    <div className="doc-quals">{doctor.quals}</div>
                    <div className="doc-reg-badge">{doctor.reg}</div>
                  </div>
                </div>

                <div className="doc-experience-row">
                  <span className="doc-exp-item"><Award size={13} /> {doctor.exp}</span>
                  <span className="doc-exp-item"><Users size={13} /> {doctor.langs}</span>
                </div>

                <p className="doc-bio-text">{doctor.bio}</p>

                <div className="doc-interests-box">
                  <div className="doc-interests-label">Areas of Special Focus:</div>
                  <div className="doc-tags-wrap">
                    {doctor.interests.map((item, idx) => (
                      <span key={idx} className="doc-tag">{item}</span>
                    ))}
                  </div>
                </div>

                <blockquote className="doc-quote">
                  {doctor.quote}
                </blockquote>

                <div className="doc-card-action">
                  <Link href="/book" className="btn-primary btn-full">
                    <span>Book with {doctor.name.split(' ')[0]}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TRANSPARENT PRICING & CLINICAL INVESTMENT */}
      <section className="section pricing-section" id="pricing-faq">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Honest, Accessible Healthcare</span>
            <h2>Transparent pricing. Zero surprises.</h2>
            <p className="section-lead">
              Quality mental health care requires trust. We believe pricing should be clear, transparent, and fair from the very first moment.
            </p>
          </div>

          <div className="pricing-table-card">
            <div className="pricing-grid-header">
              <span>Service Discipline</span>
              <span>Duration</span>
              <span>Consultation Fee</span>
              <span>Reimbursement & Notes</span>
            </div>

            <div className="pricing-row">
              <div className="pr-col-service">
                <Compass size={18} className="pr-icon" style={{ color: '#124E47' }} />
                <div>
                  <strong>Initial Care Assessment & Triage</strong>
                  <span>Intake with psychiatric care coordinator</span>
                </div>
              </div>
              <div className="pr-col-time">45 min</div>
              <div className="pr-col-fee"><span className="fee-free">₹0 · Free</span></div>
              <div className="pr-col-notes">Complimentary first intake to establish your care roadmap</div>
            </div>

            <div className="pricing-row">
              <div className="pr-col-service">
                <Brain size={18} className="pr-icon" style={{ color: '#3949AB' }} />
                <div>
                  <strong>Clinical Psychology & CBT Psychotherapy</strong>
                  <span>RCI-Licensed Senior Clinical Psychologist</span>
                </div>
              </div>
              <div className="pr-col-time">50 min</div>
              <div className="pr-col-fee">₹1,800</div>
              <div className="pr-col-notes">Medical invoice with RCI number provided for insurance claim</div>
            </div>

            <div className="pricing-row">
              <div className="pr-col-service">
                <Award size={18} className="pr-icon" style={{ color: '#3949AB' }} />
                <div>
                  <strong>Psychiatry Consultation & Medical Diagnosis</strong>
                  <span>NMC Registered Senior MD Psychiatrist</span>
                </div>
              </div>
              <div className="pr-col-time">45 min</div>
              <div className="pr-col-fee">₹2,200</div>
              <div className="pr-col-notes">Telemedicine compliant prescription and follow-up guidance</div>
            </div>

            <div className="pricing-row">
              <div className="pr-col-service">
                <Leaf size={18} className="pr-icon" style={{ color: '#2E694F' }} />
                <div>
                  <strong>Clinical Dietetics & Gut-Brain Nutrition</strong>
                  <span>Registered Dietitian & Nutritional Psychiatrist</span>
                </div>
              </div>
              <div className="pr-col-time">45 min</div>
              <div className="pr-col-fee">₹1,500</div>
              <div className="pr-col-notes">Includes comprehensive 2-week personalized food & microbiome plan</div>
            </div>

            <div className="pricing-row">
              <div className="pr-col-service">
                <Sparkles size={18} className="pr-icon" style={{ color: '#2E694F' }} />
                <div>
                  <strong>Therapeutic Yoga & Somatic Movement</strong>
                  <span>Certified Somatic Experiencing Practitioner</span>
                </div>
              </div>
              <div className="pr-col-time">60 min</div>
              <div className="pr-col-fee">₹1,400</div>
              <div className="pr-col-notes">1-on-1 private guided polyvagal nervous system reset</div>
            </div>

            <div className="pricing-row">
              <div className="pr-col-service">
                <Heart size={18} className="pr-icon" style={{ color: '#A36100' }} />
                <div>
                  <strong>Mindfulness & Stress Resilience Coaching</strong>
                  <span>Practical nervous system pacing & HRV training</span>
                </div>
              </div>
              <div className="pr-col-time">45 min</div>
              <div className="pr-col-fee">₹1,200</div>
              <div className="pr-col-notes">Includes take-home audio breathwork and cognitive toolkit</div>
            </div>
          </div>

          {/* Pricing Guarantees */}
          <div className="pricing-features-row">
            <div className="pf-item">
              <FileText size={20} className="pf-icon" />
              <div>
                <strong>Insurance Reimbursement Receipts</strong>
                <span>We provide GST-compliant invoices with doctor license numbers for corporate wellness and OPD insurance claims.</span>
              </div>
            </div>
            <div className="pf-item">
              <Clock size={20} className="pf-icon" />
              <div>
                <strong>Flexible 4-Hour Cancellation</strong>
                <span>Reschedule or cancel easily with zero penalties up to 4 hours before your session.</span>
              </div>
            </div>
            <div className="pf-item">
              <Shield size={20} className="pf-icon" />
              <div>
                <strong>Sliding-Scale Triage Slots</strong>
                <span>We reserve weekly subsidized slots for students and individuals under financial distress. Contact care@bettermind.clinic.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="section faq-section">
        <div className="container faq-container">
          <div className="section-header">
            <span className="section-eyebrow">Got Questions?</span>
            <h2>Frequently asked questions</h2>
            <p className="section-lead">
              Everything you need to know about our clinic, doctors, confidentiality, and booking rules.
            </p>
          </div>

          <div className="faq-accordion-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`faq-card ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question-btn"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-text">{faq.q}</span>
                    <span className="faq-toggle-icon">
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="faq-support-footer">
            <HelpCircle size={20} className="fs-icon" />
            <div>
              <span>Have a specific inquiry not listed above?</span>
              {' '}
              <a href="mailto:care@bettermind.clinic" className="faq-link">
                Speak directly with our Care Coordinator
              </a>
              {' '}or call us at <strong>+91 80 4718 2200</strong>.
            </div>
          </div>
        </div>
      </section>

      {/* 8. IN-PERSON CLINIC & BENGALURU SANCTUARY */}
      <section className="section clinic-location-section">
        <div className="container">
          <div className="clinic-location-card">
            <div className="clc-content">
              <div className="clc-badge">Indiranagar Sanctuary</div>
              <h2 className="clc-title">Designed as a quiet sanctuary from city noise</h2>
              <p className="clc-desc">
                Our physical clinic in Indiranagar, Bengaluru was designed by neuroarchitects and trauma therapists. Every room is built with high-STC double acoustic isolation, gentle natural lighting, non-fluorescent warm tones, and private waiting pods so your privacy is never compromised.
              </p>

              <div className="clc-amenities-grid">
                <div className="clc-amenity">
                  <CheckCircle2 size={16} className="amenity-icon" />
                  <span>Double-glazed soundproof suites</span>
                </div>
                <div className="clc-amenity">
                  <CheckCircle2 size={16} className="amenity-icon" />
                  <span>Sensory-friendly, glare-free lighting</span>
                </div>
                <div className="clc-amenity">
                  <CheckCircle2 size={16} className="amenity-icon" />
                  <span>Air-purified HEPA filtered therapy rooms</span>
                </div>
                <div className="clc-amenity">
                  <CheckCircle2 size={16} className="amenity-icon" />
                  <span>Wheelchair access & dedicated parking</span>
                </div>
              </div>

              <div className="clc-address-strip">
                <MapPin size={18} className="strip-pin" />
                <div>
                  <strong>Better Mind Integrated Clinic</strong>
                  <div>14th Main Rd, HAL 2nd Stage, Indiranagar, Bengaluru, KA 560038</div>
                  <div className="clc-landmark">Near 100 Feet Road Junction · 5 min walk from Indiranagar Metro Station</div>
                </div>
              </div>

              <div className="clc-actions">
                <Link href="/book" className="btn-primary">
                  <Building2 size={16} />
                  <span>Book In-Person Session</span>
                </Link>
                <a
                  href="https://maps.google.com/?q=Indiranagar+Bengaluru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            <div className="clc-visual">
              <div className="clinic-photo-mockup">
                <div className="cpm-badge">Private Therapy Room</div>
                <div className="cpm-inner">
                  <div className="cpm-tagline">Quiet · Calming · Safe</div>
                  <div className="cpm-quote">
                    &ldquo;Walking into Better Mind feels like taking a deep breath after weeks of holding your breath.&rdquo;
                  </div>
                  <div className="cpm-sub">Indiranagar In-Person & Online Across India</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PRE-FOOTER INVITATION CTA */}
      <section className="section final-cta-section">
        <div className="container">
          <div className="final-cta-card">
            <h2 className="final-cta-headline">Take the first step towards feeling like yourself again.</h2>
            <p className="final-cta-sub">
              No referral needed. No mandatory accounts. Just select the services you want, pick a time that suits you, and let our multidisciplinary team support your journey.
            </p>
            <div className="final-cta-actions">
              <Link href="/book" className="btn-primary btn-lg">
                <Calendar size={18} />
                <span>Book an Appointment</span>
              </Link>
              <Link href="/services" className="btn-outline btn-lg">
                <span>Browse All Services</span>
              </Link>
            </div>
            <div className="final-cta-guarantee">
              <span>🔒 100% Confidential · Strict No-Clash Booking Engine · All times shown in IST</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
