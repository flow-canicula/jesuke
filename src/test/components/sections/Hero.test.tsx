import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { Hero } from '@/components/sections/Hero';

describe('Hero', () => {
  it('renders a section landmark', () => {
    render(<Hero />);
    expect(screen.getByRole('region', { name: /hero/i })).toBeInTheDocument();
  });

  it('renders the h1 heading', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('heading contains key brand copy', () => {
    render(<Hero />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent?.toLowerCase()).toContain('ink');
  });

  it('renders "Commission a piece" CTA link to /booking', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /commission a piece/i });
    expect(link).toHaveAttribute('href', '/booking');
  });

  it('renders "See all work" link to /work', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /see all work/i });
    expect(link).toHaveAttribute('href', '/work');
  });

  it('renders location tag with Philippines', () => {
    render(<Hero />);
    expect(screen.getByText(/bulacan, philippines/i)).toBeInTheDocument();
  });

  it('renders genre eyebrow text', () => {
    render(<Hero />);
    expect(screen.getByText('Anime · Manga · Manhwa')).toBeInTheDocument();
  });

  it('does not expose personal identity', () => {
    render(<Hero />);
    const html = document.body.innerHTML.toLowerCase();
    expect(html).not.toContain('real name');
    expect(html).not.toContain('phone number');
  });
});

describe('Hero – onMouseMove (lines 18-23)', () => {
  let rafCallback: FrameRequestCallback | null = null;
  let cancelSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    rafCallback = null;
    // requestAnimationFrame captures the callback and returns a fake handle
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb: FrameRequestCallback) => {
      rafCallback = cb;
      return 42;
    }));
    cancelSpy = vi.fn();
    vi.stubGlobal('cancelAnimationFrame', cancelSpy);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function fireMouseMove(clientX: number, clientY: number) {
    window.dispatchEvent(new MouseEvent('mousemove', { clientX, clientY }));
  }

  it('skips rAF scheduling when prefers-reduced-motion is active', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue({ matches: true }),
    });

    render(<Hero />);
    fireMouseMove(100, 200);

    expect(requestAnimationFrame).not.toHaveBeenCalled();
  });

  it('schedules a requestAnimationFrame on mousemove (no reduced motion)', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    });

    render(<Hero />);
    fireMouseMove(100, 200);

    expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
  });

  it('cancels a pending rAF before scheduling a new one', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    });

    render(<Hero />);
    // First move schedules handle 42
    fireMouseMove(100, 200);
    // Second move should cancel 42 then schedule again
    fireMouseMove(300, 400);

    expect(cancelSpy).toHaveBeenCalledWith(42);
    expect(requestAnimationFrame).toHaveBeenCalledTimes(2);
  });

  it('computes normalised x/y and updates mouse state via the rAF callback', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue({ matches: false }),
    });

    // Fix viewport so the normalisation math is deterministic
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1000 });
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 500 });

    render(<Hero />);
    fireMouseMove(750, 375); // nx = (0.75 - 0.5)*2 = 0.5,  ny = (0.75 - 0.5)*2 = 0.5

    // Execute the rAF callback — this triggers setMouse and re-renders
    act(() => { rafCallback!(performance.now()); });

    // After state update the parallax div transform should reflect the new values:
    // bgX = 0.5 * -14 = -7px,  bgY = 0.5 * -10 = -5px
    const parallaxDiv = document.querySelector('[style*="translate"]') as HTMLElement;
    expect(parallaxDiv?.style.transform).toBe('translate(-7px, -5px)');
  });
});
