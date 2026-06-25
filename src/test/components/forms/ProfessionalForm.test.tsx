import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProfessionalForm } from '@/components/forms/ProfessionalForm';

vi.mock('@/lib/formspree', () => ({
  submitToFormspree: vi.fn(),
}));

import { submitToFormspree } from '@/lib/formspree';

describe('ProfessionalForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form with accessible label', () => {
    render(<ProfessionalForm />);
    expect(screen.getByRole('form', { name: 'Professional inquiry' })).toBeInTheDocument();
  });

  it('renders Name, Email, and Message fields', () => {
    render(<ProfessionalForm />);
    expect(screen.getByLabelText(/^name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders inquiry type select', () => {
    render(<ProfessionalForm />);
    expect(screen.getByRole('combobox', { name: /inquiry type/i })).toBeInTheDocument();
  });

  it('renders the honeypot field', () => {
    const { container } = render(<ProfessionalForm />);
    expect(container.querySelector('input[name="_gotcha"]')).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<ProfessionalForm />);
    expect(screen.getByRole('button', { name: /send professional inquiry/i })).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    render(<ProfessionalForm />);
    fireEvent.click(screen.getByRole('button', { name: /send professional inquiry/i }));
    await waitFor(() => {
      expect(screen.getByText('Name is required.')).toBeInTheDocument();
      expect(screen.getByText('Email address is required.')).toBeInTheDocument();
      expect(screen.getByText(/select an inquiry type/i)).toBeInTheDocument();
      expect(screen.getByText(/brief message/i)).toBeInTheDocument();
    });
  });

  it('does not call submitToFormspree when validation fails', async () => {
    render(<ProfessionalForm />);
    fireEvent.click(screen.getByRole('button', { name: /send professional inquiry/i }));
    await waitFor(() => {
      expect(submitToFormspree).not.toHaveBeenCalled();
    });
  });

  it('shows error message on failed submission', async () => {
    vi.mocked(submitToFormspree).mockResolvedValue({ ok: false, error: 'Network failure.' });
    const user = userEvent.setup();
    render(<ProfessionalForm />);

    await user.type(screen.getByLabelText(/^name/i), 'Studio X');
    await user.type(screen.getByLabelText(/email/i), 'studio@example.com');
    await user.selectOptions(screen.getByRole('combobox', { name: /inquiry type/i }), 'Collaboration');
    await user.type(screen.getByLabelText(/message/i), 'We would love to collaborate.');

    fireEvent.submit(screen.getByRole('form', { name: 'Professional inquiry' }));
    await waitFor(() => {
      expect(screen.getByText('Network failure.')).toBeInTheDocument();
    });
  });

  it('has aria-live region for submit status', () => {
    const { container } = render(<ProfessionalForm />);
    expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument();
  });

  it('disables submit while submitting', async () => {
    vi.mocked(submitToFormspree).mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    render(<ProfessionalForm />);

    await user.type(screen.getByLabelText(/^name/i), 'Studio X');
    await user.type(screen.getByLabelText(/email/i), 'studio@example.com');
    await user.selectOptions(screen.getByRole('combobox', { name: /inquiry type/i }), 'Collaboration');
    await user.type(screen.getByLabelText(/message/i), 'We would love to collaborate.');

    const btn = screen.getByRole('button', { name: /send professional inquiry/i });
    fireEvent.click(btn);
    expect(btn).toBeDisabled();
  });

  it('marks name field as aria-invalid on error', async () => {
    render(<ProfessionalForm />);
    fireEvent.click(screen.getByRole('button', { name: /send professional inquiry/i }));
    await waitFor(() => {
      expect(screen.getByLabelText(/^name/i)).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
