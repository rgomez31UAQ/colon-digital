# 🛡️ COLÓN DIGITAL — FASE 1: ARQUITECTURA
## Plataforma digital para la Feria de Colón + Seguridad Digital + Prevención Ciudadana

> **Estado:** FASE 1 (arquitectura) — pendiente de aprobación. **No se programa aún.**

---

## 📄 Índice

| # | Sección |
|---|---------|
| 1 | Arquitectura general |
| 2 | Mapa de navegación |
| 3 | Estructura de carpetas |
| 4 | Arquitectura de datos (JSON) |
| 5 | Sistema de rutas |
| 6 | Sistema de QR (estable) |
| 7 | Arquitectura del Centro de Ayuda |
| 8 | Separación Feria / contenido permanente |
| 9 | Propuesta tecnológica |
| 10 | Estrategia de accesibilidad |
| 11 | Estrategia de privacidad |
| 12 | Estrategia de seguridad |
| 13 | Propuesta visual |
| 14 | Escalabilidad municipal |

---

# 1. ARQUITECTURA GENERAL

Modelo: **sitio 100% estático** (HTML/CSS/JS + JSON), sin backend, sin base de datos, sin cuentas. Un único repositorio publicable en GitHub Pages.

```text
             ┌────────────────────────────┐
             │      USUARIO MÓVIL         │  ← QR escaneado desde la presentación
             └──────────┬─────────────────┘
                        ↓ url estable (/qr/...)
             ┌──────────▼─────────────────┐
             │   ROUTER DE QR (redirect)  │  ← capa de redirección editable
             └──────────┬─────────────────┘
                        ↓
     ┌──────────────────┴───────────────────────┐
     │              COLÓN DIGITAL               │
     │  ┌──────────┬──────────┬──────────────┐  │
     │  │  FERIA   │ SEGURIDAD│  TALLER      │  │  ← contenido
     │  │ (temporal)│ (perman)│  (permanente)│  │
     │  └──────────┴──────────┴──────────────┘  │
     │  ┌──────────┬──────────┬──────────────┐  │
     │  │  AYUDA   │ LEYES    │  RECURSOS    │  │  ← servicio + info oficial
     │  └──────────┴──────────┴──────────────┘  │
     │  ┌─────────────────────────────────────┐ │
     │  │  INTERACTIVO (juegos, quiz, sim.)   │ │  ← experiencias
     │  └─────────────────────────────────────┘ │
     └──────────────────┬───────────────────────┘
                        ↓
             ┌──────────▼─────────────────┐
             │  data/*.json (contenido)   │  ← editable sin tocar HTML
             └────────────────────────────┘
```

**Decisiones clave (con justificación, req. §29/§30):**
1. **Estático puro, sin framework.** Justificación: (a) el 100% del público llega por QR y necesita carga <3 s en datos móviles — un bundle de framework pesa más y añade hidratación; (b) el contenido viven en JSON, así que el beneficio de un framework (gestión de estado) no se usa; (c) el mantenimiento municipal después debe poder hacerlo alguien que edita HTML/JSON, no un stack React. Astro/Svelte serían defendibles si el proyecto fuera mucho más dinámico, pero aquí la simpleza ES la estrategia.
2. **Router separado para QR.** El material impreso (posters, diapositivas) lleva `/qr/...`; si mañana el módulo de phishing cambia de interna, se edita **solo el router** — no se re-imprime nada (req. §27).
3. **Contenido en JSON, HTML en páginas.** Toda la info de feria (eventos, horarios, participantes) vive en `data/*.json` — editables por el organizador sin entender el código (req. §37).
4. **Separación visual Feria / permanente** desde la arquitectura: la carpeta `feria/` es borrable/re-archivable sin romper nada (req. §28).

---

# 2. MAPA DE NAVEGACIÓN

