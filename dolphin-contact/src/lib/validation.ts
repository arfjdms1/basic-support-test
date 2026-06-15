import { z } from "zod";

export const FEATURE_OPTIONS = [
  { value: "", label: "Select Feature" },
  {
    value: "avatarbuddy",
    label: "Presentation with Avatar buddy",
  },
  {
    value: "simulationroom",
    label: "Interview in Simulated Room",
  },
] as const;

export const contactFormSchema = z.object({
  recipientEmail: z.email("Enter a valid recipient email at the top of the page."),
  name: z.string().trim().min(1, "Name is required."),
  email: z.email("Enter a valid email address."),
  company: z.string().trim().optional(),
  feature: z
    .enum(["", "avatarbuddy", "simulationroom"])
    .refine((value) => value !== "", {
      message: "Please select a feature.",
    }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit more about your learning goals."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
