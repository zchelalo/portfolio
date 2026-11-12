---
project: cestia
locale: es
title: Cestia
summary: Aplicación para registrar compras y gastos personales o compartidos, con listas, grupos, invitaciones e historial de aportaciones reales.
role: Backend y producto
period: '2026 — Actualidad'
status: En producción
order: 3
featured: false
stack:
  - Go
  - React
  - TypeScript
  - PostgreSQL
  - sqlc
  - Terraform
highlights:
  - Registro de compras reales con comprador, pagador y contexto del artículo.
  - Invitaciones y grupos sin introducir deudas, saldos ni liquidaciones.
  - Idempotencia y control de versión en compras, correcciones y reversiones.
  - Historial de actividad para reconstruir quién hizo qué.
links:
  - label: Aplicación
    href: https://cestia.chelalo.me
    kind: live
---

## Contexto

Cestia es una aplicación para compras personales y compartidas. Permite crear listas, organizarlas en grupos, invitar a otras personas, registrar el precio real de cada artículo, indicar quién compró y quién pagó, y consultar el historial de aportaciones.

El producto parte de una decisión deliberada: **no calcula deudas, saldos, divisiones ni liquidaciones**. Registra gastos reales y su contexto; no convierte una compra compartida en una cuenta por cobrar.

## Problema

Las compras de un hogar o un grupo suelen terminar en una lista de mensajes. Se pierde qué falta, cuánto costó realmente y quién cubrió cada pago. Las aplicaciones de gastos compartidos tienden a asumir que el objetivo es dividir una deuda, lo que agrega una capa de cálculo que no todos los grupos necesitan.

Cestia separa dos preguntas: qué se compró y quién aportó el dinero. Con eso, el grupo conserva información útil sin imponer una política de reparto.

## Enfoque

El modelo gira alrededor de listas y artículos. Una lista personal puede pertenecer a un grupo; los miembros reciben invitaciones y participan según su acceso. Cada artículo registra una compra con precio unitario real, cantidad, comprador, pagador y fecha.

Las compras pueden corregirse o revertirse sin borrar el rastro. Esa decisión obliga a tratar cada operación como un evento auditable, no como una simple actualización de una fila.

## Arquitectura

Cestia es un monorepo Nx con una API en Go y una SPA en React con TypeScript. PostgreSQL guarda el modelo y sqlc genera las consultas. En producción corre en Lightsail, con PostgreSQL en un disco adjunto, respaldos en S3, correo mediante SES y despliegues con GitHub Actions y OIDC.

## Decisiones

- **Importes con dominio explícito.** Valido y normalizo el precio antes de guardarlo; no acepto cadenas arbitrarias como si fueran dinero.
- **Idempotencia.** Registrar, corregir o revertir una compra requiere una clave de idempotencia, lo que evita duplicados cuando el cliente reintenta.
- **Control de versión.** Cada operación verifica la versión esperada del artículo y devuelve un conflicto si cambió, en lugar de sobrescribir cambios recientes.
- **Historial como parte del modelo.** Las acciones quedan registradas en actividad, con actor, contexto y payload. La trazabilidad no se reconstruye después.
- **Sin balances.** No existe una tabla de deudas ni un cálculo de liquidaciones. El historial muestra aportaciones, no obligaciones.
- **Pruebas en desktop y móvil.** Recorro con Playwright el registro, la verificación por correo, las compras y los grupos en ambos formatos.

## Resultados y estado

Cestia está desplegada en `cestia.chelalo.me`. La aplicación incluye cuentas verificadas, listas personales, grupos, invitaciones, registro y corrección de compras, gastos e historial. Las capturas de esta ficha provienen de la aplicación ejecutada en un entorno local con cuentas y datos ficticios; no se publican datos reales de producción.

El producto sigue creciendo. La base de compras, permisos e historial ya está en producción, y las siguientes mejoras se van incorporando sobre ese mismo modelo.
