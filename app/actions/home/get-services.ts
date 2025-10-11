import { SERVICE_ENDPOINTS, buildUrlWithParams } from "~/api/api-url";
import { serverApiClient } from "~/api/server-client";
import {
    type PaginatedApiResponse,
    type Service,
    type ServiceQueryParams,
} from "~/types/api";

export async function getServices(
    params?: ServiceQueryParams
): Promise<PaginatedApiResponse<Service>> {
    try {
        const mapStatusToApi = (status: string): string => {
            return status;
        };

        const defaultParams: ServiceQueryParams = {
            per_page: 3,
            status: "akan datang,berlangsung",
            ...params,
        };

        const apiParams: Record<string, string | number | boolean | undefined> =
            {
                per_page: defaultParams.per_page,
            };

        if (params?.type_slug) {
            apiParams.type_slug = params.type_slug;
        }

        if (params?.category_id) {
            apiParams.category_id = params.category_id;
        }

        if (params?.category_slug) {
            apiParams.category_slug = params.category_slug;
        }

        if (params?.category_name) {
            apiParams.category_name = params.category_name;
        }

        if (params?.search) {
            apiParams.search = params.search;
        }

        if (defaultParams.status) {
            apiParams.status = defaultParams.status;
        }

        const url = buildUrlWithParams(SERVICE_ENDPOINTS.HOME_LIST, apiParams);

        const response =
            await serverApiClient.get<PaginatedApiResponse<Service>>(url);
        const data = response.data;

        const mapApiStatusToFrontend = (
            apiStatus: string
        ): "akan datang" | "berlangsung" | "selesai" => {
            if (["akan datang", "berlangsung", "selesai"].includes(apiStatus)) {
                return apiStatus as "akan datang" | "berlangsung" | "selesai";
            }
            return "akan datang";
        };

        const transformedData = {
            ...data,
            data: data.data.map((service) => {
                const primaryCategory =
                    service.categories && service.categories.length > 0
                        ? typeof service.categories[0] === "string"
                            ? service.categories[0]
                            : service.categories[0].name
                        : "Webinar";

                return {
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
                    type: primaryCategory as "Webinar" | "Workshop",
                    category: primaryCategory,
                    categories: service.categories || [],
                    types: service.types || [],
                    spesialists: service.spesialists || [],
                    presenters: service.presenters || [],
                    description: service.description || "",
                    rating: {
                        score: 0,
                        total: 0,
                    },
                };
            }),
        };

        return transformedData;
    } catch (error) {
        throw error;
    }
}
