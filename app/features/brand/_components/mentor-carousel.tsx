import { memo, useCallback, useEffect, useState } from "react";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "~/components/atoms/button";
import type { MentorCardProps } from "~/types";

import { MentorCard } from "./mentor-card";

interface MentorCarouselProps {
    mentors: MentorCardProps[];
    className?: string;
    onMentorClick?: (mentor: MentorCardProps) => void;
    onReachEnd?: () => void;
    isLoading?: boolean;
    badgeColor?: string;
}

function MentorCarouselComponent({ 
    mentors, 
    className, 
    onMentorClick, 
    onReachEnd,
    isLoading = false,
    badgeColor
}: MentorCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            skipSnaps: false,
            dragFree: true,
        },
        [
            Autoplay({
                delay: 5000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
                stopOnFocusIn: true,
            }),
        ]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollPrev();
        }
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) {
            emblaApi.scrollNext();
        }
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) {
                emblaApi.scrollTo(index);
            }
        },
        [emblaApi]
    );

    const onInit = useCallback((emblaApi: any) => {
        setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = useCallback((emblaApi: any) => {
        const newSelectedIndex = emblaApi.selectedScrollSnap();
        setSelectedIndex(newSelectedIndex);
        
        // Check if we're at the last few slides and trigger onReachEnd
        const totalSlides = emblaApi.scrollSnapList().length;
        
        // Trigger load more when we're 2 slides away from the end
        if (onReachEnd && !isLoading && newSelectedIndex >= totalSlides - 2) {
            onReachEnd();
        }
    }, [onReachEnd, isLoading]);

    useEffect(() => {
        if (!emblaApi) return;

        onInit(emblaApi);
        onSelect(emblaApi);
        emblaApi.on("reInit", onInit);
        emblaApi.on("select", onSelect);
        
        return () => {
            emblaApi.off("reInit", onInit);
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onInit, onSelect]);

    if (!mentors || mentors.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">
                    Tidak ada mentor tersedia
                </p>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4">
                    {mentors.map((mentor, index) => (
                        <div
                            key={`${mentor.slug}-${index}`}
                            className="min-w-0 flex-[0_0_80%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_30%] xl:flex-[0_0_25%]"
                        >
                            <MentorCard 
                                mentor={mentor} 
                                layout={false} 
                                onMentorClick={onMentorClick}
                                badgeColor={badgeColor}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollPrev}
                        className="h-10 w-10"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous slide</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollNext}
                        className="h-10 w-10"
                    >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next slide</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export const MentorCarousel = memo(MentorCarouselComponent);
