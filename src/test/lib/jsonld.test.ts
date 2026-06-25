import { describe, it, expect } from 'vitest';
import {
  buildPersonSchema,
  buildWebSiteSchema,
  buildServiceSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from '@/lib/jsonld';

describe('buildPersonSchema', () => {
  it('returns @type Person', () => {
    expect(buildPersonSchema()['@type']).toBe('Person');
  });

  it('uses Jesuke as name', () => {
    expect(buildPersonSchema().name).toBe('Jesuke');
  });

  it('includes sameAs array with social links', () => {
    const schema = buildPersonSchema();
    expect(Array.isArray(schema.sameAs)).toBe(true);
    expect((schema.sameAs as string[]).some((s) => s.includes('instagram'))).toBe(true);
    expect((schema.sameAs as string[]).some((s) => s.includes('facebook'))).toBe(true);
  });

  it('does not expose a real name or face', () => {
    const json = JSON.stringify(buildPersonSchema());
    expect(json.toLowerCase()).not.toContain('real name');
  });
});

describe('buildWebSiteSchema', () => {
  it('returns @type WebSite', () => {
    expect(buildWebSiteSchema()['@type']).toBe('WebSite');
  });

  it('has a url field', () => {
    expect(typeof buildWebSiteSchema().url).toBe('string');
  });
});

describe('buildServiceSchema', () => {
  it('returns @type Service', () => {
    expect(buildServiceSchema()['@type']).toBe('Service');
  });

  it('url points to /booking', () => {
    expect(buildServiceSchema().url as string).toContain('/booking');
  });

  it('provider is Jesuke', () => {
    const provider = buildServiceSchema().provider as Record<string, unknown>;
    expect(provider.name).toBe('Jesuke');
  });
});

describe('buildFaqSchema', () => {
  const fakeEntries = [
    { id: 'color', question: 'Do you do color?', answer: 'Blackwork and fine-line only.' },
    { id: 'location', question: 'Where are you based?', answer: 'Bulacan, Philippines.' },
  ];

  it('returns @type FAQPage', () => {
    expect(buildFaqSchema(fakeEntries)['@type']).toBe('FAQPage');
  });

  it('maps each entry to a Question entity', () => {
    const schema = buildFaqSchema(fakeEntries);
    const entities = schema.mainEntity as Array<Record<string, unknown>>;
    expect(entities).toHaveLength(2);
    expect(entities[0]?.['@type']).toBe('Question');
    expect(entities[0]?.name).toBe('Do you do color?');
  });

  it('wraps answer in acceptedAnswer', () => {
    const schema = buildFaqSchema(fakeEntries);
    const first = (schema.mainEntity as Array<Record<string, unknown>>)[0];
    const answer = first?.acceptedAnswer as Record<string, unknown>;
    expect(answer?.['@type']).toBe('Answer');
    expect(answer?.text).toBe('Blackwork and fine-line only.');
  });

  it('returns empty mainEntity for empty input', () => {
    const schema = buildFaqSchema([]);
    expect((schema.mainEntity as unknown[]).length).toBe(0);
  });
});

describe('buildBreadcrumbSchema', () => {
  const items = [
    { name: 'Jesuke', href: '/' },
    { name: 'Work', href: '/work' },
  ];

  it('returns @type BreadcrumbList', () => {
    expect(buildBreadcrumbSchema(items)['@type']).toBe('BreadcrumbList');
  });

  it('assigns correct 1-based positions', () => {
    const list = buildBreadcrumbSchema(items).itemListElement as Array<Record<string, unknown>>;
    expect(list[0]?.position).toBe(1);
    expect(list[1]?.position).toBe(2);
  });

  it('builds full URLs for each item', () => {
    const list = buildBreadcrumbSchema(items).itemListElement as Array<Record<string, unknown>>;
    expect(list[1]?.item as string).toContain('/work');
  });
});
