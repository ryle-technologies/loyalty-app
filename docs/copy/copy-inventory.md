# Inventario de textos del producto — v1

| | |
|---|---|
| **Autora** | Lucía (UX writing) · 2026-10-14 |
| **Alcance** | Todo el texto del producto **salvo la landing**: pase Wallet, notificaciones, alta del cliente y consentimientos, recuperación, baja del cliente, panel (barista y dueño), baja del servicio, cobro, emails |
| **Fuentes** | `docs/product/prd.md` v3 (borrador), `docs/ux/experience-spec.md`, `docs/ux/design-spec.md` (Sally), `docs/product/brief.md`, `docs/product/addendum.md`, `docs/legal/consents.md`, `docs/legal/privacy-policy.md`, `prototype/index.html` |
| **Convenciones** | **Estado:** `OK` = existe en una fuente · `FALTA` = no hay texto (propongo borrador) · `PENDIENTE` = depende de una decisión abierta. Variables: `{{café}}`, `{{nombre}}`, `{{recompensa}}`, `{{N}}`, `{{actual}}`, `{{faltan}}`, `{{marca}}`, `{{email}}`, `{{fin_mes_pagado}}`. Referencias: PRD = `docs/product/prd.md`, EXP = `docs/ux/experience-spec.md`, DES = `docs/ux/design-spec.md`, PROTO = `prototype/index.html`, CONS = `docs/legal/consents.md` |
| **Límites de caracteres** | Ni Apple ni Google publican un límite duro por campo en el research (`docs/tech/apple-wallet-research.md` l.96: «text length can hide fields»; `docs/tech/google-wallet-research.md` l.171: «keep labels short»). Los límites que pongo son **objetivos de diseño míos** (marcados «obj.»), no de la plataforma: hay que validarlos en un iPhone chico y un Android real |

Reglas aplicadas: voseo, cálido y corto; nada de cifras, testimonios ni funciones inventadas; «alguien del equipo», nunca «Martin»; no se nombran los topes diarios en textos hacia afuera; marca = `{{marca}}`.

---

## 1. Pase de Wallet (S3)

### 1.1 Frente — Apple `storeCard` / Google Loyalty

| ID | Campo | Contexto | Texto actual (fuente) | Límite | Estado | Notas |
|---|---|---|---|---|---|---|
| PASS-01 | `logoText` / `issuerName` | Siempre | `{{café}}` (DES §S3) | obj. ≤ 20 | OK | Nombres largos tapan el logo; pedir «nombre corto» en el onboarding |
| PASS-02 | Header label / `loyaltyPoints.label` | Siempre | «Sellos» (DES §S3) | obj. ≤ 8 | OK | |
| PASS-03 | Header value / balance | Siempre | «{{actual}}/{{N}}» (DES §S3, EXP `progress`) | obj. ≤ 5 | OK | |
| PASS-04 | Campo primario: label | Siempre | MISSING (DES solo da el valor) | obj. ≤ 12 | FALTA | Ver propuesta P-01 |
| PASS-05 | Campo primario: valor | Siempre | «{{recompensa}}», ej. «un café gratis» (DES §S3) | obj. ≤ 24 | OK | El dueño la escribe; en Programa hace falta una ayuda de largo (PAN-PRG-05) |
| PASS-06 | Secundario: estado 0…N−2 | Saldo bajo | «Te faltan {{faltan}}» (EXP `remaining.n`, PROTO l.262) | obj. ≤ 30 | OK | |
| PASS-07 | Secundario: estado N−1 | Falta 1 | «Te falta 1 para {{recompensa}}» (PRD FR-W03) | obj. ≤ 30 | OK | Con recompensas largas se corta: ver nota PASS-05 |
| PASS-08 | Secundario: estado ≥ N | Puede canjear | «¡Ya podés canjear {{recompensa}}!» (PRD FR-W04) | obj. ≤ 30 | OK | |
| PASS-09 | Secundario: estado después de la baja del café | Fecha efectiva de baja | «Este programa terminó» (PRD FR-X03, **propuesta**) | obj. ≤ 30 | PENDIENTE | OQ-12. Propuesta P-02 |
| PASS-10 | Secundario: membresía dada de baja por el cliente | Baja del cliente | Ninguno: «queda la última foto» (DES §5.1) | — | PENDIENTE | Decidir si el pase muestra algo; ver conflicto J-6 |
| PASS-11 | QR `altText` | Siempre | Código corto de membresía, sin texto (DES §S3) | obj. ≤ 12 | OK | Sin etiqueta. ¿El barista puede buscar por él? OQ-S8 |
| PASS-12 | Google `programName` | Siempre | Nombre del programa (DES §S3) | obj. ≤ 20 | OK | |
| PASS-13 | Leyenda «[TEST ONLY]» Google demo | Modo demo | Lo pone Google (EXP E19) | — | OK | No es nuestro, pero no se lanza con él |

### 1.2 Reverso (Apple `backFields` / Google `textModules` + `linksModule`)

