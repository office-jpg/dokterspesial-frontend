import ContactSection from "~/features/contact/partials/contact-section";
import FAQSection from "~/features/home/partials/faq-section";
import { siteConfig } from "~/lib/site";
import { createBreadcrumbSchema } from "~/lib/json-ld";

import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    const title = `Kontak Kami - ${siteConfig.name}`;
    const description = `Hubungi tim ${siteConfig.name} untuk konsultasi pelatihan medis, informasi program CME, dan layanan untuk dokter spesialis. Email: ${siteConfig.email} | Phone: ${siteConfig.phone}`;
    const url = `${siteConfig.url}/contact`;
    const ogImage = `${siteConfig.url}${siteConfig.ogImage}`;

    return [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: `kontak ${siteConfig.name}, hubungi kami, customer service, ${siteConfig.keywords.slice(0, 5).join(", ")}` },
        
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
                { name: "Kontak Kami", url: "/kontak" },
            ]),
        },
    ];
}

export default function ContactPage() {
    return (
        <>
            <FAQSection />
            <ContactSection />
        </>
    );
}
