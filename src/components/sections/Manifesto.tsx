export function Manifesto() {
  return (
    <section
      className="section-paper relative py-20 md:py-28"
      aria-labelledby="manifesto-heading"
    >
      {/* Screentone transition strip */}
      <div
        className="absolute top-0 left-0 right-0 h-16 screentone opacity-30"
        aria-hidden="true"
        style={{ background: 'linear-gradient(to bottom, var(--color-ink-900), transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <p className="eyebrow text-paper-700 opacity-50 mb-6" id="manifesto-eyebrow">
          The practice
        </p>

        <h2
          id="manifesto-heading"
          className="text-[clamp(1.5rem,4vw,3rem)] font-display text-paper-700 leading-tight mb-8 max-w-3xl"
        >
          Anime and manga energy — original work, in skin.
        </h2>

        <div className="max-w-2xl space-y-5 text-paper-700 text-base leading-relaxed">
          <p>
            Every piece starts from the same source material as the art form itself —
            bold contour lines, dramatic motion, the weight of a decisive panel. What goes
            on the skin is original work, designed for the body it lives on.
          </p>
          <p>
            The artist works under the handle Jesuke. No name on the door,
            no face on the feed. What there is: the work, a point of view, and two clear
            ways to reach out.
          </p>
          <p>
            Blackwork and fine-line. Single sessions to multi-session builds.
            Custom pieces and available flash.
          </p>
        </div>
      </div>
    </section>
  );
}
