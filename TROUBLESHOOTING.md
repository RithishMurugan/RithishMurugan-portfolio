# Troubleshooting "Failed to fetch" Error

## Common Causes and Solutions

### 1. **Environment Variables Not Set in Vercel** ⚠️ (Most Common)

**Problem:** The `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are not set in Vercel.

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add these two variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = `https://wwxhnyyycvprfmsfclgz.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
3. **IMPORTANT:** Select all environments (Production, Preview, Development)
4. **Redeploy** your application (existing deployments don't get new env vars)

### 2. **Environment Variables Set But Not Redeployed**

**Problem:** You added the variables but didn't redeploy.

**Solution:**
- Go to Deployments → Click "⋯" on latest deployment → Redeploy
- Or push a new commit to trigger automatic deployment

### 3. **CORS Issues**

**Problem:** Supabase might be blocking requests from your domain.

**Solution:**
- Check Supabase Dashboard → Settings → API
- Verify your Vercel domain is allowed (or allow all origins for testing)
- Supabase usually allows all origins by default, but check if you have restrictions

### 4. **Supabase RLS Policies Not Set**

**Problem:** Row Level Security is blocking the insert operation.

**Solution:**
1. Go to Supabase Dashboard → SQL Editor
2. Run the `supabase-setup.sql` script
3. This creates the table and RLS policies

### 5. **Network/Firewall Issues**

**Problem:** Your network or firewall is blocking Supabase requests.

**Solution:**
- Try from a different network
- Check browser console for detailed error messages
- Verify Supabase is accessible: https://wwxhnyyycvprfmsfclgz.supabase.co

## How to Debug

### Step 1: Check Browser Console
Open browser DevTools (F12) → Console tab
- Look for error messages
- Check if environment variables are logged

### Step 2: Check Vercel Logs
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the latest deployment
3. Check "Functions" or "Build Logs" for errors

### Step 3: Verify Environment Variables
1. In Vercel Dashboard → Settings → Environment Variables
2. Verify both variables are set correctly
3. Make sure they're enabled for the correct environment

### Step 4: Test Supabase Connection
1. Go to Supabase Dashboard → Table Editor
2. Check if `contact_messages` table exists
3. Try inserting a test row manually

## Quick Fix Checklist

- [ ] Environment variables added in Vercel
- [ ] Variables enabled for all environments (Production, Preview, Development)
- [ ] Application redeployed after adding variables
- [ ] Supabase table `contact_messages` exists
- [ ] RLS policies are set (run `supabase-setup.sql`)
- [ ] No typos in environment variable names
- [ ] Supabase URL and key are correct

## Still Not Working?

1. **Check the exact error message** in browser console
2. **Verify Supabase credentials** are correct
3. **Test locally** with `.env.local` file to ensure code works
4. **Check Supabase status** at https://status.supabase.com

## Contact Form Test

After fixing, test the form:
1. Fill out all fields
2. Submit the form
3. Check browser console for any errors
4. Check Supabase Dashboard → Table Editor → `contact_messages` to see if data was saved

