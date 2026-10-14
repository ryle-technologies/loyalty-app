# Landing de comercios — Copy (borrador v1)

| | |
|---|---|
| **Fecha** | 2026-10-14 (v3: baja desde el panel, efectiva al fin del mes pagado — PRD FR-X01..X04) |
| **Para** | Martin Mateo Cerón |
| **Superficie** | S1 · Landing de comercios (orden de `DESIGN.md` §4 S1) |
| **Fuentes** | `brief.md`, `prd.md` v3 (**borrador, pendiente de OK de Martin y Júlia**), `DESIGN.md`, `EXPERIENCE.md`, `addendum.md`, research Apple/Google Wallet |
| **Mercado / tono** | Uruguay, voseo. Corto, cercano, sin signos de exclamación salvo frases fijas de logro (`EXPERIENCE.md` §3) |
| **Regla** | Sin cifras, testimonios, logos de clientes ni nombre de producto inventados. Lo que falta va como **[PENDIENTE]** |

> Las frases entre «» marcadas como **(fija)** son textos de `EXPERIENCE.md` §3 que no se cambian.
> `{{marca}}` = nombre del producto **[PENDIENTE: no está en ningún documento]**.

---

## 1. Header

- Marca: `{{marca}}` **[PENDIENTE: nombre y logo del producto — OQ-S13]**
- Botón secundario: **«Consultanos por WhatsApp»** → `https://wa.me/598XXXXXXXX?text=Hola%2C%20tengo%20un%20caf%C3%A9%20y%20quiero%20saber%20m%C3%A1s%20sobre%20la%20tarjeta%20de%20sellos.` **[PENDIENTE: número — OQ-4; no se publica con el placeholder]**

---

## 2. Hero

**Titular elegido:**
# Tu tarjeta de sellos, en el celular de tus clientes.
*(Es el titular base de `EXPERIENCE.md` §4. Lo elegí porque dice en 7 palabras qué es y dónde vive, sin prometer nada que el PRD no cubra.)*

**Alternativas:**
1. «Chau cartón. La tarjeta de sellos de tu café ahora vive en el Wallet de tus clientes.»
2. «Que tus clientes vuelvan por el próximo sello, sin apps ni cartones.»
3. «La tarjeta de sellos que tus clientes no pierden.» *(sale de la visión del brief: «una tarjeta de sellos que el cliente no pierde»)*

**Bajada (base de la spec):**
«Tus clientes la guardan en Apple Wallet o Google Wallet con un QR en caja. Vos sumás sellos en segundos.»

**Oferta destacada (fija):**
**«Registrate ahora y obtené el 50% bonificado durante los primeros 6 meses.»**

**Detalle de precio (texto chico, ≥ 14 px):**
«199 UYU por mes durante los primeros 6 meses, desde que te registrás. Después, 399 UYU por mes. IVA incluido. Sin permanencia: cancelás cuando quieras.»

**CTA primario:** «Registrar mi café» → baja al formulario (§6).

---

## 3. Cómo funciona (3 pasos)

En escritorio, dos columnas: «Para tu café» / «Para tus clientes». En celular, una sola lista.

**1. Tu cliente escanea el QR en caja**
Abre una página corta con el nombre de tu café y la recompensa. Pone su nombre, WhatsApp y email, y acepta participar. No descarga nada.

**2. Guarda la tarjeta en su Wallet**
Con un toque la agrega a Apple Wallet o Google Wallet. Ahí ve cuántos sellos lleva.

**3. Tu barista escanea y suma**
Escanea el QR de la tarjeta desde el panel, en el celular o la tablet del local, y suma el sello o canjea la recompensa. La tarjeta del cliente se actualiza sola. Cuando le falta uno, el pase le puede avisar: «Te falta 1 para {{recompensa}}».

*Nota de redacción:* «le puede avisar», no «le avisa». El aviso depende del sistema operativo y de que el cliente tenga las notificaciones de Wallet activadas (brief, riesgos; research Google: máx. 3 avisos por pase cada 24 h).

**Columna «Para tu café» (si se usa la vista de dos columnas):**
- Elegís cuántos sellos pide tu programa (entre 3 y 15) y cuál es la recompensa.
- Imprimís el QR de caja y lo ponés a la vista.
- Tu equipo suma y canjea desde el panel.

**Columna «Para tus clientes»:**
- Escanean el QR una sola vez.
- Llevan la tarjeta en el celular, siempre a mano.
- Si cambian de celular, la recuperan con un código que les llega por email, con los mismos sellos.

