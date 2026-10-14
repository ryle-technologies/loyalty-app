# PRD v3 — MVP Sellos en Wallet (Uruguay)

| Campo | Valor |
|---|---|
| **Versión** | v3 — borrador 2026-10-14 |
| **Owner** | John |
| **Estado** | **Pendiente de aprobación de Martin y Júlia** |
| **Base** | `docs/product/brief.md` (2026-10-14) + PRD v2 (Júlia, 2026-10-13): `archive/product/prd-v2-2026-10-13.md` |
| **Idioma** | Español rioplatense (voseo) |
| **Mercado** | Uruguay |

## 1. Problema y usuarios

Los cafés chicos pierden clientes recurrentes porque la tarjeta de cartón se pierde o se falsifica, y las apps de fidelización son pesadas. El MVP les da una tarjeta de sellos en Apple/Google Wallet que el barista escanea en segundos, sin app de cliente y sin mensajes pagos.

| Actor | Necesidad | Canal |
|---|---|---|
| Dueño/a del comercio | Conocer el producto, registrarse, configurar el programa, ver que la gente vuelve | Landing de comercios + panel web |
| Staff (barista/cajero) | Sumar y canjear en ≤3 toques | Panel web (celular/tablet) |
| Cliente | Sumarse una vez, ver su progreso, canjear | QR en caja → web → Wallet |
| Plataforma (nosotros) | Onboarding, cobro manual, soporte, cumplimiento de datos | Planilla + herramientas internas |

## 2. Objetivos y no-objetivos

**Objetivos (éxito del piloto por café, ambos obligatorios):**
1. Al menos 1 canje real.
2. El café sigue activo y paga el mes 2.

**No-objetivos:** mensajes al cliente, reactivación automática, multi-país, cobro automatizado, analytics avanzados.

## 3. Alcance

**Dentro:** landing de comercios · formulario del cliente con doble consentimiento · pase Wallet (QR + push + "te falta 1") · recuperación por código al email · **1 programa por café** (sellos + recompensa configurables, con su propio QR y su pase) · panel sumar/canjear · ledger append-only con idempotencia y topes · baja del cliente por comercio · baja del servicio pedida por el dueño desde el panel (efectiva al fin del mes pagado) · solo cafés · registro de consentimientos · copy en voseo.

**Fuera:** ver §10.

## 4. Requisitos funcionales

### Landing de comercios
- **FR-L01 — Landing visible.** Given un visitante (comercio) entra a la URL de la landing, When carga la página, Then ve qué es el producto, cómo funciona para el café y para el cliente, y el CTA de registro con la oferta: «Registrate ahora y pagá 199 UYU por mes durante los primeros 6 meses.» *[repo: actualizado según decisión de Martin 2026-10-14, ver DECISIONS.md]* El copy está en voseo.
- **FR-L02 — Registro de comercio.** Given un visitante completa el formulario con *nombre del comercio* y *número de contacto*, ambos obligatorios y válidos (el *rubro* se envía como campo oculto con valor fijo `café`; no se muestra), When lo envía, Then se crea un registro de comercio con fecha de alta y se muestra una confirmación que dice que alguien del equipo lo va a contactar para el onboarding *[repo: actualizado, ver DECISIONS.md]*. Given un campo obligatorio vacío o inválido, When lo envía, Then se marca el error y no se crea el registro.
- **FR-L03 — Notificación interna del registro.** Given un comercio nuevo registrado, When se guarda, Then Martin recibe aviso interno (canal por definir) y el registro queda en la planilla de comercios. El onboarding es **manual, a cargo de Martin**.
- **FR-L04 — WhatsApp para consultas.** Given un visitante en la landing, When toca el botón de WhatsApp, Then se abre un chat click-to-chat (`wa.me`) con el número de consultas (por definir, OQ-4) y un mensaje inicial prellenado. Lo atiende una persona; no hay integración con la API de WhatsApp ni costo por mensaje de Meta.

