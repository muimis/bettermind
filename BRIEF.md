# Better Mind: Antigravity build brief

Oct 27, 2026 · @Muhaimin

## Summary

Better Mind is one online clinic with many services, and the booking app books the clinic, not a person. A patient picks services, a time for each, and online or in person. The system holds a free practitioner from that service's pool, and the patient sees the name when they confirm.

Three things shape the whole build:

- **Clinic-level booking.** Patients choose services. Staff control who delivers them.
- **Several services in one booking,** with times that cannot clash.
- **Services are data.** Yoga, wellness or any new stream is added by staff, not by a developer.

The [concept page](https://claude.ai/artifact/QgCfYFXWjjeMXdgHRBajv4) is the reference for flow and tone. Give Antigravity this document and that page together. Anything marked to confirm is a placeholder until the client decides.

## What to give Antigravity first

Antigravity builds only as well as the facts you hand it. Collect these before the first build session. "Phase 1" items stop the first build if missing; the rest can follow.

**Brand and content**

| Item | Needed for | Why |
| --- | --- | --- |
| Clinic name and tagline | Phase 1 | The name is Better Mind. Check it is free to use before buying a domain or printing anything. |
| Domain name and one clinic email address | Phase 1 | Confirmations and the site address depend on them. |
| Practitioner names and the services each delivers | Phase 1 | Patients see the name at confirmation. |
| Qualifications, registration details, languages, photos | Before launch | Patients check these before they trust a clinic. |
| Logo, colours, and a choice of Clinical or Warm tone | Before launch | The concept uses placeholders. |
| Page copy: home, services, FAQs, "what happens in a first session" | Before launch | The clinicians should write or approve it. |
| Clinic address, hours, map link | Phase 1 | Needed for in-person sessions. |
| Languages the site must support | Phase 1 | Adding a language switch later costs more than building it in. |

**How the clinic runs**

| Item | Needed for | Why |
| --- | --- | --- |
| Service list: name, group, description, online or in person or both | Phase 1 | This becomes the service catalogue. |
| Session length per service, and the gap needed between sessions | Phase 1 | Slot logic depends on it. |
| Working hours and planned leave for each practitioner | Phase 1 | Slots are built from them. |
| Minimum notice to book, and how far ahead patients can book | Phase 1 | Stops last-minute and far-future bookings. |
| Cancel and reschedule rules, and any fee | Phase 1 | The app enforces them. |
| Which services need an initial consultation first | Phase 1 | The clinicians decide this, for psychiatry especially. |
| Who owns the initial consultation and triage | Phase 1 | One named person, or bookings stall. |
| Who staffs the desk, and how fast a booking is confirmed | Before launch | Sets the promise the site can make. |
| Fees per service and package prices | Phase 2 | Shown as "to be decided" until then. |
| Payment: at booking, after the session, or both | Phase 2 | Changes the booking flow. |

**Accounts you create, in the clinic's name**

| Item | Needed for | Why |
| --- | --- | --- |
| Domain, hosting and database accounts | Phase 1 | The clinic must own them, not you or a developer. Choose an India region where offered. |
| Video tool: Google Meet, Zoom or similar | Phase 1 | Decides how session links are made. |
| Payment gateway account (Razorpay or similar) | Phase 2 | Needs the clinic's business details and bank account. |
| Email sender, WhatsApp Business provider, SMS provider | Phase 2 | Start early. Commercial SMS in India needs sender and template registration (DLT). |

**Advice to get before launch (not for Antigravity)**

- How the Digital Personal Data Protection Act, 2023 applies to patient data.
- Telemedicine rules for online consultations, especially psychiatry and any prescribing.
- The Mental Healthcare Act, 2017, and any state clinic registration the practice needs.
- Wording for consent, privacy policy and terms.

I have not checked how these apply to Better Mind. Ask a lawyer or the professional bodies.

## What is probably missing

These gaps are not in the concept page yet, and each needs a decision before launch. The last column is my suggested default.

| Gap | Why it matters | Suggested decision |
| --- | --- | --- |
| Crisis path | Someone in acute distress may use a booking form. The app is not an emergency service. | Name who watches new bookings and notes, what they do when a note signals risk, and put the same crisis wording on every page. |
| Booking for someone else, or a minor | Parents book for children, and consent rules differ. | Add "Who is this for?" to the form and set the clinic's rules for minors and guardian consent. |
| Returning patients | Therapy repeats, and patients expect the same practitioner. | Keep the same practitioner by default. Manage bookings through a secure link, not a login, to start. |
| Reminder wording | A reminder on a shared phone can reveal which service someone booked. | Use neutral wording such as "Your Better Mind appointment". Get consent before WhatsApp or SMS reminders. |
| Clinical records | Notes and prescriptions are sensitive and regulated. | Keep them out of the booking app in version 1. Decide where clinicians keep records. |
| Session links | A shared or guessed link exposes a session. | One unique link per session, no recording by default, and a waiting room if the video tool offers one. |
| Staff access | Not everyone should see every patient. | Coordinator, practitioner and admin roles. Practitioners see only their own patients. Log who viewed what. |
| Preferences | Patients often want a practitioner of a certain gender or language. | Decide whether the form asks, and whether staff can honour it. |
| App goes down | A booking channel that fails loses patients. | A staffed phone or WhatsApp number, and a way for staff to enter a booking by hand in the desk. |
| Data ownership | Clinics change tools over the years. | The clinic owns all data and can export it as a file at any time. |
| Phones and slow networks | Many patients will book on a phone. | Test on a low-end phone and a weak connection. Keep pages light. |

## What makes it different and how it earns

The edge is that one booking can cover a person's whole care plan, while the clinic keeps control of who delivers it. Single-practitioner booking tools cannot do that. These are ideas with no revenue figures behind them; test each one with the client.

| Idea | What the patient gets | Why it should earn | Built in |
| --- | --- | --- | --- |
| Whole care plan in one booking | Psychology, nutrition and yoga arranged in one visit to the site | More services per patient, and fewer people lost between appointments | Phase 1 |
| "Not sure" start | No need to know which specialist to see | Keeps patients who would leave; the coordinator routes them | Phase 1 |
| Services added by staff after a consultation | A link to choose a time for what the clinician advised | Cross-selling that follows clinical advice, not a sales push | Phase 1 |
| Reminders, easy rescheduling, optional deposit | Less effort to keep an appointment | An empty slot is lost income, so fewer no-shows matter | Phase 2 |
| Packages | Pay once for a set of sessions | Money arrives earlier and treatment is less likely to lapse | Phase 3 |
| Recurring bookings | Same practitioner, same time each week | Predictable income and continuity of care | Phase 3 |
| Group sessions and workshops | A lower price in a group setting | Many seats on one practitioner's time | Phase 3 |
| Corporate and school programmes | Employer-paid support | A second kind of customer | Phase 3 |
| Waitlist and earlier-slot offers | A sooner appointment if one opens | Income from time that would go unused | Phase 3 |
| Trust built into the pages | Names, credentials, a plain guide to the first session, visible fees | More visitors finish a booking | Phase 1 and 2 |
| Patient's own language | The site and reminders in the language they speak | Reaches patients an English-only site loses | Phase 4 |

**What to track from day one**

- Visitors who start a booking, and the share who finish it
- Bookings with more than one service
- Sessions attended against sessions booked
- Repeat sessions per patient
- Time from booking request to confirmation
- How full each practitioner's calendar is
- Revenue per patient

No number here is a target. Set targets after the first month of real data.

## Booking rules the app must follow

The database, not the screen, enforces these rules, so a bug in a page cannot create a double booking. Antigravity should treat this list as the specification.

**Time and capacity**

- A practitioner holds at most one booking in any time block. The database rejects an overlap even when two patients tap the same slot at the same moment.
- A service shows a time only if at least one practitioner in its pool is free then.
- A time chosen for one service is blocked for the patient's other services in the same booking.
- In-person sessions need a minimum gap between them, and the clinic sets it.
- A chosen time is held for a few minutes while the patient fills in details. The hold expires on its own and frees the slot.

**Assigning the practitioner**

- The patient chooses the service and time. The system picks the practitioner when the booking is confirmed.
- A returning patient gets their previous practitioner for that service if that person is free.
- Otherwise the system applies the clinic's rule: recorded language or gender preference first, then the lightest week.
- Staff can reassign. The list offers only practitioners who are free at that time, and the patient is told about the change.
- The patient sees the practitioner's name at confirmation and in every reminder.

**Changes**

- Patients reschedule or cancel through a secure link, inside the clinic's notice rule. Inside that window only staff can change a booking.
- A cancelled booking frees its slot immediately.
- Staff can add a service to an existing booking. The patient gets a link to choose a time, and the service stays "awaiting time" until they do.
- Staff can enter a booking for a patient who phones or messages.

**Settings the clinic controls**

- Services that need an initial consultation first
- Minimum notice, and how far ahead patients can book
- Gap between sessions
- Cancel window and any fee
- Opening hours and leave for each practitioner

## Screens and features

The patient side is built for a phone first and takes no account. The staff desk is where the clinic runs the service. The concept page already shows the patient flow and a demo desk.

**Patient side**

- Home, Services (grouped as Start here, Mind, Body, Wellness), Care team, Book
- Booking in three steps: choose services, choose online or in person and a time for each, then enter details
- Several services in one booking. A time already taken by another service in the basket is blocked, with a plain reason
- A summary that stays in view while booking
- Confirmation showing each service, time, mode and practitioner name
- A secure link to view, reschedule or cancel a booking
- FAQ, "what happens in a first session", privacy policy, terms, consent wording
- A crisis-help line on every page
- Large tap targets, readable text, keyboard and screen-reader support, light pages on weak connections

**Staff desk (login required)**

- Today's view, a calendar by practitioner, and a list of bookings with filters
- Reassign, reschedule, cancel, add a service to a booking, enter a booking by hand
- Manage services: name, group, description, online or in person, length, fee, active or hidden
- Manage practitioners: profile, the services they deliver, working hours, leave
- Manage clinic rules: notice, gap, cancel window, services needing an initial consultation
- Reports for the numbers listed earlier, and an export to a file
- A log of who viewed or changed what
- Roles: coordinator, practitioner (own calendar and patients only), admin

**Left out of version 1 on purpose**

- Clinical notes and prescriptions
- Patient logins and a patient portal
- Online payment (arrives in Phase 2)
- Packages, recurring bookings, group events, corporate pages (Phase 3)

## Tech, data and security

Use a mainstream stack that Antigravity handles well, with a Postgres database that can refuse overlapping bookings by itself. This is my recommendation; Antigravity can propose changes in its plan.

| Part | Choice | Why |
| --- | --- | --- |
| Front end | Next.js with TypeScript | Widely used, and server rendering helps the site appear in search. |
| Database and staff login | Supabase (Postgres) | Postgres can reject overlapping bookings, and row-level security limits who sees what. |
| Hosting | Vercel or similar | Simple deploys. Choose an India region where offered. |
| Payments (Phase 2) | Razorpay | Built for Indian cards and UPI. |
| Email, WhatsApp, SMS (Phase 2) | A transactional email service, a WhatsApp Business provider, a registered SMS provider | Reminders and confirmations. |
| Video | A Google Meet or Zoom link created for each session | Patients join from one link. |
| Safety net | Error alerts and daily database backups | A booking system that fails silently loses patients. |

**Main tables**

- Services, practitioners, and the pool linking each service to its practitioners
- Weekly working hours and time off for each practitioner
- Patients: name, contact, language, consent record
- Bookings, and booking items (one per service: mode, start, end, practitioner, status)
- Holds: a temporary claim on a slot that expires
- Staff users with roles, a notification log, and an audit log

The key rule: the database refuses two active items for one practitioner in overlapping times. Confirming a booking runs as one transaction, so a clash fails cleanly and the patient picks another time.

**Privacy and security**

- Collect the minimum: name, contact, language and an optional note. No diagnoses.
- Encrypt data in transit and at rest, and back it up daily.
- Staff log in with strong passwords and a second step.
- Row-level security so practitioners see only their own patients.
- Record consent with the time and the version of the wording.
- Patient links are signed, expire, and carry no personal details.
- No tools that send patient details to third parties. Keep cookies minimal.
- Keep secret keys in environment settings, never in the code.
- Agree a retention and deletion policy with legal advice before launch.

## Build phases and acceptance tests

Build in four phases. Each ends with a gate, and the next phase starts only when the gate passes. Public launch comes after Phase 2.

**Tests to run at every phase**

- Two people book the last open slot at the same moment. Exactly one succeeds and the other is offered other times.
- A patient books three services. No two overlap, and in-person sessions keep the minimum gap.
- A cancelled booking frees its slot at once, and another patient can take it.
- The reassign list shows only practitioners who are free at that time.
- A practitioner on leave never appears free.
- A hold that is not completed expires and the slot returns.
- A practitioner cannot open another practitioner's patient.
- Staff add a new service and it appears in booking with no code change.
- Times show in IST whatever time zone the patient's device uses.
- The crisis line appears on every page.
- Reminders never name the service.
- The main booking flow works on a low-end phone over a weak connection, by keyboard alone, and with a screen reader.
- The export file contains every booking.

## First prompt to paste into Antigravity

Start by asking Antigravity for a plan, not code. You review the plan, then it builds.

1. Make a new folder for the project. Export this document as Markdown and save it there as BRIEF.md. Save the concept page file as reference/concept.html.
2. Open that folder as the workspace in Antigravity.
3. Choose Planning mode for this first task. Antigravity describes Planning as the mode for larger, multi-file work, and Fast mode skips the plan.
4. Paste the prompt below.
5. Read the plan it produces and comment on it before you say go.
6. Never paste real patient data or live passwords and keys into any prompt.

Antigravity was in public preview when I checked, and access depended on your Google account and region. Confirm it works on yours before the client meeting.

```text
You are building the website and booking app for Better Mind, an online clinic that offers several services: psychology, psychiatry, dietitian, yoga, wellness, and others added later. Some sessions are online and some are in person.

Before anything else, read BRIEF.md and open reference/concept.html. The concept is the reference for flow, tone and screens. BRIEF.md is the specification.

Do not write code yet. First give me an implementation plan that covers:
1. Your assumptions, and any questions you need answered. Mark each as blocking or not.
2. The database design, including how the database will refuse overlapping bookings for a practitioner.
3. The order you will build things in, and how you will test each step.
4. Anything in BRIEF.md that you think is wrong, unclear or missing.
Then stop and wait for my approval.

Core rules (full detail is in BRIEF.md):
- Patients book the clinic, not a person. They choose services, online or in person, and a time for each.
- One booking can hold several services. Their times must never overlap.
- The system assigns a free practitioner from the service's pool when the booking is confirmed. The patient sees the practitioner's name at confirmation.
- Staff can reassign, reschedule, cancel and add a service to a booking from a login-protected desk.
- Services are data. Staff can add or hide a service without changing code.
- The database enforces no double booking. Do not rely on the screen for this.
- All times are IST. The patient side is phone-first, needs no account, and shows the crisis-help line on every page.
- Collect the minimum patient data. No clinical notes or prescriptions in this version.

Scope for this build: Phase 1 only. That means the public pages, the booking flow and the staff desk, with no online payment.

Stack: Next.js with TypeScript, and Supabase (Postgres) for data and staff login. Tell me in the plan if you recommend something else.

Content: use clearly labelled sample data. Do not invent fees, qualifications, registration numbers, addresses or practitioner names. Anything unknown stays marked "to confirm".

After I approve the plan, build in this order: database and booking rules with tests, then the staff desk, then the patient booking flow, then the public pages. After each step, tell me what changed, how to run it, what you tested, and what you are unsure about. At the end of Phase 1, run every acceptance test listed in BRIEF.md and show me the results.
```

Source: [OpenReplay's guide to Antigravity](https://blog.openreplay.com/google-antigravity-ide-guide/), read for the modes and the preview status.
