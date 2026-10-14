# Addendum — MVP Wallet (Uruguay, sin WhatsApp al cliente) · 2026-10-14

Versiones anteriores: `archive/product/addendum-2026-10-14-whatsapp.md`, `archive/product/addendum-2026-09-16.md`.

## Decisiones cerradas (Martin)

Ver tabla D1–D8 en `docs/product/brief.md`. Resumen: responsable = la app (URCDP); email obligatorio + recuperación por email; sin plan B Wallet; sin founding (trial 6 meses al 50 %); UY primero / voseo; Apple Developer prerrequisito; WhatsApp del cliente se guarda para el futuro; landing de comercios con click-to-chat humano.

## Descartado o diferido

| Ítem | Decisión | Motivo |
|---|---|---|
| WhatsApp al cliente en el piloto | Diferido | Costos Meta desde 1-oct-2026 (abajo). El progreso va en el pase |
| Reactivación "hace 3 semanas…" | Diferido | Usa el WhatsApp ya capturado + consentimiento (b) |
| Número propio WA por café | Diferido (upsell) | Sin WA en el piloto |
| Alta QR → WA prellenado | Reemplazado | Formulario web + doble consentimiento |
| Plantilla invite + *SÍ*, confirmación en persona, reenvío | Descartado | Ya no hay invitación |
| Tarjeta web / plan B sin Wallet | Diferido | Decisión D3: fuera del piloto |
| Ventana founding / 50 slots / 149 MXN | Descartado | D4: trial fijo 6 meses al 50 % para todos |
| Colombia / Ley 1581 / SIC | Diferido | D5: UY primero |
| NFC / Apple VAS | Diferido | QR alcanza |
| Cambio teléfono (E6), dashboard (E7), billing en sistema (E8) | Diferido | Alcance del piloto |
| *BAJA* global WA | Descartado | Baja = borrar pase + enlace por comercio |
| Merge dual-OTP, prepago anual | Diferido | Sin cambios |

## Precios Meta (motivo de diferir WhatsApp al cliente)

- Oficial: https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing (consultado 2026-10-14).
  - Desde 1-oct-2026 se cobran mensajes de servicio; 1.000 gratis/mes por número de empresa.
  - Utilidad dentro de la ventana pasa a cobrarse (`regular`).
  - UY = "Resto de Latinoamérica"; CO tiene tarifa propia.
  - CSV oficial no se pudo abrir.
- Tarifas USD de terceros (no verificadas): utilidad/servicio CO 0,0008 / Resto LatAm (UY) 0,0113; marketing CO 0,0125 / Resto LatAm 0,074. Fuentes: whautomate, supabuz, omnichannels.ai, carlosbetancur.co.
- El WhatsApp de la **landing de comercios** es click-to-chat humano, **sin API**, sin costo Meta.

## Datos personales

- Responsable: **la app** (D1). Inscribe la base ante la URCDP (Ley 18.331 arts. 9, 28–29; guía URCDP: 90 días desde inicio de actividades).
- Consentimientos documentados por café en el formulario del cliente.
- Ley 1581 CO / RNBD-SIC: diferido hasta entrar a Colombia.

## Wallet / Apple

- Prerrequisito: abrir cuenta Apple Developer (USD 99/año, `docs/tech/apple-wallet-research.md`).
- Si el cert de Pass Type ID vence: pases instalados siguen, pero no hay updates.

## Entrevistas

- Ninguna nueva.

## Requisitos descartados en PRD v3 (2026-10-14)

- FR-011/013/016/017/041/043/044 de v2 (invite, *SÍ*, confirmación en persona, *BAJA* por WA): reemplazados por FR-C01..C06 y FR-W06.
- FR-040/042 (plantillas WA y estado de envío): sin WA al cliente.
- FR-050 (cambio de teléfono local): diferido; recuperación por email (FR-W05).
- FR-060/061 (founding): reemplazado por FR-B01 (trial 6 meses al 50 %).
- FR-033/034, FR-070/071 (dashboard y sugerencias): diferidos.
- Nuevos: FR-L01..L04 (landing de comercios; WhatsApp click-to-chat humano, sin API).
