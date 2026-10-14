/**
 * Teléfono: prefijo editable (+598 por defecto) + número nacional.
 * Se guarda en E.164 (DESIGN §3 `PhoneField`, PRD FR-C02).
 * Misma regla en cliente y servidor.
 */

export const DEFAULT_PHONE_PREFIX = "+598";

const PREFIX_RE = /^\+\d{1,3}$/;
const NATIONAL_RE = /^\d{7,12}$/;

export function cleanPrefix(prefix: string): string {
  const p = prefix.trim().replace(/\s/g, "");
  return p.startsWith("+") ? p : `+${p}`;
}

export function cleanNational(national: string, prefix: string): string {
  let digits = national.replace(/\D/g, "");
  // En Uruguay los números se escriben con 0 inicial (099…), que no va en E.164.
  if (cleanPrefix(prefix) === DEFAULT_PHONE_PREFIX && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return digits;
}

export function isValidPhone(prefix: string, national: string): boolean {
  const p = cleanPrefix(prefix);
  if (!PREFIX_RE.test(p)) return false;
  return NATIONAL_RE.test(cleanNational(national, p));
}

/** Devuelve el número en E.164 (ej. `+59899123456`) o `null` si no es válido. */
export function toE164(prefix: string, national: string): string | null {
  if (!isValidPhone(prefix, national)) return null;
  return `${cleanPrefix(prefix)}${cleanNational(national, prefix)}`;
}
