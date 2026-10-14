/**
 * Copy de la landing de comercios — v6 (docs/copy/landing-copy.md), palabra por palabra.
 *
 * Única excepción: la campaña es PRE-lanzamiento (registro de interés), así que
 * el CTA del formulario y el mensaje de éxito se ajustaron mínimamente.
 * Cada desvío respecto de v6 está marcado con `// CAMBIO vs v6:` y listado en el README.
 */

export const cta = {
  // CAMBIO vs v6: «Registrar mi café» → «Anotar mi café». Mismo verbo en hero,
  // precio, formulario y CTA final para que el registro se lea como interés,
  // no como alta del servicio.
  register: "Anotar mi café",
  // CAMBIO vs v6: «Registrando…» → «Anotando…» (sigue al CTA).
  registering: "Anotando…",
  whatsapp: "Escribinos por WhatsApp",
  howItWorks: "Ver cómo funciona",
  preferWhatsapp: "Prefiero escribir por WhatsApp",
} as const;

export const offer = {
  main: "Registrate ahora y pagá 199 UYU por mes durante los primeros 6 meses.",
  detail: "Después, 399 UYU por mes. IVA incluido. Sin permanencia.",
  short: "IVA incluido. Sin permanencia.",
} as const;

export const hero = {
  title: "Sumá clientes nuevos. Hacé que los de siempre vuelvan.",
  subtitle:
    "Ponés un QR en caja y quien entra a tu café se lleva tu tarjeta de sellos en el celular, sin bajar ninguna app. Ve cuánto le falta y tiene un motivo para volver.",
  imagePlaceholder:
    "Imagen: tarjeta de sellos en el celular con animación (sellos que se van sumando) — a diseñar",
} as const;

export const growth = {
  title: "Del primer café al cliente de siempre",
  columns: [
    {
      title: "Clientes nuevos",
      items: [
        {
          lead: "Se suman el primer día.",
          text: "Escanean el QR y ven tu recompensa antes de completar nada.",
        },
        {
          lead: "Sin vueltas para empezar.",
          text: "No bajan ninguna app: completan nombre, WhatsApp y email y guardan la tarjeta.",
        },
        {
          lead: "Se van con tu café en el celular.",
          text: "La tarjeta lleva el nombre de tu café, al lado de las otras tarjetas que usan.",
        },
      ],
    },
    {
      title: "Los de siempre",
      items: [
        {
          lead: "Ven cuánto les falta.",
          text: "El progreso está en la tarjeta, en su Wallet, y se actualiza solo con cada sello.",
        },
        {
          lead: "Un empujón al final.",
          text: "Cuando les falta uno, la tarjeta les puede avisar que les falta 1 para la recompensa.",
        },
        {
          lead: "Nunca empiezan de cero.",
          text: "Si cambian de celular, recuperan la tarjeta con los mismos sellos.",
        },
      ],
    },
  ],
} as const;

export const howItWorks = {
  title: "Cómo funciona",
  steps: [
    {
      lead: "Elegís tu recompensa y ponés el QR en caja.",
      text: "Entre 3 y 15 sellos y la recompensa que quieras. Te ayudamos a armarlo. Imprimís el QR y lo dejás a la vista, con la recompensa escrita al lado.",
    },
    {
      lead: "Tu cliente lo escanea y guarda la tarjeta.",
      text: "En Apple Wallet o Google Wallet. Ahí ve sus sellos.",
    },
    {
      lead: "Tu equipo suma con un toque.",
      text: "Escanean la tarjeta desde el celular o la tablet del local y tocan «Sumar sello». Cuando el cliente completa la tarjeta, canjean la recompensa.",
    },
  ],
} as const;

