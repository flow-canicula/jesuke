const STEPS = [
  {
    n: '01',
    title: 'Inquiry',
    body: 'Send a commission inquiry with your idea, size, and placement. No full brief needed — a direction is enough to start.',
  },
  {
    n: '02',
    title: 'Consult',
    body: 'We align on concept, style weight, and session estimate. A deposit secures your slot and covers drawing time.',
  },
  {
    n: '03',
    title: 'Stencil',
    body: 'The design is drawn to fit your anatomy. You review the stencil placement before any ink touches skin.',
  },
  {
    n: '04',
    title: 'Session',
    body: 'Single-session blackwork up to a forearm. Larger builds are split across sessions with healing time in between.',
  },
  {
    n: '05',
    title: 'Aftercare',
    body: 'A full aftercare sheet at the end of every session. Two to four weeks for the ink to settle. Touch-ups handled if needed.',
  },
] as const;

export function Process() {
  return (
    <section
      className="section-paper py-20 md:py-28"
      aria-labelledby="process-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        <p className="eyebrow text-paper-700 opacity-50 mb-6">How it works</p>
        <h2
          id="process-heading"
          className="text-[clamp(1.5rem,4vw,3rem)] font-display text-paper-700 leading-tight mb-14 max-w-xl"
        >
          From inquiry to healed ink.
        </h2>

        <ol className="grid grid-cols-1 md:grid-cols-5 gap-8" role="list">
          {STEPS.map((step) => (
            <li key={step.n} className="flex flex-col gap-3">
              <p className="eyebrow text-paper-700 opacity-30">{step.n}</p>
              <h3 className="font-display text-paper-700 text-xl">{step.title}</h3>
              <p className="text-paper-700 text-sm leading-relaxed opacity-80">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
