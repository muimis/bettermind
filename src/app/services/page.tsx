import Link from 'next/link';

const services = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    group: 'Start here', icon: '🧭', color: '#1f5e58', bg: '#eaf3f2',
    name: 'Initial Care Assessment & Triage',
    desc: 'Not sure where to begin? A clinical care coordinator evaluates your needs and connects you to the right specialist. No referral needed.',
    duration: '45 min', mode: 'Online or in person', consult: false
  },
  {
    id: '22222222-2222-2222-2222-222222222221',
    group: 'Mind', icon: '🧠', color: '#3f51b5', bg: '#edf0fa',
    name: 'Clinical Psychology & Psychotherapy',
    desc: 'Evidence-based cognitive and psychotherapy sessions for anxiety, depression, trauma, grief, relationship difficulties, and personal growth. CBT, trauma-focused therapy, and integrative approaches.',
    duration: '50 min', mode: 'Online or in person', consult: false
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    group: 'Mind', icon: '🧠', color: '#3f51b5', bg: '#edf0fa',
    name: 'Psychiatry Consultation',
    desc: 'Comprehensive psychiatric evaluation, diagnosis, and medical management by a qualified psychiatrist. Covers mood disorders, anxiety, ADHD, psychosis, and medication review.',
    duration: '45 min', mode: 'Online or in person', consult: true
  },
  {
    id: '33333333-3333-3333-3333-333333333331',
    group: 'Body', icon: '🌿', color: '#c46442', bg: '#fcf0eb',
    name: 'Clinical Dietetics & Gut-Brain Nutrition',
    desc: 'Nutritional planning tailored for mood regulation, hormonal balance, gut-brain health, and metabolic well-being. Integrates clinical evidence with individual food preferences.',
    duration: '45 min', mode: 'Online or in person', consult: false
  },
  {
    id: '33333333-3333-3333-3333-333333333332',
    group: 'Body', icon: '🌿', color: '#c46442', bg: '#fcf0eb',
    name: 'Therapeutic Yoga & Somatic Movement',
    desc: '1-on-1 guided somatic movement and breathwork designed to release nervous system tension, improve body awareness, and complement psychological therapy.',
    duration: '60 min', mode: 'Online or in person', consult: false
  },
  {
    id: '44444444-4444-4444-4444-444444444441',
    group: 'Wellness', icon: '✨', color: '#b26a00', bg: '#fdf5e6',
    name: 'Mindfulness & Stress Management',
    desc: 'Practical stress reduction techniques, nervous system regulation, mindfulness-based cognitive approaches, and evidence-based tools for daily resilience.',
    duration: '45 min', mode: 'Online or in person', consult: false
  }
];

const groups = ['Start here', 'Mind', 'Body', 'Wellness'];
const groupMeta: Record<string, { icon: string; color: string; bg: string; desc: string }> = {
  'Start here': { icon: '🧭', color: '#1f5e58', bg: '#eaf3f2', desc: 'If you are not sure which specialist to see, start here. A clinical care coordinator will assess your needs and guide you to the right care.' },
  'Mind': { icon: '🧠', color: '#3f51b5', bg: '#edf0fa', desc: 'Psychiatric and psychological care for mood, anxiety, trauma, ADHD, and mental health conditions.' },
  'Body': { icon: '🌿', color: '#c46442', bg: '#fcf0eb', desc: 'Physical wellbeing through nutrition and somatic movement, connected to mental health care.' },
  'Wellness': { icon: '✨', color: '#b26a00', bg: '#fdf5e6', desc: 'Skills-based sessions for stress, resilience, mindfulness, and long-term mental fitness.' }
};

export default function ServicesPage() {
  return (
    <div className="services-page">
      <div className="services-hero">
        <div className="container">
          <Link href="/" className="back-link">← Better Mind</Link>
          <h1>Our services</h1>
          <p className="services-hero-sub">
            One coordinated care plan. Psychology, psychiatry, nutrition, yoga, and wellness — book multiple services in a single appointment.
          </p>
          <a href="/book" className="btn-primary">Book an appointment</a>
        </div>
      </div>

      <div className="container services-body">
        {groups.map(g => {
          const meta = groupMeta[g];
          const items = services.filter(s => s.group === g);
          return (
            <section key={g} className="services-group-section">
              <div className="sgs-header">
                <span className="sgs-icon" style={{ background: meta.bg }}>{meta.icon}</span>
                <div>
                  <h2 className="sgs-title" style={{ color: meta.color }}>{g}</h2>
                  <p className="sgs-desc">{meta.desc}</p>
                </div>
              </div>
              <div className="sgs-cards">
                {items.map(s => (
                  <div key={s.id} className="sgs-card">
                    <div className="sgs-card-name">{s.name}</div>
                    <div className="sgs-card-desc">{s.desc}</div>
                    <div className="sgs-card-meta">
                      <span className="meta-pill">{s.duration}</span>
                      <span className="meta-pill">{s.mode}</span>
                      {s.consult && <span className="meta-pill meta-pill-warn">Requires initial assessment first</span>}
                    </div>
                    <div className="sgs-fee">Fee: to be confirmed</div>
                    <a href="/book" className="btn-outline btn-sm">Book this service</a>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* FAQ snippet */}
        <section className="services-faq">
          <h2>Common questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <div className="faq-q">Can I book more than one service?</div>
              <div className="faq-a">Yes. Our booking flow lets you add multiple services in one visit. We check that times do not clash and assign practitioners to each session separately.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q">Do I choose my practitioner?</div>
              <div className="faq-a">You choose the service and the time. Our system assigns the most suitable available practitioner. You see their name at confirmation. If you are a returning patient, we try to match you with the same practitioner.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q">What is psychiatry vs psychology?</div>
              <div className="faq-a">A psychiatrist is a medical doctor who can diagnose and prescribe medication. A psychologist provides talk therapy and assessment. If unsure, start with our Initial Care Assessment.</div>
            </div>
            <div className="faq-item">
              <div className="faq-q">Are fees shown on the site?</div>
              <div className="faq-a">Fees are to be confirmed before launch. The booking system shows &quot;fee to confirm&quot; as a placeholder. Contact the clinic for current rates.</div>
            </div>
          </div>
        </section>
      </div>

      <div className="services-cta-bar">
        <div className="container">
          <span>Not sure where to start?</span>
          <a href="/book" className="btn-primary">Book a free initial assessment</a>
        </div>
      </div>
    </div>
  );
}
