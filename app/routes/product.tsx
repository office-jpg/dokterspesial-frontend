import { lazy, Suspense } from "react";

import { getReviews } from "~/actions/review/get-reviews";
import { MedicalSpecializationsSection } from "~/features/product/partials/medical-specializations-section";

// Lazy load non-critical sections
const GPASection = lazy(() => import("~/features/product/partials/gpa-section").then(m => ({ default: m.GPASection })));
const DDSection = lazy(() => import("~/features/product/partials/dd-section").then(m => ({ default: m.DDSection })));
const CTASection = lazy(() => import("~/features/product/partials/cta-section").then(m => ({ default: m.CTASection })));

import type { Route } from "./+types/product";

export async function loader({}: Route.LoaderArgs) {
    try {
        const reviewsResponse = await getReviews({ per_page: 20 });
        return {
            reviews: reviewsResponse.data || []
        };
    } catch (error) {
        console.error('Failed to load reviews:', error);
        return {
            reviews: []
        };
    }
}

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Event Unggulan - Dokter Spesial" },
        {
            name: "description",
            content: "Temukan Event unggulan platform Klinik Ilmiah yang membantu Anda menguasai riset dan publikasi ilmiah dengan lebih mudah.",
        },
        {
            name: "keywords",
            content: "#PublishLikeABoss, pelatihan publikasi ilmiah, workshop systematic literature review, meta-analisis, cara publikasi jurnal scopus, workshop meta analisis, belajar riset untuk dokter, pelatihan data sekunder Riskesdas SDKI, Workshop Publikasi Jurnal Scopus, Workshop jurnal scopus, Event unggulan, mentor expert, program pembelajaran, benefit pelatihan",
        },
        {
            property: "og:title",
            content: "Event Unggulan - Dokter Spesial",
        },
        {
            property: "og:description",
            content: "Temukan Event unggulan platform Klinik Ilmiah yang membantu Anda menguasai riset dan publikasi ilmiah dengan lebih mudah.",
        },
        {
            property: "og:type",
            content: "website",
        },
        {
            property: "og:url",
            content: "https://klinikilmiah.com/produk",
        },
    ];
}

export default function ProductPage({ loaderData }: Route.ComponentProps) {
    return (
        <>
            <MedicalSpecializationsSection />
            <Suspense fallback={<div className="h-96 animate-pulse bg-muted/20" />}>
                <GPASection />
            </Suspense>
            <Suspense fallback={<div className="h-96 animate-pulse bg-muted/20" />}>
                <DDSection />
            </Suspense>
            <Suspense fallback={<div className="h-32 animate-pulse bg-muted/20" />}>
                <CTASection reviews={loaderData.reviews} />
            </Suspense>
        </>
    );
}
