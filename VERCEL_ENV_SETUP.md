# Setting Up Supabase Environment Variables in Vercel

## Quick Steps

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Select your project: `RithishMurugan-portfolio`

2. **Navigate to Settings**
   - Click on your project
   - Go to **Settings** tab
   - Click on **Environment Variables** in the left sidebar

3. **Add Environment Variables**
   
   Add these two variables:
   
   **Variable 1:**
   - **Name:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** `https://wwxhnyyycvprfmsfclgz.supabase.co`
   - **Environments:** Select all (Production, Preview, Development)
   - Click **Save**
   
   **Variable 2:**
   - **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3eGhueXl5Y3ZwcmZtc2ZjbGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMDg3ODIsImV4cCI6MjA3ODY4NDc4Mn0._4OEG5wWMUQz40z7y7_IYQLQQRAmzVgLTsLNjnr9SHc`
   - **Environments:** Select all (Production, Preview, Development)
   - Click **Save**

4. **Redeploy Your Application**
   - Go to **Deployments** tab
   - Click the **⋯** (three dots) on the latest deployment
   - Select **Redeploy**
   - Or push a new commit to trigger automatic redeployment

## Important Notes

- ✅ Make sure to select **all environments** (Production, Preview, Development) when adding variables
- ✅ After adding variables, you **must redeploy** for them to take effect
- ✅ The variables are prefixed with `NEXT_PUBLIC_` so they're available in the browser
- ✅ Never commit your `.env.local` file to Git (it's already in `.gitignore`)

## Verify It's Working

After redeployment:
1. Visit your deployed site
2. Go to the Contact section
3. Try submitting the contact form
4. Check the browser console for any errors
5. Check Supabase dashboard to see if messages are being saved

## Troubleshooting

If the contact form still doesn't work:
1. Check Vercel deployment logs for errors
2. Verify environment variables are set correctly in Vercel dashboard
3. Make sure you've redeployed after adding the variables
4. Check Supabase RLS policies are set up correctly (run `supabase-setup.sql`)

