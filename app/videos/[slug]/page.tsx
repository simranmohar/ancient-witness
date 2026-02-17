import {notFound} from 'next/navigation';
import { client } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import ReactMarkdown from "react-markdown";


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
            {video.youtubeId ? (
                <div style={{marginTop: 16}}>
                    <div
                        style={{
                            position: "relative",
                            paddingBottom: "56.25%", // 16:9 aspect ratio
                            height: 0,
                            overflow: "hidden",
                            borderRadius: 8,
                        }}
                    >
                        <iframe
                            src={`https://youtube.com/embed/${video.youtubeId}`}
                            title={video.title}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                border: 0,
                            }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>

            ) : null}
            <p style={{ fontSize: 12, opacity: 0.6 }}>Published {video.publishedAt ?? "-"}</p>
            {video.articleMarkdown ? (
                <div style={{ marginTop: 24, lineHeight: 1.6 }}>
                    <ReactMarkdown>{video.articleMarkdown}</ReactMarkdown>
                </div>
            ) : null}   
        </main>
    );
}
