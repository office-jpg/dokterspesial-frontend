import { memo } from "react";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader } from "~/components/atoms/card";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import SectionHeader, {
    useSectionAnimations,
} from "~/components/atoms/section-header";
import { HOME_FEATURES } from "~/contents/features";

function FeaturesSection() {
    const { sectionRef, isInView, containerVariants, itemVariants } =
        useSectionAnimations();

    return (
        <section
            id="features"
            ref={sectionRef}
            className="bg-background relative overflow-hidden md:py-24 py-8"
        >
            <MaxWidthWrapper className="relative z-10">
                <SectionHeader
                    badge="Target Pengguna"
                    title={
                        <>
                            Untuk Siapa
                            <br />
                            <span className="text-primary">
                                Dokter Spesial?
                            </span>
                        </>
                    }
                    subtitle="Platform Dokter Spesial dirancang khusus untuk:"
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
                >
                    {HOME_FEATURES.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="h-full"
                            >
                                <Card className="gap-2 group hover:border-tertiary/50 h-full transition-all duration-300 hover:shadow-lg">
                                    <CardHeader>
                                        <div className="rounded-none bg-tertiary/10 group-hover:bg-tertiary/20 p-3 transition-all duration-300">
                                            <IconComponent className="text-tertiary size-6" />
                                        </div>
                                        <h3 className="text-foreground text-xl font-bold">
                                            {feature.title}
                                        </h3>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground group-hover:text-foreground/90 transition-colors">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </MaxWidthWrapper>

            <div className="bg-muted/20 absolute top-20 right-10 size-40 rounded-full blur-3xl" />
            <div className="bg-muted/10 absolute bottom-20 left-10 size-60 rounded-full blur-3xl" />
        </section>
    );
}

export default memo(FeaturesSection);
