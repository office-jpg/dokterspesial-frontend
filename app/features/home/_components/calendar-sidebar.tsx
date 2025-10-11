import { useMemo, memo } from "react";

import { Link } from "react-router";

import type { CalendarEvent } from "~/actions/home/get-calendar";
import { Badge } from "~/components/atoms/badge";
import { Button } from "~/components/atoms/button";
import { transformCalendarEvent, useCalendar } from "~/hooks/use-calendar";
import {
    getStatusBadgeVariant,
    getStatusColorClasses,
    getStatusDotColor,
    getStatusLabel,
} from "~/utils/status-colors";

interface CalendarSidebarProps {
    selectedDate: Date;
    statusFilter?: string;
    loaderData?: {
        calendar?: CalendarEvent[];
        calendarMeta?: {
            year: number;
            month: number;
            filter: string;
        };
    };
}

function CalendarSidebar({
    selectedDate,
    statusFilter = "berlangsung,akan datang", // Match default order with API
    loaderData,
}: CalendarSidebarProps) {
    const safeSelectedDate =
        selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
    const now = new Date();

    const hasSSRData = loaderData?.calendar?.length && 
        loaderData?.calendarMeta && 
        loaderData.calendarMeta.year === safeSelectedDate.getFullYear() &&
        loaderData.calendarMeta.month === (safeSelectedDate.getMonth() + 1) &&
        loaderData.calendarMeta.filter === statusFilter;

    const {
        events: apiEvents,
        isLoading,
        error,
    } = useCalendar({
        year: safeSelectedDate.getFullYear(),
        month: safeSelectedDate.getMonth() + 1,
        status: statusFilter,
        enabled: !hasSSRData,
    });

    const events = useMemo(() => {
        const sourceEvents = hasSSRData ? loaderData.calendar! : apiEvents;

        const dayEvents = sourceEvents.filter((event) => {
            const eventDate = new Date(event.start_time);
            return (
                eventDate.getDate() === safeSelectedDate.getDate() &&
                eventDate.getMonth() === safeSelectedDate.getMonth() &&
                eventDate.getFullYear() === safeSelectedDate.getFullYear()
            );
        });
        return dayEvents.map(transformCalendarEvent);
    }, [apiEvents, safeSelectedDate, hasSSRData, loaderData]);

    return (
        <div className="border-border bg-card sticky top-6 border p-4 shadow-sm">
            <div className="mb-4">
                <h3 className="text-foreground text-lg font-semibold">
                    {(selectedDate instanceof Date
                        ? selectedDate
                        : new Date(selectedDate)
                    ).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </h3>
                {!isLoading && !hasSSRData && events.length > 0 && (
                    <p className="text-muted-foreground mt-1 text-sm">
                        {events.length} acara
                    </p>
                )}
                {hasSSRData && events.length > 0 && (
                    <p className="text-muted-foreground mt-1 text-sm">
                        {events.length} acara
                    </p>
                )}
                {isLoading && !hasSSRData && (
                    <p className="text-muted-foreground mt-1 text-sm">
                        Memuat...
                    </p>
                )}
                {error && !hasSSRData && (
                    <p className="mt-1 text-sm text-red-500">
                        Gagal memuat acara
                    </p>
                )}
            </div>

            {isLoading && !hasSSRData ? (
                <div className="py-8 text-center">
                    <div className="border-primary mx-auto mb-2 size-6 animate-spin rounded-full border-2 border-t-transparent" />
                    <p className="text-muted-foreground text-sm">
                        Memuat acara...
                    </p>
                </div>
            ) : error && !hasSSRData ? (
                <div className="py-8 text-center">
                    <p className="mb-2 text-sm text-red-500">
                        Gagal memuat acara
                    </p>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.location.reload()}
                    >
                        Coba Lagi
                    </Button>
                </div>
            ) : events.length > 0 ? (
                <div className="max-h-96 space-y-3 overflow-y-auto">
                    {events.map((event: any) => (
                        <div
                            key={event.id}
                            className="border-border hover:bg-secondary/50 border p-3"
                        >
                            <div className="flex items-start gap-3">
                                <img
                                    src={event.image || "/placeholder/placeholder.svg"}
                                    alt={event.title}
                                    className="size-20 flex-shrink-0 object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                    <div className="mb-2 flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`h-3 w-3 flex-shrink-0 rounded-full ${
                                                    event.status
                                                        ? getStatusDotColor(
                                                              event.status
                                                          )
                                                        : "bg-primary"
                                                }`}
                                            />
                                            <span className="text-muted-foreground text-xs">
                                                {event.categoryName || "Event"}
                                            </span>
                                        </div>
                                        {event.status && (
                                            <Badge
                                                variant={getStatusBadgeVariant(
                                                    event.status
                                                )}
                                                className={`rounded-full text-xs ${getStatusColorClasses(event.status)}`}
                                            >
                                                {getStatusLabel(event.status)}
                                            </Badge>
                                        )}
                                    </div>
                                    <h4 className="text-foreground text-sm leading-tight font-medium">
                                        {event.title}
                                    </h4>
                                    <p className="text-muted-foreground mt-1 text-xs">
                                        {event.time}
                                    </p>
                                </div>
                            </div>
                            <Button
                                size="sm"
                                className="bg-tertiary mt-3 w-full"
                                asChild
                            >
                                <Link
                                    to={event.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Lihat Detail
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-8 text-center">
                    <p className="text-muted-foreground text-sm">
                        Tidak ada acara pada tanggal ini
                    </p>
                </div>
            )}
        </div>
    );
}

export default memo(CalendarSidebar);
