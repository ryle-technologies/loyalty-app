# EXPERIENCE.md — MVP Sellos en Wallet (Uruguay) · Especificación de comportamiento

| | |
|---|---|
| **Autora** | Sally (UX) · 2026-10-14 |
| **Base** | `docs/product/brief.md`, `docs/product/prd.md` v3 (**borrador, pendiente de OK de Martin y Júlia**), `docs/product/addendum.md`, research de Apple/Google Wallet |
| **Regla** | Si el pedido de John choca con el PRD, gana el PRD. Todo choque o hueco va a §7, sin resolverlo en silencio |
| **No incluye** | Stack técnico, números que el PRD no define, resultados de usabilidad (no hubo estudios) |

Visual, componentes y estados: ver `docs/ux/design-spec.md`.

---

## 1. Flujos (una persona por flujo)

### F1 · Lucía, dueña de un café en Cordón, se registra desde la landing
1. Llega a la landing (S1) desde un link. Ve la oferta «Registrate ahora y pagá 199 UYU por mes durante los primeros 6 meses.» *[repo: actualizado según decisión de Martin 2026-10-14, ver DECISIONS.md]* y el detalle de precio.
2. Lee «Cómo funciona». Tiene una duda → toca «Escribinos por WhatsApp» → se abre `wa.me` con mensaje prellenado: «Hola, tengo un café y quiero saber más sobre la tarjeta de sellos.» (FR-L04; lo atiende una persona).
3. Vuelve y completa Nombre del comercio y Número de contacto (rubro oculto, fijo `café`; *[repo: actualizado según PRD FR-L02]*) → «Registrar mi café».
4. Error de validación → se marca el campo, no se crea nada (FR-L02).
5. Éxito → «¡Listo! Recibimos tu registro. Alguien del equipo te va a escribir por WhatsApp para ponerte en marcha.» *[repo: actualizado, ver DECISIONS.md]* Internamente se avisa a Martin (canal por definir, FR-L03). El trial empieza en la fecha de registro (FR-B01).
6. **Fin del flujo web.** El onboarding (alta de usuario del panel, etc.) es manual (D9).

### F2 · Lucía crea su único programa
1. Entra al panel con sus credenciales (FR-P01) → pestaña Programa → estado vacío «Todavía no creaste tu programa.» → «Crear programa».
2. Completa nombre del programa, sellos (stepper, empieza vacío o en el mínimo; ver §7 sobre valor inicial) y recompensa. La vista previa del pase se actualiza mientras escribe.
3. Fuera de rango (<3 o >15) → «La cantidad de sellos tiene que estar entre 3 y 15» (FR-P07b). Recompensa vacía → «Escribí cuál es la recompensa.»
4. Toca «Crear programa» → `ConfirmSheet`: «Vas a crear: 8 sellos = un café gratis. Después no vas a poder cambiarlo.» → «Crear programa» / «Revisar».
5. Éxito → programa activo, vista en solo lectura con candado, botón «Descargar QR de caja».
6. Imprime el QR y lo pone en caja (supuesto del PRD).

### F3 · Mateo, cliente, se suma desde el QR de caja
1. En la fila escanea el QR con la cámara → se abre S2 con el nombre del café, la recompensa y N (FR-C01).
2. Completa Nombre, WhatsApp (+598 precargado) y Email.
3. Marca (a) «Quiero participar del programa de sellos de {{café}}». Deja (b) sin marcar.
4. Toca «Sumarme».
   - Sin (a) → «Para sumarte tenés que aceptar participar del programa.» No se crea el alta (FR-C03).
   - WhatsApp ya registrado en este café → ver E3.
5. Éxito → se guardan los consentimientos con valor, versión del texto, fecha/hora y café (FR-C04). Pantalla «¡Listo, Mateo!» con el botón de Wallet de su plataforma.
6. Toca «Agregar a Apple Wallet» → hoja nativa de Apple → «Agregar». (Google: hoja de Google Wallet; requiere sesión de Google iniciada, research.)
7. Si su celular no tiene Wallet → mensaje de FR-C06, sin alternativa.
8. Le muestra el QR del pase al barista para el primer sello (no hay sellos de bienvenida, D11).

