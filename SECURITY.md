# Security Policy — Jesuke

The Jesuke site is a statically-exported Next.js 15 marketing/portfolio website
(no server runtime, no database, no user authentication, no sessions). Most of
the OWASP Top 10 either doesn't apply or is handled by the architecture itself.
Each category is covered below with an explicit "why," so it doesn't need
re-litigating.

This site has two concerns beyond a typical brochure site, both reflected here:

- **Two contact forms** (personal commissions and professional/trade), each a
  separate Formspree endpoint.
- **A hidden-artist brand** — the artist's real identity must not leak through
  the site, its assets, or its repository. That is treated as a first-class
  security/privacy property in **§A11** (a project-specific addition) and the
  **IP & Image Rights** section.

## Reporting a vulnerability

Email the address listed in `content/site.ts` (`contact.security`). Do not open a
public issue for security concerns. If reporting something that could expose the
artist's identity (an EXIF leak, a deanonymizing asset, a commit-author leak),
mark it **IDENTITY** in the subject so it's triaged first.

## OWASP Top 10 (2021) coverage

### A01 — Broken Access Control

Not applicable. Every page is public static HTML. There is no authentication, no
authorization, no user-specific content, and no admin interface — nothing to
bypass.

The only "write" paths are the two contact forms, which submit directly to
Formspree (a third party). This application never receives, stores, or serves
submitted form data.

### A02 — Cryptographic Failures

No secrets, passwords, or sensitive personal data are stored or processed by this
application. Transport security (HTTPS) is enforced by:

- the host's Let's Encrypt (or equivalent) SSL certificate, and
- the `.htaccess` `RewriteRule` redirecting all HTTP traffic to HTTPS.

The two Formspree form IDs (`formspree.io/f/XXXXXXXX`) are visible in the
client-side JavaScript via `NEXT_PUBLIC_FORMSPREE_COMMISSION_ID` and
`NEXT_PUBLIC_FORMSPREE_TRADE_ID`. **This is expected and harmless** — a form ID
is a routing identifier, not a secret. It grants no access to anything.

Because this is a static export, **there is no server to hold a secret on.**
Anything in a `NEXT_PUBLIC_*` variable ships to the browser. Never put a real
credential, private API key, or token in this repository or its environment and
expect it to stay private.

### A03 — Injection

No server-side code exists. No database. No template engine evaluating user
input. Injection has no vector.

- `CommissionForm.tsx` and `ProfessionalForm.tsx` submit `FormData` directly to
  Formspree via `fetch()`. This application never interpolates user input into
  HTML, SQL, or shell commands.
- Any component using `dangerouslySetInnerHTML` (only the JSON-LD injector,
  `components/seo/JsonLd`) must receive **only hardcoded, developer-controlled
  objects** built in `lib/jsonld.ts`. User input is never passed to it. This must
  not change without a security review.

### A04 — Insecure Design

Mitigations in place:

**No locale surface.** Unlike the i18n'd projects this policy descends from,
there is no `[locale]` route segment and no locale parsing — one fewer
untrusted-string surface. Routes are a fixed, developer-defined set.

**Form input constraints.** All fields in both forms have `maxLength` attributes,
correct `type` values (`email`, `tel`, `text`, `textarea`), associated labels,
and a hidden **honeypot** field (`_gotcha`). Formspree applies server-side spam
filtering independently; enable it (and optionally reCAPTCHA) in each form's
dashboard.

**No custom file upload.** The static forms do not accept file uploads by
default. Reference images are requested as pasted links, or handled by
Formspree's own upload feature on a paid plan — we never build a custom uploader
that accepts arbitrary binaries from anonymous visitors. (Body-reference images
are sensitive; see **Privacy**.)

**Content Security Policy.** Split across two delivery mechanisms, because the
CSP spec itself limits what a `<meta>` tag can enforce (`frame-ancestors`,
`report-uri`, and `sandbox` silently no-op in `<meta>`); every other directive
works in `<meta>`.

1. Most directives — `<meta http-equiv="Content-Security-Policy">` in
   `src/app/layout.tsx`. Because fonts are **self-hosted** (`next/font/local`)
   and there are no Google Fonts calls, the policy is tight:
   ```
   default-src 'none';
   script-src 'self';
   style-src 'self' 'unsafe-inline';
   font-src 'self';
   connect-src 'self' https://formspree.io;
   img-src 'self' data:;
   base-uri 'self';
   form-action https://formspree.io;
   frame-src 'none';
   ```
   - If you embed an Instagram/Facebook feed, you must widen `script-src`,
     `frame-src`, `img-src`, and `connect-src` for their domains — which also
     loads their trackers. **Prefer linking out** to the profiles over embedding;
     it keeps the CSP tight and avoids third-party cookies. If a feed is truly
     required, document the exact added origins here in the same PR.
   - If privacy-respecting analytics (Plausible) is added, extend `script-src`
     and `connect-src` to its endpoint only, and disclose it in the privacy copy.
