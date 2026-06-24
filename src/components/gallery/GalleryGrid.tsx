'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Lightbox } from './Lightbox';
import type { FlashPiece } from '@/content/work';

type GalleryGridProps = {
  pieces: FlashPiece[];
  basePath?: string;
};

export function GalleryGrid({ pieces, basePath = '' }: GalleryGridProps) {
  const [activePiece, setActivePiece] = useState<FlashPiece | null>(null);
  // Track which button opened the lightbox so we can restore focus on close
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  function openLightbox(piece: FlashPiece) {
    setActivePiece(piece);
  }

  function closeLightbox() {
    const id = activePiece?.id;
    setActivePiece(null);
    if (id) {
      // Restore focus to the trigger that opened the lightbox
      setTimeout(() => triggerRefs.current.get(id)?.focus(), 0);
    }
  }

  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line"
        role="list"
        aria-label="Flash catalogue"
      >
        {pieces.map((piece) => (
          <article key={piece.id} role="listitem">
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
                  className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              {/* Placement */}
              <div className="p-4 border-t hairline">
                {piece.placement ? (
                  <p className="eyebrow text-ink-100 opacity-40">{piece.placement}</p>
                ) : (
                  <p className="eyebrow text-ink-100 opacity-20">—</p>
                )}
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