### F4 · Nico, barista, suma un sello
1. Panel abierto en Escanear. Mateo muestra el pase.
2. El escáner lee el QR → aparece la `MemberCard` (Mateo, teléfono enmascarado, 3 de 8).
3. Toca «Sumar sello» (1 toque). Botón pasa a «Sumando…» deshabilitado.
4. Éxito → toast «Sello sumado · 4 de 8», anuncio por lector de pantalla, el escáner vuelve a estar listo. El pase se actualiza por push (FR-W02).
5. Si quedó en N−1 → el pase notifica «Te falta 1 para un café gratis» (FR-W03).

### F5 · Nico canjea la recompensa
1. Escanea → `MemberCard` muestra 8 de 8 y «Canjear un café gratis» habilitado.
2. Toca «Canjear un café gratis» → `ConfirmSheet` «¿Canjear un café gratis para Mateo?» → «Canjear un café gratis».
3. Éxito → «Canje hecho · 0 de 8» (se descuenta N, FR-P04). El pase vuelve a «Te faltan 8».

### F6 · Nico atiende a alguien sin el pase a mano
1. Toca «Buscar por nombre o teléfono» → escribe «Mateo» o los últimos dígitos.
2. Lista con nombre + teléfono enmascarado → elige → misma `MemberCard` (FR-P03).
3. Varias coincidencias con el mismo nombre → el staff confirma en voz alta los últimos 3 dígitos con el cliente.

### F7 · Mateo cambió de celular y recupera el pase
1. Escanea el QR de caja → «¿Ya tenías la tarjeta? Recuperala», o entra por el link de recuperación (S5).
2. Ingresa su teléfono o email → «Enviarme el código».
3. Mensaje: «Si ese dato está registrado, te mandamos un código a tu email.» (+ email enmascarado si corresponde, ver §7).
4. Ingresa el código → correcto y vigente → «Tu tarjeta tiene 4 de 8 sellos» + botón de Wallet. Es **el mismo pase y el mismo saldo** (FR-W05).
5. Código incorrecto / vencido / sin intentos → ver E6.

### F8 · Mateo se da de baja
1. En el reverso del pase toca «Darme de baja de {{café}}» → S6.
2. Confirma «Darme de baja» → se revoca el consentimiento con ese café, la membresía queda inactiva, el pase deja de actualizarse. Otras tarjetas suyas no cambian (FR-W06).
3. Además puede borrar el pase de Wallet él mismo (no lo controlamos).

---

## 2. Patrones de interacción (siempre igual)

| Acción | Cómo funciona siempre |
|---|---|
| **Enviar un formulario** | Validación al salir del campo y al enviar. Al enviar con errores: no se pierde nada, foco al resumen de errores. Botón en estado «…ando» y deshabilitado hasta respuesta |
| **Acción que cambia saldo** (sumar, canjear, ajustar) | Cada toque genera una sola operación con su clave de idempotencia (FR-P05); el botón se deshabilita hasta la respuesta; el resultado se muestra con el saldo nuevo. Si la red cae, el mensaje dice explícitamente que **no** se hizo («No se sumó el sello») o, si no se sabe, se reintenta con la misma clave antes de informar |
| **Acción irreversible** (canjear, crear programa, baja, ajuste) | Siempre `ConfirmSheet` cuyo botón repite la acción con su objeto («Canjear un café gratis»), nunca «Aceptar/OK». Sumar sello **no** pide confirmación (velocidad en caja; los errores se corrigen con ajuste del dueño) |
| **Bloqueado por regla** | El control se muestra deshabilitado con el motivo en texto, no se oculta (excepto controles que el rol no tiene) |
| **Wallet** | Se ofrece primero el botón de la plataforma detectada; los dos botones son los oficiales; nunca se oculta el otro si la detección es dudosa |
| **Datos personales en el panel** | Teléfono siempre enmascarado; email nunca visible para staff |
| **Mensajes de resultado** | Toast en el panel, pantalla de reemplazo en las páginas públicas |

---

## 3. Tono y frases fijas

Tono: voseo uruguayo, cercano, corto, sin signos de exclamación salvo en logros («¡Listo!», «¡Ya podés canjear…!»). Hablamos de **sellos**, **tarjeta** (para el cliente) y **programa** (para el comercio). No usamos «puntos», «cupón», «app», «cuenta» ni «fidelización» ante el cliente.

