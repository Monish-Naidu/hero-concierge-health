# Hero Men's Health Website

This project is a website for Hero Men's Health, a men's clinic in Chicago, built using Next.js with TypeScript and Tailwind CSS.

## Table of Contents
- [Project Overview](#project-overview)
- [Technologies & Requirements](#technologies--requirements)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Running & Building](#running--building)
- [Customization & Extensions](#customization--extensions)
- [License](#license)

## Project Overview
Hero Men's Health is a clinic specializing in men's health services, offering hormone optimization, weight loss, hair restoration, and more. The website aims to:

- Inform visitors about the clinic’s services.
- Provide online booking for consultations.
- Establish brand identity and build trust in the specialists' expertise.

The website follows a single-page (Landing Page) structure with sections such as a hero banner with a CTA, information blocks, service lists, testimonial/logos (if required), and contact information.

## Technologies & Requirements
### Core Technologies:
- **Next.js** (React framework for SSR and SSG)
- **TypeScript**
- **Tailwind CSS** (Utility-first CSS framework)

### Development Tools:
- **pnpm** – Package manager (alternative to npm or yarn)
- **ESLint & Prettier** – For code formatting and consistency
- **next-sitemap.config.js** – For sitemap generation
- **pnpm-lock.yaml** – Dependency version lock

### System Requirements:
- **Node.js**: v15.x
- **pnpm**: Installed globally

## Project Structure
```
heromenshealth-chicago/
├─ node_modules/
├── public
│ ├── icons
│ │ ├── Call.svg │ ├── apple-touch-icon.png │ ├── favicon-96x96.png │ ├── favicon.ico │ ├── favicon.svg │ ├── site.webmanifest │ ├── web-app-manifest-192x192.png │ └── web-app-manifest-512x512.png ├── images │ ├── advantages │ │ ├── adv-1.webp │ │ ├── adv-2.webp │ │ ├── adv-3.webp │ │ └── adv-4.webp │ ├── doctors │ │ ├── doc-1.png │ │ ├── doc-2.png │ │ ├── doc-3.png │ │ └── doc-4.webp │ ├── services │ │ ├── service-1.webp │ │ ├── service-2.webp │ │ ├── service-3.webp │ │ ├── service-4.webp │ │ └── service-5.webp │ ├── box.svg │ ├── columbia.webp │ ├── harvard.webp │ ├── hero-bg.jpg │ ├── journey.webp │ ├── mail.svg │ ├── map.svg │ ├── map.webp │ ├── md-journey.webp │ ├── md-map.png │ ├── md-map.webp │ ├── mob-map.webp │ └── phone.svg ├── background.mp4 ├── file.svg ├── globe.svg ├── next.svg ├── vercel.svg └── window.svg
├── src
│ ├── app
│ │ ├── fonts
│ │ │ ├── GeistMonoVF.woff
│ │ │ └── GeistVF.woff
│ │ ├── favicon.ico
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── components
│ │ ├── animation
│ │ │ ├── box-reveal.tsx
│ │ │ ├── fade-text.tsx
│ │ │ └── in-view.tsx
│ │ ├── footer
│ │ │ └── footer.tsx
│ │ ├── header
│ │ │ ├── client-component.tsx
│ │ │ ├── header-variants.tsx
│ │ │ ├── header.tsx
│ │ │ ├── link.tsx
│ │ │ └── mobile-header.tsx
│ │ ├── logo
│ │ │ └── logo.tsx
│ │ └── ui
│ │     ├── button.tsx
│ │     ├── logo.tsx
│ │     ├── marquee.tsx
│ │     ├── new-sticky-scroll.tsx
│ │     ├── sticky-scroll-reveal.tsx
│ │     └── typography.tsx
│ ├── features
│ │ └── booking-modal
│ │     ├── api
│ │     │ ├── index.ts
│ │     │ └── types.ts
│ │     ├── modal
│ │     │ └── modal.tsx
│ │     ├── steps
│ │     │ ├── call.tsx
│ │     │ ├── confirm-visit.tsx
│ │     │ ├── select-date-time.tsx
│ │     │ ├── select.tsx
│ │     │ ├── success.tsx
│ │     │ ├── user-information.tsx
│ │     │ └── verify-code.tsx
│ │     ├── ui
│ │     │ ├── multi-select
│ │     │ │ ├── index.ts
│ │     │ │ ├── multi-select-categories.tsx
│ │     │ │ ├── multi-select-services.tsx
│ │     │ │ └── types.ts
│ │     │ ├── button.tsx
│ │     │ ├── checkbox.tsx
│ │     │ ─ dialog.tsx
│ │     │ ├── input.tsx
│ │     │ ├── label.tsx
│ │     │ ├── scroll-area.tsx
│ │     │ └── select.tsx
│ │     ├── utils
│ │     │ └── cn.ts
│ │     ├── booking-modal.tsx
│ │     ├── config.ts
│ │     ├── documents.ts
│ │     ├── style.module.css
│ │     ├── tailwind.config.ts
│ │     └── types.ts
│ ├── hooks
│ │ └── useActiveSection.tsx
│ ├── sections
│ │ ├── about
│ │ │ └── about.tsx
│ │ ├── as-seen-on
│ │ │ └── as-seen-on.tsx
│ │ ├── choose-us
│ │ │ ├── advantage-card.tsx
│ │ │ ├── choose-us.tsx
│ │ │ └── slider.tsx
│ │ ├── contact
│ │ │ └── contact.tsx
│ │ ├── featured-services
│ │ │ └── featured-services.tsx
│ │ ├── hero
│ │ │ └── hero.tsx
│ │ ├── journey
│ │ │ └── journey.tsx
│ │ ├── partners
│ │ │ └── partners.tsx
│ │ └── index.ts
│ ├── types
│ │ └── tailwind-custom-utilities.d.ts
│ └── utils
│     ├── cn.tsx
│     └── screen-size.tsx
├── README.md
├── components.json
├── index.js
├── next-env.d.ts
├── next-sitemap.config.js
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tailwind.config.ts
├── tailwindcss.d.ts
└── tsconfig.json
```

### Key Directories:
- **public/** – Stores static files like images, icons, and videos.
- **src/app/** – Entry point for Next.js (layout.tsx, page.tsx, global styles).
- **src/components/** – Organized UI components.
- **src/features/** – Booking modal logic, APIs, and utilities.
- **src/hooks/** – Custom React hooks.
- **src/sections/** – Landing page sections.
- **src/types/** – TypeScript type definitions.
- **src/utils/** – Utility functions.


### Install dependencies:
Using **pnpm**:
```bash
pnpm install
```
If **pnpm** is not installed:
```bash
npm install -g pnpm
pnpm install
```

### Configure environment variables:
Create a `.env` file in the root directory and add necessary variables:
```ini
NEXT_PUBLIC_WEB100NOW_API='https://dev.web100now.com/clients-web100now'
NEXT_PUBLIC_X_API_KEY='ХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХХ'
# Additional variables
```
Ensure **Node.js (15.x or later)** and **pnpm** are installed.

## Running & Building
### Development mode:
```bash
pnpm dev
```
The site will be available at `http://localhost:3000`.

### Build for production:
```bash
pnpm build
```
This generates an optimized Next.js build.

### Start production server:
```bash
pnpm start
```
Runs the built application on the specified port (default: 3000).


## Customization & Extensions
### Adding New Sections:
Create a new folder in `src/sections/` for each entity (e.g., `partners/`, `testimonials/`). Organize related components inside for modularity.

### Modifying Styles:
Customize **tailwind.config.ts** for themes, colors, fonts, and additional utilities.
Use **CSS Modules** or global styles when necessary.

### API Integration:
The `features/booking-modal/api` directory handles API interactions (e.g., booking confirmations). Implement security measures such as **JWT, cookies, OAuth** if needed.

### SEO & Sitemap:
Modify `next-sitemap.config.js` to generate a proper `sitemap.xml` and `robots.txt`.



```
© 2025, All rights reserved by Hero Men’s Health.
This code may not be redistributed without explicit permission from the owners.