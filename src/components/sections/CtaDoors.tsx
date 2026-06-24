import Link from 'next/link';

export function CtaDoors() {
  return (
    <section
      className="section-paper py-20 md:py-28 screentone"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2
          id="cta-heading"
          className="text-[clamp(1.5rem,4vw,3rem)] font-display text-paper-700 leading-tight mb-14"
        >
          Two ways in.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper-100">
          {/* Door A — Commission */}
          <div className="bg-paper-50 p-10 flex flex-col justify-between gap-8">
            <div>
              <p className="eyebrow text-paper-700 opacity-40 mb-4">
                Personal commission
              </p>
              <h3 className="font-display text-paper-700 text-2xl mb-4">
                A piece for you.
              </h3>
              <p className="text-paper-700 opacity-70 text-sm leading-relaxed max-w-xs">
                You have an idea — a feeling, a placement, a reference you can
                describe. This form gets it to the right place.
              </p>
            </div>
            <Link
              href="/booking"
              className="self-start inline-flex items-center gap-3 bg-ink-900 text-paper-50 px-8 py-4 text-sm font-body tracking-wide hover:bg-ink-800 transition-colors"
            >
              Commission inquiry
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Door B — Professional */}
          <div className="bg-paper-100 p-10 flex flex-col justify-between gap-8">
            <div>
              <p className="eyebrow text-paper-700 opacity-40 mb-4">
                Professional / trade
              </p>
              <h3 className="font-display text-paper-700 text-2xl mb-4">
                Work together.
              </h3>
              <p className="text-paper-700 opacity-70 text-sm leading-relaxed max-w-xs">
                Studios, conventions, collaborations, press, flash licensing.
                Different door, different conversation.
              </p>
            </div>
            <Link
              href="/professional"
              className="self-start inline-flex items-center gap-3 border border-paper-700/30 text-paper-700 px-8 py-4 text-sm font-body tracking-wide hover:border-paper-700/60 transition-colors"
            >
              Professional inquiry
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
