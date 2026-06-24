# CLAUDE.md

Operational guide for any AI assistant or developer working in this repository.
Read this file **before** writing code. It defines what the project is, the
constraints that cannot be broken, and the conventions that keep the codebase
coherent. For the *why* behind the brand, voice, and visual system, read
[`Story.md`](./Story.md). For the threat model and pre-launch checklist, read
[`Security.md`](./Security.md).

---

## 1. What this is

A single-artist marketing and portfolio website for **Jesuke** — an
anime/manga-inspired tattoo artist presented as a deliberately *hidden artist*:
the brand has a public handle and a body of work, but no real name, no face, and
no fixed location are exposed. The **Artist page** (`/`) is the centre of the
site; everything else supports it.

The site does two jobs:

1. Make the work legible and desirable (a curated gallery / flash catalogue).
2. Route two distinct audiences into two distinct intake forms (see §7).

It is a **static marketing site** — no server runtime, no database, no auth, no
sessions, no user accounts. If a task seems to require any of those, stop and
re-read this section; the answer is almost certainly "do it client-side or don't
do it."

### The two non-negotiable brand constraints

These come from the brief and are enforced everywhere — copy, alt text,
metadata, structured data, filenames, commit messages:

- **`HIDDEN-IDENTITY`** — Never expose the artist's legal name, face, home
  studio address, or any personal identifier. The brand entity is "Jesuke." The
  *person* behind it stays private. This is both a brand choice and a privacy
  control (see `Security.md` §A11).
- **`NO-FRANCHISE-NAMES`** — The work is *inspired by* anime and manga, but the
  site never names a specific franchise, studio, title, or character, and never
  ships official/licensed key art as a site asset. We show **Jesuke's own
  photographed tattoo work**, described in original, generic terms ("a
  wind-swept swordsman," not a named character). This keeps the marketing
  surface clean of third-party IP. See `Security.md` §IP.

If a request conflicts with either constraint, surface the conflict — don't
silently comply.

---

## 2. Tech stack (pinned intentions)

| Concern            | Choice                                   | Notes |
|--------------------|------------------------------------------|-------|
| Framework          | **Next.js 15**, App Router               | `app/` directory only. No `pages/`. |
| Output             | **Static export** — `output: 'export'`   | The build emits `out/`. No Node server in prod. |
| Language           | **TypeScript, `strict: true`**           | Also `noUncheckedIndexedAccess`. No `any` without a written reason. |
| Styling            | **Tailwind CSS v4** (CSS-first `@theme`) | Design tokens live in CSS, not a JS config. See §6. |
| Forms              | **Formspree** (client `fetch`)           | Two endpoints. See §7. |
| Fonts              | **Self-hosted** via `next/font/local`    | No runtime calls to Google Fonts (CSP + privacy). |
| i18n               | **None.** English only.                  | No `next-intl`, no `[locale]` segment. |
| Analytics          | Optional, privacy-first (Plausible)      | Off by default; if added, update CSP. |
| Package manager    | **pnpm**                                 | `npm`/`yarn` work but lockfile is `pnpm-lock.yaml`. |
| Node               | **20 LTS or 22**                         | Match `.nvmrc`. |

> This project deliberately diverges from the i18n'd reference architecture in
> `Security.md`'s lineage: **there is no `[locale]` route segment here.** Routes
> are flat. Don't reintroduce locale folders.

---

## 3. Commands

```bash
pnpm install            # install deps (commit pnpm-lock.yaml)
pnpm dev                # local dev server (http://localhost:3000)
pnpm build              # next build → produces static export in out/
pnpm start              # NOT used in prod (no server). Local preview only.
pnpm lint               # eslint (next/core-web-vitals + strict TS rules)
pnpm typecheck          # tsc --noEmit
pnpm format             # prettier --write
pnpm exec serve out     # preview the real static output locally
```

A change is not "done" until `pnpm lint && pnpm typecheck && pnpm build` all
pass clean. See §13.

---

## 4. Static-export rules (the sharp edges)

`output: 'export'` removes the server. The following **do not exist** at runtime
and must not be used:

- ❌ Route Handlers (`app/**/route.ts`) that need to run on a request
- ❌ Server Actions / `'use server'`
- ❌ `next/headers`, `cookies()`, `headers()`, `draftMode()`
- ❌ Middleware that depends on a running server (`middleware.ts` is ignored on export)
- ❌ `dynamic = 'force-dynamic'`, ISR, on-demand revalidation
- ❌ `next/image` default optimization

Required configuration in `next.config.ts`:

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,          // emits /work/index.html — friendliest for Apache/static hosts
  images: { unoptimized: true },// next/image needs this on static export
  reactStrictMode: true,
};

