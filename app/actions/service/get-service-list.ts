import {
    SERVICE_ENDPOINTS,
    buildUrlWithParams,
    normalizePaginationUrl,
    normalizeUrl,
} from "~/api/api-url";
import { serverApiClient } from "~/api/server-client";
import {
    type ServiceListApiResponse,
    type Service,
    type ServiceQueryParams,
} from "~/types/api";
import { type ServiceListResponse } from "~/types";

interface ServiceParams {
    page?: number;
    per_page?: number;
    search?: string;
    type?: string;
    category?: string;
    status?: string;
}

export async function getServiceList(
    params?: ServiceQueryParams
): Promise<ServiceListResponse> {
    try {
        // Backend expects Indonesian statuses directly
        const mapStatusToApi = (status: string): string => {
            return status; 
        };

        // Add default status filter but allow user override
        const defaultParams: ServiceQueryParams = {
            status: params?.status || "berlangsung,akan datang", // Default to active events, but allow user override
            ...params,
        };
        
        const apiParams: Record<string, string | number | boolean | undefined> =
            {};

        if (defaultParams?.page) apiParams.page = defaultParams.page;
        if (defaultParams?.per_page) apiParams.per_page = defaultParams.per_page;
        if (defaultParams?.search) apiParams.search = defaultParams.search;
        if (defaultParams?.status) apiParams.status = mapStatusToApi(defaultParams.status);
        if (defaultParams?.category_id) apiParams.category_id = defaultParams.category_id;
        if (defaultParams?.category_slug) apiParams.category_slug = defaultParams.category_slug;
        if (defaultParams?.type_id) apiParams.type_id = defaultParams.type_id;
        if (defaultParams?.type_slug) apiParams.type_slug = defaultParams.type_slug;
        if (defaultParams?.spesialist_id) apiParams.spesialist_id = defaultParams.spesialist_id;
        if (defaultParams?.spesialist_slug) apiParams.spesialist_slug = defaultParams.spesialist_slug;
        if (defaultParams?.location) apiParams.location = defaultParams.location;

        const url = buildUrlWithParams(SERVICE_ENDPOINTS.LIST, apiParams);
        

        
        const response =
            await serverApiClient.get<ServiceListApiResponse>(url);
        const data = response.data;
        


      
        const mapApiStatusToFrontend = (apiStatus: string): "akan datang" | "berlangsung" | "selesai" => {
          
            if (['akan datang', 'berlangsung', 'selesai'].includes(apiStatus)) {
                return apiStatus as "akan datang" | "berlangsung" | "selesai";
            }
            return 'akan datang'; 
        };

        const transformedData = {
            ...data,
            data: data.data.map((service) => ({
                ...service,
                title: service.name,
                status: mapApiStatusToFrontend(service.status), 
                image:
                    service.image_url ||
                    service.image ||
                    "/placeholder/placeholder.svg",
                date: service.start_time,
                time: service.start_time,
                startDate: service.start_time,
                endDate: service.end_time,
                startTime: service.start_time,
                endTime: service.end_time,
                type: (service.categories && service.categories.length > 0 
                    ? (typeof service.categories[0] === 'object' ? service.categories[0].name : service.categories[0])
                    : "Webinar") as "Webinar" | "Workshop",
                category: service.categories && service.categories.length > 0 
                    ? (typeof service.categories[0] === 'object' ? service.categories[0].name : service.categories[0])
                    : "Webinar",
                categories: service.categories || [],
                types: service.types || [],
                spesialists: service.spesialists || [],
                presenters: service.presenters || [],
                description: service.description || "",

                type_event: service.types && service.types.length > 0 
                    ? (typeof service.types[0] === 'object' ? service.types[0].name : service.types[0])
                    : "",
                type_event_id: service.types && service.types.length > 0 
                    ? (typeof service.types[0] === 'object' ? service.types[0].id : undefined)
                    : undefined,
                presenter: service.presenters && service.presenters.length > 0
                    ? service.presenters[0].name
                    : "TBA",
                presenter_info: {
                    name: service.presenters && service.presenters.length > 0
                        ? service.presenters[0].name
                        : "TBA",
                    spesialist: service.spesialists && service.spesialists.length > 0
                        ? (typeof service.spesialists[0] === 'object' ? service.spesialists[0].name : service.spesialists[0])
                        : "",
                },
                rating: {
                    score: 0,
                    total: 0,
                },

                price_discount: service.price_discount || 0,
            })),
        };

      
      
        const availableSpesialists = data.filters?.spesialists || [];

      
        const responseWithSpesialists = {
            ...transformedData,
            availableSpesialists: availableSpesialists,
            filters: data.filters // Pass through filters from API
        };

        if (responseWithSpesialists.pagination) {
            responseWithSpesialists.pagination.next_page_url = normalizePaginationUrl(
                responseWithSpesialists.pagination.next_page_url
            );
            responseWithSpesialists.pagination.prev_page_url = normalizePaginationUrl(
                responseWithSpesialists.pagination.prev_page_url
            );
            responseWithSpesialists.pagination.first_page_url = normalizeUrl(
                responseWithSpesialists.pagination.first_page_url
            );
            responseWithSpesialists.pagination.last_page_url = normalizeUrl(
                responseWithSpesialists.pagination.last_page_url
            );
        }

        return responseWithSpesialists;
    } catch (error) {
        console.error("API Error in getServiceList:", error);

        throw error;
    }
}
