import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

import { AspectRatio } from "~/components/atoms/aspect-ratio";
import { Avatar, AvatarFallback } from "~/components/atoms/avatar";
import { Badge } from "~/components/atoms/badge";
import { Button } from "~/components/atoms/button";
import { Card } from "~/components/atoms/card";
import { Icon } from "~/components/atoms/icon";
import { Marquee } from "~/components/atoms/marquee";
import { sanitizeContentAsText } from "~/lib/content-sanitizer";
import { type ServiceType } from "~/types";
import { type Service } from "~/types/api";
import {
    formatCategoriesDisplay,
    formatSpesialistsDisplay,
    formatTypesDisplay,
} from "~/utils/array-display";

interface ServiceListProps {
    service: Service;
    index: number;
    types?: ServiceType[];
    customWidth?: string;
}

const ServiceList = ({ service, types, customWidth }: ServiceListProps) => {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const getServiceTypeName = (id: number | undefined): string => {
        if (!id) return "N/A";
        const type = types?.find((t) => t.id === id);
        return type?.name || `Type ${id}`;
    };

    const handleCardClick = (slug: string) => {
        navigate(`/event/${slug}`);
    };

    return (
        <Card
            className={`group border-secondary bg-background hover:border-accent cursor-pointer rounded-none border p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-500/50 sm:p-6 dark:hover:shadow-gray-900/20 ${customWidth || "w-full"}`}
            onClick={() => handleCardClick(service.slug)}
        >
            <div className="flex flex-col items-start justify-center gap-4 sm:gap-6">
                <div className="flex w-full gap-3">
                    <div className="flex-shrink-0">
                        <div className="w-20 sm:w-24 md:w-28">
                            <AspectRatio
                                ratio={1}
                                className="bg-background overflow-hidden rounded-none shadow-sm"
                            >
                                {imageError || !service.image ? (
                                    <div className="bg-background flex h-full w-full items-center justify-center">
                                        <Icon
                                            icon="lucide:image-off"
                                            className="text-secondary size-6 sm:size-8"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                                        <img
                                            src={service.image}
                                            alt={service.name}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            loading="lazy"
                                            onError={() => setImageError(true)}
                                            decoding="async"
                                        />
                                    </div>
                                )}
                            </AspectRatio>
                        </div>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div className="flex h-full w-full flex-col justify-start gap-2">
                            <h3 className="text-foreground group-hover:text-tertiary line-clamp-2 max-h-10 text-sm leading-tight font-semibold transition-colors duration-200 sm:text-base md:max-h-10">
                                {service.name}
                            </h3>

                            <div className="flex flex-row items-center justify-start">
                                {(() => {
                                    const currentPrice =
                                        typeof service.price === "object" &&
                                        service.price !== null
                                            ? (
                                                  service.price as {
                                                      current: number;
                                                      original: number;
                                                  }
                                              ).original || 0
                                            : (service.price as number) || 0;
                                    const discountPrice =
                                        service.price_discount ||
                                        (typeof service.price === "object" &&
                                        service.price !== null
                                            ? (
                                                  service.price as {
                                                      current: number;
                                                      original: number;
                                                  }
                                              ).current || 0
                                            : 0);

                                    if (
                                        discountPrice === 0 ||
                                        currentPrice === 0
                                    ) {
                                        return (
                                            <div className="text-primary text-sm font-bold sm:text-lg">
                                                GRATIS
                                            </div>
                                        );
                                    }

                                    const hasDiscount =
                                        discountPrice > 0 &&
                                        currentPrice > discountPrice;
                                    const displayPrice = hasDiscount
                                        ? discountPrice
                                        : currentPrice;
                                    const strikethroughPrice = hasDiscount
                                        ? currentPrice
                                        : null;

                                    return (
                                        <div className="flex flex-row flex-wrap items-center gap-1 sm:gap-2">
                                            {strikethroughPrice && (
                                                <span className="text-xs text-red-500 line-through opacity-70">
                                                    Rp{" "}
                                                    {strikethroughPrice.toLocaleString(
                                                        "id-ID"
                                                    )}
                                                </span>
                                            )}
                                            <div className="text-sm font-bold text-gray-900 sm:text-lg dark:text-white">
                                                Rp{" "}
                                                {displayPrice.toLocaleString(
                                                    "id-ID"
                                                )}
                                            </div>
                                            {hasDiscount && (
                                                <Badge
                                                    variant={"destructive"}
                                                    className="rounded-none bg-red-100 px-1 py-0.5 text-xs text-red-600 sm:px-2 dark:bg-red-900 dark:text-red-200"
                                                >
                                                    {Math.round(
                                                        ((currentPrice -
                                                            discountPrice) /
                                                            currentPrice) *
                                                            100
                                                    )}
                                                    % OFF
                                                </Badge>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>

                            <div className="grid grid-cols-2 gap-2 lg:grid-cols-2">
                                <div className="flex items-center gap-2">
                                    <Icon
                                        icon="lucide:tag"
                                        className="size-3 flex-shrink-0"
                                    />
                                    <div className="min-w-0 lg:max-w-full">
                                        <Badge
                                            variant="secondary"
                                            className="block w-full rounded-none text-xs"
                                        >
                                            <span className="block truncate">
                                                {(() => {
                                                    const typesFallback =
                                                        service.type_event
                                                            ? [
                                                                  service.type_event,
                                                              ]
                                                            : [];
                                                    const typesDisplay =
                                                        formatTypesDisplay(
                                                            service.types ||
                                                                typesFallback,
                                                            1
                                                        );
                                                    return (
                                                        typesDisplay.displayText ||
                                                        service.type_event ||
                                                        getServiceTypeName(
                                                            service.type_event_id
                                                        ) ||
                                                        "General"
                                                    );
                                                })()}
                                            </span>
                                        </Badge>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <Icon
                                        icon="lucide:folder"
                                        className="size-3 flex-shrink-0"
                                    />
                                    <div className="flex flex-wrap gap-1">
                                        {(() => {
                                            const categories =
                                                service.categories || [];
                                            const maxDisplay = isMobile ? 1 : 2;
                                            const displayCategories =
                                                categories.slice(0, maxDisplay);
                                            const remainingCount =
                                                categories.length - maxDisplay;

                                            return (
                                                <>
                                                    {displayCategories.length >
                                                    0 ? (
                                                        displayCategories.map(
                                                            (
                                                                category,
                                                                index
                                                            ) => (
                                                                <Badge
                                                                    key={index}
                                                                    variant="secondary"
                                                                    className="rounded-none text-xs"
                                                                >
                                                                    {typeof category ===
                                                                    "string"
                                                                        ? category
                                                                        : category.name}
                                                                </Badge>
                                                            )
                                                        )
                                                    ) : (
                                                        <Badge
                                                            variant="secondary"
                                                            className="rounded-none text-xs"
                                                        >
                                                            General
                                                        </Badge>
                                                    )}
                                                    {remainingCount > 0 && (
                                                        <Badge
                                                            variant="outline"
                                                            className="rounded-none bg-gray-50 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                                                        >
                                                            +{remainingCount}
                                                        </Badge>
                                                    )}
                                                </>
                                            );
                                        })()}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Icon
                                        icon="lucide:activity"
                                        className="size-3 flex-shrink-0"
                                    />
                                    <Badge
                                        variant={
                                            service.status === "akan datang"
                                                ? "default"
                                                : service.status ===
                                                    "berlangsung"
                                                  ? "secondary"
                                                  : service.status === "selesai"
                                                    ? "outline"
                                                    : "outline"
                                        }
                                        className={`rounded-none text-xs ${
                                            service.status === "akan datang"
                                                ? "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200"
                                                : service.status ===
                                                    "berlangsung"
                                                  ? "bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-200"
                                                  : service.status === "selesai"
                                                    ? "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-200"
                                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-200"
                                        }`}
                                    >
                                        {(() => {
                                            switch (service.status) {
                                                case "akan datang":
                                                    return "Akan Datang";
                                                case "berlangsung":
                                                    return "Berlangsung";
                                                case "selesai":
                                                    return "Selesai";
                                                default:
                                                    return (
                                                        service.status ||
                                                        "Tersedia"
                                                    );
                                            }
                                        })()}
                                    </Badge>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Icon
                                        icon="lucide:stethoscope"
                                        className="size-3 flex-shrink-0"
                                    />
                                    <div className="min-w-0 flex-1">
                                        {(() => {
                                            if (
                                                service.spesialists &&
                                                service.spesialists.length > 0
                                            ) {
                                                if (
                                                    service.spesialists.length >
                                                    1
                                                ) {
                                                    return (
                                                        <div className="w-full overflow-hidden rounded-none">
                                                            <Marquee
                                                                className="[--duration:20s] [--gap:0.5rem]"
                                                                pauseOnHover={
                                                                    true
                                                                }
                                                                repeat={2}
                                                            >
                                                                {service.spesialists.map(
                                                                    (
                                                                        specialist,
                                                                        index
                                                                    ) => {
                                                                        const specialistName =
                                                                            typeof specialist ===
                                                                            "string"
                                                                                ? specialist
                                                                                : specialist.name;
                                                                        return (
                                                                            <Badge
                                                                                key={
                                                                                    index
                                                                                }
                                                                                variant="secondary"
                                                                                className="mx-1 w-fit rounded-none text-xs whitespace-nowrap"
                                                                            >
                                                                                {
                                                                                    specialistName
                                                                                }
                                                                            </Badge>
                                                                        );
                                                                    }
                                                                )}
                                                            </Marquee>
                                                        </div>
                                                    );
                                                }

                                                const specialist =
                                                    service.spesialists[0];
                                                const specialistName =
                                                    typeof specialist ===
                                                    "string"
                                                        ? specialist
                                                        : specialist.name;

                                                const isLongText =
                                                    specialistName.length > 15;

                                                return (
                                                    <Badge
                                                        variant="secondary"
                                                        className="max-w-full overflow-hidden rounded-none text-xs"
                                                    >
                                                        {isLongText ? (
                                                            <Marquee
                                                                className="[--duration:12s] [--gap:1rem]"
                                                                pauseOnHover={
                                                                    true
                                                                }
                                                                repeat={2}
                                                            >
                                                                <span className="whitespace-nowrap">
                                                                    {
                                                                        specialistName
                                                                    }
                                                                </span>
                                                            </Marquee>
                                                        ) : (
                                                            <span className="block">
                                                                {specialistName}
                                                            </span>
                                                        )}
                                                    </Badge>
                                                );
                                            }
                                            return (
                                                <Badge
                                                    variant="secondary"
                                                    className="w-full rounded-none text-xs"
                                                >
                                                    <span className="block">
                                                        Umum
                                                    </span>
                                                </Badge>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-3">
                    {service.description && (
                        <div className="w-full">
                            <p className="text-muted-foreground line-clamp-2 text-xs">
                                {sanitizeContentAsText(service.description)}
                            </p>
                        </div>
                    )}

                    <div className="flex w-full flex-row items-center justify-between gap-3 border-t border-gray-200 pt-2 dark:border-gray-600">
                        <div className="flex min-w-0 flex-1 flex-row items-center gap-2 sm:gap-3">
                            {service.presenters &&
                            service.presenters.length > 0 ? (
                                <>
                                    <div className="flex flex-shrink-0 items-center -space-x-1 sm:-space-x-2">
                                        <Avatar className="size-7 border-2 border-white sm:size-8 dark:border-slate-900">
                                            <AvatarFallback className="bg-foreground text-xs font-semibold text-white">
                                                {service.presenters[0].name
                                                    .split(" ")
                                                    .map((n: string) => n[0])
                                                    .join("")
                                                    .toUpperCase()
                                                    .slice(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                        {service.presenters.length > 1 && (
                                            <div className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-slate-400 text-xs font-semibold text-white sm:size-8 dark:border-slate-900 dark:bg-slate-300">
                                                +{service.presenters.length - 1}
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0 overflow-hidden">
                                        <div className="flex items-center gap-1">
                                            <p className="text-foreground min-w-0 flex-shrink truncate text-xs font-semibold sm:text-sm">
                                                {service.presenters[0].name}
                                            </p>
                                            {service.presenters.length > 1 && (
                                                <span className="flex-shrink-0 text-xs font-normal whitespace-nowrap text-gray-500">
                                                    &{" "}
                                                    {service.presenters.length -
                                                        1}{" "}
                                                    lainnya
                                                </span>
                                            )}
                                        </div>
                                        {service.spesialists &&
                                            service.spesialists.length > 0 && (
                                                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                                                    {
                                                        service.spesialists[0]
                                                            .name
                                                    }
                                                </p>
                                            )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center -space-x-2">
                                        <Avatar className="border-background h-8 w-8 border-2">
                                            <AvatarFallback className="bg-secondary text-xs font-semibold text-white">
                                                PR
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-foreground truncate text-sm font-semibold">
                                            Mentor
                                        </p>
                                        <p className="text-muted-foreground truncate text-xs">
                                            Akan diumumkan segera
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>

                        <Button
                            size="sm"
                            className="bg-tertiary hover:bg-tertiary/80 dark:hover:bg-tertiary/20 order-1 w-fit flex-shrink-0 self-end px-2 py-1 text-white sm:order-2 sm:self-center sm:px-4 sm:py-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCardClick(service.slug);
                            }}
                        >
                            <span className="flex text-xs sm:text-sm md:flex">
                                Detail
                            </span>
                            <Icon
                                icon="lucide:chevron-right"
                                className="h-3 w-3 sm:ml-1 sm:h-4 sm:w-4"
                            />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ServiceList;
