import { BLOG_ENDPOINTS, buildUrlWithParams } from "~/api/api-url";
import { serverApiClient } from "~/api/server-client";
import {
    type Blog,
    type BlogQueryParams,
    type PaginatedApiResponse,
} from "~/types/api";

export async function getBlogs(
    params?: BlogQueryParams
): Promise<PaginatedApiResponse<Blog>> {
    try {
        const defaultParams: BlogQueryParams = {
            per_page: 3,
            ...params,
        };

        const apiParams: Record<string, string | number | boolean | undefined> =
            {
                per_page: defaultParams.per_page,
            };

        if (params?.type) {
        }

        const url = buildUrlWithParams(BLOG_ENDPOINTS.HOME_LIST, apiParams);
        const response =
            await serverApiClient.get<PaginatedApiResponse<Blog>>(url);
        const data = response.data;

        const transformedData = {
            ...data,
            data: data.data.map((blog: Blog) => ({
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
        console.error("Error fetching blogs for home:", error);
        throw error;
    }
}
