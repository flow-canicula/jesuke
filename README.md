# Jesuke Website

Marketing and portfolio site for **Jesuke** — an anime, manga, and manhwa-inspired tattoo artist based in Bulacan, Philippines.

Tagline: **"Lines borrowed from the page, set in ink."**

Static export built with Next.js 15 (App Router), TypeScript, and Tailwind CSS v4.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router), `output: 'export'` |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 — CSS-first `@theme` tokens |
| Form backend | Formspree (two endpoints — commission + professional) |
| Fonts | Anton (display) · Inter Variable (body) · JetBrains Mono (utility) |
| Package manager | pnpm |

## Getting started

```bash
node --version   # 22+
pnpm install
pnpm dev         # http://localhost:3000
```

Copy `.env.example` to `.env.local` and fill in the Formspree IDs before running the dev server.

## Build

```bash
pnpm build           # static export → out/
pnpm exec serve out  # preview the static export locally
```

## Pages

| Route | Description |
|---|---|
| `/` | Artist page — hero, manifesto, flash gallery, name banner, process, FAQ, CTA |
| `/work/` | Full flash catalogue |
| `/booking/` | Commission inquiry form (Form A) |
| `/professional/` | Professional / trade inquiry form (Form B) |
| `/booking/thanks/` | Commission success (`noindex`) |
| `/professional/thanks/` | Professional success (`noindex`) |
| `/privacy/` | Privacy policy (`noindex`) |
| Custom 404 | `src/app/not-found.tsx` |

## Project structure

```
/
├── public/
│   ├── fonts/               # Self-hosted woff2/ttf files
│   ├── og/                  # Open Graph images (1200×630)
│   ├── work/                # Tattoo photography, organised by series
│   ├── favicon.ico
│   ├── logo.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── llms.txt             # AI / answer-engine summary
├── src/
│   ├── app/                 # Routes (App Router, no locale segment)
│   ├── components/
│   │   ├── forms/           # CommissionForm, ProfessionalForm, Honeypot
│   │   ├── gallery/         # GalleryGrid, Lightbox
│   │   ├── layout/          # Header, Footer, Nav, Seal
│   │   ├── sections/        # Hero, Manifesto, FlashIndex, NameBanner, Process, Faq, CtaDoors
│   │   └── seo/             # JsonLd, Breadcrumbs
│   ├── content/
│   │   ├── faq.ts           # FAQ entries (feeds FAQPage JSON-LD)
│   │   ├── site.ts          # SITE_URL, handles, nav, OG defaults
│   │   └── work.ts          # Flash catalogue data (typed, IP-clean)
│   ├── lib/
│   │   ├── formspree.ts     # Submit helper
│   │   ├── imageLoader.ts   # basePath utility for GitHub Pages
│   │   ├── jsonld.ts        # Schema builders
│   │   ├── messages.ts      # UI copy
│   │   └── seo.ts           # buildMetadata() helper
│   └── app/globals.css      # Tailwind + @theme tokens + base layer
├── CLAUDE.md                # AI assistant guide and conventions
├── Story.md                 # Brand, voice, and design rationale
└── Security.md              # Threat model and pre-launch checklist
```

## Environment variables

```bash
# .env.local — never committed
NEXT_PUBLIC_SITE_URL=https://www.jesuke.ink
NEXT_PUBLIC_FORMSPREE_COMMISSION_ID=xxxxxxxx
NEXT_PUBLIC_FORMSPREE_TRADE_ID=xxxxxxxx
```

See `.env.example` for the full list. All vars are `NEXT_PUBLIC_` — there is no server runtime.

## Deployment

The site deploys automatically to GitHub Pages on push to `main` via `.github/workflows/deploy-pages.yml`. The workflow sets `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_BASE_PATH=/jesuke` so all asset paths resolve correctly under the `/jesuke` sub-path.