### Alta del cliente
- **FR-C01 — QR en caja.** Given un comercio activo, When el cliente escanea el QR del comercio, Then se abre la página de alta identificada con ese comercio (nombre, recompensa y cantidad de sellos configurada por el café, visibles).
- **FR-C02 — Campos obligatorios.** Given la página de alta, When el cliente envía el formulario, Then se exigen *nombre*, *número de WhatsApp* (validado y guardado en E.164) y *email* (formato válido). Si falta alguno o es inválido, Then se muestra el error y no se crea el alta.
- **FR-C03 — Consentimientos.** Given la página de alta, Then se muestran dos casillas **separadas y sin marcar**: (a) participar del programa, (b) recibir mensajes en el futuro. When el cliente envía sin marcar (a), Then el alta se rechaza con mensaje claro. When envía con (a) marcada y (b) sin marcar, Then el alta se crea con `consent_messages=false`.
- **FR-C04 — Constancia del consentimiento.** Given un alta válida, When se crea, Then se guarda por cada casilla: valor, versión del texto aceptado, fecha/hora y comercio. Esos registros no se editan ni se borran desde el panel del comercio.
- **FR-C05 — Identidad.** Given un teléfono que ya existe como persona, When se da de alta en otro comercio, Then se reutiliza la persona y se crea una membresía nueva con saldo independiente. Given que ya tiene membresía en ese comercio, Then no se duplica y se ofrece recuperar el pase (FR-W05).
- **FR-C06 — Sin plan B.** Given un dispositivo sin Apple/Google Wallet disponible, When intenta agregar el pase, Then se muestra un mensaje explicando que el piloto requiere Wallet. No se ofrece tarjeta web.

### Pase Wallet
- **FR-W01 — Emisión del pase.** Given un alta válida, When el cliente toca "Agregar a Apple Wallet" o "Agregar a Google Wallet", Then recibe un pase del comercio con nombre del comercio, recompensa, progreso `actual / N` y un QR que identifica la membresía (no el teléfono en claro).
- **FR-W02 — Actualización por push.** Given un pase instalado, When cambia el saldo (sumar, canjear, ajuste), Then el pase se actualiza por el mecanismo push de Apple/Google sin intervención del cliente.
- **FR-W03 — "Te falta 1".** Given un sumar que deja `faltan = 1`, When el pase se actualiza, Then el campo cambiado dispara la notificación de cambio con el texto "Te falta 1 para {{recompensa}}". Given cualquier otro sumar, Then no se fuerza notificación con texto de urgencia.
- **FR-W04 — Recompensa disponible.** Given `saldo ≥ N`, When se actualiza el pase, Then muestra "¡Ya podés canjear {{recompensa}}!".
- **FR-W05 — Recuperación por email.** Given un cliente que perdió el pase o cambió de celular, When ingresa su teléfono o email en la página de recuperación del comercio, Then se envía un código de un solo uso al email registrado. When ingresa el código correcto antes de que venza, Then puede volver a agregar el mismo pase (mismo saldo). Given un código incorrecto o vencido, Then no se entrega el pase. Los intentos tienen límite (valor a definir en arquitectura).
- **FR-W06 — Baja.** Given un pase instalado, Then el reverso del pase incluye un enlace de baja. When el cliente confirma la baja, Then se revoca su consentimiento con ese comercio, la membresía queda inactiva y el pase deja de actualizarse. Otras membresías de la misma persona no cambian.

