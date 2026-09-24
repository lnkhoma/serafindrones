/**
 * Shared contact-form schema.
 *
 * Imported by BOTH the client form (react-hook-form + zodResolver) and the
 * API route (/app/api/contact/route.ts), so validation rules live in one place.
 * Keep this file free of server-only or browser-only imports.
 */
import { z } from "zod";
import { ALL_DISTRICTS } from "./districts";

/* ------------------------------------------------------------------ */
/* Option lists (value → human label). Labels are what land in Sheets. */
/* ------------------------------------------------------------------ */

export const REQUEST_TYPES = ["farm-demo", "office-visit"] as const;
export type RequestType = (typeof REQUEST_TYPES)[number];
export const REQUEST_TYPE_LABELS: Record<RequestType, string> = {
  "farm-demo": "Farm Demo",
  "office-visit": "Office Visit",
};

export function isRequestType(value: unknown): value is RequestType {
  return typeof value === "string" && (REQUEST_TYPES as readonly string[]).includes(value);
}

export const CONTACT_METHODS = ["phone", "email", "whatsapp"] as const;
export const CONTACT_METHOD_LABELS: Record<(typeof CONTACT_METHODS)[number], string> = {
  phone: "Phone",
  email: "Email",
  whatsapp: "WhatsApp",
};

export const AREA_UNITS = ["hectares", "acres"] as const;
export type AreaUnit = (typeof AREA_UNITS)[number];

export const CROPS = [
  "Maize", "Tobacco", "Soybean", "Groundnuts", "Rice", "Cotton",
  "Sugarcane", "Coffee", "Tea", "Vegetables", "Other",
] as const;

export const WATER_SOURCES = ["irrigated", "rainfed", "mixed"] as const;
export const WATER_SOURCE_LABELS: Record<(typeof WATER_SOURCES)[number], string> = {
  irrigated: "Irrigated",
  rainfed: "Rainfed",
  mixed: "Mixed",
};

export const IRRIGATION_TYPES = ["Drip", "Sprinkler", "Flood", "Other"] as const;

/* The two services offered in the brochure, plus an advice option. */
export const SERVICES = [
  "Drone Chemical Spraying",
  "Drone Fertilizer Spreading",
  "Not sure / Need advice",
] as const;

const HECTARES_PER_ACRE = 0.404686;
const toHectares = (value: number, unit: AreaUnit) =>
  unit === "acres" ? value * HECTARES_PER_ACRE : value;

/** Error map so enums / radios show a friendly message instead of "Required". */
const withMessage = (message: string) => ({ errorMap: () => ({ message }) });

const areaNumber = (label: string) =>
  z
    .number({ invalid_type_error: `Enter the ${label}`, required_error: `Enter the ${label}` })
    .positive(`The ${label} must be greater than 0`)
    .max(1_000_000, "That looks too large, please double-check");

/* ------------------------------------------------------------------ */
/* Schema                                                              */
/* ------------------------------------------------------------------ */

