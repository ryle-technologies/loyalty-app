# Landing de comercios — Copy v4 (replanteo)

| | |
|---|---|
| **Fecha** | 2026-10-14 · v4 (v3 se conserva en `landing-copy.md`) |
| **Para** | Martin Mateo Cerón |
| **Público** | Dueños/as de cafés en Uruguay. Voseo, tono de Montevideo: directo, cálido, sin jerga de marketing |
| **Fuentes** | `prd.md` (v3 actualizado, borrador), `brief.md`, `EXPERIENCE.md`, `DESIGN.md`, `addendum.md`, research Apple/Google Wallet + decisiones de Martin |
| **Reglas** | Sin cifras, testimonios ni logos inventados. Sin «minutos». Sin prometer datos de contacto de los clientes. `{{marca}}` = nombre pendiente |

---

## Parte 1 · Diagnóstico del copy v3

1. **El titular describe el producto, no lo que gana el dueño.** «Tu tarjeta de sellos, en el celular de tus clientes» es correcto pero intercambiable: lo podría decir cualquier competidor y no toca ningún dolor.
2. **Beneficios en negativo y en serie.** Cinco «No…» seguidos («no instalan», «no imprimís», «no pagás»…) cansan y suenan a lista de especificaciones. Ninguno está escrito como resultado para el dueño (menos cartones truchos, clientes que no pierden lo que juntaron, fila que no se frena).
3. **Lo más fuerte del precio quedó escondido.** «Sin permanencia» y «IVA incluido» estaban en microcopy, cuando son de los mejores argumentos contra el miedo a probar. La frase del 50 % aparecía 3 veces sin contexto.
4. **La objeción más real (Wallet) estaba al fondo y con una afirmación sin respaldo.** «Wallet, que ya viene en el celular» no está en ningún documento (en Android no está garantizado). La limitación tiene que decirse arriba y en claro, porque es lo primero que va a pensar el dueño.
5. **No se contaba qué pasa después de registrarse.** Para un dueño que no conoce la marca, «¿y después qué?» es la duda que frena el formulario. El onboarding es manual (alguien del equipo te escribe), y eso es una ventaja que no se aprovechaba.
6. **El esfuerzo del equipo no estaba cuantificado**, aunque la spec permite decir algo concreto: escanear + 1 toque para sumar, 2 toques para canjear.
7. **Repetición y notas internas mezcladas con el copy.** El paso «escanea el QR» se explicaba tres veces y las notas para diseño cortaban la lectura. En v4 las notas van al final.

---

## Parte 2 · Tres ángulos de posicionamiento

### Ángulo A — «Que vuelvan» (retención)
- **Titular:** «Que el cliente de hoy vuelva mañana.»
- **Bajada:** «Una tarjeta de sellos en el celular de tus clientes que les muestra cuánto les falta para su recompensa.»
- **CTA:** «Registrar mi café»
- **A favor:** es el motivo de fondo por el que un café tiene tarjeta de sellos.
- **En contra:** promete un resultado (que vuelvan más) que hoy no podemos medir ni mostrar: no hay cifras, testimonios ni dashboard en el MVP. Además, es lo que dice cualquier sistema de fidelización.

### Ángulo B — «Chau cartón» (reemplazo del cartón) · **RECOMENDADO**
- **Titular:** «El cartón de sellos, sin el cartón.»
- **Bajada:** «Tus clientes guardan la tarjeta de tu café en el celular, en Apple Wallet o Google Wallet. No se pierde, no se moja y no hay que acordarse de traerla. Los sellos los suma solo tu equipo.»
- **CTA:** «Registrar mi café»
- **A favor:** parte de algo que el dueño ya conoce y usa (mismas reglas: X sellos y una recompensa), y de un dolor concreto que el brief pone en el centro: el cartón se pierde y se falsifica, y el dueño quiere dejarlo. Todo lo que promete es verificable con el producto tal cual está.
- **En contra:** si el café no usa cartón, el gancho pega menos. Por eso la bajada y los beneficios también hablan de la recompensa y del progreso.

### Ángulo C — «Sin vueltas» (simplicidad)
- **Titular:** «Sellos en el celular. Sin app, sin cartón, sin vueltas.»
- **Bajada:** «Ponés un QR en caja, tus clientes guardan la tarjeta en su Wallet y tu equipo suma el sello con un toque.»
- **CTA:** «Registrar mi café»
- **A favor:** baja el miedo a «otro sistema más».
- **En contra:** la simplicidad es una condición, no un motivo para comprar. Nadie cambia algo que le funciona solo porque lo nuevo es simple.

