import { describe, it, expect } from 'vitest';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SOCIAL, NAV_LINKS, OG_DEFAULTS } from '@/content/site';

describe('site constants', () => {
  it('SITE_NAME is Jesuke', () => {
    expect(SITE_NAME).toBe('Jesuke');
  });

  it('SITE_URL is a valid URL', () => {
    expect(() => new URL(SITE_URL)).not.toThrow();
  });

  it('SITE_DESCRIPTION is non-empty', () => {
    expect(SITE_DESCRIPTION.length).toBeGreaterThan(10);
  });

  it('SITE_DESCRIPTION contains anime and Philippines', () => {
    expect(SITE_DESCRIPTION.toLowerCase()).toContain('anime');
    expect(SITE_DESCRIPTION.toLowerCase()).toContain('philippines');
  });

  it('SOCIAL has instagram and facebook', () => {
    expect(SOCIAL.instagram).toContain('instagram.com');
    expect(SOCIAL.facebook).toContain('facebook.com');
  });

  it('SOCIAL does not expose a real name', () => {
    expect(SOCIAL.instagramHandle).toContain('jesuke');
  });

  it('NAV_LINKS includes Work, Commission, Professional', () => {
    const hrefs = NAV_LINKS.map((l) => l.href);
    expect(hrefs).toContain('/work');
    expect(hrefs).toContain('/booking');
    expect(hrefs).toContain('/professional');
  });

  it('OG_DEFAULTS image points to og-image.jpg', () => {
    expect(OG_DEFAULTS.image).toContain('og-image.jpg');
  });

  it('OG_DEFAULTS dimensions are 1200x630', () => {
    expect(OG_DEFAULTS.imageWidth).toBe(1200);
    expect(OG_DEFAULTS.imageHeight).toBe(630);
  });
});
