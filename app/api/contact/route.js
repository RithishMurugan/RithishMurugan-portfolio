import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const corsHeaders = {
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * Optional alert for each new row (Slack, Discord, Zapier/Make “webhook” catch URL, etc.).
 * Set CONTACT_NOTIFY_WEBHOOK_URL in Vercel (server-only, never NEXT_PUBLIC_).
 * CONTACT_NOTIFY_WEBHOOK_TYPE: "slack" | "discord" | "json" (default "json").
 */
function buildNotifyBody(type, { name, email, subject, message, at }) {
  const text = [
    'New portfolio contact form submission',
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    '---',
    String(message).slice(0, 3500),
  ].join('\n');

  if (type === 'slack') {
    return { text };
  }
  if (type === 'discord') {
    return { content: text.slice(0, 1900) };
  }
  return {
    event: 'contact_form',
    at,
    name,
    email,
    subject,
    message,
  };
}

function notifyNewContact({ name, email, subject, message }) {
  const url = process.env.CONTACT_NOTIFY_WEBHOOK_URL;
  if (!url || !String(url).startsWith('http')) {
    return;
  }

  const type = (process.env.CONTACT_NOTIFY_WEBHOOK_TYPE || 'json').toLowerCase();
  const at = new Date().toISOString();
  const body = buildNotifyBody(type, {
    name,
    email,
    subject,
    message,
    at,
  });

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 8000);

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: controller.signal,
  })
    .then((res) => {
      if (!res.ok) {
        console.error('CONTACT_NOTIFY_WEBHOOK_URL returned', res.status);
      }
    })
    .catch((err) => {
      console.error('Contact notify webhook failed:', err.message);
    })
    .finally(() => clearTimeout(t));
}

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
        notifyWebhookConfigured: Boolean(
          process.env.CONTACT_NOTIFY_WEBHOOK_URL &&
            String(process.env.CONTACT_NOTIFY_WEBHOOK_URL).startsWith('http')
        ),
      },
      hint:
        'Vercel ↔ Supabase integration usually sets SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY. After connecting, redeploy Production. In Vercel → Settings → Environment Variables, confirm those exist for Production (not only Preview). Optional: CONTACT_NOTIFY_WEBHOOK_URL (+ CONTACT_NOTIFY_WEBHOOK_TYPE=slack|discord|json) for alerts on each submission.',
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

    notifyNewContact({
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject).trim(),
      message: String(message).trim(),
    });

    return NextResponse.json({ ok: true }, { headers: corsHeaders });
  } catch (err) {
    console.error('POST /api/contact error:', err);
    return NextResponse.json(
      { error: 'Something went wrong on the server. Please try again later.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