export const contactSchema = z
  .object({
    requestType: z.enum(REQUEST_TYPES, withMessage("Choose a request type")),

    // Section 1 — Contact person
    fullName: z
      .string()
      .trim()
      .min(2, "Please enter your full name")
      .max(120, "Name is too long"),
    jobTitle: z.string().trim().max(120, "Job title is too long").optional(),
    phone: z
      .string()
      .trim()
      .min(1, "Please enter a phone number")
      .regex(/^\+?[0-9\s\-()]{7,20}$/, "Enter a valid phone number, e.g. +265 999 123 456"),
    email: z
      .string()
      .trim()
      .min(1, "Please enter your email address")
      .email("Enter a valid email address"),
    contactMethod: z.enum(CONTACT_METHODS, withMessage("Choose how you'd like us to contact you")),

    // Section 2 — Farm / organisation
    orgName: z
      .string()
      .trim()
      .min(2, "Please enter your farm or organisation name")
      .max(160, "Name is too long"),
    district: z
      .string({ required_error: "Select your district" })
      .refine((d) => ALL_DISTRICTS.includes(d), "Select your district"),
    farmSize: areaNumber("total farm size"),
    farmSizeUnit: z.enum(AREA_UNITS, withMessage("Choose a unit")),
    cultivatedArea: areaNumber("cultivated area"),
    cultivatedAreaUnit: z.enum(AREA_UNITS, withMessage("Choose a unit")),
    crops: z
      .array(z.enum(CROPS), withMessage("Select at least one crop"))
      .min(1, "Select at least one crop"),
    otherCrop: z.string().trim().max(120, "Keep this under 120 characters").optional(),
    waterSource: z.enum(WATER_SOURCES, withMessage("Choose your water source")),
    irrigationType: z.union([z.enum(IRRIGATION_TYPES), z.literal("")]).optional(),

    // Section 3 — Service interest
    services: z
      .array(z.enum(SERVICES), withMessage("Select at least one service"))
      .min(1, "Select at least one service"),
    preferredDate: z
      .string({ required_error: "Choose a preferred date" })
      .min(1, "Choose a preferred date")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid date")
      .refine((value) => {
        // Accept "today" in any timezone by allowing a 36-hour margin.
        const chosen = Date.parse(`${value}T00:00:00Z`);
        return !Number.isNaN(chosen) && chosen >= Date.now() - 36 * 60 * 60 * 1000;
      }, "Please choose today or a future date"),
    notes: z.string().trim().max(2000, "Please keep notes under 2,000 characters").optional(),

    // Section 4 — Consent
    consent: z
      .boolean()
      .refine((v) => v === true, "Please confirm we may contact you about this request"),
  })
  .superRefine((data, ctx) => {
    if (data.crops.includes("Other") && !data.otherCrop?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["otherCrop"],
        message: "Please specify the other crop(s)",
      });
    }

    // The office is open Monday to Friday only.
    if (data.requestType === "office-visit" && /^\d{4}-\d{2}-\d{2}$/.test(data.preferredDate)) {
      const day = new Date(`${data.preferredDate}T00:00:00Z`).getUTCDay();
      if (day === 0 || day === 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["preferredDate"],
          message: "Our office is open Monday to Friday. Please choose a weekday",
        });
      }
    }

    // Cultivated area can't exceed the whole farm (compared in hectares, with
    // a little tolerance for rounding when the units differ).
    if (
      toHectares(data.cultivatedArea, data.cultivatedAreaUnit) >
      toHectares(data.farmSize, data.farmSizeUnit) * 1.001
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cultivatedArea"],
        message: "Cultivated area can't be larger than the total farm size",
      });
    }
  });

export type ContactFormValues = z.infer<typeof contactSchema>;

/* ------------------------------------------------------------------ */
/* Google Sheets column mapping                                        */
/* ------------------------------------------------------------------ */

/** Column headers, in order. Paste these into row 1 of your sheet. */
export const SHEET_HEADERS = [
  "Timestamp",
  "Request Type",
  "Full Name",
  "Job Title",
  "Phone",
  "Email",
  "Preferred Contact Method",
  "Farm/Org Name",
  "District",
  "Total Farm Size",
  "Total Farm Size Unit",
  "Cultivated Area",
  "Cultivated Area Unit",
  "Crops",
  "Other Crop Detail",
  "Water Source",
  "Irrigation Type",
  "Services Interested",
  "Preferred Date",
  "Notes",
] as const;

/** Maps a validated submission to one spreadsheet row (same order as SHEET_HEADERS). */
export function toSheetRow(data: ContactFormValues, submittedAt = new Date()): (string | number)[] {
  const irrigated = data.waterSource !== "rainfed";
  return [
    formatTimestamp(submittedAt),
    REQUEST_TYPE_LABELS[data.requestType],
    data.fullName,
    data.jobTitle ?? "",
    data.phone,
    data.email,
    CONTACT_METHOD_LABELS[data.contactMethod],
    data.orgName,
    data.district,
    data.farmSize,
    data.farmSizeUnit,
    data.cultivatedArea,
    data.cultivatedAreaUnit,
    data.crops.join(", "),
    data.crops.includes("Other") ? data.otherCrop ?? "" : "",
    WATER_SOURCE_LABELS[data.waterSource],
    irrigated ? data.irrigationType ?? "" : "",
    data.services.join(", "),
    data.preferredDate,
    data.notes ?? "",
  ];
}

/** "YYYY-MM-DD HH:mm:ss CAT" in Malawi time (UTC+2). */
export function formatTimestamp(date: Date): string {
  return `${date.toLocaleString("sv-SE", { timeZone: "Africa/Blantyre" })} CAT`;
}

/* ------------------------------------------------------------------ */
/* Newsletter                                                          */
/* ------------------------------------------------------------------ */

export const newsletterSchema = z.object({
  email: z.string().trim().min(1, "Enter your email").email("Enter a valid email address"),
});
export type NewsletterValues = z.infer<typeof newsletterSchema>;