| ID | Campo | Texto actual (fuente) | Estado | Notas |
|---|---|---|---|---|
| PASS-B01 | Nombre del programa | `{{programa}}` (DES §S3) | OK | |
| PASS-B02 | Regla | «{{N}} sellos = {{recompensa}}» (DES §S3; PROTO «8 sellos = un café gratis») | OK | |
| PASS-B03 | Recuperar | «Perdiste la tarjeta? Recuperala en {{link S5}}» (DES §S3) / «¿Perdiste la tarjeta? Recuperala» (PROTO) | OK | Corregir: falta «¿» en DES. Usar la versión de PROTO |
| PASS-B04 | Baja | «Darme de baja de {{café}}» (EXP F8, PROTO) | OK | |
| PASS-B05 | Privacidad | «Privacidad» (PROTO) | OK | Sugiero «Política de privacidad» (en el reverso hay lugar) |
| PASS-B06 | Emisor / contacto (pedido por Apple) | «Emisor: …» (PROTO), contenido no definido | PENDIENTE | ¿{{marca}} + {{email}}? Depende de razón social (OQ-S11) y Pass Type ID (OQ-S14). Propuesta P-03 |
| PASS-B07 | Cómo usar el pase | MISSING | FALTA | Propuesta P-04 |
| PASS-B08 | Aviso de que no hay mensajes por WhatsApp | MISSING (existe en el alta: `wa.note`) | FALTA | Opcional; ver P-04 alt. C |
| PASS-B09 | Ayuda de notificaciones | MISSING | FALTA | Explica por qué a veces no llega el aviso. Propuesta P-05 |

### 1.3 Notificaciones (push de Wallet)

| ID | Disparador | Texto actual (fuente) | Estado | Notas |
|---|---|---|---|---|
| NOTIF-01 | Sello que deja faltan = 1 | «Te falta 1 para {{recompensa}}» (PRD FR-W03) | OK | Apple: `changeMessage` con `%@`; Google: `TEXT_AND_NOTIFY`. No garantizada (SO, notificaciones apagadas, Google 3/24h) |
| NOTIF-02 | Saldo ≥ N | «¡Ya podés canjear {{recompensa}}!» como texto del pase; **¿notifica?** no definido | PENDIENTE | OQ-S10. Recomiendo que sí (P-06) |
| NOTIF-03 | Cualquier otro sello | No se fuerza aviso (FR-W03) | OK | Ojo: en Apple, si el campo de estado tiene `changeMessage`, **todo** cambio de ese campo notifica. Ver Sally S-5 |
| NOTIF-04 | Canje hecho | No definido | PENDIENTE | Recomiendo sin aviso (el cliente está en caja) |
| NOTIF-05 | Programa terminó (baja del café) | No definido (OQ-12 «¿se avisa?») | PENDIENTE | Propuesta P-02 |

---

## 2. Alta del cliente (S2) y consentimientos

| ID | Elemento | Texto actual (fuente) | Estado | Notas |
|---|---|---|---|---|
| ALTA-01 | Header | Logo + `{{café}}` (DES §S2) | OK | |
| ALTA-02 | ProgramSummaryCard | «Juntá {{N}} sellos y llevate {{recompensa}}» (DES §S2, PROTO) | OK | Con recompensa «un café gratis» lee bien; con recompensas sin artículo («10% off») no. Pedir al dueño que empiece con artículo (PAN-PRG-05) |
| ALTA-03 | Vista previa de progreso | «0 de {{N}} sellos» (PROTO) | OK | |
| ALTA-04 | Label nombre | «Nombre (obligatorio)» (PROTO) | OK | |
| ALTA-05 | Error nombre | «Escribí tu nombre.» (PROTO) | OK | |
| ALTA-06 | Label WhatsApp | «WhatsApp (obligatorio)» (PROTO); +598 precargado (EXP F3) | OK | |
| ALTA-07 | Nota WhatsApp | «Por ahora no te vamos a escribir por WhatsApp.» (EXP `wa.note`, PROTO) | PENDIENTE | Sally pide confirmarla (EXP C4). Choca un poco con la casilla (b). Ver J-3 |
| ALTA-08 | Error WhatsApp | «Revisá el número de WhatsApp.» (PROTO) | OK | Mejora: «Revisá el número. Tiene que ser un celular.» |
| ALTA-09 | Label email | «Email (obligatorio)» (PROTO) | OK | |
| ALTA-10 | Ayuda email | «Lo usamos para mandarte un código si perdés la tarjeta.» (PROTO) | OK | |
| ALTA-11 | Error email | «Revisá el email.» (PROTO) | OK | |
| ALTA-12 | Casilla (a) | «Quiero participar del programa de sellos de {{café}} y acepto la [política de privacidad]. (obligatoria)» (CONS, PROTO) | PENDIENTE | Texto legal final (OQ-S11). EXP `consent.a` no tiene «y acepto la política»: unificar a CONS |
| ALTA-13 | Casilla (b) | «Quiero recibir mensajes de {{café}} en el futuro. (opcional)» (CONS) | PENDIENTE | Legal (OQ-S11). ¿Mensajes de {{café}} o de {{marca}}? Ver J-4 |
| ALTA-14 | Error casilla (a) | «Para sumarte tenés que aceptar participar del programa.» (EXP `consent.a.missing`) | OK | |
| ALTA-15 | Resumen de errores | «Revisá estos datos para seguir:» (PROTO) | OK | |
| ALTA-16 | Botón | «Sumarme» (EXP `cta.join`) | OK | |
| ALTA-17 | Botón cargando | «Sumando…» (DES §5.1) | OK | |
| ALTA-18 | Link recuperar | «¿Ya tenías la tarjeta? Recuperala» (EXP `recover.link`) | OK | |
| ALTA-19 | Aviso de datos | «Usamos tus datos solo para tu tarjeta de sellos. Podés darte de baja cuando quieras. Más info en la [política de privacidad]. Responsable: {{marca}}.» (CONS, PROTO) | PENDIENTE | Legal. «solo para tu tarjeta» choca con la casilla (b) y con guardar el WhatsApp para reactivación futura (brief D7). Ver J-3 |
| ALTA-20 | WhatsApp ya registrado en este café (E3) | «Ya tenés una tarjeta en {{café}} con ese número.» + «Recuperar mi tarjeta» (EXP E3) | OK | PROTO lo marca PENDIENTE; ya está en EXP, pasarlo al prototipo |
| ALTA-21 | Error de red en el alta | MISSING (PROTO: «PENDIENTE: … error de red en el alta») | FALTA | Propuesta P-07 |
| ALTA-22 | QR inactivo / programa inexistente | «Este código no está activo. Pedile ayuda al personal del café.» (DES §5.1) | OK | Después de la baja del café, ver ALTA-23 |
| ALTA-23 | QR de un café dado de baja | MISSING (FR-X03: «el QR deja de dar de alta») | FALTA | Propuesta P-08 |
| ALTA-24 | Éxito | «¡Listo, {{nombre}}! Guardá tu tarjeta en Wallet.» (DES §S2, PROTO) | OK | |
| ALTA-25 | Botones Wallet | «Agregar a Apple Wallet» / «Add to Google Wallet» (PROTO; badges oficiales) | OK | Usar el badge oficial en español de Google («Agregar a Google Wallet») si existe para es-UY; no redibujar |
| ALTA-26 | Indicación post-éxito | «Cuando la guardes, mostrale el QR al barista en cada compra.» (DES §S2) | OK | |
| ALTA-27 | Sin Wallet (FR-C06) | «Para sumarte necesitás Apple Wallet o Google Wallet en tu celular. Por ahora no hay otra forma de tener la tarjeta.» (EXP `no.wallet`) | OK | |
| ALTA-28 | Android sin cuenta de Google (E20) | «Para guardar la tarjeta tenés que tener una cuenta de Google iniciada en el celular.» (EXP E20) | OK | |
| ALTA-29 | Falla al emitir el pase (cert Apple vencido, E18, u otro error) | MISSING («debe fallar con mensaje claro», EXP E18) | FALTA | Propuesta P-09 |
| ALTA-30 | Email ya usado con otro teléfono (E5) | No definido (OQ-S5) | PENDIENTE | Sin texto hasta que John decida |
| ALTA-31 | Título de la página / `<title>` | MISSING | FALTA | «Tarjeta de sellos de {{café}}» (único, sin alternativas: es funcional) |

