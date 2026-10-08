# 🧪 FASE 11 — INTEGRACIÓN DEL LABORATORIO
## COLÓN DIGITAL — Feria de Colón, Querétaro

> **Qué es:** la integración de las herramientas del laboratorio del taller
> (`taller-seguridad-digital/laboratorio/`) a la plataforma web, como sección `/lab/`.

## 1. Integrado

| Archivo | Origen | Estado |
|---|---|---|
| `lab/simulador-phishing.html` | copia del simulador del taller | ✅ standalone, 0 llamadas de red |
| `lab/dashboard.html` | copia del dashboard del taller | ✅ standalone, 0 llamadas de red |
| `lab/index.html` | portada nueva (design system del proyecto) | ✅ |

## 2. Garantía de aislamiento (verificada automáticamente)

- **0 referencias externas** (src/href a http/https o dominios) en ambos archivos —
  verificado por grep y agregado como **grupo 7b del smoke test** permanente:
  si alguien añade una llamada de red al lab, la suite FALLA.
- Las herramientas funcionan **incluso sin internet** (útiles en feria con señal mala).

## 3. Reglas respetadas

- Sello "SIMULACIÓN EDUCATIVA" en la portada y dentro de las herramientas.
- Instrucción explícita: nunca escribir contraseñas reales, ni de broma.
- Sin captura de datos: nada se envía ni se guarda en servidor.

## 4. Nota de mantenimiento

Los archivos son **copias**, no enlaces al taller: el lab del sitio es autónomo.
Si se mejora el simulador del taller, copiar de nuevo la versión mejorada y
correr el smoke test.

## ✅ Criterios de aceptación

- [x] Lab accesible desde /lab/ y desde el hub de retos.
- [x] Aislamiento de red verificado automáticamente en la suite.
- [x] Uso seguro documentado (sin contraseñas reales).
