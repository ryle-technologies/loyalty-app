import { z } from "zod";
import { form } from "@/content/landing";
import { isValidPhone, toE164 } from "@/lib/phone";

const trimmed = (max: number, message: string) =>
  z.string().trim().min(1, message).max(max, message);

const optionalTrimmed = (max: number, message: string) =>
  z
    .string()
    .trim()
    .max(max, message)
    .optional()
    .transform((v) => (v && v.length > 0 ? v : undefined));

const INSTAGRAM_RE = /^[A-Za-z0-9._]{1,30}$/;

/**
 * Lo que manda el formulario (sin normalizar). El rubro no viaja: lo fija el
 * servidor (PRD FR-L02, DECISIONS S1).
 */
export const registrationInputSchema = z
  .object({
    businessName: trimmed(120, form.fields.businessName.error),
    contactName: trimmed(120, form.fields.contactName.error),
    phonePrefix: z.string().trim().max(5),
    phoneNational: z.string().trim().max(20),
    barrio: trimmed(80, form.fields.barrio.error),
    email: optionalTrimmed(254, form.fields.email.error).pipe(
      z.email(form.fields.email.error).optional(),
    ),
    instagram: optionalTrimmed(64, form.fields.instagram.error).transform(
      (v, ctx) => {
        if (!v) return undefined;
        const handle = v
          .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
          .replace(/^@/, "")
          .replace(/\/.*$/, "");
        if (!INSTAGRAM_RE.test(handle)) {
          ctx.addIssue({ code: "custom", message: form.fields.instagram.error });
          return z.NEVER;
        }
        return handle;
      },
    ),
    /** Honeypot: los humanos no lo ven; si viene con algo, es un bot. */
    website: z.string().optional(),
    utm: z
      .object({
        source: z.string().trim().max(100).optional(),
        medium: z.string().trim().max(100).optional(),
        campaign: z.string().trim().max(100).optional(),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!isValidPhone(data.phonePrefix, data.phoneNational)) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: form.fields.phone.error,
      });
    }
  });

export type RegistrationInput = z.infer<typeof registrationInputSchema>;

/** Registro normalizado tal como se guarda. */
export interface Lead {
  id: string;
  createdAt: string;
  businessName: string;
  contactName: string;
  /** E.164, ej. `+59899123456`. */
  phone: string;
  email?: string;
  /** Usuario de Instagram sin `@`. */
  instagram?: string;
  barrio: string;
  /** Fijo `café` (PRD FR-L02). */
  businessType: string;
  utm?: { source?: string; medium?: string; campaign?: string };
}

export const LEAD_CSV_COLUMNS = [
  "id",
  "createdAt",
  "businessName",
  "contactName",
  "phone",
  "email",
  "instagram",
  "barrio",
  "businessType",
  "utmSource",
  "utmMedium",
  "utmCampaign",
] as const;

export function toLead(
  input: RegistrationInput,
  businessType: string,
  now: Date = new Date(),
): Lead {
  const phone = toE164(input.phonePrefix, input.phoneNational);
  if (!phone) throw new Error("invalid phone after validation");
  const utm =
    input.utm && (input.utm.source || input.utm.medium || input.utm.campaign)
      ? {
          source: input.utm.source || undefined,
          medium: input.utm.medium || undefined,
          campaign: input.utm.campaign || undefined,
        }
      : undefined;
  return {
    id: crypto.randomUUID(),
    createdAt: now.toISOString(),
    businessName: input.businessName,
    contactName: input.contactName,
    phone,
    email: input.email,
    instagram: input.instagram,
    barrio: input.barrio,
    businessType,
    utm,
  };
}

/** Errores por campo para el formulario (`{ campo: mensaje }`). */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}
