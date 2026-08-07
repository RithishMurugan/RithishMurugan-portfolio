export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** Submissions are saved via the linked Google Form → Google Sheet. */
export async function submitContactForm(data: ContactFormData): Promise<void> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({
      name: data.name.trim(),
      email: data.email.trim(),
      subject: data.subject.trim(),
      message: data.message.trim(),
    }),
  });

  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(payload.error || "Failed to submit message.");
  }
}