Frases que no cambian (mismo texto en todas las superficies):

| Clave | Texto |
|---|---|
| `offer` | «Registrate ahora y pagá 199 UYU por mes durante los primeros 6 meses.» *[repo: actualizado según decisión de Martin 2026-10-14, ver DECISIONS.md]* |
| `merchant.registered` | «¡Listo! Recibimos tu registro. Alguien del equipo te va a escribir por WhatsApp para ponerte en marcha.» *[repo: actualizado, ver DECISIONS.md]* |
| `cta.join` | «Sumarme» |
| `consent.a` | «Quiero participar del programa de sellos de {{café}}. (obligatoria)» — texto legal final pendiente |
| `consent.b` | «Quiero recibir mensajes de {{café}} en el futuro. (opcional)» — texto legal final pendiente |
| `consent.a.missing` | «Para sumarte tenés que aceptar participar del programa.» |
| `wa.note` | «Por ahora no te vamos a escribir por WhatsApp.» |
| `no.wallet` | «Para sumarte necesitás Apple Wallet o Google Wallet en tu celular. Por ahora no hay otra forma de tener la tarjeta.» |
| `progress` | «{{actual}} de {{N}} sellos» (en el pase: «{{actual}}/{{N}}») |
| `remaining.n` | «Te faltan {{faltan}}» |
| `remaining.1` | «Te falta 1 para {{recompensa}}» (FR-W03) |
| `reward.ready` | «¡Ya podés canjear {{recompensa}}!» (FR-W04) |
| `stamp.added` | «Sello sumado · {{actual}} de {{N}}» |
| `redeem.cta` | «Canjear {{recompensa}}» |
| `redeem.done` | «Canje hecho · {{actual}} de {{N}}» |
| `range.error` | «La cantidad de sellos tiene que estar entre 3 y 15» (FR-P07b) |
| `rules.locked` | «Las reglas no se pueden cambiar por ahora.» |
| `rules.warning` | «Ojo: después de crearlo no vas a poder cambiar los sellos ni la recompensa.» |
| `one.program` | «Por ahora podés tener un solo programa» (FR-P07e) |
| `owner.only` | «Solo el dueño puede hacer esto.» |
| `recover.link` | «¿Ya tenías la tarjeta? Recuperala» |
| `recover.sent` | «Si ese dato está registrado, te mandamos un código a tu email.» |
| `offline.stamp` | «Sin conexión. No se sumó el sello.» |

---

## 4. Copy de la landing (base)

- Titular: «Tu tarjeta de sellos, en el celular de tus clientes.»
- Bajada: «Tus clientes la guardan en Apple Wallet o Google Wallet con un QR en caja. Vos sumás sellos en segundos.»
- Oferta: `offer` + «199 UYU por mes durante 6 meses desde que te registrás. Después, 399 UYU por mes.» (ver §7 OQ-S2)
- Formulario: «Nombre del comercio», «Número de contacto», «¿A qué se dedica tu comercio?» (rubro) → «Registrar mi café».
- WhatsApp: «Escribinos por WhatsApp» → `https://wa.me/598XXXXXXXX?text=…` **[NÚMERO A DEFINIR — OQ-4]**.

---

## 5. Casos borde (la arquitectura no los puede tapar)