## 3. Recuperar el pase (S5) y email del código (S7)

| ID | Elemento | Texto actual (fuente) | Estado | Notas |
|---|---|---|---|---|
| REC-01 | Paso 1: instrucción | «Ingresá tu teléfono o el email con el que te sumaste» (DES §S5) | OK | |
| REC-02 | Botón | «Enviarme el código» (DES §S5) | OK | Cargando: «Enviando…» (DES §5.1) OK |
| REC-03 | Respuesta neutra | «Si ese dato está registrado, te mandamos un código a tu email.» (EXP `recover.sent`) | OK | |
| REC-04 | Paso 2 | «Te mandamos un código a {{email enmascarado}}» (DES §S5) | PENDIENTE | Choca con REC-03: mostrar el email enmascarado revela que el dato existe. Ver S-3 |
| REC-05 | Botón validar | «Validar» (DES §S5) | OK | Sugiero «Validar código». Cargando «Validando…» OK |
| REC-06 | Reenviar | «Reenviar código» + espera visible (DES §S5) | PENDIENTE | Texto de la espera depende de OQ-9. Propuesta P-10 |
| REC-07 | Spam | «¿No te llegó? Revisá spam.» (DES §S5) | OK | Mejor «Revisá la carpeta de spam.» |
| REC-08 | Código incorrecto | «Ese código no es correcto. Te quedan {{n}} intentos.» (EXP E6) | PENDIENTE | n = OQ-9. Falta singular: «Te queda 1 intento.» |
| REC-09 | Código vencido | «El código venció. Pedí uno nuevo.» (EXP E6) | OK | |
| REC-10 | Demasiados intentos | «Hiciste demasiados intentos. Probá más tarde.» (EXP E6) | PENDIENTE | «más tarde» vago; depende de OQ-9 |
| REC-11 | Éxito | «Tu tarjeta tiene {{actual}} de {{N}} sellos» + botones Wallet (DES §S5) | OK | |
| REC-12 | Sin acceso al email (E7) | No definido (OQ-S6) | PENDIENTE | Propuesta P-11 (condicionada) |
| REC-13 | Error de red | MISSING | FALTA | Reusar patrón P-07 |
| EMAIL-01 | Asunto | «Tu código para recuperar la tarjeta de {{café}}» (DES §S7) | OK | |
| EMAIL-02 | Cuerpo | «código grande, vencimiento, “Si no lo pediste, ignorá este email.”» (DES §S7) — solo estructura | FALTA | Cuerpo completo en P-12 |
| EMAIL-03 | Remitente (nombre visible) | MISSING | FALTA | P-12 |
| EMAIL-04 | Pie legal del email | MISSING | PENDIENTE | Depende de OQ-S11 |

## 4. Baja del cliente (S6)

| ID | Elemento | Texto actual (fuente) | Estado | Notas |
|---|---|---|---|---|
| BAJA-C-01 | Título | «¿Querés dejar el programa de {{café}}?» (DES §S6) | OK | |
| BAJA-C-02 | Explicación | Solo contenido («pierde los sellos…, el pase deja de actualizarse, otras tarjetas no cambian», DES §S6) | FALTA | Texto en P-13 |
| BAJA-C-03 | Botón destructivo | «Darme de baja» (DES §S6) | OK | |
| BAJA-C-04 | Cancelar | «Mejor no» (DES §S6) | OK | |
| BAJA-C-05 | Cargando | «Procesando…» (DES §5.1) | OK | Mejor «Dándote de baja…» |
| BAJA-C-06 | Éxito | «Listo, te diste de baja de {{café}}.» (DES §5.1) | OK | Agregar: «Podés borrar la tarjeta de tu Wallet.» |
| BAJA-C-07 | Ya dado de baja | «Ya no participás del programa de {{café}}.» (DES §5.1) | OK | |
| BAJA-C-08 | Error de red | «No pudimos darte de baja. Probá de nuevo.» (DES §5.1) | OK | |
| BAJA-C-09 | Volver a sumarse después de la baja | No definido | PENDIENTE | ¿Escanear el QR de nuevo reactiva la membresía o crea otra? Ver J-7 |

