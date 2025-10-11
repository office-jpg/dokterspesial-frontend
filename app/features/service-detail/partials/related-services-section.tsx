import { useEffect, useState } from "react";

import { Link } from "react-router";

import { Tag } from "lucide-react";

import { getServiceList } from "~/actions/service/get-service-list";
import { Badge } from "~/components/atoms/badge";
import { Button } from "~/components/atoms/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/atoms/carousel";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import { type ServiceProps } from "~/types";
import { convertServiceToService } from "~/utils/service";

import ServiceList from "../../service/_components/service-list";

interface RelatedServicesSectionProps {
    currentServiceSlug?: string;
    relatedServices?: any[];
}

function RelatedServicesSection({
    currentServiceSlug,
    relatedServices,
}: RelatedServicesSectionProps) {
    const [otherServices, setOtherServices] = useState<ServiceProps[]>([]);
    const [isLoadingServices, setIsLoadingServices] = useState(false);

    useEffect(() => {
        if (
            relatedServices &&
            Array.isArray(relatedServices) &&
            relatedServices.length > 0
        ) {
            const filteredServices = relatedServices
                .filter((service) => service.slug !== currentServiceSlug)
                .slice(0, 4)
                .map(convertServiceToService);
            setOtherServices(filteredServices);
            return;
        }

        const fetchOtherServices = async () => {
            try {
                setIsLoadingServices(true);

                const [upcomingResponse, ongoingResponse] = await Promise.all([
                    getServiceList({ per_page: 10, status: "upcoming" }),
                    getServiceList({ per_page: 10, status: "ongoing" }),
                ]);

                const allFilteredServices = [
                    ...upcomingResponse.data,
                    ...ongoingResponse.data,
                ]
                    .filter((service) => service.slug !== currentServiceSlug)
                    .slice(0, 4)
                    .map(convertServiceToService);

                setOtherServices(allFilteredServices);
            } catch (error) {
                console.error("Failed to fetch other services:", error);
                setOtherServices([]);
            } finally {
                setIsLoadingServices(false);
            }
        };

        fetchOtherServices();
    }, [currentServiceSlug, relatedServices]);

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <section className="bg-background md:py-24 py-8">
            <MaxWidthWrapper>
                <div className="mb-8">
                    <h3 className="text-foreground mb-4 text-2xl font-bold">
                        Event Lainnya
                    </h3>
                    <p className="text-muted-foreground">
                        Jelajahi layanan lainnya yang mungkin Anda minati
                    </p>
                </div>

                {isLoadingServices ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 3 }, (_, index) => (
                            <div
                                key={`skeleton-${index}`}
                                className="bg-background/60 border-border animate-pulse rounded-2xl border p-6 shadow-lg backdrop-blur-lg"
                            >
                                <div className="bg-muted mb-4 aspect-video rounded-lg"></div>
                                <div className="space-y-3">
                                    <div className="bg-muted h-4 w-3/4 rounded"></div>
                                    <div className="bg-muted h-3 w-1/2 rounded"></div>
                                    <div className="bg-muted h-3 w-2/3 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : otherServices.length > 0 ? (
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {otherServices.map((service, index) => (
                                <CarouselItem
                                    key={service.slug || `service-${index}`}
                                    className="basis-full md:basis-1/2"
                                >
                                    <ServiceList
                                        service={service}
                                        index={index}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                    </Carousel>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 3 }, (_, index) => (
                            <div
                                key={`placeholder-${index}`}
                                className="group opacity-50"
                            >
                                <div className="bg-background/60 border-border rounded-2xl border p-6 shadow-lg backdrop-blur-lg">
                                    <div className="bg-muted mb-4 flex aspect-video items-center justify-center rounded-lg">
                                        <img
                                            src="/placeholder/placeholder.svg"
                                            alt="Placeholder Service"
                                            className="size-16 object-contain opacity-50"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="bg-muted h-4 animate-pulse rounded"></div>
                                        <div className="bg-muted/70 size-3/4 animate-pulse rounded"></div>
                                        <div className="bg-muted h-3 w-1/2 animate-pulse rounded"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Button
                        variant="outline"
                        size="lg"
                        className="border-border text-foreground hover:bg-accent"
                        onClick={() => (window.location.href = "/event")}
                    >
                        <Tag className="mr-2 size-4" />
                        Lihat Semua Event
                    </Button>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}

export { RelatedServicesSection };
