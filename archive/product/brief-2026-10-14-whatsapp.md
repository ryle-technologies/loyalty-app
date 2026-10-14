# Product brief — Sellos por WhatsApp + Wallet para cafés (replanteo del MVP)

| | |
|---|---|
| **Fecha** | 2026-10-14 |
| **Base** | PRD MVP Soft Launch v2 (owner Júlia, 2026-10-13) + propuesta acordada con Martin |
| **Mercados** | Uruguay (soft launch si hay lead real en 14 días) y Colombia |
| **Reemplaza a** | brief del 2026-09-16 (copia en `brief.2026-09-16.bak.md`) |
| **Próximo owner** | John → actualizar PRD (v3) con Júlia, que es dueña de las decisiones L1–L15 |

## Visión

Que un café chico tenga una tarjeta de sellos que el cliente no pierde y que el equipo maneja en segundos, sin que nadie se descargue una app. El cliente se suma escaneando un QR en la caja, lleva la tarjeta en Apple/Google Wallet y recibe por WhatsApp solo los avisos que le sirven. El café ve que la gente vuelve y paga por eso.

## Usuarios

- **Dueño/a del café** (comprador). Un local, sin equipo de marketing. Lo contrata para que vuelvan más los clientes de siempre y para dejar la tarjeta de cartón, sin aprender un CRM.
- **Barista / cajero** (operador). Lo usa entre pedidos: sumar o canjear tiene que llevarle menos de 10 segundos.
- **Cliente del café**. No va a instalar nada. Le alcanza con escanear una vez, tener la tarjeta en el celular y ver cuánto le falta.

## Problema

La tarjeta de cartón se pierde y se puede falsificar. Las apps de fidelización son pesadas para un local chico. El PRD v2 resolvía el alta con una **invitación iniciada por el café** (una plantilla de WhatsApp que pide responder *SÍ*). Eso trae cuatro problemas:
1. Para el cliente, parece marketing.
2. Cada invitación es un mensaje pago.
3. El opt-in es débil.
4. Si el número tiene varias invitaciones pendientes, no está claro a cuál responde *SÍ*.

Además, el PRD dejaba Wallet para la fase 2. Eso hacía que todo el "ver mi progreso" dependiera de mensajes de WhatsApp, que tienen costo.

**¿Por qué ahora?** Desde el **1-oct-2026** Meta cobra también los mensajes de servicio y los de utilidad enviados dentro de la ventana de 24 h (ver Riesgos). Cada mensaje cuenta, así que conviene cambiar el diseño antes de construir.

## Solución (lo mínimo que prueba la visión)

1. **Alta por QR en caja.** El cliente escanea y se abre WhatsApp con un mensaje ya escrito que lleva el código del café (ej. `Hola, quiero sumarme #CR12`). Como el cliente escribe primero, el opt-in es explícito y queda asociado a ese café, y la respuesta va dentro de la ventana de servicio de 24 h. No hace falta la plantilla de invitación y desaparece la ambigüedad del *SÍ*.
2. **Un solo número de WhatsApp de la app para todos los cafés.** El código del mensaje identifica al café. Más adelante, un número propio por café puede ser un upsell.
3. **Tarjeta en Apple/Google Wallet desde el MVP (versión simple).** La respuesta de alta trae el enlace al pase. El pase muestra un QR que el barista escanea para sumar o canjear. Cada cambio en los sellos actualiza el pase por push, sin costo por mensaje. El NFC queda para después.
4. **Plantillas pagas solo para avisos que le sirven al cliente.** Son dos: "te falta 1" y "hace 3 semanas que no venís". No se manda un WhatsApp por cada sello: el progreso del día a día se ve en el pase.
5. **Panel mínimo.** Buscar o escanear, sumar sello y canjear, en 3 toques o menos. Se mantienen el ledger append-only, la idempotencia, los topes y los sellos no transferibles.
6. **Operación manual en el piloto.** El cobro, el trial y los cupos founding se llevan en una planilla.

## Alcance

**Dentro:** alta por QR + mensaje prellenado con código del café · número compartido · pase Wallet (QR + actualización push) · panel sumar/canjear con escaneo o búsqueda por teléfono · ledger, idempotencia, topes 2/1, sellos no transferibles · sellos de bienvenida tras el alta · 2 plantillas de valor · *BAJA* por comercio · copy en español rioplatense/neutro, adaptado a UY y CO.

**Fuera (o diferido; detalle en `addendum.md`):** plantilla de invitación iniciada por el café · WhatsApp por cada sello · NFC / Apple VAS · número propio por café · cambio de teléfono · dashboard de KPIs y sugerencias por reglas · billing y founding en el sistema · confirmación en persona · merge dual-OTP · app de cliente · caducidad de sellos · campañas de marketing.

## Qué cambia frente al PRD v2

