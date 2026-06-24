'use client';

import { useState } from 'react';
import { FAQ } from '@/content/faq';

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      className="section-ink py-20 md:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-6xl mx-auto px-6">
        <p className="eyebrow text-ink-100 opacity-50 mb-6">Questions</p>
        <h2
          id="faq-heading"
          className="text-[clamp(1.5rem,4vw,3rem)] font-display text-paper-50 leading-tight mb-14 max-w-xl"
        >
          Common questions.
        </h2>

        <dl className="max-w-2xl space-y-0 divide-y divide-line">
          {FAQ.map((entry) => {
            const isOpen = openId === entry.id;
            return (
              <div key={entry.id}>
                <dt>
                  <button
                    type="button"
                    className="w-full text-left py-5 flex items-center justify-between gap-4 text-ink-100 hover:text-paper-50 transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${entry.id}`}
                    onClick={() => setOpenId(isOpen ? null : entry.id)}
                  >
                    <span className="font-body text-sm leading-snug pr-2">
                      {entry.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex-shrink-0 text-lg transition-transform duration-200 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${entry.id}`}
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? 'max-h-64 pb-5' : 'max-h-0'
                  }`}
                >
                  <p className="text-ink-100 opacity-70 text-sm leading-relaxed">
                    {entry.answer}
                  </p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
