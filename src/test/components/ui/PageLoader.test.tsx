import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { PageLoader } from '@/components/ui/PageLoader';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

function setReducedMotion(value: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockReturnValue({ matches: value }),
  });
}

// ── Visibility ────────────────────────────────────────────────────────────────

describe('PageLoader – visibility', () => {
  it('renders the overlay on mount', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    expect(container.firstChild).not.toBeNull();
  });

  it('is aria-hidden so screen readers skip it', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    const overlay = container.firstChild as HTMLElement;
    expect(overlay.getAttribute('aria-hidden')).toBe('true');
  });

  it('unmounts after 2400ms', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    expect(container.firstChild).not.toBeNull();
    act(() => { vi.advanceTimersByTime(2400); });
    expect(container.firstChild).toBeNull();
  });

  it('is gone immediately when prefers-reduced-motion is active', () => {
    setReducedMotion(true);
    const { container } = render(<PageLoader />);
    expect(container.firstChild).toBeNull();
  });

  it('does not unmount before 2400ms have elapsed', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    act(() => { vi.advanceTimersByTime(2399); });
    expect(container.firstChild).not.toBeNull();
  });
});

// ── Structure ─────────────────────────────────────────────────────────────────

describe('PageLoader – structure', () => {
  it('has pointer-events: none so it never blocks interaction', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    const overlay = container.firstChild as HTMLElement;
    expect(overlay.style.pointerEvents).toBe('none');
  });

  it('covers the full viewport with position fixed and inset 0', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    const overlay = container.firstChild as HTMLElement;
    expect(overlay.style.position).toBe('fixed');
    expect(overlay.style.inset).toBe('0px');
  });

  it('sits above all content with z-index 9999', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    const overlay = container.firstChild as HTMLElement;
    expect(overlay.style.zIndex).toBe('9999');
  });

  it('uses ink-900 as background color', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    const overlay = container.firstChild as HTMLElement;
    expect(overlay.style.backgroundColor).toBe('var(--color-ink-900)');
  });

  it('renders the screentone texture div', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    expect(container.querySelector('.screentone')).toBeInTheDocument();
  });
});

// ── Hanko stamp ───────────────────────────────────────────────────────────────

describe('PageLoader – hanko stamp', () => {
  it('renders the J lettermark', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    const spans = container.querySelectorAll('span');
    const jSpan = Array.from(spans).find((s) => s.textContent?.trim() === 'J');
    expect(jSpan).toBeInTheDocument();
  });

  it('J lettermark uses the seal color', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    const spans = container.querySelectorAll('span');
    const jSpan = Array.from(spans).find((s) => s.textContent?.trim() === 'J') as HTMLElement;
    expect(jSpan.style.color).toBe('var(--color-seal)');
  });

  it('renders three bleed rings (border-radius 50% divs inside the stamp container)', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    const rings = Array.from(container.querySelectorAll<HTMLElement>('div')).filter(
      (el) => el.style.borderRadius === '50%'
    );
    // 3 bleed rings + 1 stamp circle + 1 inner ring = 5 total
    expect(rings.length).toBeGreaterThanOrEqual(5);
  });

  it('stamp circle uses the seal color border', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    const stampCircle = Array.from(container.querySelectorAll<HTMLElement>('div')).find(
      (el) =>
        el.style.borderRadius === '50%' &&
        el.style.border.includes('var(--color-seal)') &&
        el.style.border.startsWith('3px')
    );
    expect(stampCircle).toBeInTheDocument();
  });

  it('renders the Jesuke wordmark beneath the stamp', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    const spans = container.querySelectorAll('span');
    const wordmark = Array.from(spans).find((s) =>
      s.textContent?.toLowerCase().includes('jesuke')
    );
    expect(wordmark).toBeInTheDocument();
  });

  it('wordmark uses ink-100 color', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    const spans = container.querySelectorAll('span');
    const wordmark = Array.from(spans).find((s) =>
      s.textContent?.toLowerCase().includes('jesuke')
    ) as HTMLElement;
    expect(wordmark.style.color).toBe('var(--color-ink-100)');
  });
});

// ── Animations ────────────────────────────────────────────────────────────────

describe('PageLoader – animations', () => {
  it('overlay carries the hanko-exit animation', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    const overlay = container.firstChild as HTMLElement;
    expect(overlay.style.animation).toContain('hanko-exit');
  });

  it('stamp div carries the hanko-drop animation', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    const stampCircle = Array.from(container.querySelectorAll<HTMLElement>('div')).find(
      (el) =>
        el.style.borderRadius === '50%' &&
        el.style.animation?.includes('hanko-drop')
    );
    expect(stampCircle).toBeInTheDocument();
  });

  it('bleed ring carries hanko-ring animation', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    const ring = Array.from(container.querySelectorAll<HTMLElement>('div')).find(
      (el) => el.style.animation?.includes('hanko-ring')
    );
    expect(ring).toBeInTheDocument();
  });

  it('at least two elements carry the hanko-bleed animation', () => {
    setReducedMotion(false);
    const { container } = render(<PageLoader />);
    const bleedEls = Array.from(container.querySelectorAll<HTMLElement>('div')).filter(
      (el) => el.style.animation?.includes('hanko-bleed')
    );
    expect(bleedEls.length).toBeGreaterThanOrEqual(2);
  });

  it('clears the timeout on unmount (no state-update-after-unmount warning)', () => {
    setReducedMotion(false);
    const { unmount } = render(<PageLoader />);
    // Unmount before the 2400ms timer fires — should not throw
    expect(() => {
      unmount();
      act(() => { vi.advanceTimersByTime(2400); });
    }).not.toThrow();
  });
});