```text
INICIO (/)
├─ 🎪 ESTOY EN LA FERIA        → /feria/
│   ├─ Horarios                → /feria/horarios/
│   ├─ Eventos                 → /feria/eventos/
│   ├─ Mapa                    → /feria/mapa/
│   ├─ Participantes           → /feria/participantes/
│   └─ Seguridad en la feria   → /seguridad/fraude/ (anclas de feria)
├─ 🛡️ QUIERO PROTEGERME        → /seguridad/
│   ├─ Phishing                → /seguridad/phishing/
│   ├─ Fraudes y estafas       → /seguridad/fraude/
│   ├─ Cuentas y contraseñas   → /seguridad/cuentas/
│   ├─ Privacidad y redes      → /seguridad/privacidad/
│   ├─ Dispositivos            → /seguridad/dispositivos/
│   ├─ Wi-Fi público           → /seguridad/redes/
│   └─ ¿Ya me pasó algo?       → /seguridad/respuesta/
├─ 🧠 QUIERO APRENDER          → /taller/
│   ├─ Módulos (27)            → /taller/modulos/
│   ├─ Juegos y retos          → /interactivo/
│   │   ├─ ¿TÚ CAERÍAS?        → /interactivo/phishing/
│   │   ├─ Quiz                → /interactivo/quiz/
│   │   ├─ Reto final          → /interactivo/quiz/ (modo final)
│   │   ├─ Privacidad          → /interactivo/privacidad/
│   │   ├─ Incidente municipal → /interactivo/incidente-municipal/
│   │   └─ Simulador estafa    → /interactivo/fraude/
├─ 🆘 NECESITO AYUDA           → /ayuda/
├─ ⚖️ DERECHOS                 → /leyes/
├─ 📚 RECURSOS OFICIALES       → /recursos/
├─ 🏛️ MUNICIPIO                → /municipio/
```

**Barra fija en móvil:** 🏠 Inicio · 🛡️ Protegerme · 🧠 Aprender · **🆘 AYUDA** (siempre visible, req. §5/§6).

---

# 3. ESTRUCTURA DE CARPETAS

Basada en la del requisito §29, con **dos cambios justificados**:

```text
colon-digital/
│
├── index.html                    ← landing
├── feria/                        ← contenido temporal (borrable post-feria)
│   ├── index.html
│   ├── eventos/index.html
│   ├── horarios/index.html
│   ├── mapa/index.html
│   └── participantes/index.html
│
├── seguridad/                    ← contenido permanente
│   ├── index.html
│   ├── phishing/index.html
│   ├── fraude/index.html
│   ├── cuentas/index.html
│   ├── privacidad/index.html
│   ├── dispositivos/index.html
│   ├── redes/index.html
│   └── respuesta/index.html      ← "¿qué hago si ya caí?"
│
├── taller/
│   ├── index.html
│   └── modulos/index.html        ← lista de 27 módulos (data: modulos.json)
│
├── interactivo/                  ← experiencias (motor compartido)
│   ├── index.html
│   ├── phishing/index.html       ← ¿TÚ CAERÍAS?
│   ├── quiz/index.html           ← quiz + reto final
│   ├── privacidad/index.html
│   ├── fraude/index.html         ← simulador estafa
│   └── incidente-municipal/index.html
│
├── ayuda/index.html              ← CENTRO DE AYUDA
├── leyes/index.html              ← sección aparte, datos en JSON verificado
├── recursos/index.html
├── municipio/index.html
│
├── assets/
│   ├── images/  icons/  qr/
├── css/                          ← base.css · componentes.css · ayuda.css
├── js/                           ← router-qr.js · ui.js · motor-actividades.js · ayuda.js
├── data/                         ← LA FUENTE DE CONTENIDO (ver §4)
│
├── CHANGELOG.md  README.md  LICENSE
└── docs/                         ← documentación del proyecto web (a partir de FASE 2)
```

## Cambios justificados respecto al requisito §29
1. **`docs/` añadido:** el requisito pide README + documentación; con 14 fases conviene carpeta aparte para que el README no engorde (instalación/publicación viven ahí).
2. **`interactivo/` con 5 rutas (no "modulos" duplicados):** los módulos del taller (`taller/`) son guía educativa; las EXPERIENCIAS jugables viven en `interactivo/` con motor compartido — evita duplicar quiz en cada carpeta. La ruta `/interactivo/quiz/` sirve quiz normal y reto final por parámetro (`?modo=final`).
3. **Páginas con `index.html` por carpeta:** necesario para GitHub Pages con rutas limpias (`/qr/phishing` funciona sin .html).

