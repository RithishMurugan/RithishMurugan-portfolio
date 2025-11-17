# Fixing "No API key found in request" Error

## What This Error Means

This error occurs when Supabase receives a request but cannot find the API key in the request headers. This typically means:

1. **Environment variables are not set in Vercel** (most common)
2. **Environment variables are set but the app wasn't redeployed**
3. **The API key is not being sent in the request headers**

## Quick Fix

### Step 1: Verify Environment Variables in Vercel

1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Click on your project: **RithishMurugan-portfolio**
3. Go to **Settings** → **Environment Variables**
4. Verify these two variables exist:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 2: If Missing - Add Them

**Add Variable 1:**
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://wwxhnyyycvprfmsfclgz.supabase.co`
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Click **Save**

**Add Variable 2:**
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3eGhueXl5Y3ZwcmZtc2ZjbGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMDg3ODIsImV4cCI6MjA3ODY4NDc4Mn0._4OEG5wWMUQz40z7y7_IYQLQQRAmzVgLTsLNjnr9SHc`
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Click **Save**

### Step 3: CRITICAL - Redeploy

**Environment variables only apply to NEW deployments!**

1. Go to **Deployments** tab
2. Click **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete (2-3 minutes)

### Step 4: Verify It's Fixed

1. Open your deployed site
2. Open browser console (F12 → Console)
3. Look for: `✅ Supabase client initialized`
4. Test the contact form - it should work now

## Common Mistakes

### ❌ Wrong: Variable name without `NEXT_PUBLIC_` prefix
- ❌ `SUPABASE_URL` (won't work)
- ✅ `NEXT_PUBLIC_SUPABASE_URL` (correct)

### ❌ Wrong: Only adding to Production environment
- Must select **all three**: Production, Preview, Development

### ❌ Wrong: Adding variables but not redeploying
- Variables only apply to **new deployments**
- You **must redeploy** after adding variables

### ❌ Wrong: Typos in variable values
- Double-check the URL and key are copied correctly
- No extra spaces or line breaks

## Verify Variables Are Set Correctly

After redeployment, check the browser console:

**Good signs:**
- `✅ Supabase client initialized`
- No error messages about missing variables

**Bad signs:**
- `⚠️ Supabase configuration error`
- `No API key found in request`
- `Missing Supabase environment variables`

## Still Not Working?

### Check These:

1. **Variable names are exact:**
   - `NEXT_PUBLIC_SUPABASE_URL` (not `SUPABASE_URL`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (not `SUPABASE_KEY`)

2. **All environments selected:**
   - Production ✅
   - Preview ✅
   - Development ✅

3. **Redeployed after adding variables:**
   - Go to Deployments → Redeploy latest

4. **Check Vercel logs:**
   - Go to Deployments → Click on latest deployment → View logs
   - Look for any errors during build

5. **Test in browser console:**
   ```javascript
   // Open browser console (F12) and run:
   console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
   console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
   ```
   - Should show your values (not `undefined`)

## Need More Help?

1. Check Vercel deployment logs for errors
2. Verify Supabase project is active: https://supabase.com/dashboard
3. Test Supabase connection: https://wwxhnyyycvprfmsfclgz.supabase.co/rest/v1/
4. Check browser Network tab (F12 → Network) for failed requests

