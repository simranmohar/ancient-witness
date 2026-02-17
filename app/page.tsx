import { client } from "./lib/sanity";
import Link from "next/link";

const query = `*[_type == "video"] | order(publishedAt desc, _createdAt desc)[0...10]{
    title,
    collection,
    excerpt,
    youtubeId,
    publishedAt,
    "slug": slug.current,
}`; // slug is an object in Sanity, we need to extract the current value

type VideoListItem = {
  title: string;
  slug: string;
  collection: "norse-gods" | "battles" | "notable-figures";
  excerpt?: string;
  youtubeId?: string;
  publishedAt?: string;
};

function formatCollection(collection: VideoListItem["collection"]) {
  return collection
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function HomePage() {
  const videos = await client.fetch<VideoListItem[]>(query);

  return (
    <main className="py-2 sm:py-4">
      <header className="rounded-2xl border border-[#E3DED3] bg-[#FFFCF6] px-5 py-7 shadow-sm sm:px-8 sm:py-9">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5B646E]">
          Nordic Archive
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Ancient Witness
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#5B646E] sm:text-lg">
          A curated library of stories, battles, and figures from ancient
          history.
        </p>
      </header>

      <ul className="mt-8 space-y-4 sm:space-y-5">
        {videos.map((video) => (
          <li
            key={video.slug}
            className="group rounded-xl border border-[#E3DED3] bg-[#FFFCF6] p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#B08D57]/60 hover:shadow-md"
          >
            <span className="inline-flex items-center rounded-full border border-[#B08D57]/30 bg-[#B08D57]/10 px-3 py-1 text-xs font-semibold tracking-wide text-[#8A6A3E]">
              {formatCollection(video.collection)}
            </span>

            <h2 className="mt-3 text-xl font-semibold leading-tight sm:text-2xl">
              <Link
                href={`/videos/${video.slug}`}
                className="text-[#1F2328] transition-colors hover:text-[#8A6A3E]"
              >
                {video.title}
              </Link>
            </h2>

            {video.excerpt ? (
              <p className="mt-3 text-sm leading-relaxed text-[#5B646E] sm:text-base">
                {video.excerpt}
              </p>
            ) : null}

            <div className="mt-4">
              <Link
                href={`/videos/${video.slug}`}
                className="text-sm font-semibold text-[#B08D57] transition-colors group-hover:text-[#8A6A3E]"
              >
                Read article <span aria-hidden="true">→</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
