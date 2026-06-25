import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/layout/Header';

describe('Header', () => {
  it('renders a header landmark', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders the Jesuke home link', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /jesuke.*home/i })).toBeInTheDocument();
  });

  it('home link points to /', () => {
    render(<Header />);
    const link = screen.getByRole('link', { name: /jesuke.*home/i });
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders the wordmark text', () => {
    render(<Header />);
    expect(screen.getByText('Jesuke')).toBeInTheDocument();
  });

  it('renders navigation', () => {
    render(<Header />);
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  });
});
