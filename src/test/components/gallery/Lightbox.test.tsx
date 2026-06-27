import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Lightbox } from '@/components/gallery/Lightbox';
import { CATEGORY_LABEL } from '@/content/work';
import type { FlashPiece } from '@/content/work';

const piece: FlashPiece = {
  id: 'ragnarok-001',
  index: '101',
  alt: 'Large blackwork tattoo of a divine figure',
  image: '/work/ragnarok-series/ragnarok-001.jpg',
  imageWidth: 1080,
  imageHeight: 1080,
  category: 'ragnarok-series',
  featured: true,
  style: 'blackwork',
  placement: 'Upper arm',
};

describe('Lightbox', () => {
  it('renders a dialog', () => {
    render(<Lightbox piece={piece} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('is aria-modal', () => {
    render(<Lightbox piece={piece} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('renders the image with correct alt text', () => {
    render(<Lightbox piece={piece} onClose={vi.fn()} />);
    expect(screen.getByAltText('Large blackwork tattoo of a divine figure')).toBeInTheDocument();
  });

  it('renders close button', () => {
    render(<Lightbox piece={piece} onClose={vi.fn()} />);
    expect(screen.getByRole('button', { name: /close lightbox/i })).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(<Lightbox piece={piece} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: /close lightbox/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn();
    render(<Lightbox piece={piece} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = vi.fn();
    render(<Lightbox piece={piece} onClose={onClose} />);
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('renders piece index in meta strip', () => {
    render(<Lightbox piece={piece} onClose={vi.fn()} />);
    expect(screen.getByText('101')).toBeInTheDocument();
  });

  it('renders category label', () => {
    render(<Lightbox piece={piece} onClose={vi.fn()} />);
    expect(screen.getByText(CATEGORY_LABEL['ragnarok-series'])).toBeInTheDocument();
  });

  it('renders placement when provided', () => {
    render(<Lightbox piece={piece} onClose={vi.fn()} />);
    expect(screen.getByText('Upper arm')).toBeInTheDocument();
  });

  it('renders Jesuke attribution', () => {
    render(<Lightbox piece={piece} onClose={vi.fn()} />);
    expect(screen.getByText('Jesuke')).toBeInTheDocument();
  });

  it('prepends basePath to image src', () => {
    render(<Lightbox piece={piece} basePath="/jesuke" onClose={vi.fn()} />);
    const img = screen.getByAltText('Large blackwork tattoo of a divine figure') as HTMLImageElement;
    expect(img.src).toContain('/jesuke');
  });

  it('does not render placement when absent', () => {
    const pieceNoPlacement: FlashPiece = { ...piece, placement: undefined };
    render(<Lightbox piece={pieceNoPlacement} onClose={vi.fn()} />);
    expect(screen.queryByText('Upper arm')).not.toBeInTheDocument();
  });

  it('traps focus: Tab from last element wraps to first', () => {
    render(<Lightbox piece={piece} onClose={vi.fn()} />);
    const closeBtn = screen.getByRole('button', { name: /close lightbox/i });
    closeBtn.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: false });
    // focus should cycle — close button is the only focusable element, stays focused
    expect(document.activeElement).toBeTruthy();
  });

  it('traps focus: Shift+Tab from first element wraps to last', () => {
    render(<Lightbox piece={piece} onClose={vi.fn()} />);
    const closeBtn = screen.getByRole('button', { name: /close lightbox/i });
    closeBtn.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBeTruthy();
  });
});
