'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Lightbox } from './Lightbox';
import type { FlashPiece } from '@/content/work';
import { CATEGORY_LABEL, STYLE_LABEL } from '@/content/work';
import { useReveal } from '@/lib/useReveal';

type GalleryGridProps = {
  pieces: FlashPiece[];
  basePath?: string;
  /** When true each card gets a scroll-triggered scale+blur reveal */
  animate?: boolean;
};

export function GalleryGrid({ pieces, basePath = '', animate = false }: GalleryGridProps) {
  const [activePiece, setActivePiece] = useState<FlashPiece | null>(null);
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const gridRef = useReveal(0.05);

  function openLightbox(piece: FlashPiece) {
    setActivePiece(piece);
  }

  function closeLightbox() {
    const id = activePiece?.id;
    setActivePiece(null);
    if (id) {
      setTimeout(() => triggerRefs.current.get(id)?.focus(), 0);
    }
  }

  return (
    <>
      <div
        ref={animate ? (gridRef as React.RefObject<HTMLDivElement>) : undefined}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line"
        role="list"
        aria-label="Flash catalogue"
      >
        {pieces.map((piece, i) => (
          <article
            key={piece.id}
            role="listitem"
            {...(animate
              ? {
                  'data-reveal': 'scale',
                  'data-delay': String(Math.min((i % 6) + 1, 8)),
                }
              : {})}
          >
            <button
              ref={(el) => {
                if (el) triggerRefs.current.set(piece.id, el);
                else triggerRefs.current.delete(piece.id);
              }}
              type="button"
              className="w-full text-left group bg-ink-900 focus-visible:outline-2 focus-visible:outline-ink-100 focus-visible:outline-offset-0"
              aria-label={`View piece ${piece.index}`}
              onClick={() => openLightbox(piece)}
            >
              {/* Image */}
              <div className="aspect-[4/5] relative bg-ink-800 overflow-hidden">
                <Image
                  src={`${basePath}${piece.image}`}
                  alt={piece.alt}
                  width={piece.imageWidth}
                  height={piece.imageHeight}
                  className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-[1.03] transition-transform"
                />
              </div>

              {/* Meta strip */}
              <div className="px-4 py-3 border-t hairline flex items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-3 min-w-0">
                  <span
                    className="font-mono shrink-0 tabular-nums"
                    style={{ fontSize: '0.6rem', letterSpacing: '0.18em', color: 'var(--color-seal)', opacity: 0.7 }}
                  >
                    {piece.index}
                  </span>
                  <span
                    className="eyebrow truncate"
                    style={{ fontSize: '0.65rem', color: 'var(--color-ink-100)', opacity: 0.45 }}
                  >
                    {CATEGORY_LABEL[piece.category]}
                  </span>
                </div>
                <span
                  className="eyebrow shrink-0"
                  style={{ fontSize: '0.6rem', color: 'var(--color-ink-100)', opacity: 0.28 }}
                >
                  {STYLE_LABEL[piece.style]}
                </span>
              </div>
            </button>
          </article>
        ))}
      </div>

      {activePiece && (
        <Lightbox piece={activePiece} basePath={basePath} onClose={closeLightbox} />
      )}
    </>
  );
}
