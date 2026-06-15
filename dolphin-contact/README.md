# Dolphin Contact Form Demo

A working Next.js version of the [Dolphin](https://www.dolphin-tech.ai) "Get in Touch" form. Submissions are emailed via your Gmail SMTP server to the inbox you set at the top of the demo page.

## Setup

```bash
pnpm install
cp .env.example .env.local
```

Add your Gmail App Password to `.env.local`:

```env
SMTP_USER=email@gmail.com
SMTP_PASS=your_16_character_app_password
SMTP_FROM=Dolphin Contact <aaravkhemka9@gmail.com>
```

## Get your Gmail SMTP password

Gmail does **not** use your normal Google password for SMTP. You need an **App Password**:

1. Turn on **2-Step Verification** for your Google account: https://myaccount.google.com/security
2. Open **App passwords**: https://myaccount.google.com/apppasswords
3. Create a new app password (choose **Mail** or name it `Dolphin Contact Form`)
4. Google shows a 16-character password like `abcd efgh ijkl mnop`
5. Paste it into `.env.local` as `SMTP_PASS` (spaces optional)

If you do not see App passwords, 2-Step Verification is probably not enabled yet.

## Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000), enter your recipient email at the top, fill out the form, and submit.

## How it works

- `src/components/ContactForm.tsx` — Dolphin-styled form UI
- `src/app/api/contact/route.ts` — validates input and sends email via Gmail SMTP
- `src/lib/mail.ts` — nodemailer transport configuration
