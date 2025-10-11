import { useEffect, useState } from "react";

interface WhatsAppServiceData {
    title: string;
    type: string;
    date: string;
    time: string;
    start_time?: string;
    end_time?: string;
    format: string;
    price: {
        current: number;
        original: number;
    };
    presenter?: {
        name: string;
    };
    presenters?: Array<{
        name: string;
    }>;
    category?: string;
    eventType?: string;
    types?: Array<{ name: string } | string>;
    spesialists?: Array<{ name: string } | string>;
    status?: string;
    location?: string;
}

export function useWhatsAppUrl(
    message: string = "Halo, saya ingin menghubungi tim Dokter Spesial untuk konsultasi. Mohon dibantu untuk informasi lebih lanjut. Terima kasih!",
    customPhoneNumber?: string
) {
    const [whatsappUrl, setWhatsappUrl] = useState("");
    const [isClient, setIsClient] = useState(false);

    const phoneNumber = customPhoneNumber || "6281291501571";

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const isMobile = (() => {
            if (typeof navigator === "undefined") return false;

            const userAgent = navigator.userAgent;

            const mobileRegex =
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
            const isMobileDevice = mobileRegex.test(userAgent);

            const tabletRegex = /iPad|Android(?=.*\bMobile\b)/i;
            const isTablet = tabletRegex.test(userAgent);

            const hasSmallScreen = window.innerWidth <= 768;

            return (
                isMobileDevice ||
                isTablet ||
                (hasSmallScreen && /Mobi|Android/i.test(userAgent))
            );
        })();

        const encodedMessage = encodeURIComponent(message);

        if (isMobile) {
            setWhatsappUrl(
                `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
            );
        } else {
            setWhatsappUrl(
                `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
            );
        }
    }, [message, phoneNumber, isClient]);

    return whatsappUrl;
}

export function useWhatsAppServiceUrl(serviceData: WhatsAppServiceData) {
    const [whatsappUrl, setWhatsappUrl] = useState("");
    const [isClient, setIsClient] = useState(false);

    const phoneNumber = "6281291501571";

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const isMobile = (() => {
            if (typeof navigator === "undefined") return false;

            const userAgent = navigator.userAgent;

            const mobileRegex =
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
            const isMobileDevice = mobileRegex.test(userAgent);

            const tabletRegex = /iPad|Android(?=.*\bMobile\b)/i;
            const isTablet = tabletRegex.test(userAgent);

            const hasSmallScreen = window.innerWidth <= 768;

            return (
                isMobileDevice ||
                isTablet ||
                (hasSmallScreen && /Mobi|Android/i.test(userAgent))
            );
        })();

        const formatPrice = (price: number) => {
            if (price === 0) {
                return "Gratis";
            }
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(price);
        };

        const formatDate = (dateString: string) => {
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

        const formatTime = (timeString: string) => {
            try {
                const time = new Date(timeString);
                return isNaN(time.getTime())
                    ? "TBA"
                    : time.toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                      });
            } catch {
                return "TBA";
            }
        };

        const formatPresenters = () => {
            if (serviceData.presenters && serviceData.presenters.length > 0) {
                return serviceData.presenters.map((p) => p.name).join(", ");
            }
            return serviceData.presenter?.name || "TBA";
        };

        const formatTypes = () => {
            if (serviceData.types && serviceData.types.length > 0) {
                return serviceData.types
                    .map((type) =>
                        typeof type === "string" ? type : type.name
                    )
                    .join(", ");
            }
            return "Umum";
        };

        const formatSpesialists = () => {
            if (serviceData.spesialists && serviceData.spesialists.length > 0) {
                return serviceData.spesialists
                    .map((spec) =>
                        typeof spec === "string" ? spec : spec.name
                    )
                    .join(", ");
            }
            return "Umum";
        };

        const formatSchedule = () => {
            const dateFormatted = formatDate(serviceData.date);
            const startTime = serviceData.start_time
                ? formatTime(serviceData.start_time)
                : serviceData.time;
            const endTime = serviceData.end_time
                ? formatTime(serviceData.end_time)
                : "";

            if (endTime && endTime !== "TBA") {
                return `${dateFormatted}\n⏰ ${startTime} - ${endTime} WIB`;
            }
            return `${dateFormatted}\n⏰ ${startTime} WIB`;
        };

        const message = `Halo, saya ingin mendaftar layanan Dokter Spesial:

🎯 *${serviceData.title}*

📋 *Detail Lengkap Event:*
💰 Harga: ${formatPrice(serviceData.price.current)}${serviceData.price.original > serviceData.price.current ? ` (Hemat dari ${formatPrice(serviceData.price.original)})` : ""}
📂 Kategori: ${serviceData.category || serviceData.type}
🏷️ Jenis Acara: ${formatTypes()}
👨‍⚕️ Spesialisasi: ${formatSpesialists()}
👥 Presenter: ${formatPresenters()}
📅 Jadwal: ${formatSchedule()}
📍 Format: ${serviceData.format}${serviceData.location ? `\n🏢 Lokasi: ${serviceData.location}` : ""}

Mohon informasi lebih lanjut untuk pendaftaran dan konfirmasi ketersediaan. Terima kasih!`;

        const encodedMessage = encodeURIComponent(message);

        if (isMobile) {
            setWhatsappUrl(
                `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
            );
        } else {
            setWhatsappUrl(
                `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
            );
        }
    }, [serviceData, phoneNumber, isClient]);

    return whatsappUrl;
}