| Tema | PRD v2 | Este brief |
|---|---|---|
| Alta | El staff invita por teléfono; plantilla de invite; el cliente responde *SÍ* | El cliente escanea el QR y escribe primero con `#CODIGO`; el café responde dentro de la ventana |
| Inbound | Solo *SÍ* / *BAJA* | Mensaje de alta con código + *BAJA* (sin conversación) |
| Número | `whatsapp_sender_id?` por comercio (sin definir) | Un número compartido (decisión de Martin) |
| Wallet | Diferido (E-PSY-6, P2) | Dentro del MVP, versión QR + push |
| WhatsApp por evento | 1 WA por earn/burn (5 plantillas) | 2 plantillas de valor; el progreso va en el pase |
| *BAJA* | Afecta a todas las memberships del número (OQ-11) | Por comercio |
| Cambio de teléfono | En el MVP (E6) | Diferido |
| Dashboard | KPIs §8.4 + sugerencias (E7) | Diferido; métricas del piloto se sacan por consulta interna |
| Billing / founding | En el modelo (E8) | Planilla manual |
| Copy | Español de España ("te apuntas", "puedes") | Rioplatense/neutro, adaptado a UY y CO |

Toca decisiones locked: **L4** (inbound) y **L10** (KPIs del dashboard). También cambia el diferimiento de Wallet. Todo esto necesita el OK de Júlia.

## Métricas de éxito (piloto de 4 semanas por café)

- **≥50 %** de los clientes a los que se les ofrece se suman. El denominador lo cuenta el café en caja durante la primera semana; hay que definir cómo.
- **Al menos 1 canje real.**
- El café **sigue usándolo** en la semana 4, con sellos todas las semanas.
- El café **acepta pagar** al terminar las 4 semanas.
- Señales secundarias, sin metas: % de altas que agregan el pase a Wallet, tasa de *BAJA*, tiempo por sello en caja.

## Riesgos

- **Costo de WhatsApp.** Según Meta, desde el 1-oct-2026 se cobran los mensajes de servicio y los de utilidad dentro de la ventana. Hay **1.000 mensajes de servicio gratis por mes por número de empresa**. Uruguay se factura con la tarifa de "Resto de Latinoamérica" y Colombia tiene tarifa propia. Fuente: https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing (consultado 2026-10-14). Con **un número compartido, esos 1.000 gratis se reparten entre todos los cafés**. Tarifas en USD por mensaje entregado, desde el 1-oct-2026, **tomadas de fuentes de terceros** que citan la tabla de Meta (no pude abrir la tabla oficial): utilidad/servicio **CO 0,0008**, **Resto de LatAm (UY) 0,0113**; marketing CO 0,0125, Resto de LatAm 0,074. Fuentes: whautomate.com/whatsapp-pricing-updates, supabuz.com/whatsapp-api-rates, omnichannels.ai/whatsapp-pricing/colombia (2026-10-14). Hay que confirmarlas con la tabla oficial antes de fijar precio. El costo por café no está calculado.
- **Que la plantilla salga categorizada como marketing.** "Hace 3 semanas que no venís" puede quedar como marketing y no como utilidad, y la tarifa es mucho más alta. Hay que validar la categoría al enviarla a aprobación.
- **Número compartido.** La reputación y la calidad del número son de todos: un café que genera *BAJA* o reportes afecta a los demás. El nombre que ve el cliente es el de la app, no el del café.
- **Wallet.** Hay que gestionar certificados (Apple Developer, USD 99/año según `apple-wallet-research.md`) y el web service de actualización. Puede pasar que el cliente no agregue el pase y haya que buscarlo por teléfono.
- **Fricción del QR.** Si el cliente no escanea, no hay alta. Plan B: el barista busca o carga el teléfono (por definir).
- **Protección de datos.** UY, Ley 18.331: consentimiento libre, previo, expreso, informado y documentado, e inscripción de la base ante la URCDP (90 días desde el inicio de actividades). CO, Ley 1581 de 2012: autorización previa, expresa e informada que se pueda consultar después; política de tratamiento; Registro Nacional de Bases de Datos ante la SIC (Decreto 886/2014). Fuentes: bps.gub.uy/bps/file/8292/1/ley_18331.pdf, guía URCDP en gub.uy, funcionpublica.gov.co (norma i=49981). Que el cliente escriba primero ayuda a documentar el consentimiento, pero falta revisión legal. Tampoco está definido quién es responsable y quién encargado (¿la app o el café?).

## Preguntas abiertas

1. Costo real por café y por mes en UY y CO, con la tabla oficial de Meta y el volumen esperado de mensajes de servicio y de las 2 plantillas.
2. *BAJA* por comercio con número compartido: ¿cómo sabemos de qué café se da de baja? Opciones: `BAJA #CR12`, o el último café con el que interactuó, o un botón dentro de la ventana.
3. Fecha de inicio de la ventana founding (`launch_date`): sigue sin estar clara. En el piloto, ¿cuenta el alta en la planilla?
4. Copy final adaptado a UY (voseo: "sumate", "venís") y a CO (tú/usted). ¿Un texto neutro o una variante por país?
5. ¿Quién es responsable y quién encargado del tratamiento de datos? ¿Hay que inscribir la base en URCDP/SIC antes del piloto?
6. Fallback si el cliente no tiene WhatsApp o no agrega el pase.
7. ¿Los sellos de bienvenida siguen en 2 con el nuevo flujo?

## Recomendación

**Afinar y pasar a PRD v3.** La dirección es sólida y achica el alcance. Antes de construir hay que cerrar dos cosas: la pregunta 1 (costo), porque el cambio de precios de Meta afecta directamente al número compartido, y la pregunta 2 (*BAJA* por comercio). Owner siguiente: **John**, con OK de **Júlia** sobre L4/L10 y Wallet.
