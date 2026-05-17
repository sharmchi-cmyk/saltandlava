import Link from "next/link";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 bg-black/80 backdrop-blur-sm border-b border-border">
      <Link
        href="/"
        className="font-serif text-xl text-offwhite tracking-wide hover:text-gold transition-colors duration-200"
      >
        Salt &amp; Lava
      </Link>
      <div className="flex items-center gap-8 text-sm font-sans tracking-widest uppercase text-muted">
        <Link href="/" className="hover:text-gold transition-colors duration-200">
          Photos
        </Link>
        <Link href="/essays" className="hover:text-gold transition-colors duration-200">
          Essays
        </Link>
        <Link href="/about" className="hover:text-gold transition-colors duration-200">
          About
        </Link>
      </div>
    </nav>
  );
}
