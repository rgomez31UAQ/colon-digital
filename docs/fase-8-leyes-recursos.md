# ⚖️📚 FASE 8 — LEYES Y RECURSOS OFICIALES
## COLÓN DIGITAL — Feria de Colón, Querétaro

> **Principio (§23/§26 del proyecto):** nada legal se cita sin verificación con enlace oficial
> directo. Mientras un dato no esté verificado, la página muestra el mapa temático y el
> placeholder `DATOS_OFICIALES_PENDIENTES_DE_VALIDACION` — nunca se estima ni se copia de terceros.

## 1. Implementado

| Página | Contenido |
|---|---|
| `/leyes/` | 5 temas de derechos digitales (datos personales, delitos informáticos, ciberseguridad, menores, extorsión) con "qué te protege / quién te defiende" + guía de verificación en 4 pasos (Diario Oficial, .gob.mx, La Sombra de Arteaga) |
| `/recursos/` | Mapa de ayuda real (banco, autoridades, apps del problema, este proyecto) + cómo reconocer lo oficial en 4 señales |

## 2. Pendiente de verificación (registro §4.5 y protocolo §5)

- Citas textuales con enlace directo: leyes federales aplicables (protección de datos,
  delitos informáticos) y su publicación en el Diario Oficial de la Federación.
- Ley estatal de Querétaro (Periódico Oficial "La Sombra de Arteaga").
- Directorio oficial vigente de autoridades de Colón (fiscalía, Protección Civil,
  Seguridad Ciudadana) — dato 2025 ya registrado como candidato.

## 3. Diseño de la verificación (cuando se haga)

1. Identificar fuente primaria (.gob.mx / DOF / Periódico Oficial estatal).
2. Verificar en ≥2 fuentes oficiales independientes.
3. Registrar en `docs/registro-verificacion.md` (dato, fuente, URL, fecha, quién).
4. Publicar con «verificado el AAAA-MM-DD» y revisión semestral.

## ✅ Criterios de aceptación

- [x] Nada inventado: todos los datos sin verificar llevan placeholder explícito.
- [x] Usuario sabe QUÉ derechos existen, DÓNDE acudir y CÓMO verificar por sí mismo.
- [x] Estructura lista para insertar citas verificadas sin rediseñar nada.
