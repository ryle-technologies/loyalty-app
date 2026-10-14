# Product brief — Tarjeta de sellos en Wallet para cafés (MVP sin WhatsApp)

| | |
|---|---|
| **Fecha** | 2026-10-14 (decisiones cerradas + landing de comercios) |
| **Base** | PRD MVP Soft Launch v2 (owner Júlia, 2026-10-13) + decisiones de Martin |
| **Mercado** | **Uruguay primero** (copy en voseo). Colombia más adelante |
| **Versiones anteriores** | `archive/product/brief-2026-10-14-whatsapp.md`, `archive/product/brief-2026-09-16.md` |
| **Próximo owner** | John → PRD v3, pendiente de aprobación de Martin y Júlia |

## Visión

Que un café chico tenga una tarjeta de sellos que el cliente no pierde y que el equipo maneja en segundos, sin que nadie se descargue una app ni reciba mensajes que no pidió. El cliente se suma desde un QR en caja, lleva la tarjeta en Apple/Google Wallet y ve su progreso en el pase. El café ve que la gente vuelve y paga por eso.

## Usuarios

- **Dueño/a del café (comprador):** un solo local, sin equipo de marketing. Quiere que los clientes vuelvan más y dejar el cartón, sin aprender a usar un CRM. Llega por la landing de comercios o por contacto directo.
- **Barista/cajero (operador):** escanea el pase y suma o canjea entre pedidos, en menos de 10 segundos.
- **Cliente:** no instala nada. Completa un formulario corto una sola vez y guarda la tarjeta en el celular.

## Problema

La tarjeta de cartón se pierde y se falsifica. Las apps de fidelización son pesadas para un local chico. El PRD v2 se apoyaba en WhatsApp para el alta y para mostrar el progreso. Desde el 1-oct-2026, Meta cobra también los mensajes de servicio y los de utilidad dentro de la ventana de 24 h (detalle en `docs/product/addendum.md`). Por eso el piloto no usa WhatsApp con el cliente: el progreso vive en el pase de Wallet, que se actualiza por push sin costo por mensaje.

## Solución (lo mínimo que prueba la visión)

1. **Landing de comercios** (dirigida a cafés, no al cliente final): explica el producto con la oferta «Registrate ahora y pagá 199 UYU por mes durante los primeros 6 meses.» *[repo: actualizado según decisión de Martin 2026-10-14, ver DECISIONS.md]*, tiene un formulario de registro del comercio (nombre del comercio y número de contacto; el rubro va oculto y fijo en «café»; onboarding manual a cargo de Martin) y un botón/link de WhatsApp para consultas. Ese WhatsApp es un click-to-chat atendido por una persona, **sin API de Meta** y sin costo de mensajes.
2. **QR en caja → página web corta** para el cliente.
3. **Formulario del cliente** (todos los campos obligatorios salvo lo indicado):
   - *Nombre*, *número de WhatsApp* y *email* — los tres obligatorios.
   - Dos casillas de consentimiento **separadas y sin marcar**:
     - (a) participar del programa de sellos — obligatoria;
     - (b) recibir mensajes en el futuro — opcional.
   - El WhatsApp se guarda aunque en el piloto no se mande ningún mensaje: sirve para la reactivación futura.
   - Se guarda constancia de cada consentimiento: fecha, texto aceptado y café.
4. **"Agregar a Apple/Google Wallet":**
   - El pase muestra un QR que el barista escanea para sumar o canjear.
   - Cada cambio actualiza el pase por push.
   - Cuando falta 1 sello, el pase muestra **"Te falta 1"** como notificación de cambio.
5. **Recuperación del pase por email:** el cliente pide recuperarlo, recibe un código por email y vuelve a agregar el pase. El teléfono sigue siendo la identidad del cliente.
6. **Panel mínimo:** escanear o buscar, sumar sello y canjear en ≤3 toques. Cada café crea **un programa** (en el MVP, solo uno) y configura cuántos sellos pide (entre 3 y 15) y cuál es la recompensa, sin valores fijos ni sellos de bienvenida. Una vez creado, sus reglas (sellos y recompensa) **no se pueden cambiar** en el MVP. El programa tiene su propio QR de caja y el pase de Wallet pertenece a ese programa. Ledger append-only, idempotencia, topes diarios antifraude, sellos no transferibles.
7. **Cobro manual:** cada café paga **199 UYU por mes durante 6 meses** desde que se registra y después **399 UYU por mes**, **IVA incluido**. Se cobra desde el primer día (no hay piloto gratis). Pago por transferencia bancaria, registrado a mano en la planilla. Sin permanencia: cancela cuando quiera.
8. **Baja del comercio:** el dueño la pide desde el panel; corre al final del mes ya pagado y hasta entonces el panel sigue funcionando. Después, propuesta: los pases muestran «Este programa terminó» y no suman más sellos (abierto).
9. **Baja del cliente:** borrar el pase + enlace de baja por comercio en el reverso del pase.
10. **Prerrequisito del piloto:** cuenta Apple Developer abierta (firmar y actualizar pases).