### Panel del comercio
- **FR-P01 — Login.** Given credenciales válidas de staff, When inicia sesión, Then ve solo los datos de su comercio.
- **FR-P02 — Sumar sello escaneando.** Given staff en el panel, When escanea el QR del pase y toca "Sumar sello", Then se registra un evento `earn` (+1) en ≤3 toques desde el inicio y el pase se actualiza (FR-W02).
- **FR-P03 — Buscar sin pase a mano.** Given un cliente sin el pase a mano, When el staff busca por teléfono o nombre, Then ve la membresía (teléfono enmascarado) y puede sumar o canjear.
- **FR-P04 — Canjear.** Given `saldo ≥ N`, When el staff toca "Canjear {{recompensa}}" y confirma, Then se registra `burn` (−N) en una transacción y el pase se actualiza. Given saldo insuficiente, Then se rechaza con mensaje claro.
- **FR-P05 — Idempotencia.** Given un doble toque o reintento con la misma `idempotency_key`, When llega la segunda solicitud, Then no se crea un segundo evento y se devuelve el mismo resultado.
- **FR-P06 — Topes.** Given una membresía que ya alcanzó el tope diario (default de v2: 2 sumar / 1 canje por día, zona horaria del comercio), When se intenta otro, Then se rechaza con el motivo. Los topes son antifraude y no dependen de cuántos sellos pide el café, así que se mantienen.
- **FR-P07 — Crear el programa.** Given un café sin programa, When el dueño crea un programa con nombre, cantidad de sellos para la recompensa (N) y recompensa (texto, ej. "un café gratis") válidos, Then el programa queda activo con su propio QR de caja para imprimir. No hay valores fijos de producto ni sellos de bienvenida.
- **FR-P07a — QR y pase por programa.** Given un programa activo, When el cliente escanea su QR, Then la página de alta corresponde a ese programa y el pase de Wallet que recibe pertenece a ese programa (muestra su nombre, `actual / N` y la recompensa). Cada sello y canje se registra contra ese programa.
- **FR-P07b — Validación.** Given un N menor que 3 o mayor que 15 (rango válido: 3 a 15, inclusive), o una recompensa vacía, When el dueño crea el programa, Then se rechaza con el mensaje «La cantidad de sellos tiene que estar entre 3 y 15» (o el error de recompensa) y no se crea el programa. Given N entre 3 y 15 y recompensa no vacía, Then se crea (FR-P07).
- **FR-P07c — Solo el dueño.** Given un usuario con rol staff, When intenta crear el programa, Then se rechaza (403) y no cambia nada.
- **FR-P07d — Reglas bloqueadas después de crear.** Given un programa ya creado, When el dueño (o cualquier usuario) intenta cambiar la cantidad de sellos o la recompensa, Then el panel las muestra en solo lectura, la API rechaza el cambio y no se modifica nada. Editar reglas es alcance futuro.
- **FR-P07e — Un solo programa en el MVP.** Given un café que ya tiene un programa, When el dueño intenta crear otro, Then se bloquea con el mensaje «Por ahora podés tener un solo programa» y no se crea nada. (Varios programas por café es futuro; ver §5 y §10.)
- **FR-P08 — Ledger.** Given cualquier cambio de saldo, Then se guarda como evento append-only (`earn`/`burn`/`adjust`); las correcciones son `adjust` con motivo, solo dueño; los sellos no se transfieren entre personas.

### Cobro (manual)
- **FR-B01 — Precio.** Given un comercio que se registra, When queda dado de alta, Then en la planilla figura a **199 UYU por mes durante 6 meses desde la fecha de registro** (50 % bonificado) y después a **399 UYU por mes**, **IVA incluido**. No existe ventana ni cupos founding.
- **FR-B02 — Cobro desde el primer día.** Given un comercio registrado, Then el primer mes se cobra desde el registro; no hay período gratis de piloto.
- **FR-B03 — Pago por transferencia.** Given un mes a cobrar, When el comercio paga por transferencia bancaria, Then Martin registra el pago a mano en la planilla (fecha, monto, mes cubierto).
- **FR-B04 — Sin permanencia.** Given un comercio activo, Then puede cancelar en cualquier momento, sin plazo mínimo ni penalidad.

