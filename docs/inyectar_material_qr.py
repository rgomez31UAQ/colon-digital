#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# ============================================================
# COLÓN DIGITAL — inyector de "Material del tema" (FASE 15)
# Añade al final de cada página destino de un QR una sección
# con infografías y cápsulas en video del tema correspondiente.
# Así, al escanear un QR de las diapositivas, la persona aterriza
# en la experiencia y tiene el material visual del tema a mano.
#
# Idempotente: si la página ya trae la sección (marcador
# id="material-del-tema"), se omite. Imágenes con loading=lazy
# y videos con preload="none" (presupuestos de FASE 13).
#
# Uso:  python3 docs/inyectar_material_qr.py
# PIENSA • VERIFICA • PROTEGE • REPORTA
# ============================================================
import os

IMGDIR = "assets/images/infografias"
VIDDIR = "media/videos"

CAPS_IMGS = {
    "phishing-como-operan":      "Phishing: cómo operan",
    "smishing-fotomulta":        "Smishing: fotomulta falsa",
    "tipos-fraude-linea":        "Tipos de fraude en línea",
    "qr-fraude":                 "Códigos QR fraudulentos",
    "extorsion-telefonica":      "Extorsiones telefónicas",
    "secuestro-virtual":         "Secuestro virtual",
    "cuelgapp-extorsion":        "CuelgApp contra extorsión",
    "fraude-nfc":                "Fraude NFC",
    "transferencias-fantasma":   "Transferencias fantasma",
    "fraude-streaming":          "Fraude de cuentas de streaming",
    "deepfakes":                 "Deepfakes",
    "prestamos-apps":            "Préstamos en apps",
    "ventas-redes-fraude":       "Ventas en redes sociales",
    "compraventa-internet":      "Compra-venta por internet",
    "actualiza-dispositivos":    "Actualiza tus dispositivos",
    "noticias-falsas":           "Noticias falsas",
    "internet-seguro-ninos":     "Internet seguro",
    "ciberacoso":                "Ciberacoso",
    "grooming":                  "Grooming",
    "reto-de-horas":             "El reto de horas",
    "911-emergencias":           "9-1-1 emergencias",
    "ponte-en-guardia":          "#PonteEnGuardia",
}
CAPS_VIDS = {
    "capsula-enlaces-sospechosos": "Evita dar clic en enlaces sospechosos",
    "capsula-fotomulta-falsa":     "La \"fotomulta\" que es una trampa",
    "capsula-extorsion-telefonica":"Extorsión telefónica: cuelga y reporta",
    "capsula-whatsapp-2fa":        "WhatsApp: activa la verificación en dos pasos",
    "capsula-llamadas-sospechosas":"Filtra las llamadas sospechosas (iPhone)",
}

