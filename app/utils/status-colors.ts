/**
 * Utility functions for status colors and styling
 * Provides consistent color schemes across service and calendar components
 */

export type StatusType = "akan datang" | "berlangsung" | "selesai";

/**
 * Get status color classes for badges and indicators
 */
export const getStatusColorClasses = (status: StatusType): string => {
    switch (status) {
        case "akan datang":
            return "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200";
        case "berlangsung":
            return "bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-200";
        case "selesai":
            return "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-200";
        default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-200";
    }
};

/**
 * Get status background color for calendar dots and indicators
 */
export const getStatusDotColor = (status: StatusType): string => {
    switch (status) {
        case "akan datang":
            return "bg-blue-500";
        case "berlangsung":
            return "bg-orange-500";
        case "selesai":
            return "bg-gray-500";
        default:
            return "bg-gray-400";
    }
};

/**
 * Get status text label in Indonesian
 */
export const getStatusLabel = (status: StatusType): string => {
    switch (status) {
        case "akan datang":
            return "Akan Datang";
        case "berlangsung":
            return "Sedang Berlangsung";
        case "selesai":
            return "Selesai";
        default:
            return "Tersedia";
    }
};

/**
 * Get badge variant for different status types
 */
export const getStatusBadgeVariant = (status: StatusType): "default" | "secondary" | "outline" => {
    switch (status) {
        case "akan datang":
            return "default";
        case "berlangsung":
            return "secondary";
        case "selesai":
            return "outline";
        default:
            return "outline";
    }
};