### Recomendación: **B**, con el «que vuelvan» de A como premio y la prueba de C en «Cómo funciona»
- **Es concreto y honesto.** Cada promesa sale de lo que el PRD sí hace: la tarjeta en Wallet, la recuperación por email, que solo el staff suma sellos, el progreso en el pase. No depende de resultados que no tenemos.
- **Le habla al dueño del brief**, que «quiere que los clientes vuelvan más y dejar el cartón, sin aprender a usar un CRM».
- **Responde por sí solo la pregunta «¿por qué cambiar?»**: es lo mismo que ya hacés, sin los problemas del cartón.
- **Deja la retención como consecuencia**, no como promesa: «tus clientes ven cuánto les falta».

---

## Parte 3 · Landing v4 (ángulo B)

> Orden de secciones según `DESIGN.md` S1, con dos agregados: «Qué pasa después de registrarte» (dentro del formulario) y «Lo que te vas a preguntar» (antes del FAQ). Las frases **(fija)** salen de `EXPERIENCE.md` §3.

### 1. Header
- `{{marca}}` (logo pendiente)
- Botón secundario: **«Escribinos por WhatsApp»** *(unifico la etiqueta del header y la del bloque, Q14 de v3)*

### 2. Hero

# El cartón de sellos, sin el cartón.

**Bajada:**
Tus clientes guardan la tarjeta de tu café en el celular, en Apple Wallet o Google Wallet. No se pierde, no se moja y no hay que acordarse de traerla. Los sellos los suma solo tu equipo.

**Oferta (fija):** **Registrate ahora y obtené el 50% bonificado durante los primeros 6 meses.**
**Detalle (≥ 14 px):** 199 UYU por mes los primeros 6 meses, después 399 UYU. IVA incluido. Sin permanencia.

**CTA primario:** «Registrar mi café» · **Secundario (link):** «Ver cómo funciona»

**Titulares alternativos en el mismo ángulo:**
- «Tu tarjeta de sellos, ahora en la billetera del celular.» *(juega con «Wallet» = billetera)*
- «Chau cartón. Tu tarjeta de sellos ahora va en el celular.»
- «La tarjeta de sellos que tus clientes no pierden.»

### 3. Cómo funciona

**Título:** «Igual que el cartón. Pero en el celular.»

1. **Ponés un QR en caja.**
   Elegís cuántos sellos pide tu tarjeta (de 3 a 15) y cuál es la recompensa. Imprimís el QR y lo dejás a la vista.
2. **Tu cliente lo escanea y guarda la tarjeta.**
   Pone su nombre, WhatsApp y email, acepta participar y la guarda en Apple Wallet o Google Wallet. No descarga ninguna app.
3. **Tu equipo escanea y suma.**
   Desde el celular o la tablet del local: escanean la tarjeta y tocan «Sumar sello». La tarjeta del cliente se actualiza sola.

**Remate (texto chico):** Cuando le falta uno, la tarjeta le puede avisar: «Te falta 1 para un café gratis». Cuando completa, ve «¡Ya podés canjear un café gratis!».
*(«un café gratis» es un ejemplo: cada café pone su recompensa.)*

### 4. Beneficios — lo que cambia para vos

**Título:** «Lo que ganás dejando el cartón»

- **Se terminan los sellos truchos.**
  Los sellos los suma solo tu equipo, desde el panel, y cada uno queda registrado. Nadie llega con un cartón sellado en casa.
- **Dejás de imprimir y reponer cartones.**
  La tarjeta vive en el celular de tu cliente. Lo único que imprimís es el QR de caja.
- **Tus clientes no pierden lo que juntaron.**
  Si cambian de celular o borran la tarjeta, la recuperan con un código que les llega por email, con los mismos sellos.
- **Tus clientes saben cuánto les falta.**
  Ven su progreso en la tarjeta cada vez que la abren. Es la razón para volver por el próximo.
- **No frenás la fila.**
  Sumar un sello es escanear y un toque. Canjear, dos. Si alguien toca dos veces sin querer, no se suman dos sellos.
- **No comprás nada.**
  Funciona en el celular o la tablet que ya tenés en el local, con la cámara.

### 5. Lo que te vas a preguntar (objeciones, en bloque corto)

**Título:** «Antes de que lo preguntes»

