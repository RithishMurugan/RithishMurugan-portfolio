# ⚡ Quick Vercel Deployment

## Fastest Way to Deploy

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Ready for Vercel"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository
5. Click **"Import"**

### Step 3: Add Environment Variables

**Before deploying**, click **"Environment Variables"** and add:

```
NEXT_PUBLIC_SUPABASE_URL = https://wwxhnyyycvprfmsfclgz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3eGhueXl5Y3ZwcmZtc2ZjbGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMDg3ODIsImV4cCI6MjA3ODY4NDc4Mn0._4OEG5wWMUQz40z7y7_IYQLQQRAmzVgLTsLNjnr9SHc
```

**Important:** Select all environments (Production, Preview, Development)

### Step 4: Deploy!

Click **"Deploy"** and wait 1-3 minutes. Your site will be live! 🎉

---

**For detailed instructions, see `VERCEL_DEPLOYMENT.md`**

