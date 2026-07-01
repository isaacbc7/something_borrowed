# 03 · User-role map

One app, four roles, adaptive surfaces. A person can hold multiple roles (a parent who is also a coordinator); the app composes capabilities rather than forcing account switching. Students are always the root of every permission tree.

## Role summaries

### 🎒 Student — the center of gravity
Controls their profile, story, season status, location granularity, circles, and the audience of every single item.

- Create/customize profile; "Why I'm doing Global Year" story; season status (Fundraising · Training · Language school · Serving · Resting · Returning home)
- Post updates, photos, reflections, wins, honest moments — each with a chosen audience
- Create prayer requests (per-request visibility incl. fully private) and mark them Ongoing / Answered / Updated / Private; thank everyone who prayed
- Create needs (category, urgency, deadline, amount/item, single- vs multi-helper, anonymity allowance, audience); mark fulfilled
- Organize supporters into circles; approve every join; move, remove, or block anyone (silently)
- Lightweight emotional check-ins with student-chosen sharing and gentle escalation options
- Private support goal tracking (funding % visible only to the student unless explicitly shared)
- Safety check-in path (care line, care team, mentor, local resources) — usage never visible to supporters

### 💛 Supporter — parent, sibling, friend, church member, mentor, donor
Sees exactly what the circles they belong to allow. Never has to wonder how to help.

- Follow one or more students (invite-based; no public directory)
- View updates/needs/prayers per access level; pray with one tap; add private prayer notes
- Commit to needs with explicit follow-through (what, cadence, deadline, reminders, anonymity); withdraw without shame
- Send encouragement: notes, verses, voice, photos from home, "thinking of you," scheduled delivery (birthdays, travel days)
- Personal prayer list, milestone notifications, coordination visibility ("help is already on the way")
- Private support history (prayers, commitments, encouragement) — a personal record, never a leaderboard

### ⛪ Church / group coordinator — pastor, Global Year leader, small-group leader
Orchestrates community care using **engagement signals only** — never private content.

- Manage a church/community group; invite supporters; view affiliated students
- Support-health indicators: unanswered needs, encouragement drought, low engagement, upcoming milestones
- Organize care responses (assign reach-outs, group prayer moments, needs pushes)
- Create support campaigns around milestones; send announcements to a student's support community
- Explicitly **cannot** see: private/family-scoped updates, sensitive prayer requests, wellbeing check-ins, funding details beyond what the student shares

### 🛡️ Global Year admin — lightweight and operational
- Verify student accounts; manage cohorts, regions, program locations, church affiliations
- Anonymized platform health metrics; moderation & safety response; configure categories, workflows, notification templates
- **Never** automatic access to private prayer requests, sensitive updates, or check-in content; safety escalations reach on-call care staff through the student's own action

## Permissions matrix

Content visibility is determined by the **item's audience setting** × the **viewer's circle membership** (granted by the student). Roles grant capabilities; circles grant sight.

| Capability / content | Student (self) | Family circle | Mentors | Private care team | Church circle | Friends | Financial circle | Coordinator | GY Admin |
|---|---|---|---|---|---|---|---|---|---|
| General updates ("All supporters") | ✅ own | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| Personal updates (Family & Mentors) | ✅ | ✅ | ✅ | ✅ | ✖️ | ✖️ | ✖️ | ✖️ | ✖️ |
| Public prayer requests | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✖️ |
| Sensitive prayer (Family & Prayer team) | ✅ | ✅ | opt | ✅ | ✖️ | ✖️ | ✖️ | ✖️ | ✖️ |
| Fully private prayer / journal | ✅ | ✖️ | ✖️ | ✖️ | ✖️ | ✖️ | ✖️ | ✖️ | ✖️ |
| Practical needs | ✅ | ✅ | ✅ | ✅ | per item | per item | ✖️ | non-sensitive | ✖️ |
| Financial needs | ✅ | ✅ | opt | opt | opt | ✖️ | ✅ | aggregate only | ✖️ |
| Overall funding % | ✅ | opt | ✖️ | ✖️ | ✖️ | ✖️ | ✖️ | coarse band opt-in | anonymized |
| Wellbeing check-ins | ✅ | opt | opt | opt | ✖️ | ✖️ | ✖️ | ✖️ | ✖️ |
| Engagement signals (needs unanswered, encouragement drought) | ✅ | — | — | — | — | — | — | ✅ | anonymized |
| Send encouragement / pray / commit | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✖️ |
| Direct message the student | — | per student setting | per setting | ✅ | per setting | per setting | ✖️ default | per setting | ✖️ |
| Invite supporters | ✅ | ✖️ | ✖️ | ✖️ | ✖️ | ✖️ | ✖️ | ✅ (student approves) | ✖️ |
| Verify accounts / moderate | ✖️ report | report | report | report | report | report | report | report + escalate | ✅ |

*"opt" = off by default, student can grant per circle. "per item" = follows the audience chosen on that item.*

## Prototype personas (implemented)

| Persona | Role | Circle membership | Demonstrates |
|---|---|---|---|
| Dana Whitfield | Supporter | Maya: Family · Elijah: Church | Family-level access, need commitment, scheduled birthday note |
| Jordan Lee | Supporter | Friends (all 3 students) | Friend-level access — cannot see family-only content |
| Riley Nguyen | Supporter | none | Empty states, invite-code onboarding |
| Maya Okafor | Student (thriving) | — | Private-audience posting, answered prayer, circles |
| Elijah Torres | Student (homesick) | — | Wellbeing check-in → mentor escalation |
| Pastor Marcus Reid | Coordinator | Church (all 3) | Signals-only dashboard, care response, campaigns |
