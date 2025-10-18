import { useLoaderData } from "react-router";

import { getServiceCategories } from "~/actions/service/get-service-categories";
import { getServiceList } from "~/actions/service/get-service-list";
import { getServiceSpesialists } from "~/actions/service/get-service-spesialists";
import { getServiceTypes } from "~/actions/service/get-service-types";
import { ScheduleInfoSection } from "~/features/product/partials/schedule-info-section";
import { ServiceSection } from "~/features/service/partials/service-section";
import { createBreadcrumbSchema, createServiceListSchema } from "~/lib/json-ld";
import { siteConfig } from "~/lib/site";

import type { Route } from "./+types/service";

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("search") || "";
    const page = parseInt(url.searchParams.get("page") || "1");
    const statusFilter = url.searchParams.getAll("status");
    const typeFilter = url.searchParams.getAll("type");
    const categoryFilter = url.searchParams.getAll("category");
    const spesialistFilter = url.searchParams.getAll("spesialist");

    const defaultStatuses =
        statusFilter.length > 0 ? statusFilter : ["berlangsung", "akan datang"];
    const statusString = defaultStatuses.join(",");
    const spesialistString =
        spesialistFilter.length > 0 ? spesialistFilter.join(",") : "";
    const typeString = typeFilter.length > 0 ? typeFilter.join(",") : "";
    const categoryString =
        categoryFilter.length > 0 ? categoryFilter.join(",") : "";

    const [serviceList, serviceTypes, serviceCategories, serviceSpesialists] =
        await Promise.all([
            getServiceList({
                search: searchTerm,
                status: statusString,
                page,
                per_page: 6,
                spesialist_slug: spesialistString,
                type_slug: typeString,
                category_slug: categoryString,
            }),
            getServiceTypes(),
            getServiceCategories(),
            getServiceSpesialists(),
        ]);

    return {
        serviceList,
        serviceTypes,
        serviceCategories,
        serviceSpesialists,
        searchTerm,
        page,
        statusFilter: defaultStatuses,
        spesialistFilter,
        typeFilter,
        categoryFilter,
    };
}

export function meta({ data }: Route.MetaArgs) {
    const title = "Event - Dokter Spesial";
    const description =
        "Temukan berbagai program pelatihan medis berkelanjutan: webinar, workshop, dan event untuk dokter spesialis. Kategori: Basic Pain, Bedah Series, Cardiac, Endodontics, Orthodontics, Periodontics, dan lebih banyak lagi.";
    const url = `${siteConfig.url}/service`;
    const ogImage = `${siteConfig.url}${siteConfig.ogImage}`;

    const specializations = [
        "Basic Pain",
        "Bedah Series",
        "Blind Injection",
        "C-Arm Guided",
        "Cardiac",
        "Dry Needling",
        "Endodontics",
        "Facial Nerve Pain",
        "Ginekologi",
        "Orthodontics",
        "Orthopedi",
        "Pediatri",
        "Periodontics",
        "Platelet-Rich Plasma",
        "Prolotherapy",
        "USG Interventional Pain Management",
        "Urologi",
    ];

    const keywords = [
        ...siteConfig.keywords.slice(0, 8),
        "webinar medis",
        "workshop dokter",
        "event pelatihan",
        "pelatihan dokter spesialis",
        ...specializations.slice(0, 8),
    ].join(", ");

    return [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: keywords },

        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: ogImage },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogImage },

        { name: "robots", content: "index, follow" },
        { rel: "canonical", href: url },

        {
            "script:ld+json": createServiceListSchema({
                services:
                    data?.serviceList?.data?.map((service: any) => ({
                        name: service.title,
                        description: service.description,
                        slug: service.slug,
                    })) || [],
            }),
        },
        {
            "script:ld+json": createBreadcrumbSchema(siteConfig.url, [
                { name: "Home", url: "/" },
                { name: "Event", url: "/event" },
            ]),
        },
    ];
}

export default function ServicePage() {
    const {
        serviceList,
        serviceTypes,
        serviceCategories,
        serviceSpesialists,
        searchTerm,
        statusFilter,
        spesialistFilter,
        typeFilter,
        categoryFilter,
    } = useLoaderData<typeof loader>();

    return (
        <>
            <ServiceSection
                serviceList={serviceList}
                serviceTypes={serviceTypes}
                serviceCategories={serviceCategories}
                serviceSpesialists={serviceSpesialists}
                searchTerm={searchTerm}
                statusFilter={statusFilter}
                spesialistFilter={spesialistFilter}
                typeFilter={typeFilter}
                categoryFilter={categoryFilter}
            />
            <ScheduleInfoSection />
        </>
    );
}
