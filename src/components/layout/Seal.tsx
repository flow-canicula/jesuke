type SealProps = {
  className?: string;
  size?: number;
};

export function Seal({ className = '', size = 48 }: SealProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Outer circle — cinnabar seal border */}
      <circle
        cx="24"
        cy="24"
        r="22"
        stroke="var(--color-seal)"
        strokeWidth="2.5"
      />
      {/* Inner square rotated 45° — chop frame */}
      <rect
        x="13"
        y="13"
        width="22"
        height="22"
        rx="1"
        stroke="var(--color-seal)"
        strokeWidth="1.5"
        transform="rotate(45 24 24)"
      />
      {/* Abstract kanji-like strokes — J for Jesuke */}
      <line
        x1="24"
        y1="16"
        x2="24"
        y2="30"
        stroke="var(--color-seal)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="24"
        y1="30"
        x2="20"
        y2="34"
        stroke="var(--color-seal)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="16"
        x2="28"
        y2="16"
        stroke="var(--color-seal)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
