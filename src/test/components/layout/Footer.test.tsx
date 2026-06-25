import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';

describe('Footer', () => {
  it('renders a footer landmark', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders Instagram link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /instagram/i })).toBeInTheDocument();
  });

  it('renders Facebook link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /facebook/i })).toBeInTheDocument();
  });

  it('social links open in new tab', () => {
    render(<Footer />);
    const igLink = screen.getByRole('link', { name: /instagram/i });
    expect(igLink).toHaveAttribute('target', '_blank');
    expect(igLink).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('renders Privacy link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /privacy/i })).toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it('renders Jesuke brand text', () => {
    render(<Footer />);
    expect(screen.getByText(/signed, jesuke/i)).toBeInTheDocument();
  });

  it('renders social links nav with aria-label', () => {
    render(<Footer />);
    expect(screen.getByRole('navigation', { name: /social links/i })).toBeInTheDocument();
  });
});
