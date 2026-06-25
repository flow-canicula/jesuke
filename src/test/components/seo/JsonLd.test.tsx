import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { JsonLd } from '@/components/seo/JsonLd';

describe('JsonLd', () => {
  it('renders a script tag', () => {
    const { container } = render(<JsonLd schema={{ '@type': 'WebSite', name: 'Jesuke' }} />);
    expect(container.querySelector('script')).toBeInTheDocument();
  });

  it('sets type to application/ld+json', () => {
    const { container } = render(<JsonLd schema={{ '@type': 'WebSite' }} />);
    expect(container.querySelector('script')?.getAttribute('type')).toBe('application/ld+json');
  });

  it('serializes a single schema object', () => {
    const schema = { '@type': 'WebSite', name: 'Jesuke', url: 'https://www.jesuke.ink' };
    const { container } = render(<JsonLd schema={schema} />);
    const content = container.querySelector('script')?.innerHTML ?? '';
    expect(JSON.parse(content)).toEqual(schema);
  });

  it('serializes an array of schemas', () => {
    const schemas = [
      { '@type': 'WebSite', name: 'Jesuke' },
      { '@type': 'Person', name: 'Jesuke' },
    ];
    const { container } = render(<JsonLd schema={schemas} />);
    const content = container.querySelector('script')?.innerHTML ?? '';
    expect(JSON.parse(content)).toEqual(schemas);
  });
});
