import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const corsHeaders = {
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !secret || url.includes('placeholder') || secret === 'placeholder-key') {
    return null;
  }

  return createClient(url, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Sanity check + env presence (no secret values). */
export async function GET() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  return NextResponse.json(
    {
      ok: true,
      route: 'contact',
      serverEnv: {
        supabaseUrl: Boolean(url && String(url).trim() && !String(url).includes('placeholder')),
        serviceRoleOrSecretKey: Boolean(
          secret && String(secret).trim() && secret !== 'placeholder-key'
        ),
      },
      hint:
        'Vercel ↔ Supabase integration usually sets SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY. After connecting, redeploy Production. In Vercel → Settings → Environment Variables, confirm those exist for Production (not only Preview).',
    },
    { headers: corsHeaders }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON body.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const { name, email, subject, message } = body || {};

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Please fill in all fields.' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json(
        {
          error:
            'Server is not configured for contact submissions. On Vercel, set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (synced by the Supabase integration) or SUPABASE_SECRET_KEY, then redeploy.',
        },
        { status: 500, headers: corsHeaders }
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
        msg =
          'Database table not found. Run supabase-setup.sql in the Supabase SQL editor.';
      }
      return NextResponse.json(
        { error: msg },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json({ ok: true }, { headers: corsHeaders });
  } catch (err) {
    console.error('POST /api/contact error:', err);
    return NextResponse.json(
      { error: 'Something went wrong on the server. Please try again later.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
