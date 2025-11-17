import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Validate environment variables
const isValidUrl = supabaseUrl && supabaseUrl !== '' && !supabaseUrl.includes('placeholder')
const isValidKey = supabaseAnonKey && supabaseAnonKey !== '' && supabaseAnonKey !== 'placeholder-key'

// Create client with proper error handling
let supabase;

if (isValidUrl && isValidKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
} else {
  // Create a client that will fail gracefully
  supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
  );
  
  // Log detailed warning
  if (typeof window !== 'undefined') {
    console.error('⚠️  Supabase configuration error:');
    console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Set' : 'MISSING');
    console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'MISSING');
    console.error('Please check your environment variables in Vercel dashboard.');
  }
}

export { supabase };

