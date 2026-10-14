# DESIGN.md — MVP Sellos en Wallet (Uruguay) · Especificación visual

| | |
|---|---|
| **Autora** | Sally (UX) · 2026-10-14 |
| **Base** | `docs/product/brief.md` (2026-10-14), `docs/product/prd.md` v3 (**borrador, pendiente de OK de Martin y Júlia**), `docs/product/addendum.md`, `docs/tech/apple-wallet-research.md`, `docs/tech/google-wallet-research.md` |
| **Regla** | Si el pedido de John y el PRD chocan, gana el PRD. Los choques y huecos están en «Preguntas abiertas» (al final de `docs/ux/experience-spec.md`), no resueltos en silencio |
| **Idioma** | Spec en español; todo texto de interfaz en voseo uruguayo |
| **Fuera de esta spec** | Stack técnico, números no definidos en el PRD, resultados de pruebas de usabilidad (no hubo ninguna) |

Comportamiento, flujos, copy fijo y casos borde: ver `docs/ux/experience-spec.md`.

---

## 1. Superficies

| # | Superficie | Para quién | Dispositivo principal | Para qué sirve (una frase) |
|---|---|---|---|---|
| S1 | Landing de comercios | Dueño/a de café | Celular primero, también escritorio | Entender el producto, ver la oferta y registrarse o consultar por WhatsApp |
| S2 | Alta del cliente (desde el QR de caja) | Cliente | Celular (en la fila) | Sumarse al programa del café y guardar el pase en Wallet en menos de un minuto |
| S3 | Pase de Wallet (Apple / Google) | Cliente + barista | Celular del cliente | Mostrar el QR para escanear y el progreso de sellos |
| S4 | Panel del café | Dueño/a (crear programa) + staff (sumar/canjear) | Celular o tablet en caja | Crear el único programa y sumar o canjear en ≤3 toques |
| S5 | Recuperar el pase | Cliente | Celular | Volver a tener el mismo pase con el mismo saldo usando un código por email |
| S6 | Baja (desde el reverso del pase) | Cliente | Celular | Dejar el programa de ese café (FR-W06; no estaba en la lista de John, lo pide el PRD) |
| S7 | Email con el código | Cliente | Cliente de correo | Entregar el código de recuperación |

---

## 2. Principios visuales (aplican a todo)

1. **Una acción principal por pantalla.** Un solo botón primario lleno; el resto es secundario (contorno) o link.
2. **Lo que gana el cliente va antes que lo que se le pide.** En S2 la recompensa y la cantidad de sellos se ven antes del formulario (PRD §6).
3. **Marca del café en lo del cliente, marca del producto en lo del comercio.** S2, S3, S5 y S6 llevan nombre/logo del café; S1 y S4 llevan la marca del producto.
4. **Sin decoración que compita con la fila.** S2 y S4 se usan con apuro: nada de carruseles, animaciones largas ni modales encadenados.
5. **Tokens, no valores sueltos.** La paleta y la tipografía concretas quedan para identidad visual (no definidas aún); acá se fijan roles y reglas de contraste.

### 2.1 Tokens por rol

| Token | Uso | Regla |
|---|---|---|
| `color.primary` | Botón primario, foco, links | Texto sobre él ≥ 4,5:1 |
| `color.surface` / `color.text` | Fondo / texto base | ≥ 4,5:1 (texto normal), ≥ 3:1 (texto ≥ 24 px o 18,66 px negrita) |
| `color.success` | Sello sumado, alta lista | Nunca solo color: siempre ícono + texto |
| `color.warning` | Tope diario, código por vencer | Ícono + texto |
| `color.danger` | Error, canje, baja | Ícono + texto |
| `color.border` | Bordes de inputs y casillas | ≥ 3:1 contra el fondo (componente no textual) |
| `color.focus` | Anillo de foco | 2 px mínimo, ≥ 3:1 contra el fondo y contra el componente |
| `brand.cafe.*` | Color de fondo/texto/label del pase y header de S2/S5 | Se valida contraste al configurar; si no da, se usa el par por defecto del producto |