# página destino (según data/qrs-rutas.json) -> (imgs, vids)
TEMAS = {
    "interactivo/phishing/": (
        ["phishing-como-operan", "uaq-phishing-1", "uaq-phishing-4", "uaq-phishing-6"],
        ["capsula-enlaces-sospechosos"]),
    "interactivo/riesgos/": (
        ["tipos-fraude-linea", "phishing-como-operan", "fraude-nfc", "transferencias-fantasma"], []),
    "interactivo/carretera/": (
        ["phishing-como-operan", "tipos-fraude-linea", "secuestro-virtual", "extorsion-telefonica"], []),
    "interactivo/fraude/": (
        ["smishing-fotomulta", "transferencias-fantasma", "fraude-nfc", "fraude-streaming"],
        ["capsula-fotomulta-falsa", "capsula-extorsion-telefonica"]),
    "interactivo/suplantacion/": (
        ["secuestro-virtual", "extorsion-telefonica", "cuelgapp-extorsion"],
        ["capsula-extorsion-telefonica"]),
    "interactivo/palancas/": (
        ["noticias-falsas", "deepfakes", "phishing-como-operan", "tipos-fraude-linea"], []),
    "interactivo/quiz/": (
        ["ponte-en-guardia", "tipos-fraude-linea", "911-emergencias", "cuelgapp-extorsion"], []),
    "taller/modulos/cuentas/": (
        ["actualiza-dispositivos", "fraude-nfc"],
        ["capsula-whatsapp-2fa"]),
    "taller/modulos/privacidad/": (
        ["internet-seguro-ninos", "ciberacoso", "grooming", "reto-de-horas"], []),
    "taller/modulos/5preguntas/": (
        ["ponte-en-guardia", "phishing-como-operan", "tipos-fraude-linea", "911-emergencias"], []),
    "taller/modulos/si-ya-cai/": (
        ["extorsion-telefonica", "911-emergencias", "cuelgapp-extorsion", "transferencias-fantasma"], []),
    "ayuda/": (
        ["911-emergencias", "extorsion-telefonica"], []),
    "seguridad/cuentas/": (
        ["actualiza-dispositivos", "fraude-nfc"],
        ["capsula-whatsapp-2fa"]),
    "seguridad/redes/": (
        ["qr-fraude", "actualiza-dispositivos"], []),
}

def seccion(directorio, imgs, vids, tid):
    base = os.path.relpath(".", directorio).replace(os.sep, "/")
    figs = []
    for nombre in imgs:
        cap = CAPS_IMGS.get(nombre, nombre.replace("-", " "))
        figs.append(
            f'      <figure><img loading="lazy" src="{base}/{IMGDIR}/{nombre}.jpg" '
            f'alt="Infografía: {cap}"><figcaption>{cap}</figcaption></figure>')
    bloques_video = []
    for nombre in vids:
        cap = CAPS_VIDS.get(nombre, nombre)
        bloques_video.append(f"""    <div class="video-item">
      <h4>🎬 {cap}</h4>
      <video controls preload="none" poster="{base}/{VIDDIR}/{nombre}.jpg">
        <source src="{base}/{VIDDIR}/{nombre}.mp4" type="video/mp4">
      </video>
    </div>""")
    return f"""  <!-- Material del tema (QR · docs/inyectar_material_qr.py) -->
  <section class="card" id="material-del-tema" aria-labelledby="mt-{tid}">
    <h3 id="mt-{tid}">🖼️🎬 Material sobre este tema</h3>
    <p>Infografías oficiales (SSPM Querétaro, Policía Estatal, UAQ) y cápsulas en video,
    listas para revisar con calma o compartir en casa.</p>
    <div class="galeria-grid">
{chr(10).join(figs)}
    </div>
{chr(10).join(bloques_video)}
    <p style="margin-bottom:0;"><a href="{base}/recursos/infografias/">Ver todas las infografías</a> ·
    <a href="{base}/recursos/videos/">Ver todos los videos</a></p>
  </section>
"""

ok, ya, errores = 0, 0, []
for destino, (imgs, vids) in TEMAS.items():
    pagina = os.path.join(destino, "index.html")
    if not os.path.isfile(pagina):
        errores.append(f"{pagina}: no existe"); continue
    txt = open(pagina, encoding="utf-8").read()
    if 'id="material-del-tema"' in txt:
        ya += 1; continue
    if "</main>" not in txt:
        errores.append(f"{pagina}: sin </main>"); continue
    directorio = destino if destino.endswith("/") else destino + "/"
    tid = destino.strip("/").replace("/", "-")
    txt = txt.replace("</main>", seccion(directorio, imgs, vids, tid) + "</main>", 1)
    open(pagina, "w", encoding="utf-8").write(txt)
    ok += 1
    print(f"  ✅ {pagina}: {len(imgs)} imágenes, {len(vids)} videos")

print(f"\nInyectadas: {ok} · ya existían: {ya} · errores: {len(errores)}")
for e in errores: print("  ❌", e)
raise SystemExit(1 if errores else 0)
