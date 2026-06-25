import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FieldError } from '@/components/forms/FieldError';

describe('FieldError', () => {
  it('renders nothing when message is undefined', () => {
    const { container } = render(<FieldError id="err-name" message={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when message is empty string', () => {
    const { container } = render(<FieldError id="err-name" message="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the error message when provided', () => {
    render(<FieldError id="err-name" message="Name is required." />);
    expect(screen.getByText('Name is required.')).toBeInTheDocument();
  });

  it('has role="alert"', () => {
    render(<FieldError id="err-email" message="Email is required." />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses the provided id', () => {
    render(<FieldError id="err-email" message="Email is required." />);
    expect(document.getElementById('err-email')).toBeInTheDocument();
  });
});
