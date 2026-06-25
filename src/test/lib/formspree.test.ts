import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitToFormspree } from '@/lib/formspree';

describe('submitToFormspree', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns ok:true on a 200 response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }));
    const result = await submitToFormspree('test-id', new FormData());
    expect(result).toEqual({ ok: true });
  });

  it('POSTs to the correct Formspree endpoint', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', mockFetch);
    await submitToFormspree('abc123', new FormData());
    expect(mockFetch).toHaveBeenCalledWith(
      'https://formspree.io/f/abc123',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('sends Accept: application/json header', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', mockFetch);
    await submitToFormspree('abc123', new FormData());
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ headers: { Accept: 'application/json' } })
    );
  });

  it('returns ok:false with error message on non-ok response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ errors: [{ message: 'Invalid email' }] }),
    }));
    const result = await submitToFormspree('test-id', new FormData());
    expect(result.ok).toBe(false);
    expect(result.error).toBe('Invalid email');
  });

  it('falls back to default error when no errors array in response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    }));
    const result = await submitToFormspree('test-id', new FormData());
    expect(result.ok).toBe(false);
    expect(result.error).toContain('did not send');
  });

  it('returns connection error message when fetch throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));
    const result = await submitToFormspree('test-id', new FormData());
    expect(result.ok).toBe(false);
    expect(result.error).toContain('Connection failed');
  });
});
