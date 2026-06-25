import { describe, it, expect } from 'vitest';
import { FAQ } from '@/content/faq';

describe('FAQ', () => {
  it('has at least 4 entries', () => {
    expect(FAQ.length).toBeGreaterThanOrEqual(4);
  });

  it('every entry has id, question, and answer', () => {
    for (const entry of FAQ) {
      expect(entry.id).toBeTruthy();
      expect(entry.question).toBeTruthy();
      expect(entry.answer).toBeTruthy();
    }
  });

  it('all ids are unique', () => {
    const ids = FAQ.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('questions end with a question mark', () => {
    for (const entry of FAQ) {
      expect(entry.question.trim()).toMatch(/\?$/);
    }
  });

  it('answers are non-trivially long (at least 20 chars)', () => {
    for (const entry of FAQ) {
      expect(entry.answer.length).toBeGreaterThanOrEqual(20);
    }
  });
});
