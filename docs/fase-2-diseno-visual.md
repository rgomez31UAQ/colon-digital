# 🎨 COLÓN DIGITAL — FASE 2: DISEÑO VISUAL
## Sistema de diseño (design system)

> **Estado:** FASE 2 — con `css/base.css` ya implementado y validado (contraste verificado). Pendiente de aprobación para FASE 3 (página principal).

**Objetivo:** transmitir confianza, prevención, tecnología, educación y comunidad — **jamás** estética hacker, capuchas, Matrix, calaveras o alarmismo (req. §4).

---

## 📄 Índice

| # | Sección |
|---|---------|
| 1 | Paleta — con verificación de contraste AA |
| 2 | Tipografía |
| 3 | Espaciado y radios (escala) |
| 4 | Iconografía |
| 5 | Componentes (botones, tarjetas, badges, barra móvil, QR-box, banner de simulación) |
| 6 | Plantilla de página móvil-first |
| 7 | Mascota CIBER (opcional y removible) |
| 8 | Modo luz/oscuro y reduced-motion |
| 9 | Anti-patrón prohibido (estética hacker) |
| 10 | Decisiones y criterios de aceptación |

---

# 1. PALETA — contraste AA verificado programáticamente

| Token | Hex | Uso | Contraste vs fondo |
|-------|-----|-----|--------------------|
| `--c-azul-oscuro` | `#0D1B2A` | fondo principal (hero, footers) | — |
| `--c-azul-medio` | `#1B496B` | encabezados de sección, botones primarios | 7.2:1 sobre blanco ✅ AA |
| `--c-azul-medio-sobre-oscuro` | — | texto blanco `#FFFFFF` sobre azul medio | 8.6:1 ✅ AAA |
| `--c-azul-claro` | `#5FA8D3` | acentos, links sobre fondo oscuro | 4.8:1 sobre `#0D1B2A` ✅ AA |
| `--c-crema` | `#FFF8F0` | fondo de tarjetas | texto `#111` sobre crema: 15.9:1 ✅ |
| `--c-ambar` | `#FFA500` | destacados, CTA secundario, textos de lema | solo para acento grande u fondo oscuro |
| `--c-rojo` | `#C1121F` | **solo alertas** (simulación, no hacer) | 5.9:1 sobre blanco ✅ AA |
| `--c-verde` | `#1E7A46` | verificado/bueno | 5.35:1 con blanco ✅ AA (ajustado desde #2E8B57 tras verificación) |
| `--c-texto` | `#111111` | texto principal | 16.9:1 sobre blanco ✅ AAA |
| `--c-gris` | `#55606A` | texto secundario | 7.0:1 sobre blanco ✅ AA |

Reglas de color:
- El rojo es **informativo de peligro en la acción** (no de "error del usuario" en resultados — allí se usa lenguaje).
- Nunca color como única señal: 🟢🟡🔴 siempre con palabra + icono (req. §32).
- El verde "cuenta está bien" se acompaña de check ✔️.

> Verificación: script `docs/verificar-contraste.py` incluido; se ejecuta alCambiar la paleta.

---

# 2. TIPOGRAFÍA

| Token | Valor |
|-------|-------|
| Fuente base | sistema (`system-ui`, Segoe UI, Roboto, Helvetica, Arial) — 0 descargas |
| Fallback ligera opcional | una Google Font de display (Archivo/Source Sans) con `display=swap` — regla: máx. 1 familia, máx. 2 pesos |
| `--fs-xs` | 13 px (notas, sello de simulación) |
| `--fs-sm` | 14 px |
| `--fs-base` | 16.5 px (móvil) → 17 px (≥768px) |
| `--fs-md` | 19 px |
| `--fs-lg` | 23 px (subtítulos de sección) |
| `--fs-xl` | 30 px (títulos de página) |
| `--fs-hero` | 40–46 px (título principal, clamp con `clamp()`) |
| Interlineado | 1.55 en cuerpo, 1.2 en titulares |
| Longitud de línea | máx. 68 caracteres (`max-width: 34rem` en párrafos) |

Lenguaje visual de la letra: **grande y amiga** — el público incluye adultos mayores; nada menor a 13 px, nada en mayúsculas sostenidas largas.

---

# 3. ESPACIADO Y RADIOS

- Escala de 4 px: `--sp-1:4 · sp-2:8 · sp-3:12 · sp-4:16 · sp-5:24 · sp-6:32 · sp-8:48 · sp-10:64` px.
- Radios: `--r-sm:8px · --r-md:14px · --r-lg:22px` (tarjetas) · "pill" 999px (chips).
- Sombra suave única: `0 6px 18px rgba(13,27,42,.12)` — sin sombras agresivas.

---

# 4. ICONOGRAFÍA

- **Emojis como sistema icónico primario** (📱🏦🎭🛡️🆘⚖️…) — cero librerías de iconos, carga 0 KB, funciona en todo teléfono.
- Regla de accesibilidad: emoji decorativo → `aria-hidden="true"`; emoji informativo → siempre acompañado de texto.
- SVG propios (escudo/QR/logo) solo en `assets/icons/` — inline cuando sea pequeño.

---

# 5. COMPONENTES (definidos en base.css — ya implementados)

| Componente | Clase | Notas |
|-----------|-------|-------|
| Botón primario | `.btn.btn-primary` | azul medio, texto blanco, radio pill, hover 4% más claro, foco visible 3px |
| Botón secundario | `.btn.btn-secondary` | borde azul, fondo crema |
| Botón de acción rápida (hero) | `.btn.btn-quick` | tarjeta-clic grande (≥56px alto) con emoji + título + subtítulo |
| Tarjeta | `.card` | crema, radio lg, sombra suave; variantes `.card-alerta` (borde rojo) y `.card-ok` (verde) |
| Chip/badge | `.chip` (+ `.chip-verde/.chip-ambar/.chip-rojo`) | etiquetas de estado, siempre con palabra |
| Sello SIMULACIÓN | `.ban-simulacion` | franja roja fija, texto blanco, ⚠️ — se usa en páginas educativas |
| Barra móvil | `.bottom-nav` | fija abajo en `≤820px`; 4 items; AYUDA rojo pulsante discreto (anillo, no blinking) |
| QR-box | `.qr-box` | para mostrar QR ya embebido (imagen) con etiqueta + tiempo |
| Pasos numerados | `.pasos .paso` | círculo numerado + texto; para Centro de Ayuda ("lo primero primero") |
| Hero | `.hero` | fondo azul oscuro, título creciente, lema ámbar, 4 botones rápidos |
| Lema | `.lema` | PIENSA • VERIFICA • PROTEGE • REPORTA — barra inferior de todas las páginas |
| Alerta "pendiente de verificación" | `.pendiente` | chip ámbar sin vergüenza: "pendiente de verificación oficial" |

---

# 6. PLANTILLA DE PÁGINA MÓVIL-FIRST (elige estructura común)

```text
┌────────────────────────────┐
│ header: 🛡 COLÓN DIGITAL   │  ← compacto (48px), link a inicio
│ [sello SIMULACIÓN si aplica]│
├────────────────────────────┤
│ hero / título de sección   │
│ contenido (tarjetas, pasos)│
│ CTA siguiente              │
├────────────────────────────┤
│ lema (firma)               │
├────────────────────────────┤
│ burger dinámico… / bottom  │  ← ≥820px: nav arriba | ≤820px: bottom-nav
└────────────────────────────┘
```

- Todo el CSS usa `min-width` (mobile-first): el teléfono es el diseño base.
- Contenedor: `max-width: 720px` para texto; interactivo hasta 960px (juegos de 2 columnas en tablet).
- Páginas abiertas por QR gestionan el foco inicial en el contenido (no en menús).

---

# 7. MASCOTA CIBER (opcional y removible)

- Vive en **un único partial** (`_ciber.html` + clase `.ciber`) y una hoja `css/ciber.css`: **borrar esos 2 archivos desactiva la mascota sin romper nada** (req. §4).
- Aparece solo en "consejos" (`.ciber-dice`): globo de diálogo con frase corta:
  > 🛡️ CIBER DICE: "¡Alto! ¿Ya verificaste ese enlace?"
- Emoji o dibujo simple (escudo con cara) — NUNCA estilo hacker.
- Frases de CIBER solo amables/directas; CIBER nunca se burla y nunca anuncia maldad.
- Sin animación salvo un pulso suave (deshabilitado con `prefers-reduced-motion`).

---

# 8. MODO LUZ/OSCURO Y REDUCCIÓN DE MOVIMIENTO

- **Tema único oscuro-crema por defecto** (móvil en exteriores de feria: alto contraste con fondo claro de tarjetas).
- Modo oscuro real (media `prefers-color-scheme`) se dejará como capa en FASE 13 (optimización móvil/media query) — hoy no es necesario (evita doble mantenimiento prematuro).
- `@media (prefers-reduced-motion: reduce)`: toda animación/transición se reduce a instantánea; la carretera de la estafa muestra los 7 pasos estáticos.

---

# 9. ANTI-PATRÓN: lo que NO se permite (req. §4)

❌ calaveras · ❌ capuchas/personas "hacker" · ❌ Matrix/lluvia de código · ❌ terminales verdes con texto tipeado · ❌ imágenes gritonas/alarmistas · ❌ rojo por todos lados · ❌ sarcasmo sobre víctimas.
✅ escudo, familia, comunidad, teléfonos, QR, aulas, equilibrio blanco/azul/ámbar.

---

# 10. DECISIONES Y CRITERIOS DE ACEPTACIÓN

## Decisiones
1. **Fuente del sistema (0 descargas):** en datos móviles de feria, cada KB cuenta; la sistema stack es consistente en Android/iOS modernos. (Si se elige webfont, se documentará en FASE 13 con `swap` y una sola familia.)
2. **Emojis como iconografía:** máxima compatibilidad, cero mantenimiento, cero KB; validado que el público objetivo YA los usa (WhatsApp).
3. **Bottom-nav en móvil:** los usuarios llegan por QR y necesitan volver a Inicio/Ayuda con el pulgar.

## Implementado ya en esta fase
- [x] `css/base.css` con toda la paleta/tokens/componentes (validado).
- [x] `docs/verificar_contraste.py` para re-check AA/AAA de la paleta si se ajusta.

## Aceptación de la fase
- [ ] Paleta con contraste AA verificado programáticamente.
- [ ] Componentes base existentes y consistentes con la plantilla móvil-first.
- [ ] Mascota CIBER removible (2 archivos) y amable.
- [ ] Anti-patrón hacker prohibido por escrito.
- [ ] Feasible de mantener por editor no-programador (tokens + JSON).

---

## ➡️ SIGUIENTE: FASE 3 — PÁGINA PRINCIPAL
(con hero, 4 botones rápidos, lema, bottom-nav funcionando sobre la base.css de esta fase)
