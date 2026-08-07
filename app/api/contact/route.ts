import { NextResponse } from "next/server";
import { submitToGoogleContactForm } from "@/lib/google-form";

export const runtime = "nodejs";

interface ContactBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    let body: ContactBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    await submitToGoogleContactForm({ name, email, subject, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST /api/contact error:", err);
    return NextResponse.json({ error: "Failed to save your message. Please try again." }, { status: 502 });
  }
}
