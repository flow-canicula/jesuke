'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitToFormspree, type FormStatus } from '@/lib/formspree';
import { Honeypot } from './Honeypot';
import { FieldError } from './FieldError';

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_COMMISSION_ID ?? '';

const SIZE_OPTIONS = [
  'Matchbox (under 5 cm)',
  'Palm-sized (5–10 cm)',
  'Fist-sized (10–15 cm)',
  'Forearm (15–25 cm)',
  'Quarter sleeve',
  'Half sleeve',
  'Full sleeve',
  'Other',
] as const;

const BUDGET_OPTIONS = [
  'Under €200',
  '€200–€400',
  '€400–€700',
  '€700–€1000',
  'Over €1000 / multi-session',
  'Not sure yet',
] as const;

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
          'That did not send. Check your details and try again, or reach out on Instagram.',
      });
    }
  }

  const fieldClass =
    'w-full bg-paper-100 border border-paper-100 text-paper-700 px-4 py-3 text-sm focus:outline-none focus:border-paper-700 transition-colors';
  const labelClass = 'block eyebrow text-paper-700 opacity-60 mb-2';

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Commission inquiry">
      <Honeypot />

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className={labelClass}>
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
            aria-describedby={errors['name'] ? 'err-name' : undefined}
            aria-invalid={!!errors['name']}
          />
          <FieldError id="err-name" message={errors['name']} />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={labelClass}>
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
            aria-describedby={errors['email'] ? 'err-email' : undefined}
            aria-invalid={!!errors['email']}
          />
          <FieldError id="err-email" message={errors['email']} />
        </div>

        {/* Messaging handle (optional) */}
        <div>
          <label htmlFor="handle" className={labelClass}>
            Instagram / messaging handle (optional)
          </label>
          <input
            id="handle"
            name="handle"
            type="text"
            maxLength={100}
            autoComplete="off"
            className={fieldClass}
          />
        </div>

        {/* Idea / description */}
        <div>
          <label htmlFor="idea" className={labelClass}>
            Describe your idea <span aria-hidden="true">*</span>
          </label>
          <p id="idea-hint" className="text-paper-700 opacity-50 text-xs mb-2">
            Describe the mood and feel — no need to name a specific title or character.
          </p>
          <textarea
            id="idea"
            name="idea"
            required
            maxLength={2000}
            rows={5}
            className={fieldClass}
            aria-describedby={`idea-hint${errors['idea'] ? ' err-idea' : ''}`}
            aria-invalid={!!errors['idea']}
          />
          <FieldError id="err-idea" message={errors['idea']} />
        </div>

        {/* Size */}
        <div>
          <label htmlFor="size" className={labelClass}>
            Approximate size <span aria-hidden="true">*</span>
          </label>
          <select
            id="size"
            name="size"
            required
            className={fieldClass}
            aria-describedby={errors['size'] ? 'err-size' : undefined}
            aria-invalid={!!errors['size']}
          >
            <option value="">Select size</option>
            {SIZE_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <FieldError id="err-size" message={errors['size']} />
        </div>

        {/* Placement */}
        <div>
          <label htmlFor="placement" className={labelClass}>
            Body placement
          </label>
          <input
            id="placement"
            name="placement"
            type="text"
            maxLength={200}
            placeholder="e.g. outer forearm, shoulder, calf"
            className={fieldClass}
          />
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget range
          </label>
          <select id="budget" name="budget" className={fieldClass}>
            <option value="">Prefer not to say</option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Availability */}
        <div>
          <label htmlFor="availability" className={labelClass}>
            Availability / preferred dates
          </label>
          <input
            id="availability"
            name="availability"
            type="text"
            maxLength={300}
            placeholder="e.g. weekends from September, flexible"
            className={fieldClass}
          />
        </div>

        {/* Reference links */}
        <div>
          <label htmlFor="references" className={labelClass}>
            Reference links (optional)
          </label>
          <p id="ref-hint" className="text-paper-700 opacity-50 text-xs mb-2">
            Paste image URLs here — do not upload files.
          </p>
          <textarea
            id="references"
            name="references"
            maxLength={1000}
            rows={3}
            placeholder="https://..."
            className={fieldClass}
            aria-describedby="ref-hint"
          />
        </div>

        {/* Consent */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="consent"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className="mt-0.5 flex-shrink-0"
              aria-describedby={errors['consent'] ? 'err-consent' : undefined}
              aria-invalid={!!errors['consent']}
            />
            <span className="text-paper-700 opacity-70 text-sm leading-snug">
              I consent to Jesuke storing and using the information I submit here
              to respond to my inquiry.
            </span>
          </label>
          <FieldError id="err-consent" message={errors['consent']} />
        </div>

        {/* Live submit status */}
        <div aria-live="polite" aria-atomic="true" className="min-h-[1.5rem]">
          {status.kind === 'error' && (
            <p className="text-seal text-sm">{status.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status.kind === 'submitting'}
          className="inline-flex items-center gap-3 bg-ink-900 text-paper-50 px-8 py-4 text-sm font-body tracking-wide hover:bg-ink-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status.kind === 'submitting' ? 'Sending…' : 'Send commission inquiry'}
        </button>
      </div>
    </form>
  );
}
