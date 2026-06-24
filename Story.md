# Story.md

The brand, voice, and design rationale for the Jesuke artist site. `CLAUDE.md`
says *what to build* and *what not to break*; this file says *why it looks and
sounds the way it does*. When a design or copy decision isn't covered by a token
or a rule, this document is the tie-breaker.

---

## 1. The premise: a hidden artist

Jesuke is an anime/manga-inspired tattoo artist who works **behind a handle, not
a name**. There's no face on the site, no legal name, no studio address pinned on
a map. What there *is*: the work, a point of view, and two clear ways to reach
out.

This isn't a gimmick bolted onto a normal portfolio — it's the spine of the
brand. Anonymity does three things at once:

1. **Mystique.** The work speaks; the maker stays just out of frame. A reader
   leans in because there's a deliberate gap to lean into.
2. **Focus.** With no personality-brand to sell, every pixel points at the
   tattoos.
3. **Prudence.** A private identity is also a privacy posture (see
   `Security.md` §A11). The brand can be loud while the person stays quiet.

So the site is built around an entity called **Jesuke** — discoverable,
linkable, describable — that resolves cleanly for search engines and AI
assistants, while the human behind it never enters the index.

> Practical rule everywhere: the *brand* is public; the *person* is private.
> Reference: the public handles only — `@jesuke_anime` (Instagram) and the
> Jesuke page (Facebook). Never a name.

---

## 2. The work, described without naming anything

Jesuke's tattoos draw their energy from anime and manga — bold contour lines,
dramatic motion, the emotional register of a great panel. But the site **never
names a franchise, title, studio, or character.** Two reasons, one aligned
answer:

- It keeps the brand's mystique intact — these are *Jesuke's* pieces, not
  fan-merch for someone else's IP.
- It keeps the marketing surface free of third-party trademarks and key art (see
  `Security.md` §IP).

So we describe pieces in **original, evocative, generic language**:

- ✅ "A wind-torn swordsman mid-turn, ink trailing like smoke."
- ✅ "A quiet spirit-fox curled into the shoulder."
- ❌ "[Named character] from [named show]."

This is a copywriting discipline, not a limitation. It's often *more* compelling:
the reader supplies the recognition; we supply the craft.

---

## 3. Audience and the two doors

Two very different people arrive, and the site sends them through two different
doors (the two Formspree intakes — see `CLAUDE.md` §7):

- **Door A — the collector / client.** An individual who wants a custom piece. A
  fan of the art form who has an idea, a placement in mind, and a budget. They
  need to trust the hand, understand the process, and book without friction.
  → **Commission inquiry.**
- **Door B — the industry.** A studio offering a chair, a convention booker, a
  brand wanting a collaboration, a publication wanting to feature the work, a
  shop licensing flash. Different language, different stakes.
  → **Professional / trade inquiry.**

Keeping these separate respects both. A first-time client shouldn't wade through
licensing language; a convention booker shouldn't fill in "body placement."

---

## 4. Voice

**Confident, spare, a little nocturnal.** The voice of someone who lets the work
carry the weight and doesn't over-explain. Closer to a gallery wall text than a
sales page.

Principles:

- **Show restraint.** Short lines. Room to breathe. The art is loud; the words
  are quiet.
- **Concrete over hype.** "Single-session blackwork up to a forearm" beats "amazing
  custom designs."
- **Sentence case, active voice.** A control says what it does. The button reads
  "Send commission inquiry"; the confirmation reads "Inquiry sent."
- **Direct in failure.** An error explains what happened and what to do next, in
  the brand's voice — never a vague apology.
- **Never invent.** No fake testimonials, awards, counts, or prices. Real or
  omitted.

Micro-copy examples (use as a tuning fork, not verbatim):

- Hero: *"Anime, under the skin."* / *"Lines borrowed from the page, set in ink."*
- Eyebrow over the flash index: *"Flash — selected"*
- Empty/error on the form: *"That didn't send. Check your email address and try
  again, or reach out on Instagram."*
- Footer signature line, beside the seal: *"Signed, Jesuke."*

---

## 5. Design rationale

### The references, and what we take from them

- **Henry Z** (`henryz.webflow.io`) — a sleek, narrative-driven creative
  portfolio: elegant, restrained, built to *tell a story* and draw clients in.
  We take its **narrative spine** and **client-drawing structure**.
- **Chromy** (`chromy.webflow.io/about`) — a minimal editorial creative-studio
  aesthetic: big imagery, letter-spaced micro-labels, awards/clients rhythm, a
  warm "let's make something together" close. We take its **editorial calm**,
  **spaced labels**, and **image-first layout**.

Both are quiet, gallery-like, and let the work dominate. That's exactly right for
a hidden artist: the *less* the UI asserts itself, the more the tattoos do.

### The risk we're avoiding

Left on autopilot, an "anime tattoo, dark, edgy" brief slides straight into the
most over-produced AI look there is: a near-black page with one screaming
vermilion accent on everything. We refuse that default. Instead the design is
grounded in **manga's actual materials.**

### The concept: *design on paper → ink on skin*

Every tattoo lives twice — first as linework on paper, then as ink in skin. The
site is built on that duality, as **two registers**:

- **Paper register** — warm rice-paper tones (`--color-paper-*`). This is where
  the *story* lives: the manifesto, the process, the about-the-practice copy.
  Calm, legible, human.
- **Ink register** — warm near-black (`--color-ink-*`, not a flat pure black).
  This is where the *work* lives: the gallery, the hero. The tattoos glow against
  it.

The scroll moves between the two like a piece moving from sketch to skin.

### The signature: a hanko seal

