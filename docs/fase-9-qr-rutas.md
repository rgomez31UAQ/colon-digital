# 📱 FASE 9 — RUTAS QR ESTABLES (WEB)
## COLÓN DIGITAL — Feria de Colón, Querétaro

> **Problema que resuelve:** los QRs impresos del taller apuntan a `/qr/<tema>`, pero
> un sitio estático en GitHub Pages no redirige nada por sí solo — darían 404.
> Solución: **24 páginas de redirección** generadas automáticamente desde el router JSON.

## 1. Cómo funciona

```text
data/qrs-rutas.json  (fuente única de destinos)
        │  python3 docs/generar_rutas_qr.py
        ▼
qr/<tema>/index.html × 24   ← meta refresh + JS location.replace + enlace de respaldo
```

- La página de redirección es mínima (<1 KB), carga instantáneo incluso en 3G.
- Si falla la redirección automática (navegador viejo), muestra enlace manual con el lema.
- **Cambiar un destino = editar el JSON + regenerar.** Los QRs impresos NUNCA se re-imprimen.

## 2. Regeneración

```bash
python3 docs/generar_rutas_qr.py     # valida que cada destino exista; falla si no
python3 docs/prueba_smoke.py         # el smoke test verifica cada /qr/* y su destino
```

## 3. Dominio

Los QRs PNG del taller (`taller-seguridad-digital/qr/`) apuntan a `colon.digital/qr/…`.
Al existir el dominio real: cambiar en `generar_qrs.py` del taller y re-emitir PNGs —
las rutas `/qr/*` de esta web NO cambian (mismo contrato).

## ✅ Criterios de aceptación

- [x] 24/24 rutas generadas y verificadas contra destinos reales.
- [x] Smoke test incluye grupo 3b: página y destino correcto por ruta.
- [x] Redirección probada por HTTP (200 + contenido correcto).
