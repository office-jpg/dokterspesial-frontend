import React from "react";
import { Star } from "lucide-react";
import { cn } from "~/lib/utils";

interface CustomStarRatingProps {
    value: number;
    maxStars?: number;
    size?: number;
    showText?: boolean;
    className?: string;
}

export default function CustomStarRating({
    value,
    maxStars = 5,
    size = 16,
    showText = true,
    className
}: CustomStarRatingProps) {
    const renderStar = (index: number) => {
        const starValue = index + 1;
        const fillPercentage = Math.max(0, Math.min(1, value - index));

        if (fillPercentage === 0) {
            return (
                <Star 
                    key={index} 
                    size={size} 
                    className="text-gray-300" 
                />
            );
        } else if (fillPercentage === 1) {
            return (
                <Star 
                    key={index} 
                    size={size} 
                    className="fill-yellow-400 text-yellow-400" 
                />
            );
        } else {
            return (
                <div key={index} className="relative">
                    <Star size={size} className="text-gray-300" />
                    <div 
                        className="absolute inset-0 overflow-hidden" 
                        style={{ width: `${fillPercentage * 100}%` }}
                    >
                        <Star
                            size={size}
                            className="fill-yellow-400 text-yellow-400"
                        />
                    </div>
                </div>
            );
        }
    };

    return (
        <div className={cn("flex items-center gap-1", className)}>
            <div className="flex items-center">
                {Array.from({ length: maxStars }, (_, index) => renderStar(index))}
            </div>
            {showText && (
                <span className="text-sm font-medium text-foreground/70 ml-1">
                    {value}/{maxStars}
                </span>
            )}
        </div>
    );
}
