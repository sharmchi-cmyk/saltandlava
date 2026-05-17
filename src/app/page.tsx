import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import YearTabs from "@/components/YearTabs";
import {
  getHeroPhoto,
  getAllStats,
  getAvailableYears,
  getPhotosByYear,
  getLocationsForYear,
  type Photo,
} from "@/lib/photos";

export default function Home() {
  const hero = getHeroPhoto();
  const stats = getAllStats();
  const years = getAvailableYears();

  const photosByYear = Object.fromEntries(
    years.map((y) => [y, getPhotosByYear(y)])
  ) as Record<number, Photo[]>;

  const locationsByYear = Object.fromEntries(
    years.map((y) => [y, getLocationsForYear(y)])
  ) as Record<number, string[]>;

  return (
    <>
      <Hero photo={hero} />
      <StatsBar stats={stats} />
      <section className="pt-2 pb-16">
        <YearTabs
          years={years}
          photosByYear={photosByYear}
          locationsByYear={locationsByYear}
        />
      </section>
    </>
  );
}
