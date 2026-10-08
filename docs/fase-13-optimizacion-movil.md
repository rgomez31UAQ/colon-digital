# 📱 FASE 13 — OPTIMIZACIÓN MÓVIL
## COLÓN DIGITAL — Feria de Colón, Querétaro

> **Principio (FASE 1 y spec del taller §1):** el 100% del público llega desde el celular.
> La optimización no es una fase de "arreglar después": fue diseño desde el día uno.
> Esta fase la FORMALIZA con presupuestos verificables en el smoke test.

## 1. Ya diseñado mobile-first (fases 2–6)

- Tipografía ≥16.5px, botones ≥44px, tarjetas grandes, `prefers-reduced-motion` respetado.
- Bottom-nav móvil con AYUDA siempre visible; nav oculta en ≥821px.
- Sin JS obligatorio para leer contenido (solo juegos y datos de feria lo usan).

## 2. Presupuestos verificables (smoke test, grupo 8)

| Presupuesto | Límite | Motivo |
|---|---|---|
| Peso total JS+CSS | < 40 KB | carga < 3 s en 3G |
| Imágenes de assets | < 300 KB c/u | datos móviles |
| Cápsulas de video (media/videos) | < 15 MB c/u, < 60 MB total, `preload="none"` | play explícito, sin gasto de datos inesperado |
| Página index | < 30 KB c/u | sin contenido pesado embebido |
| `viewport` | en 100% de páginas | render móvil correcto |

## 3. Checklist manual (el del día de la feria)

`docs/fase-12-pruebas.md` §2 — 10 pruebas en celular real.

## ✅ Criterios de aceptación

- [x] Presupuestos automáticos en `docs/prueba_smoke.py` (falla si se incumplen).
- [x] Todos los presupuestos en verde con la implementación actual.
