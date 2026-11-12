---
project: chaoslab
locale: es
title: ChaosLab
summary: CLI en Go para generar carga HTTP contra servicios locales y entender, con evidencia, cómo se comportan la concurrencia, los límites y la cancelación.
role: Proyecto personal
period: '2026 — Actualidad'
status: En evolución
order: 4
featured: false
stack:
  - Go
  - HTTP
  - Concurrency
  - Testing
highlights:
  - Base secuencial para medir antes de optimizar.
  - Cliente HTTP con timeout, límite de respuesta y redirects deshabilitados.
  - Restricción deliberada a `127.0.0.1` y a un máximo de 20 solicitudes.
  - Hoja de ruta para lo que todavía no está disponible.
---

## Contexto

ChaosLab es un laboratorio personal para aprender concurrencia en Go construyendo una herramienta de carga HTTP. El objetivo no es competir con un load tester comercial, sino entender el ciclo completo de una solicitud, los límites de recursos y las decisiones de cancelación que suelen quedar ocultas detrás de una interfaz.

El proyecto se desarrolla por niveles: primero una base secuencial medible, después concurrencia acotada, cancelación y métricas. Un proxy local con inyección de fallos y una TUI son extensiones posteriores, no requisitos del MVP.

## Problema

Las herramientas de carga suelen mostrar un resultado sin explicar qué se está midiendo. Para aprender, necesitaba una CLI pequeña donde cada límite fuera explícito: cuántas solicitudes se aceptan, cuánto puede crecer una respuesta, qué ocurre con un timeout y cómo se distingue un error de transporte de un HTTP no exitoso.

También necesitaba una frontera de seguridad clara. Generar tráfico contra servicios de terceros sin autorización no es aceptable, así que la herramienta rechaza destinos que no sean locales.

## Enfoque

La primera versión ejecuta solicitudes secuenciales y clasifica los resultados. Esa base permite comparar cualquier optimización futura contra una referencia comprensible. La generación concurrente existe en la capa interna con `sync.WaitGroup`, pero todavía no la expuse en la CLI; por eso no aparece como una opción disponible.

La seguridad y la medición se diseñaron antes que la velocidad: validación de URL, límite de cuerpo y timeout pertenecen al cliente HTTP; la clasificación de resultados pertenece al dominio de carga.

## Arquitectura

La implementación usa la biblioteca estándar de Go. `cmd/main.go` parsea `-url` y `-requests`, construye el cliente y el generador, ejecuta la carga y muestra un resumen. `internal/httpclient` encapsula el transporte; `internal/load` contiene la ejecución y la clasificación.

El cliente configura un timeout de dos segundos, limita la lectura del cuerpo a 1 MB y deshabilita redirects para no seguir una URL fuera del destino autorizado. El generador valida que el esquema sea `http`, que el host sea `127.0.0.1` y que el número de solicitudes esté entre 1 y 20.

## Decisiones

- **Medir antes de optimizar.** La ejecución secuencial es la línea base. Sin ella, comparar concurrencia sería solo una impresión.
- **Límites visibles.** El máximo de solicitudes y el tamaño de respuesta son parte del contrato, no detalles internos.
- **Fallar de forma explícita.** Una URL inválida, un esquema no permitido o un host externo se rechazan antes de enviar tráfico.
- **Clasificación útil.** El resumen distingue respuestas exitosas, HTTP no exitosas, fallos de solicitud y respuestas incompletas por lectura o tamaño.
- **Tiempo agregado, no tiempo de pared.** `Total Elapsed Time` suma las duraciones individuales. No debe interpretarse como el tiempo total de una ejecución concurrente.
- **Interfaz después de la corrección.** La TUI y el proxy quedan fuera hasta que el núcleo sea correcto y testeable.

## Resultados y estado

**Disponible hoy:** CLI con `-url` y `-requests`, ejecución secuencial, cliente HTTP acotado y resumen clasificado.

**Implementado internamente:** generación concurrente con `WaitGroup`, aún sin opción de CLI.

**Conceptual:** worker pool configurable, cancelación con contexto, percentiles, proxy de inyección de fallos y TUI. La terminal de esta página es una ilustración de salida, no una medición real.

La hoja de ruta sigue separada de lo que la CLI ya hace. La visibilidad pública del repositorio todavía no está confirmada, así que no la enlazo aquí.
