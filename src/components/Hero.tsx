import type { Photo } from "@/lib/photos";

interface HeroProps {
  photo: Photo | null;
}

export default function Hero({ photo }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {photo ? (
        <img
          src={photo.src}
          alt={photo.location.name || "Salt & Lava"}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
      )}

      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* copy */}
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-24 md:px-16 md:pb-28">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-offwhite leading-none tracking-tight mb-4">
          Salt &amp; Lava
        </h1>
        <p className="font-sans text-base md:text-lg text-gold tracking-[0.25em] uppercase">
          chasing salt &amp; lava
        </p>
        {photo?.location?.name && (
          <p className="font-sans text-sm text-muted mt-3 tracking-wide">
            {photo.location.name}
          </p>
        )}
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-muted text-xs tracking-widest uppercase">
        <span>Scroll</span>
        <span className="block w-px h-8 bg-muted/50" />
      </div>
    </section>
  );
}
