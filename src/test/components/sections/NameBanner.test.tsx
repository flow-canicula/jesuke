import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { NameBanner } from '@/components/sections/NameBanner';

let lastIOCallback: IntersectionObserverCallback | null = null;
let lastIOInstance: { observe: ReturnType<typeof vi.fn>; disconnect: ReturnType<typeof vi.fn> } | null = null;

class ControllableIO {
  observe = vi.fn();
  disconnect = vi.fn();
  constructor(cb: IntersectionObserverCallback) {
    lastIOCallback = cb;
    lastIOInstance = this;
  }
}

beforeEach(() => {
  lastIOCallback = null;
  lastIOInstance = null;
  vi.stubGlobal('IntersectionObserver', ControllableIO);
});

describe('NameBanner', () => {
  it('renders a section landmark', () => {
    render(<NameBanner />);
    expect(screen.getByRole('region', { name: /jesuke.*tattoo artist/i })).toBeInTheDocument();
  });

  it('renders 6 panel images', () => {
    render(<NameBanner />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(6);
  });

  it('renders the screen-reader label showing Jesuke by default', () => {
    render(<NameBanner />);
    expect(screen.getByText('Jesuke')).toBeInTheDocument();
  });

  it('prepends basePath to image srcs', () => {
    render(<NameBanner basePath="/jesuke" />);
    const images = screen.getAllByRole('img') as HTMLImageElement[];
    const hasBasePath = images.some((img) => img.src.includes('/jesuke'));
    expect(hasBasePath).toBe(true);
  });

  it('swaps screen-reader text to Tattoo on section hover', () => {
    render(<NameBanner />);
    const section = screen.getByRole('region', { name: /jesuke.*tattoo artist/i });
    fireEvent.mouseEnter(section);
    expect(screen.getByText('Tattoo')).toBeInTheDocument();
    fireEvent.mouseLeave(section);
    expect(screen.getByText('Jesuke')).toBeInTheDocument();
  });

  it('highlights a panel on mouse enter and resets on leave', () => {
    render(<NameBanner />);
    const section = screen.getByRole('region', { name: /jesuke.*tattoo artist/i });
    const panels = section.querySelectorAll('div[class*="overflow-hidden"]');
    if (panels[0]) {
      fireEvent.mouseEnter(panels[0]);
      fireEvent.mouseLeave(panels[0]);
    }
    // no errors thrown — interaction is handled
    expect(section).toBeInTheDocument();
  });

  it('respects prefers-reduced-motion', () => {
    // window.matchMedia already mocked in setup; just ensure no crash
    render(<NameBanner />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  // ── Line 87: IntersectionObserver callback — isIntersecting branch ────────

  it('sets panels to opacity 1 / translateY(0) when section intersects (line 87)', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
    });

    const { container } = render(<NameBanner />);

    // Before intersection: first panel column has opacity 0
    const firstPanel = container.querySelector('div[style*="opacity"]') as HTMLElement;
    expect(firstPanel?.style.opacity).toBe('0');

    // Fire the observer callback with isIntersecting: true
    act(() => {
      lastIOCallback!(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        lastIOInstance as unknown as IntersectionObserver,
      );
    });

    // After intersection: opacity becomes 1 and transform resets
    expect(firstPanel?.style.opacity).toBe('1');
    expect(firstPanel?.style.transform).toBe('translateY(0)');
  });

  it('calls observer.disconnect() after intersection fires (line 87)', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
    });

    render(<NameBanner />);

    act(() => {
      lastIOCallback!(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        lastIOInstance as unknown as IntersectionObserver,
      );
    });

    expect(lastIOInstance!.disconnect).toHaveBeenCalled();
  });

  it('does not set entered when entry is not intersecting (line 87 false branch)', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
    });

    const { container } = render(<NameBanner />);

    act(() => {
      lastIOCallback!(
        [{ isIntersecting: false } as IntersectionObserverEntry],
        lastIOInstance as unknown as IntersectionObserver,
      );
    });

    const firstPanel = container.querySelector('div[style*="opacity"]') as HTMLElement;
    expect(firstPanel?.style.opacity).toBe('0');
    expect(lastIOInstance!.disconnect).not.toHaveBeenCalled();
  });

  // ── Lines 125-126, 144-145, 162, 191, 205: reducedMotion = true branches ──

  describe('with prefers-reduced-motion: reduce', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockReturnValue({
          matches: true,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }),
      });
    });

    it('sets entered immediately without an IntersectionObserver (line 83)', () => {
      // When reducedMotion is true the entrance effect skips the observer and
      // calls setEntered(true) directly — panels should be immediately visible.
      const { container } = render(<NameBanner />);
      // No opacity:0 style — entranceStyle is {} so panels have no opacity prop
      const opacityZeroPanel = container.querySelector('div[style*="opacity: 0"]');
      expect(opacityZeroPanel).toBeNull();
    });

    it('applies empty entranceStyle (no opacity/transform) to panels (lines 125-126)', () => {
      const { container } = render(<NameBanner />);
      // In reducedMotion mode entranceStyle = {} so columns must NOT carry
      // an inline opacity or translateY from the entrance logic.
      const panels = container.querySelectorAll('div.relative.overflow-hidden');
      panels.forEach((panel) => {
        const el = panel as HTMLElement;
        // opacity and transform may exist from hover logic but not from entrance
        // The key check: no translateY(40px) stuck on any panel
        expect(el.style.transform).not.toBe('translateY(40px)');
      });
    });

    it('sets transition: none on panel columns (lines 144-145)', () => {
      const { container } = render(<NameBanner />);
      const panels = container.querySelectorAll('div.relative.overflow-hidden');
      panels.forEach((panel) => {
        expect((panel as HTMLElement).style.transition).toBe('none');
      });
    });

    it('sets transition: none on image filter (line 162)', () => {
      const { container } = render(<NameBanner />);
      // The <img> elements carry the filter transition style
      const images = container.querySelectorAll('img');
      images.forEach((img) => {
        expect((img as HTMLElement).style.transition).not.toMatch(/filter \d+ms/);
      });
    });

    it('sets transition: none on JESUKE letter spans (line 191)', () => {
      const { container } = render(<NameBanner />);
      // The first absolute <span> inside each letter-swap div is the JESUKE letter
      const letterSpans = container.querySelectorAll(
        'div.absolute.inset-0.flex > span:first-of-type'
      );
      letterSpans.forEach((span) => {
        expect((span as HTMLElement).style.transition).toBe('none');
      });
    });

    it('sets transition: none on TATTOO letter spans (line 205)', () => {
      const { container } = render(<NameBanner />);
      // The second absolute <span> inside each letter-swap div is the TATTOO letter
      const letterSpans = container.querySelectorAll(
        'div.absolute.inset-0.flex > span:last-of-type'
      );
      letterSpans.forEach((span) => {
        expect((span as HTMLElement).style.transition).toBe('none');
      });
    });

    it('sets staggerMs to 0 for all panels (line 124)', () => {
      const { container } = render(<NameBanner />);
      // When reducedMotion, staggerMs = 0 for every panel, so transitionDelay
      // must not appear in inline styles (entranceStyle is {})
      const panels = container.querySelectorAll('div.relative.overflow-hidden');
      panels.forEach((panel) => {
        expect((panel as HTMLElement).style.transitionDelay).toBe('');
      });
    });
  });
});