Tipografía: cuerpo ≥ 16 px (evita zoom automático en inputs de iOS), números de progreso grandes (≥ 32 px en S2/S4). Interlineado ≥ 1,4. Soporta zoom de texto al 200 % sin cortar contenido.

Espaciado: escala de 4 px. Densidad **baja** en S2/S4/S5 (botones grandes), **media** en S1.

---

## 3. Componentes que realmente necesitamos

| Componente | Dónde | Notas |
|---|---|---|
| `Button` (primario / secundario / destructivo / link) | Todas | Alto mínimo 48 px; ancho completo en celular. Estado *cargando*: spinner + texto («Guardando…»), deshabilitado para evitar doble envío |
| `TextField` | S1, S2, S4, S5 | Label visible siempre arriba (nunca solo placeholder), texto de ayuda, mensaje de error debajo |
| `PhoneField` | S1, S2, S5 | Prefijo +598 preseleccionado y editable; guarda en E.164 (FR-C02) |
| `EmailField` | S2, S5 | `type=email`, sin autocorrección ni mayúscula automática |
| `SelectField` (rubro) | S1 | Lista de opciones **por definir** (ver OQ); hasta entonces campo de texto |
| `Checkbox` | S2 | Caja ≥ 24×24 px, toda la fila (caja + texto) es tocable con alto ≥ 48 px. **Nunca premarcada** |
| `ConsentBlock` | S2 | Dos `Checkbox` separados visualmente (separador + 16 px), cada uno con su texto completo; (a) dice «obligatoria», (b) dice «opcional» |
| `WalletButtons` | S2, S5 | Badges oficiales «Agregar a Apple Wallet» / «Add to Google Wallet» (assets oficiales; Google tiene variante en español LatAm, pero la marca «Google Wallet» queda en inglés, ver research). No se redibujan |
| `ProgressStamps` | S2 (vista previa), S4, página de confirmación | N casilleros (3–15) en filas de 5 + texto «4 de 8 sellos». El texto es la fuente de verdad, los círculos son decoración |
| `ProgramSummaryCard` | S2, S4 | Nombre del programa, «N sellos = {{recompensa}}», en solo lectura |
| `Scanner` | S4 | Vista de cámara a pantalla casi completa, marco de encuadre, botón «Buscar por nombre o teléfono» siempre visible |
| `MemberCard` | S4 | Nombre, teléfono enmascarado (FR-P03, NFR minimización), progreso, botones Sumar / Canjear |
| `ConfirmSheet` | S4 (canje, ajuste), S6 (baja) | Hoja inferior con la acción repetida en el botón («Canjear un café gratis»), no «Aceptar» |
| `Toast` / banner de resultado | S4 | Resultado de sumar/canjear; permanece ≥ 5 s y se anuncia a lector de pantalla |
| `InlineAlert` | Todas | Error/aviso dentro de la página, no modal |
| `CodeInput` | S5 | Un solo input (no 6 casillas separadas) con `autocomplete="one-time-code"`, `inputmode="numeric"`; largo según arquitectura (OQ-9) |
| `EmptyState` | S4 | Ilustración opcional + 1 frase + 1 acción |
| `Skeleton` | S2, S4 | Bloques grises del layout final mientras carga |

---

## 4. Layouts por superficie

### S1 · Landing de comercios
Orden vertical (celular):
1. **Header**: marca del producto + botón secundario «Consultanos por WhatsApp».
2. **Hero**: titular de propuesta de valor + oferta destacada: **«Registrate ahora y pagá 199 UYU por mes durante los primeros 6 meses.» *[repo: actualizado según decisión de Martin 2026-10-14, ver DECISIONS.md]*** + debajo, en texto chico pero legible (≥ 14 px), el detalle del PRD: «199 UYU por mes durante 6 meses desde que te registrás. Después, 399 UYU por mes.» (ver OQ sobre si mostrar precios). CTA primario «Registrar mi café» que baja al formulario.
3. **Cómo funciona** en 3 pasos, con dos columnas en escritorio («Para tu café» / «Para tus clientes»): el cliente escanea el QR en caja → guarda la tarjeta en Wallet → el barista escanea y suma.
4. **Lo que no tenés que hacer**: sin app para el cliente, sin cartón, sin mensajes pagos.
5. **Formulario de registro** (FR-L02): Nombre del comercio · Número de contacto (rubro oculto, fijo `café`; *[repo: actualizado según PRD FR-L02]*). Botón «Registrar mi café».
6. **Bloque WhatsApp** (FR-L04): botón `wa.me` con ícono + texto «Escribinos por WhatsApp». Mientras OQ-4 esté abierta, el link apunta a un **placeholder visible**: `https://wa.me/598XXXXXXXX` y la etiqueta interna «NÚMERO A DEFINIR (OQ-4)» en entornos de prueba. **No se publica la landing con el placeholder.**
7. Footer: contacto, política de privacidad.

