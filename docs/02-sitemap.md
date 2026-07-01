# 02 · App sitemap & screen inventory

## Navigation model

Five-tab bottom navigation, identical structure for every role — content adapts to the signed-in user's role and relationships rather than forking into separate apps. Modal flows (composers, commitment sheets, visibility pickers) present as iOS sheets; detail screens push with a back chevron.

```
Kindred
│
├── Onboarding (first run only)
│   ├── Value slides (3)
│   ├── Role selection            Student / Supporter / Coordinator
│   ├── Account creation
│   ├── Student profile setup     (students: 4 steps — about, location & privacy, story, circles)
│   ├── Invite-code entry         (supporters: no public directory)
│   └── Supporter invitation flow (students: circle → preview → share link)
│
├── ① HOME
│   ├── Supporter home            greeting · Today's Support Moment · student carousel ·
│   │                             needs you can help with · prayers waiting · milestones ·
│   │                             quiet re-connect nudge · activity feed · weekly impact recap
│   ├── Student home              emotional check-in · Share an Update · support stats ·
│   │                             recent encouragement · open needs · milestones ·
│   │                             "You are supported by…" card
│   ├── Coordinator home          support-health signals · quick actions (invite, group
│   │                             prayer moment, announcement) · cross-student milestones
│   │   └── Organize care flow    reach-outs · prayer moment · needs push → confirmation
│   ├── Notification center       today / earlier · granular per-student controls
│   └── Empty state               (new supporter: invite-code onboarding)
│
├── ② STUDENTS
│   ├── Followed students list    status dots · last check-in · season
│   ├── Invite-code entry         "Request to join" (student approves)
│   ├── Student profile           hero · season & place chips · story · stat trio ·
│   │   │                         actions (Follow / Encourage / Pray)
│   │   └── Segments: Updates · Needs · Prayer · Milestones · Support Team
│   ├── Milestone timeline        per-student or all-students
│   ├── Encouragement Wall        filterable keepsake (notes / verses / voice / photos)
│   └── (student role) My support network → circles overview
│
├── ③ SUPPORT
│   ├── Supporter: Open needs · My commitments · History (private impact record)
│   │   └── Need detail           story · progress · "help is already on the way" ·
│   │       └── Commitment sheet  what → cadence/reminders/anonymity → confirm
│   ├── Student: My needs         manage · mark fulfilled · quiet support goal (private)
│   │   └── Need creation flow    3 steps — what · details · audience & fulfillment rules
│   └── Coordinator: group needs  non-sensitive · campaigns ("Rally support")
│
├── ④ PRAYER
│   ├── Prayer feed               urgent today · ongoing · answered celebrations
│   │   └── Prayer request detail context · count · "I Prayed" (haptic) ·
│   │                             optional note to student · private prayer note · reminders
│   ├── Prayer reminders          daily / weekly / around urgent requests
│   ├── My prayer list & notes    private to the supporter
│   └── (student role) My requests  status: Ongoing / Answered / Updated / Private ·
│                                  answered → thank-your-community flow · Prayer Circle
│
└── ⑤ PROFILE
    ├── Account card              (student: "view my profile as supporters see it")
    ├── Support circles           members · per-circle content permissions
    ├── Wellbeing check-ins       mood grid → share options → gentle escalation
    ├── Notifications settings
    ├── Privacy & visibility      location granularity · directory (off) · anonymous
    │                             support · DMs · default audiences · blocked & removed
    └── Safety check-in           care line · care team alert · mentor · local resources
```

## The 23 key screens (all present in the prototype)

| # | Screen | Route in prototype |
|---|---|---|
| 1 | Onboarding & role selection | `#/onboarding`, `#/role` |
| 2 | Account creation | `#/signup` |
| 3 | Student profile setup (4 steps) | `#/setup` |
| 4 | Supporter invitation flow | `#/invite` |
| 5 | Supporter Home dashboard | `#/home` as Dana/Jordan |
| 6 | Student Home dashboard | `#/home` as Maya/Elijah |
| 7 | Student Profile (5 segments) | `#/student/maya` |
| 8 | Update composer (+ visibility sheet) | `#/compose-update` |
| 9 | Need creation flow (3 steps) | `#/compose-need` |
| 10 | Need detail & commitment flow | `#/need/n-maya-postage` |
| 11 | Prayer feed | `#/prayer` |
| 12 | Prayer request detail | `#/prayer/p-sarah-timeline` |
| 13 | "I Prayed" interaction state | tap the button on #12 |
| 14 | Encouragement composer (+ scheduling) | `#/encourage/maya` |
| 15 | Encouragement Wall | `#/wall/maya` |
| 16 | Support circle management | `#/circles` as a student |
| 17 | Student wellbeing check-in | `#/checkin` as Elijah |
| 18 | Milestone timeline | `#/milestones/all` |
| 19 | Notification center | `#/notifications` |
| 20 | Privacy & visibility settings | `#/privacy` |
| 21 | Coordinator dashboard | `#/home` as Marcus |
| 22 | Empty states (no students followed) | `#/home` as Riley |
| 23 | Safety & support escalation | `#/safety` |
