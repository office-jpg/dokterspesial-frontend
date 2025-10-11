import { useQuery } from "@tanstack/react-query";

import {
    type CalendarEvent,
    type CalendarQueryParams,
    getCalendarEvents,
} from "~/actions/home/get-calendar";

export interface UseCalendarOptions {
    year?: number;
    month?: number;
    status?: string;
    enabled?: boolean;
}

export function useCalendar(options: UseCalendarOptions = {}) {
    const { year, month, status, enabled = true } = options;

    const now = new Date();
    const currentYear = year || now.getFullYear();
    const currentMonth = month || now.getMonth() + 1;
    const filterStatus = status || "akan datang,berlangsung";

    const queryParams: CalendarQueryParams = {
        year: currentYear,
        month: currentMonth,
        status: filterStatus,
    };

    const query = useQuery({
        queryKey: ["calendar", currentYear, currentMonth, filterStatus],
        queryFn: () => getCalendarEvents(queryParams),
        enabled,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });

    return {
        events: query.data || [],
        isLoading: query.isLoading,
        error: query.error,
        refetch: query.refetch,
        isError: query.isError,
    };
}

export function getEventsForDate(
    events: CalendarEvent[],
    date: Date
): CalendarEvent[] {
    return events.filter((event) => {
        const eventDate = new Date(event.start_time);
        return (
            eventDate.getDate() === date.getDate() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getFullYear() === date.getFullYear()
        );
    });
}

export function formatEventTime(startTime: string, endTime: string): string {
    const start = new Date(startTime);
    const end = new Date(endTime);

    const startStr = start.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const endStr = end.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return `${startStr} - ${endStr}`;
}

export function transformCalendarEvent(event: CalendarEvent) {
    return {
        id: event.id,
        title: event.name,
        time: formatEventTime(event.start_time, event.end_time),
        status: event.status,
        image: event.image_url || event.image || "/placeholder/placeholder.svg",
        url: `/event/${event.slug}`,
        categoryName: "Event",
    };
}
