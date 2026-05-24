import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

// ─── Mailchimp helper ────────────────────────────────────────────────────────

async function mailchimpSubscribe(
  email: string,
  name?: string | null
): Promise<{ id: string } | null> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX; // e.g. "us1"

  if (!apiKey || !listId || !serverPrefix) return null;

  try {
    const res = await fetch(
      `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
          merge_fields: name
            ? { FNAME: name.split(" ")[0] ?? "", LNAME: name.split(" ").slice(1).join(" ") ?? "" }
            : {},
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      // Status 400 with title "Member Exists" means already subscribed — not an error
      if ((err as { title?: string }).title === "Member Exists") return { id: "existing" };
      console.error("[Mailchimp subscribe error]", err);
      return null;
    }

    const data = await res.json();
    return { id: (data as { id?: string }).id ?? "" };
  } catch (err) {
    console.error("[Mailchimp fetch error]", err);
    return null;
  }
}

async function mailchimpUnsubscribe(email: string): Promise<boolean> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!apiKey || !listId || !serverPrefix) return false;

  try {
    // Mailchimp uses md5 hash of lowercased email as member id
    const { createHash } = await import("crypto");
    const hash = createHash("md5").update(email.toLowerCase()).digest("hex");

    const res = await fetch(
      `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members/${hash}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
        },
        body: JSON.stringify({ status: "unsubscribed" }),
      }
    );
    return res.ok;
  } catch (err) {
    console.error("[Mailchimp unsubscribe error]", err);
    return false;
  }
}

// ─── Schemas ─────────────────────────────────────────────────────────────────

const SubscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().max(100).optional().nullable(),
  source: z.string().max(50).optional().nullable(),
});

const UnsubscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// ─── POST /api/newsletter ─────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = SubscribeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { email, name, source } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Upsert subscriber in DB
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: normalizedEmail },
      update: {
        status: "ACTIVE",
        name: name?.trim() ?? undefined,
      },
      create: {
        email: normalizedEmail,
        name: name?.trim() ?? null,
        source: source ?? null,
        status: "ACTIVE",
      },
    });

    // Attempt Mailchimp sync (fire-and-forget, graceful degradation)
    const mcResult = await mailchimpSubscribe(normalizedEmail, name);
    if (mcResult?.id && mcResult.id !== "existing") {
      await prisma.newsletterSubscriber.update({
        where: { id: subscriber.id },
        data: { mailchimpId: mcResult.id },
      });
    }

    return NextResponse.json(
      { success: true, message: "You've been subscribed. Thank you!" },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/newsletter]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── DELETE /api/newsletter ───────────────────────────────────────────────────

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const parsed = UnsubscribeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const normalizedEmail = parsed.data.email.toLowerCase().trim();

    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail },
    });

    if (!subscriber) {
      // Don't reveal whether email exists
      return NextResponse.json({ success: true, message: "Unsubscribed successfully." });
    }

    await prisma.newsletterSubscriber.update({
      where: { email: normalizedEmail },
      data: { status: "UNSUBSCRIBED" },
    });

    // Sync with Mailchimp
    await mailchimpUnsubscribe(normalizedEmail);

    return NextResponse.json({ success: true, message: "You've been unsubscribed." });
  } catch (err) {
    console.error("[DELETE /api/newsletter]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
