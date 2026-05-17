import fs from "fs";
import path from "path";

export interface PhotoLocation {
  name: string;
  latitude: number | null;
  longitude: number | null;
}

export interface Photo {
  filename: string;
  year: number;
  date: string;
  location: PhotoLocation;
  camera: { make: string; model: string };
  aesthetic_score: number;
  favorite: boolean;
  src: string;
}

export interface SiteStats {
  total: number;
  countries: number;
  years: number;
  yearRange: string;
}

let _cache: Photo[] | null = null;

function loadPhotos(): Photo[] {
  if (_cache) return _cache;

  const metaPath = path.join(process.cwd(), "public", "metadata.json");
  if (!fs.existsSync(metaPath)) {
    _cache = [];
    return _cache;
  }

  const raw: Omit<Photo, "src">[] = JSON.parse(
    fs.readFileSync(metaPath, "utf8")
  );

  _cache = raw.map((p) => ({
    ...p,
    src: `/photos/${p.year}/${p.filename}`,
  }));

  return _cache;
}

function extractCountry(locationName: string): string {
  if (!locationName) return "Unknown";
  const parts = locationName.split(",");
  return parts[parts.length - 1].trim() || "Unknown";
}

export function getPhotosByYear(year: number): Photo[] {
  return loadPhotos()
    .filter((p) => p.year === year)
    .sort((a, b) => b.aesthetic_score - a.aesthetic_score);
}

export function getCountriesForYear(year: number): string[] {
  const countries = [
    ...new Set(
      getPhotosByYear(year).map((p) => extractCountry(p.location.name))
    ),
  ].sort();
  return countries;
}

export function getHeroPhoto(): Photo | null {
  const photos = loadPhotos();
  if (!photos.length) return null;
  return photos.reduce((best, p) =>
    p.aesthetic_score > best.aesthetic_score ? p : best
  );
}

export function getAvailableYears(): number[] {
  const years = [...new Set(loadPhotos().map((p) => p.year))].sort();
  return years.length ? years : [2024, 2025, 2026];
}

export function getAllStats(): SiteStats {
  const photos = loadPhotos();
  const countries = new Set(
    photos.map((p) => extractCountry(p.location.name)).filter(Boolean)
  );
  const years = getAvailableYears();
  return {
    total: photos.length,
    countries: countries.size,
    years: years.length,
    yearRange:
      years.length > 1
        ? `${years[0]}–${years[years.length - 1]}`
        : String(years[0] ?? ""),
  };
}