### Baja del comercio
- **FR-X01 — Pedir la baja desde el panel.** Given el dueño en el panel, When toca «Cancelar servicio» y confirma, Then se registra el pedido con fecha, Martin recibe aviso y el panel muestra «Tu servicio sigue activo hasta el {{fin_mes_pagado}}». Given un usuario staff, When intenta cancelar, Then se rechaza (403).
- **FR-X02 — Efecto al final del mes pagado.** Given un pedido de baja, When todavía no terminó el mes ya pagado, Then el panel sigue funcionando normal (sumar, canjear, altas). When llega la fecha efectiva, Then el comercio queda inactivo, el panel deja de permitir operaciones y no se cobran más meses.
- **FR-X03 — Pases después de la baja (propuesta, OQ-12).** Given la fecha efectiva de baja, When se actualizan los pases de los clientes de ese programa, Then muestran «Este programa terminó» y no se pueden sumar sellos ni canjear. El QR de caja deja de dar de alta clientes nuevos.
- **FR-X04 — Arrepentimiento.** Given un pedido de baja aún no efectivo, When el dueño lo anula desde el panel, Then el servicio sigue activo sin cambios (propuesta, OQ-13).

## 5. Requisitos no funcionales

- **Datos personales (Uruguay, Ley 18.331):** la app es responsable del tratamiento. La base se inscribe ante la URCDP antes o dentro del plazo legal (guía URCDP: 90 días desde el inicio de actividades). Consentimiento documentado (FR-C04). Minimización: el staff ve teléfonos enmascarados.
- **Seguridad:** HTTPS; auth en todas las mutaciones; aislamiento por comercio; códigos de recuperación de un solo uso con vencimiento y límite de intentos; el QR del pase no expone datos personales.
- **Wallet:** cuenta Apple Developer abierta y certificado Pass Type ID vigente (prerrequisito). Vencimiento de certificados monitoreado.
- **Rendimiento:** sumar/canjear utilizable entre pedidos (objetivo de UX ~10 s; sin SLA formal).
- **Modelo de datos (nota para Winston):** en el MVP hay 1 programa por café, pero el modelo y la arquitectura no deben impedir varios programas por café en el futuro (ej. café y tortas): QR, pase, saldo y ledger se asocian al programa, no solo al comercio.
- **Localización:** todo el copy (landing, alta, pase, emails, panel) en voseo; moneda y zona horaria por comercio.

## 6. Implicaciones de UX (Sally define specs)

- El formulario del cliente tiene que completarse rápido con fila en caja; mostrar progreso y recompensa antes de pedir datos.
- Las dos casillas deben leerse claras y separadas; ninguna premarcada.
- Botones "Agregar a Apple/Google Wallet" según el dispositivo.
- Panel con botones grandes para sumar/canjear y escaneo directo desde la cámara.
- Landing de comercios: propuesta de valor, cómo funciona, registro y WhatsApp visible.

## 7. Analytics / éxito

Se mide, sin baselines inventados:
- Embudo del alta: escaneos del QR → páginas abiertas → formularios enviados → pases agregados (por plataforma).
- Clientes que se suman por café (sin meta).
- Canjes reales por café; sellos por semana; uso en semana 4.
- % con consentimiento (b); bajas.
- Landing: visitas, registros de comercios, clics en WhatsApp.
- Pago del mes 2 registrado en la planilla; pedidos de baja y fecha efectiva.

## 8. Cambios frente al PRD v2