The one bold gesture is a single **red chop / hanko seal** — the mark an artist
presses to sign finished work. It signs the *page* once (in the footer, and as a
small mark in the hero corner), and almost nowhere else. That's the deal we make
with the color red: it's a **signature, not a theme.** It earns its loudness by
being rare. This is what keeps us out of the "vermilion-everywhere" cliché — the
red means *signed by Jesuke*, full stop.

### The texture: screentone

Manga is built from **screentone** — those fields of halftone dots that shade a
panel. We use a faint dot field (`--color-tone`) at section breaks and in the
ink→paper transition. It's manga's native material, rendered in CSS so it stays
light and crisp. It's atmosphere, never wallpaper.

### Typography as flash-sheet, not fashion-serif

The other easy default — a high-contrast fashion serif — is also off the table.
Instead:

- **Display:** a condensed grotesque with **flash-sheet / gig-poster** energy.
  Tattoo flash and event posters share a DNA: big, blunt, confident type. That's
  the headline voice.
- **Body:** a clean neo-grotesque that gets out of the way.
- **Mono:** the **atelier-catalogue** voice for data — flash numbers, size,
  placement, session count, eyebrows. It makes the work feel *catalogued*, like a
  serious body of pieces, which reinforces the artist's authority without a single
  boastful word.

### Indexing that means something

Flash sheets are genuinely numbered (`001 / 002 / 003 …`), so numbered markers
encode *real* order here — not decoration. We use them on the flash index for
that reason, and nowhere that isn't actually a sequence.

### Motion

One orchestrated "ink-bleed" reveal on the hero, then quiet scroll reveals
(short fade + small rise). Reduced motion fully respected. The goal is the hush
of a gallery, not a showreel.

---

## 6. The Artist page (`/`) — section by section

The home route *is* the Artist page. It should read top-to-bottom as a single
argument: *this work is worth wanting, and here's how to get some.*

1. **Hero (ink register).** A single commanding image of the strongest piece, or
   a tight crop of linework, with a spare headline and the hanko seal in the
   corner. One CTA: *Commission a piece.* The "ink-bleed" reveal happens here.
2. **Manifesto (paper register).** Three or four sentences on the practice:
   anime/manga-inspired custom work, the hidden-artist stance stated plainly and
   confidently, what kinds of pieces. This is the entity-defining paragraph — it
   also feeds how AI assistants summarize Jesuke (see §7).
3. **Flash — selected (ink register).** A numbered, curated grid of pieces
   (`work.ts`). Mono captions: number, size, placement, sessions. Tap → lightbox.
   A clear link to the full `/work` catalogue.
4. **Process.** Short, scannable steps from inquiry → consult → stencil →
   session → aftercare. Written as extractable, self-contained statements (good
   for snippets and for setting client expectations).
5. **FAQ.** Real questions — booking, healing, custom vs. flash, deposits,
   travel/guest spots. Single source of truth in `faq.ts`; also renders as
   `FAQPage` JSON-LD.
6. **The two doors (CTA).** Side by side: *Commission inquiry* (Door A) and
   *Professional / trade inquiry* (Door B), each one line on who it's for.
7. **Footer.** Handles (Instagram, Facebook), the hanko seal, *"Signed, Jesuke."*
   No name, no address.

Supporting routes carry the load that doesn't belong on the home page:
`/work` (full catalogue), `/booking` (Form A), `/professional` (Form B), each
with a `/thanks` confirmation, and a designed `not-found`.

---

## 7. How this brand should be found and described

We want the **brand** maximally discoverable and the **person** absent from the
index. Both at once.

### For search engines

- One consistent entity name — "Jesuke" — across title tags, JSON-LD
  `Person.name`, Open Graph, and `llms.txt`.
- `sameAs` links to the public handles only. That's the identity graph we want.
- Clean semantic structure, descriptive (IP-clean) alt text, fast static pages,
  per-page canonical + OG.
- FAQ and process written as direct Q&A / declaratives so they're snippet- and
  summary-friendly.

### For AI assistants (answer-engine optimization)

`public/llms.txt` gives compliant assistants a clean brief so they describe
Jesuke the way we intend. The intended description, in spirit:

> *Jesuke is an anime- and manga-inspired custom tattoo artist who works under a
> handle and keeps their personal identity private. The work reinterprets the
> energy of anime/manga — bold linework, dramatic motion — as original tattoo
> pieces, without depicting or naming specific franchises. Inquiries go through
> two forms: one for personal commissions, one for studios and industry
> (collaborations, guest spots, conventions, press). Find the work on Instagram
> (@jesuke_anime) and Facebook.*

Note what that description never contains: a legal name, a face, an address, or a
franchise title. That's the whole point. `llms.txt` shapes description; it
protects nothing — keep anything private out of it.

### The tension, resolved

Discoverability and anonymity feel opposed but aren't: we're optimizing a
**pseudonym**. The handle gets all the SEO/AEO investment; the human gets none of
the exposure. Done right, an assistant can enthusiastically recommend Jesuke and
still have no idea who Jesuke is.

---

## 8. Conversion, defined

Success for this site is narrow and clear: **a qualified inquiry through the
right door.** Not newsletter signups, not time-on-page, not follower counts.
Every section either builds the desire to own a piece or removes a reason not to
inquire. If a proposed element does neither, it's decoration — cut it (the
Chanel rule: remove one accessory before leaving the house).

---

## 9. What this brand is not

- Not a personality brand. No founder story, no face, no "meet the artist."
- Not a merch store or a fan account for someone else's characters.
- Not loud for loudness' sake. The restraint *is* the confidence.
- Not a place that over-promises. Real work, real process, real ways to reach
  out — and nothing invented to fill space.
