import { useEffect } from "react";

import { motion } from "framer-motion";
import {
    Award,
    GraduationCap,
    MapPin,
    Stethoscope,
    User,
} from "lucide-react";

import { Badge } from "~/components/atoms/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "~/components/atoms/dialog";
import type { MentorCardProps } from "~/types";

import { LazyMentorImage } from "./lazy-mentor-image";

interface MentorDetailModalProps {
    mentor: MentorCardProps;
    isOpen: boolean;
    onClose: () => void;
    layout?: boolean;
    badgeColor?: string;
}

export function MentorDetailModal({
    mentor,
    isOpen,
    onClose,
    layout = false,
    badgeColor = "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
}: MentorDetailModalProps) {
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
    const detailImageSrc = mentor.image_url || mentor.image || imageSrc;

    // Fix for the pointer events issue with Radix dialogs
    useEffect(() => {
        if (!isOpen) {
            // Reset pointer events when dialog closes
            const timeout = setTimeout(() => {
                document.body.style.pointerEvents = "";
            }, 100);
            
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent 
                className="max-w-4xl gap-0 w-[95vw] h-[28rem] sm:h-auto sm:max-h-[70vh] overflow-hidden p-0 flex flex-col"
                showCloseButton={true}
            >
                {/* Header */}
                <DialogHeader className="flex-shrink-0 border-b border-border/50 bg-background/95 p-4 sm:p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary p-2">
                            <User className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div className="text-left">
                            <DialogTitle className="text-foreground text-base font-semibold sm:text-lg">
                                Detail Mentor
                            </DialogTitle>
                            <p className="text-muted-foreground text-xs sm:text-sm">
                                Informasi lengkap mentor
                            </p>
                        </div>
                    </div>
                </DialogHeader>

                {/* Content with scroll area */}
                <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border/20 hover:scrollbar-thumb-border/40">
                    <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6 lg:flex-row lg:gap-8">
                        {/* Mentor Image */}
                        <div className="order-1 lg:sticky lg:top-4 lg:h-fit lg:flex-shrink-0 lg:w-80">
                            <LazyMentorImage
                                src={detailImageSrc}
                                alt={mentor.name}
                                className="w-full max-h-[40 0px] sm:max-h-[280px] lg:max-h-[400px]"
                                aspect="4/5"
                            />
                        </div>

                        {/* Mentor Information */}
                        <div className="order-2 space-y-4 sm:space-y-6 w-full">
                            {/* Badge and Name */}
                            <div className="space-y-3">
                                <Badge
                                    variant="secondary"
                                    className={`rounded-none text-xs font-medium sm:text-sm ${badgeColor}`}
                                >
                                    <GraduationCap className="mr-1 h-3 w-3" />
                                    MENTOR
                                </Badge>

                                <motion.h3
                                    layoutId={
                                        layout
                                            ? `title-${mentor.name}`
                                            : undefined
                                    }
                                    className="text-foreground text-lg font-bold leading-tight sm:text-xl lg:text-2xl"
                                >
                                    {mentor.name}
                                </motion.h3>
                            </div>

                            {/* Specialization */}
                            <div className="bg-muted/50 border-border/50 flex items-center gap-3 border p-3 transition-colors duration-200 sm:p-4">
                                <div className="bg-primary/10 text-primary flex-shrink-0 p-2">
                                    <Stethoscope className="h-4 w-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                                        Spesialisasi
                                    </p>
                                    <motion.p
                                        layoutId={
                                            layout
                                                ? `category-${mentor.spesialist}`
                                                : undefined
                                        }
                                        className="text-foreground text-sm font-semibold sm:text-base"
                                        title={mentor.spesialist}
                                    >
                                        {mentor.spesialist}
                                    </motion.p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="bg-muted/50 border-border/50 flex items-center gap-3 border p-3 transition-colors duration-200 sm:p-4">
                                <div className="bg-secondary/10 text-secondary-foreground flex-shrink-0 p-2">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                                        Lokasi Praktik
                                    </p>
                                    <p
                                        className="text-foreground text-sm font-semibold sm:text-base"
                                        title={mentor.place}
                                    >
                                        {mentor.place}
                                    </p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Award className="text-muted-foreground h-4 w-4" />
                                    <h4 className="text-foreground text-sm font-semibold sm:text-base">
                                        Tentang Mentor
                                    </h4>
                                </div>
                                <div className="bg-muted/30 border-border/50 border p-3 sm:p-4">
                                    <motion.p
                                        layoutId={
                                            layout
                                                ? `content-${mentor.description}`
                                                : undefined
                                        }
                                        className="text-muted-foreground text-sm leading-relaxed break-words whitespace-pre-wrap"
                                    >
                                        {mentor.description}
                                    </motion.p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