---

## 4. Beneficios

Título: **«Lo que no tenés que hacer»** (de `DESIGN.md`).

- **Tus clientes no instalan ninguna app.** La tarjeta va en el Wallet que ya tienen en el celular.
- **No imprimís más cartones.** Chau a la tarjeta que se pierde o se falsifica. Si el cliente cambia de celular, recupera la suya con los mismos sellos.
- **No pagás mensajes.** La tarjeta se actualiza en el Wallet sin costo por mensaje.
- **No necesitás un equipo nuevo.** El panel funciona en el celular o la tablet del local, con la cámara.
- **No aprendés a usar un sistema complicado.** Sumar un sello es escanear y tocar un botón.
- **No firmás permanencia.** Cancelás cuando quieras.

Bloque secundario: **«Lo que sí te llevás»**
- **Sellos en segundos, entre pedido y pedido.**
- **Sellos que no se duplican.** Un doble toque no suma dos sellos.
- **Tus clientes se suman con su consentimiento.** Cada uno acepta participar por separado y decide si quiere recibir mensajes en el futuro.

> **No usar (choque con los documentos):** «Te quedás con los contactos de tus clientes». En el PRD la app es la responsable del tratamiento de datos (D1), el staff ve los teléfonos enmascarados y nunca ve el email, y no existe exportación ni mensajes al cliente en el piloto. Ver Preguntas abiertas, Q1.
>
> **No usar:** «Configuralo en minutos» o «Empezá hoy». El onboarding es manual: Martin contacta al café después del registro (D9). Ver Q2.

---

## 5. Precio

**Título:** «Cuánto cuesta»

**Oferta (fija):** «Registrate ahora y obtené el 50% bonificado durante los primeros 6 meses.»

| | |
|---|---|
| **Primeros 6 meses** | **199 UYU por mes** |
| **Después** | 399 UYU por mes |
| | *IVA incluido* |

Microcopy:
- «Precios con IVA incluido.»
- «Pagás desde el primer mes. Los 6 meses con el 50% bonificado se cuentan desde el día en que te registrás.»
- «Pagás por transferencia bancaria.»
- «Sin permanencia mínima: cancelás cuando quieras. Pedís la baja desde el panel y el servicio sigue activo hasta el final del mes que ya pagaste.»
- «1 programa de sellos para tu café, con su QR de caja y su tarjeta en Apple Wallet y Google Wallet.»
- «Panel para sumar y canjear desde el celular o la tablet.»
- «Te ayudamos a arrancar: alguien del equipo te contacta después de que te registrás.»

CTA: «Registrar mi café»

---

## 6. Formulario de registro (FR-L02)

**Título:** «Registrá tu café»
**Texto de apoyo:** «Dejanos tus datos y alguien del equipo te contacta para empezar.»

| Campo | Label (visible, arriba) | Ayuda / placeholder | Error |
|---|---|---|---|
| Nombre del comercio | «Nombre del comercio (obligatorio)» | Placeholder: «Ej.: Café de la esquina» | «Escribí el nombre de tu comercio.» |
| Número de contacto | «Número de contacto (obligatorio)» | Prefijo +598 preseleccionado y editable. Ayuda: «Te vamos a llamar o escribir a este número.» | «Revisá el número. Tiene que ser un teléfono válido.» |

*Nota:* «obligatorio» en el label, no solo un asterisco (`DESIGN.md` S2, aplicado también acá por coherencia). `autocomplete="organization"` y `"tel"`.

**Rubro: no se muestra.** Por ahora la landing es solo para cafés (decisión de Martin), así que el campo se manda oculto con valor fijo `café`. Así lo define FR-L02 del PRD actualizado.

- **Botón:** «Registrar mi café» → en curso: «Registrando…» (deshabilitado)
- **Resumen de errores (arriba del form):** «Revisá estos datos para seguir:» + links a cada campo
- **Error de red:** «No pudimos registrar tu café. Probá de nuevo.» (se conservan los datos)
- **Éxito (fija, reemplaza el formulario):** «¡Listo! Recibimos tu registro. Alguien del equipo te va a escribir por WhatsApp para ponerte en marcha.»
- **Microcopy de privacidad bajo el botón:** «Usamos estos datos solo para contactarte por el registro. Leé la [política de privacidad].» **[PENDIENTE: texto legal y link — OQ-S11]**
- **Registro duplicado:** sin copy definido **[PENDIENTE — OQ-S9]**

---

