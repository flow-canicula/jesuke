'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitToFormspree, type FormStatus } from '@/lib/formspree';
import { Honeypot } from './Honeypot';
import { FieldError } from './FieldError';

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_TRADE_ID ?? '';

const INQUIRY_TYPES = [
  'Guest spot',
  'Convention / event',
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
          'That did not send. Check your details and try again, or reach out on Instagram.',
      });
    }
  }

  const fieldClass =
    'w-full bg-paper-100 border border-paper-100 text-paper-700 px-4 py-3 text-sm focus:outline-none focus:border-paper-700 transition-colors';
  const labelClass = 'block eyebrow text-paper-700 opacity-60 mb-2';

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Professional inquiry">
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

        {/* Organisation */}
        <div>
          <label htmlFor="organisation" className={labelClass}>
            Organisation / studio
          </label>
          <input
            id="organisation"
            name="organisation"
            type="text"
            maxLength={200}
            autoComplete="organization"
            className={fieldClass}
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className={labelClass}>
            Your role
          </label>
          <input
            id="role"
            name="role"
            type="text"
            maxLength={100}
            autoComplete="organization-title"
            className={fieldClass}
          />
        </div>

        {/* Inquiry type */}
        <div>
          <label htmlFor="inquiry_type" className={labelClass}>
            Inquiry type <span aria-hidden="true">*</span>
          </label>
          <select
            id="inquiry_type"
            name="inquiry_type"
            required
            className={fieldClass}
            aria-describedby={errors['inquiry_type'] ? 'err-inquiry-type' : undefined}
            aria-invalid={!!errors['inquiry_type']}
          >
            <option value="">Select type</option>
            {INQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <FieldError id="err-inquiry-type" message={errors['inquiry_type']} />
        </div>

        {/* Dates / location */}
        <div>
          <label htmlFor="dates" className={labelClass}>
            Dates / location
          </label>
          <input
            id="dates"
            name="dates"
            type="text"
            maxLength={300}
            placeholder="e.g. 14–16 November, Berlin"
            className={fieldClass}
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className={labelClass}>
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            maxLength={3000}
            rows={6}
            className={fieldClass}
            aria-describedby={errors['message'] ? 'err-message' : undefined}
            aria-invalid={!!errors['message']}
          />
          <FieldError id="err-message" message={errors['message']} />
        </div>

        {/* Links */}
        <div>
          <label htmlFor="links" className={labelClass}>
            Relevant links (optional)
          </label>
          <textarea
            id="links"
            name="links"
            maxLength={1000}
            rows={2}
            placeholder="Studio website, event page, social…"
            className={fieldClass}
          />
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
          {status.kind === 'submitting' ? 'Sending…' : 'Send professional inquiry'}
        </button>
      </div>
    </form>
  );
}
