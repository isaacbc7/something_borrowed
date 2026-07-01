# 08 · Prototype guide — personas, content, and journey scripts

Open `prototype/index.html` in any modern browser. The left panel is the demo harness (not part of the app): switch personas, launch guided journeys, or jump to key flows. Everything inside the phone is the product.

## Seeded world

### Students
| Student | Location | Season | Story arc |
|---|---|---|---|
| **Maya Okafor**, 19 | Chiang Mai, Thailand (Southeast Asia team) | Serving | **Thriving.** Teaches English at a Christian school, runs the kids' art club. Visa-renewal prayer pending (→ answered in Journey 5). 42 supporters, all needs recently met. |
| **Elijah Torres**, 18 | Antigua, Guatemala | Serving | **Homesick.** Sports ministry + house builds. Two needs open with no commitments, no encouragement in 6 days, last shared check-in "Homesick." The coordinator's dashboard flags him. |
| **Sarah Kim**, 20 | Preparing for Praia, Cape Verde | Fundraising | **Approaching a major milestone.** 68% funded, flight must book by Aug 15, departs Sep 2. Urgent prayer request "Peace about the timeline." |

### Supporters & staff
- **Dana Whitfield** — Maya's mom (Family circle) + Elijah's church circle. Sees Maya's personal content; cannot see Elijah's family-only content.
- **Jordan Lee** — friend of all three (Friends circles). Demonstrates the narrower lens.
- **Riley Nguyen** — brand-new supporter following no one: all empty states.
- **Pastor Marcus Reid** — coordinator at Northgate Community Church (sends all three students). Signals-only dashboard.

### Content mix
Fulfilled need (Maya's art supplies) · open needs (postage $60, letters from home, weekly call buddy, Sarah's $1,200 flight gap at 68%) · six prayer requests across urgency and visibility levels, including one restricted to Family & Prayer team · one update restricted to Family & Mentors · eight milestones (birthdays, 100-days marker, retreat, flight deadline, commissioning, departure, homecoming).

## The seven guided journeys

**1 · A supporter discovers an urgent prayer request and commits to praying.**
View as Jordan → Prayer tab (badge shows waiting urgent requests) → Sarah's "Peace about the timeline" sits under *Could use prayer today* → open it → press **I prayed for Sarah** (ripple, haptic, green settle, count 18→19) → optional "Let Sarah know you're praying" note → a private prayer note field only Jordan can see.

**2 · A supporter sees a practical need and offers to help.**
View as Dana → Home shows "Needs you can help with" → **Care package postage** → *I can help* → choose what ("I can take care of this") → one-time vs ongoing, reminder toggle, anonymity → **Confirm — I'm in** → "Help is on the way 💛." The need now shows *You're helping with this*; it appears under Support → My commitments with a reminder; backing out is offered shame-free.

**3 · A student posts an update visible only to family and mentors.**
View as Maya → **Share an update** → tap the audience chip → *Family & Mentors* ("9 people, and no one else") → Post. Switch to Dana (family): the update is on Maya's profile with a lock chip. Switch to Jordan (friend): it does not exist for him — and the empty state explains kindly.

**4 · A coordinator identifies a struggling student and organizes care.**
View as Marcus → Home → Elijah's signal card ("No encouragement in 6 days · 2 needs with no commitments") → **Organize care** → toggle: 3 reach-outs, Thursday group prayer moment, "Letters from home" push → **Start care response**. Note the privacy banner: Marcus acts on signals; Elijah's private content stays private, and Elijah experiences only *more people showing up*.

**5 · A student marks a prayer answered and thanks their community.**
View as Maya → Prayer → "Visa renewal approval" → status control → **Answered** → gold celebration banner → **Thank your community** → pre-drafted joy note reaches all 51 people who prayed. Supporters who prayed see the answered celebration in their own Prayer tab.

**6 · A parent schedules a birthday encouragement.**
View as Dana → Encourage Maya (Home "support moment," profile, or milestone timeline — the birthday row has a shortcut) → note is pre-drafted → **Schedule delivery** → "🎂 Birthday · Aug 3" → **Schedule it** → confirmation that it will deliver on the day, into Maya's Encouragement Wall.

**7 · A student uses the wellbeing check-in to request contact from a trusted mentor.**
View as Elijah → Home mood row or Check-in → **Homesick** → gentle options appear ("Thanks for being honest 💛 — feeling homesick is part of a real year, not a failure") → **Ask a trusted mentor to reach out** → consent sheet shows *exactly* what Rachel will receive and that only she receives it → confirm → "Rachel will reach out soon. Well done asking." Nothing was posted anywhere; no supporter saw anything.

## Also worth clicking

- **Onboarding → role select → account → 4-step student setup** (location-privacy step makes the no-real-time-location promise explicit).
- **Invite flow** (as Maya): pick a circle → live preview of what that circle sees → expiring link, student-approved joins.
- **Circles management**: per-circle content switches (the whole privacy model in one screen).
- **Encouragement Wall** (as Maya): filterable keepsake — notes, verses, voice, photos from home.
- **Privacy settings**: location granularity with live preview, directory off by default, blocked list, safety entry point.
- **Safety escalation** (as Elijah): care line, care-team alert, mentor, local resources — with the promise that using it is invisible to supporters.
- **Empty states** (as Riley): the no-directory invite-code onboarding.

## Prototype architecture

Static, dependency-free: `index.html` + `css/app.css` (design system) + `js/data.js` (seed world) + `js/app.js` (hash router, role-adaptive screens, `canSee()` visibility engine, sheets/toasts/haptics). State is in-memory per session — refresh to reset the demo.
