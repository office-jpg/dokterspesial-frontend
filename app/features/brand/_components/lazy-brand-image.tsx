import { memo, useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

interface LazyBrandImageProps {
    src: string;
    alt: string;
    className?: string;
    aspect?: string;
    whileHover?: any;
    transition?: any;
}

function LazyBrandImageComponent({
    src,
    alt,
    className = "",
    aspect = "1",
    whileHover = { scale: 1.05 },
    transition = { duration: 0.3, ease: "easeOut" },
}: LazyBrandImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!src) return;

        // Reset state hanya jika src berubah
        setIsLoaded(false);
        setHasError(false);
        setImageSrc(null);

        const img = new Image();
        let isCancelled = false;

        const handleImageLoad = () => {
            if (!isCancelled) {
                setImageSrc(src);
                setIsLoaded(true);
            }
        };

        const handleImageError = () => {
            if (!isCancelled) {
                setHasError(true);
                setIsLoaded(true);
            }
        };

        img.onload = handleImageLoad;
        img.onerror = handleImageError;

        // Set src setelah event listeners
        img.src = src;

        return () => {
            isCancelled = true;
            img.onload = null;
            img.onerror = null;
        };
    }, [src]);

    // Removed redundant useEffect for cleanup

    const handleLoad = () => {
        if (!isLoaded) {
            setIsLoaded(true);
        }
    };

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            setIsLoaded(true);
        }
    };

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {!isLoaded && (
                <div
                    className="bg-muted absolute inset-0 animate-pulse rounded-lg"
                    style={{ aspectRatio: aspect }}
                />
            )}

            {hasError ? (
                <div
                    className="bg-muted/50 absolute inset-0 flex items-center justify-center rounded-lg"
                    style={{ aspectRatio: aspect }}
                >
                    <span className="text-muted-foreground text-sm">
                        Image failed to load
                    </span>
                </div>
            ) : imageSrc ? (
                <motion.img
                    ref={imgRef}
                    src={imageSrc}
                    alt={alt}
                    className={`object-cover w-full h-full ${!isLoaded ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
                    onLoad={handleLoad}
                    onError={handleError}
                    whileHover={whileHover}
                    transition={transition}
                    style={{ 
                        aspectRatio: aspect,
                        willChange: "transform",
                        backfaceVisibility: "hidden"
                    }}
                    loading="lazy"
                />
            ) : null}
        </div>
    );
}

export const LazyBrandImage = memo(
    LazyBrandImageComponent,
    (prevProps, nextProps) => {
        return (
            prevProps.src === nextProps.src &&
            prevProps.alt === nextProps.alt &&
            prevProps.className === nextProps.className &&
            prevProps.aspect === nextProps.aspect
        );
    }
);
