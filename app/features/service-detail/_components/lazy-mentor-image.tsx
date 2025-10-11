import { memo, useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

interface LazyMentorImageProps {
    src: string;
    alt: string;
    className?: string;
    aspect?: string;
    whileHover?: any;
    transition?: any;
}

function LazyMentorImageComponent({
    src,
    alt,
    className = "",
    aspect = "4/5",
    whileHover = { scale: 1.05 },
    transition = { duration: 0.3, ease: "easeOut" },
}: LazyMentorImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        setIsLoaded(false);
        setHasError(false);
        setImageSrc(null);

        if (!src) {
            setHasError(true);
            setIsLoaded(true);
            return;
        }

        const img = new Image();

        const handleImageLoad = () => {
            setImageSrc(src);
            setIsLoaded(true);
        };

        const handleImageError = () => {
            setHasError(true);
            setIsLoaded(true);
        };

        img.onload = handleImageLoad;
        img.onerror = handleImageError;

        // Set a timeout to handle slow loading images
        const timeout = setTimeout(() => {
            if (!isLoaded && !hasError) {
                setHasError(true);
                setIsLoaded(true);
            }
        }, 8000);

        img.src = src;

        return () => {
            clearTimeout(timeout);
            img.onload = null;
            img.onerror = null;
        };
    }, [src, isLoaded, hasError]);

    useEffect(() => {
        return () => {
            if (imgRef.current) {
                imgRef.current.onload = null;
                imgRef.current.onerror = null;
            }
        };
    }, []);

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
        <div className={`bg-muted border-border/50 relative overflow-hidden rounded-none border ${className}`} style={{ aspectRatio: aspect }}>
            {!isLoaded && !hasError && (
                <div className="bg-muted absolute inset-0 animate-pulse rounded-none" />
            )}

            {hasError ? (
                <div className="bg-muted/50 absolute inset-0 flex items-center justify-center rounded-none">
                    <div className="text-center">
                        <svg className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mb-2 sm:mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="text-muted-foreground text-xs sm:text-sm font-medium">No Image Available</p>
                    </div>
                </div>
            ) : imageSrc ? (
                <motion.img
                    ref={imgRef}
                    src={imageSrc}
                    alt={alt}
                    className={`h-full w-full object-cover transition-opacity duration-300 ${!isLoaded ? "opacity-0" : "opacity-100"}`}
                    onLoad={handleLoad}
                    onError={handleError}
                    whileHover={whileHover}
                    transition={transition}
                    loading="lazy"
                />
            ) : null}
        </div>
    );
}

export const LazyMentorImage = memo(
    LazyMentorImageComponent,
    (prevProps, nextProps) => {
        return (
            prevProps.src === nextProps.src &&
            prevProps.alt === nextProps.alt &&
            prevProps.className === nextProps.className &&
            prevProps.aspect === nextProps.aspect
        );
    }
);