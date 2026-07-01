/* =========================================================
   Kindred — DonationProvider seam
   ---------------------------------------------------------
   Global Year students raise personal ministry support
   ("partnership development"). The money lives in whatever
   giving platform Global Year uses — historically Kindful,
   which Bloomerang acquired in 2021, so most likely Bloomerang
   today, possibly a ministry-specific tool tomorrow.

   Kindred NEVER processes gifts. It reads each student's
   partnership total (one-way) to fill their PRIVATE support
   goal, and it hands off actual giving to the platform's
   hosted page via a deep link. That keeps Kindred out of PCI
   scope and keeps "give now" pressure out of a UI whose whole
   thesis is: the student is a person, not a fundraising number.

   The provider is an INTERFACE. Bloomerang is one adapter.
   When the next acquisition happens — and it will — you swap
   the adapter, not the app.

   interface DonationProvider {
     linkOrCreateFund(student)  -> { fundId, designation, created }
     getSummary(fundId)         -> { goal, raised, pct, monthlyPartners,
                                      lastGift, currency, asOf }
     giveUrl(fundId, opts?)     -> string   // hosted giving page
     providerName              : string
   }
   ========================================================= */

'use strict';

/* ---------- Adapter: Bloomerang (mock) ----------
   Shaped after Bloomerang's REST API: a single "Global Year
   Students" fund with a per-student DESIGNATION. In production
   getSummary() sums transactions for the designation server-side
   (Bloomerang has no webhooks, so this is a scheduled pull or a
   middleware sync — hourly is plenty). Here it returns seed data
   synchronously so the prototype can render without a network. */
const BloomerangProvider = {
  providerName: 'Bloomerang',
  fund: 'Global Year Students · 2026 Cohort',
  base: 'https://give.globalyear.org',

  // System of record. In prod these are live sums from the platform.
  _accounts: {
    maya:   { fundId: 'BLM-8841', designation: 'GY26-OKAFOR',  goal: 15500, raised: 15500, monthlyPartners: 34, lastGift: '3 days ago' },
    elijah: { fundId: 'BLM-8842', designation: 'GY26-TORRES',  goal: 14000, raised: 13160, monthlyPartners: 17, lastGift: '1 week ago' },
    sarah:  { fundId: 'BLM-8843', designation: 'GY26-KIM',     goal: 15500, raised: 10540, monthlyPartners: 31, lastGift: 'yesterday' },
  },
  _byFund() {
    const m = {};
    for (const k in this._accounts) m[this._accounts[k].fundId] = this._accounts[k];
    return m;
  },

  // Called once when Global Year verifies a new student.
  linkOrCreateFund(student) {
    const existing = this._accounts[student.id];
    if (existing) return { fundId: existing.fundId, designation: existing.designation, created: false };
    const last = student.name.split(' ').slice(-1)[0].toUpperCase().replace(/[^A-Z]/g, '');
    const designation = 'GY26-' + last;
    const fundId = 'BLM-' + (8844 + Object.keys(this._accounts).length);
    this._accounts[student.id] = { fundId, designation, goal: 15500, raised: 0, monthlyPartners: 0, lastGift: null };
    return { fundId, designation, created: true };
  },

  getSummary(fundId) {
    const a = this._byFund()[fundId];
    if (!a) return null;
    return {
      goal: a.goal, raised: a.raised,
      pct: Math.min(100, Math.round((a.raised / a.goal) * 100)),
      monthlyPartners: a.monthlyPartners, lastGift: a.lastGift,
      currency: 'USD', asOf: 'synced 41 min ago',
    };
  },

  // Deep-link OUT to the compliant hosted giving page, designation prefilled.
  giveUrl(fundId, opts = {}) {
    const a = this._byFund()[fundId];
    const q = new URLSearchParams({ designation: a ? a.designation : '', ...(opts.recurring ? { recurring: 'monthly' } : {}), ...(opts.amount ? { amount: String(opts.amount) } : {}) });
    return `${this.base}/${a ? a.designation.toLowerCase() : 'give'}?${q}`;
  },
};

/* ---------- Facade the app talks to ----------
   Holds the studentId -> fundId link table (in prod: a column on
   StudentProfile). Everything above is swappable; this stays put. */
const Donations = {
  provider: BloomerangProvider,
  _links: { maya: 'BLM-8841', elijah: 'BLM-8842', sarah: 'BLM-8843' },

  isLinked(studentId) { return !!this._links[studentId]; },

  // Seamless step at student setup: link (or create) the partnership fund.
  link(student) {
    const res = this.provider.linkOrCreateFund(student);
    this._links[student.id] = res.fundId;
    return { ...res, provider: this.provider.providerName };
  },

  summary(studentId) {
    const fundId = this._links[studentId];
    if (!fundId) return null;
    const s = this.provider.getSummary(fundId);
    return s ? { ...s, fundId, provider: this.provider.providerName } : null;
  },

  giveUrl(studentId, opts) {
    const fundId = this._links[studentId];
    return fundId ? this.provider.giveUrl(fundId, opts) : this.provider.base;
  },
};
