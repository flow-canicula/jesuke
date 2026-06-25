import { describe, it, expect } from 'vitest';
import { t } from '@/lib/messages';

describe('messages', () => {
  it('exports a t object', () => {
    expect(t).toBeDefined();
    expect(typeof t).toBe('object');
  });

  it('has flashIndex section', () => {
    expect(t.flashIndex).toBeDefined();
    expect(typeof t.flashIndex.eyebrow).toBe('string');
    expect(typeof t.flashIndex.heading).toBe('string');
  });
});
