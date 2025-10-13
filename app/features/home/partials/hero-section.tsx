import { memo, useEffect, useRef } from "react";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { buttonVariants } from "~/components/atoms/button";
import { Highlighter } from "~/components/atoms/highlighter";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import { AnimatedBadge } from "~/components/molecules/animated-badge";
import { useWhatsAppUrl } from "~/hooks/use-whatsapp";
import { cn } from "~/lib/utils";

function HeroSection() {
    const shapeRef = useRef<HTMLDivElement>(null);
    const whatsappUrl = useWhatsAppUrl();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!shapeRef.current) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const xPos = (clientX / innerWidth - 0.5) * 10;
            const yPos = (clientY / innerHeight - 0.5) * 10;
            const rotateX = -yPos * 0.5;
            const rotateY = xPos * 0.5;

            shapeRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${
                xPos * 0.3
            }px, ${yPos * 0.3}px, 0)`;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const shapeAnimationDelay = 0.6;

    return (
        <section
            id="hero"
            className="relative overflow-hidden pt-20 pb-8 md:pt-24 md:pb-24"
        >
            <div className="absolute inset-0 z-0">
                <div className="from-muted/30 to-background absolute inset-0 bg-gradient-to-br" />
            </div>

            <MaxWidthWrapper>
                <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2">
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6"
                        >
                            <AnimatedBadge variant="shiny">
                                Dokter Spesial
                            </AnimatedBadge>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mb-4 text-2xl leading-tight font-bold sm:mb-6 sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl"
                        >
                            <span className="block">Menjadi</span>
                            <span className="from-primary to-tertiary bg-gradient-to-r bg-clip-text text-transparent">
                                Dokter Spesialis
                            </span>
                            <span className="block">Terbaik</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            className="text-muted-foreground relative mb-4 max-w-lg text-justify text-base leading-relaxed"
                        >
                            Seiring pesatnya perkembangan medis dan tingginya
                            tuntutan layanan berkualitas, dokter perlu terus
                            memperbarui ilmu dan keterampilannya
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                            className="text-muted-foreground relative mb-6 max-w-lg text-justify text-base leading-relaxed"
                        >
                            Dokter Spesial hadir sebagai solusi pelatihan
                            berkelanjutan yang{" "}
                            <Highlighter action="circle" color="#f59e0b">
                                relevan
                            </Highlighter>
                            ,{" "}
                            <Highlighter action="box" color="#0DAA9B">
                                praktis
                            </Highlighter>
                            , dan dapat{" "}
                            <Highlighter action="underline" color="#5088C5">
                                langsung diterapkan di praktik klinis.
                            </Highlighter>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="flex flex-col gap-4 sm:flex-row"
                        >
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    buttonVariants({
                                        variant: "default",
                                        size: "lg",
                                    }),
                                    "h-12 px-8 py-3 font-medium tracking-widest uppercase"
                                )}
                            >
                                Daftar Sekarang
                                <ArrowRight className="ml-2 size-4" />
                            </a>
                            <Link
                                to="/event"
                                className={cn(
                                    buttonVariants({
                                        variant: "outline",
                                        size: "lg",
                                    }),
                                    "h-12 px-8 py-3 font-medium tracking-widest uppercase"
                                )}
                            >
                                Lihat Program
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                            className="mt-10"
                        >
                            <p className="text-muted-foreground mb-4 text-xl font-medium">
                                Our Brand
                            </p>
                            <div className="flex items-center gap-8">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 1.1 }}
                                    className="group cursor-pointer"
                                >
                                    <img
                                        src="/brand/gpa.webp"
                                        alt="Global Pain Academy"
                                        className="dark:hidden block h-auto w-28 object-contain opacity-80 transition-all duration-300 group-hover:scale-110 hover:opacity-100"
                                    />
                                    <img
                                        src="/brand/gpa-dark.webp"
                                        alt="Global Pain Academy"
                                        className="hidden dark:block h-auto w-28 object-contain opacity-80 transition-all duration-300 group-hover:scale-110 hover:opacity-100"
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 1.2 }}
                                    className="group cursor-pointer"
                                >
                                    <img
                                        src="/brand/dd.webp"
                                        alt="Dokter Dainteins"
                                        className="dark:hidden block h-auto w-28 object-contain opacity-80 transition-all duration-300 group-hover:scale-110 hover:opacity-100"
                                    />
                                    <img
                                        src="/brand/dd-dark.webp"
                                        alt="Dokter Dainteins"
                                        className="hidden dark:block h-auto w-28 object-contain opacity-80 transition-all duration-300 group-hover:scale-110 hover:opacity-100"
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="relative">
                        <motion.img
                            src="/images/hero/hero-1.webp"
                            alt="Hero Image"
                            className="absolute top-0 z-10 h-auto w-full"
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 1.0,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                        />
                        <motion.div
                            ref={shapeRef}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.7,
                                delay: shapeAnimationDelay,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="relative transition-transform duration-200 ease-out"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <motion.div
                                className="border-border bg-accent absolute -right-10 -bottom-10 z-[-1] h-2/3 w-2/3 border"
                                initial={{ opacity: 0, x: 10, y: 10 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: shapeAnimationDelay,
                                    ease: [0.25, 0.1, 0.25, 1],
                                }}
                                style={{ transform: "translateZ(-20px)" }}
                            ></motion.div>

                            <motion.div
                                className="border-border relative aspect-square overflow-hidden border"
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.9,
                                    delay: shapeAnimationDelay + 0.1,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20,
                                }}
                            >
                                <motion.div
                                    className="from-muted to-card absolute inset-0 bg-gradient-to-br"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: 1,
                                        delay: shapeAnimationDelay + 0.2,
                                    }}
                                ></motion.div>

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        className="relative h-3/4 w-3/4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: shapeAnimationDelay + 0.3,
                                        }}
                                    >
                                        <motion.div
                                            className="bg-tertiary absolute top-0 left-0 h-1 w-full"
                                            initial={{ scaleX: 0, originX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{
                                                duration: 0.5,
                                                delay:
                                                    shapeAnimationDelay + 0.4,
                                            }}
                                        ></motion.div>
                                        <motion.div
                                            className="bg-tertiary absolute right-0 bottom-0 h-1 w-full"
                                            initial={{ scaleX: 0, originX: 1 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{
                                                duration: 0.5,
                                                delay:
                                                    shapeAnimationDelay + 0.5,
                                            }}
                                        ></motion.div>
                                        <motion.div
                                            className="bg-tertiary absolute top-0 right-0 h-full w-1"
                                            initial={{ scaleY: 0, originY: 0 }}
                                            animate={{ scaleY: 1 }}
                                            transition={{
                                                duration: 0.5,
                                                delay:
                                                    shapeAnimationDelay + 0.6,
                                            }}
                                        ></motion.div>
                                        <motion.div
                                            className="bg-tertiary absolute bottom-0 left-0 h-full w-1"
                                            initial={{ scaleY: 0, originY: 1 }}
                                            animate={{ scaleY: 1 }}
                                            transition={{
                                                duration: 0.5,
                                                delay:
                                                    shapeAnimationDelay + 0.7,
                                            }}
                                        ></motion.div>

                                        <motion.div
                                            className="border-muted-foreground absolute top-1/4 left-1/4 flex h-1/2 w-1/2 items-center justify-center border"
                                            initial={{ opacity: 0, scale: 0.7 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                duration: 0.6,
                                                delay:
                                                    shapeAnimationDelay + 0.8,
                                                type: "spring",
                                                stiffness: 100,
                                                damping: 15,
                                            }}
                                        >
                                            <motion.div
                                                className="bg-tertiary flex h-3/4 w-3/4 items-center justify-center"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay:
                                                        shapeAnimationDelay +
                                                        0.9,
                                                }}
                                            >
                                                <motion.div
                                                    className="bg-foreground h-1/2 w-1/2"
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay:
                                                            shapeAnimationDelay +
                                                            1.0,
                                                        type: "spring",
                                                        stiffness: 200,
                                                        damping: 15,
                                                    }}
                                                ></motion.div>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default memo(HeroSection);
