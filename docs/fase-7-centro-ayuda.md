# 🆘 FASE 7 — CENTRO DE AYUDA (NECESITO AYUDA)
## COLÓN DIGITAL — Feria de Colón, Querétaro

> **Qué es:** formalización de la sección `/ayuda/`, implementada como borrador funcional
> durante la FASE 6 (por corrección de enlaces muertos) y completada aquí según el spec
> §4 de `taller-seguridad-digital/colon-digital/fase-5-integracion-colon-digital.md`.

## 1. Estructura (9 categorías — implementadas)

| Categoría | Estado |
|---|---|
| 👶 Persona extraviada | ✅ 3 pasos, paso 1 en rojo (AVISA YA) |
| 📱 Teléfono perdido | ✅ 3 pasos + enlace a guía completa |
| 🎒 Objeto perdido | ✅ 2 pasos (incluye "nunca pagues rescates") |
| 💳 Problema con un pago | ✅ 3 pasos (banco por reverso de tarjeta, folio) |
| 🎟️ Boleto falso | ✅ 2 pasos |
| 🚨 Emergencia | ✅ tarjeta roja + aviso de dato oficial pendiente 2026 |
| 🛡️ Me siento inseguro | ✅ 2 pasos |
| 📲 Fraude digital | ✅ redirige a /taller/modulos/si-ya-cai/ (no duplica) |
| 🔒 Privacidad | ✅ 2 pasos + enlace a guía |

## 2. Comportamiento (spec §4.3)

- ✅ Cuadrícula de tarjetas grandes, letras grandes, pensada para estrés.
- ✅ Cada guía: checklist ≤7 pasos, **paso 1 en negritas/rojo** ("lo primero primero").
- ✅ Botón siempre visible: «Reportar / avisar a alguien AHORA» — con nota honesta de
  que los teléfonos oficiales 2026 están pendientes de verificación (dato 2025 registrado),
  y ruta alternativa: personal del evento.
- ✅ Sin login, sin registro, sin formularios, sin cookies de rastreo.
- ✅ Aviso permanente: «esta información es orientadora; en emergencias reales prioriza el canal oficial».

## 3. Límites (spec §4.4)

- No recibe reportes ni almacena datos: no hay formularios.
- No sustituye a la autoridad: guía hacia ella.
- No muestra teléfonos inventados: lo no verificado dice explícitamente "pendiente de verificación oficial".

## 4. Pendiente (con caducidad del registro de verificación)

- Publicar teléfonos oficiales 2026 (Ext. 1704 Seguridad Ciudadana / Ext. 2802 Protección Civil,
  datos 2025 en `docs/registro-verificacion.md` §4.5) tras doble verificación.

## ✅ Criterios de aceptación — CUMPLIDOS