| Duda | Respuesta |
|---|---|
| **«Mis clientes no se van a bajar una app.»** | No tienen que bajar nada. La tarjeta va en Apple Wallet (iPhone) o Google Wallet (Android). |
| **«¿Y si no tienen Wallet?»** | Te lo decimos claro: por ahora, quien no tenga Apple Wallet o Google Wallet no puede sumarse. En Android hace falta tener una cuenta de Google iniciada en el celular. |
| **«Mi equipo no tiene tiempo para esto.»** | Escanear y un toque. Si el cliente no tiene la tarjeta a mano, lo buscan por nombre o teléfono. |
| **«¿Y si no me sirve?»** | Cancelás cuando quieras desde el panel. No hay permanencia. |

### 6. Precio

**Título:** «Un precio fijo. Sin letra chica.»

**Oferta (fija):** Registrate ahora y obtené el 50% bonificado durante los primeros 6 meses.

| | |
|---|---|
| **Primeros 6 meses** | **199 UYU por mes** |
| **Desde el mes 7** | 399 UYU por mes |

- **IVA incluido.** El precio que ves es el que pagás.
- **Sin permanencia.** Cancelás cuando quieras desde el panel. El servicio sigue hasta el final del mes que ya pagaste y no se cobra nada más.
- **Pagás por transferencia bancaria.** Desde el primer mes; los 6 meses bonificados se cuentan desde el día en que te registrás.
- **No pagás por mensaje.** La tarjeta se actualiza en el Wallet sin costo extra.

**Qué incluye:** tu programa de sellos con su QR de caja · la tarjeta en Apple Wallet y Google Wallet · el panel para sumar y canjear · ayuda para arrancar.

**CTA:** «Registrar mi café»

### 7. Formulario de registro (FR-L02)

**Título:** «Sumá tu café»
**Texto de apoyo:** «Son dos datos. Después te escribimos nosotros.»

| Campo | Label | Ayuda / placeholder | Error |
|---|---|---|---|
| Nombre del comercio | «Nombre de tu café (obligatorio)» | Placeholder: «Ej.: Café de la esquina» | «Escribí el nombre de tu café.» |
| Número de contacto | «Tu número de contacto (obligatorio)» | +598 preseleccionado y editable. Ayuda: «Te escribimos a este número por WhatsApp.» | «Revisá el número. Tiene que ser un teléfono válido.» |

*(Rubro: oculto, valor fijo `café`, según FR-L02. `autocomplete="organization"` y `"tel"`.)*

- **Botón:** «Registrar mi café» → «Registrando…»
- **Bajo el botón:** «Usamos estos datos solo para contactarte por tu registro. [Política de privacidad]»

**Qué pasa después de registrarte** (al lado del formulario en escritorio, debajo en celular):
1. Alguien del equipo te escribe por WhatsApp.
2. Te ayudamos a crear tu programa: cuántos sellos y qué recompensa.
3. Imprimís el QR de caja y empezás a sumar sellos.

- **Éxito (reemplaza el formulario):** «¡Listo! Recibimos tu registro. Alguien del equipo te va a escribir por WhatsApp para ponerte en marcha.»
- **Error de red:** «No pudimos registrar tu café. Probá de nuevo.»
- **Resumen de errores:** «Revisá estos datos para seguir:» + links a cada campo

### 8. Bloque WhatsApp (FR-L04)

- **Título:** «¿Preferís preguntar primero?»
- **Texto:** «Escribinos. Te responde una persona, no un bot.»
- **Botón:** «Escribinos por WhatsApp» → `https://wa.me/598XXXXXXXX?text=…` **[PENDIENTE: número — bloquea publicar]**
- **Mensaje prellenado:** «Hola, tengo un café y quiero saber más sobre la tarjeta de sellos.»

### 9. Preguntas frecuentes

**¿Mis clientes tienen que descargar una app?**
No. Escanean el QR en caja, completan nombre, WhatsApp y email, y guardan la tarjeta en Apple Wallet o Google Wallet.

**¿Qué pasa si un cliente no tiene Wallet?**
Por ahora no puede sumarse: no hay versión en papel ni otra opción. En Android, además, tiene que tener una cuenta de Google iniciada en el celular.

**¿Cuánto trabajo le da a mi equipo?**
Para sumar, escanean la tarjeta y tocan «Sumar sello». Para canjear, tocan «Canjear» y confirman. Si el cliente no tiene la tarjeta a mano, lo buscan por nombre o teléfono.

**¿Puedo elegir cuántos sellos y qué recompensa?**
Sí: de 3 a 15 sellos y la recompensa que quieras. Pensalo bien antes de crearlo, porque por ahora no se puede cambiar después. Cada café tiene un programa.

