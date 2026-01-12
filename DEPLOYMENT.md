# Deployment Guide

This application can be deployed for free using several platforms. Here are the easiest options:

## Option 1: Vercel (Recommended) ⭐

**Easiest and fastest deployment**

1. Push your code to GitHub (if not already done)
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Vercel will auto-detect it's a Vite project
6. Click "Deploy"

**That's it!** Your app will be live in ~2 minutes.

### Environment Variables
If you're using AWS Bedrock (AI Assistant), add these in Vercel:
- `VITE_AWS_REGION`
- `VITE_AWS_ACCESS_KEY_ID`
- `VITE_AWS_SECRET_ACCESS_KEY`

Go to Project Settings → Environment Variables

---

## Option 2: Netlify

**Great alternative with drag-and-drop option**

### Method A: GitHub Integration
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Build settings are auto-detected from `netlify.toml`
6. Click "Deploy site"

### Method B: Drag & Drop (No GitHub needed)
1. Run `npm run build` locally
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag and drop your `dist` folder
4. Done!

---

## Option 3: GitHub Pages (Free, but requires extra setup)

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Update `vite.config.ts` with base path:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Select `gh-pages` branch
   - Save

---

## Option 4: Render (Free tier)

1. Push code to GitHub
2. Go to [render.com](https://render.com) and sign in
3. Click "New" → "Static Site"
4. Connect your repository
5. Set build command: `npm run build`
6. Set publish directory: `dist`
7. Click "Create Static Site"

---

## Comparison

| Platform | Setup Time | Auto Deploy | Custom Domain | Best For |
|----------|-----------|-------------|---------------|----------|
| **Vercel** | 2 min | ✅ | ✅ Free | Best overall |
| **Netlify** | 2 min | ✅ | ✅ Free | Great alternative |
| **GitHub Pages** | 5 min | ✅ | ⚠️ Paid | Already on GitHub |
| **Render** | 3 min | ✅ | ✅ Free | Good backup option |

---

## Recommended: Vercel

For this project, **Vercel** is the best choice because:
- Zero configuration needed
- Fastest deployment
- Automatic HTTPS
- Preview deployments for every commit
- Great for React/Vite apps
- Free forever for personal projects

## Build Command

All platforms use:
- **Build Command:** `npm run build` or `npm install && npm run build`
- **Output Directory:** `dist`
- **Node Version:** 18+ (specified in package.json if needed)

---

## Important Notes

### AI Assistant (AWS Bedrock)
If you're using the AI Assistant feature:
- You'll need to configure AWS credentials as environment variables
- Consider using AWS Lambda functions or API routes to keep credentials secure
- Never commit AWS credentials to your repository

### Router Configuration
The `vercel.json` and `netlify.toml` files handle client-side routing (React Router) correctly by redirecting all requests to `index.html`.

---

## Quick Start (Vercel)

```bash
# 1. Make sure code is in GitHub
git add .
git commit -m "Ready for deployment"
git push

# 2. Go to vercel.com, import project, done! 🎉
```

Your app will be live at `https://your-project.vercel.app`
