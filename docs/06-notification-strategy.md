# 06 · Notification strategy

## Philosophy

Every notification is either **useful to the recipient** or **it doesn't send**. Notifications exist to close support loops — never to drive sessions. No streaks, no FOMO, no guilt mechanics, no "you're falling behind." The quiet test for every template: *would a thoughtful church member send this text?*

## Supporter notifications

| Trigger | Example copy | Default cadence | Deep link |
|---|---|---|---|
| Student posts an update (visible to you) | "Maya shared a new update from her Global Year journey." | Real-time, coalesced per student per day | Update |
| Urgent prayer request | "A prayer request from Jordan could use your support today." | Real-time; max 1 urgent per student per day | Prayer detail |
| New need you can see | "Sarah added a need: Flight to Cape Verde — the final stretch." | Digest by default; real-time opt-in | Need detail |
| Your commitment is due | "You committed to help with a need due tomorrow." | T-1 day + morning-of | Commitment |
| Encouragement received/seen | "Your encouragement was received by Alex." | Real-time, low priority | Wall |
| Milestone approaching | "Sarah's birthday is coming up. Send her a note from home." | T-7 and T-1 | Encourage composer |
| Answered prayer you prayed for | "A prayer request you supported has been marked answered." | Real-time — the highest-joy notification in the app | Answered banner |
| Reconnect nudge | "You haven't checked in with Elijah recently. Send a quick word of encouragement." | Max 1 per student per 14 days; auto-suppressed after any interaction; framed as invitation, never failure | Encourage composer |
| Weekly impact recap | "You prayed for 4 students this week. Thank you for showing up." | Weekly, Sunday evening; off by default until first month completes | Home |
| Scheduled encouragement delivered | "Your birthday note reached Maya today. 🎂" | On delivery | Wall |
| Group prayer moment (coordinator-initiated) | "Northgate is praying for Elijah on Thursday at 8pm. Join in." | Per event | Prayer detail |

## Student notifications

| Trigger | Example copy | Notes |
|---|---|---|
| Prayer received (batched) | "12 people prayed for your visa request today. 🙏" | Batched 1–2×/day — encouragement without buzzing |
| Note attached to a prayer | "Dana is praying for you and sent a word." | Real-time |
| Need commitment | "Someone offered to cover your care-package postage." | Real-time; names respect anonymity choice |
| Encouragement received | "A note from home is waiting on your wall." | Real-time, gentle |
| Join request | "Riley Nguyen asked to join your Friends circle." | Requires action; nothing shared until approved |
| Milestone reminder | "Your cohort retreat is in two weeks." | T-14/T-3 |
| Check-in follow-through | "Rachel saw your check-in and will reach out today." | Only to the student; closes the escalation loop |
| Quiet check-in invitation | "It's been a minute. How are you doing — really?" | Max 1/week, student-configurable, off switch honored absolutely |

## Coordinator notifications

| Trigger | Example | Constraint |
|---|---|---|
| Support-health change | "Elijah has 2 needs open with no commitments." | Signals only — never mood or private content |
| Milestone across group | "Sarah's flight deadline is in 14 days." | Weekly coordinator digest by default |
| Care response progress | "2 of 3 reach-outs completed for Elijah." | Private to coordinator |

## Granular controls (implemented in prototype)

Per **student** × per **type** (urgent needs & prayer / updates / milestones / answered prayers / recaps) × **cadence** (Everything · Urgent only · Weekly digest · Off). Global quiet hours follow iOS Focus. Urgent safety-related notifications (a student's own escalation to their chosen people) bypass digests but never bypass the student's audience choice.

## Anti-manipulation commitments

1. No notification ever implies a student is underperforming or a supporter is failing.
2. Frequency caps are hard limits, not defaults — marketing cannot raise them.
3. Every notification deep-links to a completable action; none link to a feed for browsing.
4. Copy bank is human-reviewed; no A/B testing of guilt framings, ever.
5. Silence is respected: two ignored nudges of a type → that type auto-downgrades to digest.
