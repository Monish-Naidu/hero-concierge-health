# Hero Concierge Health

Marketing website for **Hero Concierge Health** — a concierge health clinic for
**men and women** in Chicago (Lakeview). The positioning: a one-stop-shop
concierge clinic whose differentiator is **real telehealth backed by an actual
physical clinic** — not virtual-only care.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and
**Framer Motion**.

- **Live:** https://hero-concierge-health.vercel.app
- **Repo:** https://github.com/Monish-Naidu/hero-concierge-health

## Table of contents
- [Overview](#overview)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Content & customization](#content--customization)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

## Overview
The site informs visitors about the clinic and converts them into leads. It is a
multi-page App Router site with a home/landing page plus dedicated pages, all
driven from a single content config.

**Pages**
- `/` — home (hero, "telehealth backed by a real clinic," how-we-care, featured
  services, membership, location)
- `/about` — story + team
- `/membership` — membership tiers & pricing
- `/clinic` — the physical Chicago clinic + telehealth model
- `/how-it-works` — process + FAQ
- `/services/[slug]` — individual treatment pages

**Services (for men and women)**
Hormone Optimization (TRT + menopause/hormone balance), Weight Optimization
(GLP-1), Sexual Health, NAD Therapy, and Aesthetics & Botox.

**Lead capture**
The header **"Contact Hero"** button opens a simple name + email/phone modal that
posts to `POST /api/contact`.

## Tech stack
- **Next.js 15** (App Router, React 18)
- **TypeScript**
- **Tailwind CSS** (earth-tone design tokens in `tailwind.config.ts`; Montserrat)
- **Framer Motion** (animations; overlays are portaled to `document.body`)
- **Vitest + React Testing Library** (unit/integration tests)
- **pnpm** package manager; **ESLint + Prettier**; **next-sitemap**

## Getting started
Requirements: **Node.js 18+** and **pnpm**.

```bash
pnpm install        # if pnpm is missing: npm install -g pnpm
pnpm dev            # http://localhost:3020
```

Environment variables (`.env`) are optional for local development — the site
runs without them. The placeholder keys point at a legacy backend that is no
longer used by the lead flow.

## Scripts
```bash
pnpm dev       # dev server on port 3020
pnpm build     # production build
pnpm start     # serve the production build (port 3016)
pnpm test      # run the Vitest suite
pnpm lint      # eslint --fix
pnpm format    # prettier --write
```

## Project structure
```
src/
├─ app/                     # App Router: pages, layout, /api routes
│  ├─ page.tsx              # home page composition
│  ├─ about | membership | clinic | how-it-works
│  ├─ services/[slug]       # dynamic treatment pages
│  └─ api/contact/route.ts  # lead-capture endpoint
├─ components/
│  ├─ header/               # Header, SiteMenu (menu overlay), QuickContactModal
│  ├─ faq/                  # FAQ accordion
│  └─ ui/                   # Button, CallbackButton, StockPhotoBadge, etc.
├─ sections/                # landing sections (hero, differentiator,
│                           # care-approach, featured-services, clinic-gallery,
│                           # membership-teaser, contact, …)
├─ data/structure.ts        # ⭐ single source of truth for all page content/SEO
├─ api/                     # types + apollo client (legacy)
└─ test/setup.ts            # Vitest setup (jsdom + mocks)
docs/                       # PROJECT_BRIEF, STATUS, IMAGE_CREDITS
public/image/services/<slug>/  # per-treatment photos
```

## Content & customization
- **All page content + SEO** lives in `src/data/structure.ts` (headers, hero,
  per-service copy/benefits/FAQ, contact, documents). Edit there to change copy.
- **Design tokens** (colors, fonts) are in `tailwind.config.ts`.
- **Imagery:** the treatment photos are **free Unsplash placeholders** (diverse,
  men and women) marked with a "Stock · replace" badge. Replace files in
  `public/image/services/<slug>/` (same filenames) with your own. Details +
  the legal note are in `docs/IMAGE_CREDITS.md`. Hide the badges by setting
  `SHOW_STOCK_PHOTO_BADGE = false` in `src/components/ui/StockPhotoBadge.tsx`.
- **Open placeholder items** (membership pricing, team bios, women's medical
  copy, real clinic photos) are tracked in `docs/STATUS.md`.

## Testing
```bash
pnpm test
```
Vitest + React Testing Library cover the key UX flows — the Contact Hero modal
(validation + submit), the Menu overlay (open/close, links), CallbackButton, the
Featured Services grid, and the `/api/contact` handler.

## Deployment
Hosted on **Vercel**. Pushing to `main` and running `vercel --prod` deploys to
the stable alias **https://hero-concierge-health.vercel.app** (which always
points at the latest production build).

## License
© 2026, all rights reserved by Hero Concierge Health.
This code may not be redistributed without explicit permission from the owners.
