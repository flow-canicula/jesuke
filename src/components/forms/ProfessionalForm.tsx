'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitToFormspree, type FormStatus } from '@/lib/formspree';
import { Honeypot } from './Honeypot';
import { FieldError } from './FieldError';

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_TRADE_ID ?? '';

const INQUIRY_TYPES = [
  'Collaboration',
  'Flash licensing',
  'Press / editorial',
  'Other',
] as const;

export function ProfessionalForm() {
  const router = useRouter();
  const [status, setStatus] = useState<FormStatus>({ kind: 'idle' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(data: FormData): Record<string, string> {
    const e: Record<string, string> = {};
    if (!data.get('name')) e['name'] = 'Name is required.';
    if (!data.get('email')) e['email'] = 'Email address is required.';
    if (!data.get('inquiry_type')) e['inquiry_type'] = 'Select an inquiry type.';
    if (!data.get('message')) e['message'] = 'A brief message helps us triage the inquiry.';
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
      router.push('/professional/thanks');
    } else {
      setStatus({
        kind: 'error',
        message:
          result.error ??
          'That did not send. Check your details and try again, or message on Facebook.',
      });
    }
  }

  /* Underline field on ink register — bottom rule only, brightens on focus */
  const fieldClass =
    'w-full bg-transparent border-0 border-b text-ink-100 px-0 py-3 text-sm focus:outline-none transition-colors placeholder:opacity-25';
  const fieldStyle = { borderColor: 'rgba(185,183,176,0.25)' };
  const labelClass = 'block eyebrow mb-1';
  const labelStyle = { color: 'var(--color-ink-100)', opacity: 0.4, fontSize: '0.65rem', letterSpacing: '0.18em' };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Professional inquiry">
      <Honeypot />

      <div className="space-y-10">
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelClass} style={labelStyle}>
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

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass} style={labelStyle}>
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

        {/* Organisation */}
        <div>
          <label htmlFor="organisation" className={labelClass} style={labelStyle}>
            Organisation / studio
          </label>
          <input
            id="organisation"
            name="organisation"
            type="text"
            maxLength={200}
            autoComplete="organization"
            className={fieldClass}
            style={fieldStyle}
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className={labelClass} style={labelStyle}>
            Your role
          </label>
          <input
            id="role"
            name="role"
            type="text"
            maxLength={100}
            autoComplete="organization-title"
            className={fieldClass}
            style={fieldStyle}
          />
        </div>

        {/* Inquiry type */}
        <div>
          <label htmlFor="inquiry_type" className={labelClass} style={labelStyle}>
            Inquiry type <span aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <select
              id="inquiry_type"
              name="inquiry_type"
              required
              className={fieldClass}
              style={{ ...fieldStyle, appearance: 'none', cursor: 'pointer', paddingRight: '2rem' }}
              aria-describedby={errors['inquiry_type'] ? 'err-inquiry-type' : undefined}
              aria-invalid={!!errors['inquiry_type']}
            >
              <option value="">Select type</option>
              {INQUIRY_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center" aria-hidden="true" style={{ color: 'var(--color-ink-100)', opacity: 0.3 }}>
              ↓
            </span>
          </div>
          <FieldError id="err-inquiry-type" message={errors['inquiry_type']} />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className={labelClass} style={labelStyle}>
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            maxLength={3000}
            rows={5}
            className={fieldClass}
            style={{ ...fieldStyle, resize: 'none' }}
            aria-describedby={errors['message'] ? 'err-message' : undefined}
            aria-invalid={!!errors['message']}
          />
          <FieldError id="err-message" message={errors['message']} />
        </div>

        {/* Links */}
        <div>
          <label htmlFor="links" className={labelClass} style={labelStyle}>
            Relevant links (optional)
          </label>
          <textarea
            id="links"
            name="links"
            maxLength={1000}
            rows={2}
            placeholder="Studio website, event page, social…"
            className={fieldClass}
            style={{ ...fieldStyle, resize: 'none' }}
          />
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(185,183,176,0.1)' }} aria-hidden="true" />

        {/* Live submit status */}
        <div aria-live="polite" aria-atomic="true" className="min-h-[1.5rem]">
          {status.kind === 'error' && (
            <p className="text-seal text-sm">{status.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status.kind === 'submitting'}
          className="group inline-flex items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span
            className="inline-flex items-center justify-center w-10 h-10 border transition-colors"
            style={{ borderColor: 'var(--color-paper-50)', background: 'var(--color-paper-50)' }}
            aria-hidden="true"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="var(--color-ink-900)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span
            className="eyebrow tracking-widest"
            style={{ color: 'var(--color-ink-100)', fontSize: '0.7rem', letterSpacing: '0.2em' }}
          >
            {status.kind === 'submitting' ? 'Sending…' : 'Send professional inquiry'}
          </span>
        </button>
      </div>
    </form>
  );
}