---

# 4. ARQUITECTURA DE DATOS (JSON)

Todo el contenido editable vive en `data/` (req. §37):

| Archivo | Contenido | Editado por |
|---------|-----------|-------------|
| `feria.json` | nombre, fechas, lugar, estado de la feria (pre/durante/post) | organizador |
| `eventos.json` | lista de eventos (título, fecha, hora, lugar, descripción) | organizador |
| `horarios.json` | horarios por día | organizador |
| `participantes.json` | participantes (nombre, logo, descripción, ubicación, categoría, horario, web, redes) | organizador |
| `puntos-mapa.json` | puntos del mapa (id, etiqueta, icono, x/y%, categoría) | organizador |
| `talleres.json` | talleres incl. el nuestro con `hora/ubicacion: "PENDIENTE"` | organizador |
| `modulos.json` | los 27 módulos (título, resumen, icono, orden, estado) | proyecto |
| `ayuda.json` | las 9–10 categorías del Centro de Ayuda con los pasos (ver §7) **y placeholder oficial** | proyecto + enlace institucional |
| `recursos.json` | recursos oficiales (categoría, nombre, descripción, url, **estado: "pendiente_verificacion"**) | proyecto + enlace |
| `leyes-mx.json` / `leyes-qro.json` | normas (nombre, explicación, ejemplo, fuente oficial, url, **estado**) | proyecto + enlace |
| `insignias.json` | definición de insignias (sin datos de usuario) | proyecto |

**Regla del placeholder** (req. §6/§23/§24): todo dato no verificado se guarda con `"estado": "DATOS_OFICIALES_PENDIENTES_DE_VALIDACION"` y la UI lo muestra como *pendiente de verificación oficial* — nunca inventa.

**Carga:`js/ui.js` hace `fetch()` de estos JSON al abrir cada página (cacheable). Sin build step.**

---

# 5. SISTEMA DE RUTAS

- Rutas limpias por carpeta (`/seguridad/phishing/`) — GitHub Pages resuelve `index.html` automáticamente.
- **Rutas de QR** siempre estables y cortas (`/qr/...`) — redirigen y pueden cambiar de destino sin tocar el material impreso (req. §27).
- Anclas para llegar con un clic a pasos concretos: `/seguridad/respuesta/#extorsion`.

---

# 6. SISTEMA DE QR (rutas estables)

Ocho rutas base de QR (req. §27):

```text
/qr/phishing   → /interactivo/phishing/
/qr/fraude     → /interactivo/fraude/
/qr/cuentas    → /seguridad/cuentas/
/qr/privacidad → /interactivo/privacidad/
/qr/redes      → /seguridad/redes/
/qr/leyes      → /leyes/
/qr/municipio  → /interactivo/incidente-municipal/
/qr/reto       → /interactivo/quiz/?modo=final
/qr/ayuda      → /ayuda/
/qr/taller     → /taller/
```

**Implementación del router (simple y sin backend):**
- Los QRs apuntan a `https://DOMINIO/qr/<tema>` que es una página `qr/index.html?tema=phishing` con JS que hace `location.replace()` al destino.
- El mapa destino vive en `data/qr-rutas.json` — cambiar el destino es editar 1 línea (no se re-imprime material impreso).
- **Compatibilidad con el proyecto del taller:** las 16 rutas `/qr/*` del Taller (dependencia, riesgos, estafa…) se agregan a ese mismo JSON con su destino — los QR ya impresos/posters del taller siguen funcionando con esta plataforma cuando se publique.
- Fallback si la ruta no existe: página amable "estamos alistando esto; en 30 s te llevamos al inicio" con botones a Inicio/Ayuda (nunca error técnico).

---

# 7. ARQUITECTURA DEL CENTRO DE AYUDA

Todo el servicio gira en `data/ayuda.json` — la UI (`ayuda/index.html`) es un motor que lo renderiza:

