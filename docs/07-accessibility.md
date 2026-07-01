# 07 · Accessibility notes

A support app fails at its one job if a grandmother can't use it. Accessibility here is a feature of the *emotional* promise, not a compliance checklist.

## Dynamic Type
- All text uses the iOS text-style ramp (Large Title → Caption 2) and scales through the full accessibility range (AX5).
- Layouts are stack-based and reflow: stat trios wrap to a column, the mood grid drops from 4 to 2 columns, card actions stack vertically at AX sizes.
- No text lives in images; photo captions are real text overlays.
- Minimum body size 15pt at default; meta text never below 11.5pt and never conveys sole meaning.

## Contrast
- Ink `#1C2B3A` on canvas `#FAF7F2`: ~12.5:1. Secondary `#56657A`: ~5.6:1. Both pass AA (primary passes AAA).
- Chip/tint pairings are tuned (e.g. gold chips use `#8A5F1D` text on `#F8EEDD`, ≈5.9:1); white-on-navy buttons ≈8.6:1; white-on-forest ≈5.9:1.
- Status is never color-only: dots pair with text ("Homesick 🌧️", "Needs care"), progress bars carry numeric labels, urgency chips carry words.

## VoiceOver
- Every card is a single accessible element with a composed label: *"Prayer request from Sarah Kim. Peace about the timeline. Could use prayer today. Prayed for by 18 people. Visible to all supporters. Button."*
- The "I Prayed" button announces its state change: *"You prayed — thank you."*
- Visibility chips read as *"Visible to Family and Mentors"* — privacy is audible, not just visible.
- Sheets trap focus, announce their heading on presentation, and the grabber is skippable; toasts post as polite announcements.
- Decorative elements (gradient photos, emoji accents, timeline rail) are hidden from the accessibility tree; meaning always has a text twin.

## Motor & interaction
- Touch targets ≥44×44pt; destructive/irreversible actions require a confirming sheet, never a swipe-only gesture.
- All swipe/carousel content has button alternatives ("See all"); the app is fully operable with Switch Control and Full Keyboard Access.
- Pull-to-act patterns are avoided; primary actions are explicit buttons.

## Haptics & sound
- Haptics accompany meaning (prayer, commitment, mood) but never carry it alone; all haptic moments have visual + textual confirmation.
- No autoplaying audio; voice messages show duration and require a tap.

## Reduced motion
- `prefers-reduced-motion`: screen transitions become cross-fades, the prayed ripple becomes a color change, spring scales are disabled, the answered-prayer glow-in renders statically.

## Cognitive load
- One primary action per screen; sheets ask one question at a time (the commitment flow is deliberately step-by-step).
- Privacy language is plain: "Only her," "9 people, and no one else" — counts, not policy terms.
- Empty states explain *why* something is empty, distinguishing "nothing exists" from "not shared with you."
- Reading level targets ~6th grade for all system copy; scripture/user content excepted.

## Internationalization readiness
- All strings externalized; layouts tolerate +40% text expansion (Spanish and Portuguese are day-one candidates given program locations).
- Dates, times, and the student's timezone are handled server-side for scheduled encouragement; RTL mirroring supported by the stack-based layout system.
