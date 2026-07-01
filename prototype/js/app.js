/* =========================================================
   Kindred — Global Year support network
   Prototype application: router, role-adaptive screens,
   circle-based privacy model, sheets, micro-interactions.
   ========================================================= */

'use strict';

/* ---------------- Helpers ---------------- */
const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const haptic = (ms = 12) => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) { /* no-op */ } };

/* ---------------- Icon set (stroke, SF-symbol-ish) ---------------- */
const ICONS = {
  home: '<path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  people: '<circle cx="9" cy="8" r="3.4"/><path d="M2.7 20c.4-3.4 3-5.5 6.3-5.5s5.9 2.1 6.3 5.5"/><path d="M16.2 5.9a3 3 0 1 1 1.4 5.7"/><path d="M17.5 14.6c2.4.5 4 2.2 4.3 4.9"/>',
  person: '<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20.5c.5-4 3.5-6.3 7.5-6.3s7 2.3 7.5 6.3"/>',
  pray: '<path d="M11.6 21.2C9.3 19.6 6.8 16.4 6.8 12.7V8.1c0-1.2.9-2.1 2-2.1s2 .9 2 2.1v5"/><path d="M12.4 21.2c2.3-1.6 4.8-4.8 4.8-8.5V8.1c0-1.2-.9-2.1-2-2.1s-2 .9-2 2.1v5"/><path d="M12 21.4V13"/>',
  heart: '<path d="M12 20.5S4 15.2 4 9.7A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 8 2.7c0 5.5-8 10.8-8 10.8z"/>',
  gift: '<rect x="3.5" y="8" width="17" height="4" rx="1"/><path d="M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8M12 8v13"/><path d="M12 8s-1.2-4.5-4-4.5C6 3.5 5.6 6.6 8 8z"/><path d="M12 8s1.2-4.5 4-4.5c2 0 2.4 3.1 0 4.5z"/>',
  bell: '<path d="M18 8.5a6 6 0 1 0-12 0c0 6.5-2.5 7.5-2.5 7.5h17S18 15 18 8.5"/><path d="M13.7 20a2 2 0 0 1-3.4 0"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  chevR: '<path d="M9 6l6 6-6 6"/>',
  chevL: '<path d="M15 6l-6 6 6 6"/>',
  lock: '<rect x="5" y="11" width="14" height="9.5" rx="2"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.6 4 5.7 4 9s-1.5 6.4-4 9c-2.5-2.6-4-5.7-4-9s1.5-6.4 4-9z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  sparkle: '<path d="M12 3.5l1.8 5.2 5.2 1.8-5.2 1.8L12 17.5l-1.8-5.2L5 10.5l5.2-1.8z"/><path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
  star: '<path d="M12 3.6l2.5 5.2 5.7.7-4.2 4 1.1 5.6-5.1-2.8-5.1 2.8 1.1-5.6-4.2-4 5.7-.7z"/>',
  cake: '<rect x="4" y="12" width="16" height="8.5" rx="1.5"/><path d="M4 15.5c1.3 1.3 2.7 1.3 4 0s2.7-1.3 4 0 2.7 1.3 4 0 2.7-1.3 4 0"/><path d="M12 12V8.5"/><path d="M12 6.5c.8 0 1.3-.6 1.3-1.3C13.3 4 12 2.8 12 2.8s-1.3 1.2-1.3 2.4c0 .7.5 1.3 1.3 1.3z"/>',
  plane: '<path d="M21.5 4.2L11 14M21.5 4.2l-6.7 17.3-3.8-7.5-7.5-3.8z"/>',
  box: '<path d="M21 8l-9-4.8L3 8v8.5l9 4.8 9-4.8z"/><path d="M3 8l9 4.7L21 8"/><path d="M12 12.7v8.6"/>',
  phone: '<path d="M21.5 17v2.5a1.9 1.9 0 0 1-2.1 1.9A19 19 0 0 1 2.6 4.6 1.9 1.9 0 0 1 4.5 2.5H7a1.9 1.9 0 0 1 1.9 1.6c.1 1 .4 1.9.7 2.8a1.9 1.9 0 0 1-.4 2L8 10.1a15.6 15.6 0 0 0 5.9 5.9l1.2-1.2a1.9 1.9 0 0 1 2-.4c.9.3 1.8.6 2.8.7a1.9 1.9 0 0 1 1.6 1.9z"/>',
  shield: '<path d="M12 21.5s7.5-3.3 7.5-9.4V5.3L12 2.6 4.5 5.3v6.8c0 6.1 7.5 9.4 7.5 9.4z"/>',
  eye: '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.8"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M16 3v4M8 3v4M3.5 10.5h17"/>',
  send: '<path d="M21.8 2.8L10.7 13.9M21.8 2.8l-7 18.9-3.9-7.8-7.9-3.9z"/>',
  mic: '<rect x="9" y="2.5" width="6" height="11" rx="3"/><path d="M5 10.5v1a7 7 0 0 0 14 0v-1M12 18.5v3"/>',
  camera: '<path d="M22.5 18.5a2 2 0 0 1-2 2h-17a2 2 0 0 1-2-2V8.8a2 2 0 0 1 2-2h3.2l1.9-2.8h6.8l1.9 2.8h3.2a2 2 0 0 1 2 2z"/><circle cx="12" cy="13.3" r="3.8"/>',
  sliders: '<path d="M5 21v-6.5M5 10V3M12 21v-9M12 7.5V3M19 21v-4.5M19 12V3"/><path d="M2.5 14.5h5M9.5 7.5h5M16.5 16.5h5"/>',
  close: '<path d="M18 6L6 18M6 6l12 12"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.4-4.4"/>',
  flag: '<path d="M4.5 15.5s1-1 3.7-1 4.6 2 7.3 2 3.7-1 3.7-1V3.8s-1 1-3.7 1-4.6-2-7.3-2-3.7 1-3.7 1z"/><path d="M4.5 22v-6.5"/>',
  moon: '<path d="M20.5 13.5A8.5 8.5 0 1 1 10.5 3.4a7 7 0 0 0 10 10.1z"/>',
  alert: '<path d="M10.3 4.2L2.2 17.8a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z"/><path d="M12 9.5v4.5M12 17.5h.01"/>',
  pen: '<path d="M17 3.5a2.6 2.6 0 1 1 3.7 3.7L7.5 20.4 2.5 21.7l1.3-5z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 2"/>',
  hand: '<path d="M7.5 12V5.8a1.5 1.5 0 0 1 3 0V11m0-6.7a1.5 1.5 0 0 1 3 0V11m0-5.4a1.5 1.5 0 0 1 3 0V12m0-3.4a1.5 1.5 0 0 1 3 0v6.2c0 4-2.8 7-6.8 7-3.3 0-4.7-1.5-6.4-4.4-1-1.7-2-3.8-2.5-4.9-.4-.8 0-1.7.9-2 .7-.3 1.5 0 1.9.6l1.4 2.1"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h14v17H6a2 2 0 0 0-2 2z"/><path d="M4 20a2 2 0 0 1 2-2h14"/>',
  link: '<path d="M10 14a5 5 0 0 0 7.5.5l2.5-2.5a5 5 0 0 0-7-7L11.5 6.5"/><path d="M14 10a5 5 0 0 0-7.5-.5L4 12a5 5 0 0 0 7 7l1.5-1.5"/>',
};
const ic = (name, cls = 'ic') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.sparkle}</svg>`;

const avatarHTML = (a, size = 40, extra = '') =>
  `<span class="avatar sz-${size} hue-${a.hue} ${extra}">${esc(a.initials)}</span>`;

const dotClass = { thriving: 'dot-thriving', 'needs-care': 'dot-care', milestone: 'dot-milestone' };

/* ---------------- Prototype state ---------------- */
const S = {
  persona: 'dana',
  onboardSlide: 0,
  roleChoice: null,
  setupStep: 0,
  prayed: {},            // prayerId -> true (this session)
  prayerNotes: {},       // prayerId -> private note
  prayerStatus: {},      // prayerId -> 'answered'
  commitments: [],       // {needId, what, cadence, reminder}
  postedUpdates: [],     // student-authored in-session updates
  scheduled: [],         // scheduled encouragement {student, text, date}
  checkinMood: null,
  seg: {},               // studentId -> profile segment
  supportSeg: 'explore',
  wallFilter: 'All',
  notifRead: false,
  privacy: { location: 'City', directory: false, anonSupport: true, dms: true },
  composer: { visibility: 'All supporters', text: '' },
  needDraft: { step: 0, category: null, urgency: 'This week', visibility: 'All supporters', multi: true, anon: true },
  careDone: false,
  mentorRequested: false,
};

const P = () => DB.personas[S.persona];
const isStudentP = () => P().role === 'student';
const myStudent = () => DB.students[P().studentId];
const student = (id) => DB.students[id];

/* Circle-based visibility model */
function canSee(visibility, studentId) {
  const p = P();
  if (p.role === 'student' && p.studentId === studentId) return true;
  const circles = (p.circles && p.circles[studentId]) || [];
  const follows = (p.follows || []).includes(studentId);
  switch (visibility) {
    case 'All supporters': return follows;
    case 'Family & Mentors': return circles.includes('family') || circles.includes('mentors');
    case 'Family & Prayer team': return circles.includes('family') || circles.includes('prayer') || circles.includes('care');
    case 'Church & Friends': return circles.includes('church') || circles.includes('friends') || circles.includes('family');
    case 'Family & Friends': return circles.includes('family') || circles.includes('friends');
    case 'Only me': return false;
    default: return follows;
  }
}
const followedIds = () => (P().follows || []);
const visUpdates = (sid) =>
  DB.updates.concat(S.postedUpdates).filter((u) => u.student === sid && canSee(u.visibility, sid));
const visNeeds = (sid) => DB.needs.filter((n) => n.student === sid && canSee(n.visibility, sid));
const visPrayers = (sid) => DB.prayers.filter((p) => p.student === sid && canSee(p.visibility, sid));

/* ---------------- Router ---------------- */
function go(route) {
  if (location.hash === route) render();
  else location.hash = route;
}
window.addEventListener('hashchange', render);

function parseRoute() {
  const h = (location.hash || '#/home').replace(/^#\//, '');
  const parts = h.split('/').filter(Boolean);
  return { name: parts[0] || 'home', arg: parts[1] || null };
}

/* ---------------- Toast & sheet ---------------- */
let toastTimer = null;
function toast(msg, iconName = 'check', ms = 3200) {
  const overlay = $('#overlay');
  let t = overlay.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; overlay.appendChild(t); }
  t.innerHTML = `${ic(iconName, 'ic sm')}<span>${msg}</span>`;
  requestAnimationFrame(() => t.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), ms);
  haptic(8);
}

function openSheet(html) {
  closeSheet(true);
  const overlay = $('#overlay');
  const wrap = document.createElement('div');
  wrap.className = 'sheet-backdrop';
  wrap.innerHTML = `<div class="sheet"><div class="grabber"></div>${html}</div>`;
  wrap.addEventListener('click', (e) => { if (e.target === wrap) closeSheet(); });
  overlay.appendChild(wrap);
  requestAnimationFrame(() => wrap.classList.add('open'));
  haptic(6);
}
function closeSheet(instant = false) {
  const wrap = $('#overlay .sheet-backdrop');
  if (!wrap) return;
  if (instant) { wrap.remove(); return; }
  wrap.classList.remove('open');
  setTimeout(() => wrap.remove(), 300);
}
function sheetBody(html) {
  const sheet = $('#overlay .sheet');
  if (sheet) sheet.innerHTML = `<div class="grabber"></div>${html}`;
}

/* ---------------- Shared components ---------------- */
function navBar(title, backRoute, right = '') {
  return `<div class="nav-bar">
    <button class="nav-btn" onclick="go('${backRoute}')">${ic('chevL')} Back</button>
    <div class="nav-title">${esc(title)}</div>
    ${right || '<span class="nav-spacer"></span>'}
  </div>`;
}

function chipVis(vis) {
  const map = {
    'All supporters': ['c-teal', 'people'],
    'Family & Mentors': ['c-clay', 'lock'],
    'Family & Prayer team': ['c-clay', 'lock'],
    'Church & Friends': ['c-sky', 'people'],
    'Family & Friends': ['c-clay', 'lock'],
    'Only me': ['c-quiet', 'lock'],
  };
  const [cls, icn] = map[vis] || ['c-quiet', 'eye'];
  return `<span class="chip ${cls}">${ic(icn, 'ic sm')} ${esc(vis)}</span>`;
}

function studentBubble(s) {
  return `<button class="student-bubble" onclick="go('#/student/${s.id}')">
    <span class="avatar-wrap">${avatarHTML(s.avatar, 64)}<span class="dot ${dotClass[s.health]}"></span></span>
    <span class="sb-name">${esc(s.name.split(' ')[0])}</span>
    <span class="sb-sub">${esc(s.mood)} ${s.moodEmoji}</span>
  </button>`;
}

function needCard(n, opts = {}) {
  const s = student(n.student);
  const fulfilled = n.status === 'fulfilled' || S.commitments.some((c) => c.needId === n.id && !n.multi);
  const extra = S.needProgressExtra && S.needProgressExtra[n.id] ? S.needProgressExtra[n.id] : 0;
  const raised = n.raised != null ? n.raised + extra : null;
  const progress = n.amount ? `
    <div class="progress mt-12 ${fulfilled ? 'p-forest' : ''}"><i style="width:${Math.min(100, Math.round(((raised || 0) / n.amount) * 100))}%"></i></div>
    <div class="progress-label"><span>$${raised} of $${n.amount}</span><span>${esc(n.due)}</span></div>` : '';
  const committedLine = (n.committed.length || S.commitments.some((c) => c.needId === n.id))
    ? `<div class="meta">${ic('check', 'ic sm')} ${S.commitments.some((c) => c.needId === n.id) ? 'You’re helping with this' : esc(n.committed[0])} — help is coordinated, not duplicated</div>` : '';
  return `<button class="card tappable" style="display:block;width:100%;text-align:left" onclick="go('#/need/${n.id}')">
    <div class="hstack">
      <span class="row-icon" style="background:var(--tint-${n.urgencyHue});color:var(--${n.urgencyHue === 'gold' ? 'gold' : n.urgencyHue})">${ic(n.icon)}</span>
      <div class="grow">
        <h3>${esc(n.title)}</h3>
        <div class="meta" style="margin-top:2px">${opts.hideStudent ? '' : `${avatarHTML(s.avatar, 24)} ${esc(s.name.split(' ')[0])} · `}${esc(n.category)}</div>
      </div>
      <span class="chip ${fulfilled ? 'c-forest' : 'c-' + n.urgencyHue}">${fulfilled ? 'Fulfilled' : esc(n.urgency)}</span>
    </div>
    <div class="body mt-8">${esc(n.body)}</div>
    ${progress}${committedLine}
  </button>`;
}

function prayerCard(pr, compact = false) {
  const s = student(pr.student);
  const answered = pr.status === 'answered' || S.prayerStatus[pr.id] === 'answered';
  const prayed = !!S.prayed[pr.id];
  const count = pr.prayedCount + (prayed ? 1 : 0);
  return `<button class="card tappable ${answered ? 'wash-gold' : ''}" style="display:block;width:100%;text-align:left" onclick="go('#/prayer/${pr.id}')">
    <div class="hstack">
      ${avatarHTML(s.avatar, 40)}
      <div class="grow">
        <h3>${esc(pr.title)}</h3>
        <div class="meta" style="margin-top:2px">${esc(s.name.split(' ')[0])} · ${esc(pr.posted)} ${answered ? '' : pr.urgent ? `· <b style="color:#8A5F1D">${esc(pr.urgency)}</b>` : ''}</div>
      </div>
      ${answered ? '<span class="chip c-gold">✨ Answered</span>' : prayed ? '<span class="chip c-forest">You prayed</span>' : ''}
    </div>
    ${compact ? '' : `<div class="body mt-8">${esc(pr.body)}</div>`}
    <div class="meta">${ic('pray', 'ic sm')} Prayed for by ${count} people ${chipVis(pr.visibility)}</div>
  </button>`;
}

function updateCard(u) {
  const s = student(u.student);
  return `<div class="card">
    <div class="hstack">
      ${avatarHTML(s.avatar, 40)}
      <div class="grow">
        <div class="strong" style="font-size:15px">${esc(s.name)}</div>
        <div class="meta" style="margin-top:0">${esc(u.when)} ${chipVis(u.visibility)}</div>
      </div>
    </div>
    <h3 class="mt-12">${esc(u.title)}</h3>
    <div class="body">${esc(u.body)}</div>
    ${u.photo ? `<div class="photo hue-${u.photo.hue}">${esc(u.photo.label)}</div>` : ''}
    <div class="meta mt-12">
      ${ic('heart', 'ic sm')} ${u.reactions} &nbsp; ${ic('pray', 'ic sm')} ${u.prayers} praying
      <span class="grow"></span>
      <button class="chip c-quiet" onclick="event.stopPropagation();toast('Maya will see your “thinking of you” 💛','heart')">Thinking of you</button>
    </div>
  </div>`;
}

function milestoneRow(m, showStudent = true) {
  const s = student(m.student);
  return `<button class="row tappable" style="text-align:left" onclick="go('#/milestones/${m.student}')">
    <span class="row-icon" style="background:var(--tint-gold);color:#8A5F1D">${ic(m.icon)}</span>
    <span class="r-main">
      <span class="r-title">${esc(m.title)}</span>
      <span class="r-sub">${showStudent ? esc(s.name.split(' ')[0]) + ' · ' : ''}${esc(m.date)} · in ${m.inDays} days</span>
    </span>
    ${ic('chevR', 'ic sm')}
  </button>`;
}

/* ---------------- Tab bar ---------------- */
const TABS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'students', label: 'Students', icon: 'people' },
  { id: 'support', label: 'Support', icon: 'gift' },
  { id: 'prayer', label: 'Prayer', icon: 'pray' },
  { id: 'profile', label: 'Profile', icon: 'person' },
];
function renderTabs(active) {
  const bar = $('#tabbar');
  if (!active) { bar.innerHTML = ''; bar.className = ''; return; }
  bar.className = 'tabbar';
  const prayerBadge = P().role === 'supporter'
    ? DB.prayers.filter((p) => p.urgent && followedIds().includes(p.student) && canSee(p.visibility, p.student) && !S.prayed[p.id]).length
    : 0;
  bar.innerHTML = TABS.map((t) => `
    <button class="tab ${t.id === active ? 'on' : ''}" onclick="go('#/${t.id}')" aria-label="${t.label}">
      ${t.id === 'prayer' && prayerBadge ? `<span class="badge">${prayerBadge}</span>` : ''}
      ${ic(t.icon, 'ic lg')}<span>${t.label}</span>
    </button>`).join('');
}

/* =========================================================
   SCREENS
   ========================================================= */

/* ---------- Onboarding ---------- */
const OB_SLIDES = [
  { glyphs: '🌍 ✈️ 🕊️', h: 'A year away.<br>Never out of reach.', p: 'Kindred keeps churches, families, and friends close to the Global Year students they love — all year long.' },
  { glyphs: '🤲 💛 📬', h: 'Support that<br>knows what to do.', p: 'See real needs, pray for real requests, and send encouragement that arrives at just the right moment. No guessing, no wondering how to help.' },
  { glyphs: '🔒 🌿 ✅', h: 'The student is<br>always in control.', p: 'Every update, need, and prayer request has a clear audience the student chooses. Private stays private. Always.' },
];
function rOnboarding() {
  const sl = OB_SLIDES[S.onboardSlide];
  $('#screen').className = 'screen no-tabs screen-anim';
  $('#screen').innerHTML = `
  <div class="onboard" style="margin:-62px 0 0; height:calc(100% + 62px)">
    <div style="font-size:15px;font-weight:700;letter-spacing:.14em;opacity:.75">KINDRED</div>
    <div class="glyphs" style="margin-top:auto">${sl.glyphs}</div>
    <h1 class="mt-16">${sl.h}</h1>
    <p>${sl.p}</p>
    <div class="dots">${OB_SLIDES.map((_, i) => `<i class="${i === S.onboardSlide ? 'on' : ''}"></i>`).join('')}</div>
    <button class="btn btn-onboard btn-block" onclick="obNext()">${S.onboardSlide < 2 ? 'Continue' : 'Get started'}</button>
    <button class="btn btn-ghost btn-block" style="color:rgba(255,255,255,.7)" onclick="go('#/role')">Skip</button>
  </div>`;
  renderTabs(null);
}
function obNext() {
  if (S.onboardSlide < 2) { S.onboardSlide++; render(); } else go('#/role');
}

/* ---------- Role selection ---------- */
function rRole() {
  $('#screen').innerHTML = `
  <div class="nav-large" style="padding-top:24px">
    <div class="kicker">Welcome to Kindred</div>
    <h1>Which one is you?</h1>
    <p class="muted mt-8" style="font-size:15px">You can hold more than one role later — plenty of parents are also prayer warriors.</p>
  </div>
  <div class="section">
    ${[
      ['student', '🎒', 'I’m a Global Year student', 'Share your journey, your needs, and your prayer requests — with the people you choose.'],
      ['supporter', '💛', 'I’m supporting a student', 'Parent, friend, mentor, church member — follow their year and never wonder how to help.'],
      ['coordinator', '⛪', 'I lead a church or group', 'Coordinate care around your students and keep your community showing up.'],
    ].map(([id, e, h, p]) => `
      <button class="role-card ${S.roleChoice === id ? 'on' : ''}" onclick="S.roleChoice='${id}';render()">
        <span class="rc-emoji">${e}</span>
        <span class="grow"><h3>${h}</h3><p>${p}</p></span>
        ${S.roleChoice === id ? ic('check', 'ic') : ''}
      </button>`).join('')}
    <button class="btn btn-primary btn-block mt-8" ${S.roleChoice ? '' : 'disabled'} onclick="go('#/signup')">Continue</button>
  </div>`;
  renderTabs(null);
  $('#screen').className = 'screen no-tabs screen-anim';
}

/* ---------- Account creation ---------- */
function rSignup() {
  $('#screen').className = 'screen no-tabs screen-anim';
  $('#screen').innerHTML = `
  ${navBar('Create account', '#/role')}
  <div class="nav-large"><h1>Let’s get you set up</h1></div>
  <div class="section">
    <div class="field"><label>Full name</label><input class="input" placeholder="Your name" value="${S.roleChoice === 'student' ? 'Sarah Kim' : 'Riley Nguyen'}"></div>
    <div class="field"><label>Email</label><input class="input" placeholder="you@example.com" value="${S.roleChoice === 'student' ? 'sarah@example.com' : 'riley@example.com'}"></div>
    <div class="field"><label>Password</label><input class="input" type="password" value="••••••••••"></div>
    <div class="privacy-note">${ic('lock', 'ic sm')} <span>Your account is private by default. There’s no public directory — people find you only through invites you approve.</span></div>
    <button class="btn btn-primary btn-block mt-16" onclick="signupNext()">Create account</button>
    <div class="tc mt-12 small faint">By continuing you agree to the community standards:<br>kindness, honesty, and student safety first.</div>
  </div>`;
  renderTabs(null);
}
function signupNext() {
  haptic();
  if (S.roleChoice === 'student') { S.setupStep = 0; go('#/setup'); }
  else if (S.roleChoice === 'coordinator') { toast('Account created — your church admin dashboard is ready', 'check'); S.persona = 'marcus'; go('#/home'); }
  else { S.persona = 'riley'; toast('Welcome, Riley! Add a student with an invite code.', 'sparkle'); go('#/students'); }
}

/* ---------- Student profile setup (4 steps) ---------- */
function rSetup() {
  const step = S.setupStep;
  const steps = ['About you', 'Where you’ll serve', 'Your story', 'Your circles'];
  let body = '';
  if (step === 0) body = `
    <div class="tc mt-8">${avatarHTML({ initials: 'SK', hue: 'teal' }, 96)}
      <div class="mt-8"><button class="chip c-teal">${ic('camera', 'ic sm')} Add profile photo</button></div>
    </div>
    <div class="field mt-16"><label>Preferred name</label><input class="input" value="Sarah Kim"></div>
    <div class="field"><label>Cohort</label><input class="input" value="Global Year ’26–’27 · Cape Verde team"></div>
    <div class="field"><label>Sending church or community</label><input class="input" value="Northgate Community Church · Franklin, TN"></div>`;
  if (step === 1) body = `
    <div class="field"><label>Where are you serving?</label><input class="input" value="Praia, Cape Verde"></div>
    <div class="field"><label>How precisely should supporters see your location?</label>
      <div class="choice-grid">
        ${['Country only', 'City', 'Region'].map((c) => `<button class="choice ${S.privacy.location === c.replace(' only', '') || (c === 'City' && S.privacy.location === 'City') ? 'on g-teal' : ''}" onclick="S.privacy.location='${c.replace(' only', '')}';render()">${c}</button>`).join('')}
      </div>
    </div>
    <div class="privacy-note">${ic('shield', 'ic sm')} <span>Kindred never shares real-time location. Supporters see “${S.privacy.location === 'Country' ? 'Cape Verde' : 'Praia, Cape Verde'}” — nothing more precise, ever.</span></div>
    <div class="field mt-16"><label>Current season</label>
      <div class="choice-grid">
        ${['Fundraising', 'Training', 'Language school', 'Serving', 'Resting', 'Returning home'].map((c) => `<button class="choice ${c === 'Fundraising' ? 'on g-gold' : ''}">${c}</button>`).join('')}
      </div>
    </div>`;
  if (step === 2) body = `
    <div class="field"><label>Short bio</label><textarea class="input">Raising the last of my support before joining the Cape Verde team in September — Christian school, kids’ ministry, and learning Kriolu.</textarea></div>
    <div class="field"><label>Why I’m doing Global Year</label><textarea class="input">On a short trip to Cape Verde with our church, a girl named Neusa asked when I was coming back. Global Year is my answer.</textarea></div>
    <div class="privacy-note">${ic('heart', 'ic sm')} <span>Your story is what supporters connect with most. You can edit it any time.</span></div>`;
  if (step === 3) body = `
    <p class="muted small" style="line-height:1.5">Circles decide who sees what. We’ll start you with these — invite people into the right one and everything else takes care of itself.</p>
    <div class="list mt-12">
      ${[['home', 'Family', 'Personal updates, family prayer, all needs'], ['people', 'Home church', 'General updates, public prayer, needs'], ['sparkle', 'Friends', 'General updates and public prayer'], ['gift', 'Financial supporters', 'Only needs tied to financial support'], ['shield', 'Private care team', 'Deeper wellbeing check-ins — your safest space']]
        .map(([i, t, s]) => `<div class="row"><span class="row-icon" style="background:var(--tint-navy);color:var(--navy)">${ic(i)}</span><span class="r-main"><span class="r-title">${t}</span><span class="r-sub">${s}</span></span>${ic('check', 'ic sm')}</div>`).join('')}
    </div>`;
  $('#screen').className = 'screen no-tabs screen-anim';
  $('#screen').innerHTML = `
  ${navBar('Profile setup', step === 0 ? '#/signup' : '#/setup')}
  <div class="steps">${steps.map((_, i) => `<i class="${i <= step ? 'on' : ''}"></i>`).join('')}</div>
  <div class="nav-large" style="padding-top:0"><h1 style="font-size:26px">${steps[step]}</h1></div>
  <div class="section" style="margin-top:12px">
    ${body}
    <button class="btn btn-primary btn-block mt-16" onclick="setupNext()">${step < 3 ? 'Continue' : 'Finish — invite your people'}</button>
  </div>`;
  renderTabs(null);
  // back button steps back through the flow
  $('#screen .nav-btn').onclick = () => { if (S.setupStep > 0) { S.setupStep--; render(); } else go('#/signup'); };
}
function setupNext() {
  haptic();
  if (S.setupStep < 3) { S.setupStep++; render(); }
  else { S.persona = 'sarah_setup_demo' in DB.personas ? 'sarah' : 'sarah'; toast('Profile ready! Now invite your first supporters 🎉', 'sparkle'); go('#/invite'); }
}

/* ---------- Supporter invitation flow (student-owned) ---------- */
function rInvite() {
  const sid = isStudentP() ? P().studentId : 'sarah';
  const s = student(sid);
  const circles = DB.circles[sid];
  const chosen = S.inviteCircle || circles[0].id;
  const c = circles.find((x) => x.id === chosen);
  $('#screen').className = 'screen no-tabs screen-anim';
  $('#screen').innerHTML = `
  ${navBar('Invite supporters', isStudentP() ? '#/profile' : '#/home')}
  <div class="nav-large"><h1 style="font-size:26px">Bring your people in</h1>
  <p class="muted mt-8" style="font-size:15px">Each invite places someone in a circle. They see exactly what that circle sees — nothing else.</p></div>
  <div class="section">
    <div class="field"><label>Invite into</label>
      <div class="choice-grid">
        ${circles.map((x) => `<button class="choice ${x.id === chosen ? 'on' : ''}" onclick="S.inviteCircle='${x.id}';render()">${esc(x.name)}</button>`).join('')}
      </div>
    </div>
    <div class="card wash-navy mt-12">
      <div class="hstack">${ic('eye')} <h3>What “${esc(c.name)}” can see</h3></div>
      <div class="body mt-4">${esc(c.sees)}.</div>
      <div class="meta">They can always pray, encourage, and respond to what’s visible to them.</div>
    </div>
    <div class="card mt-12">
      <div class="hstack">
        <span class="row-icon" style="background:var(--tint-gold);color:#8A5F1D">${ic('link')}</span>
        <div class="grow"><div class="strong">kindred.app/join/${sid}-${chosen}-7k2f</div>
        <div class="small faint">Expires in 14 days · you approve every join</div></div>
      </div>
      <div class="btn-row mt-12">
        <button class="btn btn-soft btn-sm" onclick="toast('Invite link copied','check')">Copy link</button>
        <button class="btn btn-primary btn-sm" onclick="toast('Invite sent — you’ll approve them when they join','send')">Share…</button>
      </div>
    </div>
    <div class="privacy-note mt-12">${ic('shield', 'ic sm')} <span>New joins wait for ${esc(s.name.split(' ')[0])}’s approval. Anyone can be moved to another circle — or removed — at any time.</span></div>
  </div>`;
  renderTabs(null);
}

/* ---------- HOME ---------- */
function rHome() {
  const p = P();
  if (p.role === 'coordinator') return rCoordHome();
  if (p.role === 'student') return rStudentHome();
  return rSupporterHome();
}

function rSupporterHome() {
  const p = P();
  const follows = followedIds().map(student);
  if (!follows.length) return rEmptyHome();
  const needs = DB.needs.filter((n) => n.status === 'open' && followedIds().includes(n.student) && canSee(n.visibility, n.student) && !S.commitments.some((c) => c.needId === n.id)).slice(0, 2);
  const prayers = DB.prayers.filter((pr) => followedIds().includes(pr.student) && canSee(pr.visibility, pr.student) && !S.prayed[pr.id] && S.prayerStatus[pr.id] !== 'answered').slice(0, 2);
  const miles = DB.milestones.filter((m) => followedIds().includes(m.student)).sort((a, b) => a.inDays - b.inDays).slice(0, 3);
  const feed = DB.updates.concat(S.postedUpdates).filter((u) => followedIds().includes(u.student) && canSee(u.visibility, u.student)).slice(0, 2);
  const moment = p.id === 'dana'
    ? { s: student('elijah'), title: 'Today’s support moment', line: 'Elijah has been feeling far from home this week. A short word from Northgate would land well today.', cta: 'Send encouragement', act: `go('#/encourage/elijah')` }
    : { s: student('sarah'), title: 'Today’s support moment', line: 'Sarah’s flight to Cape Verde books in 45 days — and she asked for peace about the timeline.', cta: 'Pray with her', act: `go('#/prayer/p-sarah-timeline')` };
  $('#screen').className = 'screen screen-anim';
  $('#screen').innerHTML = `
  <div class="nav-large hstack">
    <div class="grow">
      <div class="kicker">Tuesday, July 1</div>
      <h1>Good morning, ${esc(p.short)}</h1>
    </div>
    <button class="nav-btn" style="position:relative" onclick="go('#/notifications')">${ic('bell', 'ic lg')}${S.notifRead ? '' : '<span class="badge" style="position:absolute;top:2px;right:2px">2</span>'}</button>
  </div>

  <div class="section" style="margin-top:10px">
    <div class="card wash-gold">
      <div class="chip c-gold">${ic('sparkle', 'ic sm')} ${moment.title}</div>
      <div class="hstack mt-12">
        ${avatarHTML(moment.s.avatar, 48)}
        <div class="grow"><h3>${esc(moment.s.name)}</h3><div class="small muted">${esc(moment.s.place)}</div></div>
      </div>
      <div class="body mt-8">${moment.line}</div>
      <button class="btn btn-gold btn-block btn-sm mt-12" onclick="${moment.act}">${moment.cta}</button>
    </div>
  </div>

  <div class="section">
    <div class="section-head"><h2>Your students</h2><button class="see-all" onclick="go('#/students')">See all</button></div>
  </div>
  <div class="carousel">${follows.map(studentBubble).join('')}
    <button class="student-bubble" onclick="go('#/students')"><span class="avatar sz-64" style="background:rgba(28,43,58,.07);color:var(--ink-2);box-shadow:none">${ic('plus')}</span><span class="sb-name faint">Add</span></button>
  </div>

  ${needs.length ? `<div class="section">
    <div class="section-head"><h2>Needs you can help with</h2><button class="see-all" onclick="go('#/support')">More</button></div>
    <div class="stack-12">${needs.map((n) => needCard(n)).join('')}</div>
  </div>` : ''}

  ${prayers.length ? `<div class="section">
    <div class="section-head"><h2>Waiting with them in prayer</h2><button class="see-all" onclick="go('#/prayer')">Prayer tab</button></div>
    <div class="stack-12">${prayers.map((pr) => prayerCard(pr, true)).join('')}</div>
  </div>` : ''}

  <div class="section">
    <div class="section-head"><h2>Coming up</h2><button class="see-all" onclick="go('#/milestones/all')">Timeline</button></div>
    <div class="list">${miles.map((m) => milestoneRow(m)).join('')}</div>
  </div>

  ${p.id === 'dana' ? `<div class="section">
    <div class="nudge">${ic('moon', 'ic sm')} <span>It’s been a little while since you checked in on Elijah. No pressure — a small hello goes a long way. <b style="cursor:pointer" onclick="go('#/encourage/elijah')">Say hi →</b></span></div>
  </div>` : ''}

  <div class="section">
    <div class="section-head"><h2>From their week</h2></div>
    <div class="stack-12">${feed.map(updateCard).join('')}</div>
  </div>

  <div class="section">
    <div class="card wash-forest">
      <div class="hstack">${ic('heart')} <h3>Your week of showing up</h3></div>
      <div class="stat-trio mt-12">
        <div class="stat"><div class="s-num">${p.weekly.prayed}</div><div class="s-label">students prayed for</div></div>
        <div class="stat"><div class="s-num">${p.weekly.needsMet + S.commitments.length}</div><div class="s-label">needs helped</div></div>
        <div class="stat"><div class="s-num">${p.weekly.encouragementSeen}</div><div class="s-label">notes received</div></div>
      </div>
      <div class="meta mt-12">Thank you for showing up. It matters more than you know.</div>
    </div>
  </div>`;
  renderTabs('home');
}

function rEmptyHome() {
  $('#screen').className = 'screen screen-anim';
  $('#screen').innerHTML = `
  <div class="nav-large"><div class="kicker">Welcome</div><h1>Hi, ${esc(P().short)} 👋</h1></div>
  <div class="section">
    <div class="card tc" style="padding:36px 24px">
      <div class="empty" style="padding:0">
        <div class="e-art">🌍💛</div>
        <h3>Your support circle starts here</h3>
        <p>Follow a Global Year student to see their journey, pray for real requests, and help with real needs. Students share invite links with the people they trust — there’s no public directory.</p>
        <button class="btn btn-primary btn-block" onclick="go('#/students')">Enter an invite code</button>
        <button class="btn btn-ghost btn-block" onclick="toast('Ask your church coordinator for your group’s student list','people')">My church sent me here</button>
      </div>
    </div>
    <div class="privacy-note mt-12">${ic('lock', 'ic sm')} <span>Students choose who supports them. When you join, they place you in a circle that decides what you can see.</span></div>
  </div>`;
  renderTabs('home');
}

function rStudentHome() {
  const s = myStudent();
  const myNeeds = DB.needs.filter((n) => n.student === s.id);
  const open = myNeeds.filter((n) => n.status === 'open');
  const miles = DB.milestones.filter((m) => m.student === s.id).slice(0, 2);
  const wall = (DB.wall[s.id] || []).slice(0, 1);
  const prayedTotal = DB.prayers.filter((p) => p.student === s.id).reduce((a, p) => a + p.prayedCount + (S.prayed[p.id] ? 1 : 0), 0);
  $('#screen').className = 'screen screen-anim';
  $('#screen').innerHTML = `
  <div class="nav-large hstack">
    <div class="grow"><div class="kicker">Tuesday, July 1 · ${esc(s.place)}</div><h1>Hey, ${esc(s.name.split(' ')[0])}</h1></div>
    <button class="nav-btn" onclick="go('#/notifications')">${ic('bell', 'ic lg')}</button>
  </div>

  <div class="section" style="margin-top:8px">
    <div class="card">
      <h3>How are you feeling today?</h3>
      <div class="mood-grid mt-12">
        ${DB.moods.slice(0, 4).map((m) => `<button class="mood ${S.checkinMood === m.label ? 'on' : ''}" onclick="go('#/checkin')"><span class="m-emoji">${m.emoji}</span>${m.label}</button>`).join('')}
      </div>
      <button class="btn btn-ghost btn-block btn-sm mt-8" onclick="go('#/checkin')">More options — you choose who sees it</button>
    </div>
  </div>

  <div class="section">
    <button class="btn btn-primary btn-block" onclick="go('#/compose-update')">${ic('pen')} Share an update</button>
  </div>

  <div class="section">
    <div class="stat-trio">
      <div class="stat"><div class="s-num">${s.supporters}</div><div class="s-label">supporters</div></div>
      <div class="stat"><div class="s-num">${prayedTotal}</div><div class="s-label">prayers received</div></div>
      <div class="stat"><div class="s-num">${open.length}</div><div class="s-label">open needs</div></div>
    </div>
  </div>

  ${wall.length ? `<div class="section">
    <div class="section-head"><h2>Recent encouragement</h2><button class="see-all" onclick="go('#/wall/${s.id}')">Your wall</button></div>
    ${wall.map((w) => `<div class="wall-note k-${w.kind}"><div class="w-from"><span class="avatar sz-24 hue-${w.hue}">${esc(w.from[0])}</span> ${esc(w.from)}</div><div class="w-text">${esc(w.text)}</div><div class="w-when">${esc(w.when)}</div></div>`).join('')}
    <div class="nudge mt-12">${ic('pray', 'ic sm')} <span><b>${18 + (S.prayed['p-' + s.id] ? 1 : 0)} people</b> prayed for you this week. You are not carrying this alone.</span></div>
  </div>` : ''}

  <div class="section">
    <div class="section-head"><h2>Your open needs</h2><button class="see-all" onclick="go('#/support')">Manage</button></div>
    <div class="stack-12">
      ${open.length ? open.map((n) => needCard(n, { hideStudent: true })).join('') : '<div class="card tc muted">No open needs right now. <button class="chip c-teal mt-8" onclick="go(\'#/compose-need\')">Add one</button></div>'}
    </div>
  </div>

  <div class="section">
    <div class="section-head"><h2>Coming up for you</h2><button class="see-all" onclick="go('#/milestones/${s.id}')">All</button></div>
    <div class="list">${miles.map((m) => milestoneRow(m, false)).join('')}</div>
  </div>

  <div class="section">
    <div class="card wash-teal">
      <div class="hstack">${ic('people')} <h3>You are supported by…</h3></div>
      <div class="hstack mt-12">
        <span class="avatar-stack">
          ${['clay', 'teal', 'navy', 'forest', 'gold'].map((h, i) => `<span class="avatar sz-32 hue-${h}">${'DJMPK'[i]}</span>`).join('')}
        </span>
        <span class="small muted grow">${s.supporters} people across ${DB.circles[s.id].length} circles — family, church, friends, and more.</span>
      </div>
      <button class="btn btn-soft btn-block btn-sm mt-12" onclick="go('#/circles')">Manage circles & invites</button>
    </div>
  </div>`;
  renderTabs('home');
}

/* ---------- Coordinator home & care flow ---------- */
function rCoordHome() {
  const co = DB.coordinator;
  $('#screen').className = 'screen screen-anim';
  $('#screen').innerHTML = `
  <div class="nav-large hstack">
    <div class="grow"><div class="kicker">${esc(co.group)}</div><h1>Good morning, Marcus</h1></div>
    <button class="nav-btn" onclick="go('#/notifications')">${ic('bell', 'ic lg')}</button>
  </div>

  <div class="section" style="margin-top:8px">
    <div class="section-head"><h2>Support health</h2><span class="small faint">${co.students.length} students</span></div>
    <div class="section-sub">Engagement signals only — private check-ins and sensitive requests stay private.</div>
    ${co.signals.map((sig) => {
      const s = student(sig.student);
      const chip = { attention: '<span class="chip c-gold">Needs care</span>', milestone: '<span class="chip c-teal">Milestone ahead</span>', healthy: '<span class="chip c-forest">Well supported</span>' }[sig.level];
      const done = sig.student === 'elijah' && S.careDone;
      return `<div class="card signal ${sig.level}">
        <div class="hstack">
          ${avatarHTML(s.avatar, 40)}
          <div class="grow"><h3>${esc(s.name)}</h3><div class="small muted">${esc(sig.headline)}</div></div>
          ${done ? '<span class="chip c-forest">Care organized ✓</span>' : chip}
        </div>
        <ul>${sig.facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
        <div class="btn-row mt-12">
          <button class="btn btn-soft btn-sm" onclick="go('#/student/${s.id}')">View profile</button>
          ${sig.level === 'attention' && !done ? `<button class="btn btn-gold btn-sm" onclick="go('#/care/${s.id}')">Organize care</button>` : sig.level === 'milestone' ? `<button class="btn btn-primary btn-sm" onclick="openCampaignSheet('${s.id}')">Rally support</button>` : ''}
        </div>
      </div>`;
    }).join('')}
  </div>

  <div class="section">
    <div class="section-head"><h2>Quick actions</h2></div>
    <div class="list">
      <button class="row tappable"><span class="row-icon" style="background:var(--tint-teal);color:var(--teal)">${ic('plus')}</span><span class="r-main"><span class="r-title" onclick="go('#/invite')">Invite supporters</span><span class="r-sub">Grow each student’s circle</span></span>${ic('chevR', 'ic sm')}</button>
      <button class="row tappable" onclick="openPrayerMomentSheet()"><span class="row-icon" style="background:var(--tint-navy);color:var(--navy)">${ic('pray')}</span><span class="r-main"><span class="r-title">Create a group prayer moment</span><span class="r-sub">Gather the church around a request</span></span>${ic('chevR', 'ic sm')}</button>
      <button class="row tappable" onclick="openAnnounceSheet()"><span class="row-icon" style="background:var(--tint-gold);color:#8A5F1D">${ic('send')}</span><span class="r-main"><span class="r-title">Send an announcement</span><span class="r-sub">To a student’s support community</span></span>${ic('chevR', 'ic sm')}</button>
    </div>
  </div>

  <div class="section">
    <div class="section-head"><h2>Coming up across your students</h2></div>
    <div class="list">${DB.milestones.sort((a, b) => a.inDays - b.inDays).slice(0, 4).map((m) => milestoneRow(m)).join('')}</div>
  </div>`;
  renderTabs('home');
}

function rCare(sid) {
  const s = student(sid || 'elijah');
  const picks = S.carePicks || (S.carePicks = { reach: true, prayer: true, announce: false });
  $('#screen').className = 'screen no-tabs screen-anim';
  $('#screen').innerHTML = `
  ${navBar('Organize care', '#/home')}
  <div class="nav-large"><h1 style="font-size:26px">A care response for ${esc(s.name.split(' ')[0])}</h1>
  <p class="muted mt-8" style="font-size:15px">Quiet, coordinated, and kind. ${esc(s.name.split(' ')[0])} won’t see a “flag” — just more of his people showing up.</p></div>
  <div class="section">
    <div class="privacy-note">${ic('shield', 'ic sm')} <span>You’re acting on engagement signals only. Elijah’s private check-ins and family-only requests are not visible to you.</span></div>
    <div class="card mt-12">
      <div class="switch-row" onclick="S.carePicks.reach=!S.carePicks.reach;render()">
        <span class="s-main"><span class="s-title">Ask 3 supporters to reach out this week</span><span class="s-sub">Dana, Jordan, and the Hendersons get a gentle, private nudge</span></span>
        <span class="switch ${picks.reach ? 'on' : ''}"></span>
      </div>
      <div class="switch-row" onclick="S.carePicks.prayer=!S.carePicks.prayer;render()">
        <span class="s-main"><span class="s-title">Schedule a group prayer moment</span><span class="s-sub">Thursday 8pm · around his public request for the Ramos family</span></span>
        <span class="switch ${picks.prayer ? 'on' : ''}"></span>
      </div>
      <div class="switch-row" onclick="S.carePicks.announce=!S.carePicks.announce;render()">
        <span class="s-main"><span class="s-title">Announce “Letters from home” push</span><span class="s-sub">Invite his community to answer his open encouragement need</span></span>
        <span class="switch ${picks.announce ? 'on' : ''}"></span>
      </div>
    </div>
    <button class="btn btn-forest btn-block mt-16" onclick="careConfirm('${s.id}')">Start care response</button>
    <button class="btn btn-ghost btn-block" onclick="go('#/home')">Not now</button>
  </div>`;
  renderTabs(null);
}
function careConfirm(sid) {
  S.careDone = true;
  haptic(20);
  toast('Care response started — his people are on the way 💛', 'heart', 4000);
  go('#/home');
}
function openPrayerMomentSheet() {
  openSheet(`
    <h2>Group prayer moment</h2>
    <div class="sheet-sub">Pick a request your whole community can gather around. Sensitive requests never appear here.</div>
    ${DB.prayers.filter((p) => p.visibility === 'All supporters').slice(0, 3).map((p) => `
      <button class="row tappable" style="border-radius:14px" onclick="closeSheet();toast('Prayer moment scheduled for Thursday 8pm 🙏','pray')">
        ${avatarHTML(student(p.student).avatar, 32)}<span class="r-main"><span class="r-title" style="font-size:15px">${esc(p.title)}</span><span class="r-sub">${esc(student(p.student).name)}</span></span>${ic('chevR', 'ic sm')}
      </button>`).join('')}`);
}
function openAnnounceSheet() {
  openSheet(`
    <h2>Announcement</h2>
    <div class="sheet-sub">Goes to a student’s support community — encouraging, never guilt-driven.</div>
    <div class="field"><label>To</label><input class="input" value="Sarah’s support community (29 people)"></div>
    <div class="field"><label>Message</label><textarea class="input">Sarah is 45 days from Cape Verde and 68% funded. Sunday we’ll pray her out — and if you can help her book that flight, now’s the moment. Help is already on the way!</textarea></div>
    <button class="btn btn-primary btn-block" onclick="closeSheet();toast('Announcement sent to 29 supporters','send')">Send</button>`);
}
function openCampaignSheet(sid) {
  const s = student(sid);
  openSheet(`
    <h2>Rally around ${esc(s.name.split(' ')[0])}</h2>
    <div class="sheet-sub">Her flight books in 45 days. Coordinate the final stretch without a single guilt trip.</div>
    <div class="card wash-gold">${needCardInline('n-sarah-flight')}</div>
    <button class="btn btn-gold btn-block mt-12" onclick="closeSheet();toast('Campaign shared with Northgate — 14 supporters notified','send')">Share with the church</button>
    <button class="btn btn-ghost btn-block" onclick="closeSheet();openAnnounceSheet()">Write an announcement instead</button>`);
}
function needCardInline(nid) {
  const n = DB.needs.find((x) => x.id === nid);
  const pct = Math.round((n.raised / n.amount) * 100);
  return `<h3>${esc(n.title)}</h3><div class="body mt-4">${esc(n.due)} · ${pct}% covered</div>
  <div class="progress mt-8"><i style="width:${pct}%"></i></div>`;
}

/* ---------- Students tab ---------- */
function rStudents() {
  const p = P();
  if (p.role === 'student') return rMyNetwork();
  const follows = followedIds().map(student);
  $('#screen').className = 'screen screen-anim';
  $('#screen').innerHTML = `
  <div class="nav-large"><div class="kicker">${p.role === 'coordinator' ? esc(DB.coordinator.group) : 'Your people'}</div><h1>Students</h1></div>
  ${follows.length ? `
  <div class="section" style="margin-top:8px">
    <div class="list">
      ${follows.map((s) => `<button class="row tappable" onclick="go('#/student/${s.id}')">
        <span class="avatar-wrap">${avatarHTML(s.avatar, 48)}<span class="dot ${dotClass[s.health]}"></span></span>
        <span class="r-main">
          <span class="r-title">${esc(s.name)}</span>
          <span class="r-sub">${esc(s.place)} · ${esc(s.season)} · ${esc(s.lastCheckin)}</span>
        </span>${ic('chevR', 'ic sm')}
      </button>`).join('')}
    </div>
  </div>
  <div class="section">
    <div class="card wash-navy">
      <div class="hstack">${ic('plus')} <h3>Follow another student</h3></div>
      <div class="body mt-4">There’s no public directory — students share invite codes with people they trust.</div>
      <div class="field mt-12" style="margin-bottom:0"><input class="input" placeholder="Enter invite code…"></div>
      <button class="btn btn-primary btn-block btn-sm mt-8" onclick="toast('We’ll let the student know you’d like to join — they approve every supporter','check',4200)">Request to join</button>
    </div>
  </div>` : `
  <div class="section" style="margin-top:8px">
    <div class="card"><div class="empty" style="padding:24px 12px">
      <div class="e-art">📮</div>
      <h3>No students yet — and that’s okay</h3>
      <p>Kindred has no public directory, so every connection starts with trust. Ask your student — or your church coordinator — for an invite code.</p>
      <div class="field" style="text-align:left"><input class="input" placeholder="Enter invite code…"></div>
      <button class="btn btn-primary btn-block" onclick="toast('Request sent! The student approves every supporter.','check',4200)">Request to join</button>
    </div></div>
  </div>`}
  `;
  renderTabs('students');
}

function rMyNetwork() {
  const s = myStudent();
  const circles = DB.circles[s.id];
  $('#screen').className = 'screen screen-anim';
  $('#screen').innerHTML = `
  <div class="nav-large"><div class="kicker">Your people</div><h1>Support network</h1></div>
  <div class="section" style="margin-top:8px">
    <div class="card wash-teal tc" style="padding:22px 16px">
      <div style="font-size:30px">🤝</div>
      <h3 class="mt-8">${s.supporters} people are in your corner</h3>
      <div class="small muted mt-4">Across ${circles.length} circles you control.</div>
      <button class="btn btn-primary btn-block btn-sm mt-12" onclick="go('#/invite')">Invite someone new</button>
    </div>
  </div>
  <div class="section">
    <div class="section-head"><h2>Your circles</h2><button class="see-all" onclick="go('#/circles')">Manage</button></div>
    <div class="list">
      ${circles.map((c) => `<button class="row tappable" onclick="go('#/circles')">
        <span class="row-icon" style="background:var(--tint-navy);color:var(--navy)">${ic(c.icon)}</span>
        <span class="r-main"><span class="r-title">${esc(c.name)}</span><span class="r-sub">${c.members} members · ${esc(c.sees)}</span></span>
        ${ic('chevR', 'ic sm')}
      </button>`).join('')}
    </div>
  </div>
  <div class="section">
    <div class="privacy-note">${ic('shield', 'ic sm')} <span>You approve every join, and you can move or remove anyone at any time. Blocked supporters never see you again — and are never told.</span></div>
  </div>`;
  renderTabs('students');
}

/* ---------- Student profile ---------- */
function rStudentProfile(sid) {
  const s = student(sid);
  if (!s) return go('#/students');
  const seg = S.seg[sid] || 'Updates';
  const segs = ['Updates', 'Needs', 'Prayer', 'Milestones', 'Team'];
  const own = isStudentP() && P().studentId === sid;
  let content = '';
  if (seg === 'Updates') {
    const ups = visUpdates(sid);
    content = ups.length ? `<div class="stack-12">${ups.map(updateCard).join('')}</div>`
      : `<div class="empty"><div class="e-art">🕊️</div><h3>Nothing shared with you yet</h3><p>${esc(s.name.split(' ')[0])} may be sharing with other circles — what you see here is what they’ve chosen for you.</p></div>`;
  }
  if (seg === 'Needs') {
    const ns = visNeeds(sid);
    content = ns.length ? `<div class="stack-12">${ns.map((n) => needCard(n, { hideStudent: true })).join('')}</div>`
      : `<div class="empty"><div class="e-art">🌿</div><h3>No visible needs</h3><p>Either everything’s covered, or open needs live in circles you’re not part of. Both are good news for ${esc(s.name.split(' ')[0])}.</p></div>`;
  }
  if (seg === 'Prayer') {
    const ps = visPrayers(sid);
    content = ps.length ? `<div class="stack-12">${ps.map((p) => prayerCard(p)).join('')}</div>`
      : `<div class="empty"><div class="e-art">🙏</div><h3>No requests visible to you</h3></div>`;
  }
  if (seg === 'Milestones') {
    const ms = DB.milestones.filter((m) => m.student === sid);
    content = `<div class="card"><div class="timeline">${ms.map((m) => `
      <div class="tl-item ${m.inDays < 50 ? 'soon' : ''}">
        <div class="tl-date">${esc(m.date)} · in ${m.inDays} days</div>
        <div class="strong mt-4">${esc(m.title)}</div>
        <div class="small muted mt-4">${esc(m.note)}</div>
      </div>`).join('')}</div></div>`;
  }
  if (seg === 'Team') {
    const circles = DB.circles[sid];
    content = `<div class="list">${circles.map((c) => `
      <div class="row"><span class="row-icon" style="background:var(--tint-navy);color:var(--navy)">${ic(c.icon)}</span>
      <span class="r-main"><span class="r-title">${esc(c.name)}</span><span class="r-sub">${c.members} members</span></span></div>`).join('')}
    </div>
    <div class="privacy-note mt-12">${ic('lock', 'ic sm')} <span>You can see circle names, not member lists — who supports ${esc(s.name.split(' ')[0])} is their business.</span></div>`;
  }
  $('#screen').className = 'screen screen-anim';
  $('#screen').innerHTML = `
  ${navBar(s.name.split(' ')[0], own ? '#/profile' : '#/students', own ? `<button class="nav-btn" onclick="go('#/privacy')">${ic('sliders')}</button>` : `<button class="nav-btn" onclick="openMoreSheet('${sid}')">•••</button>`)}
  <div class="section tc" style="margin-top:4px">
    <span class="avatar-wrap">${avatarHTML(s.avatar, 96)}<span class="dot ${dotClass[s.health]}" style="width:20px;height:20px;border-width:3px"></span></span>
    <h1 style="font-size:26px;font-weight:800;letter-spacing:-.02em;margin-top:10px">${esc(s.name)}</h1>
    <div class="small muted mt-4">${esc(s.cohort)}</div>
    <div class="hstack mt-8" style="justify-content:center;flex-wrap:wrap;gap:6px">
      <span class="chip c-${s.seasonHue}">${esc(s.season)}</span>
      <span class="chip c-sky">${ic('globe', 'ic sm')} ${esc(s.place)}</span>
    </div>
    <div class="small faint mt-8">${ic('people', 'ic sm')} ${esc(s.church)}</div>
  </div>

  <div class="section">
    <div class="stat-trio">
      <div class="stat"><div class="s-num">${s.supporters}</div><div class="s-label">supporters</div></div>
      <div class="stat"><div class="s-num">${s.prayers}</div><div class="s-label">prayers</div></div>
      <div class="stat"><div class="s-num">${s.openNeeds}</div><div class="s-label">open needs</div></div>
    </div>
  </div>

  ${own ? '' : `<div class="section"><div class="btn-row">
    <button class="btn btn-primary btn-sm">${ic('check', 'ic sm')} Following</button>
    <button class="btn btn-soft btn-sm" onclick="go('#/encourage/${sid}')">${ic('heart', 'ic sm')} Encourage</button>
    <button class="btn btn-soft btn-sm" onclick="S.seg['${sid}']='Prayer';render()">${ic('pray', 'ic sm')} Pray</button>
  </div></div>`}

  <div class="section">
    <div class="card">
      <div class="chip c-quiet">${ic('book', 'ic sm')} Why I’m doing Global Year</div>
      <div class="body mt-8" style="color:var(--ink)">${esc(s.why)}</div>
      <div class="meta mt-8">${esc(s.bio)}</div>
    </div>
  </div>

  <div class="segmented mt-16" style="margin-top:20px">
    ${segs.map((g) => `<button class="${seg === g ? 'on' : ''}" onclick="S.seg['${sid}']='${g}';render()">${g}</button>`).join('')}
  </div>
  <div class="section" style="margin-top:12px">${content}</div>`;
  renderTabs(own ? 'profile' : 'students');
}
function openMoreSheet(sid) {
  const s = student(sid);
  openSheet(`
    <h2>${esc(s.name)}</h2>
    <div class="list mt-8">
      <button class="row tappable" onclick="closeSheet();toast('Added to your personal prayer list','pray')"><span class="row-icon" style="background:var(--tint-navy);color:var(--navy)">${ic('pray')}</span><span class="r-main"><span class="r-title">Add to my prayer list</span></span></button>
      <button class="row tappable" onclick="closeSheet();openNotifPrefsSheet('${sid}')"><span class="row-icon" style="background:var(--tint-teal);color:var(--teal)">${ic('bell')}</span><span class="r-main"><span class="r-title">Notification preferences</span></span></button>
      <button class="row tappable" onclick="closeSheet();toast('Report sent to Global Year safety team — thank you','shield')"><span class="row-icon" style="background:var(--tint-clay);color:var(--danger)">${ic('flag')}</span><span class="r-main"><span class="r-title">Report a concern</span></span></button>
    </div>`);
}

/* ---------- Update composer ---------- */
function rComposeUpdate() {
  const s = isStudentP() ? myStudent() : student('maya');
  $('#screen').className = 'screen no-tabs screen-anim';
  $('#screen').innerHTML = `
  ${navBar('New update', '#/home', `<button class="nav-btn strong" onclick="postUpdate()">Post</button>`)}
  <div class="section" style="margin-top:8px">
    <div class="hstack">${avatarHTML(s.avatar, 40)}<div><div class="strong">${esc(s.name)}</div>
      <button class="chip ${S.composer.visibility === 'All supporters' ? 'c-teal' : 'c-clay'}" onclick="openVisibilitySheet()">${ic(S.composer.visibility === 'All supporters' ? 'people' : 'lock', 'ic sm')} ${esc(S.composer.visibility)} ▾</button>
    </div></div>
    <div class="field mt-12"><textarea id="upd-text" class="input" style="min-height:150px" placeholder="What’s happening in your corner of the world?">${esc(S.composer.text)}</textarea></div>
    <div class="hstack">
      <button class="chip c-quiet">${ic('camera', 'ic sm')} Photo</button>
      <button class="chip c-quiet">${ic('sparkle', 'ic sm')} Win</button>
      <button class="chip c-quiet">${ic('moon', 'ic sm')} Honest moment</button>
      <button class="chip c-quiet">${ic('pray', 'ic sm')} Attach prayer</button>
    </div>
    <div class="privacy-note mt-16">${ic('eye', 'ic sm')} <span><b>Before you post:</b> this will be visible to <b>${esc(S.composer.visibility)}</b>${S.composer.visibility === 'Family & Mentors' ? ' — that’s 9 people, and no one else' : ''}. Tap the chip above to change it.</span></div>
  </div>`;
  renderTabs(null);
  const ta = $('#upd-text');
  ta.addEventListener('input', () => { S.composer.text = ta.value; });
}
function openVisibilitySheet() {
  const opts = [
    ['All supporters', 'Everyone who follows you', 'people'],
    ['Church & Friends', 'Your church circle and friends', 'people'],
    ['Family & Friends', 'Family circle and friends', 'home'],
    ['Family & Mentors', 'Just family and your mentors', 'lock'],
    ['Only me', 'A private journal entry', 'lock'],
  ];
  openSheet(`
    <h2>Choose who can see this</h2>
    <div class="sheet-sub">You’re always one tap from smaller. Nothing is public on the internet — “everyone” means your approved supporters only.</div>
    <div class="list">
      ${opts.map(([v, d, i]) => `<button class="row tappable" onclick="S.composer.visibility='${v}';closeSheet();render()">
        <span class="row-icon" style="background:var(--tint-navy);color:var(--navy)">${ic(i)}</span>
        <span class="r-main"><span class="r-title">${v}</span><span class="r-sub">${d}</span></span>
        ${S.composer.visibility === v ? ic('check') : ''}
      </button>`).join('')}
    </div>`);
}
function postUpdate() {
  const s = isStudentP() ? myStudent() : student('maya');
  const text = (S.composer.text || '').trim() || 'Language school win today — I understood a whole joke. Laughed twice: once at the joke, once because I understood it.';
  S.postedUpdates.unshift({
    id: 'u-new-' + S.postedUpdates.length, student: s.id, when: 'Just now',
    visibility: S.composer.visibility, kind: 'update',
    title: text.length > 46 ? text.slice(0, 44) + '…' : text, body: text,
    photo: null, reactions: 0, prayers: 0,
  });
  const vis = S.composer.visibility;
  S.composer.text = '';
  haptic(15);
  toast(vis === 'All supporters' ? 'Shared with all your supporters' : `Shared with ${vis} — no one else can see it`, 'check', 4200);
  go('#/home');
}

/* ---------- Need creation flow ---------- */
function rComposeNeed() {
  const d = S.needDraft;
  const s = isStudentP() ? myStudent() : student('sarah');
  const stepTitles = ['What do you need?', 'The details', 'Who sees it & how it’s met'];
  let body = '';
  if (d.step === 0) body = `
    <div class="field"><label>Give it a clear title</label><input class="input" id="need-title" placeholder="e.g. Rain boots before wet season" value="${esc(d.title || '')}"></div>
    <div class="field"><label>Category</label>
      <div class="choice-grid">${DB.needCategories.map((c) => `<button class="choice ${d.category === c ? 'on' : ''}" onclick="captureNeedTitle();S.needDraft.category='${c}';render()">${c}</button>`).join('')}</div>
    </div>
    <div class="field"><label>A short, honest explanation</label><textarea class="input" placeholder="Your people want to help — tell them what would actually help."></textarea></div>`;
  if (d.step === 1) body = `
    <div class="field"><label>How urgent is it?</label>
      <div class="choice-grid">${['Whenever', 'This month', 'This week', 'Time-sensitive'].map((u) => `<button class="choice ${d.urgency === u ? 'on g-gold' : ''}" onclick="S.needDraft.urgency='${u}';render()">${u}</button>`).join('')}</div>
    </div>
    <div class="field"><label>Needed by (optional)</label><input class="input" value="Aug 15"></div>
    <div class="field"><label>Amount or item (optional)</label><input class="input" placeholder="$ amount, or an item description"></div>
    <div class="card">
      <div class="switch-row" onclick="S.needDraft.multi=!S.needDraft.multi;render()">
        <span class="s-main"><span class="s-title">Multiple people can help</span><span class="s-sub">Off means one person covers it fully</span></span>
        <span class="switch ${d.multi ? 'on' : ''}"></span>
      </div>
      <div class="switch-row" onclick="S.needDraft.anon=!S.needDraft.anon;render()">
        <span class="s-main"><span class="s-title">Allow anonymous support</span><span class="s-sub">Some people prefer to give quietly</span></span>
        <span class="switch ${d.anon ? 'on' : ''}"></span>
      </div>
    </div>
    <button class="chip c-quiet mt-12">${ic('link', 'ic sm')} Add a link, document, or image</button>`;
  if (d.step === 2) body = `
    <div class="field"><label>Visible to</label>
      <div class="choice-grid">${['All supporters', 'Church & Friends', 'Family & Friends', 'Family & Mentors'].map((v) => `<button class="choice ${d.visibility === v ? 'on g-teal' : ''}" onclick="S.needDraft.visibility='${v}';render()">${v}</button>`).join('')}</div>
    </div>
    <div class="card wash-navy">
      <div class="hstack">${ic('eye')} <h3>Before you post</h3></div>
      <div class="body mt-4">This need will be visible to <b>${esc(d.visibility)}</b>. They’ll see the title, your note, the deadline, and progress — never any pressure stats or leaderboards.</div>
    </div>
    <div class="privacy-note mt-12">${ic('heart', 'ic sm')} <span>Asking is not a burden. This is exactly what your community signed up for.</span></div>`;
  $('#screen').className = 'screen no-tabs screen-anim';
  $('#screen').innerHTML = `
  ${navBar('New need', '#/support')}
  <div class="steps">${[0, 1, 2].map((i) => `<i class="${i <= d.step ? 'on' : ''}"></i>`).join('')}</div>
  <div class="nav-large" style="padding-top:0"><h1 style="font-size:24px">${stepTitles[d.step]}</h1></div>
  <div class="section" style="margin-top:10px">
    ${body}
    <button class="btn btn-primary btn-block mt-16" onclick="needNext()">${d.step < 2 ? 'Continue' : 'Post need'}</button>
  </div>`;
  renderTabs(null);
  $('#screen .nav-btn').onclick = () => { if (S.needDraft.step > 0) { S.needDraft.step--; render(); } else go('#/support'); };
}
function captureNeedTitle() {
  const el = $('#need-title'); if (el) S.needDraft.title = el.value;
}
function needNext() {
  captureNeedTitle();
  if (S.needDraft.step < 2) { S.needDraft.step++; render(); return; }
  haptic(15);
  toast('Need posted. How can your community support you today? They’ll see it now.', 'check', 4200);
  S.needDraft = { step: 0, category: null, urgency: 'This week', visibility: 'All supporters', multi: true, anon: true };
  go('#/support');
}

/* ---------- Need detail + commitment flow ---------- */
function rNeedDetail(nid) {
  const n = DB.needs.find((x) => x.id === nid);
  if (!n) return go('#/support');
  const s = student(n.student);
  const own = isStudentP() && P().studentId === n.student;
  const mine = S.commitments.find((c) => c.needId === nid);
  const extra = S.needProgressExtra && S.needProgressExtra[nid] ? S.needProgressExtra[nid] : 0;
  const raised = n.raised != null ? n.raised + extra : null;
  const pct = n.amount ? Math.min(100, Math.round((raised / n.amount) * 100)) : null;
  $('#screen').className = 'screen no-tabs screen-anim';
  $('#screen').innerHTML = `
  ${navBar('Need', '#/support')}
  <div class="section" style="margin-top:4px">
    <div class="hstack">
      ${avatarHTML(s.avatar, 48)}
      <div class="grow"><div class="strong" style="font-size:16px">${esc(s.name)}</div><div class="small faint">${esc(s.place)} · posted ${esc(n.posted)}</div></div>
      <span class="chip ${n.status === 'fulfilled' ? 'c-forest' : 'c-' + n.urgencyHue}">${n.status === 'fulfilled' ? 'Fulfilled' : esc(n.urgency)}</span>
    </div>
    <h1 style="font-size:25px;font-weight:800;letter-spacing:-.02em;line-height:1.2;margin-top:14px">${esc(n.title)}</h1>
    <div class="hstack mt-8" style="flex-wrap:wrap;gap:6px">
      <span class="chip c-quiet">${esc(n.category)}</span>
      <span class="chip c-quiet">${ic('calendar', 'ic sm')} ${esc(n.due)}</span>
      ${chipVis(n.visibility)}
      ${n.anonymousOk ? '<span class="chip c-quiet">Anonymous OK</span>' : ''}
    </div>
    <div class="card mt-16"><div class="body" style="color:var(--ink);font-size:16px">${esc(n.body)}</div>
      ${pct != null ? `<div class="progress mt-16 ${n.status === 'fulfilled' || pct >= 100 ? 'p-forest' : ''}"><i style="width:${pct}%"></i></div>
      <div class="progress-label"><span>$${raised} of $${n.amount} covered</span><span>${pct}%</span></div>` : ''}
    </div>

    ${n.committed.length || mine ? `<div class="card wash-forest mt-12">
      <div class="hstack">${ic('people')} <h3>Help is already on the way</h3></div>
      <div class="body mt-4">${mine ? `You committed: ${esc(mine.what)} (${esc(mine.cadence)})${mine.reminder ? ' · reminder set' : ''}.` : esc(n.committed[0]) + '.'} Kindred coordinates commitments so nothing gets doubled up — and nothing falls through.</div>
    </div>` : ''}

    ${own ? `
      <div class="btn-row mt-16">
        <button class="btn btn-forest" onclick="toast('Marked fulfilled — your supporters will get a joyful little note','check',4200);go('#/support')">Mark fulfilled</button>
        <button class="btn btn-soft" onclick="toast('Need updated','check')">Edit</button>
      </div>` : n.status === 'fulfilled' ? `
      <div class="answered-banner mt-16"><div class="big">💛</div><h3>This one’s covered</h3><p>Thank you for showing up. ${esc(n.committed[0] || '')}</p></div>` : mine ? `
      <button class="btn btn-forest btn-block mt-16" onclick="openCommitmentDoneSheet('${nid}')">${ic('check')} You’re helping — view your commitment</button>` : `
      <div class="mt-16 stack-8">
        <button class="btn btn-primary btn-block" onclick="openCommitSheet('${nid}')">${ic('hand')} I can help</button>
        <div class="btn-row">
          <button class="btn btn-soft btn-sm" onclick="toast('You’re praying over this need 🙏','pray')">I’ll pray</button>
          <button class="btn btn-soft btn-sm" onclick="toast('Shared with your group — coordination beats duplication','send')">Share with my group</button>
        </div>
        <button class="btn btn-ghost btn-block btn-sm" onclick="toast('We’ll pass your suggestion along to ${esc(s.name.split(' ')[0])}','send')">I know someone who can help</button>
      </div>`}
  </div>`;
  renderTabs(null);
  $('#screen .nav-btn').onclick = () => history.back();
}

function openCommitSheet(nid, step = 0, pick = {}) {
  const n = DB.needs.find((x) => x.id === nid);
  const s = student(n.student);
  const options = n.amount
    ? [`I can cover this ($${n.amount - (n.raised || 0)} remaining)`, 'I can contribute part of it', 'I can help another way']
    : n.category === 'Encouragement' ? ['I’ll write a letter this week', 'I’ll send a photo from home', 'I’ll record a voice message']
    : n.category === 'Communication' ? ['Weekly call — Sundays', 'Weekly call — Wednesdays', 'Every other week works better']
    : ['I can take care of this', 'I can do part of it', 'I can help another way'];
  if (step === 0) {
    openSheet(`
      <h2>How would you like to help?</h2>
      <div class="sheet-sub">${esc(s.name.split(' ')[0])} asked for: ${esc(n.title.toLowerCase())}. Be specific — clarity is kindness.</div>
      <div class="list">
        ${options.map((o) => `<button class="row tappable" onclick='openCommitSheet("${nid}",1,{what:${JSON.stringify(o)}})'>
          <span class="row-icon" style="background:var(--tint-forest);color:var(--forest)">${ic('check')}</span>
          <span class="r-main"><span class="r-title" style="font-size:15px">${o}</span></span>${ic('chevR', 'ic sm')}
        </button>`).join('')}
      </div>
      ${n.anonymousOk ? `<div class="privacy-note mt-12">${ic('eye', 'ic sm')} <span>You can choose to stay anonymous on the next step.</span></div>` : ''}`);
    return;
  }
  if (step === 1) {
    sheetBody(`
      <h2>Make it real</h2>
      <div class="sheet-sub">“${esc(pick.what)}” — a few details so ${esc(s.name.split(' ')[0])} knows exactly what to expect.</div>
      <div class="card">
        <div class="switch-row" onclick="this.querySelector('.switch').classList.toggle('on')">
          <span class="s-main"><span class="s-title">One-time</span><span class="s-sub">Toggle off if this is ongoing (e.g. weekly)</span></span>
          <span class="switch on"></span>
        </div>
        <div class="switch-row" onclick="this.querySelector('.switch').classList.toggle('on')">
          <span class="s-main"><span class="s-title">Remind me</span><span class="s-sub">A nudge the day before it’s due (${esc(n.due)})</span></span>
          <span class="switch on"></span>
        </div>
        ${n.anonymousOk ? `<div class="switch-row" onclick="this.querySelector('.switch').classList.toggle('on')">
          <span class="s-main"><span class="s-title">Give anonymously</span><span class="s-sub">${esc(s.name.split(' ')[0])} sees the help, not your name</span></span>
          <span class="switch"></span>
        </div>` : ''}
      </div>
      <div class="privacy-note mt-12">${ic('people', 'ic sm')} <span>${n.committed.length ? esc(n.committed[0]) + ' — your commitment will be coordinated with theirs.' : 'You’re the first to commit. ' + esc(s.name.split(' ')[0]) + ' will confirm the details with you.'}</span></div>
      <button class="btn btn-forest btn-block mt-16" onclick='confirmCommit("${nid}", ${JSON.stringify(pick.what)})'>Confirm — I’m in</button>
      <button class="btn btn-ghost btn-block" onclick="closeSheet()">Not yet</button>`);
  }
}
function confirmCommit(nid, what) {
  S.commitments.push({ needId: nid, what, cadence: 'one-time', reminder: true });
  if (!S.needProgressExtra) S.needProgressExtra = {};
  const n = DB.needs.find((x) => x.id === nid);
  if (n.amount) S.needProgressExtra[nid] = n.amount - (n.raised || 0);
  closeSheet();
  haptic(25);
  toast('Help is on the way. ' + student(n.student).name.split(' ')[0] + ' will be so glad you’re in this. 💛', 'heart', 4500);
  render();
}
function openCommitmentDoneSheet(nid) {
  const mine = S.commitments.find((c) => c.needId === nid);
  const n = DB.needs.find((x) => x.id === nid);
  openSheet(`
    <h2>Your commitment</h2>
    <div class="card wash-forest"><div class="hstack">${ic('check')} <h3>${esc(mine.what)}</h3></div>
    <div class="body mt-4">${esc(n.due)} · reminder set · ${student(n.student).name.split(' ')[0]} has been notified.</div></div>
    <button class="btn btn-soft btn-block mt-12" onclick="closeSheet();toast('We’ll check in with you the day before','bell')">Adjust reminder</button>
    <button class="btn btn-danger-soft btn-block mt-8" onclick="closeSheet();toast('No shame — thanks for telling us early so others can step in','heart',4200)">I can no longer help</button>`);
}

/* ---------- Support tab ---------- */
function rSupport() {
  const p = P();
  if (p.role === 'student') return rSupportStudent();
  const seg = S.supportSeg;
  const open = DB.needs.filter((n) => n.status === 'open' && (p.follows || []).includes(n.student) && canSee(n.visibility, n.student));
  const done = DB.needs.filter((n) => n.status === 'fulfilled' && (p.follows || []).includes(n.student));
  let content = '';
  if (seg === 'explore') {
    content = open.length ? `<div class="stack-12">${open.map((n) => needCard(n)).join('')}</div>
      ${done.length ? `<div class="section-head mt-24" style="padding:0"><h2 style="font-size:17px">Recently fulfilled 🎉</h2></div><div class="stack-12">${done.map((n) => needCard(n)).join('')}</div>` : ''}`
      : `<div class="empty"><div class="e-art">🌿</div><h3>All quiet right now</h3><p>No open needs from your students. We’ll nudge you gently when that changes.</p></div>`;
  }
  if (seg === 'mine') {
    content = S.commitments.length ? `<div class="stack-12">${S.commitments.map((c) => {
      const n = DB.needs.find((x) => x.id === c.needId);
      return `<button class="card tappable" style="display:block;width:100%;text-align:left" onclick="go('#/need/${n.id}')">
        <div class="hstack"><span class="row-icon" style="background:var(--tint-forest);color:var(--forest)">${ic('check')}</span>
        <div class="grow"><h3>${esc(c.what)}</h3><div class="meta" style="margin-top:2px">${esc(n.title)} · ${esc(student(n.student).name.split(' ')[0])} · ${esc(n.due)}</div></div></div>
        <div class="nudge mt-12">${ic('bell', 'ic sm')} <span>Reminder set for the day before. You’ve got this.</span></div>
      </button>`;
    }).join('')}</div>`
      : `<div class="empty"><div class="e-art">🤲</div><h3>No commitments yet</h3><p>When you offer to help with a need, it lives here — with reminders so nothing slips.</p><button class="btn btn-soft" onclick="S.supportSeg='explore';render()">Browse open needs</button></div>`;
  }
  if (seg === 'history') {
    content = `<div class="card wash-forest">
      <div class="hstack">${ic('heart')} <h3>Your support story</h3></div>
      <div class="body mt-4">A quiet record — for you, not a leaderboard.</div>
      <div class="list mt-12" style="box-shadow:none;border:1px solid var(--hairline)">
        ${[
          ['pray', 'Prayed for Sarah’s timeline', 'This morning'],
          ['check', 'Helped meet: Art supplies for kids’ club', 'Jun 20'],
          ['heart', 'Sent encouragement to Maya', 'Jun 28'],
          ['pray', 'Prayed for the Ramos family’s house', 'Jun 26'],
        ].concat(S.commitments.map((c) => ['check', 'Committed: ' + c.what, 'Today'])).map(([i, t, w]) => `
        <div class="row"><span class="row-icon" style="background:#fff;color:var(--forest)">${ic(i)}</span>
        <span class="r-main"><span class="r-title" style="font-size:14.5px">${esc(t)}</span></span><span class="r-side">${esc(w)}</span></div>`).join('')}
      </div>
    </div>`;
  }
  $('#screen').className = 'screen screen-anim';
  $('#screen').innerHTML = `
  <div class="nav-large"><div class="kicker">Real needs, real help</div><h1>Support</h1></div>
  <div class="segmented" style="margin-top:8px">
    ${[['explore', 'Open needs'], ['mine', 'My commitments'], ['history', 'History']].map(([id, l]) => `<button class="${seg === id ? 'on' : ''}" onclick="S.supportSeg='${id}';render()">${l}${id === 'mine' && S.commitments.length ? ' · ' + S.commitments.length : ''}</button>`).join('')}
  </div>
  <div class="section" style="margin-top:14px">${content}</div>`;
  renderTabs('support');
}

function rSupportStudent() {
  const s = myStudent();
  const mine = DB.needs.filter((n) => n.student === s.id);
  $('#screen').className = 'screen screen-anim';
  $('#screen').innerHTML = `
  <div class="nav-large"><div class="kicker">You’re allowed to ask</div><h1>Your needs</h1></div>
  <div class="section" style="margin-top:8px">
    <button class="btn btn-primary btn-block" onclick="go('#/compose-need')">${ic('plus')} Add a need</button>
    <div class="privacy-note mt-12">${ic('heart', 'ic sm')} <span>How can your community support you today? Asking clearly is a gift to the people who love you.</span></div>
  </div>
  <div class="section"><div class="stack-12">${mine.map((n) => needCard(n, { hideStudent: true })).join('')}</div></div>
  <div class="section">
    <div class="card wash-gold">
      <div class="hstack">${ic('star')} <h3>Support goal — just for you</h3></div>
      <div class="body mt-4">Your year is <b>68% funded</b>. Only you and the people you explicitly choose can see this number. No countdowns, no comparison, no pressure.</div>
      <div class="progress mt-12"><i style="width:68%"></i></div>
      <div class="progress-label"><span>Quiet progress</span><span>Visible to: Only me</span></div>
    </div>
  </div>`;
  renderTabs('support');
}

/* ---------- Prayer tab ---------- */
function rPrayer() {
  const p = P();
  if (p.role === 'student') return rPrayerStudent();
  const vis = DB.prayers.filter((pr) => (p.follows || []).includes(pr.student) && canSee(pr.visibility, pr.student));
  const urgent = vis.filter((pr) => pr.urgent && !S.prayed[pr.id] && S.prayerStatus[pr.id] !== 'answered');
  const rest = vis.filter((pr) => !urgent.includes(pr) && S.prayerStatus[pr.id] !== 'answered');
  const answered = vis.filter((pr) => S.prayerStatus[pr.id] === 'answered');
  $('#screen').className = 'screen screen-anim';
  $('#screen').innerHTML = `
  <div class="nav-large"><div class="kicker">A quiet space</div><h1>Prayer</h1>
  <p class="muted mt-4" style="font-size:15px">Today’s requests from your students. Take your time.</p></div>
  ${answered.length ? `<div class="section" style="margin-top:8px">
    ${answered.map((pr) => `<div class="answered-banner"><div class="big">✨</div><h3>This prayer has been answered</h3><p>“${esc(pr.title)}” — ${esc(student(pr.student).name.split(' ')[0])} wants you to know your prayers were part of this.</p></div>`).join('')}
  </div>` : ''}
  ${urgent.length ? `<div class="section" style="margin-top:10px">
    <div class="section-head"><h2>Could use prayer today</h2></div>
    <div class="stack-12">${urgent.map((pr) => prayerCard(pr)).join('')}</div>
  </div>` : ''}
  <div class="section">
    <div class="section-head"><h2>Ongoing</h2></div>
    <div class="stack-12">${rest.length ? rest.map((pr) => prayerCard(pr)).join('') : '<div class="empty"><div class="e-art">🙏</div><h3>Nothing waiting</h3><p>You’re caught up. Thank you for praying.</p></div>'}</div>
  </div>
  <div class="section">
    <div class="list">
      <button class="row tappable" onclick="openReminderSheet()">
        <span class="row-icon" style="background:var(--tint-navy);color:var(--navy)">${ic('clock')}</span>
        <span class="r-main"><span class="r-title">Prayer reminders</span><span class="r-sub">Daily at 7:30am · tap to change</span></span>${ic('chevR', 'ic sm')}
      </button>
      <button class="row tappable" onclick="toast('Your private prayer list is just for you','lock')">
        <span class="row-icon" style="background:var(--tint-teal);color:var(--teal)">${ic('book')}</span>
        <span class="r-main"><span class="r-title">My prayer list & notes</span><span class="r-sub">Private — only you can see these</span></span>${ic('chevR', 'ic sm')}</button>
    </div>
  </div>`;
  renderTabs('prayer');
}
function openReminderSheet() {
  openSheet(`
    <h2>Prayer reminders</h2>
    <div class="sheet-sub">Gentle, and entirely yours to shape.</div>
    <div class="field"><label>Rhythm</label><div class="choice-grid">
      ${['Daily', 'Weekdays', 'Weekly', 'Around urgent requests', 'Off'].map((r, i) => `<button class="choice ${i === 0 ? 'on' : ''}">${r}</button>`).join('')}
    </div></div>
    <div class="field"><label>Time</label><input class="input" value="7:30 AM"></div>
    <button class="btn btn-primary btn-block" onclick="closeSheet();toast('Reminder set — daily at 7:30am','bell')">Save</button>`);
}

function rPrayerStudent() {
  const s = myStudent();
  const mine = DB.prayers.filter((pr) => pr.student === s.id);
  $('#screen').className = 'screen screen-anim';
  $('#screen').innerHTML = `
  <div class="nav-large"><div class="kicker">Covered in prayer</div><h1>Prayer</h1></div>
  <div class="section" style="margin-top:8px">
    <button class="btn btn-primary btn-block" onclick="toast('New request — choose its audience before posting','pray')">${ic('plus')} Add a prayer request</button>
  </div>
  <div class="section">
    <div class="section-head"><h2>Your requests</h2></div>
    <div class="stack-12">${mine.map((pr) => prayerCard(pr)).join('')}</div>
  </div>
  <div class="section">
    <div class="card wash-navy">
      <div class="hstack">${ic('people')} <h3>Prayer Circle</h3></div>
      <div class="body mt-4">Invite a trusted few into a focused prayer space — for the things that need more than a card in a feed.</div>
      <button class="btn btn-soft btn-block btn-sm mt-12" onclick="toast('Prayer Circle created — invite up to 8 trusted people','people')">Start a circle</button>
    </div>
  </div>`;
  renderTabs('prayer');
}

/* ---------- Prayer detail + "I Prayed" ---------- */
function rPrayerDetail(pid) {
  const pr = DB.prayers.find((x) => x.id === pid);
  if (!pr) return go('#/prayer');
  const s = student(pr.student);
  const own = isStudentP() && P().studentId === pr.student;
  const prayed = !!S.prayed[pid];
  const answered = S.prayerStatus[pid] === 'answered';
  const count = pr.prayedCount + (prayed ? 1 : 0);
  $('#screen').className = 'screen no-tabs screen-anim';
  $('#screen').innerHTML = `
  ${navBar('Prayer request', '#/prayer')}
  <div class="section" style="margin-top:4px">
    <div class="hstack">
      ${avatarHTML(s.avatar, 48)}
      <div class="grow"><div class="strong" style="font-size:16px">${esc(s.name)}</div><div class="small faint">${esc(pr.posted)} ${pr.urgent && !answered ? '· <b style="color:#8A5F1D">' + esc(pr.urgency) + '</b>' : ''}</div></div>
      ${chipVis(pr.visibility)}
    </div>
    <h1 style="font-size:25px;font-weight:800;letter-spacing:-.02em;line-height:1.2;margin-top:14px">${esc(pr.title)}</h1>
    <div class="card mt-12"><div class="body" style="color:var(--ink);font-size:16px;line-height:1.55">${esc(pr.body)}</div></div>

    ${answered ? `<div class="answered-banner mt-16">
      <div class="big">✨</div><h3>This prayer has been answered</h3>
      <p>${esc(s.name.split(' ')[0])} marked this answered and thanked everyone who prayed. ${count} people carried this together.</p>
    </div>` : ''}

    <div class="nudge mt-16">${ic('pray', 'ic sm')} <span>This request has been prayed for by <b>${count} people</b>.${prayed ? ' Including you. 💛' : ''}</span></div>

    ${own ? `
    <div class="section-head mt-24" style="padding:0"><h2 style="font-size:17px">Manage this request</h2></div>
    <div class="segmented" style="margin:8px 0 0">
      ${['Ongoing', 'Answered', 'Updated', 'Private'].map((st) => `<button class="${(answered ? 'Answered' : 'Ongoing') === st ? 'on' : ''}" onclick="${st === 'Answered' ? `markAnswered('${pid}')` : `toast('Status: ${st}','check')`}">${st}</button>`).join('')}
    </div>
    ${answered ? `<button class="btn btn-gold btn-block mt-16" onclick="openThanksSheet('${pid}')">${ic('heart')} Thank your community</button>` : ''}` : `
    <button class="pray-btn mt-16 ${prayed ? 'prayed' : ''}" onclick="pressPray(event,'${pid}')">
      ${prayed ? ic('check') + ' You prayed — thank you' : ic('pray') + ' I prayed for ' + esc(s.name.split(' ')[0])}
    </button>
    ${prayed ? `<button class="btn btn-soft btn-block mt-8" onclick="openPrayedNoteSheet('${pid}')">Let ${esc(s.name.split(' ')[0])} know you’re praying</button>` : ''}
    <div class="card mt-16">
      <div class="hstack">${ic('lock')} <h3 style="font-size:15px">Private prayer note</h3></div>
      <div class="field mt-8" style="margin-bottom:0"><textarea class="input" style="min-height:76px" placeholder="Only you will ever see this…">${esc(S.prayerNotes[pid] || '')}</textarea></div>
    </div>
    <button class="btn btn-ghost btn-block btn-sm mt-8" onclick="openReminderSheet()">${ic('clock', 'ic sm')} Remind me to keep praying for this</button>`}
  </div>`;
  renderTabs(null);
  $('#screen .nav-btn').onclick = () => history.back();
}
function pressPray(ev, pid) {
  const btn = ev.currentTarget;
  const r = document.createElement('span');
  r.className = 'pray-ripple';
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  r.style.width = r.style.height = size + 'px';
  r.style.left = (ev.clientX - rect.left - size / 2) + 'px';
  r.style.top = (ev.clientY - rect.top - size / 2) + 'px';
  btn.appendChild(r);
  haptic(30);
  if (!S.prayed[pid]) {
    S.prayed[pid] = true;
    setTimeout(() => { render(); toast('Amen. Thank you for showing up. 🙏', 'pray', 3600); }, 420);
  }
}
function openPrayedNoteSheet(pid) {
  const pr = DB.prayers.find((x) => x.id === pid);
  const s = student(pr.student);
  openSheet(`
    <h2>Would you like to let ${esc(s.name.split(' ')[0])} know?</h2>
    <div class="sheet-sub">A short word with your prayer doubles the encouragement. Totally optional.</div>
    <div class="field"><textarea class="input" placeholder="Praying for you today — ">Praying for you today. You are not carrying this alone.</textarea></div>
    <div class="btn-row">
      <button class="btn btn-soft" onclick="closeSheet()">Just the prayer</button>
      <button class="btn btn-primary" onclick="closeSheet();toast('Sent with your prayer 💛','send')">Send note</button>
    </div>`);
}
function markAnswered(pid) {
  S.prayerStatus[pid] = 'answered';
  haptic(30);
  render();
  toast('Marked answered — what a moment ✨', 'sparkle', 3800);
}
function openThanksSheet(pid) {
  const pr = DB.prayers.find((x) => x.id === pid);
  openSheet(`
    <h2>Thank your community</h2>
    <div class="sheet-sub">${pr.prayedCount + (S.prayed[pid] ? 1 : 0)} people prayed for “${esc(pr.title)}”. They’ll get a gentle, joyful note — never a broadcast blast.</div>
    <div class="field"><textarea class="input">IT CAME THROUGH. Visa approved — I get to stay with my kids through the showcase. Thank you for praying me through this. Every single one of you was part of it. 🎉</textarea></div>
    <button class="btn btn-gold btn-block" onclick="closeSheet();toast('Your thanks reached 51 people who prayed ✨','heart',4200)">Send to everyone who prayed</button>`);
}

/* ---------- Encouragement composer ---------- */
function rEncourage(sid) {
  const s = student(sid || 'maya');
  const kind = S.encKind || 'Note';
  const sched = !!S.encSched;
  const bday = DB.milestones.find((m) => m.student === s.id && m.icon === 'cake');
  $('#screen').className = 'screen no-tabs screen-anim';
  $('#screen').innerHTML = `
  ${navBar('Encourage ' + s.name.split(' ')[0], '#/home')}
  <div class="section" style="margin-top:4px">
    <div class="hstack">${avatarHTML(s.avatar, 48)}<div class="grow"><div class="strong">${esc(s.name)}</div><div class="small faint">${esc(s.place)} · feeling ${esc(s.mood.toLowerCase())} ${s.moodEmoji}</div></div></div>
    <div class="choice-grid mt-16">
      ${[['Note', 'pen'], ['Verse', 'book'], ['Voice', 'mic'], ['Photo', 'camera'], ['Thinking of you', 'heart']].map(([k, i]) => `<button class="choice ${kind === k ? 'on' : ''}" onclick="S.encKind='${k}';render()">${ic(i, 'ic sm')} ${k}</button>`).join('')}
    </div>
    ${kind === 'Voice' ? `<div class="card mt-12 tc" style="padding:26px"><div style="font-size:34px">🎙️</div><div class="strong mt-8">Hold to record</div><div class="small faint mt-4">Up to 2 minutes — your actual voice beats perfect words.</div></div>`
      : kind === 'Photo' ? `<div class="card mt-12 tc" style="padding:26px"><div style="font-size:34px">🖼️</div><div class="strong mt-8">Add a photo from home</div><div class="small faint mt-4">The kitchen. The dog. Their seat at church. Ordinary is the whole point.</div></div>`
      : kind === 'Thinking of you' ? `<div class="card mt-12 tc" style="padding:26px"><div style="font-size:34px">💛</div><div class="strong mt-8">One tap, fully felt</div><div class="small faint mt-4">${esc(s.name.split(' ')[0])} sees a warm “someone’s thinking of you” moment.</div></div>`
      : `<div class="field mt-12"><textarea class="input" style="min-height:120px" placeholder="${kind === 'Verse' ? 'Paste a verse or quote that made you think of them…' : 'A little encouragement goes a long way…'}">${sid === 'maya' && S.persona === 'dana' ? 'Happy 20th birthday, love. Twenty years ago you made me a mom — this year you’ve made me a student of your courage. Eat something delicious for me. I’m so proud. — Mom' : ''}</textarea></div>`}
    <div class="card mt-12">
      <div class="switch-row" onclick="S.encSched=!S.encSched;render()">
        <span class="s-main"><span class="s-title">Schedule delivery</span><span class="s-sub">Land it on the exact right day</span></span>
        <span class="switch ${sched ? 'on' : ''}"></span>
      </div>
      ${sched ? `<div class="choice-grid" style="padding:6px 0 10px">
        ${bday ? `<button class="choice ${S.encDate === bday.date ? 'on g-gold' : ''}" onclick="S.encDate='${bday.date}';render()">🎂 ${bday.title.includes('birthday') ? 'Birthday · ' : ''}${bday.date}</button>` : ''}
        <button class="choice ${S.encDate === 'travel' ? 'on g-gold' : ''}" onclick="S.encDate='travel';render()">Before a travel day</button>
        <button class="choice ${S.encDate === 'custom' ? 'on g-gold' : ''}" onclick="S.encDate='custom';render()">Pick a date…</button>
      </div>` : ''}
      <div class="switch-row" onclick="this.querySelector('.switch').classList.toggle('on')">
        <span class="s-main"><span class="s-title">Send anonymously</span><span class="s-sub">Signed “someone in your corner”</span></span>
        <span class="switch"></span>
      </div>
    </div>
    <button class="btn btn-primary btn-block mt-16" onclick="sendEncouragement('${s.id}')">${sched ? 'Schedule it' : 'Send now'}</button>
    <div class="tc small faint mt-8">Goes to ${esc(s.name.split(' ')[0])}’s Encouragement Wall — a keepsake, not a feed.</div>
  </div>`;
  renderTabs(null);
  $('#screen .nav-btn').onclick = () => history.back();
}
function sendEncouragement(sid) {
  const s = student(sid);
  haptic(20);
  if (S.encSched) {
    const when = S.encDate && S.encDate !== 'custom' && S.encDate !== 'travel' ? S.encDate : S.encDate === 'travel' ? 'her next travel day' : 'your chosen date';
    toast(`Scheduled 🎁 We’ll deliver it to ${s.name.split(' ')[0]} on ${when}.`, 'calendar', 4500);
  } else {
    toast(`Sent. ${s.name.split(' ')[0]} will feel this one. 💛`, 'heart', 3800);
  }
  S.encKind = 'Note'; S.encSched = false; S.encDate = null;
  go('#/home');
}

/* ---------- Encouragement Wall ---------- */
function rWall(sid) {
  const s = student(sid || (isStudentP() ? P().studentId : 'maya'));
  const notes = DB.wall[s.id] || [];
  const f = S.wallFilter;
  const filtered = f === 'All' ? notes : notes.filter((n) => ({ Notes: 'note', Verses: 'verse', Voice: 'voice', Photos: 'photo' }[f]) === n.kind);
  const own = isStudentP() && P().studentId === s.id;
  $('#screen').className = 'screen no-tabs screen-anim';
  $('#screen').innerHTML = `
  ${navBar('Encouragement Wall', own ? '#/home' : '#/student/' + s.id)}
  <div class="nav-large" style="padding-top:0">
    <h1 style="font-size:26px">${own ? 'Words that carried you' : s.name.split(' ')[0] + '’s wall'}</h1>
    <p class="muted mt-4" style="font-size:15px">${own ? 'Every note, kept. For the hard days and the good ones.' : 'What their community has spoken over them.'}</p>
  </div>
  <div class="section" style="margin-top:6px">
    <div class="choice-grid">${['All', 'Notes', 'Verses', 'Voice', 'Photos'].map((x) => `<button class="choice ${f === x ? 'on' : ''}" onclick="S.wallFilter='${x}';render()">${x}</button>`).join('')}</div>
    <div class="mt-16">
      ${filtered.length ? filtered.map((w) => `
        <div class="wall-note k-${w.kind}">
          <div class="w-from"><span class="avatar sz-24 hue-${w.hue}">${esc(w.from[0])}</span> ${esc(w.from)} ${w.kind === 'verse' ? '· 📖' : w.kind === 'voice' ? '· 🎙️' : w.kind === 'photo' ? '· 🖼️' : ''}</div>
          <div class="w-text">${esc(w.text)}</div>
          <div class="w-when">${esc(w.when)}${own ? ' · <b>Save to favorites</b>' : ''}</div>
        </div>`).join('') : '<div class="empty"><div class="e-art">📮</div><h3>None here yet</h3><p>Try another filter.</p></div>'}
    </div>
    ${own ? '' : `<button class="btn btn-primary btn-block mt-16" onclick="go('#/encourage/${s.id}')">${ic('heart')} Add to the wall</button>`}
  </div>`;
  renderTabs(null);
  $('#screen .nav-btn').onclick = () => history.back();
}

/* ---------- Support circle management ---------- */
function rCircles() {
  const s = isStudentP() ? myStudent() : student('maya');
  const circles = DB.circles[s.id];
  $('#screen').className = 'screen no-tabs screen-anim';
  $('#screen').innerHTML = `
  ${navBar('Support circles', '#/students', `<button class="nav-btn" onclick="toast('New circle created — set what it can see','plus')">${ic('plus')}</button>`)}
  <div class="nav-large" style="padding-top:0"><h1 style="font-size:26px">Who sees what</h1>
  <p class="muted mt-4" style="font-size:15px">Circles are how you stay honest <i>and</i> safe. Each person lives in one circle; each circle sees only what you allow.</p></div>
  <div class="section" style="margin-top:6px">
    ${circles.map((c) => `
      <button class="card tappable" style="display:block;width:100%;text-align:left" onclick="openCircleSheet('${s.id}','${c.id}')">
        <div class="hstack">
          <span class="row-icon" style="background:var(--tint-navy);color:var(--navy)">${ic(c.icon)}</span>
          <div class="grow"><h3>${esc(c.name)}</h3><div class="small muted">${c.members} members</div></div>
          ${ic('chevR', 'ic sm')}
        </div>
        <div class="meta">${ic('eye', 'ic sm')} ${esc(c.sees)}</div>
      </button>`).join('')}
    <div class="privacy-note mt-12">${ic('shield', 'ic sm')} <span>Removing someone is quiet — they simply stop seeing new things. Blocking also hides everything past. Neither sends them a notification.</span></div>
  </div>`;
  renderTabs(null);
  $('#screen .nav-btn').onclick = () => history.back();
}
function openCircleSheet(sid, cid) {
  const c = DB.circles[sid].find((x) => x.id === cid);
  openSheet(`
    <h2>${esc(c.name)}</h2>
    <div class="sheet-sub">${c.members} members · choose what this circle can see.</div>
    <div class="card">
      ${[['General updates', true], ['Personal updates', cid === 'family' || cid === 'mentors' || cid === 'care'], ['Public prayer requests', true], ['Sensitive prayer requests', cid === 'care' || cid === 'family'], ['Practical needs', cid !== 'financial'], ['Financial needs', cid === 'financial' || cid === 'family'], ['Wellbeing check-ins I share', cid === 'care' || cid === 'mentors']].map(([t, on]) => `
      <div class="switch-row" onclick="this.querySelector('.switch').classList.toggle('on')">
        <span class="s-main"><span class="s-title" style="font-size:14.5px">${t}</span></span>
        <span class="switch ${on ? 'on' : ''}"></span>
      </div>`).join('')}
    </div>
    <div class="btn-row mt-12">
      <button class="btn btn-soft btn-sm" onclick="closeSheet();go('#/invite')">Invite to this circle</button>
      <button class="btn btn-primary btn-sm" onclick="closeSheet();toast('Circle permissions saved','check')">Save</button>
    </div>`);
}

/* ---------- Wellbeing check-in ---------- */
function rCheckin() {
  const mood = S.checkinMood;
  const concerning = ['Homesick', 'Overwhelmed', 'Need support', 'Tired'].includes(mood);
  $('#screen').className = 'screen no-tabs screen-anim';
  $('#screen').innerHTML = `
  ${navBar('Check-in', '#/home')}
  <div class="nav-large" style="padding-top:0"><h1 style="font-size:26px">How are you, really?</h1>
  <p class="muted mt-4" style="font-size:15px">This is for you first. Nothing is shared unless you choose it.</p></div>
  <div class="section" style="margin-top:6px">
    <div class="mood-grid">
      ${DB.moods.map((m) => `<button class="mood ${mood === m.label ? 'on' : ''}" onclick="S.checkinMood='${m.label}';haptic(10);render()"><span class="m-emoji">${m.emoji}</span>${m.label}</button>`).join('')}
    </div>

    ${mood && !concerning ? `
    <div class="card mt-16">
      <h3>Who can see this check-in?</h3>
      <div class="choice-grid mt-12">
        ${['Only me', 'Mentors', 'Family', 'All supporters'].map((v, i) => `<button class="choice ${i === 0 ? 'on g-teal' : ''}">${v}</button>`).join('')}
      </div>
      <button class="btn btn-primary btn-block btn-sm mt-12" onclick="toast('Checked in — ${mood} ${DB.moods.find((m) => m.label === mood).emoji}','check');go('#/home')">Save check-in</button>
    </div>` : ''}

    ${mood && concerning ? `
    <div class="card wash-clay mt-16">
      <h3>Thanks for being honest. 💛</h3>
      <div class="body mt-4">Feeling ${mood.toLowerCase()} is part of a real year, not a failure. Would any of these help right now? (You can also just save it privately.)</div>
    </div>
    <div class="list mt-12">
      ${[
        ['person', 'Ask a trusted mentor to reach out', 'Rachel (your mentor) gets a gentle note — only her', 'mentor'],
        ['people', 'Ask my care team to check in', 'Your 4-person care team, privately', 'care'],
        ['pray', 'Turn this into a prayer request', 'You choose who sees it', 'prayer'],
        ['hand', 'Create a practical need', 'Sometimes support looks like logistics', 'need'],
        ['lock', 'Keep this private', 'Saved to your journal — only you', 'private'],
      ].map(([i, t, sub, act]) => `<button class="row tappable" onclick="checkinAction('${act}')">
        <span class="row-icon" style="background:var(--tint-navy);color:var(--navy)">${ic(i)}</span>
        <span class="r-main"><span class="r-title" style="font-size:15px">${t}</span><span class="r-sub">${sub}</span></span>${ic('chevR', 'ic sm')}
      </button>`).join('')}
    </div>
    <div class="privacy-note mt-12">${ic('shield', 'ic sm')} <span>Nothing here is ever shared automatically. If you’re in a hard place right now, the <b onclick="go('#/safety')" style="cursor:pointer">safety check-in</b> is always one tap away.</span></div>` : ''}
  </div>`;
  renderTabs(null);
}
function checkinAction(act) {
  haptic(15);
  if (act === 'mentor') {
    openSheet(`
      <h2>Ask Rachel to reach out?</h2>
      <div class="sheet-sub">Rachel Kim (your mentor) will get: <i>“Elijah checked in feeling homesick and would like to talk when you have a moment.”</i> No one else sees this.</div>
      <div class="hstack card"><span class="avatar sz-40 hue-teal">RK</span><div class="grow"><div class="strong">Rachel Kim</div><div class="small faint">Mentor · usually replies within a day</div></div></div>
      <button class="btn btn-primary btn-block mt-12" onclick="closeSheet();S.mentorRequested=true;toast('Rachel will reach out soon. Well done asking. 💛','heart',4500);go('#/home')">Yes, let her know</button>
      <button class="btn btn-ghost btn-block" onclick="closeSheet()">Not right now</button>`);
  } else if (act === 'care') {
    toast('Your care team will check in privately 💛', 'people', 4000); go('#/home');
  } else if (act === 'prayer') {
    toast('Draft prayer request created — choose its audience', 'pray'); go('#/prayer');
  } else if (act === 'need') {
    go('#/compose-need');
  } else {
    toast('Saved privately. Only you.', 'lock'); go('#/home');
  }
}

/* ---------- Milestone timeline ---------- */
function rMilestones(arg) {
  const p = P();
  const sid = arg && arg !== 'all' ? arg : null;
  const list = DB.milestones
    .filter((m) => sid ? m.student === sid : (p.follows || [p.studentId]).includes(m.student))
    .sort((a, b) => a.inDays - b.inDays);
  const title = sid ? student(sid).name.split(' ')[0] + '’s year' : 'The year ahead';
  $('#screen').className = 'screen no-tabs screen-anim';
  $('#screen').innerHTML = `
  ${navBar('Milestones', '#/home')}
  <div class="nav-large" style="padding-top:0"><h1 style="font-size:26px">${title}</h1>
  <p class="muted mt-4" style="font-size:15px">Birthdays, deadlines, travel days, homecomings — the moments to show up for.</p></div>
  <div class="section" style="margin-top:6px">
    <div class="card"><div class="timeline">
      ${list.map((m) => {
        const s = student(m.student);
        return `<div class="tl-item ${m.inDays < 50 ? 'soon' : ''}">
          <div class="tl-date">${esc(m.date)} · in ${m.inDays} days</div>
          <div class="strong mt-4">${esc(m.title)}</div>
          <div class="small muted mt-4">${sid ? '' : esc(s.name.split(' ')[0]) + ' · '}${esc(m.note)}</div>
          ${m.icon === 'cake' && p.role === 'supporter' ? `<button class="chip c-gold mt-8" onclick="go('#/encourage/${m.student}')">${ic('calendar', 'ic sm')} Schedule a birthday note</button>` : ''}
        </div>`;
      }).join('')}
    </div></div>
  </div>`;
  renderTabs(null);
  $('#screen .nav-btn').onclick = () => history.back();
}

/* ---------- Notification center ---------- */
function rNotifications() {
  S.notifRead = true;
  $('#screen').className = 'screen no-tabs screen-anim';
  $('#screen').innerHTML = `
  ${navBar('Notifications', '#/home', `<button class="nav-btn" onclick="openNotifPrefsSheet()">${ic('sliders')}</button>`)}
  <div class="section" style="margin-top:4px">
    <div class="section-head"><h2>Today</h2></div>
    <div class="list">
      ${DB.notifications.slice(0, 2).map((n) => notifRow(n)).join('')}
    </div>
    <div class="section-head mt-24"><h2>Earlier</h2></div>
    <div class="list">
      ${DB.notifications.slice(2).map((n) => notifRow(n)).join('')}
    </div>
    <div class="privacy-note mt-16">${ic('bell', 'ic sm')} <span>Kindred never uses streaks, guilt, or countdown pressure. Every notification is either useful or it doesn’t send.</span></div>
  </div>`;
  renderTabs(null);
  $('#screen .nav-btn').onclick = () => history.back();
}
function notifRow(n) {
  return `<button class="row tappable" onclick="go('${n.route}')">
    <span class="row-icon" style="background:var(--tint-${n.hue});color:var(--${n.hue === 'gold' ? 'gold' : n.hue})">${ic(n.icon)}</span>
    <span class="r-main"><span class="r-title" style="font-size:14.5px;font-weight:${n.unread ? 700 : 500}">${esc(n.text)}</span><span class="r-sub">${esc(n.when)}</span></span>
    ${n.unread ? '<span class="badge" style="background:var(--teal)"> </span>' : ''}
  </button>`;
}
function openNotifPrefsSheet(sid) {
  openSheet(`
    <h2>Notification controls</h2>
    <div class="sheet-sub">Granular by student, type, urgency, and rhythm — your attention is yours.</div>
    ${followedIds().slice(0, 2).map((id) => {
      const s = student(id);
      return `<div class="card" style="margin-bottom:10px">
      <div class="hstack">${avatarHTML(s.avatar, 32)}<h3 style="font-size:15px">${esc(s.name)}</h3></div>
      <div class="choice-grid mt-8">
        ${['Everything', 'Urgent only', 'Weekly digest', 'Off'].map((o, i) => `<button class="choice ${(sid === id ? i === 1 : i === 0) ? 'on g-teal' : ''}" style="font-size:12.5px;padding:7px 11px">${o}</button>`).join('')}
      </div></div>`;
    }).join('')}
    <div class="card">
      ${[['Urgent needs & prayer', true], ['New updates', true], ['Milestones & birthdays', true], ['Answered prayers', true], ['Weekly recap', false]].map(([t, on]) => `
      <div class="switch-row" onclick="this.querySelector('.switch').classList.toggle('on')">
        <span class="s-main"><span class="s-title" style="font-size:14.5px">${t}</span></span><span class="switch ${on ? 'on' : ''}"></span>
      </div>`).join('')}
    </div>
    <button class="btn btn-primary btn-block mt-12" onclick="closeSheet();toast('Notification preferences saved','check')">Save</button>`);
}

/* ---------- Privacy & visibility settings ---------- */
function rPrivacy() {
  const pv = S.privacy;
  $('#screen').className = 'screen no-tabs screen-anim';
  $('#screen').innerHTML = `
  ${navBar('Privacy & visibility', '#/profile')}
  <div class="nav-large" style="padding-top:0"><h1 style="font-size:26px">You decide. Always.</h1></div>
  <div class="section" style="margin-top:6px">
    <div class="card">
      <div class="hstack">${ic('globe')} <h3>Location</h3></div>
      <div class="body mt-4">Real-time location is <b>never shared</b> — that’s not a setting, it’s a promise. Choose how general your shown location is:</div>
      <div class="choice-grid mt-12">
        ${['Country', 'City', 'Region', 'Hidden'].map((l) => `<button class="choice ${pv.location === l ? 'on g-teal' : ''}" onclick="S.privacy.location='${l}';render()">${l}</button>`).join('')}
      </div>
      <div class="meta mt-8">Supporters currently see: <b>${pv.location === 'Hidden' ? 'No location' : pv.location === 'Country' ? 'Thailand' : 'Chiang Mai, Thailand'}</b></div>
    </div>
    <div class="card mt-12">
      <div class="switch-row" onclick="S.privacy.directory=!S.privacy.directory;render()">
        <span class="s-main"><span class="s-title">Appear in group directory</span><span class="s-sub">Off by default — only your church coordinator’s group, never public search</span></span>
        <span class="switch ${pv.directory ? 'on' : ''}"></span>
      </div>
      <div class="switch-row" onclick="S.privacy.anonSupport=!S.privacy.anonSupport;render()">
        <span class="s-main"><span class="s-title">Allow anonymous support</span><span class="s-sub">Financial help and encouragement without names</span></span>
        <span class="switch ${pv.anonSupport ? 'on' : ''}"></span>
      </div>
      <div class="switch-row" onclick="S.privacy.dms=!S.privacy.dms;render()">
        <span class="s-main"><span class="s-title">Direct messages</span><span class="s-sub">Who can message you: currently Family, Mentors & Friends</span></span>
        <span class="switch ${pv.dms ? 'on' : ''}"></span>
      </div>
    </div>
    <div class="section-head mt-24" style="padding:0"><h2 style="font-size:17px">Default audience</h2></div>
    <div class="list">
      ${[['pen', 'New updates', 'All supporters'], ['pray', 'New prayer requests', 'All supporters'], ['hand', 'New needs', 'Church & Friends'], ['moon', 'Wellbeing check-ins', 'Only me']].map(([i, t, v]) => `
      <button class="row tappable" onclick="toast('Default changed — you can still adjust per item','check')">
        <span class="row-icon" style="background:var(--tint-navy);color:var(--navy)">${ic(i)}</span>
        <span class="r-main"><span class="r-title">${t}</span></span>
        <span class="r-side">${v} ${ic('chevR', 'ic sm')}</span>
      </button>`).join('')}
    </div>
    <div class="list mt-12">
      <button class="row tappable" onclick="toast('2 blocked — they can never see or contact you, and were never notified','lock')">
        <span class="row-icon" style="background:var(--tint-clay);color:var(--danger)">${ic('close')}</span>
        <span class="r-main"><span class="r-title">Blocked & removed</span><span class="r-sub">Manage who’s out</span></span>${ic('chevR', 'ic sm')}
      </button>
      <button class="row tappable" onclick="go('#/safety')">
        <span class="row-icon" style="background:var(--tint-gold);color:#8A5F1D">${ic('shield')}</span>
        <span class="r-main"><span class="r-title">Safety check-in</span><span class="r-sub">If you feel unsafe or need urgent support</span></span>${ic('chevR', 'ic sm')}
      </button>
    </div>
  </div>`;
  renderTabs(null);
  $('#screen .nav-btn').onclick = () => history.back();
}

/* ---------- Safety & escalation ---------- */
function rSafety() {
  $('#screen').className = 'screen no-tabs screen-anim';
  $('#screen').innerHTML = `
  ${navBar('Safety check-in', '#/home')}
  <div class="section" style="margin-top:8px">
    <div class="card wash-navy tc" style="padding:28px 20px">
      <div style="font-size:36px">🕊️</div>
      <h3 class="mt-8" style="font-size:20px">You’re not alone. Let’s get you the right help.</h3>
      <div class="body mt-8">Everything here is confidential. Choose what fits — or call directly.</div>
    </div>
    <div class="list mt-16">
      <button class="row tappable" onclick="openSafetySheet('line')">
        <span class="row-icon" style="background:var(--tint-forest);color:var(--forest)">${ic('phone')}</span>
        <span class="r-main"><span class="r-title">Call the Global Year care line</span><span class="r-sub">24/7 · staffed by program care staff</span></span>${ic('chevR', 'ic sm')}
      </button>
      <button class="row tappable" onclick="openSafetySheet('team')">
        <span class="row-icon" style="background:var(--tint-teal);color:var(--teal)">${ic('people')}</span>
        <span class="r-main"><span class="r-title">Alert my private care team</span><span class="r-sub">Your 4 chosen people, immediately & privately</span></span>${ic('chevR', 'ic sm')}
      </button>
      <button class="row tappable" onclick="openSafetySheet('mentor')">
        <span class="row-icon" style="background:var(--tint-navy);color:var(--navy)">${ic('person')}</span>
        <span class="r-main"><span class="r-title">Reach my mentor now</span><span class="r-sub">Rachel Kim · marked as your safe contact</span></span>${ic('chevR', 'ic sm')}
      </button>
      <button class="row tappable" onclick="openSafetySheet('local')">
        <span class="row-icon" style="background:var(--tint-clay);color:var(--danger)">${ic('alert')}</span>
        <span class="r-main"><span class="r-title">Local emergency resources</span><span class="r-sub">For where you are right now</span></span>${ic('chevR', 'ic sm')}
      </button>
    </div>
    <div class="privacy-note mt-16">${ic('lock', 'ic sm')} <span>Using this screen is never visible to your supporters, your church, or your feed. Only the people you contact will know.</span></div>
  </div>`;
  renderTabs(null);
  $('#screen .nav-btn').onclick = () => history.back();
}
function openSafetySheet(kind) {
  const map = {
    line: ['Call the care line?', 'You’ll be connected to Global Year’s on-call care staff. Available 24/7, in English and Spanish.', 'Call now'],
    team: ['Alert your care team?', 'All 4 members get: “Elijah has asked for support right now.” They’ll coordinate so you’re not answering four calls at once.', 'Alert my team'],
    mentor: ['Reach Rachel now?', 'She’s your marked safe contact. We’ll call her phone and keep trying until someone confirms.', 'Contact Rachel'],
    local: ['Local emergency resources', 'Based on your program location (never GPS): emergency services, nearest clinic, and your on-site Global Year staff contact.', 'Show resources'],
  };
  const [h, sub, cta] = map[kind];
  openSheet(`
    <h2>${h}</h2>
    <div class="sheet-sub">${sub}</div>
    <button class="btn btn-primary btn-block" onclick="closeSheet();toast('Help is on the way. Stay where you feel safe. 💛','shield',5000)">${cta}</button>
    <button class="btn btn-ghost btn-block" onclick="closeSheet()">Go back</button>`);
}

/* ---------- Profile tab ---------- */
function rProfile() {
  const p = P();
  const s = isStudentP() ? myStudent() : null;
  $('#screen').className = 'screen screen-anim';
  $('#screen').innerHTML = `
  <div class="nav-large"><div class="kicker">${p.role === 'student' ? 'Your space' : p.role === 'coordinator' ? 'Coordinator' : 'Supporter'}</div><h1>Profile</h1></div>
  <div class="section" style="margin-top:8px">
    <div class="card">
      <div class="hstack">
        ${avatarHTML(p.avatar || s.avatar, 64)}
        <div class="grow"><h3 style="font-size:19px">${esc(p.name)}</h3><div class="small muted">${esc(p.tagline)}</div></div>
      </div>
      ${s ? `<button class="btn btn-soft btn-block btn-sm mt-12" onclick="go('#/student/${s.id}')">View my profile as supporters see it</button>` : ''}
    </div>
    <div class="list mt-16">
      ${s ? `
      <button class="row tappable" onclick="go('#/circles')"><span class="row-icon" style="background:var(--tint-navy);color:var(--navy)">${ic('people')}</span><span class="r-main"><span class="r-title">Support circles</span></span>${ic('chevR', 'ic sm')}</button>
      <button class="row tappable" onclick="go('#/invite')"><span class="row-icon" style="background:var(--tint-gold);color:#8A5F1D">${ic('link')}</span><span class="r-main"><span class="r-title">Invite supporters</span></span>${ic('chevR', 'ic sm')}</button>
      <button class="row tappable" onclick="go('#/checkin')"><span class="row-icon" style="background:var(--tint-teal);color:var(--teal)">${ic('moon')}</span><span class="r-main"><span class="r-title">Wellbeing check-ins</span></span>${ic('chevR', 'ic sm')}</button>` : `
      <button class="row tappable" onclick="go('#/students')"><span class="row-icon" style="background:var(--tint-navy);color:var(--navy)">${ic('people')}</span><span class="r-main"><span class="r-title">Students I support</span></span>${ic('chevR', 'ic sm')}</button>
      <button class="row tappable" onclick="S.supportSeg='history';go('#/support')"><span class="row-icon" style="background:var(--tint-forest);color:var(--forest)">${ic('heart')}</span><span class="r-main"><span class="r-title">My support history</span></span>${ic('chevR', 'ic sm')}</button>`}
      <button class="row tappable" onclick="openNotifPrefsSheet()"><span class="row-icon" style="background:var(--tint-sky);color:#3E617A">${ic('bell')}</span><span class="r-main"><span class="r-title">Notifications</span></span>${ic('chevR', 'ic sm')}</button>
      <button class="row tappable" onclick="go('#/privacy')"><span class="row-icon" style="background:var(--tint-navy);color:var(--navy)">${ic('lock')}</span><span class="r-main"><span class="r-title">Privacy & visibility</span></span>${ic('chevR', 'ic sm')}</button>
      <button class="row tappable" onclick="go('#/safety')"><span class="row-icon" style="background:var(--tint-gold);color:#8A5F1D">${ic('shield')}</span><span class="r-main"><span class="r-title">Safety & wellbeing</span></span>${ic('chevR', 'ic sm')}</button>
    </div>
    <div class="list mt-12">
      <button class="row tappable" onclick="go('#/onboarding')"><span class="row-icon" style="background:rgba(28,43,58,.06);color:var(--ink-2)">${ic('sparkle')}</span><span class="r-main"><span class="r-title">Replay onboarding</span></span>${ic('chevR', 'ic sm')}</button>
      <button class="row tappable" onclick="toast('Signed out (demo)','check')"><span class="row-icon" style="background:rgba(28,43,58,.06);color:var(--ink-2)">${ic('close')}</span><span class="r-main"><span class="r-title">Sign out</span></span></button>
    </div>
    <div class="tc small faint mt-16">Kindred for Global Year · prototype v1.0</div>
  </div>`;
  renderTabs('profile');
}

/* =========================================================
   Router table + boot
   ========================================================= */
function render() {
  closeSheet(true);
  const { name, arg } = parseRoute();
  const table = {
    home: rHome, students: rStudents, support: rSupport, prayer: () => arg ? rPrayerDetail(arg) : rPrayer(), profile: rProfile,
    onboarding: rOnboarding, role: rRole, signup: rSignup, setup: rSetup, invite: rInvite,
    student: () => rStudentProfile(arg), need: () => rNeedDetail(arg),
    'compose-update': rComposeUpdate, 'compose-need': rComposeNeed,
    encourage: () => rEncourage(arg), wall: () => rWall(arg),
    circles: rCircles, checkin: rCheckin, milestones: () => rMilestones(arg),
    notifications: rNotifications, privacy: rPrivacy, safety: rSafety,
    care: () => rCare(arg),
  };
  (table[name] || rHome)();
  $('#screen').scrollTop = 0;
  renderDemoPanel();
}

/* ---------------- Demo panel ---------------- */
const JOURNEYS = [
  ['1 · Urgent prayer', 'Jordan finds Sarah’s urgent request and prays', 'jordan', '#/prayer/p-sarah-timeline'],
  ['2 · Meet a need', 'Dana sees Maya’s postage need and helps', 'dana', '#/need/n-maya-postage'],
  ['3 · Private update', 'Maya posts to Family & Mentors only', 'maya', '#/compose-update'],
  ['4 · Coordinated care', 'Pastor Marcus organizes care for Elijah', 'marcus', '#/home'],
  ['5 · Answered prayer', 'Maya marks the visa prayer answered', 'maya', '#/prayer/p-maya-visa'],
  ['6 · Birthday note', 'Dana schedules Maya’s birthday message', 'dana', '#/encourage/maya'],
  ['7 · Wellbeing check-in', 'Elijah asks his mentor to reach out', 'elijah', '#/checkin'],
];
const FLOWS = [
  ['Onboarding & roles', null, '#/onboarding'],
  ['Student profile setup', null, '#/setup'],
  ['Invite supporters', 'maya', '#/invite'],
  ['Support circles', 'maya', '#/circles'],
  ['Encouragement Wall', 'maya', '#/wall/maya'],
  ['Milestone timeline', 'dana', '#/milestones/all'],
  ['Notification center', 'dana', '#/notifications'],
  ['Privacy settings', 'maya', '#/privacy'],
  ['Safety escalation', 'elijah', '#/safety'],
  ['Coordinator dashboard', 'marcus', '#/home'],
  ['Empty state (new user)', 'riley', '#/home'],
  ['Need creation', 'sarah', '#/compose-need'],
];
function setPersona(id, route) {
  S.persona = id;
  S.checkinMood = null;
  go(route || '#/home');
  render();
}
function startJourney(i) {
  const [, , persona, route] = JOURNEYS[i];
  setPersona(persona, route);
}
function renderDemoPanel() {
  $('#persona-list').innerHTML = Object.values(DB.personas).map((p) => `
    <button class="persona-btn ${S.persona === p.id ? 'active' : ''}" onclick="setPersona('${p.id}')">
      <span class="avatar sz-32 hue-${p.avatar.hue}">${esc(p.avatar.initials)}</span>
      <span><span class="p-name">${esc(p.name)}</span><br><span class="p-tag">${esc(p.tagline)}</span></span>
    </button>`).join('');
  $('#journey-list').innerHTML = JOURNEYS.map((j, i) => `
    <button class="journey-btn" onclick="startJourney(${i})"><b>${j[0]}</b>${j[1]}</button>`).join('');
  $('#flow-list').innerHTML = FLOWS.map((f) => `
    <button class="journey-btn" onclick="${f[1] ? `setPersona('${f[1]}','${f[2]}')` : `go('${f[2]}')`}"><b>${f[0]}</b></button>`).join('');
}

/* Boot */
if (!location.hash) location.hash = '#/home';
render();