```json
{
  "categoria": "telefono-perdido",
  "icono": "📱",
  "titulo": "Perdí mi teléfono",
  "tipo_prioridad": "perdida",
  "pasos_primero": [
    "Bloquea la SIM llamando a tu operador",
    "Cambia las claves de tus cuentas críticas desde otro dispositivo"
  ],
  "no_hacer": ["No pagues 'rescates' ni des datos"],
  "conservar": ["IMEI", "número de la línea", "horario y lugar aproximado de la pérdida"],
  "donde_acudir": { "estado": "DATOS_OFICIALES_PENDIENTES_DE_VALIDACION" },
  "telefono_oficial": { "estado": "DATOS_OFICIALES_PENDIENTES_DE_VALIDACION" }
}
```

## Comportamiento (req. §6)
1. **Pantalla "¿QUÉ OCURRIÓ?"** con 10 tarjetas grandes (las del requisito + "otro problema").
2. Cada categoría muestra: qué hacer YA (paso 1 arriba) · qué NO hacer · qué conservar · dónde acudir (placeholder hasta verificar).
3. **Separación de urgencia clara:** respuestas emergencia ≠ seguridad ≠ pérdida ≠ fraude ≠ digital ≠ información — distinto color/etiqueta y no se mezclan en una lista.
4. **Regla de oro visible:** "En emergencia real, prioriza siempre el canal oficial de tu autoridad" + nota permanente de pendientes de verificación.
5. **Sin captura de datos, sin reporte en línea, sin formulario.**

---

# 8. SEPARACIÓN FERIA / CONTENIDO PERMANENTE

```text
PERMANENTE (nunca se borra):        TEMPORAL (carpeta feria/):
  /seguridad/*                        /feria/* (2026)
  /taller/*, /interactivo/*           → post-feria: banner "Feria de Colón 2026 — archivo"
  /ayuda/, /leyes/, /recursos/          (la carpeta se queda como archivo histórico)
  /municipio/
```

- El **estado de la plataforma** está en `feria.json` (`"estado": "pre"/"activa"/"post"`) — la UI cambia la portada (botones de feria se ocultan si estado=post, pero la sección sigue accesible como archivo).
- Recursos y leyes NUNCA dentro de `feria/` — son permanentes.

---

# 9. PROPUESTA TECNOLÓGICA

| Capa | Elección | Justificación |
|------|----------|---------------|
| Marcado | HTML5 semántico | estático, accesible, SEO |
| Estilo | CSS3 con custom properties (una base.css + componentes.css) | paleta única, sin preprocesador necesario |
| Lógica | ES6+ vanilla (modules si conviene, sin bundler) | carga rápida, sin build |
| Datos | JSON + `fetch` nativo | editable por no-programadores |
| Motor de actividades | Un solo `motor-actividades.js` (estados INTRO/JUEGO/FEEDBACK/RESULTADO reutilizable — según spec de FASE 7 del taller) | 14 experiencias no duplican código |
| Almacenamiento local | `localStorage` solo para insignias/progreso voluntario | sin cuenta, sin rastreo, req. §25 |
| Publicación | GitHub Pages | gratuito, HTTPS, rutas limpias (req. §40) |
| PWA | **Fase posterior opcional** (req. §39): sí mejora uso offline, pero el offline real lo cubre el plan B impreso del taller; se documentará ventajas/limites antes de decidir | no bloquear FASE 1 |
| Framework (React/Vite/Astro) | **No** por ahora | ver justificación en §1 — el contenido es JSON y el interactivo es un solo motor; un framework añadiría build/bundle para cero beneficio aquí |

**SEO y compartir (req. §38):** title/meta-description/Open-Graph por página (`COLÓN DIGITAL — Seguridad Digital para Todos`), favicon escudo 🛡️, plantilla de OG image.

---

# 10. ACCESIBILIDAD (req. §32)

