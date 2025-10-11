import { getBrands } from "~/actions/mentor/get-brands";
import { getMentors } from "~/actions/mentor/get-mentors";
import { DDBrandSection } from "~/features/brand/partials/dd-brand-section";
import { DDMentorSection } from "~/features/brand/partials/dd-mentor-section";
import { GPABrandSection } from "~/features/brand/partials/gpa-brand-section";
import { GPAMentorSection } from "~/features/brand/partials/gpa-mentor-section";
import { siteConfig } from "~/lib/site";
import { createBreadcrumbSchema } from "~/lib/json-ld";

import type { Route } from "./+types/brand";

export function meta({}: Route.MetaArgs) {
    const title = "Brand Partner - Global Pain Academy & Dokter Dentist | Mentor Expert";
    const description = "Kenali brand partner kami: Global Pain Academy untuk spesialis manajemen nyeri dan Dokter Dentist untuk profesional kedokteran gigi. Program pelatihan medis tingkat lanjut dengan mentor expert berpengalaman.";
    const url = `${siteConfig.url}/brand`;
    const ogImage = `${siteConfig.url}${siteConfig.ogImage}`;

    return [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: `mentor global pain academy, mentor dokter dentist, global pain academy, dokter dentist, brand partner, mentor expert, pelatihan nyeri, kedokteran gigi, pain management specialist, dental specialist mentor, ${siteConfig.keywords.slice(0, 5).join(", ")}` },
        
        // Open Graph
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: ogImage },
        
        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogImage },
        
        // Additional
        { name: "robots", content: "index, follow" },
        { rel: "canonical", href: url },
        
        // JSON-LD
        {
            "script:ld+json": createBreadcrumbSchema(siteConfig.url, [
                { name: "Home", url: "/" },
                { name: "Brand Partner", url: "/our-brand" },
            ]),
        },
        
        // Preload brand images
        {
            tagName: "link",
            rel: "preload",
            href: "/images/brand/dd-1.webp",
            as: "image",
        },
        {
            tagName: "link",
            rel: "preload",
            href: "/images/brand/dd-2.webp",
            as: "image",
        },
        {
            tagName: "link",
            rel: "preload",
            href: "/images/brand/dd-3.webp",
            as: "image",
        },
        {
            tagName: "link",
            rel: "preload",
            href: "/images/brand/gpa-1.webp",
            as: "image",
        },
        {
            tagName: "link",
            rel: "preload",
            href: "/images/brand/gpa-2.webp",
            as: "image",
        },
        {
            tagName: "link",
            rel: "preload",
            href: "/images/brand/gpa-3.webp",
            as: "image",
        },
    ];
}

export async function loader({ request }: Route.LoaderArgs) {
    try {
        const url = new URL(request.url);
        const searchParams = url.searchParams;

        const search = searchParams.get("search") || undefined;
        const brand = searchParams.get("brand") || undefined;

        const brands = await getBrands();

        const defaultBrand = brand || "dokter-dentist";

        const mentorsByBrand: Record<string, any[]> = {};
        const paginationByBrand: Record<string, any> = {};

        for (const brandItem of brands) {
            try {
                mentorsByBrand[brandItem.slug] = [];
                let allMentorsForBrand: any[] = [];
                let lastPagination: any = null;

                for (let page = 1; page <= 2; page++) {
                    const response = await getMentors({
                        per_page: 6,
                        page: page,
                        brand_slug: brandItem.slug,
                        search: search, // Include search if provided
                    });

                    if (response.success && response.data.length > 0) {
                        const filteredMentors = response.data.filter((mentor) =>
                            mentor.brands?.some(
                                (brand) => brand.slug === brandItem.slug
                            )
                        );

                        allMentorsForBrand = [
                            ...allMentorsForBrand,
                            ...filteredMentors,
                        ];
                        lastPagination = response.pagination;

                        if (!response.pagination.has_more_pages) {
                            break;
                        }
                    } else {
                        break;
                    }
                }

                mentorsByBrand[brandItem.slug] = allMentorsForBrand;

                if (lastPagination) {
                    paginationByBrand[brandItem.slug] = {
                        ...lastPagination,

                        current_page: Math.min(2, lastPagination.last_page),
                    };
                } else {
                    paginationByBrand[brandItem.slug] = null;
                }
            } catch (error) {
                console.error(
                    `SSR: Error loading mentors for ${brandItem.slug}:`,
                    error
                );
                mentorsByBrand[brandItem.slug] = [];
                paginationByBrand[brandItem.slug] = null;
            }
        }

        return {
            brands,
            mentorsByBrand,
            paginationByBrand,
            selectedBrand: defaultBrand,
            searchQuery: search || "",
            initialSearch: search || "",
            initialBrand: defaultBrand,
        };
    } catch (error) {
        console.error("Error loading mentor page data:", error);
        return {
            brands: [],
            mentorsByBrand: {},
            paginationByBrand: {},
            selectedBrand: "dokter-dentist",
            searchQuery: "",
            initialSearch: "",
            initialBrand: "dokter-dentist",
        };
    }
}

export default function BrandPage({ loaderData }: Route.ComponentProps) {
    return (
        <>
            <GPABrandSection loaderData={loaderData} />
            <GPAMentorSection loaderData={loaderData} />
            <DDBrandSection loaderData={loaderData} />
            <DDMentorSection loaderData={loaderData} />
        </>
    );
}
