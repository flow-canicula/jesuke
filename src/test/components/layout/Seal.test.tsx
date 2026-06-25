import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Seal } from '@/components/layout/Seal';

describe('Seal', () => {
  it('renders an SVG', () => {
    const { container } = render(<Seal />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('is aria-hidden (decorative)', () => {
    const { container } = render(<Seal />);
    expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('uses default size of 48', () => {
    const { container } = render(<Seal />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('48');
    expect(svg?.getAttribute('height')).toBe('48');
  });

  it('respects custom size prop', () => {
    const { container } = render(<Seal size={32} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('32');
    expect(svg?.getAttribute('height')).toBe('32');
  });

  it('applies custom className', () => {
    const { container } = render(<Seal className="my-class" />);
    expect(container.querySelector('svg')?.classList.contains('my-class')).toBe(true);
  });

  it('renders the outer circle', () => {
    const { container } = render(<Seal />);
    expect(container.querySelector('circle')).toBeInTheDocument();
  });
});