| # | Caso | Comportamiento esperado | Fuente |
|---|---|---|---|
| E1 | **Programa no editable** | Panel muestra reglas en solo lectura; cualquier intento por API se rechaza y no cambia nada. La confirmación al crear avisa antes. Si el dueño se equivocó al crear: **no hay camino en el MVP** (ver OQ-S4) | FR-P07d |
| E2 | Crear un segundo programa | Bloqueado con `one.program`; no se crea nada; staff ni ve la opción | FR-P07e, FR-P07c |
| E3 | **WhatsApp duplicado en el mismo café** | No se crea un alta nueva; se muestra «Ya tenés una tarjeta en {{café}} con ese número.» + botón «Recuperar mi tarjeta» (→ S5 con el dato precargado). No se revela nombre ni email | FR-C05 |
| E4 | WhatsApp ya existe como persona en **otro** café | Se reutiliza la persona, membresía nueva con saldo propio; el cliente no ve nada distinto | FR-C05 |
| E5 | **Email duplicado** con otro teléfono (mismo café o distinto) | **No definido por el PRD** (la identidad es el teléfono). No se resuelve acá → OQ-S5 | — |
| E6 | **Pase perdido / celular nuevo** | Recuperación por email (F7). Mismo pase, mismo saldo. Código de un solo uso, con vencimiento y límite de intentos (valores en OQ-9). Mensajes: «Ese código no es correcto. Te quedan {{n}} intentos.» / «El código venció. Pedí uno nuevo.» / «Hiciste demasiados intentos. Probá más tarde.» Respuesta neutra al pedir código para no revelar si el dato existe | FR-W05, NFR seguridad |
| E7 | Perdió acceso al email | No hay recuperación asistida en el MVP (cambio de teléfono asistido diferido). Puede seguir sumando si el staff lo busca por teléfono (F6). → OQ-S6 | PRD §10 |
| E8 | **Doble sello** por doble toque, reintento de red o dos baristas escaneando a la vez | Una sola operación por clave de idempotencia; la segunda devuelve el mismo resultado y el toast **no** se muestra dos veces como si fueran dos sellos | FR-P05 |
| E9 | Segundo sello legítimo el mismo día | Permitido hasta el tope diario (2 sumar/día, default v2 supuesto). Al pasar el tope: «{{nombre}} ya sumó los sellos permitidos por hoy.» | FR-P06 |
| E10 | **Recompensa canjeada dos veces** | Doble toque → idempotencia (una sola baja de N). Segundo canje intencional: rechazado si saldo < N («Le faltan {{faltan}} para canjear») y por tope de 1 canje/día. El botón queda deshabilitado tras el canje | FR-P04, FR-P05, FR-P06 |
| E11 | Saldo ≥ N y el barista toca «Sumar sello» | **No definido** (¿se acumula por encima de N?) → OQ-S7 | — |
| E12 | QR de otro café / QR que no es un pase | «Esta tarjeta no es de {{tu café}}.» / «No reconocemos este código.» Nunca se muestran datos de otro comercio | FR-P01 aislamiento |
| E13 | Pase de membresía dada de baja | Escaneo muestra «Esta persona se dio de baja.» sin botones de sumar/canjear | FR-W06 |
| E14 | Sello equivocado (se sumó a otra persona) | Solo el dueño corrige con `adjust` + motivo. Staff ve «Pedile al dueño que lo corrija» | FR-P08 |
| E15 | Push que no llega / notificaciones apagadas | El servidor es la verdad; el panel siempre muestra el saldo real. El cliente puede ver el pase desactualizado un rato | Research Apple/Google |
| E16 | Google: más de 3 avisos por pase en 24 h | Google deja de notificar; con topes de 2 sumar + 1 canje/día no debería alcanzarse, pero «Te falta 1» no es garantizado | Research Google |
| E17 | Cámara no lee el QR (brillo, pantalla rota) | Búsqueda por nombre/teléfono. ¿Búsqueda por el código corto del `altText`? → OQ-S8 | FR-P03 |
| E18 | Cert de Apple vencido | Los pases siguen, pero no se actualizan ni se emiten nuevos → el alta en iPhone debe fallar con mensaje claro, no en silencio. Monitoreo es de arquitectura | NFR Wallet |
| E19 | Google Wallet en modo demo | Pases con «[TEST ONLY]» y solo para cuentas de prueba: no lanzar el piloto Android sin acceso de publicación | Research Google |
| E20 | Cliente sin sesión de Google en Android | Google no deja guardar el pase; mensaje: «Para guardar la tarjeta tenés que tener una cuenta de Google iniciada en el celular.» | Research Google |
| E21 | Cliente toca «Agregar» dos veces o vuelve a la pantalla de éxito | Apple: el mismo pase (mismo serial); Google: re-vincula el mismo objeto. Nunca una segunda tarjeta con saldo propio | Research |
| E22 | Registro de comercio duplicado en la landing | **No definido** → OQ-S9 (onboarding manual lo filtraría) | — |
| E23 | Landing publicada con número de WhatsApp placeholder | Bloqueante de publicación | OQ-4 |

---

