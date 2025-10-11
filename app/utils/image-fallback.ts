/**
 * Utility functions for handling image fallbacks and error states
 */

export const DEFAULT_PLACEHOLDER = "/placeholder/placeholder.svg";
export const DEFAULT_USER_PLACEHOLDER = "/placeholder/placeholder-user.jpg";

/**
 * Handle image load error with fallback
 */
export const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    fallbackSrc: string = DEFAULT_PLACEHOLDER
) => {
    const target = event.target as HTMLImageElement;
    if (target.src !== fallbackSrc) {
        target.src = fallbackSrc;
    }
};

/**
 * Get image source with fallback
 */
export const getImageSrc = (
    src: string | null | undefined,
    fallback: string = DEFAULT_PLACEHOLDER
): string => {
    return src || fallback;
};

/**
 * Preload image to check if it exists
 */
export const preloadImage = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
    });
};

/**
 * Generate alt text for service images
 */
export const generateAltText = (title: string, type?: string): string => {
    const baseAlt = title || "Service image";
    return type ? `${baseAlt} - ${type}` : baseAlt;
};
