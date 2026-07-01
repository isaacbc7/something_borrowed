# 00 · The design brief, rewritten

## Why the brief needed rewriting

The original prompt asked for "modern Apple design conventions, SwiftUI-style layouts, rounded cards, fluid transitions, clean typography, warm human-centered visuals." That vocabulary produces the same app every time: white rounded cards on off-white, pastel pill chips, gradient-circle avatars, a frosted-glass tab bar. Competent, warm — and indistinguishable from every meditation, journaling, and community app shipped since 2022. A design brief that describes *qualities* ("warm, hopeful, premium") without naming *forms* gets the statistical average of the App Store.

This product is not average. It is a **nine-month correspondence between two places** — a student in Chiang Mai or Antigua or Praia, and a kitchen table in Tennessee. The design language should be derivable from that fact alone, and from nothing generic.

## The improved prompt

---

**Design "Kindred" as a field journal and a bundle of airmail — not as an app that happens to be about one.**

The entire visual system must come from the physical objects this community already trusts: airmail envelopes, postmarks, postage stamps, ticket stubs, ledgers, taped photographs, wax seals, and a planner whose months run September to May. If a screen could belong to a meditation app or a SaaS dashboard, it is wrong.

**Concept: Between Two Places.** Every design decision should make distance visible and presence possible. The app is the thing that travels between home and the field.

### Non-negotiable signature elements

1. **Mastheads, not greeting cards.** Every root screen opens like a journal page: a letterspaced monospace dateline over a rule ("VOL. I · SEP–MAY · TUESDAY, JULY 1"), then an oversized serif headline. No floating "greeting card" headers.
2. **The two-clock ribbon.** Wherever a student appears at full width, show both ends of the correspondence: "CHIANG MAI 21:41 ····✈···· FRANKLIN 09:41 · DAY 214 OF 270". Time zones and a day counter are the app's heartbeat — no generic app has a reason to show them; this one has no reason not to.
3. **Postmark prayer.** Praying stamps a real postmark — a rotated, ink-blue circular date stamp pressed onto the request. Prayer counts read like a stamp tally ("PRAYED ×18"), never a pastel pill.
4. **Ticket-stub needs.** A need is a perforated ticket with a tear-off stub. Committing to help = claiming the stub. Funding progress is a dotted flight line with a small plane at the current position — never a rounded progress bar.
5. **Wax-seal answers.** An answered prayer is sealed in gold wax. Quiet, formal, joyful.
6. **Stamp-frame portraits.** People appear as postage stamps: square, perforated edges, duotone paper tones, serif initials. No gradient circles.
7. **Letters, not content cards.** Encouragement is airmail — red-and-blue hatched borders, postmarked, addressed. The Encouragement Wall is a bundle of letters, slightly askew, pinned and taped.
8. **A ledger, not a dashboard.** The coordinator's view is a ruled ledger with monospace figures and marginal marks in red and blue. No KPI tiles, no signal-color chips.
9. **Inner weather.** The wellbeing check-in is a field report: "INNER WEATHER — CHIANG MAI" with typographic weather glyphs (☼ ☾ ☂ ≋), not an emoji mood picker.
10. **Index-tab navigation.** The bottom bar is the journal's index: numbered monospace entries (01 HOME · 02 STUDENTS …) under a double rule, with a red bookmark tick on the open tab. No icons-in-a-blur-bar.

### Material & color

Paper, ink, and three postal accents. Nothing else.
- Paper `#F4EEE1` with visible grain; entries on slightly brighter paper `#FCF8EE`; rules instead of shadows.
- Ink `#241D14` (warm near-black), faded ink `#6A5C49`, pencil `#9C8E78`.
- **Postal red** `#BF3B2B` (urgency-with-hope, bookmark ticks, airmail hatching), **airmail blue** `#274C77` (postmarks, actions, flight lines), **wax gold** `#A9791F` (seals, milestones). Semantic green appears only as field-note ink for "fulfilled."
- Corners: 2–3px (print, not pillow). Depth: hard 1px letterpress offsets, hairline and double rules, deckled/perforated edges. **Banned: soft drop shadows, glassmorphism, gradients on surfaces.**

### Typography

- **Fraunces** (OFL, variable, optical sizing) for headlines, names, numerals, and body — a warm, slightly wonky old-style serif that reads like a well-set journal. Italic for asides and "P.S." lines.
- **IBM Plex Mono** for every label, tag, button, date, count, and caption — uppercase, +0.08em tracking. The mono voice is the app's "postal system"; the serif voice is the human writing in it.
- The system sans appears nowhere. That absence alone separates this app from every SwiftUI default.

### Voice fused with form

Labels adopt the correspondence vocabulary without hiding function: "Today's dispatch," "The post," "Field report," "Claim this stub," "P.S. — it's been a while since you wrote Elijah." Microcopy remains emotionally intelligent and guilt-free; the postal metaphor is a costume for warmth, never a puzzle.

### What stays from v1 (it was never the problem)

The five-tab structure, role-adaptive surfaces, circle-based privacy model, needs/prayer/encouragement systems, coordination logic, safety flows, accessibility commitments, and anti-manipulation notification rules all stand. This is a re-skinning of the *soul*, not the skeleton.

### The test

Screenshot any screen, crop out the app name, and show it to someone. If they say "some wellness app," the design has failed. If they say "it looks like mail from someone far away," ship it.

---
