import { memo, useRef } from "react";

import { cubicBezier, motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle, Phone } from "lucide-react";

import { FlickeringGrid } from "~/components/atoms/flickering-grid";
import InteractiveHoverButton from "~/components/atoms/interactive-hover-button";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import SectionHeader from "~/components/atoms/section-header";
import {
    BRAND_IMAGES,
    GPA_BENEFITS,
    GPA_BENTO_FEATURES,
    GPA_TARGET_AUDIENCE,
} from "~/contents/brand";
import { LazyBrandImage } from "~/features/brand/_components/lazy-brand-image";
import { useWhatsAppUrl } from "~/hooks/use-whatsapp";

interface GPASectionProps {
    loaderData?: any;
}

function GPABrandSectionComponent({ loaderData }: GPASectionProps) {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // WhatsApp URL for GPA consultation
    const gpaWhatsAppUrl = useWhatsAppUrl(
        "Halo, saya ingin konsultasi mengenai program Global Pain Academy (GPA). Mohon informasi lebih lanjut tentang pelatihan manajemen nyeri dan pendaftaran. Terima kasih!"
    );

    // Smooth Parallax transforms with optimized values
    const smoothEasing = cubicBezier(0.25, 0.46, 0.45, 0.94);

    const yBackground = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const yDecor1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const yDecor2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
    const yImages = useTransform(scrollYProgress, [0, 1], [20, -20]);
    const yContent = useTransform(scrollYProgress, [0, 1], [15, -15]);
    const scaleImages = useTransform(
        scrollYProgress,
        [0, 0.3, 0.7, 1],
        [0.98, 1, 1, 1.01]
    );
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.15, 0.85, 1],
        [0, 1, 1, 0.9]
    );
    const rotateDecor = useTransform(scrollYProgress, [0, 1], [0, 5]);

    return (
        <section
            id="global-pain-academy-brand"
            className="relative overflow-hidden pt-20 pb-8 md:pt-24 md:pb-24"
            ref={containerRef}
            style={{
                willChange: "transform",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
            }}
        >
            <motion.div
                className="absolute top-0 left-0 z-0 h-[200px] w-full [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]"
                style={{
                    y: yBackground,
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                }}
            >
                <FlickeringGrid
                    className="absolute top-0 left-0 size-full"
                    squareSize={4}
                    gridGap={6}
                    color="#6B7280"
                    maxOpacity={0.2}
                    flickerChance={0.05}
                />
            </motion.div>
            <MaxWidthWrapper className="flex flex-col items-center justify-center">
                <motion.section
                    id="global-pain-academy"
                    className="relative overflow-hidden"
                    style={{
                        opacity,
                        willChange: "transform, opacity",
                        backfaceVisibility: "hidden",
                    }}
                >
                    <div className="mb-10 flex flex-col items-center justify-start gap-4 md:mb-0 md:flex-row md:gap-12">
                        <div className="max-w-3xl">
                            <SectionHeader
                                badge="#StopPain"
                                title="Global Pain Academy"
                                subtitle="Brand yang berfokus pada pendidikan intervensi manajemen nyeri modern untuk dokter spesialis yang ingin menguasai keterampilan terbaru dalam menangani berbagai kasus nyeri muskuloskeletal maupun kronis."
                                badgeColor="text-gpa bg-gpa/40"
                            />
                        </div>
                        <motion.img
                            src="/brand/gpa.webp"
                            alt="Global Pain Academy Logo"
                            className="block h-auto w-44 object-contain md:w-60 dark:hidden"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true }}
                        />
                        <motion.img
                            src="/brand/gpa-dark.webp"
                            alt="Global Pain Academy Logo"
                            className="hidden h-auto w-44 object-contain md:w-60 dark:block"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true }}
                        />
                    </div>
                    <div className="flex flex-col items-center justify-start gap-12 lg:flex-row">
                        <motion.div
                            className="flex w-full flex-col items-start justify-start gap-4 lg:w-1/2"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            viewport={{ once: true }}
                            style={{
                                y: yContent,
                                willChange: "transform",
                                backfaceVisibility: "hidden",
                            }}
                        >
                            <div className="mb-8 w-full">
                                <h3 className="text-gpa mb-6 text-xl font-semibold md:text-2xl">
                                    Program Unggulan
                                </h3>
                                <div className="grid gap-4">
                                    {GPA_BENTO_FEATURES.slice(0, 2).map(
                                        (program, index) => {
                                            const IconComponent = program.Icon;
                                            return (
                                                <div
                                                    key={index}
                                                    className="border-gpa/20 bg-gpa/5 flex items-start space-x-4 rounded-lg border p-4"
                                                >
                                                    <div className="bg-gpa/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                                                        <IconComponent className="text-gpa h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-foreground mb-1 text-sm font-semibold md:text-base">
                                                            {program.name}
                                                        </h4>
                                                        <p className="text-muted-foreground text-justify text-xs md:text-sm">
                                                            {
                                                                program.description
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>

                            <motion.div
                                className="hidden flex-col items-center justify-center gap-6 md:flex md:flex-row"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                viewport={{ once: true }}
                                style={{
                                    willChange: "transform",
                                    backfaceVisibility: "hidden",
                                }}
                            >
                                <LazyBrandImage
                                    src={BRAND_IMAGES.gpa[0]}
                                    alt="GPA Pain Management Training"
                                    className="border-gpa/20 aspect-[0.7] w-full rounded-lg border object-cover"
                                    aspect="0.7"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut",
                                    }}
                                />
                                <div className="flex w-full flex-col items-center justify-center gap-6">
                                    <LazyBrandImage
                                        src={BRAND_IMAGES.gpa[1]}
                                        alt="GPA Medical Workshop"
                                        className="border-gpa/20 aspect-[1.1] rounded-lg border object-cover"
                                        aspect="1.1"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                        }}
                                    />
                                    <LazyBrandImage
                                        src={BRAND_IMAGES.gpa[2]}
                                        alt="GPA USG Equipment Training"
                                        className="border-gpa/20 aspect-[0.7] rounded-lg border object-cover"
                                        aspect="0.7"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                        }}
                                    />
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="flex w-full flex-col items-center justify-center gap-12 pt-12 lg:w-1/2 lg:pt-16"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                                delay: 0.2,
                            }}
                            viewport={{ once: true }}
                            style={{
                                y: yContent,
                                willChange: "transform",
                                backfaceVisibility: "hidden",
                            }}
                        >
                            <div className="w-full space-y-6">
                                <h2 className="text-foreground text-2xl font-bold text-balance md:text-3xl lg:text-4xl">
                                    Kenapa Memilih GPA?
                                </h2>
                                <p className="text-muted-foreground text-justify text-base leading-relaxed md:text-lg">
                                    Bergabunglah dengan ribuan dokter spesialis
                                    yang telah meningkatkan kemampuan mereka
                                    dalam manajemen nyeri modern.
                                </p>
                                <InteractiveHoverButton
                                    text="Daftar ke Global Pain Academy"
                                    icon={Phone}
                                    iconName="lucide:phone"
                                    className="w-full px-6 md:w-auto"
                                    buttonColor="bg-gpa hover:bg-gpa/90 dark:bg-gpa dark:hover:bg-gpa/90"
                                    decorColor="bg-gpa-foreground/20 group-hover:bg-gpa-foreground/10 dark:bg-gpa-foreground/20 dark:group-hover:bg-gpa-foreground/10"
                                    onClick={() =>
                                        window.open(gpaWhatsAppUrl, "_blank")
                                    }
                                />
                                <div className="space-y-4 pt-4">
                                    {GPA_BENEFITS.map((benefit, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="flex-shrink-0">
                                                <CheckCircle className="text-gpa h-5 w-5" />
                                            </div>
                                            <span className="text-foreground text-sm font-medium md:text-lg">
                                                {benefit.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full">
                                <h3 className="text-gpa mb-6 text-start text-xl font-semibold md:text-2xl">
                                    Target Peserta
                                </h3>
                                <div className="grid gap-4">
                                    {GPA_TARGET_AUDIENCE.map(
                                        (target, index) => {
                                            const IconComponent = target.icon;
                                            const isEven = index % 2 === 0;
                                            return (
                                                <div
                                                    key={index}
                                                    className={`hover:bg-gpa/5 flex items-start rounded-lg p-3 transition-colors ${
                                                        isEven
                                                            ? "flex-row space-x-3 md:flex-row md:space-x-3"
                                                            : "flex-row-reverse space-x-3 space-x-reverse md:flex-row md:space-x-3"
                                                    }`}
                                                >
                                                    <div className="bg-gpa/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                                                        <IconComponent className="text-gpa h-5 w-5" />
                                                    </div>
                                                    <div
                                                        className={`${!isEven ? "text-right md:text-left" : ""}`}
                                                    >
                                                        <h4 className="text-foreground text-base font-medium md:text-lg">
                                                            {target.title}
                                                        </h4>
                                                        <p className="text-muted-foreground text-justify text-sm md:text-base">
                                                            {target.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.section>
            </MaxWidthWrapper>
        </section>
    );
}

export const GPABrandSection = memo(GPABrandSectionComponent);
