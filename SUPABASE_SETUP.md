# Supabase Setup Guide for Contact Form

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Wait for the project to be set up

## Step 2: Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

## Step 3: Create Environment Variables

1. Create a `.env.local` file in the root of your project
2. Add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from Step 2.

## Step 4: Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the SQL from `supabase-setup.sql` file
4. Click **Run** to execute the query

This will create the `contact_messages` table with the necessary columns and security policies.

## Step 5: Test the Form

1. Restart your Next.js development server:
   ```bash
   npm run dev
   ```
2. Navigate to the Contact section on your portfolio
3. Fill out and submit the form
4. Check your Supabase dashboard → **Table Editor** → `contact_messages` to see the submitted messages

## Troubleshooting

- **Error: Missing Supabase environment variables**: Make sure your `.env.local` file is in the root directory and contains both variables
- **Error: relation "contact_messages" does not exist**: Run the SQL setup script in Step 4
- **Error: new row violates row-level security policy**: Check that you've created the RLS policy in the SQL setup script

## Viewing Messages

To view submitted messages:
1. Go to your Supabase dashboard
2. Navigate to **Table Editor**
3. Select the `contact_messages` table
4. You'll see all submitted contact form messages

