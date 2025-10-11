import { memo } from "react";
import { DAY_NAMES } from "~/contents/calendar";
import type { Event } from "~/contents/calendar";
import { getStatusDotColor } from "~/utils/status-colors";

interface CalendarGridProps {
    currentDate: Date;
    selectedDate: Date;
    onDateSelect: (date: Date) => void;
    getEventsForDate: (date: Date) => Event[];
}

function CalendarGrid({
    currentDate,
    selectedDate,
    onDateSelect,
    getEventsForDate,
}: CalendarGridProps) {
    const safeCurrentDate =
        currentDate instanceof Date ? currentDate : new Date(currentDate);
    const safeSelectedDate =
        selectedDate instanceof Date ? selectedDate : new Date(selectedDate);

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(safeCurrentDate);
        const firstDay = getFirstDayOfMonth(safeCurrentDate);
        const days = [];

        const prevMonth = new Date(
            safeCurrentDate.getFullYear(),
            safeCurrentDate.getMonth() - 1,
            0
        );
        const prevMonthDays = prevMonth.getDate();

        for (let i = firstDay - 1; i >= 0; i--) {
            const day = prevMonthDays - i;
            days.push(
                <div
                    key={`prev-${day}`}
                    className="text-muted-foreground bg-secondary/50 h-16 p-1 md:h-20 md:p-2"
                >
                    <span className="text-xs md:text-sm">{day}</span>
                </div>
            );
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(
                safeCurrentDate.getFullYear(),
                safeCurrentDate.getMonth(),
                day
            );
            const dayEvents = getEventsForDate(date);
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected =
                date.toDateString() === safeSelectedDate.toDateString();

            days.push(
                <div
                    key={day}
                    className={`border-border hover:bg-secondary/20 h-16 cursor-pointer border-r border-b p-1 md:h-20 md:p-2 ${
                        isSelected
                            ? "bg-tertiary/10 border-tertiary/30"
                            : "bg-background"
                    }`}
                    onClick={() => onDateSelect(date)}
                >
                    <div className="flex items-start justify-between">
                        <span
                            className={`text-xs font-medium md:text-sm ${
                                isToday
                                    ? "bg-primary text-primary-foreground flex h-5 w-5 items-center justify-center text-xs md:h-6 md:w-6"
                                    : "text-foreground"
                            }`}
                        >
                            {day}
                        </span>
                        {dayEvents.length > 0 && (
                            <span className="bg-primary/20 text-primary px-1 py-0.5 text-xs md:px-1.5">
                                {dayEvents.length}
                            </span>
                        )}
                    </div>

                    {dayEvents.length > 0 && (
                        <div className="mt-1 flex gap-0.5 md:mt-2 md:gap-1">
                            {dayEvents.slice(0, 3).map((event) => (
                                <div
                                    key={event.id}
                                    className={`h-1.5 w-1.5 rounded-full md:h-2 md:w-2 ${
                                        event.status
                                            ? getStatusDotColor(event.status)
                                            : event.color || "bg-primary"
                                    }`}
                                    title={event.title}
                                />
                            ))}
                            {dayEvents.length > 3 && (
                                <span className="text-muted-foreground hidden text-xs md:inline">
                                    +{dayEvents.length - 3}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            );
        }

        const remainingDays = 42 - days.length;
        for (let day = 1; day <= remainingDays; day++) {
            days.push(
                <div
                    key={`next-${day}`}
                    className="text-muted-foreground bg-secondary/50 h-16 p-1 md:h-20 md:p-2"
                >
                    <span className="text-xs md:text-sm">{day}</span>
                </div>
            );
        }

        return days;
    };

    return (
        <div className="bg-card border-border overflow-hidden border shadow-sm">
            <div className="bg-secondary grid grid-cols-7">
                {DAY_NAMES.map((day) => (
                    <div
                        key={day}
                        className="text-secondary-foreground p-2 text-center text-xs font-medium md:p-3 md:text-sm"
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7">{renderCalendarDays()}</div>
        </div>
    );
}

export default memo(CalendarGrid);
