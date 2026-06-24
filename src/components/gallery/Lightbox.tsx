'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { FlashPiece } from '@/content/work';

type LightboxProps = {
  piece: FlashPiece;
  onClose: () => void;
};

export function Lightbox({ piece, onClose }: LightboxProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Focus the close button on open
  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  // Trap focus inside the dialog
  useEffect(() => {
    const dialog = backdropRef.current;
    if (!dialog) return;

    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Piece ${piece.index}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/95 p-4 md:p-12"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative max-h-full max-w-2xl w-full flex flex-col bg-ink-800">
        {/* Close button */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-ink-100 hover:text-paper-50 transition-colors"
          aria-label="Close lightbox"
        >
          <span aria-hidden="true" className="text-xl leading-none">✕</span>
        </button>

        {/* Image */}
        <div className="relative aspect-[4/5] bg-ink-900 flex-shrink-0" style={{ maxHeight: '70vh' }}>
          <Image
            src={piece.image}
            alt={piece.alt}
            width={piece.imageWidth}
            height={piece.imageHeight}
            className="object-contain w-full h-full"
            priority
          />
        </div>

        {/* Placement */}
        <div className="px-6 py-4 border-t hairline flex items-center gap-6">
          {piece.placement && (
            <>
              <span className="eyebrow text-ink-100 opacity-30" style={{ fontSize: '0.6rem' }}>Placement</span>
              <p className="eyebrow text-ink-100 opacity-60">{piece.placement}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
