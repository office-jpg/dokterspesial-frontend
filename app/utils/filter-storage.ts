/**
 * Utility functions for managing filter storage
 */

const SERVICE_FILTER_STORAGE_KEY = "service-filter-storage";
const BLOG_FILTER_STORAGE_KEY = "blog-filter-storage";

interface StoredServiceFilterState {
    selectedType: string[];
    selectedTypeEvent: string[];
    selectedStatus: string[];
}

interface StoredBlogFilterState {
    selectedCategories: string[];
    selectedCategoryIds: number[];
    searchTerm?: string;
}

const DEFAULT_SERVICE_FILTER_STATE: StoredServiceFilterState = {
    selectedType: ["Webinar", "Workshop"],
    selectedTypeEvent: [],
    selectedStatus: ["upcoming", "ongoing"],
};

const DEFAULT_BLOG_FILTER_STATE: StoredBlogFilterState = {
    selectedCategories: [],
    selectedCategoryIds: [],
    searchTerm: "",
};

/**
 * Check if stored service filter state is valid
 */
function isValidServiceFilterState(
    state: any
): state is StoredServiceFilterState {
    return (
        state &&
        typeof state === "object" &&
        Array.isArray(state.selectedType) &&
        Array.isArray(state.selectedTypeEvent) &&
        Array.isArray(state.selectedStatus) &&
        state.selectedStatus.length > 0
    );
}

/**
 * Check if stored blog filter state is valid
 */
function isValidBlogFilterState(state: any): state is StoredBlogFilterState {
    return (
        state &&
        typeof state === "object" &&
        Array.isArray(state.selectedCategories) &&
        Array.isArray(state.selectedCategoryIds)
    );
}

/**
 * Get valid service filter state from localStorage or return defaults
 */
export function getValidServiceFilterState(): StoredServiceFilterState {
    if (typeof window === "undefined") {
        return DEFAULT_SERVICE_FILTER_STATE;
    }

    try {
        const stored = localStorage.getItem(SERVICE_FILTER_STORAGE_KEY);
        if (!stored) {
            return DEFAULT_SERVICE_FILTER_STATE;
        }

        const parsed = JSON.parse(stored);
        const state = parsed?.state;

        if (isValidServiceFilterState(state)) {
            const validDefaultStatuses = ["upcoming", "ongoing"];
            const hasOnlyValidDefaults =
                state.selectedStatus.every((status: string) =>
                    validDefaultStatuses.includes(status)
                ) && state.selectedStatus.length === 2;

            if (!hasOnlyValidDefaults) {
                return {
                    ...state,
                    selectedStatus: DEFAULT_SERVICE_FILTER_STATE.selectedStatus,
                };
            }

            return {
                ...state,
                selectedStatus: DEFAULT_SERVICE_FILTER_STATE.selectedStatus,
            };
        }

        localStorage.removeItem(SERVICE_FILTER_STORAGE_KEY);
        return DEFAULT_SERVICE_FILTER_STATE;
    } catch (error) {
        console.warn(
            "Error reading service filter state from localStorage:",
            error
        );
        localStorage.removeItem(SERVICE_FILTER_STORAGE_KEY);
        return DEFAULT_SERVICE_FILTER_STATE;
    }
}

/**
 * Get valid blog filter state from localStorage or return defaults
 */
export function getValidBlogFilterState(): StoredBlogFilterState {
    if (typeof window === "undefined") {
        return DEFAULT_BLOG_FILTER_STATE;
    }

    try {
        const stored = localStorage.getItem(BLOG_FILTER_STORAGE_KEY);
        if (!stored) {
            return DEFAULT_BLOG_FILTER_STATE;
        }

        const parsed = JSON.parse(stored);
        const state = parsed?.state;

        if (isValidBlogFilterState(state)) {
            return state;
        }

        localStorage.removeItem(BLOG_FILTER_STORAGE_KEY);
        return DEFAULT_BLOG_FILTER_STATE;
    } catch (error) {
        console.warn(
            "Error reading blog filter state from localStorage:",
            error
        );
        localStorage.removeItem(BLOG_FILTER_STORAGE_KEY);
        return DEFAULT_BLOG_FILTER_STATE;
    }
}

/**
 * Force reset service filter state to defaults
 */
export function resetServiceFilterStorage(): void {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.removeItem(SERVICE_FILTER_STORAGE_KEY);
}

/**
 * Force reset blog filter state to defaults
 */
export function resetBlogFilterStorage(): void {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.removeItem(BLOG_FILTER_STORAGE_KEY);
}

/**
 * Set valid service filter state in localStorage
 */
export function setValidServiceFilterState(
    state: Partial<StoredServiceFilterState>
): void {
    if (typeof window === "undefined") {
        return;
    }

    try {
        const currentState = getValidServiceFilterState();
        const newState = { ...currentState, ...state };

        const storageState = {
            state: newState,
            version: 0,
        };

        localStorage.setItem(
            SERVICE_FILTER_STORAGE_KEY,
            JSON.stringify(storageState)
        );
    } catch (error) {
        console.warn(
            "Error saving service filter state to localStorage:",
            error
        );
    }
}

/**
 * Set valid blog filter state in localStorage
 */
export function setValidBlogFilterState(
    state: Partial<StoredBlogFilterState>
): void {
    if (typeof window === "undefined") {
        return;
    }

    try {
        const currentState = getValidBlogFilterState();
        const newState = { ...currentState, ...state };

        const storageState = {
            state: newState,
            version: 0,
        };

        localStorage.setItem(
            BLOG_FILTER_STORAGE_KEY,
            JSON.stringify(storageState)
        );
    } catch (error) {
        console.warn("Error saving blog filter state to localStorage:", error);
    }
}

export const getValidFilterState = getValidServiceFilterState;
export const resetFilterStorage = resetServiceFilterStorage;
export const setValidFilterState = setValidServiceFilterState;
