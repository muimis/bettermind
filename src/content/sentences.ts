// ====================================================================
// Better Mind: Human-Centered Content File
// Written for real humans living in a fast-paced, high-demand world.
// Zero clinical labels, zero pathology, zero treating visitors as patients.
// ====================================================================

export interface SentenceReplyItem {
  id: string;
  sentence: string;
  startingServiceSlug: string;
  startingServiceName: string;
  replyParagraph: string;
  practitionerName: string;
  fee: string;
  duration: string;
  showTalkFirst: boolean;
}

export const SENTENCE_REPLIES: SentenceReplyItem[] = [
  {
    id: 'sentence-1',
    sentence: "My mind is running at 100 mph and I can't switch off at night.",
    startingServiceSlug: 'clinical-psychology',
    startingServiceName: 'Psychotherapy with Dr. Meera Sen',
    practitionerName: 'Dr. Meera Sen',
    fee: '₹1,800',
    duration: '50 min',
    replyParagraph: "When your thoughts won't pause, your nervous system is simply over-stimulated from high-demand days. Dr. Meera helps you unpack that cognitive load and gives you quiet, practical techniques to ease into deep, restorative sleep.",
    showTalkFirst: true,
  },
  {
    id: 'sentence-2',
    sentence: "I'm working hard, but my focus feels scattered and things are slipping.",
    startingServiceSlug: 'initial-assessment',
    startingServiceName: 'Focus & Mental Clarity with our Care Team',
    practitionerName: 'Care Coordination Desk',
    fee: 'Free',
    duration: '15 min',
    replyParagraph: "Attention fatigue happens when your mental bandwidth is pushed to its limit. We help you untangle cognitive overwhelm, prioritize clearly, and evaluate whether your focus needs biological support or simple pacing routines.",
    showTalkFirst: false,
  },
  {
    id: 'sentence-3',
    sentence: "I hold stress in my neck, shoulders, and jaw all day long.",
    startingServiceSlug: 'therapeutic-yoga',
    startingServiceName: 'Somatic Bodywork with Rajesh Kumar',
    practitionerName: 'Rajesh Kumar',
    fee: '₹1,400',
    duration: '60 min',
    replyParagraph: "Mental tension always registers in the physical body. Rajesh Kumar guides gentle breathwork and somatic movement to help contracted muscles finally let go so your whole body can breathe again.",
    showTalkFirst: true,
  },
  {
    id: 'sentence-4',
    sentence: "I just need an unhurried, confidential space to unpack my thoughts.",
    startingServiceSlug: 'initial-assessment',
    startingServiceName: 'A gentle 15-minute chat with Ananya',
    practitionerName: 'Ananya (Care Coordinator)',
    fee: 'Free',
    duration: '15 min',
    replyParagraph: "You don't need a presentation, an agenda, or the right words. Start with a quiet, 15-minute conversation with our Care Coordinator, Ananya. She listens, answers your questions, and helps you begin comfortably.",
    showTalkFirst: false,
  },
  {
    id: 'sentence-5',
    sentence: "Work has drained my battery, and a weekend off doesn't recharge me.",
    startingServiceSlug: 'mindfulness-stress-management',
    startingServiceName: 'Restorative Care & Burnout Reset',
    practitionerName: 'Rajesh Kumar & Care Team',
    fee: '₹1,400',
    duration: '50 min',
    replyParagraph: "When depletion runs deep, more time on the couch isn't enough. We help you reset your nervous system, build healthy boundaries, and restore a daily rhythm that leaves you feeling alive at the end of the day.",
    showTalkFirst: true,
  },
  {
    id: 'sentence-6',
    sentence: "My stomach feels uneasy or tight whenever my schedule gets intense.",
    startingServiceSlug: 'dietetics-nutrition',
    startingServiceName: 'Gut-Brain Balance with Priya Sharma',
    practitionerName: 'Priya Sharma',
    fee: '₹1,500',
    duration: '45 min',
    replyParagraph: "Your gut and brain share a direct nervous communication pathway. Priya Sharma helps you nourish your body with wholesome, calming meals that support digestion and steady your daily energy without complicated restrictions.",
    showTalkFirst: true,
  },
  {
    id: 'sentence-7',
    sentence: "I want to review my wellness prescriptions or supplements with an expert.",
    startingServiceSlug: 'psychiatry-consultation',
    startingServiceName: 'Medical Consultation with Dr. Arun Nair',
    practitionerName: 'Dr. Arun Nair',
    fee: '₹2,200',
    duration: '45 min',
    replyParagraph: "Dr. Arun Nair provides an unhurried, thoughtful review of your prescriptions, sleep aids, and wellness supplements to ensure everything you take genuinely serves your long-term vitality.",
    showTalkFirst: true,
  },
  {
    id: 'sentence-8',
    sentence: "Something from the past still feels heavy in my day-to-day decisions.",
    startingServiceSlug: 'clinical-psychology',
    startingServiceName: 'Psychotherapy with Dr. Meera Sen',
    practitionerName: 'Dr. Meera Sen',
    fee: '₹1,800',
    duration: '50 min',
    replyParagraph: "Old experiences can cast long shadows over present confidence. In a warm, judgment-free space, we help you process past events so you can move forward feeling grounded and clear.",
    showTalkFirst: true,
  },
  {
    id: 'sentence-9',
    sentence: "I want to improve how I eat for steady mood and energy, without crazy diets.",
    startingServiceSlug: 'dietetics-nutrition',
    startingServiceName: 'Whole-Food Nourishment with Priya Sharma',
    practitionerName: 'Priya Sharma',
    fee: '₹1,500',
    duration: '45 min',
    replyParagraph: "No extreme restrictions or guilt. Priya Sharma crafts sensible, delicious nutrition strategies using foods you already enjoy to stabilize your focus and keep your energy high all day.",
    showTalkFirst: true,
  }
];

// Human, Relatable First-Session Stages
export const FIRST_SESSION_STAGES = [
  {
    step: '01',
    title: 'Settle in',
    duration: 'First 10 mins',
    desc: 'Take your time. Grab water or tea. There is no checklist, no ticking clock, and no pressure to have everything figured out.'
  },
  {
    step: '02',
    title: 'Unpack without judgment',
    duration: 'Minutes 10–30',
    desc: 'You speak, we listen. We explore what has been draining your focus or energy, without any clinical labels.'
  },
  {
    step: '03',
    title: 'Find practical clarity',
    duration: 'Minutes 30–45',
    desc: 'Together, we identify simple shifts — whether mindful therapy, nourishing food, or physical unwinding — at your speed.'
  },
  {
    step: '04',
    title: 'A tool for tonight',
    duration: 'Minutes 45–50',
    desc: 'You leave session one with a simple, tangible technique you can use before bed tonight to feel calmer.'
  },
  {
    step: '05',
    title: 'A quiet, coordinated team',
    duration: 'Ongoing',
    desc: 'If you ever explore another specialist here, they coordinate quietly so you never have to repeat your story.'
  }
];