## 6. Medición que el UX tiene que permitir (sin metas inventadas)
Eventos distinguibles: escaneo del QR → página abierta → formulario enviado → pase agregado por plataforma (PRD §7); en la landing: visitas, registros, clics en WhatsApp. Errores de alta por tipo (casilla (a), duplicado, sin Wallet) para entender la fricción del formulario (riesgo del brief).

---

## 7. Preguntas abiertas (conflictos y huecos — no resueltos)

### Conflictos entre el pedido de John y el PRD (gana el PRD)
| ID | Conflicto | Qué hice |
|---|---|---|
| C1 | John: «recuperar con un código por email». PRD FR-W05: el cliente ingresa **teléfono o email** y el código va al email registrado | Spec según PRD |
| C2 | John: formulario de comercio con «contacto». PRD FR-L02: «**número** de contacto» | Spec según PRD (campo teléfono) |
| C3 | John no lista: login del panel, búsqueda sin pase, topes diarios, ajuste por el dueño, nombre del programa, QR de caja descargable, baja desde el reverso del pase | Incluidos porque están en el PRD (FR-P01, P03, P06, P07, P08, W06) |
| C4 | John: «sin WhatsApp al cliente». PRD además pide guardar el WhatsApp y la casilla (b) | Coinciden; agregué la nota `wa.note` para que el campo obligatorio no confunda — **confirmar que esa nota es aceptable** |
| C5 | Brief: aviso «Te falta 1». PRD FR-W03: «Te falta 1 para {{recompensa}}» | Spec según PRD |

### Huecos (necesitan decisión)
| ID | Pregunta | Owner sugerido |
|---|---|---|
| OQ-4 | Número de WhatsApp de consultas (placeholder `598XXXXXXXX` visible; bloquea publicar) | Martin |
| OQ-9 | Vencimiento y límite de intentos del código; largo del código; espera para reenviar | Winston |
| OQ-S1 | El PRD sigue **pendiente de OK de Júlia (y Martin)**: esta spec puede cambiar | John |
| OQ-S2 | La oferta dice «50% bonificado», pero 199 es algo menos que la mitad de 399 (199,5). ¿Se muestran los montos en la landing? ¿El texto legal de la oferta? | Martin / John |
| OQ-S3 | Opciones de «rubro» (¿lista cerrada o texto libre?). La landing dice «café» pero el campo sugiere otros rubros: ¿se aceptan no-cafés? | John |
| OQ-S4 | Si el dueño crea el programa con un error (N o recompensa), ¿qué hace? El MVP no permite editar ni crear otro. ¿Soporte manual (Martin)? | John / Martin |
| OQ-S5 | Email duplicado con distinto teléfono: ¿se permite? ¿A qué membresía va el código de recuperación si el email está en varias? | John / Winston |
| OQ-S6 | Cliente sin acceso a su email: ¿hay camino de soporte manual en el piloto? | John |
| OQ-S7 | ¿Se puede sumar con saldo ≥ N (acumular)? ¿El canje descuenta N y deja el sobrante? | John |
| OQ-S8 | ¿Buscar por el código corto del pase (altText) además de nombre/teléfono? | John |
| OQ-S9 | Registro de comercio duplicado en la landing: ¿se detecta o lo filtra Martin? | Martin |
| OQ-S10 | ¿«¡Ya podés canjear…!» dispara notificación? FR-W04 no lo dice (FR-W03 solo fuerza la de «Te falta 1») | John |
| OQ-S11 | Textos legales finales de las casillas (a) y (b) y de la política de privacidad (URCDP); versión del texto (FR-C04) | Martin / legal |
| OQ-S12 | Canal del aviso interno a Martin por registro (FR-L03) | Martin |
| OQ-S13 | Identidad visual: paleta, logo del producto, y si el café puede elegir colores del pase o usamos un par fijo | Martin |
| OQ-S14 | Tenencia de Pass Type ID (uno para todos o por café) afecta cuánta marca del café puede llevar el pase (research Apple: decisión de producto) | Winston |
| OQ-S15 | Cuentas del panel: ¿cuántos usuarios staff por café y quién los crea (onboarding manual)? | Martin |
| OQ-S16 | Topes diarios 2/1 son un **supuesto** heredado de v2; ¿se confirman? | John |

---
Siguiente: Winston (BMM Architecture).
