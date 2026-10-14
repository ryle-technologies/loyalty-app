import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { form } from "@/content/landing";
import { getLeadStore, StoreNotConfiguredError } from "@/lib/leads";
import { fieldErrors, registrationInputSchema, toLead } from "@/lib/leads/schema";
import { clientIp, getRateLimiter } from "@/lib/rate-limit";

type ApiResponse =
  | { ok: true }
  | { ok: false; error: string; errors?: Record<string, string> };

const json = (body: ApiResponse, init?: ResponseInit) =>
  NextResponse.json(body, init);

/**
 * POST /api/registro — registro de interés de un café (PRD FR-L02).
 * 201 guardado · 400 validación · 429 límite · 503 sin almacenamiento · 500 otro.
 */
export async function POST(req: Request) {
  const ip = clientIp(req);
  const limit = await getRateLimiter().check(ip);
  if (!limit.allowed) {
    return json(
      { ok: false, error: form.rateLimited },
      { status: 429, headers: { "retry-after": String(limit.retryAfterSec) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: form.networkError }, { status: 400 });
  }

  const parsed = registrationInputSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { ok: false, error: form.summaryTitle, errors: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  // Honeypot: respondemos como si hubiera salido bien, sin guardar nada.
  if (parsed.data.website && parsed.data.website.trim().length > 0) {
    console.warn(`[registro] honeypot activado desde ${ip}`);
    return json({ ok: true }, { status: 201 });
  }

  const lead = toLead(parsed.data, site.businessType);

  try {
    await getLeadStore().save(lead);
  } catch (err) {
    if (err instanceof StoreNotConfiguredError) {
      console.error("[registro]", err.message);
      return json({ ok: false, error: form.networkError }, { status: 503 });
    }
    console.error("[registro] no se pudo guardar:", err);
    return json({ ok: false, error: form.networkError }, { status: 500 });
  }

  console.info(`[registro] nuevo café: ${lead.businessName} (${lead.barrio})`);
  return json({ ok: true }, { status: 201 });
}
