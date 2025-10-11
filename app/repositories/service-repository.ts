import { useQuery } from "@tanstack/react-query";
import type { QueryObserverResult } from "@tanstack/react-query";

import { getServices } from "~/actions/home/get-services";
import { getServiceDetail } from "~/actions/service/get-service-detail";
import { getServiceList } from "~/actions/service/get-service-list";
import { SERVICES_DATA } from "~/contents/services";
import type { ServiceProps } from "~/types";
import {
    type ServiceQueryParams as APIServiceQueryParams,
    type PaginatedApiResponse,
    type ServiceSpesialist,
} from "~/types/api";
import { convertServiceToService } from "~/utils/service";

/**
 * Extended response type that includes available specialists
 */
export interface ServiceRepositoryResponse extends PaginatedApiResponse<ServiceProps> {
    availableSpesialists?: ServiceSpesialist[];
}

/**
 * Service Repository Query Parameters
 * Extends API params with additional repository-specific options
 */
export interface ServiceRepositoryParams extends APIServiceQueryParams {
    type?: string;
    format?: string;
    status?: string;
    spesialist_slug?: string;
    context?: "home" | "service";
    selectedTypeEvents?: string[];
    selectedSpesialists?: string[];
    needsClientFiltering?: boolean;
    category_slug?: string;
    type_slug?: string;
}

/**
 * Service Repository Cache Keys
 * Centralized cache key management for React Query
 */
export const ServiceRepositoryKeys = {
    all: ["service-repository"] as const,
    lists: () => [...ServiceRepositoryKeys.all, "list"] as const,
    list: (params?: ServiceRepositoryParams) => {
        const cacheKey = [
            ...ServiceRepositoryKeys.lists(),
            {
                ...params,
                spesialist_slug: params?.spesialist_slug,
                category_slug: params?.category_slug,
                type_slug: params?.type_slug,
                selectedSpesialists: params?.selectedSpesialists,
            },
        ];
        return cacheKey;
    },
    allServices: () =>
        [...ServiceRepositoryKeys.all, "all-services-v2"] as const,
    categories: () => [...ServiceRepositoryKeys.all, "categories"] as const,
    statuses: () => [...ServiceRepositoryKeys.all, "statuses"] as const,
    locations: () => [...ServiceRepositoryKeys.all, "locations"] as const,
} as const;

/**
 * Service Repository Class - Data Access Layer
 * Contains business logic for different data fetching strategies
 */
class ServiceRepository {
    /**
     * Helper function to enrich services with detail data (rating, description)
     */
    async enrichServiceWithDetails(
        service: ServiceProps
    ): Promise<ServiceProps> {
        try {
            const detailData = await getServiceDetail(service.slug);
            return {
                ...service,
                description: detailData.description || service.description,
                rating: detailData.rating || service.rating,
                reviews: detailData.reviews || service.reviews,
            };
        } catch (error) {
            console.warn(`Failed to enrich service ${service.slug}:`, error);
            return service;
        }
    }

    /**
     * Home Services Data Fetching Strategy
     */
    async fetchHomeServices(
        params?: ServiceRepositoryParams
    ): Promise<PaginatedApiResponse<ServiceProps>> {
        const response = await getServices({
            type_slug: params?.type,
            category_id: params?.category_id,
            per_page: params?.per_page || 3,
        });

        const convertedData = response.data.map(convertServiceToService);

        const enrichedData = await Promise.all(
            convertedData
                .slice(0, 3)
                .map((service) => this.enrichServiceWithDetails(service))
        );

        return {
            success: true,
            message: response.message,
            data: enrichedData,
            pagination: response.pagination || {
                current_page: 1,
                last_page: 1,
                per_page: params?.per_page || 3,
                total: enrichedData.length,
                next_page_url: null,
                prev_page_url: null,
                first_page_url: "?page=1",
                last_page_url: "?page=1",
                has_more_pages: false,
            },
        };
    }

    /**
     * Service Page Data Fetching Strategy - Single API call for all statuses
     */
    async fetchServicePageData(
        params?: ServiceRepositoryParams
    ): Promise<ServiceRepositoryResponse> {
        // Check if we need client-side status filtering
        let statusParam = params?.status;

        // Build API query parameters
        const apiQueryParams: APIServiceQueryParams = {
            search: params?.search,
            status: statusParam,
            category_slug: params?.category_slug,
            type_slug: params?.type_slug,
            spesialist_slug: params?.spesialist_slug,
            location: params?.location,
            page: params?.page,
            per_page: params?.per_page,
        };

        try {
            const apiParams = {
                page: params?.page,
                per_page: params?.per_page,
                search: params?.search,
                category_id: params?.category_id,
                category_slug: params?.category_slug,
                type_slug: params?.type_slug,
                spesialist_slug: params?.spesialist_slug,
                status: statusParam,
            };

            const response = await getServiceList(apiParams);

            if (!response.success) {
                throw new Error(
                    `API failed: ${response.message || "API request failed"}`
                );
            }

            const convertedData = response.data.map(convertServiceToService);
            return {
                success: true,
                message: response.message,
                data: convertedData,
                pagination: response.pagination || {
                    current_page: params?.page || 1,
                    last_page: 1,
                    per_page: params?.per_page || 6,
                    total: convertedData.length,
                    next_page_url: null,
                    prev_page_url: null,
                    first_page_url: "?page=1",
                    last_page_url: "?page=1",
                    has_more_pages: false,
                },
                availableSpesialists: response.availableSpesialists || [],
            };
        } catch (error) {
            console.error("Error in fetchServicePageData:", error);
            throw error;
        }
    }