## 5. Panel — común y barista (S4)

| ID | Elemento | Texto actual (fuente) | Estado | Notas |
|---|---|---|---|---|
| PAN-01 | Login: título, labels, botón | MISSING (FR-P01 solo «login») | FALTA | P-14 |
| PAN-02 | Login: credenciales incorrectas | MISSING | FALTA | P-14 |
| PAN-03 | Login: olvidé mi contraseña | MISSING / no definido | PENDIENTE | ¿Existe? Onboarding manual; ver S-6 |
| PAN-04 | Sesión vencida | «Sesión vencida → login» sin texto (DES §5.1) | FALTA | P-14 |
| PAN-05 | Header | «{{marca}} · Panel · {{café}}» (PROTO) | OK | |
| PAN-06 | Pestañas | «Escanear» / «Programa» (DES §S4) | OK | Falta pestaña o lugar para Cuenta (baja, pagos): S-1 |
| PAN-07 | Escáner iniciando | «Abriendo cámara…» (DES §5.1) | OK | |
| PAN-08 | Escáner listo (lector de pantalla) | «Cámara lista» (DES §6) | OK | |
| PAN-09 | Cámara denegada | «Sin acceso a la cámara. Activalo en la configuración del navegador o buscá por nombre o teléfono.» (DES §5.1) | OK | «Activalo» → «Activala» (la cámara) |
| PAN-10 | Botón buscar | «Buscar por nombre o teléfono» (DES §S4) | OK | |
| PAN-11 | Placeholder del buscador | MISSING | FALTA | «Nombre o últimos números del teléfono» (funcional, sin alternativas) |
| PAN-12 | Búsqueda sin resultados | «No encontramos a nadie con ese nombre o teléfono.» (DES §5.1) | OK | |
| PAN-13 | Varias coincidencias | MISSING (EXP F6: «el staff confirma en voz alta los últimos 3 dígitos») | FALTA | «Hay varias personas con ese nombre. Confirmá los últimos números del teléfono.» |
| PAN-14 | MemberCard | Nombre · `+598 •• ••• 123` · «{{actual}} de {{N}}» (DES §S4) | OK | |
| PAN-15 | Sumar | «Sumar sello» (DES §S4) | OK | Cargando «Sumando…» (EXP F4) OK |
| PAN-16 | Sello sumado | «Sello sumado · {{actual}} de {{N}}» (EXP `stamp.added`) | OK | |
| PAN-17 | Canjear | «Canjear {{recompensa}}» (EXP `redeem.cta`) | OK | |
| PAN-18 | Canjear deshabilitado | «Le faltan {{faltan}} para canjear» (DES §S4) | OK | PROTO no lo muestra (solo deshabilita): S-4 |
| PAN-19 | Confirmar canje | «¿Canjear {{recompensa}} para {{nombre}}?» → «Canjear {{recompensa}}» (EXP F5) | OK | Falta el botón secundario: «Volver» |
| PAN-20 | Canje hecho | «Canje hecho · {{actual}} de {{N}}» (EXP `redeem.done`) | OK | |
| PAN-21 | Sin conexión al sumar | «Sin conexión. No se sumó el sello.» (EXP `offline.stamp`) | OK | |
| PAN-22 | Sin conexión al canjear | MISSING | FALTA | «Sin conexión. No se hizo el canje.» (calco de PAN-21) |
| PAN-23 | Resultado incierto (reintento con la misma clave) | MISSING (EXP §2) | FALTA | P-15 |
| PAN-24 | Tope diario de sellos | «{{nombre}} ya sumó los sellos permitidos por hoy.» (EXP E9) | PENDIENTE | Topes = supuesto (OQ-S16). Es texto interno al staff: no choca con la regla de no mencionarlos hacia afuera, pero confirmar con el Chief of Staff |
| PAN-25 | Tope diario de canje | MISSING | FALTA | «{{nombre}} ya canjeó hoy. Puede volver a canjear mañana.» (sujeto a OQ-S16) |
| PAN-26 | QR de otro café | «Esta tarjeta no es de {{tu café}}.» (EXP E12) | OK | Ojo: `{{tu café}}` = nombre del café del panel. Más claro: «Esta tarjeta es de otro café.» |
| PAN-27 | QR no reconocido | «No reconocemos este código.» (EXP E12) | OK | Agregar acción: «…Probá buscar por nombre o teléfono.» |
| PAN-28 | Cliente dado de baja | «Esta persona se dio de baja.» (EXP E13) | OK | |
| PAN-29 | Sello a la persona equivocada (staff) | «Pedile al dueño que lo corrija» (EXP E14) | OK | Lenguaje: «al dueño» asume género; alternativa «a quien administra el café». Decisión de tono |
| PAN-30 | Saldo ≥ N y tocan «Sumar sello» (E11) | No definido (OQ-S7) | PENDIENTE | |
| PAN-31 | Staff sin programa creado | «El dueño todavía no creó el programa.» (DES §5.1) | OK | |
| PAN-32 | Permiso de rol | «Solo el dueño puede hacer esto.» (EXP `owner.only`) | OK | |
| PAN-33 | Panel inactivo tras la baja efectiva | MISSING (FR-X02) | FALTA | P-16 |
| PAN-34 | Toast genérico de error de servidor | MISSING (DES §5.2: sin códigos técnicos) | FALTA | «Algo falló y no se guardó. Probá de nuevo.» |

