# Hero Concierge Health — Project Brief

> This is the optimized brief that originated this project. Source: evolution of "Hero Men's Health Chicago" into a gender-neutral concierge clinic.

## The brief

**Hero Concierge Health** — a Chicago concierge health clinic for men and women. A brand-new marketing website.

**Positioning:** a one-stop-shop concierge clinic. The key differentiator is **real telehealth backed by an actual physical clinic in Chicago (Lakeview, 1416 W Belmont Ave)** — not a hand-wave of virtual-only care. Real doctors, a real clinic, seamless virtual + in-person.

**Aesthetic:** gender-neutral, refined, clinical-luxury — inspired by [atria.org](https://www.atria.org) (minimalist whitespace, sourced-data credibility, doctors showcase, healthspan framing) and [maximustribe.com](https://www.maximustribe.com) (science-forward "how it works" protocol flow, doctor-backed rigor). Retain the **Montserrat** typeface from Hero Men's Health, with a more editorial scale (larger headings, lighter weights, generous line-height). Green `#57BF91` becomes an **accent** paired with warm neutrals + charcoal `#2D2525`, not the dominant color.

**Services (core optimization, made unisex):**
- Hormone Optimization (men: TRT · women: hormone & menopause balance)
- Weight Optimization (GLP-1)
- Sexual Health (inclusive: libido, intimacy, performance)
- NAD Therapy
- Aesthetics / Botox (renamed from "Masculine Botox")

**Pages:** Home · individual service pages · About / Our Story + Team · Membership & Pricing · The Clinic (Chicago) · How It Works + FAQ.

**Imagery:** real clinic photos. Until provided, neutral gender-diverse **placeholders** are used with clearly documented swap points (see below).

---

## Tech notes
- Forked from `hero_mens_health_chicago-1.0-2.0` (Next.js 15 App Router, Tailwind, Framer Motion). Content is driven by a single config file: `src/data/structure.ts`.
- Dev server: **port 3020** (`pnpm dev`). The original site runs on 3010 and is untouched.
- Header CTA is the simple "Get a Callback" modal (`src/components/header/QuickContactModal.tsx` → `src/app/api/contact/route.ts`).

## Image swap points (placeholders → real clinic photos)
Replace these when real photography is available:
- `public/images/hero-bg.jpg` — home hero background (clinic interior / care moment)
- `public/images/doctors/doc-1..4` — team headshots (About / Team)
- `public/image/main-page/hero_aaron.webp` — featured care photo
- `public/image/services/<slug>/*` — service problem/benefit tiles
- Clinic page interior shots (see `src/app/clinic/page.tsx` swap comments)

## Open items (placeholder copy used until client confirms)
- Women's service medical framing (menopause/perimenopause language)
- Membership tier names + pricing numbers
- Team member real names / bios / credentials
