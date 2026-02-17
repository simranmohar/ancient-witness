import type { Metadata } from "next";
import Image from "next/image";
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
            <Link
              href="/"
              className="flex min-w-0 items-center gap-2 text-lg font-semibold tracking-tight"
            >
              <Image
                src="/ancient-witness-logo.png"
                alt="Ancient Witness logo"
                width={34}
                height={34}
                className="h-[34px] w-[34px] shrink-0 rounded-md object-cover"
              />
              <span className="truncate whitespace-nowrap">Ancient Witness</span>
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
