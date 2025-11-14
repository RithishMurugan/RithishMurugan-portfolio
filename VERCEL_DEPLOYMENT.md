# 🚀 Vercel Deployment Guide

This guide will walk you through deploying your Next.js portfolio to Vercel.

## Prerequisites

1. A GitHub account (or GitLab/Bitbucket)
2. A Vercel account (free tier works perfectly)
3. Your code pushed to a Git repository

## Step 1: Prepare Your Repository

### 1.1 Initialize Git (if not already done)

```bash
git init
git add .
git commit -m "Ready for Vercel deployment"
```

### 1.2 Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it something like `rithish-portfolio` or `portfolio`
3. **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Copy the repository URL

### 1.3 Push Your Code to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push your code
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit [https://vercel.com](https://vercel.com)
   - Sign up or log in (you can use GitHub to sign in)

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset:** Next.js (should auto-detect)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add the following:
     ```
     NEXT_PUBLIC_SUPABASE_URL = https://wwxhnyyycvprfmsfclgz.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3eGhueXl5Y3ZwcmZtc2ZjbGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMDg3ODIsImV4cCI6MjA3ODY4NDc4Mn0._4OEG5wWMUQz40z7y7_IYQLQQRAmzVgLTsLNjnr9SHc
     ```
   - Make sure to select all environments (Production, Preview, Development)

5. **Deploy**
   - Click "Deploy"
   - Wait 1-3 minutes for deployment
   - Your site will be live!

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - When asked about environment variables, add them or set them later in dashboard

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Step 3: Customize Your Domain (Optional)

1. Go to your project dashboard on Vercel
2. Click "Settings" → "Domains"
3. Click "Add Domain"
4. Enter your domain name (e.g., `rithishmurugan.com`)
5. Follow the DNS configuration instructions

## Step 4: Continuous Deployment

Vercel automatically deploys when you push to your main branch:
- Every time you push code to GitHub, Vercel will rebuild and redeploy
- You can see deployment status in the Vercel dashboard
- Preview deployments are created for pull requests

## Troubleshooting

### Build Fails

1. **Check Build Logs**
   - Go to your project dashboard → "Deployments" → Click on the failed deploy
   - Check the build logs for errors

2. **Common Issues:**
   - **Missing dependencies:** Make sure `package.json` has all dependencies
   - **Environment variables:** Ensure all `NEXT_PUBLIC_*` variables are set in Vercel
   - **Node version:** Vercel automatically uses the correct Node version for Next.js

### Environment Variables Not Working

1. Go to Project settings → Environment Variables
2. Make sure variables are set for the correct environments
3. Redeploy after adding/changing variables

### Contact Form Not Working

1. Make sure you've run the SQL script in Supabase (see `supabase-setup.sql`)
2. Verify environment variables are set correctly in Vercel
3. Check browser console for errors

## Important Notes

- **Never commit `.env.local`** - It's in `.gitignore` for security
- **Environment variables** must be set in Vercel dashboard, not in code
- **Supabase RLS policies** must be configured (see `supabase-setup.sql`)
- Your site will rebuild automatically on every Git push
- **Vercel is optimized for Next.js** - No special configuration needed!

## Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Environment variables added in Vercel
- [ ] Build successful
- [ ] Site is live and accessible
- [ ] Contact form tested and working
- [ ] Custom domain configured (optional)

## Support

If you encounter issues:
1. Check Vercel build logs
2. Verify environment variables are set
3. Ensure Supabase database is set up correctly
4. Check browser console for client-side errors

## Why Vercel?

- ✅ **Built by Next.js creators** - Perfect integration
- ✅ **Zero configuration** - Auto-detects Next.js
- ✅ **Automatic HTTPS** - Free SSL certificates
- ✅ **Global CDN** - Fast loading worldwide
- ✅ **Preview deployments** - Test before production
- ✅ **Free tier** - Great for portfolios

---

**Your portfolio is ready to deploy!** 🎉

