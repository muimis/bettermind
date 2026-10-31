// ====================================================================
// Better Mind: High-Acuity Reflection Content
// Crafted for discerning thinkers, founders, leaders, and individuals
// navigating relentless cognitive, emotional, and physical demands.
// Zero diagnostic stigma, zero clinical pathology, 100% human discretion.
// ====================================================================

export interface SentenceReplyItem {
  id: string;
  category: string;
  sentence: string;
  startingServiceSlug: string;
  startingServiceName: string;
  practitionerName: string;
  credentials: string;
  fee: string;
  duration: string;
  replyParagraph: string;
  mechanism: string;
  actionLabel: string;
}

export const SENTENCE_REPLIES: SentenceReplyItem[] = [
  {
    id: 'sentence-1',
    category: 'Cognitive Rhythm',
    sentence: "My mind operates at relentless speed and will not switch off at night.",
    startingServiceSlug: 'clinical-psychology',
    startingServiceName: 'Psychotherapy & Cognitive Clarity',
    practitionerName: 'Dr. Meera Sen, Ph.D.',
    credentials: 'Senior Clinical Psychologist · NIMHANS alumna',
    fee: '₹1,800',
    duration: '50 min',
    mechanism: 'Cognitive Over-Arousal & Prefrontal Loop',
    replyParagraph: "When thoughts refuse to pause, your prefrontal cortex is simply locked in hyper-vigilance from high-demand days. Dr. Meera Sen helps you unpack the cognitive friction beneath the noise and provides structured, unhurried tools to restore mental quiet before sleep.",
    actionLabel: 'Reserve with Dr. Meera Sen'
  },
  {
    id: 'sentence-2',
    category: 'Autonomic System',
    sentence: "I carry persistent physical tension in my neck, chest, and jaw all day.",
    startingServiceSlug: 'therapeutic-yoga',
    startingServiceName: 'Somatic Breath & Tension Release',
    practitionerName: 'Rajesh Kumar, M.Sc.',
    credentials: 'Somatic Therapist & Polyvagal Specialist · SVYASA alumnus',
    fee: '₹1,400',
    duration: '60 min',
    mechanism: 'Sympathetic Muscle Guarding & Vagal Tonus',
    replyParagraph: "Cognitive stress invariably registers as chronic muscular guarding. Through targeted polyvagal breathwork and subtle somatic unwinding, Rajesh Kumar guides your autonomic nervous system out of fight-or-flight overdrive so your body can finally exhale.",
    actionLabel: 'Reserve Somatic Session'
  },
  {
    id: 'sentence-3',
    category: 'Energy & Resilience',
    sentence: "Deep exhaustion has set in, and a weekend away no longer restores me.",
    startingServiceSlug: 'initial-assessment',
    startingServiceName: 'Care Orientation & Burnout Protocol',
    practitionerName: 'Ananya Roy, MSW',
    credentials: 'Lead Practice Coordinator · TISS alumna',
    fee: 'Complimentary',
    duration: '15 min',
    mechanism: 'Neuro-Endocrine Depletion & Chronic Allostatic Load',
    replyParagraph: "When burnout penetrates deeply, passive rest is insufficient. We conduct an unhurried 15-minute intake to evaluate your cognitive, hormonal, and circadian rhythms, designing an integrated multi-disciplinary recovery roadmap tailored to your schedule.",
    actionLabel: 'Schedule 15m Intake'
  },
  {
    id: 'sentence-4',
    category: 'Gut-Brain Axis',
    sentence: "High-pressure weeks immediately trigger stomach distress and brain fog.",
    startingServiceSlug: 'dietetics-nutrition',
    startingServiceName: 'Gut-Brain Clinical Nutrition',
    practitionerName: 'Priya Sharma, RD',
    credentials: 'Lead Clinical Dietitian · Manipal alumna & IDA Certified',
    fee: '₹1,500',
    duration: '45 min',
    mechanism: 'Enteric Nervous System & Serotonin Synthesis',
    replyParagraph: "Over 90% of your serotonin is produced within the gastrointestinal tract. Priya Sharma analyzes how chronic cortisol disrupts your enteric nervous system, prescribing a functional, Indian whole-food framework that settles digestion and stabilizes daytime cognitive stamina.",
    actionLabel: 'Reserve Nutrition Session'
  },
  {
    id: 'sentence-5',
    category: 'Neurobiology',
    sentence: "I want an expert medical review of my sleep, medications, or neurobiology.",
    startingServiceSlug: 'psychiatry-consultation',
    startingServiceName: 'Consultative Neuropsychiatry',
    practitionerName: 'Dr. Arun Nair, MD',
    credentials: 'Senior Consultant Psychiatrist · NIMHANS alumnus',
    fee: '₹2,200',
    duration: '45 min',
    mechanism: 'Neurochemical Modulation & Sleep Architecture',
    replyParagraph: "Dr. Arun Nair provides an unhurried, considerate evaluation of neurochemical factors, circadian rhythms, and existing prescriptions. Consultations are conservative, evidence-based, and harmonized with psychological and somatic modalities.",
    actionLabel: 'Reserve with Dr. Arun Nair'
  },
  {
    id: 'sentence-6',
    category: 'Private Counsel',
    sentence: "I need an unhurried, confidential sounding board to navigate complex life demands.",
    startingServiceSlug: 'clinical-psychology',
    startingServiceName: 'Psychotherapy & Strategic Clarity',
    practitionerName: 'Dr. Meera Sen, Ph.D.',
    credentials: 'Senior Clinical Psychologist · NIMHANS alumna',
    fee: '₹1,800',
    duration: '50 min',
    mechanism: 'Relational Integration & Cognitive Reframing',
    replyParagraph: "High-functioning individuals frequently navigate acute emotional isolation. This is an entirely confidential, protected sanctuary to process complex relational dynamics, leadership pressure, and life transitions with zero judgment.",
    actionLabel: 'Reserve Private Session'
  }
];

export const FIRST_SESSION_STAGES = [
  {
    step: '01',
    title: 'Unhurried Arrival',
    duration: 'First 10 mins',
    desc: 'Take your time. Grab tea or settle into your private room. There is no diagnostic questionnaire, no ticking clock, and zero expectation to have everything organized.'
  },
  {
    step: '02',
    title: 'Discreet Dialogue',
    duration: 'Minutes 10–30',
    desc: 'You speak; we listen. We explore the internal and external friction points draining your cognitive bandwidth, without pathologizing your experience.'
  },
  {
    step: '03',
    title: 'Integrative Architecture',
    duration: 'Minutes 30–45',
    desc: 'Together, we identify the exact root levers — cognitive reframing, autonomic nervous reset, or metabolic nourishment — paced entirely to your comfort.'
  },
  {
    step: '04',
    title: 'An Immediate Restorative Tool',
    duration: 'Minutes 45–50',
    desc: 'You leave session one with a precise, tangible nervous system technique or cognitive grounding practice to use tonight before bed.'
  },
  {
    step: '05',
    title: 'Silent Synchronization',
    duration: 'Ongoing Care',
    desc: 'If your care incorporates multiple faculties, our clinicians coordinate quietly behind the scenes on one unified medical record so you never have to repeat your story.'
  }
];