Escritorio: máx. 1120 px de ancho; formulario en columna de ≤ 480 px.

### S2 · Alta del cliente
Una sola página, una columna, sin header de navegación.
1. **Header del café**: logo + nombre del café.
2. **ProgramSummaryCard**: «Juntá **8 sellos** y llevate **un café gratis**» (valores del programa; ejemplo ilustrativo) + `ProgressStamps` vacío como vista previa.
3. **Formulario**: Nombre · WhatsApp · Email (los tres con «obligatorio» en el label, no solo un asterisco). Nota bajo WhatsApp: «Por ahora no te vamos a escribir por WhatsApp.»
4. **ConsentBlock**: (a) obligatoria, (b) opcional, ambas sin marcar.
5. Botón primario **«Sumarme»**.
6. Link secundario «¿Ya tenías la tarjeta? Recuperala» → S5.
7. Pie: quién trata los datos (la app, D1) + link a política.

**Pantalla de éxito (misma URL, reemplaza el formulario):** «¡Listo, {{nombre}}! Guardá tu tarjeta en Wallet.» + `WalletButtons` según plataforma detectada (iOS → Apple primero; Android → Google primero; si no se detecta, ambos con el mismo peso). Debajo: «Cuando la guardes, mostrale el QR al barista en cada compra.»

### S3 · Pase de Wallet
Restricciones reales (research): el pase es una **foto firmada, sin botones ni formularios**; pocos campos al frente; texto largo esconde campos; la imagen *strip* no se ve en Apple Watch; Google notifica como máximo 3 veces por pase cada 24 h y solo si el usuario tiene las notificaciones de Wallet activadas.

**Apple (`storeCard`)**
| Zona | Contenido |
|---|---|
| Logo + `logoText` | Logo del café + nombre del café |
| Campo de encabezado | «Sellos» → «4/8» |
| Strip (opcional) | Imagen de progreso regenerada en cada cambio (N círculos, llenos/vacíos). Decorativa: el número del campo es la fuente de verdad (Watch no muestra strip) |
| Campo primario | Recompensa: «un café gratis» |
| Secundario | Estado: «Te faltan 4» / «Te falta 1» / «¡Ya podés canjear un café gratis!» |
| Código | QR (`PKBarcodeFormatQR`, cuadrado), `altText` con un código corto de membresía (no el teléfono, FR-W01) |
| Reverso | Nombre del programa, regla «8 sellos = un café gratis», «Perdiste la tarjeta? Recuperala en {{link S5}}», **link de baja (FR-W06)**, contacto de quien firma el pase (pedido por Apple), link a privacidad |
| Colores | `backgroundColor`/`foregroundColor`/`labelColor` del café, con contraste validado (≥ 4,5:1 texto) |

**Google (Loyalty Class + Object)**
| Zona | Contenido |
|---|---|
| Class | `programName` = nombre del programa, `programLogo` = logo del café, `issuerName` = nombre del café |
| `loyaltyPoints` | label «Sellos», balance «4/8» |
| `textModulesData` | Recompensa y estado (mismos textos que Apple) |
| Barcode | QR con el ID de membresía |
| Links / módulos | Recuperar, baja, privacidad |

Estados visuales del pase: ver §5.3.

### S4 · Panel del café
Navegación: barra inferior en celular con 2 pestañas: **Escanear** (inicio) y **Programa**. Login antes de todo (FR-P01). El staff no ve controles de crear programa ni de ajuste (FR-P07c, FR-P08).

