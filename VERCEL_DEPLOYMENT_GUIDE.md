# Vercel Deployment Guide — AV Corporate giftings & events

This project is fully configured and ready for 1-click deployment on [Vercel](https://vercel.com).

---

## 🚀 Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete AV Corporate giftings & events B2B portal"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your repository and click **Import**.
   - Vercel automatically detects **Vite** as the framework.
   - Settings are pre-configured:
     - **Build Command**: `npm run build` (`tsc -b && vite build`)
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

3. **(Optional) Configure Environment Variables on Vercel**:
   If connecting to your live Supabase backend for multi-device quotation synchronization:
   - Go to **Project Settings → Environment Variables** on Vercel.
   - Add:
     - `VITE_SUPABASE_URL`: `https://your-project.supabase.co`
     - `VITE_SUPABASE_ANON_KEY`: `your-anon-key-here`
   *(If omitted, the site automatically operates in offline fallback mode with local storage persistence).*

4. **Click Deploy**:
   Your site will be live on an ultra-fast global Edge CDN with SSL enabled within 30 seconds!

---

## ⚡ Option 2: Deploy directly via Vercel CLI

From this directory in your terminal:

```bash
# 1. Install or run Vercel CLI
npx vercel

# 2. Follow prompts to link/create project
# When ready for production:
npx vercel --prod
```

---

## 🛠️ Included Production Configurations

- **[`vercel.json`](file:///c:/Users/SEBIN/Desktop/AV/vercel.json)**:
  - **SPA Rewrites**: Maps all routes (`/products`, `/about`, `/contact`, `/solutions`, `/branding`, `/admin`, `/category/:slug`, `/product/:slug`) to `/index.html` to prevent 404 errors on browser refresh.
  - **Edge CDN Asset Caching**: 1-year immutable cache (`public, max-age=31536000, immutable`) for WebP hero frames, catalog photos, and bundled assets.
  - **HTTP Security Headers**: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection`, and `Referrer-Policy`.
- **[`vite.config.ts`](file:///c:/Users/SEBIN/Desktop/AV/vite.config.ts)**:
  - Optimized vendor code-splitting (`vendor-react`, `vendor-utils`, dynamic `jspdf` chunking).
- **TypeScript**: `tsc -b` and `tsc --noEmit` pass with 0 errors.
- **Automated Tests**: 47/47 tests pass.
