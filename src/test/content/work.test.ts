import { describe, it, expect } from 'vitest';
import { FLASH, FEATURED, HOME_FEATURED, CATEGORY_LABEL } from '@/content/work';
import type { WorkCategory } from '@/content/work';

describe('FLASH catalogue', () => {
  it('has at least 100 pieces', () => {
    expect(FLASH.length).toBeGreaterThanOrEqual(100);
  });

  it('every piece has required fields', () => {
    for (const piece of FLASH) {
      expect(piece.id).toBeTruthy();
      expect(piece.index).toBeTruthy();
      expect(piece.alt).toBeTruthy();
      expect(piece.image).toBeTruthy();
      expect(piece.imageWidth).toBeGreaterThan(0);
      expect(piece.imageHeight).toBeGreaterThan(0);
      expect(piece.category).toBeTruthy();
    }
  });

  it('all piece ids are unique', () => {
    const ids = FLASH.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('all piece indexes are unique', () => {
    const indexes = FLASH.map((p) => p.index);
    expect(new Set(indexes).size).toBe(indexes.length);
  });

  it('alt text does not contain franchise names (NO-FRANCHISE-NAMES)', () => {
    const forbidden = ['demon slayer', 'naruto', 'one piece', 'dragon ball'];
    for (const piece of FLASH) {
      const alt = piece.alt.toLowerCase();
      for (const name of forbidden) {
        expect(alt).not.toContain(name);
      }
    }
  });

  it('image paths start with /work/', () => {
    for (const piece of FLASH) {
      expect(piece.image).toMatch(/^\/work\//);
    }
  });
});

describe('FEATURED', () => {
  it('is a subset of FLASH', () => {
    for (const piece of FEATURED) {
      expect(FLASH.find((p) => p.id === piece.id)).toBeDefined();
    }
  });

  it('every featured piece has featured:true', () => {
    for (const piece of FEATURED) {
      expect(piece.featured).toBe(true);
    }
  });
});

describe('HOME_FEATURED', () => {
  it('has at most 12 pieces', () => {
    expect(HOME_FEATURED.length).toBeLessThanOrEqual(12);
  });

  it('leads with ragnarok-series pieces', () => {
    const firstNonRagnarok = HOME_FEATURED.findIndex((p) => p.category !== 'ragnarok-series');
    const lastRagnarok = HOME_FEATURED.map((p) => p.category).lastIndexOf('ragnarok-series');
    if (firstNonRagnarok !== -1 && lastRagnarok !== -1) {
      expect(lastRagnarok).toBeLessThan(firstNonRagnarok);
    }
  });
});

describe('CATEGORY_LABEL', () => {
  const categories: WorkCategory[] = [
    'healed', 'junji', 'waifu', 'general', 'designs',
    'stencils', 'may-oct-2025', 'old-designs', 'blade-series', 'ragnarok-series',
  ];

  it('has a label for every category', () => {
    for (const cat of categories) {
      expect(CATEGORY_LABEL[cat]).toBeTruthy();
    }
  });

  it('labels are non-empty strings', () => {
    for (const cat of categories) {
      expect(typeof CATEGORY_LABEL[cat]).toBe('string');
      expect(CATEGORY_LABEL[cat].length).toBeGreaterThan(0);
    }
  });
});
