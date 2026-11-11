import { z } from "zod";
import { getLocalTodayISO, normalizeIndianPhone } from "./utils";

const indianMobileRegex = /^[6-9]\d{9}$/;

export const enquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(80, "Name must be 80 characters or fewer."),
  phone: z
    .string()
    .trim()
    .min(10, "Enter a valid 10-digit Indian mobile number.")
    .refine((value) => indianMobileRegex.test(normalizeIndianPhone(value)), {
      message:
        "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9 (optional +91).",
    }),
  email: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || z.string().email().safeParse(value).success,
      {
        message: "Please enter a valid email address or leave this field blank.",
      },
    ),
  preferredProgram: z
    .string()
    .trim()
    .min(1, "Please select a training program or membership interest."),
  preferredDate: z
    .string()
    .trim()
    .min(1, "Please choose a preferred visit or trial date.")
    .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Please enter a valid date.",
    })
    .refine((value) => value >= getLocalTodayISO(), {
      message: "Preferred date cannot be in the past.",
    }),
  membershipInterest: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .max(500, "Message must be 500 characters or fewer.")
    .optional(),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;

