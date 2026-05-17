import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Essays — Salt & Lava",
};

export default function EssaysPage() {
  return (
    <div className="pt-24 pb-20 px-6 max-w-3xl mx-auto">
      <h1 className="font-serif text-4xl md:text-5xl text-offwhite mb-4 leading-tight">
        Photo Essays
      </h1>
      <p className="font-sans text-sm text-muted tracking-widest uppercase mb-16">
        Stories behind the frame
      </p>

      <div className="flex flex-col items-center justify-center py-24 border border-border rounded-sm">
        <p className="font-serif text-xl text-offwhite/40 italic">
          Essays coming soon
        </p>
        <p className="font-sans text-xs text-muted mt-3 tracking-widest uppercase">
          Check back later
        </p>
      </div>
    </div>
  );
}
