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
      aria-label={piece.title}
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

        {/* Caption */}
        <div className="p-6 border-t hairline">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-ink-100 opacity-40 mb-1">{piece.index}</p>
              <p className="text-paper-50 font-body">{piece.title}</p>
              <p className="text-ink-100 opacity-60 text-sm mt-1 leading-relaxed">
                {piece.description}
              </p>
            </div>
            <dl className="flex-shrink-0 text-right space-y-0.5">
              <div>
                <dt className="sr-only">Size</dt>
                <dd className="eyebrow text-ink-100 opacity-40 text-xs">{piece.size}</dd>
              </div>
              <div>
                <dt className="sr-only">Placement</dt>
                <dd className="eyebrow text-ink-100 opacity-40 text-xs">{piece.placement}</dd>
              </div>
              <div>
                <dt className="sr-only">Sessions</dt>
                <dd className="eyebrow text-ink-100 opacity-40 text-xs">
                  {piece.sessions === 1 ? '1 session' : `${piece.sessions} sessions`}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
