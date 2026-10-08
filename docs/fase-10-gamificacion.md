# 🏆 FASE 10 — GAMIFICACIÓN (INSIGNIAS)
## COLÓN DIGITAL — Feria de Colón, Querétaro

> **Qué es:** insignia descargable al terminar el Reto Final (spec QR16 del taller:
> «botón 'descargar mi insignia' genera una imagen con el nivel, sin nombre ni datos»).

## 1. Implementación

- Función `Juego.insignia(emoji, nombre)` en `js/juego.js`: dibuja en `<canvas>` (800×450)
  fondo azul-oscuro, marco ámbar, emoji del nivel, nombre del nivel y el lema
  PIENSA • VERIFICA • PROTEGE • REPORTA + firma del proyecto.
- El resultado del Reto Final (`/interactivo/quiz/`) incluye el botón
  **⬇️ Descargar mi insignia** → descarga `insignia-colon-digital.png`.
- **Sin datos personales:** la imagen contiene solo nivel + lema. Nada viaja a ningún
  servidor (se genera y descarga 100% en el dispositivo).

## 2. Cómo se comparte

La persona descarga la imagen y la manda por WhatsApp/redes. Texto sugerido en la
tarjeta de resultado del juego (ya presente): enlaces a los módulos para seguir aprendiendo.

## 3. Extensión futura (fuera de alcance hoy)

Insignias por juego individual (bandeja, carretera…): mismo mecanismo, un `res.insignia`
por actividad. La infraestructura ya lo soporta.

## ✅ Criterios de aceptación

- [x] Insignia generada en el dispositivo, sin envío de datos.
- [x] Sin nombre ni datos personales en la imagen.
- [x] Funciona offline (canvas nativo, sin librerías de terceros).
