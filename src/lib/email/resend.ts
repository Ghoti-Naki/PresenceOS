import { Resend } from "resend";

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  body: string;
}) {
  return {
    // Use a verified domain in production — onboarding@resend.dev only sends to your Resend account email
    from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
    to: process.env.CONTACT_EMAIL_TO!,
    replyTo: data.email,
    subject: `[Contact] ${data.subject}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#111;">
        <h2 style="margin:0 0 16px;">New Contact Message</h2>
        <p style="margin:4px 0;"><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p style="margin:4px 0;"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p style="margin:4px 0;"><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
        <p style="white-space:pre-wrap;line-height:1.6;">${escapeHtml(data.body)}</p>
      </div>
    `,
  };
}

// Resend is instantiated at call time (not module load) so builds succeed without a live API key
export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  body: string;
}) {
  const client = new Resend(process.env.RESEND_API_KEY);
  return client.emails.send(buildContactEmail(data));
}
