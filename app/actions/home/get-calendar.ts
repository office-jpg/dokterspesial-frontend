import { CALENDAR_ENDPOINTS, buildUrlWithParams } from "~/api/api-url";
import { getServerAuthHeaders } from "~/api/environment";
import type { ApiResponse } from "~/types";

interface CalendarEventApiResponse {
    id: number;
    name: string;
    slug: string;
    start_time: string;
    end_time: string;
    status: "akan datang" | "berlangsung" | "selesai"; // API now uses Indonesian status
    image: string | null;
    image_url?: string;
}

export interface CalendarEvent {
    id: number;
    name: string;
    slug: string;
    start_time: string;
    end_time: string;
    status: "akan datang" | "berlangsung" | "selesai";
    image: string | null;
    image_url?: string;
}

export interface CalendarQueryParams {
    year?: number;
    month?: number;
    status?: string; // status filter for calendar events
}

export async function getCalendarEvents(
    params?: CalendarQueryParams
): Promise<CalendarEvent[]> {
    try {
        const now = new Date();
        const year = params?.year || now.getFullYear();
        const month = params?.month || now.getMonth() + 1;

        const url = buildUrlWithParams(CALENDAR_ENDPOINTS.LIST, {
            year,
            month,
            status: params?.status || "berlangsung,akan datang", // Default filter in Indonesian
        });

        const response = await fetch(url, {
            headers: getServerAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<CalendarEventApiResponse[]> =
            await response.json();

        if (!result.success) {
            throw new Error(
                result.message || "Failed to fetch calendar events"
            );
        }

        // No need to map status since API already returns Indonesian status
        return result.data || [];
    } catch (error) {
        console.error("Error fetching calendar events:", error);
        return [];
    }
}
