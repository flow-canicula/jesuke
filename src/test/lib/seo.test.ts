import { describe, it, expect } from 'vitest';
import { buildMetadata } from '@/lib/seo';

describe('buildMetadata', () => {
  it('uses site name as title when no title provided', () => {
    const meta = buildMetadata({ canonical: '/' });
    expect(meta.title).toBe('Jesuke');
  });

  it('appends site name to page title', () => {
    const meta = buildMetadata({ title: 'Work', canonical: '/work' });
    expect(meta.title).toBe('Work — Jesuke');
  });

  it('sets canonical URL', () => {
    const meta = buildMetadata({ canonical: '/work' });
    const canonical = (meta.alternates as Record<string, unknown>)?.canonical as string;
    expect(canonical).toContain('/work');
  });

  it('uses provided description', () => {
    const meta = buildMetadata({ canonical: '/', description: 'Custom description' });
    expect(meta.description).toBe('Custom description');
  });

  it('falls back to site description when none provided', () => {
    const meta = buildMetadata({ canonical: '/' });
    expect(typeof meta.description).toBe('string');
    expect((meta.description as string).length).toBeGreaterThan(0);
  });

  it('includes openGraph images', () => {
    const meta = buildMetadata({ canonical: '/' });
    const og = meta.openGraph as Record<string, unknown>;
    expect(Array.isArray(og?.images)).toBe(true);
  });

  it('uses custom ogImage when provided', () => {
    const meta = buildMetadata({ canonical: '/', ogImage: '/og/custom.jpg' });
    const og = meta.openGraph as Record<string, unknown>;
    const images = og?.images as Array<Record<string, unknown>>;
    expect(images[0]?.url).toContain('/og/custom.jpg');
  });

  it('sets twitter card to summary_large_image', () => {
    const meta = buildMetadata({ canonical: '/' });
    const twitter = meta.twitter as Record<string, unknown>;
    expect(twitter?.card).toBe('summary_large_image');
  });

  it('sets noindex robots when noIndex is true', () => {
    const meta = buildMetadata({ canonical: '/thanks', noIndex: true });
    const robots = meta.robots as Record<string, unknown>;
    expect(robots?.index).toBe(false);
    expect(robots?.follow).toBe(true);
  });

  it('sets index:true robots by default', () => {
    const meta = buildMetadata({ canonical: '/' });
    const robots = meta.robots as Record<string, unknown>;
    expect(robots?.index).toBe(true);
  });

  it('includes keywords when provided', () => {
    const meta = buildMetadata({ canonical: '/', keywords: ['anime tattoo', 'manga tattoo'] });
    expect(meta.keywords).toEqual(['anime tattoo', 'manga tattoo']);
  });

  it('omits keywords field when not provided', () => {
    const meta = buildMetadata({ canonical: '/' });
    expect(meta.keywords).toBeUndefined();
  });
});
