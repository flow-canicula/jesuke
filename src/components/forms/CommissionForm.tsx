'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitToFormspree, type FormStatus } from '@/lib/formspree';
import { Honeypot } from './Honeypot';
import { FieldError } from './FieldError';

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_COMMISSION_ID ?? '';

const SIZE_OPTIONS = [
  'Matchbox — under 5 cm',
  'Palm-sized — 5–10 cm',
  'Fist-sized — 10–15 cm',
  'Forearm — 15–25 cm',
  'Quarter sleeve',
  'Half sleeve',
  'Full sleeve',
  'Other',
] as const;

const BUDGET_OPTIONS = [
  '₱1,500–₱3,000 (flash)',
  '₱3,000–₱8,000',
  '₱8,000–₱15,000',
  '₱15,000–₱30,000',
  'Over ₱30,000 / multi-session',
  'Not sure yet',
] as const;

type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  options: readonly string[];
  placeholder: string;
  error?: string;
  errorId?: string;
};

function SelectField({ id, name, label, required, options, placeholder, error, errorId }: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const labelStyle: React.CSSProperties = {
    color: 'var(--color-paper-700)',
    opacity: 0.45,
    fontSize: '0.65rem',
    letterSpacing: '0.18em',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '0.25rem',
  };

  return (
    <div>
      <label htmlFor={id} style={labelStyle}>
        {label}{required && <span aria-hidden="true"> *</span>}
      </label>

      {/* Hidden native select for form submission */}
      <select
        id={id}
        name={name}
        required={required}
        value={selected}
        onChange={() => {}}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={!!error}
        className="sr-only"
        tabIndex={-1}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>

      {/* Custom trigger */}
      <div className="relative">
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={`${id}-listbox`}
          aria-labelledby={id}
          onClick={() => setOpen((v) => !v)}
          className="w-full text-left flex items-center justify-between py-3 border-0 border-b bg-transparent transition-colors focus:outline-none"
          style={{
            borderColor: error ? 'var(--color-seal)' : 'var(--color-paper-700)',
            color: selected ? 'var(--color-paper-700)' : 'var(--color-paper-700)',
          }}
        >
          <span
            className="text-sm"
            style={{
              opacity: selected ? 0.85 : 0.28,
              fontFamily: 'var(--font-body)',
            }}
          >
            {selected || placeholder}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            style={{
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
              opacity: 0.35,
              flexShrink: 0,
            }}
          >
            <path d="M2 4l4 4 4-4" stroke="var(--color-paper-700)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Dropdown panel */}
        {open && (
          <ul
            id={`${id}-listbox`}
            role="listbox"
            aria-label={label}
            className="absolute left-0 right-0 top-full z-20 border-t-0 overflow-hidden"
            style={{
              background: 'var(--color-paper-50)',
              border: '1px solid var(--color-paper-100)',
              borderTop: 'none',
              boxShadow: '0 8px 32px rgba(11,11,13,0.12)',
            }}
          >
            {options.map((opt) => (
              <li
                key={opt}
                role="option"
                aria-selected={selected === opt}
                className="cursor-pointer text-sm transition-colors"
                style={{
                  padding: '0.75rem 1rem',
                  color: 'var(--color-paper-700)',
                  opacity: selected === opt ? 1 : 0.65,
                  background: selected === opt ? 'var(--color-paper-100)' : 'transparent',
                  borderLeft: selected === opt ? '2px solid var(--color-seal)' : '2px solid transparent',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={(e) => {
                  if (selected !== opt) {
                    (e.currentTarget as HTMLElement).style.background = 'var(--color-paper-100)';
                    (e.currentTarget as HTMLElement).style.opacity = '0.9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selected !== opt) {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.opacity = '0.65';
                  }
                }}
                onClick={() => {
                  setSelected(opt);
                  // sync native select
                  const native = document.getElementById(id) as HTMLSelectElement | null;
                  if (native) {
                    native.value = opt;
                    native.dispatchEvent(new Event('change', { bubbles: true }));
                  }
                  setOpen(false);
                }}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && errorId && <FieldError id={errorId} message={error} />}
    </div>
  );
}

export function CommissionForm() {
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>({ kind: 'idle' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consentChecked, setConsentChecked] = useState(false);

  function validate(data: FormData): Record<string, string> {
    const e: Record<string, string> = {};
    if (!data.get('name')) e['name'] = 'Name is required.';
    if (!data.get('email')) e['email'] = 'Email address is required.';
    if (!data.get('idea')) e['idea'] = 'Describe your idea so we can respond meaningfully.';
    if (!data.get('size')) e['size'] = 'Approximate size helps with the quote.';
    if (!consentChecked) e['consent'] = 'Please confirm your consent to continue.';
    return e;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const fieldErrors = validate(data);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    setStatus({ kind: 'submitting' });
    const result = await submitToFormspree(FORM_ID, data);

    if (result.ok) {
      router.push('/booking/thanks');
    } else {
      setStatus({
        kind: 'error',
        message:
          result.error ??
          'That did not send. Check your details and try again, or message on Facebook.',
      });
    }
  }

  const fieldClass =
    'w-full bg-transparent border-0 border-b text-sm px-0 py-3 focus:outline-none transition-colors placeholder:opacity-30';
  const fieldStyle: React.CSSProperties = { borderColor: 'var(--color-paper-700)', color: 'var(--color-paper-700)' };
  const labelStyle: React.CSSProperties = {
    color: 'var(--color-paper-700)',
    opacity: 0.45,
    fontSize: '0.65rem',
    letterSpacing: '0.18em',
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Commission inquiry">
      <Honeypot />

      <div className="space-y-10">

        {/* ── Row: Name + Email ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
          <div>
            <label htmlFor="name" className="block eyebrow mb-1" style={labelStyle}>
              Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={100}
              autoComplete="name"
              className={fieldClass}
              style={fieldStyle}
              aria-describedby={errors['name'] ? 'err-name' : undefined}
              aria-invalid={!!errors['name']}
            />
            <FieldError id="err-name" message={errors['name']} />
          </div>

          <div>
            <label htmlFor="email" className="block eyebrow mb-1" style={labelStyle}>
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={200}
              autoComplete="email"
              className={fieldClass}
              style={fieldStyle}
              aria-describedby={errors['email'] ? 'err-email' : undefined}
              aria-invalid={!!errors['email']}
            />
            <FieldError id="err-email" message={errors['email']} />
          </div>
        </div>

        {/* Facebook / Instagram handle */}
        <div>
          <label htmlFor="handle" className="block eyebrow mb-1" style={labelStyle}>
            Facebook / Instagram handle <span style={{ opacity: 0.5 }}>(optional)</span>
          </label>
          <input
            id="handle"
            name="handle"
            type="text"
            maxLength={100}
            autoComplete="off"
            className={fieldClass}
            style={fieldStyle}
          />
        </div>

        {/* Idea / description */}
        <div>
          <label htmlFor="idea" className="block eyebrow mb-1" style={labelStyle}>
            Describe your idea <span aria-hidden="true">*</span>
          </label>
          <p
            id="idea-hint"
            style={{ color: 'var(--color-paper-700)', opacity: 0.4, fontSize: '0.72rem', marginBottom: '0.5rem', lineHeight: 1.6 }}
          >
            Anime, manga, and manhwa subjects only. Blackwork, fine-line, or restrained color — no portrait style. Describe the mood and feel; no need to name a specific title or character.
          </p>
          <textarea
            id="idea"
            name="idea"
            required
            maxLength={2000}
            rows={4}
            className={fieldClass}
            style={{ ...fieldStyle, resize: 'none' }}
            aria-describedby={`idea-hint${errors['idea'] ? ' err-idea' : ''}`}
            aria-invalid={!!errors['idea']}
          />
          <FieldError id="err-idea" message={errors['idea']} />
        </div>

        {/* ── Row: Size + Placement ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
          <SelectField
            id="size"
            name="size"
            label="Approximate size *"
            required
            options={SIZE_OPTIONS}
            placeholder="Select size"
            error={errors['size']}
            errorId="err-size"
          />

          <div>
            <label htmlFor="placement" className="block eyebrow mb-1" style={labelStyle}>
              Body placement
            </label>
            <input
              id="placement"
              name="placement"
              type="text"
              maxLength={200}
              placeholder="e.g. outer forearm, shoulder, calf"
              className={fieldClass}
              style={{ ...fieldStyle, caretColor: 'var(--color-paper-700)' }}
            />
          </div>
        </div>

        {/* Budget */}
        <SelectField
          id="budget"
          name="budget"
          label="Budget range"
          options={BUDGET_OPTIONS}
          placeholder="Prefer not to say"
        />

        {/* Availability */}
        <div>
          <label htmlFor="availability" className="block eyebrow mb-1" style={labelStyle}>
            Availability / preferred dates
          </label>
          <input
            id="availability"
            name="availability"
            type="text"
            maxLength={300}
            placeholder="e.g. weekends from September, flexible"
            className={fieldClass}
            style={fieldStyle}
          />
        </div>

        {/* Reference links */}
        <div>
          <label htmlFor="references" className="block eyebrow mb-1" style={labelStyle}>
            Reference links <span style={{ opacity: 0.5 }}>(optional)</span>
          </label>
          <p
            id="ref-hint"
            style={{ color: 'var(--color-paper-700)', opacity: 0.4, fontSize: '0.72rem', marginBottom: '0.5rem' }}
          >
            Paste image URLs — do not upload files.
          </p>
          <textarea
            id="references"
            name="references"
            maxLength={1000}
            rows={2}
            placeholder="https://..."
            className={fieldClass}
            style={{ ...fieldStyle, resize: 'none' }}
            aria-describedby="ref-hint"
          />
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'var(--color-paper-100)' }} aria-hidden="true" />

        {/* Consent */}
        <div>
          <label className="flex items-start gap-4 cursor-pointer group">
            <span
              className="mt-0.5 flex-shrink-0 w-4 h-4 border flex items-center justify-center transition-colors"
              style={{
                borderColor: consentChecked ? 'var(--color-ink-900)' : 'var(--color-paper-700)',
                background: consentChecked ? 'var(--color-ink-900)' : 'transparent',
              }}
              aria-hidden="true"
            >
              {consentChecked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                  <path d="M1 4l3 3 5-6" stroke="var(--color-paper-50)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <input
              type="checkbox"
              name="consent"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className="sr-only"
              aria-describedby={errors['consent'] ? 'err-consent' : undefined}
              aria-invalid={!!errors['consent']}
            />
            <span className="text-sm leading-relaxed" style={{ color: 'var(--color-paper-700)', opacity: 0.65 }}>
              I consent to Jesuke storing and using the information I submit here
              to respond to my inquiry.
            </span>
          </label>
          <FieldError id="err-consent" message={errors['consent']} />
        </div>

        {/* Live submit status */}
        <div aria-live="polite" aria-atomic="true" className="min-h-[1.5rem]">
          {status.kind === 'error' && (
            <p className="text-sm" style={{ color: 'var(--color-seal)' }}>{status.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status.kind === 'submitting'}
          className="group inline-flex items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span
            className="inline-flex items-center justify-center w-10 h-10 border transition-colors"
            style={{ borderColor: 'var(--color-ink-900)', background: 'var(--color-ink-900)' }}
            aria-hidden="true"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="var(--color-paper-50)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span
            className="eyebrow tracking-widest"
            style={{ color: 'var(--color-ink-900)', fontSize: '0.7rem', letterSpacing: '0.2em' }}
          >
            {status.kind === 'submitting' ? 'Sending…' : 'Send commission inquiry'}
          </span>
        </button>
      </div>
    </form>
  );
}
