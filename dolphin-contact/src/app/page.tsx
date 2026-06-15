import { ContactForm } from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#05070f]">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Dolphin Demo
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
            Working Contact Form
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            A functional version of the Dolphin &quot;Get in Touch&quot; form
            built with Next.js. Submissions are emailed to the inbox you set at
            the top.
          </p>
        </div>

        <ContactForm />
      </main>
    </div>
  );
}
