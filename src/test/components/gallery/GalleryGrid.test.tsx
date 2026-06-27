import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import type { FlashPiece } from '@/content/work';

const mockPieces: FlashPiece[] = [
  {
    id: 'healed-001',
    index: '001',
    alt: 'Healed anime blackwork tattoo',
    image: '/work/healed/fully-healed-2.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'healed',
    featured: true,
    style: 'blackwork',
    placement: 'Outer forearm',
  },
  {
    id: 'healed-002',
    index: '002',
    alt: 'Healed fine-line anime tattoo',
    image: '/work/healed/fully-healed-3.jpg',
    imageWidth: 800,
    imageHeight: 1000,
    category: 'healed',
    featured: false,
    style: 'fine-line',
  },
];

describe('GalleryGrid', () => {
  it('renders correct number of articles', () => {
    render(<GalleryGrid pieces={mockPieces} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('renders images with alt text', () => {
    render(<GalleryGrid pieces={mockPieces} />);
    expect(screen.getByAltText('Healed anime blackwork tattoo')).toBeInTheDocument();
  });

  it('renders piece index in meta strip', () => {
    render(<GalleryGrid pieces={mockPieces} />);
    expect(screen.getByText('001')).toBeInTheDocument();
  });

  it('renders category label', () => {
    render(<GalleryGrid pieces={mockPieces} />);
    expect(screen.getAllByText('Healed results').length).toBeGreaterThan(0);
  });

  it('renders style label for each piece', () => {
    render(<GalleryGrid pieces={mockPieces} />);
    expect(screen.getByText('Blackwork')).toBeInTheDocument();
    expect(screen.getByText('Fine-line')).toBeInTheDocument();
  });

  it('does not render placement labels in the card strip', () => {
    render(<GalleryGrid pieces={mockPieces} />);
    expect(screen.queryByText('Outer forearm')).not.toBeInTheDocument();
  });

  it('opens lightbox when a piece is clicked', () => {
    render(<GalleryGrid pieces={mockPieces} />);
    fireEvent.click(screen.getAllByRole('button')[0]!);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes lightbox when close button is clicked', () => {
    render(<GalleryGrid pieces={mockPieces} />);
    fireEvent.click(screen.getAllByRole('button')[0]!);
    fireEvent.click(screen.getByRole('button', { name: /close lightbox/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('prepends basePath to image src', () => {
    render(<GalleryGrid pieces={mockPieces} basePath="/jesuke" />);
    const img = screen.getByAltText('Healed anime blackwork tattoo') as HTMLImageElement;
    expect(img.src).toContain('/jesuke');
  });

  it('has list role with accessible label', () => {
    render(<GalleryGrid pieces={mockPieces} />);
    expect(screen.getByRole('list', { name: /flash catalogue/i })).toBeInTheDocument();
  });

  it('renders empty state without crashing', () => {
    const { container } = render(<GalleryGrid pieces={[]} />);
    expect(container.querySelector('[role="list"]')).toBeInTheDocument();
  });
});
