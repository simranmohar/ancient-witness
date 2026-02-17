import {notFound} from 'next/navigation';
import { client } from "../../lib/sanity";

const query = `*[_type == "video" && slug.current == $slug][0]{
    title,
    collection,
    excerpt,
    youtubeId,
    publishedAt,
    transcript,
    "slug": slug.current
}`;

type Video = {
    title: string;
    collection: string;
    excerpt?: string;
    youtubeId?: string;
    publishedAt?: string;
    transcript?: unknown[];
    slug: string;
};

type PageProps = {
    params: Promise<{slug: string}>;
};

export default async function VideoPage(props: PageProps) {
    const { slug } = await props.params;
    const video = await client.fetch<Video>(query, { slug });

    if (!video) {
        notFound();
    }

    return (
        <main style={{ padding: 24, maxWidth: 900}}>
            <p style={{opacity: 0.7}}>{video.collection}</p>
            <h1>{video.title}</h1>
            {video.excerpt ? <p>{video.excerpt}</p> : null}
            <p style={{ fontSize: 12, opacity: 0.6 }}>Published {video.publishedAt ?? "-"}</p> 
        </main>
    );
}
