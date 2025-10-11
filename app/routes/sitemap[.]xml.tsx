export async function loader() {
  const baseUrl = "https://dokterspesial.id";
  const currentDate = new Date().toISOString().split("T")[0];

  // Static pages
  const staticPages = [
    { url: "/", changefreq: "daily", priority: "1.0" },
    { url: "/event", changefreq: "weekly", priority: "0.8" },
    { url: "/blog", changefreq: "daily", priority: "0.8" },
    { url: "/our-brand", changefreq: "monthly", priority: "0.7" },
    { url: "/kontak", changefreq: "monthly", priority: "0.5" },
  ];

  // TODO: Fetch dynamic pages (blogs, services, etc.) from your API
  // Example:
  // const blogs = await getBlogList({ per_page: 100 });
  // const services = await getServiceList({ per_page: 100 });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${staticPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
