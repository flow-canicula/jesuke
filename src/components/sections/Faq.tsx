'use client';

import { useState } from 'react';
import { FAQ } from '@/content/faq';
import { useReveal } from '@/lib/useReveal';

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);
  const sectionRef = useReveal(0.1);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-28 md:py-40 overflow-hidden"
      aria-labelledby="faq-heading"
      style={{ background: 'var(--color-paper-50)' }}
    >
      {/* Angled ink bleed from top */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '80px',
          background: 'linear-gradient(to bottom, var(--color-ink-900) 0%, transparent 100%)',
          clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start gap-16 md:gap-24">
          {/* Left — heading fixed */}
          <div className="md:w-72 flex-shrink-0">
            <p className="eyebrow mb-6" style={{ color: 'var(--color-paper-700)', opacity: 0.4 }} data-reveal="rise">
              Questions
            </p>
            <h2
              id="faq-heading"
              className="font-display leading-tight overflow-hidden"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-paper-700)' }}
            >
              <span className="block" data-reveal="wipe" data-delay="1">Common</span>
              <span className="block" data-reveal="wipe" data-delay="2">questions.</span>
            </h2>
          </div>

          {/* Right — accordion */}
          <dl className="flex-1 divide-y" style={{ borderColor: 'rgba(58,58,51,0.15)' }} data-reveal="rise" data-delay="3">
            {FAQ.map((entry) => {
              const isOpen = openId === entry.id;
              return (
                <div key={entry.id} style={{ borderColor: 'rgba(58,58,51,0.15)' }}>
                  <dt>
                    <button
                      type="button"
                      className="w-full text-left py-6 flex items-start justify-between gap-6 transition-colors"
                      style={{ color: isOpen ? 'var(--color-paper-700)' : 'rgba(58,58,51,0.7)' }}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${entry.id}`}
                      onClick={() => setOpenId(isOpen ? null : entry.id)}
                    >
                      <span className="font-body text-base leading-snug pr-2">
                        {entry.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex-shrink-0 font-display leading-none transition-transform duration-300"
                        style={{
                          fontSize: '1.5rem',
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                          color: isOpen ? 'var(--color-seal)' : 'inherit',
                        }}
                      >
                        +
                      </span>
                    </button>
                  </dt>
                  <dd
                    id={`faq-answer-${entry.id}`}
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: isOpen ? '400px' : '0', paddingBottom: isOpen ? '1.5rem' : '0' }}
                  >
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-paper-700)', opacity: 0.65 }}
                    >
                      {entry.answer}
                    </p>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