## 7. Bloque WhatsApp (FR-L04)

- Título: «¿Tenés dudas antes de registrarte?»
- Texto: «Escribinos y te responde una persona.»
- Botón (con ícono): **«Escribinos por WhatsApp»** → `https://wa.me/598XXXXXXXX?text=…`
- Mensaje prellenado (de `EXPERIENCE.md` F1): «Hola, tengo un café y quiero saber más sobre la tarjeta de sellos.»
- **[PENDIENTE: número — OQ-4. Bloquea publicar la landing (E23).]**

---

## 8. Preguntas frecuentes

**¿Es para cualquier comercio?**
Por ahora es solo para cafés.

**¿Mis clientes tienen que descargar una app?**
No. Escanean el QR en caja, completan un formulario corto y guardan la tarjeta en Apple Wallet o Google Wallet, que ya viene en el celular.

**¿Y si un cliente no tiene Wallet?**
Por ahora necesita Apple Wallet o Google Wallet para sumarse. No hay tarjeta en papel ni otra opción durante el piloto. En Android, además, tiene que tener una cuenta de Google iniciada en el celular.

**¿Cómo suma sellos mi equipo?**
Desde el panel, en el celular o la tablet del local: escanean el QR de la tarjeta del cliente y tocan «Sumar sello». Si el cliente no tiene la tarjeta a mano, lo buscan por nombre o teléfono.

**¿Puedo elegir cuántos sellos y qué recompensa?**
Sí. Elegís entre 3 y 15 sellos y escribís la recompensa, por ejemplo «un café gratis». Ojo: una vez creado el programa, por ahora no se pueden cambiar los sellos ni la recompensa, así que te conviene pensarlo antes. Por ahora cada café tiene un solo programa.

**¿Cuánto cuesta?**
Si te registrás ahora, 199 UYU por mes durante los primeros 6 meses, contados desde que te registrás. Después, 399 UYU por mes. Los precios incluyen IVA. Se paga desde el primer mes.

**¿Cómo pago?**
Por transferencia bancaria.

**¿Tengo que firmar por un tiempo mínimo?**
No. No hay permanencia: cancelás cuando quieras. La baja la pedís desde el panel y tu servicio sigue activo hasta el final del mes que ya pagaste. No se cobran más meses.

**¿Qué pasa si un cliente cambia de celular o pierde la tarjeta?**
La recupera desde la página del café: pide un código, le llega por email y vuelve a agregar la misma tarjeta, con los mismos sellos.

**¿Qué pasa con los datos de mis clientes?**
Cada cliente acepta participar del programa y, por separado, decide si quiere recibir mensajes en el futuro. Ninguna casilla viene marcada. Los datos los trata `{{marca}}` según la Ley 18.331 de protección de datos personales. **[PENDIENTE: razón social del responsable, estado de la inscripción ante la URCDP, link a la política de privacidad — OQ-S11. Confirmar también qué ve el café de esos datos — Q1.]**

*FAQ opcional (si sobra lugar):*
**¿Mis clientes van a recibir mensajes por WhatsApp?**
No. Durante el piloto no le escribimos a nadie por WhatsApp. El progreso se ve en la tarjeta del Wallet.

---

## 9. CTA final

- Título: «Dejá el cartón. Pasate a la tarjeta en el celular.»
- Oferta (fija): «Registrate ahora y obtené el 50% bonificado durante los primeros 6 meses.»
- Botón primario: «Registrar mi café»
- Link secundario: «Prefiero escribir por WhatsApp»

---

## 10. Footer

- `{{marca}}` © 2026 **[PENDIENTE: nombre / razón social]**
- Contacto: «Escribinos por WhatsApp» (mismo link) · email de contacto **[PENDIENTE]**
- [Política de privacidad] **[PENDIENTE: texto legal (URCDP, Ley 18.331) — OQ-S11]**
- «Precios con IVA incluido. Sin permanencia.»
- [Términos y condiciones de la oferta] **[PENDIENTE: no existe texto; definir si hace falta]**
- «Apple Wallet es una marca de Apple Inc. Google Wallet es una marca de Google LLC.» **[PENDIENTE: validar con legal; usar los badges oficiales sin redibujarlos]**
- Montevideo, Uruguay **[PENDIENTE: confirmar si se muestra domicilio]**

---

## Notas de marca y redacción