export function useWhatsAppRecordingUrl(serviceData: WhatsAppServiceData) {
    const [whatsappUrl, setWhatsappUrl] = useState("");
    const [isClient, setIsClient] = useState(false);

    const phoneNumber = "6281291501571";

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const isMobile = (() => {
            if (typeof navigator === "undefined") return false;

            const userAgent = navigator.userAgent;

            const mobileRegex =
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
            const isMobileDevice = mobileRegex.test(userAgent);

            const tabletRegex = /iPad|Android(?=.*\bMobile\b)/i;
            const isTablet = tabletRegex.test(userAgent);

            const hasSmallScreen = window.innerWidth <= 768;

            return (
                isMobileDevice ||
                isTablet ||
                (hasSmallScreen && /Mobi|Android/i.test(userAgent))
            );
        })();

        const formatPrice = (price: number) => {
            if (price === 0) {
                return "Gratis";
            }
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(price);
        };

        const formatDate = (dateString: string) => {
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

        const formatPresenters = () => {
            if (serviceData.presenters && serviceData.presenters.length > 0) {
                return serviceData.presenters.map((p) => p.name).join(", ");
            }
            return serviceData.presenter?.name || "TBA";
        };

        const formatTypes = () => {
            if (serviceData.types && serviceData.types.length > 0) {
                return serviceData.types
                    .map((type) =>
                        typeof type === "string" ? type : type.name
                    )
                    .join(", ");
            }
            return "Umum";
        };

        const formatSpesialists = () => {
            if (serviceData.spesialists && serviceData.spesialists.length > 0) {
                return serviceData.spesialists
                    .map((spec) =>
                        typeof spec === "string" ? spec : spec.name
                    )
                    .join(", ");
            }
            return "Umum";
        };

        const recordingPrice = Math.round(serviceData.price.current * 0.7);

        const message = `Halo, saya ingin membeli rekaman layanan Dokter Spesial:

🎬 *Rekaman: ${serviceData.title}*

📋 *Detail Rekaman:*
💰 Harga Rekaman: ${formatPrice(recordingPrice)}
💿 Format: Video HD + Materi PDF
📂 Kategori: ${serviceData.category || serviceData.type}
🏷️ Jenis Acara: ${formatTypes()}
👨‍⚕️ Spesialisasi: ${formatSpesialists()}
👥 Presenter: ${formatPresenters()}
📅 Tanggal Acara: ${formatDate(serviceData.date)}
⚡ Akses: Selamanya (Lifetime Access)

🎁 *Bonus:*
• Materi presentasi lengkap
• Sertifikat kehadiran digital
• Akses grup diskusi eksklusif

Mohon informasi lebih lanjut untuk pembelian rekaman dan metode pembayaran. Terima kasih!`;

        const encodedMessage = encodeURIComponent(message);

        if (isMobile) {
            setWhatsappUrl(
                `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
            );
        } else {
            setWhatsappUrl(
                `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
            );
        }
    }, [serviceData, phoneNumber, isClient]);

    return whatsappUrl;
}

export type { WhatsAppServiceData };