| v2 | v3 |
|---|---|
| L4: WhatsApp outbound con plantillas + inbound *SÍ*/*BAJA* | **Cambia:** sin WhatsApp al cliente en el piloto; baja por enlace en el pase |
| L5: geografía abierta (UY o CO) | **Cambia:** Uruguay primero, voseo; CO después |
| L7: founding 50 slots / ventana lanzamiento + 6 meses / 149–299 MXN; trial 14 días | **Cambia:** sin founding ni trial gratis; 199 UYU/mes por 6 meses desde el registro, luego 399 UYU/mes, IVA incluido; cobro desde el día 1 por transferencia; sin permanencia |
| L10: KPIs dashboard §8.4 | **Cambia:** dashboard diferido; métricas por consulta interna |
| L14 / OQ-7: sin email del cliente | **Cambia:** email obligatorio (recuperación) |
| E-PSY-6 Wallet diferido (P2) | **Cambia:** Wallet es el núcleo |
| E2 invitar + *SÍ*, confirmación en persona, reenvío | **Cambia:** alta por QR + formulario |
| E6 cambio de teléfono local | **Cambia:** diferido; recuperación por email |
| E8 billing/founding en sistema | **Cambia:** planilla manual; baja del comercio desde el panel con efecto al fin del mes pagado (FR-X01..X04) |
| Merchant de cualquier rubro (cafés P0; panaderías P1) | **Cambia:** solo cafés; rubro oculto fijo `café`; otros rubros = futuro |
| OQ-4 política de borrado | **Cambia:** app responsable, inscripción URCDP |
| L15: N default 10, 2 sellos de bienvenida | **Cambia:** sin bienvenida ni N fijo; cada café configura N y recompensa (FR-P07) |
| §2.2 métricas (invite → active, KPIs) | **Cambia:** éxito = ≥1 canje real **y** el café sigue activo y paga el mes 2 |
| L12: 1 programa activo por comercio | **Se mantiene y se precisa:** 1 programa por café, totalmente configurable, con QR y pase propios; reglas bloqueadas tras crearlo (FR-P07d); crear un segundo se bloquea (FR-P07e). Modelo preparado para varios |
| — | **Nuevo:** landing de comercios con registro y WhatsApp click-to-chat |
| L1, L2, L3, L8, L9, L11, L13 | **Se mantienen** (solo sellos, solo staff suma/canjea, persona + membresía, sin lifetime, no transferible, ledger append-only, cobro solo al comercio; sin defaults fijos de sellos) |

## 9. Preguntas abiertas y supuestos

**Abiertas**

| ID | Pregunta | Owner |
|---|---|---|
| OQ-4 | ¿Qué número de WhatsApp se usa para consultas en la landing? | Martin |
| OQ-7 | ¿Qué dispara la vuelta de WhatsApp al cliente (reactivación)? | Martin |
| OQ-12 | ¿Qué ven los clientes en el pase después de la baja del café? Propuesta: «Este programa terminó», sin sellos nuevos. ¿Se avisa a los clientes? ¿Cuánto tiempo se guardan sus datos? | Martin / John |
| OQ-13 | ¿El dueño puede anular el pedido de baja antes de la fecha efectiva? (propuesta: sí) | Martin |
| OQ-14 | ¿Cómo se define el «mes ya pagado» (mes calendario o mes desde la fecha de registro)? | Martin |
| OQ-9 | Vencimiento (TTL) y límite de intentos del código de recuperación | Winston |

**Cerradas (Martin, 2026-10-14):** OQ-1: los 6 meses al 50 % empiezan al registrarse el café · OQ-2: formulario del comercio = nombre del comercio y número de contacto (rubro oculto fijo `café`) · precio IVA incluido, cobro desde el día 1, transferencia, sin permanencia · OQ-3: onboarding manual, a cargo de Martin · OQ-8: precio de 399 UYU por mes; 199 UYU por mes durante los primeros 6 meses · OQ-5: se quita la meta de ≥50 % de altas (y su denominador) · OQ-10: N entre 3 y 15 inclusive · OQ-11: no aplica, las reglas no se editan en el MVP · OQ-6: sin 2 sellos de bienvenida ni 10 fijos; cada café configura sellos y recompensa.

**Supuestos:** se mantienen los topes 2/1 de v2; el cliente tiene Wallet; el comercio imprime o exhibe el QR en caja.

## 10. Fuera de alcance (no reintroducir sin cambiar este PRD)

WhatsApp al cliente (alta, avisos, reactivación) · número propio de WhatsApp por café · API de WhatsApp en la landing · NFC / Apple VAS · tarjeta web sin Wallet · ventana o cupos founding · Colombia / Ley 1581 · cambio de teléfono asistido · dashboard de KPIs y sugerencias · cobro automatizado · merge dual-OTP · app de cliente · caducidad de sellos · transferencias / cash-out · campañas de marketing · prepago anual · otros rubros además de café · más de un programa por café (futuro; el modelo no debe impedirlo) · editar reglas del programa después de crearlo (futuro).

---
Siguiente: Sally (`docs/ux/design-spec.md` / `docs/ux/experience-spec.md` para landing, alta y panel) → Winston (arquitectura).
