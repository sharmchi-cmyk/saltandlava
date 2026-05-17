"use client";

import { useState, useMemo } from "react";
import MasonryGrid from "./MasonryGrid";
import { formatLocationLabel } from "@/lib/format";
import type { Photo } from "@/lib/photos";

interface YearTabsProps {
  years: number[];
  photosByYear: Record<number, Photo[]>;
  locationsByYear: Record<number, string[]>;
}

export default function YearTabs({
  years,
  photosByYear,
  locationsByYear,
}: YearTabsProps) {
  const [activeYear, setActiveYear] = useState<number>(
    years[years.length - 1] ?? 2026
  );
  const [activeLocation, setActiveLocation] = useState<string>("All");

  const locations = useMemo(
    () => ["All", ...(locationsByYear[activeYear] ?? [])],
    [activeYear, locationsByYear]
  );

  const visiblePhotos = useMemo(() => {
    const yearPhotos = photosByYear[activeYear] ?? [];
    if (activeLocation === "All") return yearPhotos;
    return yearPhotos.filter(
      (p) => formatLocationLabel(p.location.name) === activeLocation
    );
  }, [activeYear, activeLocation, photosByYear]);

  function handleYearChange(year: number) {
    setActiveYear(year);
    setActiveLocation("All");
  }

  return (
    <div>
      {/* year tabs */}
      <div className="flex items-center gap-0 border-b border-border px-6 md:px-12">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => handleYearChange(year)}
            className={[
              "relative px-6 py-4 font-sans text-sm tracking-widest uppercase transition-colors duration-200",
              activeYear === year
                ? "text-gold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gold"
                : "text-muted hover:text-offwhite",
            ].join(" ")}
          >
            {year}
          </button>
        ))}
      </div>

      {/* location filter pills */}
      {locations.length > 1 && (
        <div className="flex flex-wrap gap-2 px-6 md:px-12 pt-6 pb-2">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setActiveLocation(loc)}
              className={[
                "px-4 py-1.5 rounded-full border text-xs font-sans tracking-widest uppercase transition-colors duration-200",
                activeLocation === loc
                  ? "border-gold text-gold bg-gold/10"
                  : "border-border text-muted hover:border-offwhite/40 hover:text-offwhite/60",
              ].join(" ")}
            >
              {loc}
            </button>
          ))}
        </div>
      )}

      {/* grid */}
      <div className="px-4 md:px-8 py-8">
        <MasonryGrid photos={visiblePhotos} />
      </div>
    </div>
  );
}