## 6. Panel — dueño: programa, ajustes, baja, cobro

| ID | Elemento | Texto actual (fuente) | Estado | Notas |
|---|---|---|---|---|
| PAN-PRG-01 | Vacío | «Todavía no creaste tu programa.» + «Crear programa» (EXP F2) | OK | |
| PAN-PRG-02 | Label nombre del programa | MISSING (solo «Nombre del programa», DES §S4) | OK | Falta ayuda: «Lo ven tus clientes en la tarjeta.» |
| PAN-PRG-03 | Label sellos | «Cantidad de sellos» (DES §S4) | OK | Ayuda: «Entre 3 y 15.» |
| PAN-PRG-04 | Error rango | «La cantidad de sellos tiene que estar entre 3 y 15» (PRD FR-P07b) | OK | |
| PAN-PRG-05 | Label + ayuda recompensa | «Recompensa» (DES §S4); ayuda MISSING | FALTA | P-17 |
| PAN-PRG-06 | Error recompensa vacía | «Escribí cuál es la recompensa.» (EXP F2) | OK | |
| PAN-PRG-07 | Aviso fijo | «Ojo: después de crearlo no vas a poder cambiar los sellos ni la recompensa.» (EXP `rules.warning`) | OK | |
| PAN-PRG-08 | Confirmación | «Vas a crear: 8 sellos = un café gratis. Después no vas a poder cambiarlo.» → «Crear programa» / «Revisar» (EXP F2) | OK | |
| PAN-PRG-09 | Éxito al crear | MISSING (EXP F2 solo «programa activo») | FALTA | P-18 |
| PAN-PRG-10 | Reglas bloqueadas | «Las reglas no se pueden cambiar por ahora.» (EXP `rules.locked`) | OK | |
| PAN-PRG-11 | Descargar QR | «Descargar QR de caja» (DES §S4) | OK | |
| PAN-PRG-12 | Texto impreso en el QR de caja | MISSING | FALTA | P-19 (el cliente lo lee en la fila) |
| PAN-PRG-13 | Segundo programa | «Por ahora podés tener un solo programa» (PRD FR-P07e) | OK | |
| PAN-PRG-14 | Me equivoqué al crear (E1) | No hay camino (OQ-S4) | PENDIENTE | Si se decide soporte manual: «¿Te equivocaste? Escribinos y alguien del equipo te ayuda.» |
| PAN-PRG-15 | Colores del pase con bajo contraste | Se usa par por defecto (DES §6), sin texto | FALTA | «Esos colores no se leen bien en la tarjeta. Usamos unos parecidos con más contraste.» (OQ-S13) |
| PAN-ADJ-01 | Link | «Corregir saldo» (DES §S4) | OK | |
| PAN-ADJ-02 | Formulario de ajuste | «motivo obligatorio + cantidad» sin textos (DES §S4) | FALTA | P-20 |
| PAN-X-01 | Botón de baja del servicio | «Cancelar servicio» (PRD FR-X01) | OK | Dónde vive: S-1 |
| PAN-X-02 | Confirmación de baja | MISSING (FR-X01 «confirma») | FALTA | P-21 |
| PAN-X-03 | Baja pedida | «Tu servicio sigue activo hasta el {{fin_mes_pagado}}» (PRD FR-X01) | PENDIENTE | Fecha depende de OQ-14 |
| PAN-X-04 | Anular la baja | MISSING; FR-X04 es propuesta (OQ-13) | PENDIENTE | P-22 |
| PAN-X-05 | Staff intenta cancelar | `owner.only` (FR-X01 403) | OK | |
| PAN-X-06 | Qué pasa con las tarjetas de mis clientes | MISSING | PENDIENTE | Depende de OQ-12; P-21 lo incluye condicionado |
| PAN-BILL-01 | Precio vigente / próximo cambio a 399 | MISSING (billing fuera del sistema, PRD §10) | FALTA | P-23. ¿El panel muestra algo de cobro? S-2 |
| PAN-BILL-02 | Datos para transferir | MISSING | PENDIENTE | Banco/cuenta/titular TBD por Martin. P-23 |
| PAN-BILL-03 | Pago pendiente / atrasado | No definido | PENDIENTE | El PRD no define qué pasa si no paga: J-5 |
| PAN-HELP-01 | Ayuda / contacto en el panel | MISSING | FALTA | «¿Necesitás ayuda? Escribinos por WhatsApp» → wa.me [NÚMERO PENDIENTE OQ-4] |
| PAN-STAFF-01 | Gestión de usuarios staff | No definido (OQ-S15) | PENDIENTE | Sin texto hasta decidir |

## 7. Mensajes de onboarding del comercio y WhatsApp

