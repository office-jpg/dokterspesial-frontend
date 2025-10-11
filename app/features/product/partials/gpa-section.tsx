import { memo } from "react";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";

import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import SectionHeader, {
    useSectionAnimations,
} from "~/components/atoms/section-header";
import { cn } from "~/lib/utils";
import { GPA_TECHNIQUES } from "~/contents/gpa";

function GPASectionComponent() {
    const { sectionRef, isInView, containerVariants, itemVariants } =
        useSectionAnimations();

    return (
        <section
            id="global-pain-academy"
            className="bg-background relative md:py-24 py-8"
            ref={sectionRef}
        >
            <MaxWidthWrapper>
                <div className="mb-10 flex flex-col items-center justify-start gap-0 md:mb-0 md:flex-row md:gap-12">
                    <SectionHeader
                        badge="Program Spesial"
                        title={
                            <>
                                Global Pain Academy
                                <br />
                                <span className="text-primary">(GPA)</span>
                            </>
                        }
                        subtitle="Global Pain Academy (GPA) adalah lini lembaga pendidikan dan peningkatan kompetensi medis berbasis webinar & workshop khusus di bawah Dokter Spesial yang berfokus pada manajemen nyeri berbasis tindakan intervensi klinis."
                    />

                    <motion.img
                        src="/brand/gpa.webp"
                        alt="Global Pain Academy Logo"
                        className="h-auto w-40 object-contain md:w-60 dark:hidden block"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                    />
                    <motion.img
                        src="/brand/gpa-dark.webp"
                        alt="Global Pain Academy Logo"
                        className="h-auto w-40 object-contain md:w-60 hidden dark:block"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                    />
                </div>

                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <div className="bg-secondary/80 border-secondary inline-flex items-center gap-3 border px-6 py-3">
                        <Bookmark className="text-primary size-5 md:flex hidden" />
                        <p className="text-foreground text-sm font-medium md:text-base">
                            Seluruh program GPA diselenggarakan dan didukung
                            penuh oleh{" "}
                            <span className="text-primary font-semibold">
                                Dokter Spesial
                            </span>
                        </p>
                    </div>
                </motion.div>

                <div className="relative mt-10">
                    <div className="absolute top-1/2 left-1/2 z-10 hidden h-full w-full -translate-x-1/2 -translate-y-1/2 lg:block">
                        <motion.img
                            variants={itemVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            src="/images/grid-lines.svg"
                            alt="Grid Lines"
                            className="size-full opacity-20"
                        />
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="relative z-20 grid grid-cols-1 gap-8 md:grid-cols-2"
                    >
                        {GPA_TECHNIQUES.map((technique, index) => {
                            const IconComponent = technique.icon;

                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className={cn(
                                        "flex items-center justify-center p-4 md:p-8",
                                        index % 2 === 0
                                            ? "md:justify-end"
                                            : "md:justify-start"
                                    )}
                                >
                                    <div className="flex max-w-sm flex-col items-center gap-6 text-center">
                                        <div className="bg-accent border-accent flex size-16 items-center justify-center border lg:size-20">
                                            <div
                                                className={cn(
                                                    "flex size-8 items-center justify-center lg:size-10",
                                                    technique.color
                                                )}
                                            >
                                                <IconComponent className="size-4 text-white lg:size-5" />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-foreground text-lg font-semibold md:text-xl">
                                                {technique.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                                                {technique.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export const GPASection = memo(GPASectionComponent);
