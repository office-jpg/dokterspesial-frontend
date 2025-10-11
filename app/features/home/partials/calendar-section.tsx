import { memo, useMemo, useState, useCallback } from "react";

import { useSearchParams } from "react-router";

import type { CalendarEvent } from "~/actions/home/get-calendar";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import SectionHeader from "~/components/atoms/section-header";
import { CALENDAR_EVENTS } from "~/contents/calendar";
import CalendarGrid from "~/features/home/_components/calendar-grid";
import CalendarHeader from "~/features/home/_components/calendar-header";
import CalendarSidebar from "~/features/home/_components/calendar-sidebar";
import { useCalendar } from "~/hooks/use-calendar";
import { getStatusDotColor } from "~/utils/status-colors";

interface CalendarSectionProps {
    loaderData?: {
        calendar?: CalendarEvent[];
        calendarMeta?: {
            year: number;
            month: number;
            filter: string;
        };
    };
}

function CalendarSection({ loaderData }: CalendarSectionProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const now = new Date();
    
    // Get state from URL params
    const currentMonth = parseInt(searchParams.get("month") || (now.getMonth() + 1).toString());
    const currentYear = parseInt(searchParams.get("year") || now.getFullYear().toString());
    const programFilter = searchParams.get("filter") || "berlangsung,akan datang"; // Default to ongoing + upcoming
    
    const currentDate = new Date(currentYear, currentMonth - 1, 1);
    
    // Add state for selected date
    const [selectedDate, setSelectedDateState] = useState<Date>(
        new Date(now.getFullYear(), now.getMonth(), now.getDate())
    );

    const navigateMonth = useCallback((direction: "prev" | "next") => {
        const newDate = new Date(currentDate);
        if (direction === "prev") {
            newDate.setMonth(currentDate.getMonth() - 1);
        } else {
            newDate.setMonth(currentDate.getMonth() + 1);
        }
        
        setSearchParams(prev => {
            prev.set("month", (newDate.getMonth() + 1).toString());
            prev.set("year", newDate.getFullYear().toString());
            return prev;
        }, { replace: true, preventScrollReset: true });
    }, [currentDate, setSearchParams]);

    const setProgramFilter = useCallback((filter: string) => {
        setSearchParams(prev => {
            prev.set("filter", filter);
            return prev;
        }, { replace: true, preventScrollReset: true });
    }, [setSearchParams]);

    const setSelectedDate = useCallback((date: Date) => {
        setSelectedDateState(date);
    }, []);

    const hasSSRData = loaderData?.calendar?.length && 
        loaderData?.calendarMeta && 
        loaderData.calendarMeta.year === currentDate.getFullYear() &&
        loaderData.calendarMeta.month === (currentDate.getMonth() + 1) &&
        loaderData.calendarMeta.filter === programFilter;

    const { events: apiEvents } = useCalendar({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        status: programFilter,
        enabled: !hasSSRData,
    });

    const calendarEvents = useMemo(() => {
        let sourceEvents: CalendarEvent[] = [];

        if (hasSSRData) {
            // Use SSR data when available and filter matches
            sourceEvents = loaderData.calendar!;
        } else if (apiEvents.length > 0) {
            // Use API data when SSR not available
            sourceEvents = apiEvents;
        } else {
            // Use fallback data with current month adjustment
            const currentMonthEvents = CALENDAR_EVENTS.map((event, index) => {
                // Adjust date to current month for testing
                const eventDate = new Date(event.date);
                const adjustedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), eventDate.getDate(), eventDate.getHours(), eventDate.getMinutes());
                
                return {
                    id: index + 1,
                    name: event.title,
                    slug: `event-${index + 1}`,
                    start_time: adjustedDate.toISOString(),
                    end_time: adjustedDate.toISOString(),
                    status: (event.status || event.category) as "akan datang" | "berlangsung" | "selesai",
                    image: event.image,
                    image_url: event.image,
                };
            });
            sourceEvents = currentMonthEvents;
        }

        return sourceEvents.map((event) => ({
            id: event.id,
            title: event.name,
            date: event.start_time,
            time: new Date(event.start_time).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            category: event.status,
            categoryName:
                event.status === "akan datang"
                    ? "Akan Datang"
                    : event.status === "berlangsung"
                      ? "Sedang Berlangsung"
                      : "Selesai",
            image: event.image_url || event.image || "/placeholder/placeholder.svg",
            url: `/service/${event.slug}`,
            color: getStatusDotColor(event.status),
            status: event.status,
        }));
    }, [loaderData, apiEvents, hasSSRData, currentDate, programFilter]);

    const getEventsForDateDisplay = useCallback((date: Date) => {
        return calendarEvents.filter((event) => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === date.toDateString();
            // No need to filter by status here since API already filters
        });
    }, [calendarEvents]);

    return (
        <section className="bg-muted/20 md:py-24 py-8">
            <MaxWidthWrapper>
                <SectionHeader
                    badge="Program"
                    title={
                        <>
                            Jadwal Event
                            <br />
                            <span className="text-primary">Kami</span>
                        </>
                    }
                />

                <CalendarHeader
                    currentDate={currentDate}
                    programFilter={programFilter}
                    onNavigateMonth={navigateMonth}
                    onFilterChange={setProgramFilter}
                />

                <div className="flex flex-col gap-4 md:gap-6 lg:flex-row">
                    <div className="flex-1">
                        <CalendarGrid
                            key={`calendar-${currentDate.getFullYear()}-${currentDate.getMonth()}`}
                            currentDate={currentDate}
                            selectedDate={selectedDate}
                            onDateSelect={setSelectedDate}
                            getEventsForDate={getEventsForDateDisplay}
                        />
                    </div>

                    <div className="lg:w-80 xl:w-96">
                        <CalendarSidebar
                            key={`sidebar-${selectedDate.toDateString()}`}
                            selectedDate={selectedDate}
                            statusFilter={programFilter}
                            loaderData={loaderData}
                        />
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default memo(CalendarSection);
