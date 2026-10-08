# 🛡️ COLÓN DIGITAL
## Tu feria. Tu comunidad. Tu seguridad.
### PIENSA • VERIFICA • PROTEGE • REPORTA

Plataforma web estática para la Feria de Colón, Querétaro — diseñada desde el día uno para **continuar funcionando después de la feria** como recurso educativo y de prevención para la ciudadanía.

**Proyecto hermano:** `taller-seguridad-digital/` (el taller presencial, 12 fases completadas). Las 16 rutas `/qr/*` del taller serán atendidas por esta plataforma.

---

## 📌 Estado — fases

| Fase | Descripción | Estado |
|------|-------------|--------|
| 1 | Arquitectura | ✅ COMPLETADA |
| 2 | Diseño visual | ✅ COMPLETADA |
| 3 | Página principal | ✅ COMPLETADA — pendiente de aprobación |
| 4 | Sección Feria | ✅ COMPLETADA — pendiente de aprobación |
| 5 | Taller de Seguridad Digital | ✅ COMPLETADA — pendiente de aprobación |
| 6 | Módulos interactivos | ✅ COMPLETADA — 7 juegos activos, pendiente de aprobación |
| 7 | Centro de Ayuda | ✅ COMPLETADA — pendiente de aprobación |
| 8 | Leyes y recursos oficiales | ✅ COMPLETADA (marco orientativo; citas legales pendientes de verificación) |
| 9 | QR (rutas estables) | ✅ COMPLETADA — 24 redirecciones /qr/* generadas + verificadas |
| 10 | Gamificación | ✅ COMPLETADA — insignia descargable del Reto Final |
| 11 | Integración futura con lab | ✅ COMPLETADA — /lab/ con simulador + dashboard, aislamiento de red verificado |
| 12 | Pruebas | ✅ COMPLETADA — smoke test automatizado + checklist manual |
| 13 | Optimización móvil | ✅ COMPLETADA — mobile-first desde FASE 2 + presupuestos en smoke test |
| 14 | Publicación GitHub Pages | ⏳ |

La documentación de cada fase vive en [`docs/`](./docs/).

---

## 🎯 Objetivo

Durante la feria: encontrar información práctica y llegar por QR a módulos educativos interactivos. Después de la feria: evolucionar a **"COLÓN DIGITAL — Seguridad Digital para Todos"** sin reconstruir nada.

## 🧭 Navegación principal

- 🎪 **Estoy en la feria** (temporales: horarios, eventos, mapa, participantes)
- 🛡️ **Quiero protegerme** (permanente: seguridad digital)
- 🧠 **Quiero aprender** (taller + juegos + retos)
- 🆘 **NECESITO AYUDA** (siempre visible en móvil)

## 🚀 Instalación y desarrollo

```bash
# clonar
git clone <repo> colon-digital && cd colon-digital

# servir localmente (cualquiera de estas)
python3 -m http.server 8000
# o cualquier servidor estático; no hay build step

# prueba de humo completa (JSON, HTML, rutas, enlaces, HTTP, móvil)
python3 docs/prueba_smoke.py

# regenerar las redirecciones /qr/* (después de cambiar data/qrs-rutas.json)
python3 docs/generar_rutas_qr.py
```

Abrir `http://localhost:8000`. **No hay dependencias, ni build, ni backend.**

## 📦 Publicación (GitHub Pages)

1. Crear repositorio y subir los archivos (o `git push`).
2. Settings → Pages → Source: `main` / root.
3. La ruta base funciona con carpetas + `index.html` (rutas limpias incl. `/qr/*`).
4. Dominio personalizado: apuntar DNS y configurar en Pages (documentación completa en fase 14).

## 📂 Estructura

```text
index.html · feria/ · seguridad/ · taller/ · interactivo/ · ayuda/ · lab/ ·
qr/ · leyes/ · recursos/ · municipio/ · assets/ · css/ · js/ · data/ · docs/
```

Detalle y decisiones en [docs/fase-1-arquitectura.md](./docs/fase-1-arquitectura.md).

## 📱 QR — rutas estables

`/qr/phishing · /qr/fraude · /qr/cuentas · /qr/privacidad · /qr/redes · /qr/leyes · /qr/municipio · /qr/reto · /qr/ayuda · /qr/taller` (+ las 16 del taller).

Los destinos viven en `data/qr-rutas.json`: **cambiar destino nunca obliga a re-imprimir material.**

## 🔒 Privacidad por diseño

Sin nombres, correos, teléfonos, contraseñas, tarjetas, documentos ni rastreo. Juegos sin cuenta. Progreso local (`localStorage`, borrable). Estadísticas solo agregadas y explicadas. **Nada se pide al usuario.

## ⚖️ Ética y datos oficiales

- Todo interactivo lleva el sello **"SIMULACIÓN EDUCATIVA"** — nunca ataques reales.
- Teléfonos, autoridades, ubicaciones, leyes y enlaces oficiales **no se inventan**: se publican solo tras verificación (placeholder `DATOS_OFICIALES_PENDIENTES_DE_VALIDACION` hasta entonces).
- Lenguaje sencillo; términos técnicos siempre con "qué es → ejemplo cotidiano → por qué importa".

## 🧪 Seguridad del proyecto

Sitio 100% estático: sin servidor que comprometer. El repo no contiene credenciales ni datos privados. Sin scripts de terceros.

## 📄 Licencia y créditos

- Contenido educativo del proyecto: por definir antes de la publicación (sugerido: CC BY-SA 4.0).
- Código: sugerido MIT.
- Créditos: proyecto comunitario para la Feria de Colón, Querétaro — con el taller de Seguridad Digital como primer módulo del ecosistema.

## 🤝 Contribuciones

Bienvenidas por pull request. Regla: nada de datos no verificados, nada que capture información de usuarios, y mantener el sello de simulación educativa en todo interactivo.
