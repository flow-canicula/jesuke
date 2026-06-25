import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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
