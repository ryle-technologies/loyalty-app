import { NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/admin-auth";
import { leadsToCsv } from "@/lib/csv";
import { getLeadStore, StoreCannotListError, StoreNotConfiguredError } from "@/lib/leads";

/**
 * GET /api/admin/leads.csv — exporta todos los registros de interés.
 * Requiere `ADMIN_EXPORT_TOKEN` (header `Authorization: Bearer …` o `?token=…`).
 */
export async function GET(req: Request) {
  const auth = checkAdminAuth(req);
  if (!auth.ok) {
    return NextResponse.json(
      { ok: false, error: auth.message },
      {
        status: auth.status,
        headers: auth.status === 401 ? { "www-authenticate": "Bearer" } : undefined,
      },
    );
  }

  try {
    const store = getLeadStore();
    const leads = await store.list();
    const stamp = new Date().toISOString().slice(0, 10);
    return new NextResponse(leadsToCsv(leads), {
      status: 200,
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="registros-${stamp}.csv"`,
        "cache-control": "no-store",
        "x-lead-store": store.name,
        "x-lead-count": String(leads.length),
      },
    });
  } catch (err) {
    if (err instanceof StoreCannotListError || err instanceof StoreNotConfiguredError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 501 });
    }
    console.error("[admin/leads.csv]", err);
    return NextResponse.json(
      { ok: false, error: "No se pudo generar la exportación." },
      { status: 500 },
    );
  }
}
