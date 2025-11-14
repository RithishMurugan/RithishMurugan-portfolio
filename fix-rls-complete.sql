-- Complete fix for RLS policy - Run this in Supabase SQL Editor
-- This will fix the "Permission denied" error

-- First, let's check and fix the table
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies on this table to start fresh
DROP POLICY IF EXISTS "Allow public inserts" ON contact_messages;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON contact_messages;
DROP POLICY IF EXISTS "contact_messages_insert_policy" ON contact_messages;

-- Create a policy that explicitly allows anonymous (anon) role to insert
-- The anon role is what the public API key uses
CREATE POLICY "contact_messages_insert_policy" 
ON contact_messages
FOR INSERT 
TO anon
WITH CHECK (true);

-- Also allow authenticated users to insert (in case you want to use authenticated keys later)
CREATE POLICY "contact_messages_insert_authenticated" 
ON contact_messages
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Verify the policies were created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'contact_messages';

