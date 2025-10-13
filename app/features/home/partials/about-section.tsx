import { memo } from "react";

import { motion } from "framer-motion";
import { Link } from "react-router";

import { Button } from "~/components/atoms/button";
import MagicCard from "~/components/atoms/magic-card";
import { Marquee } from "~/components/atoms/marquee";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import NumberTicker from "~/components/atoms/number-ticker";
import SectionHeader from "~/components/atoms/section-header";
import { ABOUT_FEATURES, ABOUT_METRICS, PARTNER } from "~/contents/about";
import { AnimatedList } from "~/features/home/_components/animated-list";
import { cn } from "~/lib/utils";

function AboutSection() {
    return (
        <section className="bg-background py-8 md:py-24">
            <MaxWidthWrapper>
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                    <div className="flex flex-col items-start justify-center">
                        <SectionHeader
                            badge="Tentang Platform"
                            title={
                                <>
                                    Empower Medical
                                    <br />
                                    <span className="text-primary">
                                        Specialists To The Next Level
                                    </span>
                                </>
                            }
                            subtitle="Dokter Spesial adalah platform lembaga pendidikan dan peningkatan kompetensi medis berbasis webinar & workshop yang berfokus pada pengembangan keterampilan klinis dan aplikatif bagi dokter. Bergabung dengan ratusan dokter yang telah mempercayai platform kami untuk meng-upgrade kompetensi medis."
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Button
                                asChild
                                size="lg"
                                className="bg-foreground/5 dark:bg-foreground/10 text-foreground hover:bg-foreground/10 dark:hover:bg-foreground/20 flex w-full items-center gap-2 px-8 py-3 transition-all duration-300 md:w-fit lg:w-fit"
                            >
                                <Link to="/event">Mulai Perjalanan Anda</Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="mt-8"
                        >
                            <h3 className="md:text-2xl text-xl text-tertiary font-medium mb-4">Partner Kami</h3>
                        </motion.div>

                        <div className="relative w-full overflow-hidden">
                            <div className="relative w-full max-w-full lg:max-w-xl">
                                <Marquee 
                                    className="select-none [--duration:60s] sm:[--duration:80s] lg:[--duration:120s] [--gap:1.5rem] sm:[--gap:2rem]"
                                    repeat={3}
                                >
                                    {PARTNER.map((partner, index) => (
                                        <div
                                            key={index}
                                            className="text-muted-foreground flex items-center justify-center flex-shrink-0"
                                        >
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className="h-8 sm:h-10 lg:h-12 w-auto object-contain dark:hidden"
                                            />
                                            <img
                                                src={partner.darkLogo}
                                                alt={partner.name}
                                                className="hidden h-8 sm:h-10 lg:h-12 w-auto object-contain dark:block"
                                            />
                                        </div>
                                    ))}
                                </Marquee>
                                <div className="from-background dark:from-background pointer-events-none absolute inset-y-0 -right-1 z-40 w-6 sm:w-12 lg:w-1/3 bg-gradient-to-l"></div>
                                <div className="from-background dark:from-background pointer-events-none absolute inset-y-0 -left-1 z-40 w-6 sm:w-12 lg:w-1/3 bg-gradient-to-r"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 px-1 md:px-0">
                        <AnimatedList delay={800}>
                            {ABOUT_METRICS.map((metric, index) => (
                                <div
                                    key={index}
                                    className="bg-card relative z-0 overflow-hidden rounded-3xl border p-4 lg:p-6"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.3,
                                        }}
                                        viewport={{ once: true }}
                                        className={cn(
                                            "bg-primary absolute right-0 -bottom-1/2 -z-10 size-20 rounded-full opacity-20 blur-[3rem] lg:size-32 lg:blur-[5rem]",
                                            metric.reverse && "left-0"
                                        )}
                                    />

                                    <div
                                        className={cn(
                                            "z-30 flex items-center justify-between gap-6",
                                            metric.reverse && "flex-row-reverse"
                                        )}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 0.2,
                                            }}
                                            viewport={{ once: true }}
                                            className="flex flex-col"
                                        >
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-foreground text-4xl font-medium">
                                                    <NumberTicker
                                                        value={metric.number}
                                                        delay={0.4}
                                                        className="font-bold"
                                                    />
                                                </span>
                                                {metric.suffix && (
                                                    <span className="text-foreground text-4xl font-medium">
                                                        {metric.suffix}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-muted-foreground text-sm">
                                                {metric.label}
                                            </p>
                                        </motion.div>

                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                x: metric.reverse ? 30 : -30,
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                x: 0,
                                            }}
                                            transition={{
                                                duration: 0.6,
                                                delay: 0.1,
                                            }}
                                            viewport={{ once: true }}
                                            className={cn(
                                                "absolute inset-y-0 right-0 my-auto flex size-32 items-center justify-center rounded-2xl",
                                                metric.reverse &&
                                                    "right-auto left-0"
                                            )}
                                        >
                                            <div className="bg-tertiary/10 rounded-xl p-4">
                                                <metric.icon className="text-tertiary size-12" />
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            ))}
                        </AnimatedList>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <AnimatedList
                        delay={600}
                        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
                    >
                        {ABOUT_FEATURES.map((feature, index) => (
                            <MagicCard key={index} className="group md:py-8">
                                <div className="flex w-full flex-col items-start justify-center">
                                    <feature.icon
                                        strokeWidth={1.5}
                                        className="text-foreground h-10 w-10"
                                    />
                                    <div className="relative flex flex-col items-start">
                                        <span className="border-border text-foreground absolute -top-6 right-0 flex h-12 w-12 items-center justify-center rounded-full border-2 pt-0.5 text-2xl font-medium">
                                            {index + 1}
                                        </span>
                                        <h3 className="text-foreground mt-6 text-base font-medium">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground mt-2 text-sm">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </MagicCard>
                        ))}
                    </AnimatedList>
                </motion.div>
            </MaxWidthWrapper>
        </section>
    );
}

export default memo(AboutSection);
