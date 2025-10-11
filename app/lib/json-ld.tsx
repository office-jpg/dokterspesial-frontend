/**
 * JSON-LD Schemas for Dokter Spesial
 * React Router implementation
 */

import { siteConfig } from "./site";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface ServiceItem {
  name: string;
  description?: string;
  slug?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ArticleData {
  title: string;
  description: string;
  author: string;
  publishedTime: string;
  url: string;
  image: string;
}

interface CourseData {
  name: string;
  description: string;
  url: string;
  image: string;
  price?: number;
}

interface SchemaParams {
  siteUrl?: string;
  services?: ServiceItem[];
  faqs?: FAQItem[];
  article?: ArticleData;
  course?: CourseData;
}

export function createOrganizationSchema(siteUrl: string = siteConfig.url) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteConfig.name,
    alternateName: "Dokter Spesial Indonesia",
    url: siteUrl,
    logo: `${siteUrl}${siteConfig.logo}`,
    image: `${siteUrl}${siteConfig.ogImage}`,
    sameAs: [
      siteConfig.links.instagram,
      siteConfig.links.twitter,
      siteConfig.links.tiktok,
      `${siteUrl}/event`,
      `${siteUrl}/blog`,
      `${siteUrl}/our-brand`,
      `${siteUrl}/kontak`,
    ],
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.locality,
      addressCountry: siteConfig.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      availableLanguage: ["id"],
      areaServed: "ID",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "2000",
    },
  };
}

export function createWebsiteSchema(siteUrl: string = siteConfig.url) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteUrl,
    description: siteConfig.description,
    inLanguage: "id-ID",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${siteConfig.logo}`,
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "SiteNavigationElement",
          position: 1,
          name: "Blog & Artikel",
          description: "Temukan artikel terbaru tentang perkembangan medis, tips publikasi dan riset kesehatan",
          url: `${siteUrl}/blog`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 2,
          name: "Event & Pelatihan",
          description: "Jelajahi berbagai program pelatihan medis dan event untuk dokter spesialis",
          url: `${siteUrl}/event`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 3,
          name: "Kontak Kami",
          description: "Hubungi tim Dokter Spesial untuk konsultasi dan informasi lebih lanjut",
          url: `${siteUrl}/kontak`,
        },
        {
          "@type": "SiteNavigationElement",
          position: 4,
          name: "Brand Partner",
          description: "Kenali mitra dan brand partner kami dalam dunia kedokteran",
          url: `${siteUrl}/our-brand`,
        },
      ],
    },
  };
}

export function createServiceListSchema({
  siteUrl = siteConfig.url,
  services = [],
}: SchemaParams) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service: ServiceItem, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        name: service.name,
        description:
          service.description ||
          `Layanan ${service.name} dari ${siteConfig.name} untuk profesional medis dan tenaga kesehatan.`,
        url: service.slug
          ? `${siteUrl}/event/${service.slug}`
          : `${siteUrl}/event`,
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteUrl,
        },
        areaServed: {
          "@type": "Country",
          name: "Indonesia",
        },
        availableChannel: {
          "@type": "ServiceChannel",
          serviceLocation: {
            "@type": "Place",
            name: "Online & Hybrid",
          },
          availableLanguage: ["id"],
        },
        audience: {
          "@type": "Audience",
          audienceType: "Dokter, Tenaga Medis & Profesional Kesehatan",
        },
        educationalLevel: "Professional",
        courseMode: "blended",
      },
    })),
  };
}

export function createFAQSchema({ faqs = [] }: { faqs: FAQItem[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function createArticleSchema({
  siteUrl = siteConfig.url,
  article,
}: SchemaParams) {
  if (!article) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${siteUrl}${article.url}`,
    image: article.image.startsWith("http")
      ? article.image
      : `${siteUrl}${article.image}`,
    datePublished: article.publishedTime,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${siteConfig.logo}`,
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}${article.url}`,
    },
    isPartOf: {
      "@type": "Blog",
      "@id": `${siteUrl}/blog`,
      name: `${siteConfig.name} Blog`,
    },
  };
}

export function createCourseSchema({
  siteUrl = siteConfig.url,
  course,
}: SchemaParams) {
  if (!course) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    url: `${siteUrl}${course.url}`,
    image: course.image.startsWith("http")
      ? course.image
      : `${siteUrl}${course.image}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${siteConfig.logo}`,
      },
    },
    educationalLevel: "Professional",
    courseMode: "blended",
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    availableLanguage: "id",
    ...(course.price && {
      offers: {
        "@type": "Offer",
        price: course.price,
        priceCurrency: "IDR",
        availability: "https://schema.org/InStock",
      },
    }),
  };
}

export function createBreadcrumbSchema(
  siteUrl: string = siteConfig.url,
  breadcrumbs: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

export function createSitelinkSearchBoxSchema(
  siteUrl: string = siteConfig.url
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
