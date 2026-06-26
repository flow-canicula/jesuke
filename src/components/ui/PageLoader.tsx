'use client';

import { useEffect, useState } from 'react';

export function PageLoader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setGone(true);
      return;
    }
    // total sequence: drop(0.6s) + hold(0.4s) + bleed(0.8s) + exit(0.6s)
    const t = setTimeout(() => setGone(true), 2400);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  const SEAL = 'var(--color-seal)';

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-ink-900)',
        pointerEvents: 'none',
        animation: 'hanko-exit 2.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      }}
    >
      {/* Screentone texture behind everything */}
      <div
        className="screentone"
        style={{ position: 'absolute', inset: 0, opacity: 0.4 }}
      />

      {/* Stamp + rings container */}
      <div style={{ position: 'relative', width: 160, height: 160 }}>

        {/* Bleed ring 1 — fast, tight */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: `2px solid ${SEAL}`,
          animation: 'hanko-ring 0.9s cubic-bezier(0.2, 0, 0.8, 1) 0.55s forwards',
          opacity: 0,
        }} />

        {/* Bleed ring 2 — slower, larger */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: `1px solid ${SEAL}`,
          animation: 'hanko-bleed 1.2s cubic-bezier(0.2, 0, 0.8, 1) 0.65s forwards',
          opacity: 0,
        }} />

        {/* Bleed ring 3 — faintest, largest */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: `1px solid ${SEAL}`,
          opacity: 0,
          animation: 'hanko-bleed 1.5s cubic-bezier(0.2, 0, 0.8, 1) 0.8s forwards',
        }} />

        {/* The stamp itself */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: `3px solid ${SEAL}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            animation: 'hanko-drop 0.6s cubic-bezier(0.34, 1.4, 0.64, 1) 0.15s forwards',
          }}
        >
          {/* Inner ring */}
          <div style={{
            position: 'absolute',
            inset: 8,
            borderRadius: '50%',
            border: `1px solid ${SEAL}`,
            opacity: 0.5,
          }} />

          {/* J lettermark */}
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '4.5rem',
            color: SEAL,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            userSelect: 'none',
          }}>
            J
          </span>
        </div>

      </div>

      {/* Wordmark beneath — fades in after stamp lands */}
      <div style={{
        position: 'absolute',
        bottom: '50%',
        left: '50%',
        transform: 'translate(-50%, 110px)',
        opacity: 0,
        animation: 'hanko-drop 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'var(--color-ink-100)',
          opacity: 0.4,
        }}>
          Jesuke
        </span>
      </div>
    </div>
  );
}
