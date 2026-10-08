#!/usr/bin/env python3
# ============================================================
# COLÓN DIGITAL — prueba de humo automatizada (FASE 12)
# Uso:  python3 docs/prueba_smoke.py
# No requiere servidor: valida archivos en disco + levanta
# un servidor efímero para HTTP y lo detiene al final.
# Salida: PASA / FALLA por grupo. Exit 0 = todo pasa.
# PIENSA • VERIFICA • PROTEGE • REPORTA
# ============================================================
import json, glob, os, re, subprocess, sys, time, urllib.request, signal

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
fallos = []

def check(grupo, cond, detalle=""):
    print(("  ✅ " if cond else "  ❌ ") + grupo + ("" if cond else " — " + detalle))
    if not cond: fallos.append(grupo + " " + detalle)

print("== 1. JSON parseables ==")
for f in sorted(glob.glob("data/*.json")):
    try:
        json.load(open(f)); check("JSON " + f, True)
    except Exception as e:
        check("JSON " + f, False, str(e)[:80])

print("== 2. HTML balanceado (todas las páginas) ==")
VOID = {"meta","link","img","br","hr","input","source"}
paginas = glob.glob("**/index.html", recursive=True) + ["index.html"]
for f in sorted(set(paginas)):
    try:
        pila = []
        for m in re.finditer(r"<(/?)([a-zA-Z][a-zA-Z0-9]*)[^>]*?>", open(f).read()):
            c, t = m.group(1), m.group(2).lower()
            if t in VOID: continue
            if c:
                assert pila and pila[-1] == t, f"</{t}> inesperado"
                pila.pop()
            else:
                pila.append(t)
        assert not pila, "sin cerrar: " + str(pila)
        check("HTML " + f, True)
    except Exception as e:
        check("HTML " + f, False, str(e)[:80])

print("== 3. Router /qr/*: destinos existen ==")
rutas = json.load(open("data/qrs-rutas.json"))
for k, v in rutas["rutas"].items():
    check("Ruta " + k, os.path.isdir(v) or os.path.isfile(v), "-> " + v)

print("== 3b. Páginas de redirección /qr/* generadas y apuntando bien ==")
for k, v in rutas["rutas"].items():
    nombre = k.split("/")[-1]
    f = os.path.join("qr", nombre, "index.html")
    if not os.path.isfile(f):
        check("QR page " + k, False, "falta qr/%s/index.html (correr docs/generar_rutas_qr.py)" % nombre)
        continue
    html = open(f).read()
    rel = os.path.relpath(v, os.path.join("qr", nombre))
    esperado = (rel if rel.endswith("/") else rel + "/").replace(os.sep, "/")
    ok = f'url={esperado}' in html and f'location.replace("{esperado}")' in html
    check("QR page " + k, ok, f"esperaba {esperado}")

print("== 4. JS con sintaxis válida ==")
for js in sorted(glob.glob("js/*.js")):
    r = subprocess.run(["node", "--check", js], capture_output=True, text=True)
    check("JS " + js, r.returncode == 0, r.stderr[:80])

print("== 5. Enlaces internos de cada página ==")
rotos = set()
for f in sorted(set(paginas)):
    base = os.path.dirname(f)
    txt = open(f).read()
    for href in re.findall(r'href="([^"#]+?)/?"', txt):
        if href.startswith(("http", "mailto:", "tel:", "data:")) or href == "":
            continue
        if href.startswith("/"):
            # raíz absoluta del sitio (válida en GitHub Pages y en http.server)
            destino = href.lstrip("/") or "."
        else:
            destino = os.path.normpath(os.path.join(base, href))
        if os.path.isdir(destino) or os.path.isfile(destino):
            continue
        rotos.add(f + " -> " + href)
check("Enlaces internos", not rotos, str(sorted(rotos))[:200])

