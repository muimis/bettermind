import Link from 'next/link';

const services = [
  {
    group: 'Start here',
    icon: '🧭',
    color: '#1f5e58',
    bg: '#eaf3f2',
    items: [
      { name: 'Initial Care Assessment & Triage', desc: 'Not sure where to begin? A clinical care coordinator evaluates your needs and connects you to the right specialist.', duration: '45 min' }
    ]
  },
  {
    group: 'Mind',
    icon: '🧠',
    color: '#3f51b5',
    bg: '#edf0fa',
    items: [
      { name: 'Clinical Psychology & Psychotherapy', desc: 'Evidence-based therapy for anxiety, depression, trauma, and personal growth.', duration: '50 min' },
      { name: 'Psychiatry Consultation', desc: 'Comprehensive psychiatric evaluation, diagnosis, and medical management by a qualified psychiatrist.', duration: '45 min' }
    ]
  },
  {
    group: 'Body',
    icon: '🌿',
    color: '#c46442',
    bg: '#fcf0eb',
    items: [
      { name: 'Clinical Dietetics & Gut-Brain Nutrition', desc: 'Nutritional planning for mood regulation, hormonal balance, and metabolic wellbeing.', duration: '45 min' },
      { name: 'Therapeutic Yoga & Somatic Movement', desc: '1-on-1 guided somatic movement and breathwork to release nervous system tension.', duration: '60 min' }
    ]
  },
  {
    group: 'Wellness',
    icon: '✨',
    color: '#b26a00',
    bg: '#fdf5e6',
    items: [
      { name: 'Mindfulness & Stress Management', desc: 'Practical stress reduction, nervous system regulation, and mindfulness-based interventions.', duration: '45 min' }
    ]
  }
];

const team = [
  { name: 'Dr. Arun Nair', role: 'Psychiatrist', quals: 'MD Psychiatry, MBBS', langs: 'English · Hindi · Malayalam', initial: 'AN' },
  { name: 'Dr. Meera Sen', role: 'Clinical Psychologist', quals: 'M.Phil Clinical Psychology, Ph.D.', langs: 'English · Hindi · Bengali', initial: 'MS' },
  { name: 'Priya Sharma', role: 'Clinical Dietitian', quals: 'M.Sc. Clinical Nutrition & Dietetics', langs: 'English · Hindi', initial: 'PS' },
  { name: 'Rajesh Kumar', role: 'Yoga Therapist', quals: 'M.Sc. Yoga Therapy, Certified Somatic Practitioner', langs: 'English · Hindi · Tamil', initial: 'RK' },
  { name: 'Ananya Roy', role: 'Care Coordinator', quals: 'MSW Clinical Social Work', langs: 'English · Hindi', initial: 'AR' }
];

const steps = [
  { n: '1', title: 'Choose your services', desc: 'Pick one or more services from our catalogue. You can combine Psychology, Nutrition, Yoga, and more in a single booking.' },
  { n: '2', title: 'Select times', desc: 'Choose online or in-person for each service and pick a time that suits you. Times that clash are automatically blocked.' },
  { n: '3', title: 'Enter your details', desc: 'Tell us your name, contact, and preferred language. Your practitioner is assigned at confirmation — you see their name before you book.' },
];

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-badge">Integrated Mental Health & Wellness</div>
          <h1 className="hero-title">Your complete care plan,<br />one coordinated booking.</h1>
          <p className="hero-subtitle">
            Better Mind brings psychiatry, psychology, nutrition, yoga, and wellness together.
            Book multiple services in one visit — online or in person — and we assign the right specialist for you.
          </p>
          <div className="hero-actions">
            <Link href="/book" className="btn-primary btn-lg">Book an appointment</Link>
            <Link href="/services" className="btn-outline btn-lg">Explore services</Link>
          </div>
          <p className="hero-note">No account needed. All times shown in IST.</p>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section services-section">
        <div className="container">
          <div className="section-header">
            <h2>Our services</h2>
            <p>One care plan covering your whole wellbeing.</p>
          </div>
          <div className="services-grid">
            {services.map(group => (
              <div className="service-group-card" key={group.group} style={{ borderTop: `3px solid ${group.color}` }}>
                <div className="service-group-header">
                  <span className="service-group-icon" style={{ background: group.bg }}>{group.icon}</span>
                  <h3 className="service-group-name" style={{ color: group.color }}>{group.group}</h3>
                </div>
                {group.items.map(item => (
                  <div className="service-item" key={item.name}>
                    <div className="service-item-name">{item.name}</div>
                    <div className="service-item-desc">{item.desc}</div>
                    <div className="service-item-duration">{item.duration}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link href="/book" className="btn-primary">Book now</Link>
            <Link href="/services" className="btn-ghost">See all services →</Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section how-section">
        <div className="container">
          <div className="section-header">
            <h2>How booking works</h2>
            <p>Simple, fast, and transparent.</p>
          </div>
          <div className="steps-grid">
            {steps.map(step => (
              <div className="step-card" key={step.n}>
                <div className="step-number">{step.n}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="how-note">
            <strong>No double bookings, ever.</strong> Our booking engine enforces strict no-overlap rules at the database level. If two people try to book the same slot at the same moment, exactly one succeeds.
          </div>
        </div>
      </section>

      {/* Care Team */}
      <section className="section team-section">
        <div className="container">
          <div className="section-header">
            <h2>Care team</h2>
            <p>Specialists across psychiatry, psychology, nutrition, and wellness.</p>
          </div>
          <div className="team-grid">
            {team.map(m => (
              <div className="team-card" key={m.name}>
                <div className="team-avatar">{m.initial}</div>
                <div className="team-info">
                  <div className="team-name">{m.name} <span className="sample-badge">Sample</span></div>
                  <div className="team-role">{m.role}</div>
                  <div className="team-quals">{m.quals} (to confirm)</div>
                  <div className="team-langs">🌐 {m.langs}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <h2>Ready to start?</h2>
          <p>No referral needed. No account. Just choose your services and a time that works for you.</p>
          <Link href="/book" className="btn-primary btn-lg">Book an appointment</Link>
          <p className="cta-note">
            Not sure which service? Start with the <strong>Initial Care Assessment</strong> — a care coordinator will guide you.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <div className="footer-brand">Better Mind</div>
            <div className="footer-tagline">Specialist mental health & integrative wellness</div>
            <div className="footer-address">Address to confirm, Bengaluru, Karnataka</div>
          </div>
          <div className="footer-links">
            <Link href="/services">Services</Link>
            <Link href="/book">Book</Link>
            <Link href="/staff">Staff login</Link>
          </div>
          <div className="footer-legal">
            <p>Better Mind is not an emergency service. In a crisis, call <strong>Tele-MANAS: 14416</strong> or <strong>KIRAN: 1800-599-0019</strong> (24/7 toll-free).</p>
            <p>Fees, qualifications, registration numbers, address and contact details are to be confirmed before launch. All data shown is sample data.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
