import { memo } from "react";
import { FlickeringGrid } from "~/components/atoms/flickering-grid";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import SectionHeader from "~/components/atoms/section-header";
import { MEDICAL_SPECIALIZATIONS_DATA } from "~/contents/medical-specializations";

import { FeaturedEventsComponent } from "../_components/featured-events-slideshow";

function MedicalSpecializationsSectionComponent() {
    return (
        <section
            id="dokter-spesial"
            className="relative overflow-hidden pt-20 pb-8 md:pt-24 md:pb-24"
        >
            <div className="absolute top-0 left-0 z-0 h-[200px] w-full [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]">
                <FlickeringGrid
                    className="absolute top-0 left-0 size-full"
                    squareSize={4}
                    gridGap={6}
                    color="#6B7280"
                    maxOpacity={0.2}
                    flickerChance={0.05}
                />
            </div>
            <MaxWidthWrapper>
                <SectionHeader
                    badge="Program Spesial"
                    title={
                        <>
                            Dokter Spesial
                        </>
                    }
                    subtitle="Kami mengembangkan pelatihan klinis aplikatif untuk berbagai bidang medis dengan pendekatan praktis, terstruktur, dan relevan dengan kebutuhan lapangan."
                />
                <FeaturedEventsComponent
                    collapseDelay={5000}
                    linePosition="bottom"
                    featureItems={MEDICAL_SPECIALIZATIONS_DATA}
                    lineColor="bg-primary"
                />
            </MaxWidthWrapper>
        </section>
    );
}

export const MedicalSpecializationsSection = memo(MedicalSpecializationsSectionComponent);
