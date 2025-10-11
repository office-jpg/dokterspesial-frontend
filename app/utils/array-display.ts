/**
 * Helper functions for displaying arrays with "+X more" pattern
 */

/**
 * Format array of strings or objects with name property for display
 * Shows first items and "+X" for overflow
 */
export function formatArrayForDisplay<T extends string | { name: string }>(
    items: T[] | undefined,
    maxDisplay: number = 2
): {
    visible: T[];
    hasMore: boolean;
    moreCount: number;
    displayText: string;
} {
    if (!items || items.length === 0) {
        return {
            visible: [],
            hasMore: false,
            moreCount: 0,
            displayText: "",
        };
    }

    const visible = items.slice(0, maxDisplay);
    const hasMore = items.length > maxDisplay;
    const moreCount = Math.max(0, items.length - maxDisplay);

    const visibleText = visible
        .map((item) => (typeof item === "string" ? item : item.name))
        .join(", ");

    const displayText = hasMore ? `${visibleText} +${moreCount}` : visibleText;

    return {
        visible,
        hasMore,
        moreCount,
        displayText,
    };
}

/**
 * Format spesialists array for display
 */
export function formatSpesialistsDisplay(
    spesialists: string[] | Array<{ id: number; name: string }> | undefined,
    maxDisplay: number = 2
) {
    if (!spesialists || spesialists.length === 0) {
        return {
            visible: [],
            hasMore: false,
            moreCount: 0,
            displayText: "",
        };
    }

    const stringArray = spesialists.map((item) =>
        typeof item === "string" ? item : item.name
    );

    return formatArrayForDisplay(stringArray, maxDisplay);
}

/**
 * Format presenters array for display
 */
export function formatPresentersDisplay(
    presenters: Array<{ id: number; name: string }> | undefined,
    maxDisplay: number = 2
) {
    if (!presenters || presenters.length === 0) {
        return {
            visible: [],
            hasMore: false,
            moreCount: 0,
            displayText: "",
        };
    }

    const stringArray = presenters.map((presenter) => presenter.name);
    return formatArrayForDisplay(stringArray, maxDisplay);
}

/**
 * Format categories array for display
 */
export function formatCategoriesDisplay(
    categories: string[] | Array<{ id: number; name: string }> | undefined,
    maxDisplay: number = 2
) {
    if (!categories || categories.length === 0) {
        return {
            visible: [],
            hasMore: false,
            moreCount: 0,
            displayText: "",
        };
    }

    const stringArray = categories.map((item) =>
        typeof item === "string" ? item : item.name
    );

    return formatArrayForDisplay(stringArray, maxDisplay);
}

/**
 * Format types array for display
 */
export function formatTypesDisplay(
    types: string[] | Array<{ id: number; name: string }> | undefined,
    maxDisplay: number = 2
) {
    if (!types || types.length === 0) {
        return {
            visible: [],
            hasMore: false,
            moreCount: 0,
            displayText: "",
        };
    }

    const stringArray = types.map((item) =>
        typeof item === "string" ? item : item.name
    );

    return formatArrayForDisplay(stringArray, maxDisplay);
}
