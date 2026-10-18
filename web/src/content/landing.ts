/**
 * Copy de la landing de comercios — v6 (docs/copy/landing-copy.md), palabra por palabra.
 *
 * Excepciones: la campaña es PRE-lanzamiento (registro de interés), así que
 * el CTA del formulario y el mensaje de éxito se ajustaron mínimamente, y se
 * reescribieron el hero, «Cómo te ayuda a crecer» y «Cómo funciona».
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
  // CAMBIO vs v6: se sacó «IVA incluido».
  detail: "Después, 399 UYU por mes. Sin permanencia.",
  short: "Sin permanencia.",
} as const;

export const hero = {
  // CAMBIO vs v6: eyebrow sobre el título.
  eyebrow: "Aumentá la lealtad y hacé que tus clientes vuelvan a comprarte.",
  // CAMBIO vs v6: el título pasa de «Sumá clientes nuevos…» a la promesa de la próxima visita.
  title: "Que tu cliente de hoy tenga otro motivo para volver mañana.",
  // CAMBIO vs v6: la bajada ya no abre con el QR en caja.
  subtitle:
    "Convertí cada visita en la próxima. Tus clientes se llevan tu tarjeta de sellos en el celular después de haber comprado en tu café, sin bajar ninguna app, y siempre tienen un motivo para volver.",
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
          // CAMBIO vs v6: el primer ítem de «Clientes nuevos» habla de la primera visita, no del QR.
          lead: "Si alguien va a tu café por primera vez,",
          text: "se llevarán una tarjeta con puntos o sellos.",
        },
        {
          lead: "Sin vueltas para empezar.",
          // CAMBIO vs v6: aclara que la tarjeta queda en la billetera del celular.
          text: "No bajan ninguna app: completan nombre, WhatsApp y email y guardan la tarjeta en su billetera del iPhone o Android.",
        },
        {
          lead: "Se van con tu café en el celular.",
          // CAMBIO vs v6: cierra con el motivo de tener el nombre del café a la vista.
          text: "La tarjeta lleva el nombre de tu café, al lado de las otras tarjetas que usan, para que te recuerden siempre.",
        },
      ],
    },
    {
      title: "Los de siempre",
      items: [
        {
          lead: "Ven cuánto les falta.",
          // CAMBIO vs v6: el progreso queda en la billetera del celular y se actualiza solo.
          text: "El progreso queda en la billetera del celular de tu cliente y se actualiza automáticamente.",
        },
        {
          lead: "Un empujón al final.",
          text: "Cuando les falta uno, la tarjeta les puede avisar que les falta 1 para la recompensa.",
        },
        {
          // CAMBIO vs v6: ya no habla de recuperar la tarjeta al cambiar de celular.
          lead: "Los ayuda a pensar siempre en tu marca.",
          text: "Y a volver a comprarte.",
        },
      ],
    },
  ],
} as const;

export const howItWorks = {
  title: "Cómo funciona",
  // CAMBIO vs v6: los tres pasos siguen la compra del cliente, no el alta del café.
  steps: [
    {
      lead: "Compra en tu café",
      text: "Tu cliente pide lo de siempre y escanea el QR que tenés en la caja.",
    },
    {
      lead: "Se lleva tu tarjeta",
      text: "Le queda en el celular, sin bajar ninguna app, y suma un sello con cada compra.",
    },
    {
      lead: "Vuelve por su recompensa",
      text: "Ve cuánto le falta y tiene un motivo para volver. La gente vuelve a donde la recompensan.",
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
      // CAMBIO vs v6: sellar es escanear el código del cliente, sin frenar la fila.
      lead: "Sellar es así de fácil.",
      text: "Escaneás el código de tu cliente y le sumás un sello, sin frenar la fila.",
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
  // CAMBIO vs v6: sin IVA ni transferencia. Quedan cancelación y actualización de la tarjeta.
  bullets: [
    {
      lead: "Cancelás cuando quieras desde el panel.",
      text: "Seguís usándolo hasta el final del mes que pagaste.",
    },
    {
      lead: "La tarjeta se actualiza sola en el Wallet de tus clientes,",
      text: "sin costos extra.",
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
      // CAMBIO vs v6: sin IVA ni forma de pago.
      q: "¿Cuánto cuesta?",
      a: "199 UYU por mes los primeros 6 meses desde que te registrás, después 399 UYU.",
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
  // CAMBIO vs v6: se sacó «IVA incluido».
  prices: "Precios en pesos uruguayos. Sin permanencia.",
  trademarks:
    "Apple Wallet es una marca de Apple Inc. Google Wallet es una marca de Google LLC.",
} as const;

export const meta = {
  title: "Tarjeta de sellos en Wallet para cafés",
  description: hero.subtitle,
} as const;
