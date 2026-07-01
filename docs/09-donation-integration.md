# 09 · Donation platform integration

## The question this answers

*"When Global Year sets up a new student, can we seamlessly integrate their donation platform? It used to be Kindful, but Kindful got acquired."*

Yes — and the prototype now demonstrates it end-to-end. The key design decision is **what kind of "seamless" this should be**: a one-way read of each student's support total, not moving money through Kindred.

## What happened to Kindful

Kindful was acquired by **Bloomerang** in January 2021 and is [discontinued for new customers, folded into Bloomerang's CRM](https://www.trustradius.com/products/kindful/reviews). So Global Year is in one of three states, and Kindred handles all three the same way through one seam:

1. **Migrated to native Bloomerang** (most likely) — modern [REST API](https://bloomerang.com/api/rest-api), but no native webhooks, so sync is a scheduled pull or a middleware broker.
2. **Still on legacy Kindful** — its API was its headline feature and it had webhooks, but it's on a sunset path.
3. **Moved to a ministry-specific tool** (Pushpay, Virtuous, DonorElf, Managed Missions) — common in faith-supported/support-raising ministries.

## The core principle: money is present, never the plot

Global Year students are faith-supported and raise ~$13.5–15.5k of personal ministry support, so ignoring finances would be dishonest. But Kindred is not a giving app. Therefore:

- **Kindred never processes a gift.** The donation platform stays the system of record. This keeps Kindred out of PCI scope, off the app-store donation-cut rules, and — most importantly — keeps "give now" pressure out of a UI whose thesis is *the student is a person, not a fundraising number*.
- **Kindred reads one number** — the student's support total — and it feeds **only the private partnership goal** (`Only me` by default, per [the data model](04-data-model.md#supportgoal)).
- **Giving deep-links out** to the platform's hosted page with the student's designation prefilled (`give.globalyear.org/gy26-kim?designation=GY26-KIM`). The transaction happens on the compliant platform; Kindred just reflects the result.

## The seam: `DonationProvider`

Because the platform got acquired once and will churn again, Kindred talks to an **interface**, never a vendor directly. Implemented in [`prototype/js/donation.js`](../prototype/js/donation.js):

```js
interface DonationProvider {
  linkOrCreateFund(student) -> { fundId, designation, created }
  getSummary(fundId)        -> { goal, raised, pct, monthlyPartners, lastGift, currency, asOf }
  giveUrl(fundId, opts?)    -> string   // hosted giving page, designation prefilled
  providerName             : string
}
```

`Bloomerang` is one adapter (a working mock in the prototype). Legacy Kindful, a future replacement, or a manual-entry fallback are each just another implementation behind the same three methods. When the next acquisition happens, you **swap one adapter, not the app**. A thin `Donations` facade holds the `studentId → fundId` link table (a column on `StudentProfile` in production) and is the only thing the app code calls.

## Seamless at student setup — the sequence

When a Global Year admin **verifies a new student**:

1. Kindred calls `provider.linkOrCreateFund(student)`. Bloomerang model: one `Global Year Students` fund + a **per-student designation** (`GY26-OKAFOR`) — not one fund per student, which doesn't scale in Bloomerang's coarser fund model.
2. The returned `fundId` is stored on the student's profile. That's the entire setup — the student and admin never touch the donation platform.
3. From then on, `getSummary(fundId)` populates the private partnership goal automatically on a schedule.

The prototype shows this as **step 4 of student setup ("Partnership account")**: the account is already connected, showing platform, designation, and synced total, with the explicit promise that Kindred never touches a gift and that a Kindful→Bloomerang move loses nothing. View it at `#/setup` (step 4), and see the resulting private goal on a student's Support tab, and the give-handoff on any financial/travel need (`#/need/n-sarah-flight` → "Give toward this").

## Honest caveats (say these to Global Year)

- **No native Bloomerang webhooks.** Sync is a scheduled pull (hourly is plenty — no one needs a funding bar to tick live) or a middleware broker (Zapier / Rollout / Fundraise Up). Don't promise real-time.
- **API access is plan-gated** on Bloomerang's higher tiers — confirm Global Year's contract includes it.
- **Designations vs. funds** — model students as designations under one cohort fund, or figures balloon.
- **Historical data** — if Global Year is mid-migration off Kindful, reconcile Kindful campaign history into Bloomerang designations before first sync so raised totals are complete.

## What I need to make this exact

Confirmation of **which platform Global Year runs today** (native Bloomerang, legacy Kindful, or something else) and **whether their plan includes API access**. That determines the single adapter to build for real; everything above the adapter is already done.
