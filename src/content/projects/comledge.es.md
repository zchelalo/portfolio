---
project: comledge
locale: es
title: Comledge
summary: Plataforma documental empresarial con artículos versionados, publicación, adjuntos privados y búsqueda filtrada por permisos.
role: Backend y producto
period: '2026 — Actualidad'
status: Proyecto privado
order: 2
featured: true
stack:
  - Go
  - React
  - TypeScript
  - PostgreSQL
  - MinIO
  - Playwright
highlights:
  - Control de acceso por tipo, nivel y artículo individual.
  - Búsqueda que aplica las reglas de acceso antes de devolver resultados.
  - Ciclo de vida de artículos con versiones, publicación y archivo.
  - Edición y publicación separadas, con historial de versiones.
---

## Contexto

Comledge es una plataforma privada para organizar conocimiento dentro de una organización. El producto reúne artículos, clasificaciones, versiones, publicación, adjuntos, colecciones y administración de usuarios bajo un mismo sistema de permisos.

Trabajé Comledge como un monorepo Nx: una API en Go, una SPA en React y pruebas end-to-end con Playwright. El producto no tiene una URL pública de despliegue ni un enlace público al código; este caso se apoya en el trabajo real y en un entorno local con datos de ejemplo.

## Problema

Cuando el conocimiento de una organización vive en documentos sueltos, aparecen tres problemas al mismo tiempo: no se sabe cuál es la versión vigente, no hay una forma consistente de encontrarla y no todos deberían ver lo mismo. Publicar un documento es fácil; gobernar quién lo lee, quién lo edita y qué versión está activa es el problema real.

## Enfoque

Modelé el artículo como una pieza de conocimiento con identidad, versiones y un estado de publicación. La clasificación por tipo y nivel define una primera frontera de acceso; el artículo puede añadir reglas propias. La búsqueda y los listados aplican esas reglas en la consulta, no después de traer resultados al cliente.

El trabajo incluyó autenticación, usuarios, roles y permisos, ciclo de vida de artículos, importación y exportación de Markdown, adjuntos privados, enlaces externos, colecciones con autoría y auditoría de acciones administrativas.

## Arquitectura

La API es un monolito modular en Go con módulos de `article`, `audit`, `auth` y `user`. La separación es interna: un solo despliegue, límites claros por dominio y acceso a datos encapsulado. La web utiliza React, Vite y TanStack Router; PostgreSQL conserva el modelo relacional y MinIO cubre el almacenamiento de archivos en desarrollo.

La búsqueda usa paginación por cursor para mantener listados estables mientras se publican o editan artículos. Los adjuntos se guardan como objetos privados, con metadatos y reglas de acceso en la base de datos. Las exportaciones permiten obtener Markdown desde la interfaz y texto o PDF a través de HTTP.

## Decisiones

- **Permisos en la consulta.** La búsqueda filtra por ACL antes de paginar. Un resultado que el usuario no puede leer no debe aparecer, aunque el filtro se aplique en el cliente.
- **Dos ejes de acceso.** Las reglas por tipo y nivel reducen configuración repetitiva; las reglas por artículo permiten excepciones concretas.
- **Roles y permisos directos.** Los roles agrupan capacidades, pero un usuario también puede recibir permisos globales específicos. La rotación de contraseña invalida tokens emitidos previamente mediante una versión de credencial.
- **Versión y publicación separadas.** Editar no equivale a publicar. El ciclo de vida conserva historial y permite archivar sin borrar el contenido.
- **Paginación por cursor.** Evita duplicados y saltos cuando el conjunto cambia entre páginas.
- **Adjuntos privados.** Los archivos se guardan como objetos privados y sus permisos se resuelven con los mismos criterios que el artículo.
- **Auditoría de acciones.** Las operaciones administrativas dejan registro para poder reconstruir quién cambió qué.

## Resultados y estado

Comledge cubre autenticación, usuarios y permisos, artículos y versiones, publicación, importación Markdown, adjuntos, enlaces externos, búsqueda con ACL y auditoría. La administración de colecciones y la definición de permisos todavía no tienen una experiencia completa, y prefiero mostrarlo así en lugar de presentarlas como terminadas.

Para las capturas preparé un artículo de ejemplo, «Guía de incorporación al equipo», con secciones, una tabla y un enlace de recursos. El entorno es local y los datos son ficticios; no se publican nombres de organizaciones, contenido documental, endpoints internos ni direcciones de despliegue.
