import fs from "fs";
import path from "path";
import { formatLocationLabel } from "./format";

export { formatLocationLabel };

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

interface RawMeta {
  filename: string;
  year: number;
  date: string;
  location?: { name?: string; latitude?: number | null; longitude?: number | null };
  camera?: { make: string; model: string };
  aesthetic_score?: number;
  favorite?: boolean;
}

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

let _cache: Photo[] | null = null;

function buildSrc(absolutePath: string): string {
  const publicDir = path.join(process.cwd(), "public");
  const rel = path.relative(publicDir, absolutePath);
  const segments = rel.split(path.sep).map(encodeURIComponent);
  return "/" + segments.join("/");
}

function collectPhotos(
  dir: string,
  year: number,
  topFolder: string | null,
  metaMap: Map<string, RawMeta>,
  results: Photo[]
): void {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      collectPhotos(fullPath, year, topFolder ?? entry.name, metaMap, results);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (!IMAGE_EXTS.has(ext)) continue;

      const meta = metaMap.get(entry.name);
      const locationName = topFolder ?? meta?.location?.name ?? "";

      results.push({
        filename: entry.name,
        year,
        date: meta?.date ?? `${year}-01-01T00:00:00`,
        location: {
          name: locationName,
          latitude: meta?.location?.latitude ?? null,
          longitude: meta?.location?.longitude ?? null,
        },
        camera: meta?.camera ?? { make: "", model: "" },
        aesthetic_score: meta?.aesthetic_score ?? 5,
        favorite: meta?.favorite ?? false,
        src: buildSrc(fullPath),
      });
    }
  }
}

function loadPhotos(): Photo[] {
  if (_cache) return _cache;

  const photosDir = path.join(process.cwd(), "public", "photos");
  if (!fs.existsSync(photosDir)) {
    _cache = [];
    return _cache;
  }

  const metaPath = path.join(process.cwd(), "public", "metadata.json");
  const metaMap = new Map<string, RawMeta>();
  if (fs.existsSync(metaPath)) {
    const raw: RawMeta[] = JSON.parse(fs.readFileSync(metaPath, "utf8"));
    for (const m of raw) metaMap.set(m.filename, m);
  }

  const photos: Photo[] = [];

  const yearDirs = fs.readdirSync(photosDir).filter((d) => /^\d{4}$/.test(d));
  for (const yearStr of yearDirs) {
    collectPhotos(
      path.join(photosDir, yearStr),
      parseInt(yearStr, 10),
      null,
      metaMap,
      photos
    );
  }

  _cache = photos;
  return _cache;
}

export function getPhotosByYear(year: number): Photo[] {
  return loadPhotos()
    .filter((p) => p.year === year)
    .sort((a, b) => b.aesthetic_score - a.aesthetic_score);
}

export function getLocationsForYear(year: number): string[] {
  return [
    ...new Set(
      getPhotosByYear(year)
        .map((p) => formatLocationLabel(p.location.name))
        .filter(Boolean)
    ),
  ].sort();
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
  const locations = new Set(
    photos.map((p) => p.location.name).filter(Boolean)
  );
  const years = getAvailableYears();
  return {
    total: photos.length,
    countries: locations.size,
    years: years.length,
    yearRange:
      years.length > 1
        ? `${years[0]}–${years[years.length - 1]}`
        : String(years[0] ?? ""),
  };
}