export const benefits = {
  title: "Más motivos para que te elijan",
  items: [
    {
      lead: "Cada cliente nuevo se va con un motivo para volver.",
      text: "No hace falta que sea habitué: desde la primera compra puede llevarse su primer sello y saber cuánto le falta.",
    },
    {
      lead: "Una razón para elegirte a vos y no al de al lado.",
      text: "Si ya tiene sellos en tu tarjeta, tu café es donde le conviene el próximo.",
    },
    {
      lead: "Tu recompensa, siempre a la vista.",
      text: "La tarjeta muestra la recompensa y el progreso cada vez que la abre.",
    },
    {
      lead: "No frenás la fila.",
      text: "Sumar es escanear y un toque. Canjear, dos. Si alguien toca dos veces sin querer, no se suman dos sellos.",
    },
    {
      lead: "No comprás nada.",
      text: "Funciona en el celular o la tablet que ya tenés en el local.",
    },
  ],
  secondary: {
    title: "Y de paso, te olvidás del cartón",
    items: [
      "No imprimís ni reponés cartones.",
      "Sin sellos truchos: los suma solo tu equipo, desde el panel.",
      "No se pierde ni se moja: está en el celular.",
    ],
  },
} as const;

export const objections = {
  title: "Antes de que lo preguntes",
  items: [
    {
      question: "«¿Esto me trae clientes nuevos?»",
      answer:
        "Te lo decimos sin vueltas: no hacemos publicidad por vos. Lo que hace es que cada persona que entra a tu café, aunque sea la primera vez, se vaya con tu tarjeta y un motivo para volver.",
    },
    {
      question: "«Mis clientes no se van a bajar una app.»",
      answer:
        "No bajan nada. La tarjeta va en Apple Wallet (iPhone) o Google Wallet (Android).",
    },
    {
      question: "«Mi equipo no tiene tiempo.»",
      answer:
        "Escanear y un toque. Si el cliente no tiene la tarjeta a mano, lo buscan por nombre o teléfono.",
    },
  ],
} as const;

export const pricing = {
  title: "Un precio claro, sin sorpresas.",
  rows: [
    { label: "Primeros 6 meses", value: "199 UYU por mes", highlight: true },
    { label: "Desde el mes 7", value: "399 UYU por mes", highlight: false },
  ],
  bullets: [
    { lead: "IVA incluido.", text: "" },
    {
      lead: "Sin permanencia.",
      text: "Cancelás cuando quieras desde el panel. El servicio sigue hasta el final del mes que ya pagaste y no se cobra nada más.",
    },
    {
      lead: "Pagás por transferencia bancaria",
      text: "desde el primer mes. Los 6 meses con descuento corren desde que te registrás.",
    },
    {
      lead: "Sin costos extra:",
      text: "la tarjeta se actualiza sola en el Wallet de tus clientes.",
    },
  ],
  includesLead: "Incluye:",
  includes:
    "tu programa de sellos con su QR de caja · la tarjeta en Apple Wallet y Google Wallet · el panel para sumar y canjear · ayuda para arrancar.",
} as const;

export const form = {
  title: "Sumá tu café",
  // CAMBIO vs v6: «Son dos datos. Después te escribimos nosotros.» El formulario
  // de interés pide más de dos datos y todavía no lanzamos.
  subtitle: "Son pocos datos. Todavía no lanzamos: anotate y te escribimos nosotros.",
  summaryTitle: "Revisá estos datos para seguir:",
  fields: {
    businessName: {
      label: "Nombre de tu café (obligatorio)",
      placeholder: "Ej.: Café de la esquina",
      error: "Escribí el nombre de tu café.",
    },
    // NUEVO (no está en v6): campo pedido para la campaña de leads.
    contactName: {
      label: "Tu nombre (obligatorio)",
      placeholder: "Ej.: Lucía",
      error: "Escribí tu nombre.",
    },
    phone: {
      label: "Tu número de contacto (obligatorio)",
      prefixLabel: "Prefijo",
      placeholder: "99 123 456",
      help: "Te escribimos a este número por WhatsApp.",
      error: "Revisá el número. Tiene que ser un teléfono válido.",
    },
    // NUEVO (no está en v6): campo opcional pedido para la campaña de leads.
    email: {
      label: "Email (opcional)",
      placeholder: "vos@tucafe.uy",
      error: "Revisá el email.",
    },
    // NUEVO (no está en v6): campo opcional pedido para la campaña de leads.
    instagram: {
      label: "Instagram de tu café (opcional)",
      placeholder: "@tucafe",
      error: "Revisá el usuario de Instagram.",
    },
  },
  privacyNote: "Usamos estos datos solo para contactarte por tu registro.",
  privacyLink: "Política de privacidad",
  next: {
    title: "Qué pasa después",
    steps: [
      "Alguien del equipo te escribe por WhatsApp.",
      "Te ayudamos a crear tu programa: cuántos sellos y qué recompensa.",
      "Ponés el QR en caja y empezás a sumar clientes.",
    ],
  },
  success: {
    title: "¡Listo! Recibimos tu registro.",
    // CAMBIO vs v6: «Alguien del equipo te va a escribir por WhatsApp para ponerte
    // en marcha.» → se agrega «para contarte cuándo arrancamos y» (pre-lanzamiento).
    text: "Alguien del equipo te va a escribir por WhatsApp para contarte cuándo arrancamos y ponerte en marcha.",
  },
  networkError: "No pudimos registrar tu café. Probá de nuevo.",
  // NUEVO (no está en v6): respuesta al límite de envíos (anti-spam).
  rateLimited: "Hiciste demasiados envíos seguidos. Probá de nuevo en unos minutos.",
} as const;

