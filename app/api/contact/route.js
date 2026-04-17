import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret =
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secret || url.includes('placeholder') || secret === 'placeholder-key') {
    return null;
  }

  return createClient(url, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const { name, email, subject, message } = body || {};

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'Please fill in all fields.' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      {
        error:
          'Server is not configured for contact submissions. Add SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY) and SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL, then redeploy.',
      },
      { status: 500 }
    );
  }

  const { error } = await supabase.from('contact_messages').insert({
    name: String(name).trim(),
    email: String(email).trim(),
    subject: String(subject).trim(),
    message: String(message).trim(),
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error('Supabase insert error:', error.message, error.code, error.details);
    let msg = error.message || 'Failed to submit message.';
    if (error.code === '42P01') {
      msg = 'Database table not found. Run supabase-setup.sql in the Supabase SQL editor.';
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