- **Escanear (inicio):** `Scanner` arriba (≈ 70 % del alto), debajo botón «Buscar por nombre o teléfono».
- **Resultado del escaneo / búsqueda → `MemberCard`:** nombre, teléfono enmascarado (ej. `+598 •• ••• 123`), `ProgressStamps` grande «4 de 8», botón primario **«Sumar sello»** (siempre en la misma posición), y **«Canjear {{recompensa}}»** que aparece habilitado solo con saldo ≥ N (si no, deshabilitado con texto «Le faltan 4 para canjear», no oculto).
- **Conteo de toques (FR-P02):** abrir panel (ya en Escanear) → escanear (no es toque) → «Sumar sello» = 1 toque. Canje: escanear → «Canjear» → confirmar = 2 toques.
- **Programa (dueño/a):**
  - Sin programa: formulario Nombre del programa · Cantidad de sellos (stepper − / + con input numérico, 3–15) · Recompensa (texto). Vista previa del pase al lado/abajo. Aviso fijo arriba del botón: «Ojo: después de crearlo no vas a poder cambiar los sellos ni la recompensa.» Botón «Crear programa» → `ConfirmSheet` que repite N y recompensa.
  - Con programa: `ProgramSummaryCard` en solo lectura con candado + «Las reglas no se pueden cambiar por ahora.» Botón «Descargar QR de caja» (para imprimir). No hay botón «Crear otro programa» visible; si se llega por URL, ver estado bloqueado.
- **Ajuste (solo dueño/a, FR-P08):** link discreto en `MemberCard` «Corregir saldo» → motivo obligatorio + cantidad.

### S5 · Recuperar el pase
Paso 1: «Ingresá tu teléfono o el email con el que te sumaste» (un campo; acepta cualquiera, FR-W05) → «Enviarme el código».
Paso 2: «Te mandamos un código a {{email enmascarado}}» + `CodeInput` + «Validar» + link «Reenviar código» (con espera visible) + «¿No te llegó? Revisá spam.».
Paso 3: éxito → `WalletButtons` con el mismo pase y saldo: «Tu tarjeta tiene 4 de 8 sellos».

### S6 · Baja
Desde el link del reverso: «¿Querés dejar el programa de {{café}}?» + explicación de qué pasa (pierde los sellos de ese café, el pase deja de actualizarse, otras tarjetas no cambian) + botón destructivo «Darme de baja» + link «Mejor no».

### S7 · Email del código
Asunto: «Tu código para recuperar la tarjeta de {{café}}». Cuerpo: código grande, vencimiento (valor de OQ-9), «Si no lo pediste, ignorá este email.» Texto plano disponible; sin imágenes necesarias para entender el código.

---

## 5. Estados

### 5.1 Matriz por superficie

