# Deployment Guide for The Archimedes Fund

## Quick Deploy Options (Ranked by Ease)

### 🥇 Option 1: Netlify (Easiest - Recommended)

#### Method A: Drag & Drop (5 minutes)
1. **Build your app**:
   ```bash
   npm run build
   ```

2. **Create Netlify account**: Go to [netlify.com](https://netlify.com) and sign up

3. **Deploy**:
   - Click "Add new site" → "Deploy manually"
   - Drag the `dist` folder to the upload area
   - Done! Your site is live at `https://random-name-12345.netlify.app`

4. **Custom domain** (optional):
   - Go to Site settings → Domain management
   - Add your custom domain

#### Method B: Git Integration (Best for continuous deployment)
1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/archimedes-fund.git
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Log in to Netlify
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Build settings (auto-detected):
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Automatic deployments**: Every time you push to GitHub, Netlify rebuilds automatically!

**Netlify Features**:
- ✅ Free SSL/HTTPS
- ✅ Custom domains
- ✅ Forms (for your Apply page!)
- ✅ 100GB bandwidth/month (free tier)

---

### 🥈 Option 2: Vercel (Also Super Easy)

1. **Push code to GitHub** (if not already done)

2. **Deploy with Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "Add New" → "Project"
   - Import your repository
   - Vercel auto-detects Vite configuration
   - Click "Deploy"

3. **Done!** Your site is live at `https://your-project.vercel.app`

**Vercel Features**:
- ✅ Zero-config deployment
- ✅ Automatic HTTPS
- ✅ Edge network (super fast globally)
- ✅ Free for personal projects

---

### 🥉 Option 3: GitHub Pages (Completely Free)

1. **Update `vite.config.js`**:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/archimedes-fund/', // Replace with your repo name
   })
   ```

2. **Build and deploy**:
   ```bash
   npm run build
   cd dist
   git init
   git checkout -b gh-pages
   git add -A
   git commit -m 'deploy'
   git push -f https://github.com/yourusername/archimedes-fund.git gh-pages
   ```

3. **Enable GitHub Pages**:
   - Go to your repo → Settings → Pages
   - Source: Deploy from branch `gh-pages`
   - Save

4. **Your site**: `https://yourusername.github.io/archimedes-fund/`

---

## 🚀 Other Easy Options

### **Render**
- [render.com](https://render.com)
- Free tier available
- Auto-deploys from Git

### **Railway**
- [railway.app](https://railway.app)
- $5 free credit/month
- Great for full-stack apps

### **Cloudflare Pages**
- [pages.cloudflare.com](https://pages.cloudflare.com)
- Free, unlimited bandwidth
- Super fast CDN

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] All images are optimized
- [ ] Environment variables are set (if any)
- [ ] Build works locally: `npm run build`
- [ ] Preview the build: `npm run preview`
- [ ] Update contact emails and links
- [ ] Test on mobile devices
- [ ] Add favicon (optional)
- [ ] Set up Google Analytics (optional)

---

## 🔧 Build Commands Reference

For all platforms, use these settings:

- **Build Command**: `npm run build` or `npm install && npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x or higher

---

## 💡 My Recommendation

**For you, I recommend Netlify Method B (Git Integration)** because:
1. ✅ Easiest to set up and maintain
2. ✅ Automatic deployments on every push
3. ✅ Built-in form handling for your Apply page
4. ✅ Free SSL and custom domains
5. ✅ Generous free tier

**Steps to deploy RIGHT NOW**:
```bash
# 1. Build to test
npm run build

# 2. Push to GitHub (if not already)
git init
git add .
git commit -m "Ready for deployment"
# Create a repo on GitHub first, then:
git remote add origin https://github.com/yourusername/archimedes-fund.git
git push -u origin main

# 3. Go to netlify.com, sign up, and import your GitHub repo
# That's it! Your site will be live in 2 minutes.
```

---

## 🌐 Custom Domain Setup

Once deployed, to add a custom domain like `archimedesfund.org`:

1. **Buy domain** from Namecheap, Google Domains, etc.
2. **On Netlify/Vercel**:
   - Add custom domain in settings
3. **Update DNS records**:
   - Point A record to hosting provider's IP
   - Or use CNAME record
4. **Wait 24-48 hours** for DNS propagation

---

## 🔒 Security & Performance

After deployment:
- ✅ HTTPS is automatic on all platforms
- ✅ Use Lighthouse in Chrome DevTools to check performance
- ✅ Consider adding a CDN (Cloudflare is free)

---

## 📱 Next Steps After Deployment

1. **Connect form to backend** (Apply page)
2. **Set up analytics** (Google Analytics, Plausible)
3. **Add SEO meta tags**
4. **Test thoroughly** on different devices
5. **Share with your network!**

Need help with any of these? Just ask!

