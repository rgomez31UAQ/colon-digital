#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# ============================================================
# COLÓN DIGITAL — generador de rutas /qr/* (FASE 9)
# Lee data/qrs-rutas.json y crea qr/<nombre>/index.html con
# redirección instantánea (meta refresh) + enlace de respaldo.
# Así los QRs impresos nunca dan 404, y cambiar un destino en
# el JSON NO obliga a re-imprimir material: solo regenerar.
#
# Uso:  python3 docs/generar_rutas_qr.py
# PIENSA • VERIFICA • PROTEGE • REPORTA
# ============================================================
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

rutas = json.load(open("data/qrs-rutas.json"))
creadas, errores = 0, []

for ruta, destino in rutas["rutas"].items():
    m = re.fullmatch(r"/qr/([a-z0-9-]+)", ruta)
    if not m:
        errores.append(f"ruta no estándar: {ruta}"); continue
    nombre = m.group(1)
    if not (os.path.isdir(destino) or os.path.isfile(destino)):
        errores.append(f"{ruta}: destino inexistente: {destino}"); continue
    # destino relativo desde qr/<nombre>/index.html
    profundidad = len(nombre.split("-"))  # aproximación no válida para rutas anidadas
    # calcular con os.path: destino relativo a qr/<nombre>/
    rel = os.path.relpath(destino, os.path.join("qr", nombre))
    url = rel if rel.endswith("/") else rel + "/"
    url = url.replace(os.sep, "/")
    html = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="refresh" content="0; url={url}">
<title>Redirigiendo… — COLÓN DIGITAL</title>
<link rel="icon" type="image/svg+xml" href="../../assets/icons/escudo.svg">
<style>
body {{ background:#0D1B2A; color:#FFF8F0; font-family:system-ui, sans-serif;
       display:flex; min-height:100vh; align-items:center; justify-content:center;
       text-align:center; margin:0; }}
a {{ color:#5FA8D3; font-weight:700; }}
.lema {{ color:#FFA500; font-weight:800; font-size:13px; letter-spacing:1px; margin-top:16px; }}
</style>
</head>
<body>
<div>
  <p style="font-size:40px; margin:0;">🛡️</p>
  <p>Te llevamos a tu destino…</p>
  <p>Si no redirige solo: <a href="{url}">ábrelo aquí</a></p>
  <p class="lema">PIENSA • VERIFICA • PROTEGE • REPORTA</p>
</div>
<script>location.replace("{url}");</script>
</body>
</html>
"""
    os.makedirs(os.path.join("qr", nombre), exist_ok=True)
    with open(os.path.join("qr", nombre, "index.html"), "w") as f:
        f.write(html)
    creadas += 1

print(f"Rutas creadas: {creadas}/{len(rutas['rutas'])}")
if errores:
    print("ERRORES:")
    for e in errores: print("  ❌ " + e)
    sys.exit(1)
print("✅ Todas las rutas /qr/* generadas y verificadas contra sus destinos")
