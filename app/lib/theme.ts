import { THEME, setStorageItem, getStorageItem } from "~/utils/local-storage";

export type Theme = "light" | "dark";

export function getSystemTheme(): "light" | "dark" {
    if (typeof window === "undefined") return "light";
    
    try {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch (_e) {
        return "light";
    }
}

export function getCurrentTheme(): "light" | "dark" {
    if (typeof document === "undefined") return "light";
    
    try {
        return document.documentElement.classList.contains("dark") ? "dark" : "light";
    } catch (_e) {
        return "light";
    }
}

export function getStoredTheme(): "light" | "dark" | null {
    const stored = getStorageItem(THEME);
    if (stored === "light" || stored === "dark") {
        return stored;
    }
    return null;
}

export function applyTheme(theme: "light" | "dark"): void {
    try {
        if (typeof document !== "undefined") {
            if (theme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            setStorageItem(THEME, theme);
        }
    } catch (_e) {
    }
}

export function initializeTheme(): "light" | "dark" {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
        return storedTheme;
    }
    
    const systemTheme = getSystemTheme();
    setStorageItem(THEME, systemTheme);
    return systemTheme;
}
