import { SERVICE_ENDPOINTS } from "~/api/api-url";
import { serverApiClient } from "~/api/server-client";
import { type ServiceProps } from "~/types";
import { type ServiceDetailResponse } from "~/types/api";

export async function getServiceDetail(slug: string): Promise<ServiceProps> {
    try {
        const decodedSlug = decodeURIComponent(slug);
        const cleanSlug = decodedSlug
            .toLowerCase()
            .trim()

            .replace(/\s+/g, "-")
            .replace(/[^\w\-]/g, "")

            .replace(/-+/g, "-")

            .replace(/^-+|-+$/g, "");

        const url = SERVICE_ENDPOINTS.DETAIL(cleanSlug);

        const response = await serverApiClient.get<ServiceDetailResponse>(url);
        const result = response.data;

        if (!result.success) {
            throw new Error(result.message || "Failed to fetch service detail");
        }

        const { data } = result;

        const primaryCategory =
            data.categories && data.categories.length > 0
                ? data.categories[0].name
                : data.category_event?.name || "General";

        const primaryType =
            data.types && data.types.length > 0
                ? data.types[0].name
                : data.type_event?.name || "General";

        const primaryPresenter =
            data.presenters && data.presenters.length > 0
                ? data.presenters[0].name
                : data.presenter?.name || "TBA";

        const service: ServiceProps = {
            name: data.name,
            title: data.name,
            category: primaryCategory,
            slug: data.slug,
            description: data.description,
            image:
                data.image_url || data.image || "/placeholder/placeholder.svg",
            price: {
                current: data.price_discount === 0 ? 0 : data.price_discount,
                original: data.price,
            },
            date: new Date(data.start_time).toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
            time: `${new Date(data.start_time).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
            })} - ${new Date(data.end_time).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
            })}`,
            startDate: new Date(data.start_time).toLocaleDateString("id-ID"),
            endDate: new Date(data.end_time).toLocaleDateString("id-ID"),
            startTime: new Date(data.start_time).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            endTime: new Date(data.end_time).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            start_time: data.start_time,
            end_time: data.end_time,
            location: data.location === "offline" ? "Offline" : "Online",
            format: data.location === "offline" ? "Offline" : "Online",
            type: primaryCategory as "Webinar" | "Workshop",
            type_event: primaryType,
            type_event_id:
                data.types && data.types.length > 0
                    ? data.types[0].id
                    : data.type_event?.id || 0,
            status: (
                data.status === "upcoming" ? "akan datang" :
                data.status === "ongoing" ? "berlangsung" :
                data.status === "completed" ? "selesai" :
                data.status
            ) as "akan datang" | "berlangsung" | "selesai",
            totalUsers: data.total_participants,
            total_video: data.total_video,
            presenter: {
                name: primaryPresenter,
            },

            categories: data.categories || [],
            types: data.types || [],
            spesialists: data.spesialists || [],
            presenters: data.presenters || [],
            rating: {
                score:
                    data.reviews.length > 0
                        ? Math.round(
                              (data.reviews.reduce(
                                  (sum: number, review: any) =>
                                      sum + review.rating,
                                  0
                              ) /
                                  data.reviews.length) *
                                  10
                          ) / 10
                        : 5.0,
                total: data.reviews.length,
            },
            reviews: data.reviews.map((review: any) => ({
                id: review.id,
                reviewer: review.author,
                rating: review.rating,
                comment: review.comment || "",
                created_at: review.created_at,
            })),
        };

        return service;
    } catch (error) {
        throw error;
    }
}
