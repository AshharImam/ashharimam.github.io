# 🌐 Deploy to GitHub Pages

This guide shows you how to deploy your React + Vite portfolio to GitHub Pages.

## 🚀 Method 1: GitHub Actions (Recommended - Automatic)

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### Step 2: Push to GitHub

The workflow file (`.github/workflows/deploy-gh-pages.yml`) is already configured!

Just push your code:

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

### Step 3: Watch the Magic ✨

1. Go to **Actions** tab in your GitHub repo
2. Watch the workflow run
3. Once complete, your site will be live at:
   ```
   https://yourusername.github.io/Ashhar-Portfolio/
   ```

### Step 4: Update Base Path (Important!)

**If your repo name is NOT "Ashhar-Portfolio":**

Edit `vite.config.js` and update the base path:

```javascript
base: process.env.NODE_ENV === 'production'
  ? '/your-actual-repo-name/'  // ← Change this!
  : '/',
```

Or if deploying to root domain:

```javascript
base: '/',  // For custom domain
```

## 🔧 Method 2: Manual Deployment (Alternative)

### Option A: Using gh-pages Package

1. **Install gh-pages**:

   ```bash
   npm install --save-dev gh-pages
   ```

2. **Deploy**:

   ```bash
   npm run deploy:gh-pages
   ```

3. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Select **Deploy from a branch**
   - Choose **gh-pages** branch
   - Select **/ (root)** folder

### Option B: Manual Upload

1. **Build locally**:

   ```bash
   npm run build
   ```

2. **Push dist folder**:
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

## 📝 Configuration Files

### ✅ Already Created:

1. **`.github/workflows/deploy-gh-pages.yml`**

   - Automatic deployment on push
   - Builds and deploys to GitHub Pages

2. **`vite.config.js`**

   - Base path configured for GitHub Pages
   - Adjusts based on repo name

3. **`package.json`**
   - Added `deploy:gh-pages` script

## 🎯 Custom Domain Setup

### Step 1: Add CNAME File

Create `public/CNAME` file:

```
yourdomain.com
```

### Step 2: Update DNS

Add these DNS records:

```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153

Type: CNAME
Name: www
Value: yourusername.github.io
```

### Step 3: Update Vite Config

Change base path in `vite.config.js`:

```javascript
base: '/',  // Root domain
```

## 🔄 Update Workflow

The workflow automatically:

- ✅ Builds on every push to `main`
- ✅ Deploys to GitHub Pages
- ✅ Uses latest GitHub Actions
- ✅ Handles errors gracefully

## 🐛 Troubleshooting

### 404 Errors?

**Problem**: Routes show 404 on refresh

**Solution**: Update `vite.config.js` base path:

```javascript
base: '/your-repo-name/',  // Must match your repo name
```

### Assets Not Loading?

**Problem**: Images/CSS not loading

**Solution**:

1. Check base path in `vite.config.js`
2. Ensure assets are in `public/` folder
3. Use absolute paths: `/assets/image.png` not `./assets/image.png`

### Build Fails?

**Problem**: GitHub Actions workflow fails

**Solution**:

1. Check Actions tab for error logs
2. Ensure `package.json` has correct scripts
3. Verify Node.js version (18+) in workflow

### Wrong URL?

**Problem**: Site shows wrong URL

**Solution**:

- GitHub Pages URL format: `https://username.github.io/repo-name/`
- Update base path in `vite.config.js` to match repo name

## 📊 Both Vercel + GitHub Pages

You can deploy to **both** platforms:

### Vercel (Primary)

- Custom domain support
- Better performance
- Auto-deploy from GitHub

### GitHub Pages (Backup)

- Free hosting
- GitHub integration
- Good for open source

**No conflicts!** They deploy independently.

## ✅ Deployment Checklist

- [ ] Repository name matches base path in `vite.config.js`
- [ ] GitHub Pages enabled (Settings → Pages → GitHub Actions)
- [ ] Workflow file exists (`.github/workflows/deploy-gh-pages.yml`)
- [ ] Pushed code to GitHub
- [ ] Checked Actions tab for deployment status
- [ ] Tested deployed site
- [ ] Updated README with live URL

## 🎉 You're Live!

Your portfolio is now available at:

```
https://yourusername.github.io/Ashhar-Portfolio/
```

## 📚 Quick Commands

```bash
# Build locally
npm run build

# Preview build
npm run preview

# Deploy to GitHub Pages (manual)
npm run deploy:gh-pages

# Check deployment status
# Go to: GitHub → Actions tab
```

## 🔗 Useful Links

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

**Happy Deploying! 🚀**
