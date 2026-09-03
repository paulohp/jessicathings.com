import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
	if (!site) {
		throw new Error("Site URL is not configured in astro.config.ts");
	}

	const robotsTxt = `User-agent: *
Allow: /

# Disallow admin areas
Disallow: /admin/
Disallow: /_astro/
Disallow: /api/

# Allow important pages
Allow: /categories
Allow: /tags
Allow: /category/
Allow: /tag/

# Crawl delay (optional)
Crawl-delay: 1

# Allow Google's ad crawler to serve relevant ads
User-agent: Mediapartners-Google
Disallow:

# Sitemap
Sitemap: ${new URL("/sitemap.xml", site).toString()}`;

	return new Response(robotsTxt, {
		headers: {
			"Content-Type": "text/plain",
			"Cache-Control": "public, max-age=86400",
		},
	});
};
