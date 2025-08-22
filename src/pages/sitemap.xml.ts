import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error('Site URL is not configured in astro.config.ts');
  }

  const posts = await getCollection('blog');
  
  // Generate URLs for all posts
  const postUrls = posts.map((post) => ({
    url: new URL(post.slug, site).toString(),
    lastmod: new Date(post.data.date).toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.8'
  }));

  // Extract categories for category pages
  const categoryMap = new Map<string, Date>();
  posts.forEach(post => {
    if (post.data.categories) {
      post.data.categories.forEach(category => {
        const existingDate = categoryMap.get(category);
        const postDate = new Date(post.data.date);
        if (!existingDate || postDate > existingDate) {
          categoryMap.set(category, postDate);
        }
      });
    }
  });

  const categoryUrls = Array.from(categoryMap.entries()).map(([categoryName, lastDate]) => {
    const categorySlug = categoryName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    
    return {
      url: new URL(`/category/${categorySlug}`, site).toString(),
      lastmod: lastDate.toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.7'
    };
  });

  // Extract tags for tag pages
  const tagMap = new Map<string, Date>();
  posts.forEach(post => {
    if (post.data.tags && Array.isArray(post.data.tags)) {
      post.data.tags.forEach(tag => {
        if (tag && tag.trim()) {
          const existingDate = tagMap.get(tag);
          const postDate = new Date(post.data.date);
          if (!existingDate || postDate > existingDate) {
            tagMap.set(tag, postDate);
          }
        }
      });
    }
  });

  const tagUrls = Array.from(tagMap.entries()).map(([tagName, lastDate]) => {
    const tagSlug = tagName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    
    return {
      url: new URL(`/tag/${tagSlug}`, site).toString(),
      lastmod: lastDate.toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.6'
    };
  });

  // Static pages
  const staticPages = [
    {
      url: site.toString(),
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      url: new URL('/categories', site).toString(),
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: new URL('/tags', site).toString(),
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.9'
    }
  ];

  // Combine all URLs
  const allUrls = [...staticPages, ...postUrls, ...categoryUrls, ...tagUrls];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(({ url, lastmod, changefreq, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
