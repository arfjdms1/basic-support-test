import { NextResponse } from "next/server";

import {
  buildContactEmailHtml,
  buildContactEmailText,
} from "@/lib/email-template";
import { getMailTransporter } from "@/lib/mail";
import { contactFormSchema, FEATURE_OPTIONS } from "@/lib/validation";

function getFeatureLabel(value: string) {
  return (
    FEATURE_OPTIONS.find((option) => option.value === value)?.label ?? value
  );
}

export async function POST(request: Request) {
  const transporter = getMailTransporter();

  if (!transporter) {
    return NextResponse.json(
      {
        error:
          "Email service is not configured. Add SMTP_USER and SMTP_PASS to your environment.",
      },
      { status: 500 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid form data.";
    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const { recipientEmail, name, email, company, feature, message } = parsed.data;
  const fromAddress =
    process.env.SMTP_FROM ?? `Dolphin Contact <${process.env.SMTP_USER}>`;
  const featureLabel = getFeatureLabel(feature);
  const emailContent = {
    name,
    email,
    company,
    featureLabel,
    message,
  };

  try {
    await transporter.sendMail({
      from: fromAddress,
      to: recipientEmail,
      replyTo: email,
      subject: `Dolphin inquiry from ${name}`,
      html: buildContactEmailHtml(emailContent),
      text: buildContactEmailText(emailContent),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send email.";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
