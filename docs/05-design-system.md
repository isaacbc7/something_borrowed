# 05 · Design system — "Kindred"

Warm, global, hopeful, personal, calm, premium. Faith-centered without visual cliché. Native iOS in spacing, hierarchy, and touch behavior. Everything below is implemented in `prototype/css/app.css`.

## Color

### Foundations
| Token | Value | Use |
|---|---|---|
| `canvas` | `#FAF7F2` | App background — warm off-white, never pure white or gray |
| `card` | `#FFFFFF` | Elevated surfaces |
| `ink` | `#1C2B3A` | Primary text (deep navy-ink, softer than black) |
| `ink-2` | `#56657A` | Secondary text |
| `ink-3` | `#8A96A6` | Tertiary/meta text |
| `hairline` | `rgba(28,43,58,.10)` | Separators |

### Brand hues (each with a matching tint for washes/chips)
| Token | Value | Meaning in the UI |
|---|---|---|
| `navy` `#24425F` | primary actions, prayer surfaces, trust |
| `forest` `#3E6B4F` | fulfillment, confirmation, "serving" season |
| `teal` `#4E8D87` | community, coordination, links |
| `clay` `#C4744F` | warmth, family, encouragement |
| `gold` `#D99A3D` | milestones, "support moments," answered prayer, urgency-with-hope |
| `sky` `#A9C7DB` | gentle nudges, information |

Semantic: success `#3E7C5B`, caution/danger `#B4533A` (used sparingly — this app avoids alarm-red).
Rule of thumb: **gold is for hope-flavored urgency; red never pressures a student's need.** Gradients appear only in avatar fills, photo placeholders, and the onboarding sky — never on text surfaces.

## Typography

System stack (SF Pro on device). Tracking tightens as size grows, per Apple convention.

| Style | Size/weight | Use |
|---|---|---|
| Large Title | 32/800, −0.022em | Screen greetings ("Good morning, Dana") |
| Title 2 | 26/800 | Detail-screen headlines |
| Section | 20/750 | Section heads ("Needs you can help with") |
| Card title | 17/700 | Card headlines |
| Body | 15–16/400, 1.45–1.55 lh | Content, stories |
| Subhead | 13/600 | Row subtitles, meta |
| Kicker | 13/600 uppercase, +0.04em | Context lines ("TUESDAY, JULY 1") |
| Caption | 11.5–12/600 | Tab labels, timestamps |

Full Dynamic Type support is a requirement (see accessibility doc). Numerals in stats use the display weight (800) to feel confident without shouting.

## Spacing, shape, elevation

- **4pt grid.** Screen margins 20pt; card padding 16pt; stack gaps 8/12pt; section rhythm 22–24pt.
- **Radii:** cards 20pt · buttons 14pt · sheets 28pt top · chips/pills full-round.
- **Elevation:** one soft card shadow (`0 1px 2px + 0 6px 20px` at 5–6% ink) and one floating shadow for sheets/toasts. No borders heavier than a hairline.
- **Touch targets:** ≥44pt everywhere; primary buttons 50pt; the "I Prayed" button 58pt — the most important tap in the app is the easiest.

## Iconography

SF Symbols on device (prototype uses matching 24pt stroke SVGs, 1.8pt weight, round caps).

| Concept | SF Symbol |
|---|---|
| Home | `house` · Students `person.2` · Support `gift` · Prayer `hands.and.sparkles` (custom folded-hands glyph in brand set) · Profile `person.crop.circle` |
| Prayer actions | custom praying-hands; `checkmark` on completion |
| Needs | category-mapped: `airplane`, `shippingbox`, `phone`, `heart`, `fork.knife`, `cross.case`, `house.lodge` |
| Privacy | `lock`, `eye`, `shield` — always paired with plain-language copy |
| Milestones | `birthday.cake`, `star`, `globe.americas`, `calendar` |

Icons never carry meaning alone; every icon has an adjacent label.

## Component library (all implemented)

**Containers** — Card (+ five tinted "washes"), List/Row (56pt, hairline-inset), Sheet (grabber, spring-in), Toast (bottom-floating, auto-dismiss).
**Controls** — Button (primary/gold/forest/soft/ghost/danger-soft × block/sm), Chip (7 tints), Choice pill (single/multi select), Segmented control, Switch row (title + explanation + toggle), Input/TextArea, Step dots.
**Identity** — Avatar (24→96pt, 6 gradient hues, initials fallback), avatar stack, status dot (thriving/care/milestone).
**Content** — Need card (category icon, urgency chip, progress bar, coordination line), Prayer card (count, visibility chip, urgency), Update card (author, audience chip, photo, gentle reactions), Wall note (kind-tinted), Milestone timeline (gold "soon" emphasis), Stat trio, Signal card (coordinator; colored left rail), Nudge (sky tint — the no-guilt pattern), Privacy note (lock + plain language).
**Moments** — "I Prayed" button (ripple + green settle + haptic), Answered-prayer banner (gold glow-in), Mood grid (emoji + spring scale), Empty state (art, headline, kind copy, one action).

## Micro-interactions & haptics

| Moment | Feedback |
|---|---|
| "I Prayed" | medium impact haptic + ripple + color settle to forest green — warm, not gamified |
| Commitment confirmed | success haptic + "Help is on the way 💛" toast |
| Answered prayer | glow-in banner; no confetti — reverence over celebration theatrics |
| Mood selection | light haptic + 1.04 spring scale |
| Card taps | 0.985 scale press state |
| Screen transitions | 280ms ease-out fade/rise; sheets 320ms spring |

## Photography & illustration direction

Large, human-centered, student-shot photography: real classrooms, muddy soccer fields, language-school notebooks, hands, tables, cities at street level. No stock church imagery, no drone-hero-shots, no poverty tourism. Prototype uses warm gradient placeholders with captions to art-direct without stock photos. Emoji appear as *warmth accents* in moods and toasts only — never as functional icons.

## UI states (designed, not an afterthought)

| State | Pattern | Example in prototype |
|---|---|---|
| Empty | art + honest headline + one clear action; empties caused by privacy say so kindly | "Nothing shared with you yet — what you see is what they've chosen for you" |
| Loading | skeleton cards mirroring layout (spec; not simulated in static prototype) | — |
| Success | toast + state change in place; big moments get banners | commitment, answered prayer |
| Error | inline, specific, blame-free, with retry; never a bare alert | "That invite code didn't match — codes expire after 14 days. Ask for a fresh one." |
| Privacy state | first-class: content hidden by audience renders an explanatory empty, never a lock-tease of hidden content | Jordan viewing Elijah's Updates |

## Voice & microcopy rules

Warm, direct, second-person; never guilt, never hype. The words carry the brand:
- "How can your community support you today?" · "You are not carrying this alone." · "Help is already on the way." · "Choose who can see this." · "Thank you for showing up." · "This prayer has been answered."
- Students are people, not projects: never "sponsor a student," "campaign," "donor target," or completion percentages on a person.
- Every privacy control is explained in one human sentence at the point of use.
