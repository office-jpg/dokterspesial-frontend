import { motion } from "framer-motion";

import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import SectionHeader from "~/components/atoms/section-header";
import Timeline from "~/components/molecules/timeline";
import { GPA_PROCESS_STEPS } from "~/contents/process-steps";

export default function GpaProcessSection() {
    return (
        <section
            id="gpa-process"
            className="bg-muted/20 relative overflow-hidden py-8 pt-20 md:py-24 md:pt-32"
        >
            <MaxWidthWrapper className="relative z-10">
                <div className="mb-10 flex flex-col items-center justify-start gap-0 md:mb-0 md:flex-row md:gap-12">
                    <div className="max-w-3xl">
                        <SectionHeader
                            badge="Global Pain Academy (GPA)"
                            title={
                                <>
                                    Fokus pada Skill Intervensi
                                    <br />
                                    <span className="text-gpa">
                                        Nyeri Klinis
                                    </span>
                                </>
                            }
                            subtitle="Global Pain Academy (GPA) adalah lini lembaga pendidikan dan peningkatan kompetensi medis berbasis webinar & workshop khusus di bawah Dokter Spesial yang berfokus pada manajemen nyeri berbasis tindakan intervensi klinis."
                            badgeColor="text-gpa bg-gpa/40"
                        />
                    </div>

                    <motion.img
                        src="/brand/gpa.webp"
                        alt="Global Pain Academy Logo"
                        className="block h-auto w-40 object-contain md:w-60 dark:hidden"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                    />
                    <motion.img
                        src="/brand/gpa-dark.webp"
                        alt="Global Pain Academy Logo"
                        className="hidden h-auto w-40 object-contain md:w-60 dark:block"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                    />
                </div>
                <Timeline
                    steps={GPA_PROCESS_STEPS}
                    accentColor="text-gpa"
                    gradientColor="via-gpa"
                />
            </MaxWidthWrapper>

            <div className="border-border/50 absolute top-40 right-20 size-32 border" />
            <div className="border-border/20 absolute bottom-60 left-20 size-40 border" />
        </section>
    );
}
