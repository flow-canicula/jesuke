'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { FlashPiece } from '@/content/work';
import { CATEGORY_LABEL, STYLE_LABEL } from '@/content/work';

type LightboxProps = {
  piece: FlashPiece;
  basePath?: string;
  onClose: () => void;
};

export function Lightbox({ piece, basePath = '', onClose }: LightboxProps) {
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
            src={`${basePath}${piece.image}`}
            alt={piece.alt}
            width={piece.imageWidth}
            height={piece.imageHeight}
            className="object-contain w-full h-full"
            priority
          />
        </div>

        {/* Meta strip */}
        <div className="px-6 py-4 border-t hairline">
          <div className="flex items-start justify-between gap-6">
            {/* Left — index + series */}
            <div className="flex flex-col gap-1">
              <span
                className="font-mono tabular-nums"
                style={{ fontSize: '0.58rem', letterSpacing: '0.2em', color: 'var(--color-seal)', opacity: 0.8 }}
              >
                {piece.index}
              </span>
              <span
                className="eyebrow"
                style={{ fontSize: '0.7rem', color: 'var(--color-ink-100)', opacity: 0.65 }}
              >
                {CATEGORY_LABEL[piece.category]}
              </span>
            </div>

            {/* Right — style + placement + attribution */}
            <div className="flex flex-col gap-1 items-end text-right">
              <span
                className="eyebrow"
                style={{ fontSize: '0.7rem', color: 'var(--color-ink-100)', opacity: 0.45 }}
              >
                {STYLE_LABEL[piece.style]}
              </span>
              {piece.placement && (
                <span
                  className="eyebrow"
                  style={{ fontSize: '0.65rem', color: 'var(--color-ink-100)', opacity: 0.28 }}
                >
                  {piece.placement}
                </span>
              )}
              <span
                className="font-mono"
                style={{ fontSize: '0.58rem', letterSpacing: '0.18em', color: 'var(--color-ink-100)', opacity: 0.2 }}
              >
                Jesuke
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
