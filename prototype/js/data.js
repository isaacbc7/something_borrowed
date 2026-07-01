/* =========================================================
   Kindred — a support network for Global Year students
   Seed data for the clickable prototype.

   Grounded in the real Global Year program (globalyear.org):
   a Christian gap year sending 18–25-year-olds to locations
   like Guatemala, Cape Verde, Mexico, Italy, and Southeast
   Asia for language school, discipleship, cultural immersion,
   and ministry through the local church. Students are
   faith-supported and raise their own support (~$13.5–15.5k).

   All people and events below are fictional.
   ========================================================= */

const DB = {

  /* ---------- Personas (who is "using" the phone) ---------- */
  personas: {
    dana: {
      id: 'dana', role: 'supporter', name: 'Dana Whitfield', short: 'Dana',
      tagline: 'Maya’s mom · Family circle',
      avatar: { initials: 'DW', hue: 'clay' },
      follows: ['maya', 'elijah'],
      circles: { maya: ['family'], elijah: ['church'] },
      weekly: { prayed: 4, needsMet: 2, encouragementSeen: 3 },
    },
    jordan: {
      id: 'jordan', role: 'supporter', name: 'Jordan Lee', short: 'Jordan',
      tagline: 'Friend from small group · Friends circle',
      avatar: { initials: 'JL', hue: 'teal' },
      follows: ['maya', 'elijah', 'sarah'],
      circles: { maya: ['friends'], elijah: ['friends'], sarah: ['friends'] },
      weekly: { prayed: 2, needsMet: 1, encouragementSeen: 2 },
    },
    riley: {
      id: 'riley', role: 'supporter', name: 'Riley Nguyen', short: 'Riley',
      tagline: 'New here · not following anyone yet',
      avatar: { initials: 'RN', hue: 'sky' },
      follows: [],
      circles: {},
      weekly: { prayed: 0, needsMet: 0, encouragementSeen: 0 },
    },
    maya: {
      id: 'maya', role: 'student', studentId: 'maya', name: 'Maya Okafor', short: 'Maya',
      tagline: 'Student · Serving in Thailand',
      avatar: { initials: 'MO', hue: 'gold' },
    },
    elijah: {
      id: 'elijah', role: 'student', studentId: 'elijah', name: 'Elijah Torres', short: 'Elijah',
      tagline: 'Student · Serving in Guatemala',
      avatar: { initials: 'ET', hue: 'forest' },
    },
    sarah: {
      id: 'sarah', role: 'student', studentId: 'sarah', name: 'Sarah Kim', short: 'Sarah',
      tagline: 'Student · Preparing for Cape Verde',
      avatar: { initials: 'SK', hue: 'teal' },
    },
    marcus: {
      id: 'marcus', role: 'coordinator', name: 'Pastor Marcus Reid', short: 'Marcus',
      tagline: 'Coordinator · Northgate Community Church',
      avatar: { initials: 'MR', hue: 'navy' },
      follows: ['maya', 'elijah', 'sarah'],
      circles: { maya: ['church'], elijah: ['church'], sarah: ['church'] },
    },
  },

  /* ---------- Students ---------- */
  students: {
    maya: {
      id: 'maya', name: 'Maya Okafor', age: 19,
      avatar: { initials: 'MO', hue: 'gold' },
      cohort: 'Global Year ’26 · Southeast Asia team', season: 'Serving', seasonHue: 'forest',
      place: 'Chiang Mai, Thailand', placePrivacy: 'City level · visible to supporters',
      church: 'Northgate Community Church · Franklin, TN',
      bio: 'Teaching English at a Christian school in Chiang Mai and running the after-school art club. Language school in the mornings, kids all afternoon.',
      why: 'I grew up hearing my grandmother’s stories about the year she spent overseas telling people about Jesus. I wanted one year that wasn’t about building my résumé — just about going and making disciples. Six months in, I’m the one being discipled.',
      mood: 'Grateful', moodEmoji: '☀️',
      supporters: 42, prayers: 318, openNeeds: 1,
      lastCheckin: 'Checked in yesterday · Grateful',
      health: 'thriving',
    },
    elijah: {
      id: 'elijah', name: 'Elijah Torres', age: 18,
      avatar: { initials: 'ET', hue: 'forest' },
      cohort: 'Global Year ’26 · Guatemala team', season: 'Serving', seasonHue: 'forest',
      place: 'Antigua, Guatemala', placePrivacy: 'City level · visible to supporters',
      church: 'Northgate Community Church · Franklin, TN',
      bio: 'Serving with a sports ministry and a house-building crew in Antigua. Language school every morning — my Spanish is now 40% soccer vocabulary.',
      why: 'A week-long trip to Guatemala my junior year wrecked me in the best way. I came home, graduated, and knew one week wasn’t enough. Global Year is my chance to stay long enough to actually love people well.',
      mood: 'Homesick', moodEmoji: '🌧️',
      supporters: 17, prayers: 64, openNeeds: 2,
      lastCheckin: 'Checked in 3 days ago · Homesick',
      health: 'needs-care',
    },
    sarah: {
      id: 'sarah', name: 'Sarah Kim', age: 20,
      avatar: { initials: 'SK', hue: 'teal' },
      cohort: 'Global Year ’26–’27 · Cape Verde team', season: 'Fundraising', seasonHue: 'gold',
      place: 'Preparing for Praia, Cape Verde', placePrivacy: 'Country level · visible to supporters',
      church: 'Northgate Community Church · Franklin, TN',
      bio: 'Raising the last of my support before joining the Cape Verde team in September — serving in a Christian school and kids’ ministry, and learning Kriolu.',
      why: 'On a short trip to Cape Verde with our church, a girl named Neusa asked when I was coming back. I didn’t have an answer then. Global Year is my answer — September to May, all in.',
      mood: 'Excited', moodEmoji: '✈️',
      supporters: 29, prayers: 141, openNeeds: 1,
      lastCheckin: 'Checked in today · Excited',
      health: 'milestone',
    },
  },

  /* ---------- Support circles ---------- */
  circles: {
    maya: [
      { id: 'family',  name: 'Family',            members: 6,  icon: 'home',
        sees: 'Personal updates, family-only prayer, all needs' },
      { id: 'mentors', name: 'Mentors',           members: 3,  icon: 'star',
        sees: 'Personal updates, wellbeing check-ins I share' },
      { id: 'care',    name: 'Private care team',  members: 4,  icon: 'shield',
        sees: 'Deeper wellbeing requests, sensitive prayer' },
      { id: 'church',  name: 'Northgate Church',   members: 21, icon: 'people',
        sees: 'General updates, public prayer, non-sensitive needs' },
      { id: 'friends', name: 'Friends',            members: 12, icon: 'sparkle',
        sees: 'General updates, public prayer requests' },
      { id: 'financial', name: 'Financial supporters', members: 9, icon: 'gift',
        sees: 'Needs tied to financial support only' },
    ],
    elijah: [
      { id: 'family',  name: 'Family',            members: 4,  icon: 'home',
        sees: 'Personal updates, family-only prayer, all needs' },
      { id: 'mentors', name: 'Mentors',           members: 2,  icon: 'star',
        sees: 'Personal updates, wellbeing check-ins I share' },
      { id: 'church',  name: 'Northgate Church',   members: 8,  icon: 'people',
        sees: 'General updates, public prayer, non-sensitive needs' },
      { id: 'friends', name: 'Friends',            members: 3,  icon: 'sparkle',
        sees: 'General updates, public prayer requests' },
    ],
    sarah: [
      { id: 'family',  name: 'Family',            members: 5,  icon: 'home',
        sees: 'Personal updates, family-only prayer, all needs' },
      { id: 'church',  name: 'Northgate Church',   members: 14, icon: 'people',
        sees: 'General updates, public prayer, non-sensitive needs' },
      { id: 'financial', name: 'Financial supporters', members: 10, icon: 'gift',
        sees: 'Needs tied to financial support only' },
    ],
  },

  /* ---------- Needs ---------- */
  needs: [
    {
      id: 'n-sarah-flight', student: 'sarah',
      title: 'Flight to Cape Verde — the final stretch',
      body: 'My year of support is 68% funded, and the last piece is my flight — it has to be booked by August 15 to make team orientation in Praia. $820 of the final $1,200 is already covered by this community. Any amount helps me finish well.',
      category: 'Travel support', icon: 'plane', urgency: 'Time-sensitive', urgencyHue: 'gold',
      due: 'Needed by Aug 15', visibility: 'All supporters',
      amount: 1200, raised: 820, multi: true, anonymousOk: true,
      status: 'open', committed: ['3 people have contributed so far'],
      posted: '5 days ago',
    },
    {
      id: 'n-maya-postage', student: 'maya',
      title: 'Care package postage',
      body: 'A few of you asked about sending art supplies for the kids’ club — the boxes are packed at Northgate, they just need international postage (about $60).',
      category: 'Practical help', icon: 'box', urgency: 'This week', urgencyHue: 'teal',
      due: 'Needed by Jul 8', visibility: 'Church & Friends',
      amount: 60, raised: 0, multi: false, anonymousOk: true,
      status: 'open', committed: [],
      posted: '2 days ago',
    },
    {
      id: 'n-maya-supplies', student: 'maya',
      title: 'Art supplies for kids’ club',
      body: 'Watercolors, brushes, and paper for 25 kids at the school. This one’s done — thank you!',
      category: 'Supplies', icon: 'box', urgency: 'Fulfilled', urgencyHue: 'forest',
      due: 'Fulfilled Jun 20', visibility: 'All supporters',
      amount: null, raised: null, multi: true, anonymousOk: false,
      status: 'fulfilled', committed: ['Fulfilled by 4 supporters'],
      posted: '3 weeks ago',
    },
    {
      id: 'n-elijah-letters', student: 'elijah',
      title: 'Letters from home',
      body: 'Real mail hits different down here. If you have ten minutes, a short letter or a photo from home would mean more than I can say.',
      category: 'Encouragement', icon: 'heart', urgency: 'Open invitation', urgencyHue: 'clay',
      due: 'Anytime', visibility: 'All supporters',
      amount: null, raised: null, multi: true, anonymousOk: true,
      status: 'open', committed: [],
      posted: '1 week ago',
    },
    {
      id: 'n-elijah-calls', student: 'elijah',
      title: 'A weekly call buddy',
      body: 'Between language school mornings and ministry afternoons, spontaneous calls never work out. I’d love one or two people willing to set a standing 20-minute call each week.',
      category: 'Communication', icon: 'phone', urgency: 'Ongoing', urgencyHue: 'teal',
      due: 'Ongoing', visibility: 'Family & Friends',
      amount: null, raised: null, multi: true, anonymousOk: false,
      status: 'open', committed: [],
      posted: '4 days ago',
    },
  ],

  /* ---------- Prayer requests ---------- */
  prayers: [
    {
      id: 'p-sarah-timeline', student: 'sarah',
      title: 'Peace about the timeline',
      body: 'Between the flight deadline, my visa paperwork, and saying goodbyes, my mind is racing. Pray that I’d raise support faithfully and rest honestly — both at once.',
      urgency: 'Could use prayer today', urgent: true,
      visibility: 'All supporters', status: 'ongoing',
      prayedCount: 18, posted: '2 days ago',
    },
    {
      id: 'p-maya-visa', student: 'maya',
      title: 'Visa renewal approval',
      body: 'My six-month visa renewal is under review. If it’s delayed, I’d miss three weeks with the kids right before their school showcase.',
      urgency: 'Ongoing', urgent: false,
      visibility: 'All supporters', status: 'ongoing',
      prayedCount: 51, posted: '1 week ago',
    },
    {
      id: 'p-maya-language', student: 'maya',
      title: 'Courage in language school',
      body: 'Thai is humbling me daily. Pray for courage to keep sounding silly until I don’t — the kids deserve a teacher who can laugh at herself.',
      urgency: 'Ongoing', urgent: false,
      visibility: 'All supporters', status: 'ongoing',
      prayedCount: 34, posted: '2 weeks ago',
    },
    {
      id: 'p-elijah-far', student: 'elijah',
      title: 'Feeling far from home',
      body: 'The distance has been heavier lately — especially evenings after the crew heads home. Pray for steadiness, and for me to reach out instead of withdrawing.',
      urgency: 'Could use prayer today', urgent: true,
      visibility: 'Family & Prayer team', status: 'ongoing',
      prayedCount: 9, posted: '3 days ago',
    },
    {
      id: 'p-elijah-ramos', student: 'elijah',
      title: 'The Ramos family’s house dedication',
      body: 'We finish their home this week — the first house I’ve worked on start to finish. Pray the dedication points everyone to Jesus, not to us.',
      urgency: 'This week', urgent: false,
      visibility: 'All supporters', status: 'ongoing',
      prayedCount: 22, posted: '5 days ago',
    },
    {
      id: 'p-sarah-team', student: 'sarah',
      title: 'Meeting my Cape Verde team well',
      body: 'I want to arrive in Praia as a learner, not a fixer. Pray for humility, quick friendships, and brave first steps in Kriolu.',
      urgency: 'Ongoing', urgent: false,
      visibility: 'All supporters', status: 'ongoing',
      prayedCount: 12, posted: '1 week ago',
    },
  ],

  /* ---------- Updates (timeline) ---------- */
  updates: [
    {
      id: 'u-maya-showcase', student: 'maya', when: 'Yesterday',
      visibility: 'All supporters', kind: 'story',
      title: 'The art show the kids planned themselves',
      body: 'Twenty-five kids turned our classroom into a gallery. Mali (age 8) sold her first painting — to me, obviously. I keep thinking: they don’t need me to be impressive, they need me to be present.',
      photo: { label: 'Kids’ art show · Chiang Mai', hue: 'gold' },
      reactions: 14, prayers: 6,
    },
    {
      id: 'u-elijah-soccer', student: 'elijah', when: '4 days ago',
      visibility: 'All supporters', kind: 'update',
      title: 'Saturday soccer is sacred now',
      body: 'Every Saturday after the house build: 14 kids, one very muddy field, zero mercy. My Spanish is now 40% soccer vocabulary and the guys have started staying after to talk about real things.',
      photo: { label: 'Saturday match · Antigua', hue: 'forest' },
      reactions: 9, prayers: 3,
    },
    {
      id: 'u-sarah-support', student: 'sarah', when: '1 week ago',
      visibility: 'All supporters', kind: 'update',
      title: 'Sixty-eight percent, and a lesson in trust',
      body: 'Support raising is the most spiritually honest thing I’ve ever done. 68% funded, 45 days to wheels-up, and I started Kriolu lessons — “N sta bem” means “I’m doing well.” Mostly true!',
      photo: { label: 'Kriolu notes · countdown wall', hue: 'teal' },
      reactions: 11, prayers: 5,
    },
    {
      id: 'u-elijah-honest', student: 'elijah', when: '3 days ago',
      visibility: 'Family & Mentors', kind: 'reflection',
      title: 'An honest one',
      body: 'I’m okay, but I miss Sunday dinners more than I expected. Writing it here because you told me not to go quiet when it gets hard. So — it’s a little hard right now.',
      photo: null,
      reactions: 4, prayers: 4,
    },
  ],

  /* ---------- Milestones ---------- */
  milestones: [
    { id: 'm-maya-bday',   student: 'maya',   date: 'Aug 3',  inDays: 33,  icon: 'cake',
      title: 'Maya’s 20th birthday', note: 'Send her a note from home — schedule it early so it lands on the day.' },
    { id: 'm-maya-retreat', student: 'maya',  date: 'Sep 12', inDays: 73,  icon: 'star',
      title: 'Mid-year cohort retreat', note: 'A week of rest, worship, and processing with her Southeast Asia team.' },
    { id: 'm-maya-home',   student: 'maya',   date: 'Dec 18', inDays: 170, icon: 'plane',
      title: 'Return home', note: 'Chiang Mai → Nashville. Start planning the welcome.' },
    { id: 'm-elijah-100',  student: 'elijah', date: 'Jul 9',  inDays: 8,   icon: 'sparkle',
      title: '100 days in Guatemala', note: 'A big marker — and a great excuse to flood him with encouragement.' },
    { id: 'm-elijah-bday', student: 'elijah', date: 'Oct 2',  inDays: 93,  icon: 'cake',
      title: 'Elijah’s 19th birthday', note: 'First birthday away from home.' },
    { id: 'm-sarah-flight', student: 'sarah', date: 'Aug 15', inDays: 45,  icon: 'plane',
      title: 'Flight booking deadline', note: 'Final travel support due so Sarah can book Nashville → Praia.' },
    { id: 'm-sarah-commission', student: 'sarah', date: 'Aug 30', inDays: 60, icon: 'star',
      title: 'Commissioning at Northgate', note: 'The church sends her out — be in the room if you can.' },
    { id: 'm-sarah-depart', student: 'sarah', date: 'Sep 2',  inDays: 63,  icon: 'globe',
      title: 'Departure to Cape Verde', note: 'Wheels up Sep 2. Program runs September to May.' },
  ],

  /* ---------- Encouragement wall ---------- */
  wall: {
    maya: [
      { from: 'Dana (Mom)', hue: 'clay', kind: 'note',
        text: '“Saw a watercolor set at the store today and cried a little. So proud of who you’re becoming.”', when: '2 days ago' },
      { from: 'Jordan', hue: 'teal', kind: 'verse',
        text: '“Let us not grow weary of doing good…” — Gal 6:9. You’re in the not-growing-weary hall of fame.', when: '5 days ago' },
      { from: 'Small group', hue: 'forest', kind: 'photo',
        text: 'Photo from home: your seat at Tuesday group, still saved.', when: '1 week ago' },
      { from: 'Pastor Marcus', hue: 'navy', kind: 'note',
        text: 'Northgate prayed for the visa on Sunday — the whole room. You are not carrying this alone.', when: '1 week ago' },
    ],
    elijah: [
      { from: 'Mom & Dad', hue: 'clay', kind: 'voice',
        text: 'Voice message · 0:48 — “Sunday dinner isn’t the same without you, kiddo…”', when: 'Yesterday' },
      { from: 'Jordan', hue: 'teal', kind: 'note',
        text: 'Fourteen kids, one muddy field, and a house with a family in it. You’re living the good stuff. Proud of you.', when: '3 days ago' },
    ],
    sarah: [
      { from: 'Northgate youth', hue: 'gold', kind: 'photo',
        text: 'Photo: the youth room countdown wall — “45 DAYS TO CAPE VERDE!”', when: '2 days ago' },
      { from: 'Grandpa Kim', hue: 'navy', kind: 'note',
        text: 'Your grandmother would have loved this. I’m covering the last of it when the time comes — you focus on packing.', when: '4 days ago' },
    ],
  },

  /* ---------- Notifications (supporter view) ---------- */
  notifications: [
    { id: 'nt1', icon: 'pray', hue: 'teal', when: '2h ago', unread: true,
      text: 'A prayer request from Sarah could use your support today.', route: '#/prayer/p-sarah-timeline' },
    { id: 'nt2', icon: 'sparkle', hue: 'gold', when: '5h ago', unread: true,
      text: 'Maya shared a new update from her Global Year journey.', route: '#/student/maya' },
    { id: 'nt3', icon: 'cake', hue: 'clay', when: 'Yesterday', unread: false,
      text: 'Elijah reaches 100 days in Guatemala on Jul 9. Send him a word from home.', route: '#/student/elijah' },
    { id: 'nt4', icon: 'check', hue: 'forest', when: '2 days ago', unread: false,
      text: 'Your encouragement was received by Maya.', route: '#/wall/maya' },
    { id: 'nt5', icon: 'heart', hue: 'navy', when: '3 days ago', unread: false,
      text: 'You haven’t checked in with Elijah recently. A quick word goes a long way.', route: '#/encourage/elijah' },
  ],

  /* ---------- Coordinator: support health ---------- */
  coordinator: {
    group: 'Northgate Community Church',
    students: ['maya', 'elijah', 'sarah'],
    signals: [
      { student: 'elijah', level: 'attention', headline: 'Could use some care',
        facts: ['No encouragement received in 6 days', '2 needs open with no commitments', 'Last check-in shared: “Homesick” (3 days ago)'] },
      { student: 'sarah', level: 'milestone', headline: 'Major milestone in 45 days',
        facts: ['Year support 68% funded', 'Flight deadline Aug 15 · departs Sep 2', 'High supporter engagement this week'] },
      { student: 'maya', level: 'healthy', headline: 'Well supported',
        facts: ['14 supporters active this week', 'All recent needs fulfilled or in progress', 'Last check-in shared: “Grateful”'] },
    ],
  },

  /* ---------- Check-in options ---------- */
  moods: [
    { label: 'Encouraged',  emoji: '🌟' },
    { label: 'Peaceful',    emoji: '🌿' },
    { label: 'Grateful',    emoji: '☀️' },
    { label: 'Excited',     emoji: '✈️' },
    { label: 'Tired',       emoji: '🌙' },
    { label: 'Homesick',    emoji: '🌧️' },
    { label: 'Overwhelmed', emoji: '🌊' },
    { label: 'Need support', emoji: '🤲' },
  ],

  needCategories: [
    'Prayer & spiritual support', 'Financial support', 'Travel support', 'Supplies',
    'Meals', 'Encouragement', 'Communication', 'Medical & wellness', 'Housing',
    'Family support', 'Practical help', 'Other',
  ],
};
