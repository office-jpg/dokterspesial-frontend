import { type UseQueryResult, useQuery } from "@tanstack/react-query";

import { getBlogDetail as getBlogDetailAction } from "~/actions/blog/get-blog-detail";
import { getBlogCategories } from "~/actions/blog/get-blog-categories";
import { getBlogList } from "~/actions/blog/get-blog-list";
import { getBlogs as getHomeBlogs } from "~/actions/home/get-blogs";
import { BLOG_ENDPOINTS, buildUrlWithParams } from "~/api/api-url";
import { getDefaultFetchOptions } from "~/api/environment";
import { useDataStore } from "~/stores";
import {
    type ApiResponse,
    type Blog,
    type BlogCategory,
    type BlogQueryParams,
    type PaginatedApiResponse,
} from "~/types/api";

/**
 * Blog Repository Query Parameters
 * Extends API params with additional repository-specific options
 */
export interface BlogRepositoryParams extends BlogQueryParams {
    context?: "home" | "blog";
}

/**
 * Blog Repository Cache Keys
 * Centralized cache key management for React Query
 */
export const BlogRepositoryKeys = {
    all: ["blog-repository"] as const,

    home: () => [...BlogRepositoryKeys.all, "home"] as const,
    homeBlogs: (params?: BlogRepositoryParams) =>
        [...BlogRepositoryKeys.home(), params] as const,

    lists: () => [...BlogRepositoryKeys.all, "list"] as const,
    list: (params?: BlogRepositoryParams) =>
        [...BlogRepositoryKeys.lists(), params] as const,

    details: () => [...BlogRepositoryKeys.all, "detail"] as const,
    detail: (slug: string) => [...BlogRepositoryKeys.details(), slug] as const,

    latest: () => [...BlogRepositoryKeys.all, "latest"] as const,
    latestBlogs: (limit?: number) =>
        [...BlogRepositoryKeys.latest(), limit] as const,

    categories: () => [...BlogRepositoryKeys.all, "categories"] as const,
    categoryBlogs: (categoryId: number, params?: BlogRepositoryParams) =>
        [...BlogRepositoryKeys.categories(), categoryId, params] as const,

    search: () => [...BlogRepositoryKeys.all, "search"] as const,
    searchBlogs: (term: string, params?: BlogRepositoryParams) =>
        [...BlogRepositoryKeys.search(), term, params] as const,
} as const;

/**
 * Blog Repository Implementation
 * Repository Pattern with Factory Methods for Blog Data Access
 */
class BlogRepository {
    /**
     * Home Blogs Data Fetching Strategy
     */
    async fetchHomeBlogs(
        params?: BlogRepositoryParams
    ): Promise<PaginatedApiResponse<Blog>> {
        try {
            const response = await getHomeBlogs({
                per_page: params?.per_page || 6,
                ...params,
            });
            return response;
        } catch (error) {
            console.error("❌ Error fetching home blogs:", error);
            throw error;
        }
    }

    /**
     * Blog Page Data Fetching Strategy
     */
    async fetchBlogPageData(
        params?: BlogRepositoryParams
    ): Promise<PaginatedApiResponse<Blog>> {
        try {
            const response = await getBlogList(params);
            return response;
        } catch (error) {
            console.error("❌ Error fetching blog list:", error);
            throw error;
        }
    }

    /**
     * Get paginated list of blogs with optional filters
     * Used for blog listing page with pagination, search, and filtering
     */
    async getBlogList(
        params?: BlogRepositoryParams
    ): Promise<PaginatedApiResponse<Blog>> {
        const isHomeContext = params?.context === "home";

        if (isHomeContext) {
            return await this.fetchHomeBlogs(params);
        } else {
            return await this.fetchBlogPageData(params);
        }
    }

