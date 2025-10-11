export const getStorageItem = (key: string): string | null => {
    try {
        if (typeof window === "undefined" || !window.localStorage) {
            return null;
        }
        return localStorage.getItem(key);
    } catch (_e) {
        return null;
    }
};

export const setStorageItem = (key: string, value: string): void => {
    try {
        if (typeof window === "undefined" || !window.localStorage) {
            return;
        }
        localStorage.setItem(key, value);
    } catch (_e) {
        return;
    }
};

export const THEME = "theme";   