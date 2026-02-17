import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ancient Witness",
  description: "Stories and videos from the ancient world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#F7F3EA] font-serif text-[#1F2328] antialiased">
        <header className="sticky top-0 z-50 border-b border-[#E3DED3] bg-[#FFFCF6]/85 shadow-sm backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Ancient Witness
            </Link>
            <nav className="flex items-center gap-5">
              <Link
                href="/"
                className="text-sm font-medium text-[#5B646E] transition-colors hover:text-[#8A6A3E]"
              >
                Home
              </Link>
              <a
                href="https://www.youtube.com/@TheAncientWitness"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-[#5B646E] transition-colors hover:text-[#8A6A3E]"
              >
                YouTube
              </a>
            </nav>
          </div>
        </header>
        <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8">{children}</div>
      </body>
    </html>
  );
}
