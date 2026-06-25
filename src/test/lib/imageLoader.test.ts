import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('img()', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('prepends empty BASE_PATH when env var is unset', async () => {
    vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '');
    const { img } = await import('@/lib/imageLoader');
    expect(img('/work/foo.jpg')).toBe('/work/foo.jpg');
  });

  it('prepends BASE_PATH when set', async () => {
    vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '/jesuke');
    const { img } = await import('@/lib/imageLoader');
    expect(img('/work/foo.jpg')).toBe('/jesuke/work/foo.jpg');
  });

  it('passes through absolute http URLs unchanged', async () => {
    vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '/jesuke');
    const { img } = await import('@/lib/imageLoader');
    expect(img('https://example.com/img.jpg')).toBe('https://example.com/img.jpg');
  });

  it('does not double-prepend if src already starts with BASE_PATH', async () => {
    vi.stubEnv('NEXT_PUBLIC_BASE_PATH', '/jesuke');
    const { img } = await import('@/lib/imageLoader');
    expect(img('/jesuke/work/foo.jpg')).toBe('/jesuke/work/foo.jpg');
  });
});
