# 🧪 FASE 12 — PRUEBAS PRE-FERIA
## COLÓN DIGITAL — Feria de Colón, Querétaro
### Feria: 11–18 de octubre 2026 · Objetivo: todo verificado antes del sábado 10

## 1. Prueba automatizada (siempre que se cambie algo)

```bash
python3 docs/prueba_smoke.py
# valida: JSON, HTML balanceado, rutas /qr/*, sintaxis JS,
# enlaces internos, HTTP 200 de 24 recursos, tokens corruptos
```

**Regla:** si el smoke test no pasa, no se publica nada.

## 2. Prueba manual en celular (hacerla HOY en 3 navegadores)

| # | Prueba | Esperado |
|---|---|---|
| 1 | `/` en celular | Hero + 4 botones grandes; AYUDA rojo primero |
| 2 | Botón AYUDA (bottom-nav) | Lleva a /ayuda/ con 9 categorías |
| 3 | /feria/ | Contador vivo (días/hrs/min hasta el 11 oct) |
| 4 | /feria/eventos/ | Cartelera por días, estelares ⭐, taller 🛡️ |
| 5 | /feria/mapa/ | 20 puntos; sedes con detalle |
| 6 | /taller/ | 7 temas; botones funcionan |
| 7 | /interactivo/ | 7 juegos; ninguno da error de carga |
| 8 | Reto Final completo | 10 preguntas, feedback, nivel + **insignia descargable** |
| 9 | /ayuda/ desde /feria/ (link relativo) | Navega bien (no archivo roto) |
| 10 | Sin conexión (modo avión tras cargar) | Las páginas ya cargadas siguen legibles (HTML estático) |

## 3. Prueba con público (el día de la feria)

Protocolo P2 del taller (`taller-seguridad-digital/pruebas/fase-11-pruebas-con-publico.md`),
adaptado a la web:
- Pedir a 2 personas ajenas al proyecto que escaneen **2 QRs impresos** del taller
  y usar la experiencia hasta el final. Anotar: ¿cargó < 3 s? ¿entendieron qué hacer sin ayuda?
- Si algo falla: el expositor usa Plan B (tarjetas) sin detener el taller; se corrige en el momento
  (los datos van en JSON, el fix es editarlo y subir).

## 4. Permisos y condiciones

- Las pruebas NO capturan datos de nadie (regla §7 del proyecto).
- Métricas permitidas: solo conteos agregados anónimos (QRs abiertos por día).

## ✅ Criterios de aceptación

- [x] Smoke test automatizado ejecutable con un comando.
- [x] Checklist manual de 10 pruebas.
- [x] Protocolo de prueba con público alineado al taller.
