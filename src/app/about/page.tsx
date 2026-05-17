import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Salt & Lava",
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 px-6 max-w-2xl mx-auto">
      <h1 className="font-serif text-4xl md:text-5xl text-offwhite mb-10 leading-tight">
        About
      </h1>

      <div className="space-y-6 font-sans text-base text-muted leading-relaxed">
        <p className="text-offwhite">
          Salt & Lava is a photography project chasing the edges of the earth —
          volcanic coasts, salt flats, and the quiet moments between
          destinations.
        </p>
        <p>
          All photos are shot on a{" "}
          <span className="text-gold">FUJIFILM X-T50</span>, embracing the
          grain and color science that makes film simulation feel alive in a
          digital world.
        </p>
        <p>
          Based wherever the next flight goes.
        </p>
      </div>

      <div className="mt-14 border-t border-border pt-10">
        <h2 className="font-sans text-xs text-muted uppercase tracking-widest mb-6">
          Gear
        </h2>
        <ul className="space-y-3 font-sans text-sm text-offwhite/80">
          {[
            "FUJIFILM X-T50",
            "Fujinon XF 23mm f/1.4 R LM WR",
            "Fujinon XF 35mm f/2 R WR",
            "Fujinon XF 56mm f/1.2 R WR",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 border-t border-border pt-10">
        <h2 className="font-sans text-xs text-muted uppercase tracking-widest mb-4">
          Contact
        </h2>
        <a
          href="mailto:sharmchi@gmail.com"
          className="font-sans text-sm text-gold hover:text-offwhite transition-colors duration-200 tracking-wide"
        >
          sharmchi@gmail.com
        </a>
      </div>
    </div>
  );
}
