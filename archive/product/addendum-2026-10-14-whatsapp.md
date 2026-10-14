# Addendum — replanteo MVP (2026-10-14)

Copia del addendum anterior: `addendum.2026-09-16.bak.md`.

## Descartado o diferido, con motivo

| Ítem (PRD v2) | Decisión | Motivo |
|---|---|---|
| Plantilla de invitación iniciada por el café + *SÍ* (FR-011/013/041, US-E2-01/02) | Descartado | Parece marketing, es un mensaje pago, el opt-in es débil y el *SÍ* es ambiguo con varias invitaciones. Lo reemplaza el alta por QR con mensaje prellenado |
| Confirmación en persona (FR-017, US-E2-03) | Descartado | Existía como fallback del *SÍ*; con el alta por QR no hace falta |
| Reenvío de invitación (A8) | Descartado | Ya no hay invitación saliente |
| 1 WA por cada earn/burn (FR-040, plantillas earn/burn/bienvenida) | Descartado | Es costo por mensaje en cada visita. El progreso se ve en el pase de Wallet (push sin costo). Quedan 2 plantillas de valor |
| Hitos "¡Casi!/¡Uno más!" dentro del WA de earn (E-PSY-3) | Cambia | "Te falta 1" pasa a ser una plantilla propia; el hito puede mostrarse en el pase |
| Número propio por café | Diferido (upsell) | Decisión de Martin: un número compartido en el MVP |
| NFC / Apple VAS | Diferido | Apple exige un certificado NFC especial con aprobación y hace falta un lector. QR alcanza (ver `apple-wallet-research.md`) |
| Cambio de teléfono local (E6, FR-050) | Diferido | Poco frecuente en un piloto; se resuelve a mano por soporte |
| Dashboard KPIs §8.4 + sugerencias (E7) | Diferido | Las métricas del piloto se sacan del ledger por consulta interna |
| Subscription/founding en el sistema (E8) | Diferido → planilla | Pocos cafés en el piloto; el cobro es manual (L6 ya lo permitía) |
| Merge dual-OTP, prepago anual | Sigue diferido | Sin cambios |
| *BAJA* global del número (OQ-11) | Descartado | Debe ser por comercio. Con número compartido, una baja global castiga a los demás cafés |

## Datos recogidos (2026-10-14)

- **Meta, página oficial de precios** (https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing; la URL /docs/whatsapp/pricing/ redirige a esa). Lo que dice:
  - Cobro por mensaje entregado.
  - Desde el 1-oct-2026 se cobran de nuevo los mensajes de servicio, con un **nivel gratuito de 1.000 mensajes de servicio entregados por mes por número de empresa**, que no se acumula de un mes a otro.
  - Los mensajes de utilidad enviados en respuesta dentro de la ventana de atención también pasan de `free_customer_service` a `regular`.
  - Uruguay figura dentro de "Resto de Latinoamérica"; Colombia tiene tarjeta propia.
  - Las tarifas de utilidad y autenticación tienen niveles de volumen mensuales.
  - Las tablas de tarifas (CSV) **no las pude abrir** desde el fetch.
- **Tarifas USD citadas por terceros** (desde el 1-oct-2026; **no verificadas contra el CSV oficial**):

  | Mercado | Marketing | Utilidad | Servicio |
  |---|---|---|---|
  | Colombia | 0,0125 | 0,0008 | 0,0008 |
  | Resto de LatAm (incluye UY) | 0,074 | 0,0113 | 0,0113 |

  Fuentes: whautomate.com/whatsapp-pricing-updates · supabuz.com/whatsapp-api-rates · omnichannels.ai/whatsapp-pricing/colombia · carlosbetancur.co/en/blog/whatsapp-service-pricing-october-2026-costs/. Las fuentes coinciden entre sí.
- **Datos personales.** Fuentes: Ley 18.331 UY (art. 9 consentimiento; arts. 28–29 inscripción), guía URCDP para mipymes (inscripción en 90 días) y Ley 1581/2012 CO (art. 9 autorización; art. 25 RNBD, Decreto 886/2014). Esto es solo una verificación breve, no asesoramiento legal.
- **Wallet:** Apple Developer USD 99/año y QR suficiente (ver `apple-wallet-research.md`; detalles de Google en `google-wallet-research.md`).

## Alternativas consideradas

- **Número propio por café desde el día 1.** Cada café tendría su nombre y sus 1.000 mensajes gratis, pero suma onboarding y verificación de Meta por café. Martin eligió el número compartido.
- **Sin WhatsApp, solo Wallet.** Pierde los avisos de valor y la entrada familiar para el cliente. No se eligió.

## Entrevistas

- Ninguna nueva en esta pasada.
