type SealProps = {
  className?: string;
  size?: number;
};

/*
 * JAT monogram seal — Jesuke Anime Tattoo
 *
 * J is the dominant letter, drawn large and bold through the center.
 * A and T are woven in as secondary strokes that share J's geometry:
 *
 *   J — thick vertical stem (x=23) from y=12 to y=33, hooks left to (18,37).
 *       Top cap serif spans x=20–28 at y=12. J is the heaviest stroke weight.
 *
 *   T — crossbar at y=19 spans x=13–35, bisecting the J stem.
 *       This crossbar also reads as the A crossbar. T has no separate stem —
 *       the J stem IS the T stem below y=19.
 *
 *   A — apex at (23,12) shared with J cap; two legs splay out:
 *       left leg from (23,12) to (13,37), right leg from (23,12) to (33,37).
 *       The T crossbar at y=19 doubles as the A's upper crossbar.
 *       A second, lower crossbar at y=28 cuts between the legs.
 *
 * Net result: J reads first (bold center stem + hook), A reads second
 * (wide angular legs), T reads third (strong horizontal crossbar).
 */
export function Seal({ className = '', size = 48 }: SealProps) {
  const s = 'var(--color-seal)';
  const cap = 'round' as const;
  const join = 'round' as const;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Outer circle */}
      <circle cx="24" cy="24" r="22" stroke={s} strokeWidth="2.5" />

      {/* ── A outer legs (light weight, background structure) ── */}
      <polyline
        points="13,37 23,12 33,37"
        stroke={s} strokeWidth="1.6" strokeLinecap={cap} strokeLinejoin={join} fill="none"
        opacity="0.75"
      />

      {/* ── A lower crossbar at y=28 (between the legs) ── */}
      {/* at y=28: left leg x = 13 + (23-13)*(28-37)/(12-37) = 13 + 10*(9/25) = 16.6 */}
      {/*          right leg x = 33 - (33-23)*(28-37)/(12-37) = 33 - 10*(9/25) = 29.4 */}
      <line x1="16.6" y1="28" x2="29.4" y2="28" stroke={s} strokeWidth="1.6" strokeLinecap={cap} opacity="0.75" />

      {/* ── T crossbar — bold, spans full width, at y=19 ── */}
      <line x1="12" y1="19" x2="34" y2="19" stroke={s} strokeWidth="2.2" strokeLinecap={cap} />

      {/* ── J cap serif — top of J, thickest stroke ── */}
      <line x1="19" y1="12" x2="27" y2="12" stroke={s} strokeWidth="2.8" strokeLinecap={cap} />

      {/* ── J dominant stem — thickest, runs through center ── */}
      <line x1="23" y1="12" x2="23" y2="33" stroke={s} strokeWidth="2.8" strokeLinecap={cap} />

      {/* ── J hook — curves left at bottom ── */}
      <path
        d="M23,33 Q23,37.5 18.5,37.5"
        stroke={s} strokeWidth="2.8" strokeLinecap={cap} strokeLinejoin={join} fill="none"
      />
    </svg>
  );
}