export const whatsappBlock = {
  title: "¿Preferís preguntar primero?",
  text: "Escribinos. Te responde una persona.",
} as const;

export const faq = {
  title: "Preguntas frecuentes",
  items: [
    {
      q: "¿Me ayuda a conseguir clientes nuevos?",
      a: "Te ayuda a que no se te escapen. Quien entra a tu café puede sumarse con el QR en caja y se va con tu tarjeta. No hacemos publicidad ni le mandamos mensajes a nadie: el motivo para volver es tu recompensa.",
    },
    {
      q: "¿Cómo hace que los de siempre vuelvan?",
      a: "Ven en la tarjeta cuántos sellos llevan y cuánto les falta. Cuando les falta uno, la tarjeta les puede avisar (depende de cómo tengan configurado el celular). Y cuando completan, ven que ya pueden canjear.",
    },
    {
      q: "¿Qué recompensa me conviene?",
      a: "La decidís vos: de 3 a 15 sellos y la recompensa que quieras. Pensala bien, porque por ahora no se puede cambiar después de crear el programa. Cada café tiene un programa.",
    },
    {
      q: "¿Qué pasa si un cliente no tiene Wallet?",
      a: "Por ahora no puede sumarse: no hay versión en papel ni otra opción. En Android tiene que tener una cuenta de Google iniciada.",
    },
    {
      q: "¿Cuánto cuesta y cómo pago?",
      a: "199 UYU por mes los primeros 6 meses desde que te registrás, después 399 UYU. IVA incluido. Se paga desde el primer mes, por transferencia bancaria.",
    },
    {
      q: "¿Tengo que quedarme un tiempo mínimo?",
      a: "No. Cancelás cuando quieras desde el panel. El servicio sigue activo hasta el final del mes que ya pagaste y no se cobra nada más.",
    },
    {
      q: "¿Qué pasa si un cliente cambia de celular?",
      a: "Pide un código desde la página de tu café, le llega por email y recupera la misma tarjeta con sus sellos.",
    },
    {
      q: "¿Qué pasa con los datos de mis clientes?",
      // `{{marca}}` y el link a la política se interpolan al renderizar.
      a: "Cada cliente acepta participar y, aparte, decide si quiere recibir mensajes en el futuro; ninguna casilla viene marcada. Tu equipo ve solo el nombre y parte del teléfono, nunca el email. Los datos los cuida {{marca}}.",
      privacyLink: true,
    },
    {
      q: "¿Sirve para otro tipo de comercio?",
      a: "Por ahora es solo para cafés.",
    },
  ],
} as const;

export const finalCta = {
  title: "Que el cliente de hoy tenga un motivo para volver mañana.",
} as const;

export const footer = {
  privacy: "Política de privacidad",
  terms: "Términos de la oferta",
  termsPending: "[PENDIENTE]",
  prices: "Precios en pesos uruguayos, IVA incluido. Sin permanencia.",
  trademarks:
    "Apple Wallet es una marca de Apple Inc. Google Wallet es una marca de Google LLC.",
} as const;

export const meta = {
  title: "Tarjeta de sellos en Wallet para cafés",
  description: hero.subtitle,
} as const;
