import { useLoaderData } from "react-router";
import { getBlogDetail } from "~/actions/blog/get-blog-detail";
import { getBlogList } from "~/actions/blog/get-blog-list";
import { BlogDetailSection } from "~/features/blog-detail/partials/blog-detail-section";
import { transformBlogToProps } from "~/lib/blog-transformer";
import { siteConfig } from "~/lib/site";
import { createArticleSchema, createBreadcrumbSchema } from "~/lib/json-ld";
import type { Route } from "./+types/blog.$id";

export async function loader({ params }: Route.LoaderArgs) {
    try {
        const [blog, latestBlogsResponse] = await Promise.all([
            getBlogDetail(params.id),
            getBlogList({ per_page: 7 })
        ]);

        const transformedBlogs = latestBlogsResponse.data.map(transformBlogToProps);
        const filteredBlogs = transformedBlogs
            .filter((apiBlog) => {
                const currentSlug = params.id;
                const decodedCurrentSlug = decodeURIComponent(currentSlug);
                const cleanCurrentSlug = decodedCurrentSlug
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w\-]/g, "")
                    .replace(/-+/g, "-")
                    .replace(/^-+|-+$/g, "");

                const cleanApiSlug = apiBlog.slug
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w\-]/g, "")
                    .replace(/-+/g, "-")
                    .replace(/^-+|-+$/g, "");

                return cleanApiSlug !== cleanCurrentSlug;
            })
            .slice(0, 6);

        return { blog, latestBlogs: filteredBlogs };
    } catch (error) {
        throw new Response("Blog not found", { status: 404 });
    }
}

export function meta({ data }: Route.MetaArgs) {
    const blog = data?.blog;
    
    if (!blog) {
        return [
            { title: "Artikel Tidak Ditemukan - Dokter Spesial" },
            { name: "description", content: "Artikel yang Anda cari tidak ditemukan." },
        ];
    }

    const title = `${blog.name} - ${siteConfig.blog.title}`;
    const description = blog.content 
        ? blog.content.replace(/<[^>]*>/g, '').substring(0, 160) 
        : siteConfig.blog.description;
    const url = `${siteConfig.url}/blog/${blog.slug}`;
    const image = blog.image || `${siteConfig.url}${siteConfig.ogImage}`;
    
    return [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: `${blog.name}, ${siteConfig.keywords.slice(0, 10).join(", ")}` },
        { name: "author", content: blog.author || siteConfig.name },
        
        // Open Graph
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "article:published_time", content: blog.created_at },
        { property: "article:modified_time", content: blog.updated_at || blog.created_at },
        { property: "article:author", content: blog.author || siteConfig.name },
        
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
        
        // Additional
        { name: "robots", content: "index, follow" },
        { rel: "canonical", href: url },
        
        // JSON-LD structured data
        {
            "script:ld+json": createArticleSchema({
                article: {
                    title: blog.name,
                    description: description,
                    author: blog.author || siteConfig.name,
                    publishedTime: blog.created_at || new Date().toISOString(),
                    url: `/blog/${blog.slug}`,
                    image: image,
                },
            }),
        },
        {
            "script:ld+json": createBreadcrumbSchema(siteConfig.url, [
                { name: "Home", url: "/" },
                { name: "Blog", url: "/blog" },
                { name: blog.name, url: `/blog/${blog.slug}` },
            ]),
        },
    ];
}

export default function BlogDetailPage() {
    const { blog, latestBlogs } = useLoaderData<typeof loader>();

    const article = transformBlogToProps(blog);

    return <BlogDetailSection article={article} latestBlogs={latestBlogs} />;
}