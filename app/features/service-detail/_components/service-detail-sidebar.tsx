import { useEffect, useState } from "react";

import { Link } from "react-router";

import { Calendar, Clock, MessageCircle } from "lucide-react";

import { Button } from "~/components/atoms/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "~/components/atoms/card";
import StarRating from "~/components/atoms/star-rating";
import { useServiceDetailTypes } from "~/contexts/service-detail-context";
import {
    type WhatsAppServiceData,
    useWhatsAppServiceUrl,
} from "~/hooks/use-whatsapp";
import { type ServiceProps } from "~/types";
import { 
    formatSpesialistsDisplay, 
    formatPresentersDisplay, 
    formatCategoriesDisplay, 
    formatTypesDisplay 
} from "~/utils/array-display";

interface ServiceDetailSidebarProps {
    serviceData: ServiceProps;
    onRegisterClick: () => void;
    onRecordingClick?: () => void;
}

function ServiceDetailSidebar({
    serviceData,
    onRegisterClick,
    onRecordingClick,
}: ServiceDetailSidebarProps) {
    const { getServiceTypeName } = useServiceDetailTypes();

    const whatsappServiceData: WhatsAppServiceData = {
        title: serviceData.title,
        type:
            serviceData.type || getServiceTypeName(serviceData.type_service_id),
        date:
            serviceData.start_time ||
            serviceData.startDate ||
            serviceData.date ||
            "TBA",
        time:
            serviceData.start_time ||
            serviceData.startTime ||
            serviceData.time ||
            "TBA",
        format: serviceData.format || "Online",
        price:
            typeof serviceData.price === "number"
                ? { current: serviceData.price, original: serviceData.price }
                : serviceData.price,
        presenter: serviceData.presenter,
        category: serviceData.category,
        eventType: serviceData.type_event,
    };

    const whatsappUrl = useWhatsAppServiceUrl(whatsappServiceData);

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString: string): string => {
        try {
            if (!dateString) return "TBA";
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "TBA";
            return date.toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } catch (error) {
            return "TBA";
        }
    };

    const formatTime = (timeString: string): string => {
        try {
            if (!timeString) return "TBA";
            const time = new Date(timeString);
            if (isNaN(time.getTime())) return "TBA";
            return time.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch (error) {
            return "TBA";
        }
    };

    const priceInfo =
        typeof serviceData.price === "number"
            ? { current: serviceData.price, original: serviceData.price }
            : serviceData.price;

    const hasDiscount = priceInfo.original > priceInfo.current;
    const discountPercentage = hasDiscount
        ? Math.round(
              ((priceInfo.original - priceInfo.current) / priceInfo.original) *
                  100
          )
        : 0;

    return (
        <div className="h-fit space-y-4 pb-5 lg:sticky lg:top-24 lg:col-span-1 lg:pb-10">
            <Card className="bg-secondary border-0 p-0">
                <CardContent className="p-4">
                    <div className="mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-foreground text-3xl font-bold">
                                {formatPrice(priceInfo.current)}
                            </span>
                            {hasDiscount && (
                                <span className="text-muted-foreground mt-2 text-lg line-through">
                                    {formatPrice(priceInfo.original)}
                                </span>
                            )}
                        </div>
                        {hasDiscount && (
                            <div className="mt-2 text-sm font-semibold text-green-600 dark:text-green-400">
                                Hemat{" "}
                                {formatPrice(
                                    priceInfo.original - priceInfo.current
                                )}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <Button
                            size="lg"
                            className="w-full bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() => {
                                if (serviceData.status === "selesai" && onRecordingClick) {
                                    onRecordingClick();
                                } else {
                                    onRegisterClick();
                                }
                            }}
                        >
                            {serviceData.status === "selesai"
                                ? "Beli Rekaman"
                                : priceInfo.current === 0
                                  ? "Daftar Gratis"
                                  : "Daftar Sekarang"}
                        </Button>

                        <Link
                            to={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 block"
                        >
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full border-green-500 text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20"
                            >
                                <MessageCircle className="mr-2 size-4" />
                                Tanya via WhatsApp
                            </Button>
                        </Link>

                        {serviceData.status === "selesai" && (
                            <p className="text-muted-foreground mt-2 text-center text-xs">
                                Beli sekarang untuk mendapatkan akses ke rekaman
                                kelas.
                            </p>
                        )}
                        {priceInfo.current === 0 &&
                            serviceData.status !== "selesai" && (
                                <p className="text-muted-foreground mt-2 text-center text-xs">
                                    Daftar sekarang untuk mengikuti acara gratis
                                    ini.
                                </p>
                            )}
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm">
                                Rating:
                            </span>
                            <div className="flex w-fit items-center justify-start">
                                <StarRating
                                    value={serviceData.rating?.score || 0}
                                    readOnly={true}
                                    iconSize={16}
                                    variant="default"
                                    color="#f59e0b"
                                    showRatingText={false}
                                    showMaxRating={false}
                                    allowPartialFill={true}
                                    className="mr-2"
                                />
                                <span className="text-foreground text-sm">
                                    {serviceData.rating?.score || 0}/(
                                    {serviceData.rating?.total || 0})
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm">
                                Peserta:
                            </span>
                            <span className="text-foreground text-sm font-medium">
                                {serviceData.totalUsers} orang
                            </span>
                        </div>

                        {serviceData.total_video && serviceData.total_video > 0 && (
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground text-sm">
                                    Total Video:
                                </span>
                                <span className="text-foreground text-sm font-medium">
                                    {serviceData.total_video} video
                                </span>
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm">
                                Kategori:
                            </span>
                            <span className="text-foreground text-sm font-medium">
                                {(() => {
                                    const categoriesFallback = serviceData.category ? [serviceData.category] : [];
                                    const categoriesDisplay = formatCategoriesDisplay(serviceData.categories || categoriesFallback, 2);
                                    return categoriesDisplay.displayText || serviceData.category || serviceData.type;
                                })()}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm">
                                Format:
                            </span>
                            <span className="text-foreground text-sm font-medium">
                                {serviceData.format || "Online"}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-secondary border-0 p-0">
                <CardHeader className="pt-4">
                    <CardTitle className="text-foreground text-lg font-semibold">
                        Jadwal Acara
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Calendar className="size-5 text-blue-600 dark:text-blue-400" />
                            <div className="flex-1">
                                <p className="text-foreground text-sm font-medium">
                                    Tanggal Mulai
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    {serviceData.start_time
                                        ? formatDate(serviceData.start_time)
                                        : serviceData.startDate
                                          ? formatDate(serviceData.startDate)
                                          : serviceData.date || "TBA"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Clock className="size-5 text-green-600 dark:text-green-400" />
                            <div className="flex-1">
                                <p className="text-foreground text-sm font-medium">
                                    Jam Mulai
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    {serviceData.start_time
                                        ? formatTime(serviceData.start_time)
                                        : serviceData.startTime
                                          ? formatTime(serviceData.startTime)
                                          : serviceData.time || "TBA"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Calendar className="size-5 text-orange-600 dark:text-orange-400" />
                            <div className="flex-1">
                                <p className="text-foreground text-sm font-medium">
                                    Tanggal Selesai
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    {serviceData.end_time
                                        ? formatDate(serviceData.end_time)
                                        : serviceData.endDate
                                          ? formatDate(serviceData.endDate)
                                          : serviceData.date || "TBA"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Clock className="size-5 text-red-600 dark:text-red-400" />
                            <div className="flex-1">
                                <p className="text-foreground text-sm font-medium">
                                    Jam Selesai
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    {serviceData.end_time
                                        ? formatTime(serviceData.end_time)
                                        : serviceData.endTime
                                          ? formatTime(serviceData.endTime)
                                          : serviceData.time || "TBA"}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export { ServiceDetailSidebar };
