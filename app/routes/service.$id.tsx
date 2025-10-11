import { useLoaderData } from "react-router";

import { getMentors } from "~/actions/mentor/get-mentors";
import { getServiceCategories } from "~/actions/service/get-service-categories";
import { getServiceDetail } from "~/actions/service/get-service-detail";
import { getServiceList } from "~/actions/service/get-service-list";
import { getServiceTypes } from "~/actions/service/get-service-types";
import { ServiceDetailProvider } from "~/contexts/service-detail-context";
import { RelatedServicesSection } from "~/features/service-detail/partials/related-services-section";
import { ServiceDetailSection } from "~/features/service-detail/partials/service-detail-section";
import { siteConfig } from "~/lib/site";
import { createCourseSchema, createBreadcrumbSchema } from "~/lib/json-ld";

import type { Route } from "./+types/service.$id";

export async function loader({ params }: Route.LoaderArgs) {
    if (!params.id) {
        throw new Response("Service ID is required", { status: 400 });
    }

    try {
        const [
            service,
            categories,
            types,
            presentersResponse,
            relatedServicesResponse,
        ] = await Promise.all([
            getServiceDetail(params.id),
            getServiceCategories(),
            getServiceTypes(),
            getMentors({ per_page: 100 }),
            Promise.all([
                getServiceList({ per_page: 10, status: "akan datang" }),
                getServiceList({ per_page: 10, status: "berlangsung" }),
            ]),
        ]);

        const relatedServices = [
            ...(relatedServicesResponse[0]?.data || []),
            ...(relatedServicesResponse[1]?.data || []),
        ];

        return {
            service,
            categories: categories.data || [],
            types: types.data || [],

            presenters: presentersResponse.data || [],
            relatedServices: relatedServices || [],
        };
    } catch (error) {
        console.error("Error in service detail loader:", error);

        if (error instanceof Response) {
            throw error;
        }
        throw new Response("Service not found", {
            status: 404,
            statusText: "The requested service could not be found",
        });
    }
}

export function meta({ data }: Route.MetaArgs) {
    const service = data?.service;
    
    if (!service) {
        return [
            { title: "Event Tidak Ditemukan - Dokter Spesial" },
            { name: "description", content: "Event yang Anda cari tidak ditemukan." },
        ];
    }

    const title = `${service.title} - Layanan Dokter Spesial`;
    const description = service.description 
        ? service.description.replace(/<[^>]*>/g, '').substring(0, 160)
        : `${service.title} - Program pelatihan medis berkelanjutan dari Dokter Spesial`;
    const url = `${siteConfig.url}/service/${service.slug}`;
    const image = service.image || `${siteConfig.url}${siteConfig.ogImage}`;
    
    // Build event-specific keywords
    const eventKeywords = [
        service.title,
        service.category || "",
        service.type || "event medis",
        service.status || "",
        "pelatihan dokter",
        "CME",
        "continuing medical education",
        ...siteConfig.keywords.slice(0, 5),
    ].filter(Boolean).join(", ");

    // Get price value
    const priceValue = typeof service.price === 'object' && service.price !== null 
        ? service.price.current 
        : typeof service.price === 'number' 
        ? service.price 
        : undefined;

    return [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: eventKeywords },
        
        // Open Graph
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        
        // Event specific meta
        { property: "event:start_time", content: service.startDate || "" },
        { property: "event:end_time", content: service.endDate || "" },
        
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
        
        // Additional
        { name: "robots", content: "index, follow" },
        { rel: "canonical", href: url },
        
        // JSON-LD structured data
        {
            "script:ld+json": createCourseSchema({
                course: {
                    name: service.title,
                    description: description,
                    url: `/service/${service.slug}`,
                    image: image,
                    price: priceValue,
                },
            }),
        },
        {
            "script:ld+json": createBreadcrumbSchema(siteConfig.url, [
                { name: "Home", url: "/" },
                { name: "Event", url: "/event" },
                { name: service.title, url: `/event/${service.slug}` },
            ]),
        },
    ];
}

export default function ServiceDetailPage() {
    const { service, categories, types, presenters, relatedServices } =
        useLoaderData<typeof loader>();

    return (
        <ServiceDetailProvider types={types} categories={categories}>
            <div className="flex flex-col">
                <ServiceDetailSection service={service} />
                <RelatedServicesSection
                    currentServiceSlug={service.slug}
                    relatedServices={relatedServices}
                />
            </div>
        </ServiceDetailProvider>
    );
}
