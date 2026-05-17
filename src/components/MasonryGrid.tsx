"use client";

import { useState } from "react";
import type { Photo } from "@/lib/photos";

interface MasonryGridProps {
  photos: Photo[];
}

export default function MasonryGrid({ photos }: MasonryGridProps) {
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  if (!photos.length) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="font-sans text-muted text-sm tracking-widest uppercase">
          No photos yet
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3">
        {photos.map((photo) => (
          <div
            key={photo.src}
            className="break-inside-avoid mb-3 group relative cursor-pointer overflow-hidden rounded-sm"
            onClick={() => setLightbox(photo)}
          >
            <img
              src={photo.src}
              alt={photo.location.name || ""}
              loading="lazy"
              className="w-full block transition-transform duration-500 group-hover:scale-[1.02]"
            />
            {/* hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
              {photo.location.name && (
                <p className="font-sans text-xs text-gold tracking-wide truncate">
                  {photo.location.name}
                </p>
              )}
              <p className="font-sans text-xs text-muted mt-0.5">
                {new Date(photo.date).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-6 text-muted hover:text-offwhite text-3xl leading-none"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.location.name || ""}
            className="max-h-[90vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-0 right-0 text-center">
            {lightbox.location.name && (
              <p className="font-sans text-sm text-gold tracking-wide">
                {lightbox.location.name}
              </p>
            )}
            <p className="font-sans text-xs text-muted mt-1">
              {lightbox.camera.make} {lightbox.camera.model} ·{" "}
              {new Date(lightbox.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
