# Fixing "Network Error: Unable to connect to server"

## This error means the browser cannot reach Supabase

### Most Common Cause: Environment Variables Not Set in Vercel

**The environment variables are NOT automatically available in Vercel deployments. You MUST add them manually.**

## Step-by-Step Fix

### 1. Verify Environment Variables in Vercel

1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Click on your project: **RithishMurugan-portfolio**
3. Go to **Settings** → **Environment Variables**
4. Check if you see these two variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. If Variables Are Missing - Add Them

**Add Variable 1:**
- Click **Add New**
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://wwxhnyyycvprfmsfclgz.supabase.co`
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Click **Save**

**Add Variable 2:**
- Click **Add New**
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3eGhueXl5Y3ZwcmZtc2ZjbGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMDg3ODIsImV4cCI6MjA3ODY4NDc4Mn0._4OEG5wWMUQz40z7y7_IYQLQQRAmzVgLTsLNjnr9SHc`
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Click **Save**

### 3. CRITICAL: Redeploy After Adding Variables

**Existing deployments do NOT get new environment variables automatically!**

**Option A: Manual Redeploy**
1. Go to **Deployments** tab
2. Click **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

**Option B: Trigger New Deployment**
- Push a new commit to GitHub (this will auto-deploy)

### 4. Verify Variables Are Set

After redeployment, check the browser console (F12):
- Open your live site
- Open DevTools (F12) → Console tab
- Look for: `✅ Supabase client initialized`
- If you see `⚠️ Supabase configuration error`, the variables are still not set correctly

## Common Mistakes

### ❌ Wrong: Only adding to Production
- You must select **all three environments**: Production, Preview, Development

### ❌ Wrong: Adding variables but not redeploying
- Environment variables only apply to **new deployments**
- You MUST redeploy after adding variables

### ❌ Wrong: Typos in variable names
- Must be exactly: `NEXT_PUBLIC_SUPABASE_URL` (not `SUPABASE_URL`)
- Must be exactly: `NEXT_PUBLIC_SUPABASE_ANON_KEY` (not `SUPABASE_KEY`)

### ❌ Wrong: Missing `NEXT_PUBLIC_` prefix
- Next.js only exposes variables with `NEXT_PUBLIC_` prefix to the browser
- Without this prefix, the variables won't be available in client-side code

## Test Your Fix

1. **Check Browser Console** (F12 → Console)
   - Should see: `✅ Supabase client initialized`
   - Should NOT see: `⚠️ Supabase configuration error`

2. **Test Contact Form**
   - Fill out the form
   - Submit
   - Should see success message
   - Check Supabase Dashboard → Table Editor → `contact_messages` to verify data was saved

3. **Check Network Tab** (F12 → Network)
   - Look for requests to `supabase.co`
   - Should see status 200 (success) or 201 (created)
   - If you see CORS errors, check Supabase settings

## Still Not Working?

### Check These:

1. **Supabase URL is correct**
   - Should be: `https://wwxhnyyycvprfmsfclgz.supabase.co`
   - Test in browser: https://wwxhnyyycvprfmsfclgz.supabase.co/rest/v1/ (should return JSON)

2. **Supabase Key is correct**
   - Should start with: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Get fresh key from: Supabase Dashboard → Settings → API → anon/public key

3. **Table exists in Supabase**
   - Go to Supabase Dashboard → Table Editor
   - Should see `contact_messages` table
   - If not, run `supabase-setup.sql` script

4. **RLS Policies are set**
   - Go to Supabase Dashboard → Authentication → Policies
   - Should have policies allowing INSERT for `anon` role
   - If not, run `supabase-setup.sql` script

5. **CORS is enabled**
   - Supabase allows all origins by default
   - Check if you have custom CORS settings blocking requests

## Quick Checklist

- [ ] Variables added in Vercel Settings → Environment Variables
- [ ] Both variables have `NEXT_PUBLIC_` prefix
- [ ] All three environments selected (Production, Preview, Development)
- [ ] Application redeployed after adding variables
- [ ] Browser console shows `✅ Supabase client initialized`
- [ ] `contact_messages` table exists in Supabase
- [ ] RLS policies are set correctly

## Need More Help?

1. Check Vercel deployment logs for errors
2. Check browser console for detailed error messages
3. Verify Supabase is accessible: https://status.supabase.com
4. Test Supabase connection from Supabase Dashboard → SQL Editor

