-- Simple Fix for RLS Policy - Copy and paste this ENTIRE script

-- First, make sure RLS is enabled
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Allow public inserts" ON contact_messages;
    DROP POLICY IF EXISTS "Allow anonymous inserts" ON contact_messages;
    DROP POLICY IF EXISTS "contact_messages_insert_policy" ON contact_messages;
    DROP POLICY IF EXISTS "contact_messages_insert_authenticated" ON contact_messages;
    DROP POLICY IF EXISTS "contact_messages_select_policy" ON contact_messages;
END $$;

-- Create the policy for anon role (this is what your public API key uses)
CREATE POLICY "contact_messages_insert_policy" 
ON contact_messages
FOR INSERT 
TO anon
WITH CHECK (true);

-- Verify it was created
SELECT policyname, roles, cmd 
FROM pg_policies 
WHERE tablename = 'contact_messages';

