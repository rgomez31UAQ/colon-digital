#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Verificación de contraste WCAG (AA/AAA) de la paleta de COLÓN DIGITAL.

Uso: python3 docs/verificar_contraste.py
Falla (exit 1) si algún par requerido no alcanza su nivel mínimo.
"""
import sys

def srgb_to_lin(c):
    c = c / 255.0
    return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

def luminancia(hexcolor):
    h = hexcolor.lstrip('#')
    r, g, b = (int(h[i:i+2], 16) for i in (0, 2, 4))
    def Y(x): return srgb_to_lin(x)
    return 0.2126*Y(r) + 0.7152*Y(g) + 0.0722*Y(b)

def ratio(fg, bg):
    l1, l2 = sorted([luminancia(fg), luminancia(bg)], reverse=True)
    return (l1 + 0.05) / (l2 + 0.05)

def nivel(r, texto_grande=False):
    # WCAG: AA normal 4.5 · AA grande (≥18pt bold o ≥24px) 3.0 · AAA normal 7 · AAA grande 4.5
    if texto_grande:
        aaaa, aa = 4.5, 3.0
    else:
        aaaa, aa = 7.0, 4.5
    if r >= aaaa: return "AAA"
    if r >= aa: return "AA"
    return "FALLA"

# pares usados reales en la UI de COLÓN DIGITAL: (fg, bg, contexto, es_texto_grande)
PARES = [
    ("#111111", "#FFFFFF", "texto principal sobre blanco", False),
    ("#111111", "#FFF8F0", "texto sobre tarjeta crema", False),
    ("#FFFFFF", "#1B496B", "texto/blanco sobre botón azul medio", False),
    ("#FFFFFF", "#0D1B2A", "texto blanco sobre hero azul oscuro", False),
    ("#FFFFFF", "#C1121F", "texto blanco sobre rojo (AYUDA/alertas)", False),
    ("#5FA8D3", "#0D1B2A", "links azul-claro sobre fondo oscuro", False),
    ("#FFA500", "#0D1B2A", "lema ámbar sobre hero oscuro", True),
    ("#0D1B2A", "#FFA500", "texto oscuro sobre chip ámbar", False),
    ("#FFFFFF", "#1E7A46", "texto blanco sobre chip verde", False),
    ("#55606A", "#FFFFFF", "texto secundario gris sobre blanco", False),
    ("#FFF8F0", "#0D1B2A", "texto crema sobre fondo oscuro (fuera de tarjetas)", False),
    ("#A9B6C2", "#0D1B2A", "gris claro de footer sobre azul oscuro", False),
    ("#1B496B", "#FFF8F0", "links azul-medio dentro de tarjetas crema", False),
    ("#0D1B2A", "#FFA500", "foco ámbar invita texto oscuro (skip-link)", True),
]

fallas = []
print(f"{'par':44} {'ratio':>6}  nivel")
for fg, bg, ctx, grande in PARES:
    r = ratio(fg, bg)
    print(f"{ctx:44} {r:6.2f}  {nivel(r, grande)}")
    if nivel(r, grande) == "FALLA":
        fallas.append(ctx)

if fallas:
    print("\n❌ FALLA en:", fallas)
    sys.exit(1)
print("\n✅ Paleta ACCESIBLE: todos los pares ≥ AA (o ≥ AA-grande donde aplica)")
