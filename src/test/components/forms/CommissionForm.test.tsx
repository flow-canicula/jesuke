import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommissionForm } from '@/components/forms/CommissionForm';

vi.mock('@/lib/formspree', () => ({
  submitToFormspree: vi.fn(),
}));

import { submitToFormspree } from '@/lib/formspree';

describe('CommissionForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form with accessible label', () => {
    render(<CommissionForm />);
    expect(screen.getByRole('form', { name: 'Commission inquiry' })).toBeInTheDocument();
  });

  it('renders Name and Email fields', () => {
    render(<CommissionForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<CommissionForm />);
    expect(screen.getByRole('button', { name: /send commission inquiry/i })).toBeInTheDocument();
  });

  it('renders the honeypot field', () => {
    const { container } = render(<CommissionForm />);
    expect(container.querySelector('input[name="_gotcha"]')).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    render(<CommissionForm />);
    fireEvent.click(screen.getByRole('button', { name: /send commission inquiry/i }));
    await waitFor(() => {
      expect(screen.getByText('Name is required.')).toBeInTheDocument();
      expect(screen.getByText('Email address is required.')).toBeInTheDocument();
    });
  });

  it('shows idea validation error on empty submit', async () => {
    render(<CommissionForm />);
    fireEvent.click(screen.getByRole('button', { name: /send commission inquiry/i }));
    await waitFor(() => {
      expect(screen.getByText('Describe your idea so we can respond meaningfully.')).toBeInTheDocument();
    });
  });

  it('shows consent error when consent not checked', async () => {
    render(<CommissionForm />);
    fireEvent.click(screen.getByRole('button', { name: /send commission inquiry/i }));
    await waitFor(() => {
      expect(screen.getByText(/confirm your consent/i)).toBeInTheDocument();
    });
  });

  it('does not call submitToFormspree when validation fails', async () => {
    render(<CommissionForm />);
    fireEvent.click(screen.getByRole('button', { name: /send commission inquiry/i }));
    await waitFor(() => {
      expect(submitToFormspree).not.toHaveBeenCalled();
    });
  });

  it('shows "Sending…" label on submit button while submitting', async () => {
    // Use a promise that never resolves to freeze the submitting state
    vi.mocked(submitToFormspree).mockReturnValue(new Promise(() => {}));
    const user = userEvent.setup();
    render(<CommissionForm />);

    await user.type(screen.getByLabelText(/^name/i), 'John');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/describe your idea/i), 'A wind-swept swordsman');
    await user.click(screen.getByRole('checkbox'));

    // Override FormData.get so validation passes for size
    const origGet = FormData.prototype.get;
    FormData.prototype.get = function (key: string) {
      if (key === 'size') return 'Matchbox — under 5 cm';
      return origGet.call(this, key);
    };

    fireEvent.submit(screen.getByRole('form', { name: 'Commission inquiry' }));
    FormData.prototype.get = origGet;

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
    });
  });

  it('shows error message on failed submission', async () => {
    vi.mocked(submitToFormspree).mockResolvedValue({ ok: false, error: 'Server error occurred.' });
    const user = userEvent.setup();
    render(<CommissionForm />);

    await user.type(screen.getByLabelText(/^name/i), 'John');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/describe your idea/i), 'A wind-swept swordsman');
    await user.click(screen.getByRole('checkbox'));

    const origGet = FormData.prototype.get;
    FormData.prototype.get = function (key: string) {
      if (key === 'size') return 'Matchbox — under 5 cm';
      return origGet.call(this, key);
    };

    fireEvent.submit(screen.getByRole('form', { name: 'Commission inquiry' }));
    FormData.prototype.get = origGet;

    await waitFor(() => {
      expect(screen.getByText('Server error occurred.')).toBeInTheDocument();
    });
  });

  it('has aria-live region for submit status', () => {
    const { container } = render(<CommissionForm />);
    expect(container.querySelector('[aria-live="polite"]')).toBeInTheDocument();
  });

  function getSizeComboboxButton() {
    // The custom combobox is a <button role="combobox"> (not the sr-only native <select>)
    return screen.getAllByRole('combobox').find(
      (el) => el.tagName === 'BUTTON'
    )!;
  }

  it('opens the size dropdown when the combobox button is clicked', () => {
    render(<CommissionForm />);
    fireEvent.click(getSizeComboboxButton());
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('selects a size option and closes the dropdown', () => {
    render(<CommissionForm />);
    const btn = getSizeComboboxButton();
    fireEvent.click(btn);
    // click the <li role="option"> inside the visible listbox (not the sr-only native <option>)
    const listbox = screen.getByRole('listbox');
    const liOption = listbox.querySelector('[role="option"]') as HTMLElement;
    fireEvent.click(liOption);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('toggles dropdown closed when combobox clicked again', () => {
    render(<CommissionForm />);
    const btn = getSizeComboboxButton();
    fireEvent.click(btn);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('marks name field as aria-invalid on error', async () => {
    render(<CommissionForm />);
    fireEvent.click(screen.getByRole('button', { name: /send commission inquiry/i }));
    await waitFor(() => {
      expect(screen.getByLabelText(/^name/i)).toHaveAttribute('aria-invalid', 'true');
    });
  });
});