| ID | Elemento | Texto actual (fuente) | Estado | Notas |
|---|---|---|---|---|
| ONB-01 | Éxito del registro (landing, borde con el producto) | EXP `merchant.registered`: «¡Gracias! Martin te va a contactar para empezar.» · PROTO: «¡Listo! Recibimos tu registro. Alguien del equipo te va a escribir por WhatsApp para ponerte en marcha.» | PENDIENTE | Regla: «alguien del equipo». PRD FR-L02 dice Martin: J-1. PROTO promete «por WhatsApp» y el número de contacto puede no ser WhatsApp: usar «te va a contactar» |
| ONB-02 | Mensaje prellenado wa.me (landing) | «Hola, tengo un café y quiero saber más sobre la tarjeta de sellos.» (EXP F1) | OK | Número [PENDIENTE OQ-4] |
| ONB-03 | Envío de credenciales del panel al dueño | MISSING (onboarding manual) | FALTA | P-24 (plantilla para quien haga el onboarding) |
| ONB-04 | Aviso interno de registro nuevo | Canal por definir (FR-L03, OQ-S12) | PENDIENTE | Interno, no es UI de cliente |
| ONB-05 | Aviso interno de baja pedida | FR-X01 «Martin recibe aviso» | PENDIENTE | Interno; mismo canal que ONB-04 |
| WA-CLI | Mensajes de WhatsApp al cliente | Fuera de alcance del piloto (PRD §10) | OK | No se escribe ninguno |

## 8. Textos legales (placeholders)

| ID | Elemento | Texto actual (fuente) | Estado |
|---|---|---|---|
| LEG-01 | Política de privacidad | `docs/legal/privacy-policy.md` (placeholder) | PENDIENTE (OQ-S11, abogado) |
| LEG-02 | Versión del texto aceptado (FR-C04) | Sin identificador visible | PENDIENTE: sugerir «Versión {{v}} · {{fecha}}» al pie de la política |
| LEG-03 | Términos del servicio para el café (precio, baja, sin permanencia) | MISSING (landing: «[Términos de la oferta: PENDIENTE]») | FALTA: placeholder corto en P-25 |

---

## 9. Propuestas para lo que falta (2–3 alternativas + recomendación)

**P-01 · PASS-04 label del campo primario**
A «Recompensa» · B «Te llevás» · C «Premio»
→ **A**. Coincide con el panel y el alta; «Te llevás» es más cálido pero se lee raro sobre un valor como «un café gratis» en Watch/listas.

**P-02 · PASS-09 / NOTIF-05 programa terminado** [PENDIENTE OQ-12]
A «Este programa terminó» · B «{{café}} terminó este programa» · C «Este programa terminó. Gracias por venir.»
→ **A** en el campo de estado (corto, es la propuesta del PRD). Si se decide avisar, notificación con **B** (dice quién, sin culpar a nadie). C suma calidez pero no entra en el campo.

**P-03 · PASS-B06 emisor** [PENDIENTE]
A «Tarjeta emitida por {{marca}} para {{café}}. Contacto: {{email}}» · B «{{marca}} · {{email}}» · C «¿Dudas sobre esta tarjeta? Escribí a {{email}}»
→ **A**: cumple el pedido de Apple y deja claro el rol (D1: {{marca}} es responsable).

**P-04 · PASS-B07 cómo usar**
A «Mostrá este QR en caja en cada compra para sumar tu sello.» · B «En cada compra, mostrale el QR al barista.» · C A + «No te vamos a escribir por WhatsApp: tu progreso se ve acá.»
→ **A**: misma idea que la pantalla de éxito, y «en caja» no asume rol. C solo si se confirma `wa.note` (J-3).

**P-05 · PASS-B09 notificaciones**
A «Si querés que la tarjeta te avise cuando te falte poco, activá las notificaciones de Wallet.» · B «Los avisos dependen de la configuración de tu celular.»
→ **A**: dice qué hacer. «cuando te falte poco» evita prometer un aviso exacto que no está garantizado.

**P-06 · NOTIF-02 recompensa lista** [PENDIENTE OQ-S10]
A «¡Ya podés canjear {{recompensa}}!» · B «¡Completaste tu tarjeta! Pedí {{recompensa}} en caja.»
→ **A**: mismo texto que el pase (una sola frase fija). Recomiendo que notifique: es el momento que más hace volver.

**P-07 · ALTA-21 error de red**
A «No pudimos sumarte. Revisá tu conexión y probá de nuevo.» · B «Se cortó la conexión. Tus datos siguen acá: probá de nuevo.» · C «Algo falló. Probá de nuevo.»
→ **B**: en la fila, lo que preocupa es tener que escribir todo otra vez; además cumple «qué pasó y qué hacer».

**P-08 · ALTA-23 QR de café dado de baja**
A «Este programa terminó. Pedile ayuda al personal del café.» · B «{{café}} ya no tiene tarjeta de sellos.» · C reusar ALTA-22
→ **C** si OQ-12 no se cierra (no revela la baja del café); **A** si se decide mostrar «terminó» en los pases, por coherencia.

**P-09 · ALTA-29 falla al emitir el pase**
A «No pudimos crear tu tarjeta ahora. Ya te sumaste: probá agregarla más tarde desde “¿Ya tenías la tarjeta? Recuperala”.» · B «No pudimos crear tu tarjeta. Probá de nuevo en un rato.»
→ **A** si el alta ya quedó guardada (evita duplicado E3 y le da salida); hay que confirmarlo con Winston.

**P-10 · REC-06 reenviar** [PENDIENTE OQ-9]
A «Podés pedir otro código en {{s}} s» · B «Reenviar código (en {{s}} s)»
→ **A** como texto + botón habilitado después. Muestra el tiempo en texto, como pide DES §6.

**P-11 · REC-12 sin acceso al email** [PENDIENTE OQ-S6]
A «¿Ya no usás ese email? Igual podés sumar sellos: pedile al personal que te busque por tu teléfono.» · B A + «Para recuperar la tarjeta, escribinos a {{email}}.»
→ **A** hoy (solo describe lo que existe, EXP E7). B únicamente si se decide soporte manual.

