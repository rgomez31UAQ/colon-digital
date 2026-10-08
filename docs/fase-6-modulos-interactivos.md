# 🎮 FASE 6 — MÓDULOS INTERACTIVOS (WEB)
## COLÓN DIGITAL — Feria de Colón, Querétaro

> **Qué es:** implementación web de las actividades jugables del taller
> (spec: `taller-seguridad-digital/actividades/fase-7-actividades-interactivas.md`),
> con el motor común INTRO → JUEGO → FEEDBACK → RESULTADO.

## 1. Motor común — `js/juego.js`

- `Juego.intro(zona, cfg)` — pantalla 1: título + propósito + duración + COMENZAR.
- `Juego.rondas(zona, rondas, alTerminar)` — N rondas con opciones; feedback = la SEÑAL (1 frase), sin "reprobado", sin cronómetro.
- `Juego.resultado(zona, res)` — nivel + frase de fomento + recomendaciones con enlace + REPETIR. Todo privado, nada se envía.
- `Juego.nivelReto(puntos)` — niveles literales del taller: 🏆 9–10 · 🛡️ 7–8 · 🟡 4–6 · 🔴 0–3.

## 2. Actividades implementadas

| Juego | Ruta | Spec | Datos |
|---|---|---|---|
| Mapa de 15 amenazas | `/interactivo/riesgos/` | A02 (tarjetas girables + marca "ya la he visto") | `data/amenazas.json` |
| Carretera de 7 casillas | `/interactivo/carretera/` | A03 (auto-play + pausa en PRESIÓN, las 3 respuestas valen) | inline (D07 literal) |
| ¿TÚ CAERÍAS? (phishing) | `/interactivo/phishing/` | A04 (feedbacks literales + 7 señales) | inline |
| ¿Fraude o no? (bandeja + vishing) | `/interactivo/fraude/` | A05 + A06 | `data/fraude-smishing.json` |
| ¿Qué emoción manipulan en ti? | `/interactivo/palancas/` | A08 (5 mensajes, 7 palancas, consejo por palanca) | `data/palancas.json` |
| Real vs clonado | `/interactivo/suplantacion/` | A07 (5 diferencias, prueba de 10 s) | inline |
| Reto Final Defensor Digital | `/interactivo/quiz/` | §4 banco literal de 10 preguntas | `data/quiz-reto.json` |

## 3. Rutas QR activadas (data/qrs-rutas.json)

- `/qr/dependencia`, `/qr/riesgos` → Mapa de 15 amenazas
- `/qr/estafa` → Carretera de 7 casillas
- `/qr/phishing`, `/qr/caerias` → ¿TÚ CAERÍAS?
- `/qr/smishing`, `/qr/vishing`, `/qr/fraude` → ¿Fraude o no?
- `/qr/ingenieria` → Palancas emocionales
- `/qr/suplantacion` → Real vs clonado
- `/qr/reto` → Reto Final

## 4. Correcciones previas incluidas

- `ayuda/index.html` — Centro de Ayuda funcional (9 categorías, paso 1 primero). El botón AYUDA del bottom-nav ya lleva a contenido real. (FASE 7 pulirá.)
- `seguridad/index.html` + `seguridad/fraude/index.html` — hub "Protegerme" y guía de fraudes (antes los enlaces caían en carpetas vacías).

## 5. Reglas respetadas

- Sin captura de datos, sin login, sin cookies; resultados solo en el dispositivo.
- Sello "SIMULACIÓN EDUCATIVA" en phishing y fraude.
- Sin marcas reales de bancos (texto ficticio "BANCO SEGURA", "AGENTE MENDOZA").
- Resultados nunca humillantes: feedback empieza con "Casi…" o refuerza.

## 6. Fuera de alcance de esta fase

A01 (mi día digital) y A10 (checklist interactivo de cuentas) — quedan como
siguiente iteración (anunciadas en el hub con "próximamente").
