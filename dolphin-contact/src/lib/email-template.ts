function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

type ContactEmailInput = {
  name: string;
  email: string;
  company?: string;
  featureLabel: string;
  message: string;
};

export function buildContactEmailHtml({
  name,
  email,
  company,
  featureLabel,
  message,
}: ContactEmailInput) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company || "Not provided");
  const safeFeature = escapeHtml(featureLabel);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Dolphin Inquiry</title>
  </head>
  <body style="margin:0;padding:0;background-color:#05070f;font-family:Arial,Helvetica,sans-serif;color:#f8fafc;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#05070f;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background-color:#121a2f;border:1px solid rgba(255,255,255,0.1);border-radius:24px;overflow:hidden;box-shadow:0 18px 40px rgba(2,6,23,0.45);">
            <tr>
              <td style="padding:28px 32px 20px;border-bottom:1px solid rgba(255,255,255,0.08);">
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#93c5fd;font-weight:700;">
                  Dolphin
                </p>
                <h1 style="margin:0;font-size:28px;line-height:1.2;color:#ffffff;font-weight:700;">
                  New Contact Inquiry
                </h1>
                <p style="margin:12px 0 0;font-size:15px;line-height:1.5;color:#cbd5e1;">
                  Someone reached out through the Get in Touch form.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="padding-bottom:14px;">
                      <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">Name</p>
                      <p style="margin:0;padding:14px 16px;border-radius:12px;background-color:#1a2238;border:1px solid rgba(255,255,255,0.1);font-size:16px;color:#ffffff;font-weight:600;">${safeName}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:14px;">
                      <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">Email</p>
                      <p style="margin:0;padding:14px 16px;border-radius:12px;background-color:#1a2238;border:1px solid rgba(255,255,255,0.1);font-size:16px;">
                        <a href="mailto:${safeEmail}" style="color:#93c5fd;text-decoration:none;font-weight:600;">${safeEmail}</a>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:14px;">
                      <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">Company</p>
                      <p style="margin:0;padding:14px 16px;border-radius:12px;background-color:#1a2238;border:1px solid rgba(255,255,255,0.1);font-size:16px;color:#e2e8f0;">${safeCompany}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:14px;">
                      <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">Feature</p>
                      <p style="margin:0;display:inline-block;padding:10px 14px;border-radius:999px;background-color:rgba(59,130,246,0.18);border:1px solid rgba(96,165,250,0.35);color:#bfdbfe;font-size:14px;font-weight:700;">
                        ${safeFeature}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 32px;">
                <p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#94a3b8;">
                  Learning Goals
                </p>
                <div style="padding:16px 18px;border-radius:14px;background-color:#1a2238;border:1px solid rgba(255,255,255,0.1);font-size:15px;line-height:1.6;color:#cbd5e1;">
                  ${safeMessage}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

export function buildContactEmailText({
  name,
  email,
  company,
  featureLabel,
  message,
}: ContactEmailInput) {
  return [
    "New Dolphin contact form submission",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "Not provided"}`,
    `Feature: ${featureLabel}`,
    "",
    "Learning goals:",
    message,
  ].join("\n");
}
