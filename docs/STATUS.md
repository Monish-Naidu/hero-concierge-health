# Project Status & Handoff — Hero Concierge Health

_Last updated: 2026-06-25_

## What this is
**Hero Concierge Health** — a Chicago concierge health clinic website for **men and women**. Built as a fork of the older "Hero Men's Health" men's-only site, then rebranded gender-neutral. Next.js 15 (App Router) + Tailwind + Framer Motion. See `docs/PROJECT_BRIEF.md` for the full positioning brief.

- **Repo:** https://github.com/Monish-Naidu/hero-concierge-health (public, branch `main`)
- **Local path:** `/Users/monishnaidu/Downloads/hero-concierge-health`
- **Dev server:** port **3020**
- **Original site** (untouched, separate): `/Users/monishnaidu/Downloads/hero_mens_health_chicago-1.0-2.0`, port 3010

## How to run it locally
```bash
cd /Users/monishnaidu/Downloads/hero-concierge-health
pnpm install        # first time / after pulling
pnpm dev            # serves http://localhost:3020
```
Gotchas:
- If `pnpm dev` complains about the `sharp` build, it's already approved via `pnpm-workspace.yaml` (`allowBuilds: sharp: true`). `pnpm config set verify-deps-before-run false` was also set to avoid a pre-run hang.
- Port already in use: `lsof -ti tcp:3020 | xargs kill -9`
- Page won't load/hydrate after lots of edits → stale build cache: `rm -rf .next` then `pnpm dev`.

## What's done
- **Rebrand:** "Hero Concierge Health", Montserrat font, **earth-tone palette** (clay/terracotta accent `#A86A45`, tan `#D8BFA6`, cocoa `#7E4A2E`, espresso dark `#33281F`, warm cream/sand). All green removed.
- **Home flow:** hero → "Telehealth backed by a real clinic" differentiator → How It Works → About/membership blurb → Why Choose Us → Services → Membership teaser → Clinic/location.
  - Removed at client request: "As Seen On", "Partners in Peak Wellness" (+ Harvard/Columbia logos), and "Ready to start your journey" final CTA.
- **Pages:** `/`, `/about` (story + team), `/membership` (3 pricing tiers), `/clinic` (the telehealth+physical differentiator), `/how-it-works` (+ FAQ), `/services/[slug]` for the 5 services.
- **Services (unisex):** hormone-optimization, weight-optimization (GLP-1), sexual-health, nad-therapy, **aesthetics** (renamed from "masculine-botox").
- **Lead capture:** header "Get a Callback" modal (`src/components/header/QuickContactModal.tsx`) → `POST /api/contact`. The old multi-step booking modal + its dead GraphQL backend were removed from all pages.

## Open items (placeholder content — needs client sign-off; all marked `TODO` in code)
- Women's service medical copy (menopause/perimenopause framing)
- Membership tier names + prices (currently Essential $99 / Concierge $249 / Family Custom)
- Team member real names, bios, headshots (`/about`)
- FAQ answers (`/how-it-works`)
- **Real clinic + team photos** — currently placeholders. Swap points listed in `docs/PROJECT_BRIEF.md`.

## Key files
- Content/config: `src/data/structure.ts` (drives most pages)
- Design tokens: `tailwind.config.ts`
- Home composition: `src/app/page.tsx`
- New sections: `src/sections/{differentiator,how-it-works,membership-teaser}/`
- New pages: `src/app/{about,membership,clinic,how-it-works}/page.tsx`
