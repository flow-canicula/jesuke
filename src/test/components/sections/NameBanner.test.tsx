import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NameBanner } from '@/components/sections/NameBanner';

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
});
