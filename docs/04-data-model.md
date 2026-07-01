# 04 · Core data model recommendations

Designed for a Swift/SwiftUI client against a document-or-relational backend (CloudKit, Firebase, or Postgres + API all fit). The load-bearing idea is a single, uniform **audience** mechanism attached to every piece of student content — visibility is data, not code paths.

## Entity overview

```
User ──< RoleGrant >── Group(Church)          Program ──< Cohort ──< Location
 │                                                             │
 └──(student)── StudentProfile ──────────────────────────────┘
                    │
                    ├──< Circle ──< CircleMembership >── User
                    ├──< Post            (audience)
                    ├──< PrayerRequest   (audience) ──< PrayerAction
                    ├──< Need            (audience) ──< Commitment
                    ├──< Milestone
                    ├──< Encouragement   (wall items, schedulable)
                    ├──< CheckIn         (audience, default: private)
                    └──< SupportGoal     (private by default)
```

## Entities

### User
`id, name, avatarURL, email, createdAt, notificationPrefs (per-student × type × cadence), blockedUserIds[]`
A user may hold many `RoleGrant`s: `{role: student|supporter|coordinator|admin, scope: studentId|groupId|program}`.

### StudentProfile
`userId, displayName, cohortId, locationDisplay {country, city?, region?}, locationGranularity (country|city|region|hidden), sendingChurchGroupId, bio, whyStory, seasonStatus (fundraising|training|language_school|serving|resting|returning_home), verifiedByAdminAt, dmPolicy (circles allowed to DM), counters {supporters, prayersReceived, openNeeds} (denormalized)`
**Never stored:** precise coordinates. Location is a display string chosen by the student, full stop.

### Circle
`id, studentId, name, icon, defaultPermissions {generalUpdates, personalUpdates, publicPrayer, sensitivePrayer, practicalNeeds, financialNeeds, checkinsShared}`
Seed set per student: Family, Mentors, Private care team, Home church, Friends, Financial supporters. Students can add/rename.

### CircleMembership
`circleId, userId, status (invited|pending_student_approval|active|removed|blocked), invitedBy, joinedAt`
Every membership requires explicit student approval. Removal/blocking generates **no notification** to the removed party.

### Audience (embedded value, on every content item)
`{mode: all_supporters | circles | only_me, circleIds[]}`
One mechanism for posts, prayers, needs, and check-ins. "All supporters" = union of active circle members — never the public internet. Server-side enforcement: every read query joins through CircleMembership; the client never filters privacy on its own.

### Post (update)
`id, studentId, audience, kind (update|story|reflection|win|honest_moment), title?, body, media[], attachedPrayerRequestId?, createdAt, reactions {thinkingOfYou, hearts}, prayerCount`

### PrayerRequest
`id, studentId, audience, title, body, urgency (ongoing|this_week|today), status (ongoing|answered|updated|private), prayedCount, answeredAt?, answeredNote?, createdAt`

### PrayerAction
`prayerRequestId, supporterId, prayedAt, noteToStudent? (optional, delivered), privateNote? (encrypted, supporter-only), reminderRule?`
Powers "prayed for by 18 people," the supporter's private prayer history, and answered-prayer thank-you fan-out (recipients = distinct supporters with a PrayerAction on that request).

### Need
`id, studentId, audience, title, body, category (prayer|financial|travel|supplies|meals|encouragement|communication|medical|housing|family|practical|other), urgency, neededBy?, amount? {target, raised}, itemDescription?, fulfillmentMode (single|multiple), allowAnonymous, attachments[], status (open|in_progress|fulfilled|withdrawn), createdAt`

### Commitment
`id, needId, supporterId, kind (cover|contribute|help|connect|pray|share), detail, cadence (one_time|ongoing), anonymous, reminderRule?, status (offered|confirmed_by_student|completed|withdrawn), createdAt`
Coordination logic reads open commitments before offering "I can cover this" (prevents duplication); withdrawal reopens the slot and notifies quietly.

### Milestone
`id, studentId, date, kind (birthday|travel|training|deadline|commissioning|retreat|return_home|custom), title, note, visibility (inherits profile default), remindSupportersDaysBefore[]`

### Encouragement
`id, studentId, fromUserId, anonymous, kind (note|verse|voice|photo|thinking_of_you|milestone_congrats), body/mediaURL, scheduledFor? (date or milestoneId), deliveredAt?, savedAsFavoriteByStudent`
Scheduled items deliver server-side on the target date in the student's timezone.

### CheckIn
`id, studentId, mood (encouraged|peaceful|grateful|excited|tired|homesick|overwhelmed|need_support), audience (default only_me), escalation? {type: mentor|care_team|prayer_draft|need_draft|none, targetUserIds[]}, createdAt`
Escalations write a targeted, private notification to the chosen people only. No automatic broadcast under any condition.

### SupportGoal
`studentId, targetAmount, raisedAmount, visibility (only_me | chosen circleIds), source (program integration or manual)`
Coordinator dashboards may read a **coarse band** (e.g. "<50%", "50–80%", ">80%") only if the student opts in.

### Group (church/community) & Coordinator surfaces
`Group: id, name, location, coordinatorUserIds[], studentIds[] (affiliation approved by student)`
`SupportHealthSignal (computed, not stored content): studentId, level (healthy|milestone|attention), facts[]` — derived exclusively from countable metadata: days since last received encouragement, open needs with zero commitments, engagement trend, milestone proximity. **Inputs never include** check-in moods, private content, or funding specifics.

## Safety & integrity notes

- **Server-enforced audiences:** all visibility filtering happens in the API layer; clients receive only what the viewer may see (the prototype's `canSee()` models this contract).
- **Private notes encrypted at rest** (supporter prayer notes, student journal check-ins); support staff cannot read them.
- **Moderation:** `Report {reporterId, subjectType, subjectId, reason}` routes to admin; blocks are unilateral and silent.
- **Deletes cascade down audiences:** deleting a post/need/prayer removes it from every feed and notification center.
- **Audit minimalism:** log access for safety investigations, not analytics; platform metrics are aggregate and anonymized.