    /**
     * Main Repository Query Function
     * Strategy Pattern: Routes to appropriate data fetching method
     */
    async query(
        params?: ServiceRepositoryParams
    ): Promise<PaginatedApiResponse<ServiceProps>> {
        try {
            if (params?.context === "home") {
                return await this.fetchHomeServices(params);
            } else {
                return await this.fetchServicePageData(params);
            }
        } catch (error) {
            return this.getFallbackData(params);
        }
    }

    /**
     * Fallback Data Strategy
     */
    getFallbackData(
        params?: ServiceRepositoryParams
    ): PaginatedApiResponse<ServiceProps> {
        const filteredServices = SERVICES_DATA.filter((service) => {
            if (params?.type && !service.type.includes(params.type)) {
                return false;
            }
            return (
                service.status === "berlangsung" || service.status === "akan datang"
            );
        });

        const page = params?.page || 1;
        const perPage =
            params?.per_page || (params?.context === "home" ? 3 : 6);
        const startIndex = (page - 1) * perPage;
        const paginatedData = filteredServices.slice(
            startIndex,
            startIndex + perPage
        );

        return {
            success: true,
            message: "Using static fallback data",
            data: paginatedData,
            pagination: {
                current_page: page,
                last_page: Math.ceil(filteredServices.length / perPage),
                per_page: perPage,
                total: filteredServices.length,
                next_page_url: null,
                prev_page_url: null,
                first_page_url: "?page=1",
                last_page_url: `?page=${Math.ceil(filteredServices.length / perPage)}`,
                has_more_pages:
                    page < Math.ceil(filteredServices.length / perPage),
            },
        };
    }
}

const serviceRepository = new ServiceRepository();

/**
 * Repository Hook: Main service data access
 */
export function useServiceRepository(
    params?: ServiceRepositoryParams,
    options?: { enabled?: boolean; initialData?: any }
): QueryObserverResult<PaginatedApiResponse<ServiceProps>, Error> {
    const queryKey = ServiceRepositoryKeys.list(params);

    const query = useQuery({
        queryKey,
        queryFn: async () => {
            try {
                const result = await serviceRepository.query(params);
                return result;
            } catch (error) {
                console.error("❌ useServiceRepository queryFn error:", error);
                throw error;
            }
        },
        retry: 1,
        refetchOnWindowFocus: false,

        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        enabled: options?.enabled !== false,

        initialData: options?.initialData,
    });

    return query;
}

/**
 * Factory Method: Home Services Repository
 */
export function useHomeServicesRepository(
    params?: Omit<ServiceRepositoryParams, "context">,
    options?: { enabled?: boolean }
) {
    return useServiceRepository({ ...params, context: "home" }, options);
}

/**
 * Factory Method: Service Page Repository
 */
export function useServicePageRepository(
    params?: Omit<ServiceRepositoryParams, "context">,
    options?: { enabled?: boolean; initialData?: any }
) {
    return useServiceRepository({ ...params, context: "service" }, options);
}

export function useServiceCategoriesRepository(options?: {
    enabled?: boolean;
}) {
    return useQuery({
        queryKey: ServiceRepositoryKeys.categories(),
        queryFn: async () => {
            return {
                success: true,
                message: "Fallback categories",
                data: [
                    { id: 1, name: "Webinar", blogs_count: 0 },
                    { id: 2, name: "Workshop", blogs_count: 0 },
                ],
            };
        },
        staleTime: 10 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: options?.enabled !== false,
    });
}

export function useAllServicesRepository(options?: { enabled?: boolean }) {
    return useQuery({
        queryKey: ServiceRepositoryKeys.allServices(),
        queryFn: async () => {
            try {
                const response = await getServiceList({
                    page: 1,
                    per_page: 1000,
                });
                const convertedData = response.data.map(
                    convertServiceToService
                );
                return {
                    success: true,
                    message: response.message,
                    data: convertedData,
                    pagination: response.pagination,
                };
            } catch {
                return serviceRepository.getFallbackData({ per_page: 1000 });
            }
        },
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        enabled: options?.enabled !== false,
    });
}

export const useServices = useServiceRepository;
export const useServiceCategories = useServiceCategoriesRepository;
export const useAllServices = useAllServicesRepository;
export const useHomeServices = useHomeServicesRepository;
export const useServicePageServices = useServicePageRepository;