**P-12 · EMAIL-02/03 email del código**
Remitente: A «{{café}} vía {{marca}}» · B «{{marca}}» → **A**: el cliente conoce al café, no a la marca.
Cuerpo (rec.):
> Hola, {{nombre}}:
> Tu código para recuperar la tarjeta de sellos de {{café}} es:
> **{{código}}**
> Vence {{vencimiento}} [PENDIENTE OQ-9]. Es de un solo uso.
> Si no lo pediste, ignorá este email: tu tarjeta sigue igual.
> — {{marca}} · [Política de privacidad]
Alternativa corta: sin saludo, solo código + vencimiento + «Si no lo pediste, ignorá este email.» Recomiendo la completa: el saludo con nombre reduce la sensación de phishing.

**P-13 · BAJA-C-02 explicación**
A «Si te das de baja, perdés los sellos de {{café}} y tu tarjeta deja de actualizarse. Tus tarjetas de otros cafés no cambian.» · B lista de 3 viñetas con lo mismo · C A sin la última frase
→ **A**: una frase, todo lo que pide FR-W06, sin dramatizar. (Confirmar con John que «perdés los sellos» es correcto: J-7.)

**P-14 · PAN-01/02/04 login**
Título A «Entrá al panel de {{café}}» (no se sabe el café antes del login → **B** «Entrá al panel») · Labels «Email» / «Contraseña» [PENDIENTE: ¿usuario o email?] · Botón «Entrar»
Error: A «El email o la contraseña no coinciden.» · B «No pudimos entrar con esos datos.» → **A** (dice qué revisar, no revela cuál falló).
Sesión vencida: «Tu sesión se cerró. Entrá de nuevo para seguir.»

**P-15 · PAN-23 resultado incierto**
A «No sabemos si se sumó el sello. Escaneá de nuevo para ver el saldo antes de volver a sumar.» · B «Revisando…» y luego el resultado real
→ **B** como comportamiento (EXP §2 ya reintenta con la misma clave) y **A** solo si el reintento falla. Evita sellos dobles.

**P-16 · PAN-33 panel inactivo**
A «Tu servicio terminó el {{fecha}}. Si querés volver, escribinos.» · B «El panel está inactivo desde el {{fecha}}.»
→ **A**: deja la puerta abierta sin presionar (enfoque de crecimiento).

**P-17 · PAN-PRG-05 ayuda de recompensa**
A «Escribila como la va a leer tu cliente, por ejemplo: “un café gratis”.» · B «Corta y concreta. Ej.: “un café gratis”.» · C «Máximo {{x}} caracteres» [PENDIENTE de validar límite]
→ **A** + contador si se fija un máximo: el ejemplo con artículo hace que «Juntá 8 sellos y llevate un café gratis» y «Te falta 1 para un café gratis» lean bien.

**P-18 · PAN-PRG-09 éxito al crear**
A «¡Listo! Tu programa está activo. Descargá el QR y ponelo en caja.» · B «Programa creado.»
→ **A**: dice el siguiente paso, que es lo único que falta para que entren clientes nuevos.

**P-19 · PAN-PRG-12 cartel del QR de caja**
A «Escaneá y sumá tu primer sello» · B «Juntá {{N}} sellos y llevate {{recompensa}}. Escaneá para sumarte.» · C «Tu tarjeta de sellos, en el celular. Escaneá acá.»
→ **B**: la recompensa es el gancho para el cliente nuevo; ojo con A: «primer sello» no se suma al escanear (D11, sin sellos de bienvenida), así que A promete algo que no pasa.

**P-20 · PAN-ADJ-02 ajuste**
Labels: «Cantidad (podés restar con −)» · «Motivo (obligatorio)» · placeholder «Ej.: se sumó a otra persona» · botón confirmación «Corregir saldo de {{nombre}}» · error «Escribí el motivo.» · éxito «Saldo corregido · {{actual}} de {{N}}».
Alternativa: selector de motivos fijos + «Otro». → **Texto libre** (no hay lista de motivos en el PRD; no la invento).

**P-21 · PAN-X-02 confirmar baja del servicio**
A «¿Querés cancelar el servicio? Sigue activo hasta el {{fin_mes_pagado}} y no se cobran más meses.» Botones «Cancelar servicio» / «Mejor no» · B A + «Después, las tarjetas de tus clientes dejan de sumar sellos.» [PENDIENTE OQ-12] · C A + «¿Nos contás por qué?» (campo opcional)
→ **B** cuando se cierre OQ-12 (el dueño tiene que saber qué ven sus clientes); hasta entonces **A**. C es útil para aprender, pero es un campo nuevo: decisión de John.

**P-22 · PAN-X-04 anular la baja** [PENDIENTE OQ-13]
Banner: «Pediste la baja. Tu servicio sigue activo hasta el {{fin_mes_pagado}}.» + botón A «Seguir con {{marca}}» · B «Anular la baja»
→ **B**: describe exactamente la acción.

**P-23 · PAN-BILL-01/02 cobro** [PENDIENTE]
A (bloque informativo en Cuenta) «Tu plan: 199 UYU por mes hasta el {{fecha_fin_bonificacion}}. Después, 399 UYU por mes. IVA incluido. Pagás por transferencia: {{datos bancarios PENDIENTE}}. Sin permanencia.» · B nada en el panel; datos por WhatsApp/email en el onboarding
→ **A**: menos consultas y el dueño ve la fecha del cambio a 399 antes de que le llegue el cobro (cuidar la confianza del mes 7). Requiere que alguien cargue la fecha a mano.

