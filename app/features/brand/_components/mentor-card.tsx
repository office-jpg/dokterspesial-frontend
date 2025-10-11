import { useState } from "react";

import { motion } from "framer-motion";
import {
    FileText,
    GraduationCap,
    ImageOff,
    MapPin,
    Stethoscope,
    User,
} from "lucide-react";

import type { MentorCardProps } from "~/types";

interface MentorCardComponentProps {
    mentor: MentorCardProps;
    cardHeight?: string;
    layout?: boolean;
    onMentorClick?: (mentor: MentorCardProps) => void;
    badgeColor?: string;
}

export function MentorCard({
    mentor,
    cardHeight = "h-96",
    layout = false,
    onMentorClick,
    badgeColor = "bg-teal-200 text-teal-800 dark:bg-teal-800 dark:text-teal-200",
}: MentorCardComponentProps) {
    const [imageError, setImageError] = useState(false);

    const getImageSrc = (mentor: MentorCardProps) => {
        if ("image_url" in mentor && mentor.image_url) {
            return mentor.image_url;
        }
        if (mentor.image && mentor.image !== null) {
            return mentor.image;
        }
        return "/placeholder/placeholder-user.jpg";
    };

    const imageSrc = getImageSrc(mentor);

    const handleCardClick = () => {
        if (onMentorClick) {
            onMentorClick(mentor);
        }
    };

    return (
        <motion.button
            layoutId={layout ? `card-${mentor.name}` : undefined}
            className="group/card w-full pb-20"
            onClick={handleCardClick}
        >
            <div className="relative w-full max-w-sm antialiased">
                {!imageError ? (
                    <img
                        src={imageSrc}
                        alt={mentor.name}
                        className="h-80 w-full object-cover object-center shadow-md"
                        onError={() => setImageError(true)}
                        loading="lazy"
                    />
                ) : (
                    <div className="bg-muted flex h-80 w-full items-center justify-center shadow-md">
                        <div className="text-center">
                            <ImageOff className="text-muted-foreground mx-auto mb-2 size-12" />
                            <p className="text-muted-foreground text-sm">
                                No Image Available
                            </p>
                        </div>
                    </div>
                )}

                <div className="absolute -mt-24 w-full px-2">
                    <div className="bg-background border-border border p-6 text-start shadow-lg">
                        <h4 className="mb-2 flex items-center gap-2">
                            <User className="h-4 w-4 flex-shrink-0" />
                            <span className="text-foreground text-xl leading-tight font-semibold line-clamp-1">
                                {mentor.name}
                            </span>
                        </h4>

                        <div className="flex flex-col items-start justify-center gap-y-2">
                            <span className={`flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold tracking-wide uppercase ${badgeColor}`}>
                                <GraduationCap className="size-3" />
                                MENTOR
                            </span>
                            <div className="text-muted-foreground flex items-center justify-start gap-1 text-xs font-semibold tracking-wider uppercase">
                                <Stethoscope className="size-3 flex-shrink-0" />
                                <span className="line-clamp-1">
                                    {mentor.spesialist}
                                </span>
                            </div>
                        </div>

                        <div className="text-muted-foreground mt-1 flex items-center justify-start gap-1">
                            <MapPin className="size-3 flex-shrink-0" />
                            <span className="truncate text-sm">
                                {mentor.place}
                            </span>
                        </div>

                        <div className="text-muted-foreground mt-1 flex items-center justify-start gap-1">
                            <FileText className="mt-0.5 size-3 flex-shrink-0" />
                            <p className="truncate text-sm">
                                {mentor.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.button>
    );
}