- Contraste mínimo AA sobre los fondos de la paleta (comprobar en FASE 2 con herramientas).
- Botones ≥44 px, tipografía base 16–18 px móvil.
- Navegación por teclado completa: foco visible, orden lógico, sin trampas.
- Alt-text en toda imagen; iconos decorativos con `aria-hidden`.
- Info nunca solo por color (🟢🟡🔴 siempre con palabra+icono).
- `prefers-reduced-motion` respetado: animaciones solo si no molestan (con version estática de la carretera de la estafa).
- Lenguaje sencillo; términos técnicos con el patrón "qué es → ejemplo → por qué importa".

---

# 11. PRIVACIDAD (req. §33)

- **Cero captura:** sin formularios de identidad, sin login, sin publicidad, sin píxeles de terceros.
- Juegos sin cuenta; progreso/insignias en `localStorage` voluntary y borrable.
- Estadísticas (si se activan): conteo anónimo agregado, explicado en la propia página ("no guardamos quién eres"), activables/desactivables.
- Menores: ningún campo de datos; módulos familiares orientados al tutor.
- Los resultados de las experiencias se computan localmente y no salen del dispositivo.

---

# 12. SEGURIDAD (req. §34)

- Nada de credenciales, API keys, tokens ni datos del municipio en el repo.
- Nada de ataques reales: todo interactivo es simulación con etiqueta "SIMULACIÓN EDUCATIVA".
- El material del taller ya cumple esto (Fases 1–11 del proyecto hermano): los `interactivo/*` seguirán la misma especificación.
- Página 100% estática → superficie de ataque mínima (no hay servidor que comprometer).
- Enlaces externos con `rel="noopener"`; sin third-party scripts.

---

# 13. PROPUESTA VISUAL (para FASE 2)

- **Paleta** (continuidad con el taller): azul oscuro `#0D1B2A`, azul medio `#1B496B`, azul claro `#5FA8D3`, crema `#FFF8F0`, ámbar `#FFA500`, rojo solo alertas `#C1121F`, verde verificado `#2E8B57`.
- Conceptos: escudo, protección, conexión comunitaria, teléfonos, QR — **jamás** estética hacker/capucha/Matrix (req. §4).
- Mascota CIBER 🛡️ opcional, en un solo archivo compartido (delete-friendly, req. §4): aparece en consejos con frases tipo "¡Alto! ¿Ya verificaste ese enlace?".
- Tipografía: sans del sistema (o una Google Font ligera con display:swap).

---

# 14. ESCALABILIDAD MUNICIPAL (req. §45)

| Escenario | Cómo lo soporta la arquitectura |
|-----------|--------------------------------|
| Post-feria → "Seguridad Digital para Todos" | carpeta `feria/` se archiva; el resto no cambia |
| Nueva feria el próximo año | solo se editan `feria.json`, `eventos.json`, `horarios.json`, `participantes.json`, `puntos-mapa.json` |
| Apropiación con marca municipal | el enlace institucional llena el registro de verificación; branding editable (logotipo en `assets/`, variables CSS) |
| Núcleo local (Raspberry/ESP32, req. §35) | todo es estático: el mismo repo se sirve desde una Raspberry en red aislada sin cambios (Serv. local `/qr/` incluido); ESP32-CYD consume las páginas como cliente |
| Informe con métricas | solo conteos anónimos; exportable manualmente |

---

# ✅ CRITERIOS DE ACEPTACIÓN DE LA FASE 1

- [ ] Arquitectura general estática con decisión justificada (sin framework).
- [ ] Mapa de navegación completo con rutas reales.
- [ ] Estructura de carpetas con 2 cambios justificados vs requisito.
- [ ] Arquitectura de datos definida (11 JSON + placeholder oficial).
- [ ] Sistema de QR con router editable y compatibilidad con el proyecto del taller.
- [ ] Centro de Ayuda modelado en JSON con prioridad y placeholders.
- [ ] Separación Feria/permanente implementada a nivel de carpeta + estado.
- [ ] Tecnología, accesibilidad, privacidad, seguridad y visual definidos.
- [ ] Escalabilidad municipal documentada.

---

## ➡️ SIGUIENTE: FASE 2 — DISEÑO VISUAL
(viene después de tu aprobación: sistema de diseño con paleta, tipografía, componentes y plantillas de página)
