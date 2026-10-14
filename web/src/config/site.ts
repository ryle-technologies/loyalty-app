/**
 * Placeholders pendientes de decisión (ver DECISIONS.md y OPEN-QUESTIONS.md B1–B6).
 *
 * Este es el ÚNICO archivo que hay que tocar para publicar: marca, número de
 * WhatsApp, razón social, email y links legales. Cada valor puede fijarse acá o
 * por variable de entorno `NEXT_PUBLIC_*` (sin cambiar código).
 */

const env = (value: string | undefined) => {
  const v = value?.trim();
  return v && v.length > 0 ? v : undefined;
};

/** Número en formato internacional sin «+» ni espacios (ej. 59899123456). */
const whatsappNumber =
  env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) ?? "598XXXXXXXX";

export const site = {
  /** B1 — nombre del producto. `{{marca}}` hasta que Martin lo defina. */
  brand: env(process.env.NEXT_PUBLIC_BRAND_NAME) ?? "{{marca}}",

  /** B6 — URL pública de la landing (metadata / Open Graph). */
  url: env(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000",

  whatsapp: {
    /** B2 / OQ-4 — bloquea publicar mientras sea el placeholder. */
    number: whatsappNumber,
    /** Prellenado de FR-L04 (copy v6 §9). */
    message:
      "Hola, tengo un café y quiero saber más sobre la tarjeta de sellos.",
    get href() {
      return `https://wa.me/${this.number}?text=${encodeURIComponent(this.message)}`;
    },
    /** `true` mientras el número sea el placeholder `598XXXXXXXX`. */
    get isPlaceholder() {
      return !/^\d{8,15}$/.test(this.number);
    },
  },

  legal: {
    /** Razón social para el footer (`{{razón social}}`). */
    legalName: env(process.env.NEXT_PUBLIC_LEGAL_NAME) ?? "{{razón social}}",
    /** Email de contacto del footer y de la política (`{{email de contacto}}`). */
    contactEmail:
      env(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "{{email de contacto}}",
    /** B3 — política de privacidad. Por defecto, la página placeholder interna. */
    privacyUrl: env(process.env.NEXT_PUBLIC_PRIVACY_URL) ?? "/privacidad",
    /** B3 — términos de la oferta. `undefined` = pendiente (se muestra sin link). */
    termsUrl: env(process.env.NEXT_PUBLIC_TERMS_URL),
  },

  /** Rubro oculto, valor fijo (PRD FR-L02, DECISIONS S1). */
  businessType: "café",
} as const;

export type Site = typeof site;
