import { lazy, Suspense } from "react";

import { getBlogs } from "~/actions/home/get-blogs";
import { getCalendarEvents } from "~/actions/home/get-calendar";
import { getServices } from "~/actions/home/get-services";
import { getMentors } from "~/actions/mentor/get-mentors";
import { getReviews } from "~/actions/review/get-reviews";
import { siteConfig } from "~/lib/site";
import NoiseBackground from "~/features/home/_components/noise-background";
import AboutSection from "~/features/home/partials/about-section";
import FeaturesSection from "~/features/home/partials/features-section";
import HeroSection from "~/features/home/partials/hero-section";
import ServiceSection from "~/features/home/partials/service-section";

// Lazy load non-critical sections
const BlogSection = lazy(() => import("~/features/home/partials/blog-section").then(m => ({ default: m.BlogSection })));
const CalendarSection = lazy(() => import("~/features/home/partials/calendar-section"));
const TestimonialsSection = lazy(() => import("~/features/home/partials/testimonials-section"));
const GpaProcessSection = lazy(() => import("~/features/home/_components/gpa-process-section"));
const DdProcessSection = lazy(() => import("~/features/home/partials/dd-process-section"));
const DdCTASection = lazy(() => import("~/features/home/partials/dd-cta-section"));
const GpaCTASection = lazy(() => import("~/features/home/partials/gpa-cta-section"));

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    const title = `${siteConfig.name} - ${siteConfig.tagline}`;
    const description = siteConfig.description;
    const url = siteConfig.url;
    const ogImage = `${url}${siteConfig.ogImage}`;

    return [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: siteConfig.keywords.join(", ") },
        
        // Open Graph
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: ogImage },
        { property: "og:site_name", content: siteConfig.name },
        
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogImage },
        
        // Additional
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { rel: "canonical", href: url },
    ];
}

export async function loader({ request }: Route.LoaderArgs) {
    try {
        const url = new URL(request.url);
        const now = new Date();
        
        // Get calendar parameters from URL
        const calendarYear = parseInt(url.searchParams.get("year") || now.getFullYear().toString());
        const calendarMonth = parseInt(url.searchParams.get("month") || (now.getMonth() + 1).toString());
        const calendarFilter = url.searchParams.get("filter") || "berlangsung,akan datang";
        
        const [allServicesData, blogsData, mentorsData, reviewsData, calendarData] =
            await Promise.all([
                getServices({ per_page: 10 }),
                getBlogs({ per_page: 3 }),
                getMentors({ per_page: 3 }),
                getReviews({ per_page: 15 }),
                getCalendarEvents({ 
                    year: calendarYear, 
                    month: calendarMonth,
                    status: calendarFilter
                }),
            ]);

        const webinarServices = allServicesData.data
            .filter((service) => {
                if (Array.isArray(service.categories)) {
                    return service.categories.some((cat) =>
                        typeof cat === "string"
                            ? cat === "Webinar"
                            : cat.name === "Webinar"
                    );
                }
                return service.category === "Webinar";
            })
            .slice(0, 3);

        const workshopServices = allServicesData.data
            .filter((service) => {
                if (Array.isArray(service.categories)) {
                    return service.categories.some((cat) =>
                        typeof cat === "string"
                            ? cat === "Workshop"
                            : cat.name === "Workshop"
                    );
                }
                return service.category === "Workshop";
            })
            .slice(0, 3);

        return {
            webinarServices,
            workshopServices,
            blogs: blogsData.data,
            mentors: mentorsData.data,
            reviews: reviewsData.data,
            calendar: calendarData,
            calendarMeta: {
                year: calendarYear,
                month: calendarMonth,
                filter: calendarFilter
            },
        };
    } catch (error) {
        console.error("Error loading home data:", error);
        
        const now = new Date();
        return {
            webinarServices: [],
            workshopServices: [],
            blogs: [],
            mentors: [],
            reviews: [],
            calendar: [],
            calendarMeta: {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                filter: "berlangsung,akan datang"
            },
        };
    }
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
    return (
        <>
            <NoiseBackground />
            <HeroSection />
            <AboutSection />
            <FeaturesSection />
            <ServiceSection loaderData={loaderData} />
            <Suspense fallback={<div className="h-64 animate-pulse bg-muted/20" />}>
                <GpaProcessSection />
            </Suspense>
            <Suspense fallback={<div className="h-32 animate-pulse bg-muted/20" />}>
                <GpaCTASection />
            </Suspense>
            <Suspense fallback={<div className="h-64 animate-pulse bg-muted/20" />}>
                <DdProcessSection />
            </Suspense>
            <Suspense fallback={<div className="h-32 animate-pulse bg-muted/20" />}>
                <DdCTASection />
            </Suspense>
            <Suspense fallback={<div className="h-96 animate-pulse bg-muted/20" />}>
                <CalendarSection loaderData={{ 
                    calendar: loaderData.calendar,
                    calendarMeta: loaderData.calendarMeta
                }} />
            </Suspense>
            <Suspense fallback={<div className="h-64 animate-pulse bg-muted/20" />}>
                <BlogSection loaderData={loaderData} />
            </Suspense>
            <Suspense fallback={<div className="h-64 animate-pulse bg-muted/20" />}>
                <TestimonialsSection loaderData={{ reviews: loaderData.reviews }} />
            </Suspense>
        </>
    );
}
