import type { BlogProps } from "~/types";
import type { Blog } from "~/types/api";

export function transformBlogToProps(
    blog: Blog
): BlogProps & { content?: string | string[] } {
    const publishedAt =
        blog.publishedAt || blog.created_at || new Date().toISOString();

    return {
        id: blog.id,
        title: blog.title || blog.name,
        slug: blog.slug,
        excerpt:
            blog.excerpt ||
            blog.content?.replace(/<[^>]*>/g, "").substring(0, 150) + "..." ||
            "",
        category: blog.category_blog || blog.category,
        author: blog.author,
        date: blog.publishedAt || blog.created_at || new Date().toISOString(),
        readTime: blog.readTime || "5 min read",
        image: blog.image || blog.image_url || null,
        featured: blog.featured || false,
        publishedAt: publishedAt,
        content: blog.content,
    };
}
