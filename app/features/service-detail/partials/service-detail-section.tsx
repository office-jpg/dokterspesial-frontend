import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

import { Star } from "lucide-react";

import { AspectRatio } from "~/components/atoms/aspect-ratio";
import { Avatar, AvatarFallback } from "~/components/atoms/avatar";
import { Badge } from "~/components/atoms/badge";
import { Button } from "~/components/atoms/button";
import { Card, CardContent } from "~/components/atoms/card";
import { FlickeringGrid } from "~/components/atoms/flickering-grid";
import MaxWidthWrapper from "~/components/atoms/max-width-wrapper";
import SectionHeader from "~/components/atoms/section-header";
import {
    useWhatsAppRecordingUrl,
    useWhatsAppServiceUrl,
} from "~/hooks/use-whatsapp";
import { type ServiceProps } from "~/types";
import {
    generateAltText,
    getImageSrc,
    handleImageError,
} from "~/utils/image-fallback";

import { ServiceDetailBreadcrumb } from "../_components/service-detail-breadcrumb";
import { ServiceDetailSidebar } from "../_components/service-detail-sidebar";
import { ServiceDetailImageSkeleton } from "../_components/skeletons/service-detail-image-skeleton";
import { ServiceDetailSkeleton } from "../_components/skeletons/service-detail-skeleton";

interface ServiceDetailSectionProps {
    service?: ServiceProps;
}

