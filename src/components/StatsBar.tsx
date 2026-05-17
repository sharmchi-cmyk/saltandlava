import type { SiteStats } from "@/lib/photos";

interface StatsBarProps {
  stats: SiteStats;
}

export default function StatsBar({ stats }: StatsBarProps) {
  const items = [
    { value: stats.total.toLocaleString(), label: "photos" },
    { value: String(stats.countries), label: "countries" },
    { value: stats.yearRange || String(stats.years), label: "years" },
  ];

  return (
    <div className="flex items-center justify-center gap-0 border-y border-border py-6 bg-surface">
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center">
          <div className="px-10 text-center">
            <span className="block font-serif text-2xl text-gold">
              {item.value}
            </span>
            <span className="block font-sans text-xs text-muted uppercase tracking-widest mt-1">
              {item.label}
            </span>
          </div>
          {i < items.length - 1 && (
            <div className="w-px h-8 bg-border" />
          )}
        </div>
      ))}
    </div>
  );
}
