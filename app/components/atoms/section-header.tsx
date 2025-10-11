import { useRef } from "react";
import type { ReactNode } from "react";

import { motion, useInView } from "framer-motion";
import { cn } from "~/lib/utils";

interface SectionHeaderProps {
    badge?: string;
    title: string | ReactNode;
    subtitle?: string;
    className?: string;
    badgeClassName?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    centered?: boolean;
    badgeColor?: string;
}

export default function SectionHeader({
    badge,
    title,
    subtitle,
    className = "",
    badgeClassName = "",
    titleClassName = "",
    subtitleClassName = "",
    centered = false,
    badgeColor = "text-tertiary bg-tertiary/40",
}: SectionHeaderProps) {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {
        once: true,
        margin: "0px 0px -25% 0px",
    });

    const titleVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 50,
                damping: 12,
                duration: 0.6,
            },
        },
    };

    return (
        <motion.div
            ref={sectionRef}
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={`mb-10 ${centered ? "text-center" : ""} ${className}`}
        >
            {badge && (
                <div
                    className={`mb-6 flex items-center gap-4 ${centered ? "justify-center" : ""}`}
                >
                    <div className={cn("h-px w-12", badgeColor.includes("bg-") ? badgeColor.split(' ').find(c => c.includes('bg-')) : "bg-tertiary/40")} />
                    <div
                        className={cn(
                            "text-xs font-medium tracking-widest uppercase",
                            badgeColor.includes("text-") ? badgeColor.split(' ').find(c => c.includes('text-')) : "text-tertiary",
                            badgeClassName
                        )}
                    >
                        {badge}
                    </div>
                    {!centered && <div className={cn("h-px w-12", badgeColor.includes("bg-") ? badgeColor.split(' ').find(c => c.includes('bg-')) : "bg-tertiary/40")} />}
                </div>
            )}

            <h2
                className={`text-foreground text-4xl font-bold tracking-tighter md:text-5xl ${titleClassName}`}
            >
                {title}
            </h2>

            {subtitle && (
                <p
                    className={`text-muted-foreground mt-4 text-justify text-lg ${subtitleClassName}`}
                >
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
}

export function useSectionAnimations() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {
        once: true,
        margin: "0px 0px -25% 0px",
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.07,
                delayChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 12,
            scale: 0.98,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 45,
                damping: 15,
                mass: 0.85,
                duration: 0.7,
            },
        },
    };

    return {
        sectionRef,
        isInView,
        containerVariants,
        itemVariants,
    };
}