    /**
     * Get limited number of blogs for display purposes
     * Used for home page, sidebars, or featured sections
     */
    async getBlogs(
        params?: BlogRepositoryParams
    ): Promise<PaginatedApiResponse<Blog>> {
        try {
            const defaultParams = {
                per_page: 6,
                ...params,
            };

            const url = buildUrlWithParams(
                BLOG_ENDPOINTS.LIST,
                defaultParams as Record<
                    string,
                    string | number | boolean | undefined
                >
            );

            const response = await fetch(url, {
                method: "GET",
                ...getDefaultFetchOptions(),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("❌ Blogs response error:", errorText);
                throw new Error(
                    `HTTP error! status: ${response.status} - ${errorText}`
                );
            }

            const data: PaginatedApiResponse<Blog> = await response.json();
            return data;
        } catch (error) {
            console.error("❌ Error fetching blogs:", error);
            throw error;
        }
    }

    /**
     * Get single blog by slug
     * Used for blog detail page
     */
    async getBlogDetail(slug: string): Promise<Blog> {
        try {
            const response = await getBlogDetailAction(slug);
            return response;
        } catch (error) {
            console.error("❌ Error fetching blog detail:", error);
            throw error;
        }
    }

    /**
     * Get latest blogs for sidebar or related content
     * Used for blog detail sidebar or related posts
     */
    async getLatestBlogs(
        limit: number = 5
    ): Promise<PaginatedApiResponse<Blog>> {
        try {
            const params: BlogRepositoryParams = {
                per_page: limit,
                page: 1,
            };

            return await this.getBlogs(params);
        } catch (error) {
            console.error("❌ Error fetching latest blogs:", error);
            throw error;
        }
    }

    /**
     * Get blogs by category
     * Used for category-specific blog listing
     */
    async getBlogsByCategory(
        categoryId: number,
        params?: BlogRepositoryParams
    ): Promise<PaginatedApiResponse<Blog>> {
        try {
            const categoryParams = {
                category_id: categoryId,
                ...params,
            };

            return await this.getBlogList(categoryParams);
        } catch (error) {
            console.error("❌ Error fetching blogs by category:", error);
            throw error;
        }
    }

    /**
     * Search blogs by term
     * Used for blog search functionality
     */
    async searchBlogs(
        searchTerm: string,
        params?: BlogRepositoryParams
    ): Promise<PaginatedApiResponse<Blog>> {
        try {
            const searchParams = {
                search: searchTerm,
                ...params,
            };

            return await this.getBlogList(searchParams);
        } catch (error) {
            console.error("❌ Error searching blogs:", error);
            throw error;
        }
    }

    /**
     * Get blog categories
     * Used for blog filtering
     */
    async getBlogCategories(): Promise<ApiResponse<BlogCategory[]>> {
        try {
            const response = await getBlogCategories();
            return response;
        } catch (error) {
            console.error("❌ Error fetching blog categories:", error);
            return {
                success: false,
                message: "Failed to fetch categories",
                data: [],
            };
        }
    }
}

const blogRepository = new BlogRepository();

/**
 * Repository Hook: Main blog data access
 */
export function useBlogRepository(
    params?: BlogRepositoryParams,
    options?: { enabled?: boolean }
): UseQueryResult<PaginatedApiResponse<Blog>, Error> {
    const setBlogs = useDataStore((state) => state.setBlogs);

    return useQuery({
        queryKey: BlogRepositoryKeys.list(params),
        queryFn: async () => {
            const result = await blogRepository.getBlogList(params);

            setBlogs(result.data);
            return result;
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: options?.enabled,
    });
}

/**
 * Repository Hook: Blog detail access
 */
export function useBlogDetailRepository(
    slug: string
): UseQueryResult<Blog, Error> {
    return useQuery({
        queryKey: BlogRepositoryKeys.detail(slug),
        queryFn: () => blogRepository.getBlogDetail(slug),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}

/**
 * Factory Method: Home Blogs Repository
 * Convenience hook with pre-configured home context
 */
export function useHomeBlogsRepository(
    params?: Omit<BlogRepositoryParams, "context">,
    options?: { enabled?: boolean }
) {
    return useBlogRepository({ ...params, context: "home" }, options);
}

/**
 * Factory Method: Blog Page Repository
 * Convenience hook with pre-configured blog page context
 */
export function useBlogPageRepository(
    params?: Omit<BlogRepositoryParams, "context">,
    options?: { enabled?: boolean }
) {
    return useBlogRepository({ ...params, context: "blog" }, options);
}

/**
 * Repository Hook: Latest blogs access
 */
export function useLatestBlogsRepository(
    limit: number = 5
): UseQueryResult<PaginatedApiResponse<Blog>, Error> {
    return useQuery({
        queryKey: BlogRepositoryKeys.latestBlogs(limit),
        queryFn: () => blogRepository.getLatestBlogs(limit),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}

/**
 * Repository Hook: Category blogs access
 */
export function useBlogsByCategoryRepository(
    categoryId: number,
    params?: BlogRepositoryParams
): UseQueryResult<PaginatedApiResponse<Blog>, Error> {
    return useQuery({
        queryKey: BlogRepositoryKeys.categoryBlogs(categoryId, params),
        queryFn: () => blogRepository.getBlogsByCategory(categoryId, params),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}

/**
 * Repository Hook: Search blogs access
 */
export function useSearchBlogsRepository(
    searchTerm: string,
    params?: BlogRepositoryParams
): UseQueryResult<PaginatedApiResponse<Blog>, Error> {
    return useQuery({
        queryKey: BlogRepositoryKeys.searchBlogs(searchTerm, params),
        queryFn: () => blogRepository.searchBlogs(searchTerm, params),
        enabled: !!searchTerm && searchTerm.length > 0,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}

/**
 * Repository Hook: Blog categories access
 */
export function useBlogCategoriesRepository(): UseQueryResult<
    ApiResponse<BlogCategory[]>,
    Error
> {
    return useQuery({
        queryKey: BlogRepositoryKeys.categories(),
        queryFn: () => blogRepository.getBlogCategories(),
        staleTime: 10 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}

export const useBlogs = useBlogRepository;
export const useBlog = useBlogDetailRepository;
export const useHomeBlogs = useHomeBlogsRepository;
export const useBlogList = useBlogPageRepository;
export const useLatestBlogs = useLatestBlogsRepository;
export const useBlogsByCategory = useBlogsByCategoryRepository;
export const useSearchBlogs = useSearchBlogsRepository;
export const useBlogCategories = useBlogCategoriesRepository;

export const getBlogListFromRepo =
    blogRepository.getBlogList.bind(blogRepository);
export const getBlogsFromRepo = blogRepository.getBlogs.bind(blogRepository);
export const getBlogDetailFromRepo =
    blogRepository.getBlogDetail.bind(blogRepository);
export const getLatestBlogsFromRepo =
    blogRepository.getLatestBlogs.bind(blogRepository);
export const getBlogsByCategoryFromRepo =
    blogRepository.getBlogsByCategory.bind(blogRepository);
export const searchBlogsFromRepo =
    blogRepository.searchBlogs.bind(blogRepository);
export const getBlogCategoriesFromRepo =
    blogRepository.getBlogCategories.bind(blogRepository);
