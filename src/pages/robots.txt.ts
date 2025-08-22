import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    throw new Error('Site URL is not configured in astro.config.ts');
  }

  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${new URL('/sitemap.xml', site).toString()}

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
Crawl-delay: 1`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400'
    }
  });
};
