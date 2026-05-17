import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Salt & Lava",
  description: "chasing salt & lava — photography by Chitra Sharma",
  openGraph: {
    title: "Salt & Lava",
    description: "chasing salt & lava",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-offwhite">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border px-6 py-8 text-center text-muted text-sm">
          © {new Date().getFullYear()} Salt & Lava · All rights reserved
        </footer>
      </body>
    </html>
  );
}
