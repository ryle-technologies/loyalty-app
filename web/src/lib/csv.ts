import { LEAD_CSV_COLUMNS, type Lead } from "@/lib/leads/schema";

function escapeCell(value: unknown): string {
  if (value === undefined || value === null) return "";
  let s = String(value);
  // Evita que Excel/Sheets interpreten fórmulas en celdas con datos del usuario.
  // `+`/`-` seguidos de dígito se dejan (teléfonos en E.164).
  if (/^([=@\t\r]|[+-](?!\d))/.test(s)) s = `'${s}`;
  if (/[",\n\r]/.test(s)) s = `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function leadsToCsv(leads: Lead[]): string {
  const header = LEAD_CSV_COLUMNS.join(",");
  const rows = leads.map((l) =>
    [
      l.id,
      l.createdAt,
      l.businessName,
      l.contactName,
      l.phone,
      l.email,
      l.instagram,
      l.businessType,
      l.utm?.source,
      l.utm?.medium,
      l.utm?.campaign,
    ]
      .map(escapeCell)
      .join(","),
  );
  // BOM para que Excel abra UTF-8 (tildes, «ñ») sin configurar nada.
  return `\uFEFF${[header, ...rows].join("\r\n")}\r\n`;
}
