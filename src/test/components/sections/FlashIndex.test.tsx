import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FlashIndex } from '@/components/sections/FlashIndex';

describe('FlashIndex', () => {
  it('renders a section landmark', () => {
    render(<FlashIndex />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('renders h2 heading', () => {
    render(<FlashIndex />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders "Full catalogue" link to /work', () => {
    render(<FlashIndex />);
    const links = screen.getAllByRole('link', { name: /full catalogue/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute('href', '/work');
  });

  it('renders gallery grid with pieces', () => {
    render(<FlashIndex />);
    expect(screen.getByRole('list', { name: /flash catalogue/i })).toBeInTheDocument();
  });
});
