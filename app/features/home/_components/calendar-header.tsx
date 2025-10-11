import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo } from "react";
import { Button } from "~/components/atoms/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/atoms/select";
import { MONTH_NAMES, PROGRAM_FILTERS } from "~/contents/calendar";

interface CalendarHeaderProps {
    currentDate: Date;
    programFilter: string;
    onNavigateMonth: (direction: "prev" | "next") => void;
    onFilterChange: (value: string) => void;
}

function CalendarHeader({
    currentDate,
    programFilter,
    onNavigateMonth,
    onFilterChange,
}: CalendarHeaderProps) {
    return (
        <div className="mb-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onNavigateMonth("prev")} 
                            className="size-8 p-0"
                        >
                            <ChevronLeft className="size-4" />
                        </Button>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => onNavigateMonth("next")} 
                            className="size-8 p-0"
                        >
                            <ChevronRight className="size-4" />
                        </Button>
                    </div>
                    <h1 className="text-xl md:text-2xl font-bold text-foreground">
                        {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <Select value={programFilter} onValueChange={onFilterChange}>
                        <SelectTrigger className="w-48 md:w-48">
                            <SelectValue placeholder="Program" />
                        </SelectTrigger>
                        <SelectContent>
                            {PROGRAM_FILTERS.map((filter) => (
                                <SelectItem key={filter.value} value={filter.value}>
                                    {filter.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}

export default memo(CalendarHeader);