export function ServiceDetailSection({ service }: ServiceDetailSectionProps) {
    const navigate = useNavigate();
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [showAllPresenters, setShowAllPresenters] = useState(false);

    const whatsappServiceUrl = useWhatsAppServiceUrl(
        service
            ? {
                  title: service.title,
                  price:
                      typeof service.price === "number"
                          ? { current: service.price, original: service.price }
                          : service.price,
                  category: service.category,
                  type: service.type,
                  date: service.date,
                  time: service.time,
                  format: service.format || "Online",
                  presenter: service.presenter,
                  presenters: service.presenters || [],
                  types: service.types || [],
                  spesialists: service.spesialists || [],
                  start_time: service.start_time || "",
                  end_time: service.end_time || "",
                  location: service.location || "",
              }
            : {
                  title: "",
                  price: { current: 0, original: 0 },
                  category: "",
                  type: "",
                  date: "",
                  time: "",
                  format: "Online",
                  presenters: [],
                  types: [],
                  spesialists: [],
                  start_time: "",
                  end_time: "",
                  location: "",
              }
    );

    const whatsappRecordingUrl = useWhatsAppRecordingUrl(
        service
            ? {
                  title: service.title,
                  price:
                      typeof service.price === "number"
                          ? { current: service.price, original: service.price }
                          : service.price,
                  category: service.category,
                  type: service.type,
                  date: service.date,
                  time: service.time,
                  format: service.format || "Online",
                  presenter: service.presenter,
                  presenters: service.presenters || [],
                  types: service.types || [],
                  spesialists: service.spesialists || [],
                  start_time: service.start_time || "",
                  end_time: service.end_time || "",
                  location: service.location || "",
              }
            : {
                  title: "",
                  price: { current: 0, original: 0 },
                  category: "",
                  type: "",
                  date: "",
                  time: "",
                  format: "Online",
                  presenters: [],
                  types: [],
                  spesialists: [],
                  start_time: "",
                  end_time: "",
                  location: "",
              }
    );

    useEffect(() => {
        let mounted = true;

        if (service?.image) {
            const img = new Image();
            img.onload = () => mounted && setIsImageLoading(false);
            img.onerror = () => mounted && setIsImageLoading(false);
            img.src = service.image;
        } else {
            setIsImageLoading(false);
        }

        return () => {
            mounted = false;
        };
    }, [service?.image]);

    const generateInitials = (name: string): string => {
        if (!name) return "?";
        const words = name.trim().split(/\s+/);
        return words.length === 1
            ? words[0][0]?.toUpperCase() || "?"
            : words
                  .slice(0, 2)
                  .map((word) => word[0]?.toUpperCase() || "")
                  .join("");
    };

    const formatDate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            return isNaN(date.getTime())
                ? "TBA"
                : date.toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                  });
        } catch {
            return "TBA";
        }
    };

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Star
                    key={i}
                    className="size-4 fill-yellow-400 text-yellow-400"
                />
            );
        }
        if (hasHalfStar) {
            stars.push(
                <Star
                    key="half"
                    className="size-4 fill-yellow-400/50 text-yellow-400"
                />
            );
        }
        for (let i = 0; i < 5 - Math.ceil(rating); i++) {
            stars.push(
                <Star
                    key={`empty-${i}`}
                    className="text-muted-foreground/40 size-4"
                />
            );
        }
        return stars;
    };

    const getStatusBadge = (status: string) => {
        const statusMap = {
            upcoming: (
                <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700"
                >
                    Akan Datang
                </Badge>
            ),
            ongoing: (
                <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                >
                    Sedang Berlangsung
                </Badge>
            ),
            ended: (
                <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                    Selesai
                </Badge>
            ),
        };
        return (
            statusMap[status as keyof typeof statusMap] || (
                <Badge variant="secondary">Status Tidak Diketahui</Badge>
            )
        );
    };

    if (!service) {
        return <ServiceDetailSkeleton />;
    }

    const reviews = service.reviews || [];

    return (
        <section id="detail-service" className="relative py-8 md:py-24">
            <MaxWidthWrapper>
                <div className="absolute top-8 left-0 z-0 h-[200px] w-full [mask-image:linear-gradient(to_top,transparent_25%,black_95%)] md:top-24">
                    <FlickeringGrid
                        className="absolute top-0 left-0 size-full"
                        squareSize={4}
                        gridGap={6}
                        color="#6B7280"
                        maxOpacity={0.2}
                        flickerChance={0.05}
                    />
                </div>

                <ServiceDetailBreadcrumb title={service.title} />

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="space-y-8 lg:col-span-2">
                        <SectionHeader
                            badge={service.category || service.type}
                            title={service.title}
                        />

                        <div className="flex flex-row gap-2">
                            {service.types && service.types.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {service.types.map((type, index) => (
                                        <Badge
                                            key={index}
                                            variant="secondary"
                                            className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                        >
                                            {typeof type === "string"
                                                ? type
                                                : type.name}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {service.spesialists &&
                                service.spesialists.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {service.spesialists.map(
                                            (spesialist, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="outline"
                                                    className="border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-400"
                                                >
                                                    {typeof spesialist ===
                                                    "string"
                                                        ? spesialist
                                                        : spesialist.name}
                                                </Badge>
                                            )
                                        )}
                                    </div>
                                )}
                        </div>

                        {service.presenters &&
                            service.presenters.length > 0 && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-foreground text-xl font-semibold">
                                            Presenter
                                        </h3>
                                        {service.presenters.length > 4 && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    setShowAllPresenters(
                                                        !showAllPresenters
                                                    )
                                                }
                                                className="text-sm"
                                            >
                                                {showAllPresenters
                                                    ? "Tampilkan Lebih Sedikit"
                                                    : `Tampilkan ${service.presenters.length - 4} Lainnya`}
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {(showAllPresenters
                                            ? service.presenters
                                            : service.presenters.slice(0, 4)
                                        ).map((presenter, index) => (
                                            <Card
                                                key={index}
                                                className="bg-background border-secondary rounded-none border-2 p-3"
                                            >
                                                <CardContent className="p-0">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="size-12">
                                                            <AvatarFallback className="bg-foreground text-background text-sm font-medium">
                                                                {generateInitials(
                                                                    presenter.name
                                                                )}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-foreground truncate text-sm font-semibold">
                                                                {presenter.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}

                        <AspectRatio ratio={1} className="bg-background overflow-hidden rounded-none shadow-sm">
                            {isImageLoading ? (
                                <ServiceDetailImageSkeleton />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={getImageSrc(service.image)}
                                        alt={generateAltText(
                                            service.title,
                                            service.category
                                        )}
                                        onError={handleImageError}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                            )}
                        </AspectRatio>

                        <div className="bg-background rounded-none p-8 shadow-sm">
                            <div className="mb-8">
                                <h3 className="text-foreground mb-4 text-xl font-semibold">
                                    Deskripsi
                                </h3>
                                <div
                                    className="prose prose-gray dark:prose-invert text-muted-foreground rich-content max-w-none leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            service.description ||
                                            "Deskripsi tidak tersedia.",
                                    }}
                                />
                            </div>

                            {reviews.length > 0 && (
                                <div className="mb-8 rounded-none border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-400 dark:bg-yellow-300/20">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex">
                                                {renderStars(
                                                    reviews.reduce(
                                                        (sum, review) =>
                                                            sum + review.rating,
                                                        0
                                                    ) / reviews.length
                                                )}
                                            </div>
                                            <span className="text-foreground text-lg font-semibold">
                                                {(
                                                    reviews.reduce(
                                                        (sum, review) =>
                                                            sum + review.rating,
                                                        0
                                                    ) / reviews.length
                                                ).toFixed(1)}
                                            </span>
                                            <span className="text-muted-foreground text-sm">
                                                ({reviews.length} ulasan)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <h3 className="text-foreground mb-4 text-xl font-semibold">
                                    Review Peserta
                                </h3>

                                {reviews.length > 0 ? (
                                    <div className="space-y-4">
                                        {(showAllReviews
                                            ? reviews
                                            : reviews.slice(0, 3)
                                        ).map((review) => (
                                            <div
                                                key={review.id}
                                                className="bg-background rounded-none border border-gray-200 p-6 dark:border-gray-700"
                                            >
                                                <div className="mb-3 flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="size-10">
                                                            <AvatarFallback className="bg-blue-100 text-sm font-semibold text-blue-600">
                                                                {generateInitials(
                                                                    review.reviewer
                                                                )}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="text-foreground font-semibold">
                                                                {
                                                                    review.reviewer
                                                                }
                                                            </p>
                                                            <p className="text-muted-foreground text-xs">
                                                                {review.created_at
                                                                    ? formatDate(
                                                                          review.created_at
                                                                      )
                                                                    : ""}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        {renderStars(
                                                            review.rating
                                                        )}
                                                    </div>
                                                </div>
                                                <div
                                                    className="text-muted-foreground leading-relaxed"
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            review.comment ||
                                                            "Tidak ada komentar.",
                                                    }}
                                                />
                                            </div>
                                        ))}

                                        {reviews.length > 3 && (
                                            <div className="text-center">
                                                <Button
                                                    variant="outline"
                                                    onClick={() =>
                                                        setShowAllReviews(
                                                            !showAllReviews
                                                        )
                                                    }
                                                    className="border-border text-foreground hover:bg-accent w-full"
                                                >
                                                    {showAllReviews
                                                        ? "Tampilkan Lebih Sedikit"
                                                        : `Tampilkan ${reviews.length - 3} Review Lainnya`}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="bg-background border-border rounded-none border p-8 text-center">
                                        <div className="bg-muted mx-auto mb-3 flex size-12 items-center justify-center rounded-full">
                                            <Star className="text-muted-foreground size-6" />
                                        </div>
                                        <p className="text-muted-foreground">
                                            Belum ada review untuk layanan ini
                                        </p>
                                        <p className="text-muted-foreground/70 mt-1 text-sm">
                                            Jadilah yang pertama memberikan
                                            review!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <ServiceDetailSidebar
                            serviceData={service}
                            onRegisterClick={() => {
                                if (whatsappServiceUrl) {
                                    window.open(whatsappServiceUrl, "_blank");
                                }
                            }}
                            onRecordingClick={() => {
                                if (whatsappRecordingUrl) {
                                    window.open(whatsappRecordingUrl, "_blank");
                                }
                            }}
                        />
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}