## Alcance

**Dentro:**
- Landing de comercios (explicación + registro + WhatsApp click-to-chat humano).
- QR en caja con formulario (nombre, WhatsApp, email + doble consentimiento).
- Pase Apple/Google Wallet (QR, push, aviso "te falta 1").
- Recuperación del pase por código enviado al email.
- 1 programa por café (sellos + recompensa configurables, QR y pase propios).
- Panel sumar/canjear.
- Ledger, idempotencia, topes, sellos no transferibles.
- Baja por comercio.
- Copy en **voseo** (Uruguay).
- La app es **responsable del tratamiento** e inscribe la base ante la URCDP (Ley 18.331).

**Fuera o diferido** (motivos en `docs/product/addendum.md`):
- WhatsApp al cliente en el piloto (alta, avisos, reactivación).
- Número propio de WhatsApp por café.
- NFC / Apple VAS.
- Tarjeta web / plan B para quien no tiene Wallet (queda fuera del piloto).
- Ventana founding / cupos founding.
- Colombia / Ley 1581 (más adelante).
- Editar las reglas del programa después de crearlo (futuro).
- Otros rubros además de café (futuro).
- Varios programas por café (ej. café y tortas): futuro; el modelo de datos no debe impedirlo (nota para Winston).
- Cambio de teléfono asistido, dashboard de KPIs, billing en el sistema, merge dual-OTP, app de cliente, caducidad, campañas.

## Decisiones cerradas (Martin, 2026-10-14)

| # | Decisión |
|---|---|
| D1 | La app es responsable del tratamiento; inscribe la base ante la URCDP |
| D2 | Email obligatorio; recuperación del pase con código por email. Formulario: nombre, WhatsApp, email (todos obligatorios) + 2 casillas |
| D3 | Sin plan B web: quien no tenga Wallet queda fuera del piloto |
| D4 | Sin founding. 199 UYU/mes por 6 meses desde el registro, luego 399 UYU/mes, IVA incluido; cobro desde el día 1; transferencia; sin permanencia |
| D5 | Primer mercado: Uruguay, copy en voseo. CO después |
| D6 | Abrir cuenta Apple Developer es prerrequisito del piloto |
| D7 | Se pide WhatsApp ahora para la reactivación futura |
| D8 | Landing de comercios con registro (nombre del comercio, contacto; rubro oculto = café) y WhatsApp click-to-chat humano (sin API). Solo cafés |
| D10 | Éxito del piloto = ≥1 canje real **y** el café sigue activo y paga el mes 2 |
| D14 | Baja del comercio desde el panel, efectiva al fin del mes pagado |
| D11 | Cada café configura sellos por recompensa y la recompensa; sin bienvenida ni N fijo |
| D12 | 1 programa por café en el MVP, con QR y pase propios; varios programas = futuro |
| D13 | Reglas del programa bloqueadas después de crearlo; editar = futuro |
| D9 | Onboarding del comercio manual, a cargo de Martin |

## Métricas de éxito (por café)

- **Al menos 1 canje real**, y
- el café **sigue activo y paga el mes 2**.
- **Embudo del alta** (sin meta fija): escanea → abre → envía formulario → agrega el pase.

## Riesgos

- Fricción del formulario en caja (tres campos + dos casillas): pocas altas = pocos canjes.
- Reactivación débil sin canal de mensajes en el piloto.
- Experiencia Android / Google Wallet no validada.
- Certificados Apple: costo anual y vencimiento.
- Clientes sin Wallet fuera del piloto.
- Notificación "te falta 1" depende del SO.
- Onboarding del comercio: si el registro de la landing es solo un lead, hace falta un proceso manual claro.

## Preguntas abiertas

1. ¿Qué número de WhatsApp se usa para las consultas de la landing?
2. ¿Qué dispara la vuelta de WhatsApp al cliente (reactivación)?
3. ¿Qué ven los clientes en el pase después de la baja del café? (propuesta: «Este programa terminó», sin sellos nuevos; ¿se les avisa?, ¿cuánto se guardan sus datos?)
4. ¿El dueño puede anular la baja antes de que sea efectiva? ¿«Mes pagado» es calendario o desde el registro?
5. Vencimiento y límite de intentos del código de recuperación (Winston).

*Cerradas:* inicio de los 6 meses bonificados (al registrarse), campos del registro de comercio, onboarding manual (Martin), precio (399 UYU por mes; 199 UYU por mes durante los primeros 6 meses), meta de ≥50 % quitada, sellos y recompensa configurables por café (sin bienvenida ni 10 fijos), rango de sellos 3 a 15, IVA incluido, cobro desde el día 1 por transferencia, sin permanencia, solo cafés, éxito = canje + paga el mes 2.

## Recomendación

**PRD v3 listo para revisión de Martin y Júlia.** Owner: John. Siguiente: Sally (UX de landing, formulario de alta y panel) → Winston (arquitectura).
