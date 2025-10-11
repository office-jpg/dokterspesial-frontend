/**
 * API URL endpoints configuration
 * Centralized URL management for all API endpoints
 */
import { getApiBaseUrl } from "./environment";

/**
 * Get the base URL for all API calls
 */
const BASE_URL = getApiBaseUrl();

/**
 * Blog endpoints
 */
export const BLOG_ENDPOINTS = {
    LIST: `${BASE_URL}/blog-list`,
    HOME_LIST: `${BASE_URL}/blogs`,
    DETAIL: (slug: string) => `${BASE_URL}/blogs/${slug}`,
    CATEGORIES: `${BASE_URL}/category-blogs`,
    TAGS: `${BASE_URL}/blog-tags`,
} as const;

/**
 * Service endpoints
 */
export const SERVICE_ENDPOINTS = {
    LIST: `${BASE_URL}/event-list`,
    HOME_LIST: `${BASE_URL}/events`,
    DETAIL: (slug: string) => `${BASE_URL}/event-detail/${slug}`,
    CATEGORIES: `${BASE_URL}/category-events`,
    TYPES: `${BASE_URL}/type-events`,
    SPESIALISTS: `${BASE_URL}/spesialists`,
    STATUSES: `${BASE_URL}/event-statuses`,
    LOCATIONS: `${BASE_URL}/event-locations`,
} as const;

/**
 * Review endpoints
 */
export const REVIEW_ENDPOINTS = {
    LIST: `${BASE_URL}/reviews`,
    DETAIL: (id: number) => `${BASE_URL}/reviews/${id}`,
    BY_SERVICE: (serviceId: number) =>
        `${BASE_URL}/events/${serviceId}/reviews`,
} as const;

/**
 * Calendar endpoints
 */
export const CALENDAR_ENDPOINTS = {
    LIST: `${BASE_URL}/calendar`,
} as const;

/**
 * Mentor endpoints (alias for presenters)
 */
export const MENTOR_ENDPOINTS = {
    LIST: `${BASE_URL}/presenters`,
    DETAIL: (slug: string) => `${BASE_URL}/presenters/${slug}`,
} as const;

/**
 * Brand endpoints
 */
export const BRAND_ENDPOINTS = {
    LIST: `${BASE_URL}/brands`,
} as const;

/**
 * Helper function to build URL with query parameters
 */
export const buildUrlWithParams = (
    baseUrl: string,
    params?: Record<string, string | number | boolean | undefined>
): string => {
    if (!params) return baseUrl;

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.append(key, value.toString());
        }
    });

    const queryString = searchParams.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

/**
 * Helper function to normalize pagination URLs to use HTTPS
 * Fixes the HTTP/HTTPS issue in pagination links
 */
export const normalizePaginationUrl = (url: string | null): string | null => {
    if (!url) return null;

    return url.replace(/^http:\/\//, "https://");
};

/**
 * Helper function to normalize non-nullable pagination URLs to use HTTPS
 */
export const normalizeUrl = (url: string): string => {
    return url.replace(/^http:\/\//, "https://");
};
