import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { messageSchema } from "@/lib/validations/message";
import { sendContactEmail } from "@/lib/email/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json() as unknown;
    const parsed = messageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, body: messageBody } = parsed.data;

    await db.insert(messages).values({ name, email, subject, body: messageBody });

    // Email is non-blocking — message is saved even if notification fails
    try {
      await sendContactEmail({ name, email, subject, body: messageBody });
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Message submission error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
