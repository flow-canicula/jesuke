import { t } from '@/lib/messages';

export function Manifesto() {
  return (
    <section
      className="relative py-28 md:py-40 overflow-hidden"
      aria-labelledby="manifesto-heading"
      style={{ background: 'var(--color-paper-50)' }}
    >
      {/* Angled ink bleed from top */}
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, var(--color-ink-900) 0%, transparent 100%)',
          clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 100%)',
        }}
        aria-hidden="true"
      />

      {/* Large decorative background numeral */}
      <div
        className="absolute -right-8 top-1/2 -translate-y-1/2 font-display leading-none select-none pointer-events-none"
        style={{
          fontSize: 'clamp(12rem, 30vw, 24rem)',
          color: 'var(--color-paper-100)',
          opacity: 0.5,
        }}
        aria-hidden="true"
      >
        J
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <p className="eyebrow mb-8" style={{ color: 'var(--color-paper-700)', opacity: 0.4 }}>
          {t.manifesto.eyebrow}
        </p>

        <h2
          id="manifesto-heading"
          className="font-display leading-tight mb-16"
          style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', color: 'var(--color-paper-700)', maxWidth: '14ch' }}
        >
          {t.manifesto.headline.replace(t.manifesto.headlineAccent, '')}
          <span style={{ color: 'var(--color-seal)' }}> {t.manifesto.headlineAccent}</span>
          {' '}in skin.
        </h2>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 text-sm leading-relaxed"
          style={{ color: 'var(--color-paper-700)', maxWidth: '900px' }}
        >
          <p style={{ opacity: 0.75 }}>{t.manifesto.body1}</p>
          <p style={{ opacity: 0.75 }}>{t.manifesto.body2}</p>
          <p className="md:col-span-2" style={{ opacity: 0.55 }}>{t.manifesto.body3}</p>
        </div>

        {/* Horizontal rule */}
        <div
          className="mt-16 h-px"
          style={{ background: 'var(--color-paper-100)', maxWidth: '200px' }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
