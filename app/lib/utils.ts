import { type ClassValue, clsx } from "clsx";
import * as Color from "color-bits";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getRGBA = (
    cssColor: React.CSSProperties["color"],
    fallback: string = "rgba(180, 180, 180)"
): string => {
    if (typeof window === "undefined") return fallback;
    if (!cssColor) return fallback;

    try {
        if (typeof cssColor === "string" && cssColor.startsWith("var(")) {
            const element = document.createElement("div");
            element.style.color = cssColor;
            document.body.appendChild(element);
            const computedColor = window.getComputedStyle(element).color;
            document.body.removeChild(element);
            return Color.formatRGBA(Color.parse(computedColor));
        }

        return Color.formatRGBA(Color.parse(cssColor));
    } catch (e) {
        console.error("Color parsing failed:", e);
        return fallback;
    }
};

export const colorWithOpacity = (color: string, opacity: number): string => {
    if (!color.startsWith("rgb")) return color;
    return Color.formatRGBA(Color.alpha(Color.parse(color), opacity));
};

export const focusInput = [
    "focus:ring-2",
    "focus:ring-blue-200 focus:dark:ring-blue-700/30",
    "focus:border-blue-500 focus:dark:border-blue-700",
];

export const focusRing = [
    "outline outline-offset-2 outline-0 focus-visible:outline-2",
    "outline-blue-500 dark:outline-blue-500",
];

export const hasErrorInput = [
    "ring-2",
    "border-red-500 dark:border-red-700",
    "ring-red-200 dark:ring-red-700/30",
];

export {
    sanitizeContent,
    sanitizeContentAsHtml,
    sanitizeContentAsText,
    type SanitizeOptions,
} from "./content-sanitizer";
