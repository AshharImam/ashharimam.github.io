# 🚀 Deployment Guide

## Deploy to Vercel (Recommended)

### Option 1: Vercel CLI (Fastest)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

### Option 2: GitHub Integration (Recommended for Auto-Deploy)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import Project in Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"

3. **Auto-Deploy**: Every push to `main` branch auto-deploys!

### Option 3: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from Git or upload `dist` folder
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click "Deploy"

## 📋 Vercel Configuration

The `vercel.json` file is already configured with:
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ SPA routing (all routes → index.html)
- ✅ Cache headers for assets
- ✅ Framework detection: Vite

## 🔧 Environment Variables (if needed)

If you need environment variables:

1. **In Vercel Dashboard**:
   - Go to Project Settings → Environment Variables
   - Add variables (e.g., `VITE_API_URL`)

2. **In Code**:
   ```javascript
   const apiUrl = import.meta.env.VITE_API_URL
   ```

## 🌐 Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS instructions
4. Vercel handles SSL automatically!

## 📊 Performance

Vercel automatically:
- ✅ CDN distribution worldwide
- ✅ Edge caching
- ✅ Automatic HTTPS
- ✅ Image optimization
- ✅ Analytics (if enabled)

## 🔄 Continuous Deployment

After initial setup:
- Every `git push` → Auto-deploy
- Preview deployments for PRs
- Instant rollbacks

## 🐛 Troubleshooting

### Build Fails?
- Check build logs in Vercel dashboard
- Ensure `package.json` has correct scripts
- Verify `vite.config.js` is correct

### 404 Errors?
- Check `vercel.json` rewrites are correct
- Ensure SPA routing is configured

### Assets Not Loading?
- Check paths use `/assets/` not `./assets/`
- Verify files are in `public/` folder

## 📈 Analytics

Enable Vercel Analytics:
1. Project Settings → Analytics
2. Enable Web Analytics
3. Get insights on performance!

## ✅ Deployment Checklist

- [ ] Delete unnecessary files (see CLEANUP-GUIDE.md)
- [ ] Rename `index-react.html` to `index.html`
- [ ] Test locally: `npm run build`
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Test deployed site
- [ ] Add custom domain (optional)
- [ ] Enable analytics (optional)

## 🎉 You're Live!

Your portfolio is now live on Vercel! 🚀

