import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Manifesto } from '@/components/sections/Manifesto';

describe('Manifesto', () => {
  it('renders a section landmark', () => {
    render(<Manifesto />);
    expect(screen.getByRole('region')).toBeInTheDocument();
  });

  it('renders h2 heading', () => {
    render(<Manifesto />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('heading text contains "in skin"', () => {
    render(<Manifesto />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2.textContent?.toLowerCase()).toContain('in skin');
  });

  it('renders body paragraph text', () => {
    render(<Manifesto />);
    // at least two paragraphs of content
    const paras = screen.getAllByText(/.+/, { selector: 'p' });
    expect(paras.length).toBeGreaterThanOrEqual(2);
  });

  it('renders the eyebrow label', () => {
    render(<Manifesto />);
    // CharReveal renders each char as a span; the wrapper span has aria-label
    expect(screen.getByLabelText('The practice')).toBeInTheDocument();
  });
});
