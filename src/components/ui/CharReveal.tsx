'use client';

import { useEffect, useRef } from 'react';

type Props = {
  text: string;
  /** Base delay before first character fires, ms */
  baseDelay?: number;
  /** Stagger between each character, ms */
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Splits text into individual character spans that each animate in via
 * the `.char-reveal` / `.char-reveal.in-view` CSS animation once the
 * element enters the viewport. Spaces are rendered as non-breaking gaps.
 */
export function CharReveal({ text, baseDelay = 0, stagger = 45, className, style }: Props) {
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const chars = wrap.querySelectorAll<HTMLElement>('.char-reveal');
    if (!chars.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          chars.forEach((el) => el.classList.add('in-view'));
          observer.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={wrapRef} className={className} style={style} aria-label={text}>
      {text.split('').map((ch, i) =>
        ch === ' ' ? (
          <span key={i} aria-hidden="true">&nbsp;</span>
        ) : (
          <span
            key={i}
            className="char-reveal"
            aria-hidden="true"
            style={{ animationDelay: `${baseDelay + i * stagger}ms` }}
          >
            {ch}
          </span>
        )
      )}
    </span>
  );
}
