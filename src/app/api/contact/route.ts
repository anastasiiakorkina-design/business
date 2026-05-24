import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

// ─── Schema ───────────────────────────────────────────────────────────────────

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(30).optional().nullable(),
  subject: z.string().max(200).optional().nullable(),
  message: z.string().min(10, "Message must be at least 10 characters").max(3000),
  source: z.string().max(50).optional().nullable(),
});

// ─── Nodemailer transport ─────────────────────────────────────────────────────

function createTransport() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: process.env.NODE_ENV === "production" },
  });
}

async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}): Promise<boolean> {
  const transport = createTransport();
  if (!transport) {
    console.warn("[Contact] SMTP not configured — email not sent");
    return false;
  }

  const toEmail = process.env.CONTACT_TO_EMAIL ?? process.env.SMTP_USER!;
  const fromEmail = process.env.SMTP_FROM_EMAIL ?? process.env.SMTP_USER!;
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Apex Coaching";

  const subject = data.subject
    ? `[${siteName}] New message: ${data.subject}`
    : `[${siteName}] New contact message from ${data.name}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: #0D1015; padding: 24px 32px; }
    .header h1 { color: #D4AF37; margin: 0; font-size: 20px; letter-spacing: 1px; }
    .body { padding: 32px; color: #333; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 4px; }
    .value { font-size: 15px; color: #1a1a1a; }
    .message-box { background: #f8f8f8; border-left: 3px solid #D4AF37; padding: 16px; border-radius: 4px; font-size: 15px; line-height: 1.6; white-space: pre-wrap; }
    .footer { padding: 16px 32px; background: #f4f4f4; font-size: 12px; color: #888; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${siteName} — New Contact Message</h1>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      ${data.phone ? `<div class="field"><div class="label">Phone</div><div class="value">${data.phone}</div></div>` : ""}
      ${data.subject ? `<div class="field"><div class="label">Subject</div><div class="value">${data.subject}</div></div>` : ""}
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${data.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
      </div>
    </div>
    <div class="footer">
      This message was sent via the contact form on ${siteName}.
    </div>
  </div>
</body>
</html>`;

  try {
    await transport.sendMail({
      from: `"${siteName}" <${fromEmail}>`,
      to: toEmail,
      replyTo: data.email,
      subject,
      html,
      text: `New contact message from ${data.name} (${data.email})\n\n${data.message}`,
    });

    // Auto-reply to sender
    const autoReplyHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
    .header { background: #0D1015; padding: 24px 32px; }
    .header h1 { color: #D4AF37; margin: 0; font-size: 20px; letter-spacing: 1px; }
    .body { padding: 32px; color: #333; line-height: 1.7; }
    .footer { padding: 16px 32px; background: #f4f4f4; font-size: 12px; color: #888; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${siteName}</h1>
    </div>
    <div class="body">
      <p>Hi ${data.name},</p>
      <p>Thank you for reaching out. We've received your message and will get back to you within 24–48 business hours.</p>
      <p>In the meantime, feel free to explore our coaching programs or connect with us on social media.</p>
      <p>Best,<br/>The ${siteName} Team</p>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} ${siteName}. All rights reserved.
    </div>
  </div>
</body>
</html>`;

    await transport.sendMail({
      from: `"${siteName}" <${fromEmail}>`,
      to: data.email,
      subject: `We received your message — ${siteName}`,
      html: autoReplyHtml,
      text: `Hi ${data.name},\n\nThank you for reaching out. We've received your message and will get back to you within 24-48 business hours.\n\nBest,\nThe ${siteName} Team`,
    });

    return true;
  } catch (err) {
    console.error("[Contact] sendMail error:", err);
    return false;
  }
}

// ─── POST /api/contact ────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const { name, email, phone, subject, message, source } = parsed.data;

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      null;

    // Save as a lead in the database
    const existingLead = await prisma.lead.findFirst({
      where: {
        email: email.toLowerCase(),
        createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      },
    });

    if (!existingLead) {
      await prisma.lead.create({
        data: {
          name: name.trim(),
          email: email.toLowerCase().trim(),
          phone: phone?.trim() ?? null,
          message: `[Contact Form${subject ? ` — ${subject}` : ""}]\n${message.trim()}`,
          source: source ?? "contact_form",
          ipAddress: ip,
          userAgent: req.headers.get("user-agent") ?? null,
        },
      });
    }

    // Send email (gracefully degrade if SMTP not configured)
    const emailSent = await sendContactEmail({
      name,
      email,
      phone,
      subject,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Your message has been received. We'll be in touch within 24–48 hours.",
        emailSent,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/contact]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
