import { motion } from "framer-motion";

import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import SectionHeader from "~/components/atoms/section-header";
import Timeline from "~/components/molecules/timeline";
import { DD_PROCESS_STEPS } from "~/contents/process-steps";

export default function DdProcessSection() {
    return (
        <section
            id="dd-process"
            className="bg-muted/20 relative overflow-hidden py-8 pt-20 md:py-24 md:pt-32"
        >
            <MaxWidthWrapper className="relative z-10">
                <div className="mb-10 flex flex-col items-center justify-start gap-0 md:mb-0 md:flex-row md:gap-12">
                    <div className="max-w-3xl">
                        <SectionHeader
                            badge="Dokter Dentist (DD)"
                            title={
                                <>
                                    Smarter Dentists,
                                    <br />
                                    <span className="text-dd">
                                        Better Skills
                                    </span>
                                </>
                            }
                            subtitle="Dokter Dentist adalah brand pelatihan kedokteran gigi yang berfokus meningkatkan keterampilan dokter gigi melalui webinar, workshop, dan program edukasi berbasis praktik. Dengan konsep praktis, aplikatif, dan relevan, setiap materi tidak hanya berupa teori, tetapi dapat langsung diterapkan di klinik sehari-hari. Dibawakan oleh pemateri berpengalaman dari berbagai spesialisasi, Dokter Dentist menjadi wadah belajar profesional dan terpercaya yang berorientasi pada peningkatan mutu layanan kedokteran gigi di Indonesia."
                            badgeColor="text-dd bg-dd/40"
                        />
                    </div>

                    <motion.img
                        src="/brand/dd.webp"
                        alt="Dokter Dentist Logo"
                        className="block h-auto w-40 object-contain md:w-60 dark:hidden"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                    />
                    <motion.img
                        src="/brand/dd-dark.webp"
                        alt="Dokter Dentist Logo"
                        className="hidden h-auto w-40 object-contain md:w-60 dark:block"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                    />
                </div>
                <Timeline
                    steps={DD_PROCESS_STEPS}
                    accentColor="text-dd"
                    gradientColor="via-dd"
                />
            </MaxWidthWrapper>

            <div className="border-border/50 absolute top-40 right-20 size-32 border" />
            <div className="border-border/20 absolute bottom-60 left-20 size-40 border" />
        </section>
    );
}
