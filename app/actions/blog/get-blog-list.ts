import { BLOG_ENDPOINTS, buildUrlWithParams } from "~/api/api-url";
import { serverApiClient } from "~/api/server-client";
import {
    type Blog,
    type BlogQueryParams,
    type PaginatedApiResponse,
} from "~/types/api";

/**
 * Get blogs for blog page with pagination and search
 * Direct API call using LIST endpoint with full search and filter capabilities
 */
export async function getBlogList(
    params?: BlogQueryParams
): Promise<PaginatedApiResponse<Blog>> {
    try {
        const apiParams: Record<string, string | number | boolean | undefined> =
            {};

        if (params?.page) apiParams.page = params.page;
        if (params?.per_page) apiParams.per_page = params.per_page;
        if (params?.search) apiParams.search = params.search;
        if (params?.type) apiParams.type = params.type;

        const defaultParams = {
            per_page: 10,
            ...apiParams,
        };

        const url = buildUrlWithParams(
            BLOG_ENDPOINTS.LIST,
            defaultParams as Record<
                string,
                string | number | boolean | undefined
            >
        );

        const response =
            await serverApiClient.get<PaginatedApiResponse<Blog>>(url);

        const data = response.data;

        const transformedData = {
            ...data,
            data: data.data.map((blog) => ({
                ...blog,
                title: blog.title || blog.name,
                name: blog.title || blog.name,
                category: blog.category_blog || blog.category,
                image: blog.image_url || blog.image,
                publishedAt:
                    blog.created_at ||
                    blog.uploaded_at ||
                    new Date().toISOString(),
            })),
        };

        return transformedData;
    } catch (error) {
        console.error("❌ Error in getBlogList action:", error);
        throw error;
    }
}
