-- Quick fix for RLS policy issue
-- Run this in your Supabase SQL Editor to fix the "new row violates row-level security policy" error

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Allow public inserts" ON contact_messages;

-- Create a new policy that allows anonymous users (anon) to insert
CREATE POLICY "Allow public inserts" ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