print("== 6. HTTP 200 (servidor efímero) ==")
puerto = 8920
srv = subprocess.Popen([sys.executable, "-m", "http.server", str(puerto)],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
try:
    time.sleep(1.2)
    for p in ["", "feria/", "feria/eventos/", "feria/horarios/", "feria/mapa/",
              "feria/participantes/", "seguridad/", "seguridad/fraude/",
              "taller/", "interactivo/", "interactivo/phishing/", "interactivo/fraude/",
              "interactivo/quiz/", "interactivo/riesgos/", "interactivo/carretera/",
              "interactivo/palancas/", "interactivo/suplantacion/",
              "ayuda/", "leyes/", "recursos/", "municipio/",
              "js/ui.js", "js/juego.js", "data/feria.json"]:
        try:
            code = urllib.request.urlopen(f"http://localhost:{puerto}/{p}", timeout=5).status
        except Exception:
            code = 0
        check("HTTP /" + p, code == 200, str(code))
finally:
    srv.send_signal(signal.SIGTERM)

print("== 7. Anti-residuos (tokens no-latinos) ==")
sospechosos = []
for f in set(paginas) | set(glob.glob("data/*.json")) | set(glob.glob("js/*.js")):
    if re.search(r"[\u4E00-\u9FFF\u0400-\u04FF\u3040-\u30FF\uAC00-\uD7AF]", open(f).read()):
        sospechosos.append(f)
check("Tokens no-latinos", not sospechosos, str(sospechosos))

print("== 7b. Lab aislado (FASE 11): sin llamadas de red ==")
for f in sorted(glob.glob("lab/*.html")):
    txt = open(f).read()
    externas = re.findall(r'(?:src|href)="(https?:)?//[^"]*"', txt)
    check("Lab sin red: " + f, not externas, str(externas)[:120])

print("== 8. Optimización móvil (FASE 13) ==")
# 8a. viewport en todas las páginas
sin_vp = [f for f in sorted(set(paginas)) if 'name="viewport"' not in open(f).read()]
check("viewport en todas las páginas", not sin_vp, str(sin_vp)[:120])
# 8b. presupuesto de peso: js+css total < 40 KB (carga <3 s en 3G)
peso = sum(os.path.getsize(f) for f in glob.glob("js/*.js") + glob.glob("css/*.css"))
check("Peso js+css < 40 KB", peso < 40 * 1024, f"{peso/1024:.1f} KB")
# 8c. ninguna imagen del sitio > 300 KB (los videos viven en media/, ver 8e)
pesadas = [f for f in glob.glob("assets/**/*", recursive=True)
           if os.path.isfile(f) and os.path.getsize(f) > 300 * 1024]
check("Imágenes de assets < 300 KB", not pesadas, str(pesadas)[:120])
# 8e. presupuesto de videos (media/videos): cada cápsula < 15 MB y total < 60 MB;
#     solo se cargan con preload="none" (play explícito del usuario)
vids = glob.glob("media/videos/*.mp4")
peso_vids = sum(os.path.getsize(v) for v in vids)
vid_grande = [v for v in vids if os.path.getsize(v) > 15 * 1024 * 1024]
sin_preload = [f for f in sorted(set(paginas))
               if 'preload="none"' in open(f).read() and "media/videos/" in open(f).read()
               and open(f).read().count("<video") != open(f).read().count('preload="none"')]
check("Cápsulas < 15 MB c/u", not vid_grande, str(vid_grande)[:120])
check("Total cápsulas < 60 MB", peso_vids < 60 * 1024 * 1024, f"{peso_vids/1e6:.1f} MB en {len(vids)} videos")
check("<video> siempre con preload=none", not sin_preload, str(sin_preload)[:120])
# 8d. páginas index < 30 KB cada una (sin contenido pesado embebido)
pesadas = [f for f in sorted(set(paginas)) if os.path.getsize(f) > 30 * 1024]
check("Páginas index < 30 KB", not pesadas, str([(f, os.path.getsize(f)//1024) for f in pesadas])[:200])

print()
if fallos:
    print(f"❌ FALLÓ: {len(fallos)} checks"); sys.exit(1)
print("✅ PASA: prueba de humo completa sin fallos"); sys.exit(0)
