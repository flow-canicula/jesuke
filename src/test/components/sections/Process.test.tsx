import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Process } from '@/components/sections/Process';

describe('Process', () => {
  it('renders a section landmark', () => {
    render(<Process />);
    // heading text split across spans; find section by its aria-labelledby instead
    expect(document.querySelector('section[aria-labelledby="process-heading"]')).toBeInTheDocument();
  });

  it('renders h2 heading', () => {
    render(<Process />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('renders 5 process steps', () => {
    render(<Process />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings).toHaveLength(5);
  });

  it('renders step titles: Inquiry, Consult, Stencil, Session, Aftercare', () => {
    render(<Process />);
    const h3s = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(h3s).toContain('Inquiry');
    expect(h3s).toContain('Consult');
    expect(h3s).toContain('Stencil');
    expect(h3s).toContain('Session');
    expect(h3s).toContain('Aftercare');
  });

  it('renders the ordered list', () => {
    render(<Process />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders step numbers 01 and 05', () => {
    render(<Process />);
    expect(screen.getAllByText('01').length).toBeGreaterThan(0);
    expect(screen.getAllByText('05').length).toBeGreaterThan(0);
  });
});