- Ante el **comercio** se puede usar «programa», «panel», «app» (en «sin app»). Ante el **cliente final** no se usa «puntos», «cupón», «app», «cuenta» ni «fidelización» (`EXPERIENCE.md` §3).
- «Google Wallet» y «Apple Wallet» van con su nombre en inglés (Uruguay no tiene nombre localizado, research Google).
- No hay testimonios, cifras de resultados ni logos de cafés: no existen en los documentos (no hubo entrevistas nuevas ni estudios de usabilidad).

---

## Preguntas abiertas y conflictos encontrados

Numeradas Q1… para referenciarlas desde el copy. Entre paréntesis, el ID del documento original cuando existe.

*Resueltas por Martin el 2026-10-14 y quitadas de la tabla:* Q3 (se usa 199 UYU), Q4 (se cobra desde el primer día, sin período gratis), Q5 (IVA incluido, transferencia bancaria, sin permanencia), Q6 (solo cafés por ahora), Q12 (quitada del copy).

*Resueltas por el PRD actualizado (`prd.md`) y quitadas de la tabla:* Q17 (la baja la pide el dueño desde el panel con «Cancelar servicio» y es efectiva al final del mes pagado — FR-X01..X04), Q18 (FR-L02: rubro oculto con valor fijo `café`), Q19 (éxito del piloto = ≥1 canje real + el café sigue activo y paga el mes 2).

| # | Tema | Qué dicen los documentos | Qué hice en el copy | Decide |
|---|---|---|---|---|
| Q1 | **«El café se queda con los contactos de sus clientes»** (propuesta de valor del pedido) | PRD/brief: la app es **responsable del tratamiento** (D1); el staff ve teléfonos enmascarados y **nunca** el email (`EXPERIENCE.md` §2); no hay exportación, ni mensajes al cliente, ni campañas en el piloto. El WhatsApp se guarda para una reactivación futura sin fecha (OQ-7) | **No lo prometí.** Lo reemplacé por «tus clientes se suman con su consentimiento». Si se quiere usar, hace falta definir qué datos ve o exporta el café, con qué base legal y actualizar la política de privacidad | Martin (+ legal) |
| Q2 | **«Se configura en minutos»** | No hay ningún tiempo de setup en los docs. El onboarding es **manual, a cargo de Martin** (D9); después del registro solo se muestra «Martin te va a contactar» | No usé «en minutos». Usé «Martin te contacta para empezar» | Martin |
| Q7 | **Número de WhatsApp** (OQ-4) | Por definir. **Bloquea publicar** la landing (E23) | Placeholder `598XXXXXXXX` | Martin |
| Q8 | **Nombre y logo del producto** (OQ-S13) | No existen en los documentos | `{{marca}}` [PENDIENTE] | Martin |
| Q9 | **Textos legales** (OQ-S11) | Política de privacidad, textos finales de las casillas, inscripción ante la URCDP (prevista, no confirmada como hecha) | [PENDIENTE] en FAQ y footer; no afirmé que la base ya está inscripta | Martin / legal |
| Q10 | **Aviso «Te falta 1»** | Depende del SO y de las notificaciones de Wallet; Google limita a 3 avisos por pase cada 24 h (research, E15/E16) | Escribí «el pase le **puede** avisar» | — (redacción) |
| Q11 | **Clientes sin Wallet / Android** | Sin plan B (D3). En Android hace falta cuenta de Google iniciada; además, Google Wallet arranca en **modo demo** y necesita acceso de publicación antes del piloto Android (E19) | Lo dije claro en el FAQ. Si no hay acceso de publicación de Google a tiempo, la landing no debería prometer Google Wallet | Winston / Martin |
| Q13 | **Reglas bloqueadas y un solo programa** (OQ-S4) | Si el dueño se equivoca al crear el programa, no hay forma de corregirlo en el MVP | Lo avisé en el FAQ. Falta definir si Martin lo corrige a mano | John / Martin |
| Q14 | **Botón de WhatsApp con dos textos** | `DESIGN.md` usa «Consultanos por WhatsApp» en el header y «Escribinos por WhatsApp» en el bloque | Mantuve los dos como dice la spec; sugiero unificar en «Escribinos por WhatsApp» | Sally |
| Q15 | **PRD v3 sin aprobar** (OQ-S1) | Pendiente de OK de Martin y Júlia | Todo este copy puede cambiar si cambia el PRD | Martin / Júlia |
| Q16 | **Mensaje de éxito nombra a Martin** | La frase fija «¡Gracias! Martin te va a contactar…» no escala si se suma otra persona al onboarding | **Resuelta:** cambiada a «Alguien del equipo te va a escribir…» | Martin |
