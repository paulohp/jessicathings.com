# Cloudflare Pages Deployment Guide

## 🚀 Deploy Jessica Things to Cloudflare Pages

This guide will help you deploy your migrated blog to Cloudflare Pages for fast, global delivery.

### 📋 Prerequisites

1. ✅ Cloudflare account (free tier available)
2. ✅ Domain (optional - Cloudflare provides a free subdomain)
3. ✅ Git repository with your project
4. ✅ Images migrated to Cloudinary

### 🔧 Configuration

The project is already configured for Cloudflare Pages with:

- **Astro Config**: Uses `@astrojs/cloudflare` adapter
- **Static Output**: Optimized for Pages hosting
- **Redirects**: Handles old `/blog/` URLs → root URLs
- **Headers**: Security and performance headers
- **Wrangler**: Local development and deployment tools

### 🚀 Deployment Options

#### Option 1: Git Integration (Recommended)

1. **Connect Repository**
   ```bash
   # Push your code to GitHub/GitLab
   git add .
   git commit -m "Ready for Cloudflare Pages deployment"
   git push origin main
   ```

2. **Cloudflare Dashboard Setup**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Pages** → **Create a project**
   - Select **Connect to Git**
   - Choose your repository

3. **Build Configuration**
   ```
   Build command: pnpm run build
   Build output directory: dist
   Node.js version: 18
   ```

4. **Environment Variables** (if needed)
   ```
   NODE_VERSION=18
   ```

#### Option 2: Direct Upload

1. **Build Locally**
   ```bash
   # Build the project
   pnpm run build
   
   # Preview locally (optional)
   pnpm run preview:cloudflare
   ```

2. **Deploy with Wrangler**
   ```bash
   # Login to Cloudflare
   npx wrangler login
   
   # Deploy
   pnpm run deploy
   ```

### 🔄 Custom Domain Setup

1. **Add Domain to Cloudflare**
   - Add `jessicathings.com` to your Cloudflare account
   - Update nameservers as instructed

2. **Configure Custom Domain**
   - In Pages dashboard, go to **Custom domains**
   - Add `jessicathings.com` and `www.jessicathings.com`
   - Enable **Always Use HTTPS**

3. **Update Site Configuration**
   ```typescript
   // astro.config.ts
   site: "https://jessicathings.com"
   ```

### 📊 Performance Features

Cloudflare Pages provides automatic:

- **Global CDN**: 200+ edge locations worldwide
- **Automatic HTTPS**: SSL certificates included
- **DDoS Protection**: Enterprise-grade security
- **Image Optimization**: When using Cloudflare Images
- **Analytics**: Page views and performance metrics

### 🔧 Local Development

```bash
# Development server
pnpm run dev

# Build and preview with Cloudflare
pnpm run build
pnpm run preview:cloudflare

# Deploy directly
pnpm run deploy
```

### 🌍 Expected URLs

After deployment:

- **Cloudflare Subdomain**: `https://jessicathings-com.pages.dev`
- **Custom Domain**: `https://jessicathings.com`
- **Post URLs**: `https://jessicathings.com/your-post-slug`
- **Assets**: Served via Cloudinary CDN

### 📈 Performance Benefits

**Before (WordPress):**
- Server response: ~800ms
- Image loading: Slow, unoptimized
- Global delivery: Single server location

**After (Cloudflare Pages + Cloudinary):**
- Page load: ~200ms
- Images: Optimized, responsive, global CDN
- Global delivery: 200+ edge locations

### 🔍 Monitoring

1. **Cloudflare Analytics**
   - Real-time visitor data
   - Performance metrics
   - Security insights

2. **Core Web Vitals**
   - Lighthouse scores
   - Page load times
   - User experience metrics

### 🚨 Troubleshooting

**Build Failures:**
```bash
# Check Node.js version
node --version  # Should be 18+

# Clear cache and rebuild
rm -rf node_modules dist
pnpm install
pnpm run build
```

**Redirect Issues:**
- Check `public/_redirects` file
- Verify old URLs redirect to new structure
- Test: `/blog/some-post` → `/some-post`

**Missing Images:**
- Ensure Cloudinary URLs are working
- Check URL replacement was successful
- Verify image paths in content

### 🎯 SEO Considerations

1. **Redirects**: Old `/blog/` URLs automatically redirect
2. **Sitemaps**: Astro generates sitemaps automatically
3. **Meta Tags**: Configured in layouts
4. **Performance**: Fast loading improves SEO ranking

### 💰 Cost Comparison

**WordPress Hosting:**
- Server: $20-50/month
- CDN: $10-20/month
- Images: Storage costs
- **Total**: $30-70/month

**Cloudflare Pages:**
- Hosting: Free (500 builds/month)
- CDN: Included
- Images: Cloudinary free tier
- **Total**: $0-10/month

### 🔄 Migration Checklist

- [ ] Code deployed to Git repository
- [ ] Images migrated to Cloudinary
- [ ] URLs replaced in content
- [ ] Cloudflare Pages configured
- [ ] Custom domain connected (optional)
- [ ] Redirects tested
- [ ] Performance verified
- [ ] DNS updated

Your blog is now ready for global, fast delivery via Cloudflare Pages! 🚀
