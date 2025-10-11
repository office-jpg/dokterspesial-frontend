export async function loader() {
  const baseUrl = "https://dokterspesial.id";

  const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin or private pages
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/
Disallow: /*.json$

# Allow important pages
Allow: /
Allow: /event
Allow: /blog
Allow: /our-brand
Allow: /kontak

# Crawl-delay
Crawl-delay: 10`;

  return new Response(robots, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
