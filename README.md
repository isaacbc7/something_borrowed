# Kindred — a support network for Global Year students

> *"No Global Year student should feel unseen, unsupported, or forgotten while they are away from home."*

Kindred is a premium, native-feeling iOS app concept that gives churches, families, friends, and mentors a respectful, clear way to stay connected to specific [Global Year](https://www.globalyear.org) students — to understand what they're experiencing, pray for them, respond to practical needs, celebrate milestones, and offer ongoing encouragement throughout their year abroad.

It is **not** a church directory, a social feed, or a fundraising platform. It is a private support ecosystem built around each individual student, with the student in control of every piece of their story.

## What's in this repo

### 🎨 Interactive prototype — [`prototype/`](prototype/)

A fully clickable, high-fidelity prototype of the iPhone app. **No build step** — open it directly:

```
open prototype/index.html        # or double-click it in any modern browser
```

The demo panel beside the phone lets you:

- **View as** six personas: two supporters with different circle access, a brand-new supporter (empty states), two students (one thriving, one homesick), and a church coordinator.
- **Run 7 guided journeys** — urgent prayer, meeting a need, a family-only update, coordinated care, an answered prayer, a scheduled birthday note, and a wellbeing check-in that reaches a mentor.
- **Jump to key flows** — onboarding, profile setup, invites, circles, the Encouragement Wall, milestones, notifications, privacy, safety escalation, the coordinator dashboard, and need creation.

The circle-based privacy model is *actually implemented*: switch personas and watch family-only updates and sensitive prayer requests appear and disappear.

### 📐 Design documentation — [`docs/`](docs/)

| Doc | Contents |
|---|---|
| [01 · Product rationale](docs/01-product-rationale.md) | Why every design decision keeps the student at the center |
| [02 · Sitemap & screens](docs/02-sitemap.md) | Complete app sitemap and the 23-screen inventory |
| [03 · User roles](docs/03-user-roles.md) | Role map and the full permissions matrix |
| [04 · Data model](docs/04-data-model.md) | Core entities, the visibility system, and API-shape recommendations |
| [05 · Design system](docs/05-design-system.md) | Color, typography, spacing, icons, components, and all UI states |
| [06 · Notification strategy](docs/06-notification-strategy.md) | Every notification type, its trigger, cadence, and anti-manipulation rules |
| [07 · Accessibility](docs/07-accessibility.md) | Dynamic Type, contrast, VoiceOver, haptics, and reduced motion |
| [08 · Prototype guide](docs/08-prototype-guide.md) | Personas, seeded content, and step-by-step journey scripts |
| [09 · Donation integration](docs/09-donation-integration.md) | The `DonationProvider` seam, seamless setup-time linking, Kindful→Bloomerang, and the read-only "money is never the plot" model |

## The design language: "Between Two Places"

Kindred does not look like other apps, on purpose. The entire visual system is a **field journal + airmail**: paper and ink, Fraunces serif and mono "postal" type, two-clock ribbons (`ANTIGUA 08:41 ····✈···· FRANKLIN 09:41 · DAY 92 OF 270`), perforated stamp portraits, ticket-stub needs you *claim*, a circular postmark that gets stamped onto a request when you pray, wax-sealed answered prayers, airmail-edged letters, and a coordinator's "sending ledger." No rounded card stacks, no pastel pills, no gradient avatars, no icon dock — the full rationale and the banned-pattern list live in [docs/00-design-brief.md](docs/00-design-brief.md).

| Supporter home | Prayed = postmarked | Student home | Wellbeing check-in |
|---|---|---|---|
| ![Supporter home](docs/screenshots/supporter-home.png) | ![Postmark](docs/screenshots/prayed-postmark.png) | ![Student home](docs/screenshots/student-home.png) | ![Check-in](docs/screenshots/checkin.png) |

| Need = ticket stub | Coordinator ledger | Student profile | Encouragement wall |
|---|---|---|---|
| ![Need](docs/screenshots/need-detail.png) | ![Coordinator](docs/screenshots/coordinator.png) | ![Student profile](docs/screenshots/student-profile.png) | ![Wall](docs/screenshots/wall.png) |

## Grounding

The concept is grounded in the real Global Year program (globalyear.org): a Christian gap year sending 18–25-year-olds to locations like Guatemala, Cape Verde, Mexico, Italy, and Southeast Asia for language school, discipleship, cultural immersion, and ministry through the local church. Students are faith-supported and raise their own support (~$13,500–$15,500 for the year) — which is exactly why a coordinated, dignity-preserving support network matters.

The "Just Ask" product direction informed one principle used throughout: **a need that is visible and specific gets met; a need that is vague or hidden does not.** Kindred applies that to needs, prayer, and encouragement alike — while keeping the student, never the ask, at the center.

## Christian missions at the center

Global Year is a Christian missions program — students are sent out to make disciples among the nations, supported through personal partnership development. Kindred's language reflects that plainly: sending churches, ministry partners, support-raising, commissioning, the field, prayer as the first pillar. The missions identity lives in the *structure and vocabulary*, not in decoration — Scripture and faith show up in students' own words and in encouragement, never plastered across the chrome.

## Donation platform: a swappable seam

Because a student's support money lives in Global Year's giving platform — historically **Kindful**, which **Bloomerang acquired in 2021** — Kindred integrates through a one-way [`DonationProvider`](prototype/js/donation.js) seam rather than wiring to any single vendor. When Global Year verifies a new student, Kindred auto-links (or creates) their partnership designation, then reads the support total into the student's **private** goal on a schedule. Kindred never processes a gift; "give" deep-links out to the compliant hosted page with the designation prefilled. Full rationale and the setup sequence are in [docs/09](docs/09-donation-integration.md).
