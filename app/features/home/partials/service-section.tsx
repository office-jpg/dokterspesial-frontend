import { memo, useMemo, useState } from "react";

import { Link } from "react-router";

import { motion } from "framer-motion";

import { Button } from "~/components/atoms/button";
import { Icon } from "~/components/atoms/icon";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import SectionHeader from "~/components/atoms/section-header";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "~/components/atoms/tabs";
import { SERVICES_DATA } from "~/contents/services";
import ServiceCarousel from "~/features/service/_components/service-carousel";
import { useSimpleTextClampDetection } from "~/features/service/lib/text-clamp-utils";
import type { Service } from "~/types/api";
import { convertServiceToService } from "~/utils/service";

interface ServiceSectionProps {
    loaderData?: {
        webinarServices: Service[];
        workshopServices: Service[];
    };
}

function ServiceSection({ loaderData }: ServiceSectionProps) {
    const [selectedType, setSelectedType] = useState("Webinar");

    const apiWebinars = loaderData?.webinarServices
        ? loaderData.webinarServices.map(convertServiceToService)
        : [];

    const apiWorkshops = loaderData?.workshopServices
        ? loaderData.workshopServices.map(convertServiceToService)
        : [];

    const staticWebinars = SERVICES_DATA.filter(
        (service) =>
            service.type === "Webinar" &&
            (service.status === "berlangsung" || service.status === "akan datang")
    ).slice(0, 3);

    const staticWorkshops = SERVICES_DATA.filter(
        (service) =>
            service.type === "Workshop" &&
            (service.status === "berlangsung" || service.status === "akan datang")
    ).slice(0, 3);

    const services = useMemo(() => {
        return selectedType === "Webinar"
            ? apiWebinars.length > 0
                ? apiWebinars
                : staticWebinars
            : apiWorkshops.length > 0
              ? apiWorkshops
              : staticWorkshops;
    }, [selectedType, apiWebinars, apiWorkshops, staticWebinars, staticWorkshops]);

    const { isTextClamped, titleRefs } = useSimpleTextClampDetection(
        services,
        selectedType,
        1
    );

    return (
        <section id="services" className="md:py-24 py-8">
            <MaxWidthWrapper>
                <div className="flex flex-col items-center justify-centerf">
                    <div className="flex w-full flex-col items-center justify-between md:gap-6 gap-0 lg:flex-row md:mb-0 mb-8">
                        <SectionHeader
                            badge="Event"
                            title={
                                <>
                                    Event Terbaru
                                    <br />
                                    <span className="text-primary">Kami</span>
                                </>
                            }
                            subtitle="Eksplorasi berbagai layanan edukasi kami yang dirancang khusus untuk mendukung pengembangan profesional Anda."
                        />

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <Button
                                asChild
                                size="lg"
                                className="bg-foreground/5 dark:bg-foreground/10 text-foreground hover:bg-foreground/10 dark:hover:bg-foreground/20 flex w-full items-center gap-2 px-8 py-3 transition-all duration-300 md:w-fit lg:w-fit"
                            >
                                <Link to="/event">
                                    Temukan Event Lainnya
                                    <Icon
                                        icon="lucide:arrow-right"
                                        className="size-4"
                                    />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="w-full"
                    >
                        <Tabs
                            defaultValue="Webinar"
                            value={selectedType}
                            onValueChange={setSelectedType}
                            className="w-full"
                        >
                            <TabsList className="mx-auto bg-tertiary/10 mb-8 flex w-fit justify-center rounded-none border border-tertiary/30 backdrop-blur-sm dark:border-tertiary/30">
                                <TabsTrigger
                                    value="Webinar"
                                    className="text-md flex items-center gap-2 rounded-none font-medium transition-all duration-300"
                                >
                                    <Icon
                                        icon="lucide:video"
                                        className="size-4"
                                    />
                                    Webinar
                                </TabsTrigger>
                                <TabsTrigger
                                    value="Workshop"
                                    className="text-md flex items-center gap-2 rounded-none font-medium transition-all duration-300"
                                >
                                    <Icon
                                        icon="lucide:users"
                                        className="size-4"
                                    />
                                    Workshop
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value={selectedType}>
                                <ServiceCarousel
                                    services={services}
                                />
                            </TabsContent>
                        </Tabs>
                    </motion.div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export default memo(ServiceSection);