2. `frame-ancestors` plus `X-Frame-Options` — real HTTP headers in
   `public/.htaccess` via `mod_headers`:
   ```
   Header always set X-Frame-Options "DENY"
   Header always set Content-Security-Policy "frame-ancestors 'none'"
   Header always set Referrer-Policy "strict-origin-when-cross-origin"
   Header always set X-Content-Type-Options "nosniff"
   Header always set Permissions-Policy "geolocation=(), camera=(), microphone=()"
   ```
   Browsers enforce the intersection of all applicable CSPs, so the `<meta>`
   policy and the header-based one combine rather than conflict.

**Note on `'unsafe-inline'` for styles.** Required because Tailwind injects
critical styles inline in the static export. Scoped to `style-src` only; scripts
remain `'self'`.

### A05 — Security Misconfiguration

- `next.config.ts` uses `output: 'export'` — there is no Next.js server process
  in production to misconfigure.
- `public/.htaccess` sets `Options -Indexes` to disable directory listing.
  Without it, Apache would serve a browsable file listing for any directory
  lacking an `index.html` — which on this site could expose the raw contents of
  `/work/` and `/og/`.
- `trailingSlash: true` means routes emit `index.html` files; confirm the host
  serves them and that `ErrorDocument` points at the exported `404.html`.
- No debug endpoints, server logs, or verbose error pages exist in the static
  output.
- Run `pnpm audit` (or `npm audit`) before every deployment; resolve high and
  critical findings before going live.

### A06 — Vulnerable and Outdated Components

- Run `pnpm audit --audit-level=high` before every deployment.
- Consider GitHub Dependabot (`.github/dependabot.yml`) for weekly dependency
  PRs.
- Keep Next.js, React, and Tailwind on current stable majors. Commit the
  lockfile (`pnpm-lock.yaml`) so CI builds exactly what was reviewed.

### A07 — Identification and Authentication Failures

No login, no sessions, no credentials anywhere in this application. There is
nothing to authenticate.

If a client area, booking-status tracker, or admin is ever added, do not build
auth from scratch — use an established provider (Auth0, Clerk, Supabase Auth) and
return here to write a real A07 answer **before** shipping it. Note that adding
any authenticated, identity-bearing feature also reopens **§A11** (it could tie
activity back to the artist).

### A08 — Software and Data Integrity Failures

- Commit `pnpm-lock.yaml` to pin exact versions and integrity hashes.
- If GitHub Actions deploys the site, pin actions to a SHA or major tag from
  official publishers (`actions/checkout@v4`, …).
- Deploy workflows trigger only on pushes to `main` by trusted contributors,
  never on pull requests from forks.