**¿Cuánto cuesta y cómo pago?**
199 UYU por mes los primeros 6 meses desde que te registrás, después 399 UYU por mes. IVA incluido. Se paga desde el primer mes, por transferencia bancaria.

**¿Tengo que quedarme un tiempo mínimo?**
No. Cancelás cuando quieras desde el panel. Tu servicio sigue activo hasta el final del mes que ya pagaste y no se cobra nada más.

**¿Qué pasa si un cliente cambia de celular?**
Pide un código desde la página de tu café, le llega por email y recupera la misma tarjeta con los mismos sellos.

**¿Qué pasa con los datos de mis clientes?**
Cada cliente acepta participar y, aparte, decide si quiere recibir mensajes en el futuro; ninguna casilla viene marcada. Tu equipo ve solo el nombre y parte del teléfono, nunca el email. Los datos los cuida `{{marca}}`. Más info en la [política de privacidad].

**¿Mis clientes van a recibir mensajes por WhatsApp?**
No. Por ahora no le escribimos a nadie. El progreso se ve en la tarjeta.

**¿Sirve para otro tipo de comercio?**
Por ahora es solo para cafés.

### 10. CTA final

- **Título:** «Tu próximo cartón ya no va a ser de cartón.»
- **Texto:** «Registrate ahora y obtené el 50% bonificado durante los primeros 6 meses.» (fija) + «IVA incluido. Sin permanencia.»
- **Botón:** «Registrar mi café» · **Link:** «Prefiero escribir por WhatsApp»

### 11. Footer
- `{{marca}}` © 2026 · `{{razón social}}`
- «Escribinos por WhatsApp» · `{{email de contacto}}`
- [Política de privacidad] · [Términos de la oferta] **[PENDIENTE]**
- «Precios en pesos uruguayos, IVA incluido. Sin permanencia.»
- «Apple Wallet es una marca de Apple Inc. Google Wallet es una marca de Google LLC.» *(validar con legal; badges oficiales sin redibujar)*

---

## Parte 4 · Notas para diseño y desarrollo

- **Desvíos de la spec, para que Sally los valide:**
  - Agrego la sección 5 («Antes de que lo preguntes») y el bloque «Qué pasa después de registrarte».
  - Cambio el título de beneficios: de «Lo que no tenés que hacer» a «Lo que ganás dejando el cartón».
  - Unifico la etiqueta de WhatsApp en «Escribinos por WhatsApp».
  - Cambio los labels del formulario a «Nombre de tu café» y «Tu número de contacto». FR-L02 no fija el texto del label.
- **«Te escribimos a este número por WhatsApp» / «Alguien del equipo te escribe por WhatsApp».** Sale del mensaje de éxito actual. Es WhatsApp humano al comercio, no al cliente, así que no choca con «sin WhatsApp al cliente».
- **«Los sellos los suma solo tu equipo» / «cada uno queda registrado».** Salen de L2 (solo el staff suma y canjea) y FR-P08 (ledger append-only).
- **«No se moja / no hay que acordarse de traerla».** Son propiedades obvias de que la tarjeta esté en el celular, no promesas de resultado.
- **«Te falta 1» y «¡Ya podés canjear…!».** Se dice «le puede avisar» porque el aviso depende del celular y de las notificaciones de Wallet. «¡Ya podés canjear…!» se describe como algo que el cliente **ve**, no como notificación (OQ-S10 sin definir).
- **«Te ayudamos a crear tu programa».** En el PRD el dueño lo crea en el panel (FR-P07) y el onboarding es manual (D9). Si el equipo no lo acompaña, cambiar a «Creás tu programa en el panel».
- **No se usa nada de esto:** topes diarios, «minutos», «gratis/trial», «te quedás con los contactos», métricas, testimonios, otros rubros.

### Pendientes que siguen abiertos
- `{{marca}}`, logo, razón social y email de contacto.
- Número de WhatsApp: bloquea publicar.
- Textos legales e inscripción ante la URCDP.
- Acceso de publicación de Google Wallet. Si no llega a tiempo, sacar «Google Wallet» del copy.
- OQ-14: si «mes pagado» es mes calendario o mes desde el registro. El copy dice «hasta el final del mes que ya pagaste», que funciona con las dos opciones.
- OQ-12: qué ven los clientes en la tarjeta después de que el café cancela. No se menciona en la landing.
- Qué pasa si el dueño se equivoca al crear el programa (reglas bloqueadas).
- PRD pendiente de aprobación de Martin y Júlia.
