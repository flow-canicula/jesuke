import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

const items = [
  { name: 'Jesuke', href: '/' },
  { name: 'Work', href: '/work' },
];

describe('Breadcrumbs', () => {
  it('renders a navigation landmark with aria-label', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
  });

  it('renders an ordered list', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders a link for non-last items', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole('link', { name: 'Jesuke' })).toBeInTheDocument();
  });

  it('renders a span for the last item (current page)', () => {
    render(<Breadcrumbs items={items} />);
    const current = screen.getByText('Work');
    expect(current.tagName).toBe('SPAN');
    expect(current).toHaveAttribute('aria-current', 'page');
  });

  it('renders separator between items', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText('/')).toBeInTheDocument();
  });

  it('renders single item without separator', () => {
    render(<Breadcrumbs items={[{ name: 'Jesuke', href: '/' }]} />);
    expect(screen.queryByText('/')).not.toBeInTheDocument();
  });

  it('link href is correct', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole('link', { name: 'Jesuke' })).toHaveAttribute('href', '/');
  });
});
