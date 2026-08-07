/** Google Form linked to the portfolio contact spreadsheet. */
export const GOOGLE_CONTACT_FORM = {
  actionUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSe3LVNXWPmQJcitNUUVvW9v7Oc8Y2d36YcWoIOdzZW30-pXHA/formResponse",
  viewUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSe3LVNXWPmQJcitNUUVvW9v7Oc8Y2d36YcWoIOdzZW30-pXHA/viewform",
  fields: {
    name: "entry.615060651",
    email: "entry.1700277595",
    subject: "entry.583822024",
    message: "entry.1187436239",
  },
} as const;

export interface GoogleFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function submitToGoogleContactForm(data: GoogleFormPayload): Promise<void> {
  const body = new URLSearchParams();
  body.append(GOOGLE_CONTACT_FORM.fields.name, data.name);
  body.append(GOOGLE_CONTACT_FORM.fields.email, data.email);
  body.append(GOOGLE_CONTACT_FORM.fields.subject, data.subject);
  body.append(GOOGLE_CONTACT_FORM.fields.message, data.message);

  const response = await fetch(GOOGLE_CONTACT_FORM.actionUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    redirect: "manual",
    cache: "no-store",
  });

  // Google Forms returns 302 on success; some clients may see 200 after redirect.
  if (response.status !== 200 && response.status !== 302) {
    throw new Error(`Google Form submission failed (${response.status})`);
  }
}
