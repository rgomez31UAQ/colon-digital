# 📄 FASE 5 — SECCIÓN TALLER (WEB)
## COLÓN DIGITAL — Feria de Colón, Querétaro

> **Qué es:** especificación e implementación de la sección `/taller/` de la plataforma web. El taller presencial (12 fases, proyecto hermano) es la GUIÍA; estas páginas son el SEGUIMIENTO: lo que la persona puede leer, jugar y repasar antes, durante y después del taller.

---

## 1. ARQUITECTURA DE LA SECCIÓN

```text
taller/
├── index.html                  Portada: qué es el taller + 7 temas
└── modulos/
    ├── fraudes/index.html      Fraudes y suplantación (QR05/QR06/QR07/QR08)
    ├── phishing/index.html     Phishing: ¿tú caerías? (QR04)
    ├── cuentas/index.html      Protege tus cuentas + MFA (QR10/QR11)
    ├── privacidad/index.html   Privacidad + huella digital (QR12/QR13)
    ├── 5preguntas/index.html   La tarjeta de las 5 Preguntas (QR09)
    ├── si-ya-cai/index.html    Guía paso a paso si ya caí (QR14)
    └── reto/index.html         Reto Final Defensor Digital (QR16)
```

Nota: la portada no repite la rama interactiva (`/interactivo/` los juegos completos, FASE 6);
cada página de módulo enlaza a su juego cuando ese exista.

## 2. MAPEO CON LAS 16 RUTAS /qr/* (taller presencial)

| Ruta | Página que atiende | Estado web |
|------|--------------------|-----------|
| `/qr/dependencia`, `/qr/riesgos`, `/qr/estafa` | módulofraudes + (FASE 6: juegos) | redirige a módulos |
| `/qr/phishing` | módulo phishing | ✅ esta fase |
| `/qr/smishing`, `/qr/vishing` | módulo fraudes | ✅ esta fase |
| `/qr/suplantacion`, `/qr/ingenieria` | módulo fraudes | ✅ esta fase |
| `/qr/5preguntas` | módulo 5preguntas | ✅ esta fase |
| `/qr/mis-cuentas`, `/qr/mfa` | módulo cuentas | ✅ esta fase |
| `/qr/privacidad`, `/qr/huella` | módulo privacidad | ✅ esta fase |
| `/qr/si-ya-cai` | módulo si-ya-cai | ✅ esta fase |
| `/qr/reto` | módulo reto | ✅ esta fase |
| `/qr/ayuda`, `/ayuda` | sección ayuda (FASE 7) | aún no |

## 3. REGLAS DE CONTENIDO (de la sección taller)

- **Cero captura de datos:** nada de formularios, cookies de rastreo ni login.
- **Sello SIMULACIÓN EDUCATIVA visible** donde se muestran ejemplos ficticios.
- **Lenguaje:** qué es → ejemplo cotidiano → por qué te importa.
- **Tono:** nunca humillante; los errores se reframan como aprendizaje.
- **Sin marcas reales de bancos ni empresas** en los ejemplos.
- **Versiones breves para taller, completas para casa:** cada módulo arranca con "¿Corrido de 60 s?": resumen + lecturas a fondo.
- **Esquema visual:** reutiliza 100% de `css/base.css` — sin CSS nuevo, sin frameworks.

## 4. COMPONENTES DE PÁGINA-TIPO

1. **Hero corto** con título del tema y propósito.
2. **Bloque "¿Corrido en 60 s?"** — resumen en una tarjeta VERDE: la lección central.
3. **Señales de alerta** — tarjetas de rojo (síntoma) con *qué hacer* bajo cada una.
4. **¿Qué hacer ahora?** — pasos concretos (verde/ok).
5. **Módulo interactivo** — link al juego correspondiente (vía FASE 6) o aviso "próximamente".
6. **Lema en el footer** — PIENSA • VERIFICA • PROTEGE • REPORTA.

## 5. ALCANCE DE ESTA FASE

- ✅ Portada `/taller/` con 7 accesos grandes.
- ✅ 7 páginas de módulos: contenido educativo estático reutilizable.
- ✅ Rutas `/qr/*` apuntando a estos módulos (actualiza en `data/qrs-rutas.json`).
- ✅ Fallbacks: cada módulo se lee completo sin JS.

## 6. FUERA DE ALCANCE (otras fases)

- Interactivos/juegos (FASE 6) · Centro de Ayuda (FASE 7) · material imprimible PDF (FASE 10)
- Métricas anónimas (FASE 10/12) · publicación (FASE 14)

---

## ✅ CRITERIOS DE ACEPTACIÓN

- [ ] `/taller/` navegable con 7 módulos claros.
- [ ] Ningún formulario, login, cookie de rastreo o captura de datos.
- [ ] Sello SIMULACIÓN EDUCATIVA en ejemplos ficticios.
- [ ] Rutas `/qr/*` de `data/qrs-rutas.json` apuntando al módulo correcto.
- [ ] Todo se lee sin JavaScript (solo HTML + CSS).
