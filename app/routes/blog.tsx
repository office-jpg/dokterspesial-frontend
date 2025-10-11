import { getBlogList } from "~/actions/blog/get-blog-list";
import { BlogSection } from "~/features/blog/partials/blog-section";
import { siteConfig } from "~/lib/site";

import type { Route } from "./+types/blog";

export function meta({}: Route.MetaArgs) {
    const title = `${siteConfig.blog.title} - Artikel & Update Medis Terkini`;
    const description = siteConfig.blog.description;
    const url = `${siteConfig.url}/blog`;
    const ogImage = `${siteConfig.url}${siteConfig.ogImage}`;

    return [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: siteConfig.keywords.join(", ") },
        
        // Open Graph
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: ogImage },
        
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogImage },
        
        // Additional
        { name: "robots", content: "index, follow" },
        { rel: "canonical", href: url },
    ];
}

export async function loader({ request }: Route.LoaderArgs) {
    try {
        const url = new URL(request.url);
        const searchParams = url.searchParams;

        const page = parseInt(searchParams.get("page") || "1");
        const search = searchParams.get("search") || undefined;
        const per_page = 6;

        const blogsData = await getBlogList({
            page,
            search,
            per_page,
        });

        return {
            blogs: blogsData.data,
            pagination: blogsData.pagination,
            initialSearch: search || "",
            initialPage: page,
        };
    } catch (error) {
        console.error("Error loading blogs data:", error);
        return {
            blogs: [],
            pagination: {
                current_page: 1,
                last_page: 1,
                per_page: 6,
                total: 0,
                next_page_url: null,
                prev_page_url: null,
                first_page_url: "",
                last_page_url: "",
                has_more_pages: false,
            },
            initialSearch: "",
            initialPage: 1,
        };
    }
}

export default function BlogPage({ loaderData }: Route.ComponentProps) {
    return <BlogSection loaderData={loaderData} />;
}