| Superficie | Vacío | Cargando | Error | Éxito | Permiso denegado |
|---|---|---|---|---|---|
| S1 Landing | — (contenido estático) | Botón «Registrando…» deshabilitado | Error por campo debajo del input + resumen arriba con links a cada campo; error de red: «No pudimos registrar tu café. Probá de nuevo.» (datos conservados) | Reemplaza el formulario: «¡Listo! Recibimos tu registro. Alguien del equipo te va a escribir por WhatsApp para ponerte en marcha.» *[repo: actualizado, ver DECISIONS.md]* (FR-L02) | — |
| S2 Alta | QR de un programa inexistente/inactivo: «Este código no está activo. Pedile ayuda al personal del café.» | `Skeleton` del header + tarjeta del programa; botón «Sumando…» | Por campo (falta, formato), casilla (a) sin marcar, red caída; WhatsApp ya registrado → ofrece recuperar | Pantalla «¡Listo!» + `WalletButtons` | Dispositivo sin Wallet (FR-C06): «Para sumarte necesitás Apple Wallet o Google Wallet en tu celular. Por ahora no hay otra forma de tener la tarjeta.» Sin plan B |
| S3 Pase | 0/N: «Te faltan 8» | — (Wallet no muestra carga; cambia cuando llega el push) | Pase inactivo por baja: queda la última foto; sin actualizaciones | «Te falta 1» / «¡Ya podés canjear…!» | Notificaciones de Wallet apagadas: el pase igual se actualiza, sin aviso (no lo controlamos) |
| S4 Panel | Sin programa (dueño): «Todavía no creaste tu programa.» + «Crear programa». Sin programa (staff): «El dueño todavía no creó el programa.» Búsqueda sin resultados: «No encontramos a nadie con ese nombre o teléfono.» | Escáner iniciando: «Abriendo cámara…»; acción en curso: botón con spinner, deshabilitado | QR no válido / de otro café; saldo insuficiente; tope diario; sin conexión («Sin conexión. No se sumó el sello.») | Toast «Sello sumado · 5 de 8» / «Canje hecho · 0 de 8» | Cámara denegada: «Sin acceso a la cámara. Activalo en la configuración del navegador o buscá por nombre o teléfono.» + botón Buscar. Staff entrando a Programa/ajuste: «Solo el dueño puede hacer esto.» (FR-P07c). Sesión vencida → login |
| S5 Recuperar | — | «Enviando…», «Validando…» | No encontramos ese dato (mensaje neutro, ver EXPERIENCE §5); código incorrecto; vencido; demasiados intentos | `WalletButtons` con saldo | — |
| S6 Baja | Ya dado de baja: «Ya no participás del programa de {{café}}.» | «Procesando…» | Red: «No pudimos darte de baja. Probá de nuevo.» | «Listo, te diste de baja de {{café}}.» | — |

### 5.2 Reglas comunes de estado
- El estado de carga nunca borra lo que el usuario escribió.
- Todo error dice **qué pasó y qué hacer**, en una frase.
- Errores de servidor no muestran códigos técnicos al usuario.

### 5.3 Estados del pase
| Saldo | Texto de estado | ¿Notifica? |
|---|---|---|
| 0 … N−2 | «Te faltan {{faltan}}» | No (FR-W03) |
| N−1 | «Te falta 1 para {{recompensa}}» | Sí (`changeMessage` en Apple; `notifyOnUpdate` en Google) |
| ≥ N | «¡Ya podés canjear {{recompensa}}!» | Ver OQ (PRD no define si notifica) |
| Inactivo (baja) | Sin cambio visible; deja de actualizarse | No |

---

## 6. Accesibilidad (concreta)

- **Contraste:** texto ≥ 4,5:1; texto grande y bordes de inputs/casillas/foco ≥ 3:1. Colores del café para el pase y headers se validan al configurar; si fallan, se usa el par por defecto.
- **Objetivos táctiles:** mínimo 48×48 px; separación ≥ 8 px entre «Sumar sello» y «Canjear». Toda la fila de cada casilla es tocable.
- **Teclado:** orden de tab = orden visual; Enter envía formularios; Escape cierra `ConfirmSheet` y devuelve el foco al botón que la abrió; nada depende de hover. Foco visible siempre (anillo de 2 px).
- **Lectores de pantalla:**
  - Labels reales asociados a cada input; casillas con `<label>` que incluye el texto completo del consentimiento.
  - Errores enlazados con `aria-describedby`; al enviar con errores, el foco va al resumen de errores, que lista links a cada campo.
  - Resultado de sumar/canjear y de alta anunciado en región `aria-live="polite"` («Sello sumado. 5 de 8.»); errores bloqueantes con `role="alert"`.
  - `ProgressStamps` expone solo el texto «4 de 8 sellos»; los círculos son `aria-hidden`.
  - El escáner anuncia «Cámara lista» y el resultado de la lectura.
- **Autocompletar:** `autocomplete="name"`, `"tel"`, `"email"`, `"one-time-code"`, `"organization"` (nombre del comercio).
- **Movimiento:** respeta `prefers-reduced-motion` (sin animación de sello).
- **Idioma:** `lang="es-UY"` en todas las páginas.
- **No solo color:** todo estado tiene ícono + texto.
- **Tiempo:** el código de recuperación muestra el vencimiento en texto, no solo una cuenta regresiva; los toasts del panel duran ≥ 5 s y no tapan los botones.
- **Wallet:** el `altText` del QR permite cargar el código a mano si la cámara no lee (ver EXPERIENCE).
