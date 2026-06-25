import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CtaDoors } from '@/components/sections/CtaDoors';

describe('CtaDoors', () => {
  it('renders a section landmark', () => {
    render(<CtaDoors />);
    expect(screen.getByRole('region', { name: /two ways in/i })).toBeInTheDocument();
  });

  it('renders heading "Two ways in."', () => {
    render(<CtaDoors />);
    expect(screen.getByRole('heading', { name: /two ways in/i })).toBeInTheDocument();
  });

  it('renders Commission inquiry link pointing to /booking', () => {
    render(<CtaDoors />);
    const link = screen.getByRole('link', { name: /commission inquiry/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/booking');
  });

  it('renders Professional inquiry link pointing to /professional', () => {
    render(<CtaDoors />);
    const link = screen.getByRole('link', { name: /professional inquiry/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/professional');
  });

  it('renders "Personal commission" and "Professional / trade" eyebrows', () => {
    render(<CtaDoors />);
    expect(screen.getByText(/personal commission/i)).toBeInTheDocument();
    expect(screen.getByText(/professional \/ trade/i)).toBeInTheDocument();
  });
});
