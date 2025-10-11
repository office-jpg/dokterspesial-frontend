import { type ServiceProps } from "~/types";
import { type Service } from "~/types/api";

/**
 * Convert Service from API to ServiceProps format
 */
export function convertServiceToService(service: Service): ServiceProps {
    const getFormat = (location: string): "Online" | "Offline" => {
        switch (location.toLowerCase()) {
            case "online":
                return "Online";
            case "offline":
                return "Offline";
            default:
                return "Online";
        }
    };

    const mapTypeServiceToId = (
        typeService: string | undefined
    ): number | undefined => {
        if (!typeService) return undefined;

        const mapping: Record<string, number> = {
            webinar: 1,
            workshop: 2,
        };

        return mapping[typeService.toLowerCase()];
    };

    const mapTypeEventToId = (
        typeEvent: string | undefined
    ): number | undefined => {
        if (!typeEvent) return undefined;

        const mapping: Record<string, number> = {
            "kedokteran klinis": 1,
            "dosen & akademisi": 2,
            "peneliti & mahasiswa s2/s3": 3,
            "tenaga kesehatan lainnya": 4,
        };

        return mapping[typeEvent.toLowerCase()];
    };

    const originalPrice = service.price;
    const hasDiscount = service.price_discount && service.price_discount > 0 && service.price_discount < service.price;
    const currentPrice = hasDiscount ? service.price_discount : service.price;

    const result: ServiceProps = {
        name: service.name,
        title: service.name,
        slug: service.slug,
        date: formatServiceDate(service.start_time),
        startDate: service.start_time,
        endDate: service.end_time,
        time: formatServiceTime(service.start_time, service.end_time),
        startTime: formatTime(service.start_time),
        endTime: formatTime(service.end_time),
        location: service.location || "Online",
        description: service.description || "",
        category: service.category || "Umum",
        type: mapServiceType(service.category),
        format: getFormat(service.location || "online"),
        type_event: service.types && service.types.length > 0 ? service.types[0].name : service.type_event,
        type_event_id:
            service.types && service.types.length > 0 ? service.types[0].id :
            service.type_event_id || mapTypeEventToId(service.type_event),
        type_service: service.category,
        type_service_id: mapTypeServiceToId(service.category),
        categories: service.categories || [service.category],
        types: service.types || [],
        spesialists: service.spesialists || [],
        presenters: service.presenters || (service.presenter ? [{ id: 0, name: service.presenter }] : []),
        price: {
            current: currentPrice,
            original: originalPrice,
        },
        price_discount: service.price_discount, 
        presenter: {
            name: service.presenter_detail?.name || service.presenter || "TBA",
        },
        image: service.image_url || service.image || "/placeholder.jpg",
        rating: {
            score: calculateAverageRating(service.reviews || []),
            total: service.reviews?.length || 0,
        },
        totalUsers: service.total_participants || 0,
        status: service.status,
        reviews: service.reviews?.map((review) => ({
            id: review.id,
            reviewer: review.reviewer,
            rating: review.rating,
            comment: review.comment || "",
            created_at: review.created_at || new Date().toISOString(),
        })),
    };
    return result;
}

function formatServiceDate(dateString: string): string {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "TBA";
        }
        return date.toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    } catch {
        return "TBA";
    }
}

/**
 * Format date with "/" separator (DD/MM/YYYY)
 */
export function formatDateSlash(dateString: string | undefined): string {
    if (!dateString) return "TBA";
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "TBA";
        }
        return date
            .toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })
            .replace(/\./g, "/");
    } catch {
        return "TBA";
    }
}

/**
 * Format time (HH:MM)
 */
export function formatTimeOnly(dateString: string | undefined): string {
    if (!dateString) return "TBA";
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "TBA";
        }
        return date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    } catch {
        return "TBA";
    }
}

function formatServiceTime(startTime: string, endTime?: string): string {
    try {
        const start = new Date(startTime);
        if (isNaN(start.getTime())) {
            return "TBA";
        }

        const startTimeStr = start.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });

        if (endTime) {
            const end = new Date(endTime);
            if (!isNaN(end.getTime())) {
                const endTimeStr = end.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                });
                return `${startTimeStr} - ${endTimeStr}`;
            }
        }

        return startTimeStr;
    } catch {
        return "TBA";
    }
}

function formatTime(dateString: string): string {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "TBA";
        }
        return date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return "TBA";
    }
}

function mapServiceType(category?: string): "Webinar" | "Workshop" {
    if (!category) return "Webinar";
    return category.toLowerCase().includes("workshop") ? "Workshop" : "Webinar";
}

function calculateAverageRating(reviews: any[]): number {
    if (!reviews || reviews.length === 0) return 0;

    const totalRating = reviews.reduce(
        (sum, review) => sum + (review.rating || 0),
        0
    );
    return Math.round((totalRating / reviews.length) * 10) / 10;
}

export function createWhatsAppServiceUrl(
    service: ServiceProps,
    getServiceTypeName?: (id?: number) => string
): string {
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const phoneNumber = "6285171414114";

    const message = `Halo, saya ingin mendaftar layanan Klinik Ilmiah:

*${service.title}*

📋 *Detail Event:*
• Harga: ${formatPrice(typeof service.price === 'number' ? service.price : service.price.current)}
• Kategori: ${service.category || service.type}
• Jenis Acara: ${service.type_service_id && getServiceTypeName ? getServiceTypeName(service.type_service_id) : "Umum"}
• Presenter: ${service.presenter?.name || "TBA"}
• Tanggal & Jam: ${service.date} • ${service.time}
• Format: ${service.format || "Online"}

Mohon informasi lebih lanjut untuk pendaftaran. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);

    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
