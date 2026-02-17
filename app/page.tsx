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

export default async function HomePage() {
    const videos = await client.fetch<VideoListItem[]>(query);
    return (
        <main style={{ padding: 24 }}>
            <h1>Welcome to Ancient Witness</h1>
            <p>Latest videos</p>
            
            <ul style = {{ listStyle: "none", padding: 0 , marginTop: 16}}>
                {videos.map((video) => (
                    <li
                        key={video.slug}
                        style={{
                            border: "1px solid #ddd",
                            padding: 12,
                            borderRadius: 8,
                            marginBottom: 12,
                        }}
                    >
                        <div style ={{ fontSize: 12, opacity: 0.7}}>{video.collection}</div>

                        <h2 style={{ margin: "6px 0" }}>
                            <Link href={`/videos/${video.slug}`}>{video.title}</Link>
                        </h2>

                        {video.excerpt ? <p style={{margin: 0}}>{video.excerpt}</p> : null}
                    </li> 
                ))}
            </ul>
        </main>
    );
}