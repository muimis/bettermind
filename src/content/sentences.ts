// ====================================================================
// Better Mind: Sentence-and-Reply Content File
// Rule: Clinicians approve all reply wording. 
// This single file can be edited by clinic staff without code changes.
// ====================================================================

export interface SentenceReplyItem {
  id: string;
  sentence: string;
  startingServiceSlug: string;
  startingServiceName: string;
  replyParagraph: string;
  medicalNote?: string;
  showTalkFirst: boolean;
}

export const SENTENCE_REPLIES: SentenceReplyItem[] = [
  {
    id: 'sentence-1',
    sentence: "I don't know what to say. I just know I want to talk to someone.",
    startingServiceSlug: 'initial-assessment',
    startingServiceName: 'Initial Care Assessment & Triage',
    replyParagraph: "That is completely enough. You don’t need to prepare a speech or have your thoughts organized. In your 15-minute intake, our Lead Care Coordinator listens gently to what feels heavy and maps a comfortable starting place without pressure.",
    showTalkFirst: false,
  },
  {
    id: 'sentence-2',
    sentence: "I can't switch my head off at night.",
    startingServiceSlug: 'clinical-psychology',
    startingServiceName: 'Clinical Psychology & Psychotherapy',
    replyParagraph: "Night-time racing loops happen when your nervous system stays in vigilance. Clinical psychotherapy uses targeted Cognitive Behavioral Therapy (CBT) and grounding techniques to quiet repetitive cognitive loops and restore rest.",
    showTalkFirst: true,
  },
  {
    id: 'sentence-3',
    sentence: "I start things and can't finish them. Work keeps slipping.",
    startingServiceSlug: 'initial-assessment',
    startingServiceName: 'Initial Care Assessment & Triage',
    replyParagraph: "Chronic executive overwhelm can stem from adult ADHD, burnout, or unmanaged anxiety. An initial intake assesses whether diagnostic neurodevelopmental screening or behavioral executive coaching is your best first step.",
    showTalkFirst: false,
  },
  {
    id: 'sentence-4',
    sentence: "Something happened a long time ago and it still follows me.",
    startingServiceSlug: 'clinical-psychology',
    startingServiceName: 'Clinical Psychology & Psychotherapy',
    replyParagraph: "Trauma stays stored in nervous system memory long after the event passes. Our senior clinical psychologists use evidence-backed EMDR and Acceptance & Commitment Therapy (ACT) in a safe, confidential environment to help release unhealed memories.",
    showTalkFirst: true,
  },
  {
    id: 'sentence-5',
    sentence: "My stomach hurts and the tests keep coming back clear.",
    startingServiceSlug: 'initial-assessment',
    startingServiceName: 'Initial Care Assessment & Triage',
    replyParagraph: "Over 90% of your body’s serotonin is synthesized in the enteric nervous system (the gut-brain axis). When psychological stress inflames the gut, standard physical tests often show normal results. We connect you with gut-brain nutrition and somatic calming.",
    medicalNote: "Please note: If your gastrointestinal symptoms are sudden, severe, or unexplained, please ensure you have consulted a gastroenterologist or primary physician first.",
    showTalkFirst: true,
  },
  {
    id: 'sentence-6',
    sentence: "I think I need medication, or someone to look at mine.",
    startingServiceSlug: 'psychiatry-consultation',
    startingServiceName: 'Psychiatry Consultation',
    replyParagraph: "Neurotransmitter chemistry and circadian biology sometimes require careful medical evaluation. Dr. Arun Nair provides an objective diagnostic workup of your neurochemistry and monitored, conservative medication protocols.",
    medicalNote: "Important medical safety rule: Never discontinue, start, or alter any psychiatric medication without medical guidance. If you are experiencing acute withdrawal or side effects, seek immediate clinical assistance.",
    showTalkFirst: true,
  },
  {
    id: 'sentence-7',
    sentence: "I want to change how I eat and I don't know where to start.",
    startingServiceSlug: 'dietetics-nutrition',
    startingServiceName: 'Clinical Dietetics & Gut-Brain Nutrition',
    replyParagraph: "Food deeply influences brain inflammation and daily energy. Priya Sharma analyzes your routine and designs a realistic, anti-inflammatory dietary plan built around authentic Indian foods to support emotional stability.",
    showTalkFirst: true,
  },
  {
    id: 'sentence-8',
    sentence: "I'm tense all day and my body never lets go.",
    startingServiceSlug: 'therapeutic-yoga',
    startingServiceName: 'Therapeutic Yoga & Somatic Movement',
    replyParagraph: "When the body is trapped in sympathetic fight-or-flight, cognitive talk alone cannot release physical fascia tension. Rajesh Kumar guides you through gentle polyvagal somatic movement, vagus nerve stimulation, and restorative autonomic breathwork.",
    showTalkFirst: true,
  },
  {
    id: 'sentence-9',
    sentence: "Work has worn me down and rest doesn't fix it.",
    startingServiceSlug: 'mindfulness-stress-management',
    startingServiceName: 'Mindfulness & Stress Management',
    replyParagraph: "Burnout occurs when nervous system reserves are depleted beyond ordinary sleep recovery. Our wellness sessions rebuild autonomic recovery capacity through circadian nervous system recalibration and practical boundary design.",
    showTalkFirst: true,
  }
];

// First-Session Timeline (Five Stages)
export const FIRST_SESSION_STAGES = [
  {
    step: '01',
    title: 'Unhurried Listening',
    duration: 'First 15 mins',
    desc: 'You speak at your own pace. There is no interrogation or ticking clock. Your clinician listens to what brought you here without judgment.'
  },
  {
    step: '02',
    title: 'Pattern Identification',
    duration: 'Minutes 15–30',
    desc: 'Together, we trace the connections between your thoughts, emotional distress, physical body sensations, and lifestyle stressors.'
  },
  {
    step: '03',
    title: 'Collaborative Mapping',
    duration: 'Minutes 30–45',
    desc: 'Your clinician explains what they observe and discusses potential modalities (CBT, somatic release, gut protocol) with you.'
  },
  {
    step: '04',
    title: 'Immediate Grounding Tool',
    duration: 'Minutes 45–50',
    desc: 'You leave session one with one practical, tangible tool to stabilize your nervous system or thinking loops right now.'
  },
  {
    step: '05',
    title: 'Care Coordination Note',
    duration: 'After session',
    desc: 'Your care plan is documented on your unified chart, coordinating seamlessly with any other specialist you see at Better Mind.'
  }
];