**P-24 · ONB-03 credenciales (plantilla para el equipo)**
> Hola, {{nombre}}. Ya está listo el panel de {{café}}: {{link}}. Entrás con {{email}} y la contraseña que te mandamos aparte. Primero creá tu programa (sellos y recompensa) y descargá el QR de caja. Cualquier duda, escribime por acá.
Alternativa: versión email con los mismos pasos en lista. → WhatsApp (es el canal humano que ya usa el onboarding). [PENDIENTE: cómo se entrega la contraseña]

**P-25 · LEG-03 términos (placeholder)**
> [PENDIENTE — revisar con abogado] {{marca}} cobra 199 UYU por mes durante 6 meses desde el registro y después 399 UYU por mes, IVA incluido, por transferencia, desde el primer mes. Sin permanencia: pedís la baja desde el panel y rige al final del mes pagado.

---

## 10. Para John — choques copy vs PRD

| ID | Choque | Propuesta |
|---|---|---|
| J-1 | PRD FR-L02 y EXP `merchant.registered`: «Martin lo va a contactar». Regla de copy: «alguien del equipo». PROTO ya dice «Alguien del equipo… por WhatsApp» | Cambiar FR-L02 a «alguien del equipo te va a contactar»; quitar «por WhatsApp» (el número de contacto puede no ser WhatsApp) |
| J-2 | Oferta «50% bonificado» vs 199 / 399 (199 < 199,5) (EXP OQ-S2) | Aceptable como redondeo, pero confirmar que legal lo tolera o usar «199 UYU por mes los primeros 6 meses» sin el % |
| J-3 | Aviso «Usamos tus datos solo para tu tarjeta» + `wa.note` «no te vamos a escribir» vs PRD/brief D7: el WhatsApp se guarda para reactivación futura y la casilla (b) | Cambiar aviso a: «Usamos tus datos para tu tarjeta de sellos y, si lo marcaste, para escribirte en el futuro.» y `wa.note` a «Por ahora no te escribimos por WhatsApp.» |
| J-4 | Casilla (b) «mensajes de {{café}}» pero el responsable que manda es {{marca}} (D1) | Definir quién escribe; ajustar texto legal |
| J-5 | Cobro: el PRD no define qué pasa si el café no paga (¿se corta el panel?) ni si el panel muestra precio/fechas | Decidir; sin eso no hay copy de PAN-BILL-03 |
| J-6 | FR-W06: tras la baja del cliente, el pase «deja de actualizarse» y queda mostrando saldo/QR; si lo muestra en caja, el barista ve E13 pero el cliente ve un pase «vivo» | Actualizar el pase una última vez con estado «Te diste de baja» antes de cortar las actualizaciones |
| J-7 | ¿La baja del cliente borra sus sellos («perdés los sellos», DES §S6) o solo inactiva (FR-W06)? ¿Qué pasa si se vuelve a sumar? | Definir; condiciona P-13 y BAJA-C-09 |
| J-8 | Recompensa ≥ N y sumar (OQ-S7), notificación de «ya podés canjear» (OQ-S10), email duplicado (OQ-S5), sin acceso al email (OQ-S6), topes 2/1 (OQ-S16) | Siguen abiertos; bloquean PAN-30, NOTIF-02, ALTA-30, REC-12, PAN-24/25 |
| J-9 | PRD FR-W01: «Agregar a Google Wallet»; badge oficial en PROTO dice «Add to Google Wallet» | Usar el badge oficial localizado de Google |

## 11. Para Sally — flujo y layout

| ID | Problema | Propuesta |
|---|---|---|
| S-1 | El panel tiene solo Escanear y Programa: no hay lugar para «Cancelar servicio», anular la baja, datos de pago ni ayuda | Agregar una pestaña o menú «Cuenta» (solo dueño) |
| S-2 | No hay pantalla de cobro/plan en DES (solo planilla) | Bloque informativo en Cuenta (P-23), o decidir explícitamente que no existe |
| S-3 | S5 paso 2 muestra el email enmascarado, pero el paso 1 responde en neutro para no revelar si el dato existe (E6) | Paso 2 neutro: «Si ese dato está registrado, te llegó un código. Escribilo acá.» |
| S-4 | PROTO: «Canjear» deshabilitado sin el texto «Le faltan N para canjear» (DES §S4 sí lo pide) | Agregarlo al prototipo |
| S-5 | Apple: un `changeMessage` en el campo de estado dispara aviso en cada cambio de ese campo, no solo en N−1 (FR-W03 pide aviso solo en N−1) | Que el `changeMessage` vaya solo en la actualización N−1 (y ≥N si se decide), o en un campo dedicado. Validar con Winston |
| S-6 | No hay flujo de login, olvido de contraseña ni alta de staff (OQ-S15) | Definir pantalla de login y si «olvidé mi contraseña» es manual («Escribinos y te ayudamos») |
| S-7 | DES S1 lista un campo visible «¿A qué se dedica tu comercio?» y F1 «Rubro», pero el PRD lo pone oculto y fijo en café | Quitar el campo de DES/EXP (el PROTO ya no lo tiene) |
| S-8 | No hay pantalla de error si falla la emisión del pase después de un alta válida (E18) | Pantalla con P-09 y salida a recuperación |
| S-9 | El cartel impreso del QR de caja no tiene diseño ni texto | Agregar plantilla imprimible (P-19) |
| S-10 | ConfirmSheet del canje sin botón secundario definido | «Volver» |

---

## 12. Conteo

155 textos inventariados: **90 OK** (existen en una fuente), **32 FALTA** (con propuesta en §9 o en la fila), **33 PENDIENTE** (dependen de una decisión). 25 propuestas con alternativas (P-01 a P-25), 9 choques para John y 10 temas para Sally.
