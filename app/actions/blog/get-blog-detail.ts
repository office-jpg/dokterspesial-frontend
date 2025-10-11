import { BLOG_ENDPOINTS } from "~/api/api-url";
import { serverApiClient } from "~/api/server-client";
import { type Blog } from "~/types/api";

/**
 * Get single blog post by slug
 * Direct API call for blog detail page
 */
export async function getBlogDetail(slug: string): Promise<Blog> {
    try {
        const url = BLOG_ENDPOINTS.DETAIL(slug);

        const response = await serverApiClient.get<{ data: Blog }>(url);
        const blog = response.data.data;

        const transformedBlog = {
            ...blog,
            title: blog.title || blog.name,
            name: blog.title || blog.name,
            category: blog.category_blog || blog.category,
            image: blog.image_url || blog.image,
            publishedAt:
                blog.uploaded_at || blog.created_at || new Date().toISOString(),
        };

        return transformedBlog;
    } catch (error) {
        console.error("❌ Error in getBlogDetail action:", error);
        throw error;
    }
}
