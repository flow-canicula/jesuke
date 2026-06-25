import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Honeypot } from '@/components/forms/Honeypot';

describe('Honeypot', () => {
  it('renders a hidden input', () => {
    const { container } = render(<Honeypot />);
    const input = container.querySelector('input[name="_gotcha"]');
    expect(input).toBeInTheDocument();
  });

  it('has tabIndex of -1', () => {
    const { container } = render(<Honeypot />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.tabIndex).toBe(-1);
  });

  it('has aria-hidden="true"', () => {
    const { container } = render(<Honeypot />);
    const input = container.querySelector('input');
    expect(input?.getAttribute('aria-hidden')).toBe('true');
  });

  it('has display:none style', () => {
    const { container } = render(<Honeypot />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.style.display).toBe('none');
  });

  it('has autoComplete off', () => {
    const { container } = render(<Honeypot />);
    const input = container.querySelector('input');
    expect(input?.getAttribute('autocomplete')).toBe('off');
  });
});
