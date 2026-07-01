# 05 · Design system — "Between Two Places"

The visual language of a **field journal and a bundle of airmail**: paper, ink, and three postal accents. Every component is derived from a physical object this community already trusts — envelopes, postmarks, postage stamps, ticket stubs, ledgers, taped photographs, wax seals. Nothing here could be mistaken for a default SwiftUI app, a wellness product, or a SaaS dashboard. See [docs/00-design-brief.md](00-design-brief.md) for the reasoning; everything below is implemented in `prototype/css/app.css`.

## Material & color

Two voices of paper, three inks, three postal accents. That's the whole palette.

| Token | Value | Use |
|---|---|---|
| `paper` | `#F4EEE1` | The page — warm, grained (SVG turbulence overlay) |
| `paper-bright` | `#FCF8EE` | Entries, slips, tickets |
| `paper-deep` | `#EAE2CF` | Wells, pressed states |
| `ink` | `#241D14` | Primary text — warm near-black |
| `ink-2` / `ink-3` | `#6A5C49` / `#9C8E78` | Faded ink, pencil |
| **`post-red`** | `#BF3B2B` | Bookmark ticks, airmail hatching, urgency-with-hope, the P.S. rule |
| **`post-blue`** | `#274C77` | Postmarks, primary actions, flight lines, links |
| **`wax`** | `#A9791F` | Seals, milestones, "needs care" marks |
| `field-green` | `#4A6741` | Fulfilled / confirmed — field-note ink only |

Depth comes from **rules, perforations, and letterpress offsets** — hairlines, double rules under mastheads and above the tab bar, dashed perforation edges, hard `3px 3px 0` ink offsets on buttons. **Banned:** soft drop shadows, glassmorphism, gradient surfaces, pastel tint pills.

## Typography — two voices

| Voice | Face | Role |
|---|---|---|
| **The human writing** | [Fraunces](https://fonts.google.com/specimen/Fraunces) (OFL, variable, optical sizing — vendored in `prototype/fonts/`) | Headlines (33px/560 at high optical size), names, body (15–16px/1.5), big ledger numerals. Italic for quotes, asides, "P.S." lines, and students' own words. |
| **The postal system** | IBM Plex Mono (OFL, vendored) | Every label, tag, date, count, button, caption, tab. Uppercase, +0.08–0.16em tracking, 8.5–12px. |

The system sans-serif appears **nowhere**. Set Fraunces headlines with `font-variation-settings: 'opsz' 60` for the display cut. On-device equivalents: Fraunces ships with the app; Plex Mono falls back to SF Mono gracefully.

## Signature components (all implemented)

| Component | Form |
|---|---|
| **Masthead** | Wordmark line over a rule ("KINDRED — A GLOBAL YEAR CORRESPONDENCE"), mono dateline ("VOL. I · SEP–MAY · TUESDAY, JULY 1"), oversized serif headline ending in a period. |
| **Two-clock ribbon** | `ANTIGUA 08:41 ····✈···· FRANKLIN 09:41 · DAY 92 OF 270` between hairlines. Appears wherever a student appears at full width. Countdown variant for pre-departure: `T−63 DAYS`. |
| **Stamp portrait** | Square postage stamp: perforated edge (radial-gradient punch holes), duotone paper fill, serif initials in matching ink. Status dot sits outside the frame. |
| **Ticket (need)** | Entry with a perforated tear-off stub on the left edge and a punch hole. Commit = **"Claim this stub."** |
| **Flight-line progress** | Dotted route with a solid ink-blue traveled segment and a small plane at the current position; `✓` replaces the plane when fulfilled. Never a rounded bar. |
| **Postmark (prayer)** | The "I prayed" action stamps a rotated circular date stamp — double ring, ink-blue, uneven ink via mask — onto the request. Counts read `PRAYED ×18`. The button's stamped state becomes a dashed outline. |
| **Wax seal (answered)** | Radial gold seal with embossed ✳ on cream; serif-italic caption. Reverent, not confetti. |
| **Letter (encouragement)** | Airmail red/blue hatched top edge, mono sender line with `[NOTE] [VERSE] [VOICE] [PHOTO]` tags, serif body, dotted-rule footer. Wall letters sit ±0.5° askew. |
| **Ledger (coordinator)** | Ruled entries with colored marginal rails (wax = needs care, blue = milestone, green = well supported) and mono fact lines prefixed with em-dashes. |
| **Inner weather (check-in)** | Boxed typographic weather glyphs (✹ ≈ ☼ ✈ ☾ ☂ ≋ ✚) with mono labels; selection outlines in post-red. |
| **P.S. nudge** | Red left rule + mono "P.S." + serif italic line. The no-guilt pattern. |
| **Index tab bar** | Double rule on top; five numbered mono entries (01 HOME … 05 PROFILE); active tab gets a red bookmark tick. No icons. |
| **Telegram toast** | Paper strip with airmail hatched top/bottom edges, mono uppercase message, hard offset. |
| **Journal cover (onboarding)** | Post-blue cover with double-rule frame, gold page marks, serif title, typographic ornaments (✈ ✉ ☼) — no emoji anywhere in the system. |
| **Taped photo** | Duotone halftone image plate, 6px paper border, tape strip, −0.8° rotation, hard shadow. Art direction: student-shot, street-level, ordinary moments. |

## Standard components, restyled

Buttons (letterpress, mono-caps, press = translate into the shadow) · choices (square mono tags, ink fill when selected) · switches (rectangular, ink thumb) · inputs (ruled paper, serif entry text) · segmented controls (underline index tabs with red tick) · sheets (paper slip under a double rule, stitched grabber) · empty states (large rotated ornament in post-red + serif headline + one action).

## Motion & haptics

Dry and physical, like paper: screens rise 8px in 240ms; the postmark and "stamped" states land with a `scale(1.12) → 1` stamp-in and a medium haptic; sheets slide with a short spring; buttons translate into their own shadow. No bounces, no glows, no confetti. `prefers-reduced-motion`: stamp-in becomes a fade, translations become cross-fades.

## Voice fused with form

"Today's dispatch" · "The sending ledger" · "Inner weather" · "Claim this stub" · "Stamp it — I prayed for Sarah" · "Postmarked. It will arrive on Aug 3." · "P.S. — it's been a little while since you wrote Elijah." The postal vocabulary is a costume for warmth; function words (Home, Students, Support, Prayer, Profile, "Mark fulfilled") stay plain.

## States

Empty states explain *why* (privacy-empty vs. nothing-exists) with a typographic ornament and one action. Success = state change in place (postmark, claimed stub, seal) plus a telegram strip. Errors are inline, specific, blame-free. Loading (spec): skeleton rules and grayed stamps, not shimmering cards.

## Accessibility deltas from v1

Contrast is higher than v1 (ink on paper ≈ 13:1; post-blue on paper ≈ 7.3:1; wax on cream ≥ 4.6:1 at label sizes). Mono microcopy never goes below 8.5px in the prototype and maps to iOS Caption2 with full Dynamic Type scaling. Glyphs (☂, ✈) always pair with words. The postmark state is announced by VoiceOver as "Stamped — you prayed for Sarah." All other commitments in [07 · Accessibility](07-accessibility.md) hold.