export default nextConfig;
```

Patterns that are fine:

- ✅ Fully static pages with the Metadata API
- ✅ Client components (`'use client'`) for the forms, gallery lightbox, menu
- ✅ Client-side `fetch()` to Formspree
- ✅ `generateStaticParams()` if/when a CMS or local data drives `[slug]` routes
- ✅ Build-time data: import local JSON/TS, read the filesystem in a Server
  Component during build

Images: since optimization is off, **pre-process assets at author time** (export
web-optimized `.avif`/`.webp` at the sizes actually used; provide `width`/
`height` to avoid CLS). Don't rely on Next to resize.

---

## 5. Repository structure

```
.
├── CLAUDE.md                 ← you are here
├── Story.md                  ← brand, voice, content, design rationale
├── Security.md               ← threat model, OWASP map, pre-launch checklist
├── next.config.ts
├── tailwind.config.ts        ← minimal; tokens live in globals.css @theme
├── public/
│   ├── .htaccess             ← HTTPS redirect, security headers, -Indexes (see Security.md)
│   ├── robots.txt
│   ├── sitemap.xml           ← generated at build (postbuild script)
│   ├── llms.txt              ← AI/answer-engine summary (see §9)
│   ├── og/                   ← Open Graph images (1200×630)
│   └── work/                 ← optimized tattoo photography (author-prepared)
├── src/
│   ├── app/
│   │   ├── layout.tsx        ← <html>, fonts, default metadata, JSON-LD <Person>/<WebSite>
│   │   ├── page.tsx          ← THE ARTIST PAGE (/)
│   │   ├── work/page.tsx     ← full flash catalogue / portfolio
│   │   ├── booking/page.tsx  ← commission inquiry (Form A)
│   │   ├── professional/page.tsx ← trade / professional inquiry (Form B)
│   │   ├── booking/thanks/page.tsx
│   │   ├── professional/thanks/page.tsx
│   │   ├── not-found.tsx     ← designed 404
│   │   ├── sitemap.ts        ← or static public/sitemap.xml; pick ONE, see §9
│   │   └── robots.ts         ← or static public/robots.txt; pick ONE
│   ├── components/
│   │   ├── layout/           ← Header, Footer, Nav, Seal (hanko signature)
│   │   ├── sections/         ← Hero, Manifesto, FlashIndex, Process, FAQ, CTA
│   │   ├── gallery/          ← Gallery grid + Lightbox (client)
│   │   ├── forms/            ← CommissionForm, ProfessionalForm, fields, Honeypot
│   │   └── seo/              ← JsonLd (typed), Breadcrumbs
│   ├── content/
│   │   ├── work.ts           ← flash & portfolio data (typed, IP-clean copy)
│   │   ├── faq.ts            ← FAQ entries (also feeds FAQPage JSON-LD)
│   │   └── site.ts           ← SITE_URL, handles, contact, nav, OG defaults
│   ├── lib/
│   │   ├── formspree.ts      ← submit helper, status types
│   │   ├── jsonld.ts         ← schema builders (typed)
│   │   └── seo.ts            ← buildMetadata() helper
│   └── styles/
│       └── globals.css       ← Tailwind + @theme tokens + base layer
└── ...
```

If you add a route, add it to: the nav (where appropriate), `sitemap`, and the
breadcrumb structured data.

---

## 6. Design system (tokens & rules)

Full rationale is in `Story.md` §Design. This section is the **enforcement
contract**. Derive every color, size, and font from these tokens — no ad-hoc hex
values in components.

The visual language is **"design on paper → ink on skin."** Two registers, one
discipline. Avoid the generic "near-black page + one bright accent everywhere"
look: here the **red is a seal, not a theme color** — it appears as the artist's
hanko/chop and almost nowhere else.

### Color tokens (define in `globals.css` `@theme`)

```css
@theme {
  /* Ink register (gallery, hero) */
  --color-ink-900: #0b0b0d;   /* near-black, warm undertone — base canvas */
  --color-ink-800: #141417;
  --color-ink-700: #1d1d22;
  --color-ink-100: #b9b7b0;   /* muted ink text on dark */

  /* Paper register (story, about, forms) */
  --color-paper-50: #efece3;  /* warm rice-paper — light sections */
  --color-paper-100: #e4e0d4;
  --color-paper-700: #3a3a33;  /* body text on paper */

  /* Seal — used ONLY for the hanko mark / one-time signature accent */
  --color-seal: #b23a2e;       /* cinnabar, restrained, never a fill-everything red */

  /* Lines & tone */
  --color-line: rgba(255,255,255,0.10);  /* hairline contour on dark */
  --color-tone: rgba(255,255,255,0.06);  /* halftone/screentone dot field */
}
```

### Typography

Three roles, self-hosted (`next/font/local`), avoid the default "high-contrast
serif" cliché:

- **Display** — a *condensed grotesque* (poster/flash-sheet energy). Tight
  tracking, used large and sparingly. Suggested: *Anton*, *Archivo Expanded/
  Condensed*, or a licensed equivalent. Headlines only.
- **Body** — a clean neo-grotesque (*Inter*, *Suisse*-like). All running text.
- **Mono/utility** — a mono (*JetBrains Mono*, *IBM Plex Mono*) for catalogue
  data: flash numbers, size, placement, session count, eyebrows. This is the
  "atelier catalogue" voice.

Type scale (rem): `0.75 / 0.875 / 1 / 1.25 / 1.5 / 2 / 3 / 4.5 / 6.5`.
Eyebrows/labels: mono, uppercase, letter-spaced (`tracking-[0.2em]`) — a nod to
the Chromy reference's spaced labels. Use sentence case for everything readable.

### Signature element

The **hanko seal** (`components/layout/Seal`): a single red chop mark that signs
the page once (footer and/or the hero's corner). It is the one bold gesture; keep
everything else quiet. Do not multiply it.

### Texture

A subtle **halftone/screentone** dot field (`--color-tone`) for section breaks
and the ink→paper transition — manga's native material, rendered as CSS
(radial-gradient dot pattern or a tiny tiled SVG), never as a heavy image.

### Motion

- Scroll-reveal: short fade + 8–16px rise. One "ink bleed" reveal on the hero is
  enough; don't scatter effects.
- **Always** honor `prefers-reduced-motion: reduce` — disable transforms,
  keep opacity-only or no motion.
- No autoplaying audio/video with sound. Ever.

### Layout

Editorial, gallery-first, generous margins, asymmetric grid. Numbered indexing
(`001 / 002 …`) is **allowed here because flash sheets genuinely are numbered** —
it encodes real order, not decoration. Don't add numbering to things that aren't
sequences.

### Quality floor (every screen)

Responsive to 360px, visible keyboard focus rings, AA contrast minimum
(re-check seal-on-dark and ink-100-on-ink-900), reduced motion respected,
semantic landmarks (`header/main/footer/nav`), one `<h1>` per page.

---

## 7. Forms (two Formspree endpoints)

Two audiences, two intakes. **Keep them separate** — different endpoints,
different fields, different success pages. (These map the brief's two intake
types onto the tattoo business: "residential design inquiries" → personal
commissions; "trade/professional-services inquiries" → studio/industry.)

| Form | File | Endpoint env var | For |
|------|------|------------------|-----|
| **A — Commission** | `forms/CommissionForm.tsx` | `NEXT_PUBLIC_FORMSPREE_COMMISSION_ID` | An individual booking a custom anime/manga-inspired piece. |
| **B — Professional / Trade** | `forms/ProfessionalForm.tsx` | `NEXT_PUBLIC_FORMSPREE_TRADE_ID` | Studios, guest spots, conventions, collaborations, flash licensing, press. |

Rules:

- The Formspree form ID is **public by design** (a routing identifier, not a
  secret). `NEXT_PUBLIC_` env vars are fine and expected. Do not treat them as
  credentials. See `Security.md` §A02.
- Submit with client `fetch()` to `https://formspree.io/f/<id>`, `Accept:
  application/json`. On success, route to the form's `/thanks` page; on failure,
  show an in-form error in the brand voice (see writing rules in `Story.md`).
- Every field needs: correct `type`, `name`, `maxLength`, label association
  (`htmlFor`/`id`), and `autoComplete` where sensible.
- Include a **honeypot** field (`_gotcha`, visually hidden, `tabIndex={-1}`,
  `aria-hidden`) and enable Formspree spam filtering server-side.
- **No file uploads in the static form by default.** If reference images are
  needed, ask submitters to paste links (or enable Formspree's own upload on a
  paid plan) — do not build a custom uploader. Reference images of bodies are
  sensitive; see `Security.md` §Privacy.
- Never use a real HTML `<form>` that posts cross-document if it can be a
  controlled client submit; never put PII in URL query strings.

Suggested fields:

- **A (Commission):** name, contact (email + optional messaging handle),
  idea/description, *mood* (not franchise — enforce `NO-FRANCHISE-NAMES` in
  helper text), approximate size, body placement, budget range, availability,
  reference links (optional), consent checkbox.
- **B (Professional):** name, organization, role, inquiry type (guest spot /
  convention / collaboration / licensing / press / other), dates/location,
  message, links.

---

## 8. SEO conventions

- Use the **Metadata API** (`export const metadata` / `generateMetadata`) on
  every route. Centralize defaults in `lib/seo.ts → buildMetadata()`.
- Each page sets a unique `title`, `description`, canonical (`alternates.
  canonical`), and Open Graph + Twitter card. Default OG image lives in
  `public/og/` at **1200×630**; per-page OG where it adds value (the Artist page
  gets its own).
- `metadataBase` = `SITE_URL` from `content/site.ts`.
- One `<h1>` per page; logical heading order; descriptive, IP-clean `alt` text on
  every image (alt text obeys `NO-FRANCHISE-NAMES` too).
- **Structured data** (JSON-LD via `components/seo/JsonLd`, builders in
  `lib/jsonld.ts`, all hardcoded/typed — never from user input):
  - `Person` (the pseudonymous artist) with `name: "Jesuke"`, `jobTitle`,
    `knowsAbout`, and `sameAs: [instagram, facebook]` — **no legal name**.
  - `WebSite` with `url` + `name`.
  - `Service` / `OfferCatalog` for the commission offering (no prices unless
    real).
  - `FAQPage` fed from `content/faq.ts` (single source of truth — same data
    renders the on-page FAQ).
  - `BreadcrumbList` on inner pages.
  - `ImageObject` for hero/gallery key images where useful.
- `sitemap` + `robots`: pick **one** mechanism — either the static files in
  `public/` **or** the `app/sitemap.ts` + `app/robots.ts` route conventions
  (both work with export). Don't ship both; they'll fight. Keep `/thanks` pages
  `noindex`.

---

## 9. AI / answer-engine optimization (AEO)

The brief asks for "AI optimized." Concretely:

- **`public/llms.txt`** — a concise, plain-language brief that AI crawlers and
  answer engines can ingest: who Jesuke is (the brand, not the person), what the
  work is, the two ways to get in touch, and the canonical links. Keep it factual
  and aligned with `HIDDEN-IDENTITY` + `NO-FRANCHISE-NAMES`.
- **Entity clarity** — consistent naming ("Jesuke") across `<title>`, JSON-LD
  `Person.name`, OG, and `llms.txt`, so engines resolve a single entity.
- **Extractable answers** — write the FAQ and process sections as
  self-contained Q&A and short declarative paragraphs (good for featured
  snippets and LLM summarization). Lead with the answer, then elaborate.
- **`sameAs`** points to the public social handles only; that's the identity
  graph we *want* indexed.
- Provide an **"How to describe Jesuke" line** in `llms.txt` so assistants
  describe the brand the way we intend (anime/manga-inspired custom tattoo
  artist; private identity; books via two intake forms) without inventing a real
  name or naming franchises.

`llms.txt` is informational, not access control. It does not protect anything; it
shapes how compliant readers summarize the brand. Do not put anything private in
it.

---

## 10. Accessibility

Treat as a release gate, not a nice-to-have:

- Semantic landmarks; skip-to-content link; one `<h1>`/page.
- All interactive elements keyboard-operable with a visible focus style.
- Gallery lightbox: focus trap, `Esc` to close, restore focus on close,
  `alt` on every image.
- Forms: programmatic labels, `aria-describedby` for errors, `aria-live` region
  for submit status, errors that name the problem and the fix.
- Color is never the only signal. Re-verify contrast for seal-on-ink and any
  muted text.
- `prefers-reduced-motion` respected globally.

---

## 11. Content & copy rules

Voice lives in `Story.md`; the hard rules:

- Enforce `NO-FRANCHISE-NAMES` and `HIDDEN-IDENTITY` in **all** copy, alt text,
  metadata, and JSON-LD.
- Sentence case. Plain verbs. Active voice. A button says what it does
  ("Send commission inquiry," not "Submit"); the success message matches.
- Errors don't apologize and aren't vague; they say what happened and what to do.
- No invented testimonials, awards, prices, or stats. If real ones exist, source
  them; otherwise omit.

---

## 12. Environment variables

```
# .env.local (never committed) and the host's build env
NEXT_PUBLIC_SITE_URL=https://www.jesuke.ink        # placeholder until domain is set
NEXT_PUBLIC_FORMSPREE_COMMISSION_ID=xxxxxxxx
NEXT_PUBLIC_FORMSPREE_TRADE_ID=xxxxxxxx
# NEXT_PUBLIC_PLAUSIBLE_DOMAIN=jesuke.ink           # only if analytics enabled
```

Only `NEXT_PUBLIC_*` vars exist (everything ships to the browser on a static
export). **Never** add a secret here expecting it to stay private — there is no
server to keep it on. Commit a `.env.example` with empty values.

---

## 13. Definition of done (PR checklist)

- [ ] `pnpm lint && pnpm typecheck && pnpm build` pass clean; `out/` inspected via `serve out`.
- [ ] No `any` introduced without a written justification comment.
- [ ] New/changed pages set unique metadata + canonical + OG.
- [ ] New routes added to nav (if user-facing), sitemap, and breadcrumbs.
- [ ] Copy, alt text, and metadata obey `NO-FRANCHISE-NAMES` and `HIDDEN-IDENTITY`.
- [ ] Forms: honeypot present, labels associated, success/error states in voice, no PII in URLs.
- [ ] Images pre-optimized with explicit width/height; no franchise key art.
- [ ] A11y pass: keyboard, focus, contrast, reduced motion, one `<h1>`.
- [ ] No server-only API used (see §4).
- [ ] `Security.md` checklist consulted for anything touching forms, headers, or third-party embeds.
- [ ] No private identity leaked in metadata, EXIF, filenames, or commit author info (see `Security.md` §A11).

---

## 14. When unsure

- A request that needs a server → re-read §4; find the static path or flag it.
- A request that names a franchise or could expose the artist → flag the
  `NO-FRANCHISE-NAMES` / `HIDDEN-IDENTITY` conflict before acting.
- A design choice not covered by tokens → propose a token, don't hardcode.
- A security-relevant change (headers, CSP, embeds, forms) → `Security.md` wins;
  update it in the same PR.
