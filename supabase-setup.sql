-- Complete Supabase Setup for Contact Form
-- Run this entire script in your Supabase SQL Editor

-- Step 1: Create the contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Step 3: Drop any existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow public inserts" ON contact_messages;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON contact_messages;
DROP POLICY IF EXISTS "contact_messages_insert_policy" ON contact_messages;
DROP POLICY IF EXISTS "contact_messages_insert_authenticated" ON contact_messages;

-- Step 4: Create policy for anonymous users (anon role) - This is what your public API key uses
CREATE POLICY "contact_messages_insert_policy" 
ON contact_messages
FOR INSERT 
TO anon
WITH CHECK (true);

-- Step 5: Create policy for authenticated users (optional, for future use)
CREATE POLICY "contact_messages_insert_authenticated" 
ON contact_messages
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Step 6: Optional - Allow authenticated users to read messages (for viewing in dashboard)
CREATE POLICY "contact_messages_select_policy" 
ON contact_messages
FOR SELECT 
TO authenticated
USING (true);