- `components/seo/JsonLd` is the one `dangerouslySetInnerHTML` site. The object
  passed to it must always be hardcoded in `lib/jsonld.ts` — never derived from
  props, URL parameters, or any external source. (It also must never embed the
  artist's real identity — see §A11.)

### A09 — Security Logging and Monitoring Failures

No backend exists to generate logs. Form submissions appear in the Formspree
dashboard — Formspree handles logging, spam detection, and abuse alerts on their
side. The host provides basic access logs via its panel, useful for diagnosing
crawl errors or unusual traffic.

If analytics is added, use a privacy-respecting, cookieless tool (Plausible),
disclose it in the privacy copy, and update the CSP `connect-src` accordingly.

### A10 — Server-Side Request Forgery (SSRF)

Not applicable. There is no server making outbound requests. The only outbound
calls this application initiates are `fetch()`es from the visitor's browser to
the two hardcoded Formspree endpoints in the form components. No URL is ever
fetched based on visitor-supplied input.

If a server function is ever added that fetches a URL derived from user input
(for example, server-side preview of a submitted reference link), it must use a
strict allow-list before shipping.

---

## A11 — Identity & Anonymity Leakage *(project-specific; not an OWASP category)*

Jesuke is a **hidden artist**: the brand is public, the person is not (see
`Story.md` §1, `CLAUDE.md` `HIDDEN-IDENTITY`). Deanonymization is a real risk
here, and most of the leaks are silent. Treat the following as security
controls, not branding preferences.

**Image metadata (EXIF).** Phone and camera photos embed GPS coordinates, device
IDs, and timestamps. Before any image enters `public/`, **strip all metadata**
(e.g. `exiftool -all= image.jpg`, or an automated build step). A single
geotagged studio photo can pin the artist's location. Verify stripped output
before committing.

**Repository and commit metadata.** Git records author name and email on every
commit. Configure the repo with a **pseudonymous identity**
(`git config user.name` / `user.email`) that does not reveal the artist, and
audit existing history before the repo is ever made public. The same applies to
package author fields, code comments, and `TODO`s.

**Site metadata and structured data.** `Person` JSON-LD uses `name: "Jesuke"`
and `sameAs` handles **only** — never a legal name, never a precise address. Do
not add `LocalBusiness`/`TattooParlor` schema with a real street address unless
the artist explicitly wants the location public. Open Graph, titles, `llms.txt`,
and alt text follow the same rule.

**Hosting and domain footprint.** Use WHOIS privacy/redaction on the domain
registration. Be aware that the hosting account, billing details, and DNS can
deanonymize; keep registrant data private.

**Embedded third parties.** Social embeds, maps, and analytics can correlate the
artist or their visitors. Prefer outbound links over embeds (this also keeps the
CSP tight — see §A04). If a map is ever needed, do not center it on the real
studio.

**Asset filenames and content.** Filenames, document properties, and any
inadvertently photographed personal items (mail, IDs, reflections in glossy ink)
can leak identity. Review imagery for incidental detail before publishing.

Anything that could tie the site back to a real person is an **IDENTITY** issue
and is triaged first (see Reporting).

---

## Intellectual Property & Image Rights

The work is *inspired by* anime and manga but the site **never names a franchise,
title, studio, or character, and never ships official/licensed key art as a site
asset** (`CLAUDE.md` `NO-FRANCHISE-NAMES`). This is brand discipline and IP
hygiene at once.

- **Only original, Jesuke-made tattoo photography** appears on the site — photos
  of pieces Jesuke tattooed. No screenshots of shows, no scanned manga pages, no
  studios' promotional art, no other artists' designs.
- **Describe pieces generically** ("a wind-swept swordsman"), never by
  trademarked names — in visible copy *and* in `alt` text and metadata.
- **Photo consent.** Photographs of identifiable clients' bodies require the
  client's consent before publication. Keep a simple written model-release /
  consent record per published photo (a checkbox in the commission consult is
  fine). This protects the client's privacy and the artist's liability.
- **Fan-art tattooing exists in a legal grey area.** This document is not legal
  advice. The mitigations above (no franchise names, no licensed art as assets,
  original photography only, client consent) reduce — not eliminate — exposure.
  If the artist plans to *sell flash* or license designs commercially, get
  qualified IP-law advice first.

---

## Data Collected and Privacy

Two forms collect different data.

**Form A — Commission inquiry:**
- Name and contact (email; optional messaging handle)
- Description of the desired piece and mood
- Approximate size, body placement, budget range, availability
- Optional reference links (not uploaded files)
- Consent checkbox

**Form B — Professional / trade inquiry:**
- Name, organization, role
- Inquiry type (guest spot / convention / collaboration / licensing / press)
- Dates/location, message, links

Body placement and reference material are **sensitive personal data.** Handle
them with care:

- Data is transmitted directly from the visitor's browser to Formspree
  (TLS-encrypted), forwarded to the artist's contact inbox, and stored in the
  Formspree dashboard (subject to Formspree's privacy policy).
- It is never processed, stored, or logged by this application.
- It is never sold or shared with third parties.
- Reference images are requested as **links, not uploads** (see §A04); the site
  does not host visitor images.

A plain-language privacy summary is published at `/privacy/` with
`robots: { index: false, follow: true }`. Visitors may request access,
correction, or deletion by emailing the contact address. Published client photos
are removed on request.

## Notes on the 404 Page

The custom 404 (`src/app/not-found.tsx`) is a fully designed page in the ink
register — it carries no user input, no dynamic content, and no third-party
scripts. The `.htaccess` `ErrorDocument` routes unmatched paths to the exported
`404.html` in `out/`. Any animation is pure CSS and respects
`prefers-reduced-motion`.

---

## Pre-Launch Security Checklist

- [ ] Replace both Formspree IDs (`NEXT_PUBLIC_FORMSPREE_COMMISSION_ID`,
      `NEXT_PUBLIC_FORMSPREE_TRADE_ID`) with the real values.
- [ ] Enable Formspree spam filtering (and optionally reCAPTCHA) on **both** forms.
- [ ] Confirm the honeypot field renders and is hidden from sighted/keyboard users.
- [ ] Run `pnpm install`; commit `pnpm-lock.yaml`.
- [ ] Run `pnpm audit` — resolve all high and critical findings.
- [ ] Enable SSL on the production domain; confirm the HTTP→HTTPS `.htaccess`
      redirect is active.
- [ ] Confirm `Options -Indexes` works: visiting `/work/` directly returns 403,
      not a file listing.
- [ ] Confirm security headers are present in the live response
      (`X-Frame-Options`, CSP, `Referrer-Policy`, `X-Content-Type-Options`,
      `Permissions-Policy`).
- [ ] Review the CSP `<meta>` tag if any third-party script/embed was added in
      development; document any new origins here.
- [ ] **EXIF:** confirm every image in `public/` has metadata stripped (no GPS).
- [ ] **Identity:** confirm git author identity is pseudonymous and history is
      clean; WHOIS privacy enabled; no legal name/address in JSON-LD, OG, alt
      text, filenames, or `llms.txt`.
- [ ] **IP:** confirm all imagery is original Jesuke work — no franchise names,
      no licensed key art; client photo consent recorded.
- [ ] Confirm `/privacy/` carries `robots: { index: false, follow: true }`, and
      both `/thanks` pages are `noindex`.
- [ ] Confirm `JsonLd` receives only hardcoded objects — no user input, no real
      identity.
- [ ] If GitHub Actions deploys, confirm it triggers only on `main` pushes, not
      on fork PRs, with pinned action versions.
