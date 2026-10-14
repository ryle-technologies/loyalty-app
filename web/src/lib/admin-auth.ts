import { createHash, timingSafeEqual } from "node:crypto";

export type AdminAuth =
  | { ok: true }
  | { ok: false; status: 401 | 503; message: string };

/**
 * Protege los endpoints de administración con `ADMIN_EXPORT_TOKEN`.
 * Acepta `Authorization: Bearer <token>` o `?token=<token>` (para abrir el CSV
 * desde el navegador). Comparación en tiempo constante sobre hashes.
 */
export function checkAdminAuth(req: Request): AdminAuth {
  const expected = process.env.ADMIN_EXPORT_TOKEN?.trim();
  if (!expected || expected.length < 16) {
    return {
      ok: false,
      status: 503,
      message:
        "ADMIN_EXPORT_TOKEN no está configurado (mínimo 16 caracteres). La exportación está deshabilitada.",
    };
  }

  const header = req.headers.get("authorization");
  const bearer = header?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim();
  const query = new URL(req.url).searchParams.get("token")?.trim();
  const provided = bearer || query;

  if (!provided || !safeEqual(provided, expected)) {
    return { ok: false, status: 401, message: "Token inválido o ausente." };
  }
  return { ok: true };
}

function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}
