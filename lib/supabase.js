import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Validate environment variables
const isValidUrl = supabaseUrl && supabaseUrl !== '' && !supabaseUrl.includes('placeholder')
const isValidKey = supabaseAnonKey && supabaseAnonKey !== '' && supabaseAnonKey !== 'placeholder-key'

// Create client with proper error handling and timeout
let supabase;

if (isValidUrl && isValidKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  
  // Log configuration in development
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('✅ Supabase client initialized');
    console.log('URL:', supabaseUrl.substring(0, 30) + '...');
    console.log('Key:', supabaseAnonKey.substring(0, 20) + '...');
  }
} else {
  // Create a client that will fail gracefully
  supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
  );
  
  // Log detailed warning
  if (typeof window !== 'undefined') {
    console.error('⚠️  Supabase configuration error:');
    console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? `Set (${supabaseUrl.substring(0, 30)}...)` : 'MISSING');
    console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'MISSING');
    console.error('Please check your environment variables in Vercel dashboard.');
    console.error('Make sure to:');
    console.error('1. Add variables in Vercel Settings → Environment Variables');
    console.error('2. Select all environments (Production, Preview, Development)');
    console.error('3. Redeploy your application');
  }
}

export { supabase };

