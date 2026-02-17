import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "../../lib/sanity";
import ReactMarkdown, { type Components } from "react-markdown";

const query = `*[_type == "video" && slug.current == $slug][0]{
    title,
    collection,
    excerpt,
    youtubeId,
    publishedAt,
    articleMarkdown,
    "slug": slug.current
}`;

type Video = {
  title: string;
  collection: string;
  excerpt?: string;
  youtubeId?: string;
  publishedAt?: string;
  articleMarkdown?: string;
  slug: string;
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

const markdownComponents: Components = {
  h1: ({ ...props }) => (
    <h1
      className="mt-10 text-3xl font-bold tracking-tight text-[#1F2328] first:mt-0"
      {...props}
    />
  ),
  h2: ({ ...props }) => (
    <h2 className="mt-8 text-2xl font-semibold tracking-tight text-[#1F2328]" {...props} />
  ),
  h3: ({ ...props }) => (
    <h3 className="mt-6 text-xl font-semibold tracking-tight text-[#1F2328]" {...props} />
  ),
  p: ({ ...props }) => <p className="mt-4 text-[#1F2328]/95" {...props} />,
  ul: ({ ...props }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-[#1F2328]/95" {...props} />,
  ol: ({ ...props }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-[#1F2328]/95" {...props} />
  ),
  li: ({ ...props }) => <li className="pl-1" {...props} />,
  blockquote: ({ ...props }) => (
    <blockquote
      className="mt-6 border-l-4 border-[#E3DED3] bg-[#FFFCF6] px-4 py-3 italic text-[#5B646E]"
      {...props}
    />
  ),
  a: ({ ...props }) => (
    <a className="font-medium text-[#B08D57] underline decoration-[#B08D57]/60 underline-offset-2 hover:text-[#8A6A3E]" {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-8 border-[#E3DED3]" {...props} />,
  code: ({ ...props }) => (
    <code className="rounded bg-[#FFFCF6] px-1.5 py-0.5 text-[0.95em]" {...props} />
  ),
  pre: ({ ...props }) => (
    <pre
      className="mt-6 overflow-x-auto rounded-xl border border-[#E3DED3] bg-[#FFFCF6] p-4 text-sm"
      {...props}
    />
  ),
};

function formatPublishedDate(value?: string) {
  if (!value) {
    return null;
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(parsed);
}

function formatCollectionLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function VideoPage(props: PageProps) {
  const { slug } = await props.params;
  const video = await client.fetch<Video>(query, { slug });

  if (!video) {
    notFound();
  }

  const publishedDate = formatPublishedDate(video.publishedAt);

  return (
    <main className="py-2 sm:py-4">
      <article className="mx-auto max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#5B646E]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-[#8A6A3E]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>{formatCollectionLabel(video.collection)}</li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-[#1F2328]">{video.title}</li>
          </ol>
        </nav>

        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-[#E3DED3] bg-[#FFFCF6] px-3 py-1 text-xs font-medium tracking-wide text-[#5B646E]">
              {formatCollectionLabel(video.collection)}
            </span>
            {publishedDate ? (
              <p className="text-sm text-[#5B646E]">Published {publishedDate}</p>
            ) : null}
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{video.title}</h1>
          {video.excerpt ? (
            <p className="max-w-2xl text-base leading-relaxed text-[#5B646E] sm:text-lg">
              {video.excerpt}
            </p>
          ) : null}
        </header>

        {video.youtubeId ? (
          <div className="mt-8 space-y-4">
            <div className="relative overflow-hidden rounded-xl border border-[#E3DED3] bg-black pt-[56.25%]">
              <iframe
                src={`https://youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-md border border-[#B08D57] bg-[#B08D57] px-4 py-2 text-sm font-semibold text-[#FFFCF6] transition-colors hover:bg-[#8A6A3E] hover:border-[#8A6A3E]"
              >
                Watch on YouTube
              </a>
              <Link
                href="/"
                className="inline-flex items-center rounded-md border border-[#E3DED3] bg-[#FFFCF6] px-4 py-2 text-sm font-semibold text-[#1F2328] transition-colors hover:bg-[#F7F3EA]"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-[#E3DED3] bg-[#FFFCF6] px-4 py-2 text-sm font-semibold text-[#1F2328] transition-colors hover:bg-[#F7F3EA]"
            >
              Back to Home
            </Link>
          </div>
        )}

        {video.articleMarkdown ? (
          <div className="mt-10 text-base leading-relaxed text-[#1F2328] md:text-[17px]">
            <ReactMarkdown components={markdownComponents}>
              {video.articleMarkdown}
            </ReactMarkdown>
          </div>
        ) : null}
      </article>
    </main>
  );
}
