export type FormStatus =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

export async function submitToFormspree(
  formId: string,
  data: FormData
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data,
    });

    if (res.ok) {
      return { ok: true };
    }

    const json = (await res.json()) as { errors?: Array<{ message: string }> };
    const message =
      json.errors?.[0]?.message ??
      'That did not send. Check your details and try again, or reach out on Instagram.';

    return { ok: false, error: message };
  } catch {
    return {
      ok: false,
      error:
        'Connection failed. Check your internet and try again, or reach out on Instagram.',
    };
  }
}
