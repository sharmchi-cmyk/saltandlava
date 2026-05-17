"use client";

import { useState, useMemo } from "react";
import MasonryGrid from "./MasonryGrid";
import type { Photo } from "@/lib/photos";

interface YearTabsProps {
  years: number[];
  photosByYear: Record<number, Photo[]>;
  countriesByYear: Record<number, string[]>;
}

export default function YearTabs({
  years,
  photosByYear,
  countriesByYear,
}: YearTabsProps) {
  const [activeYear, setActiveYear] = useState<number>(
    years[years.length - 1] ?? 2026
  );
  const [activeCountry, setActiveCountry] = useState<string>("All");

  const countries = useMemo(
    () => ["All", ...(countriesByYear[activeYear] ?? [])],
    [activeYear, countriesByYear]
  );

  const visiblePhotos = useMemo(() => {
    const yearPhotos = photosByYear[activeYear] ?? [];
    if (activeCountry === "All") return yearPhotos;
    return yearPhotos.filter((p) => {
      const parts = p.location.name.split(",");
      const country = parts[parts.length - 1].trim();
      return country === activeCountry;
    });
  }, [activeYear, activeCountry, photosByYear]);

  function handleYearChange(year: number) {
    setActiveYear(year);
    setActiveCountry("All");
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

      {/* country filter pills */}
      {countries.length > 1 && (
        <div className="flex flex-wrap gap-2 px-6 md:px-12 pt-6 pb-2">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => setActiveCountry(country)}
              className={[
                "px-4 py-1.5 rounded-full border text-xs font-sans tracking-widest uppercase transition-colors duration-200",
                activeCountry === country
                  ? "border-gold text-gold bg-gold/10"
                  : "border-border text-muted hover:border-offwhite/40 hover:text-offwhite/60",
              ].join(" ")}
            >
              {country}
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
