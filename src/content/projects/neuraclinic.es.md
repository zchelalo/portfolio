---
project: neuraclinic
locale: es
title: NeuraClinic
summary: SaaS para psicólogos independientes que reúne agenda, expediente clínico, notas, evaluaciones y reportes en un solo flujo de trabajo.
role: Ingeniería de producto
period: '2026 — Actualidad'
status: En producción
order: 1
featured: true
stack:
  - Go
  - TypeScript
  - React
  - PostgreSQL
  - RabbitMQ
  - AWS
highlights:
  - Separación explícita entre la operación administrativa y el espacio clínico.
  - Servicios organizados por capacidad, con contratos gRPC y bases de datos propias.
  - Exportaciones de pacientes, notas y evaluaciones generadas en el servidor.
  - Gestión de archivos con metadatos en base de datos y URLs prefirmadas.
links:
  - label: Sitio público
    href: https://neuraclinic.app
    kind: live
---

## Contexto

NeuraClinic es un producto SaaS para psicólogos independientes. La aplicación conecta agenda, pacientes, expediente, notas clínicas, evaluaciones psicológicas, archivos y reportes dentro de un mismo recorrido. La landing pública está en producción y la aplicación distingue dos espacios: administración de la plataforma y trabajo clínico.

## Problema

La operación de un consultorio pequeño suele repartirse entre calendarios, documentos, mensajería y hojas de cálculo. Cada herramienta conserva una parte del contexto, pero la sesión necesita todas. Esa fragmentación aumenta el tiempo administrativo y hace más difícil mantener continuidad entre una cita y la siguiente.

El reto no era solo agregar pantallas: había que modelar pacientes, citas, notas, evaluaciones y archivos sin perder trazabilidad, y separar con claridad lo que puede hacer un administrador de lo que corresponde a un psicólogo.

## Enfoque

Tomé el expediente del paciente como unidad central del producto. A partir de ahí, la agenda prepara la sesión, las notas documentan lo ocurrido, las evaluaciones agregan seguimiento y los reportes permiten compartir información sin reconstruir el caso.

El trabajo incluyó el frontend clínico y administrativo, la integración con servicios backend, flujos de autenticación y autorización, gestión de archivos y exportaciones. Las capturas de este caso se generaron con datos ficticios de demostración.

## Arquitectura

El frontend está construido con React, TypeScript, TanStack Router y TanStack Query. La API se organiza alrededor de un gateway en Go y servicios para autenticación, facturación, expediente clínico, archivos, notificaciones y catálogos de ubicación. El servicio de usuarios utiliza TypeScript y Drizzle sobre PostgreSQL.

Los servicios se comunican mediante contratos gRPC definidos en protobuf y mantienen bases de datos independientes. RabbitMQ se utiliza para eventos entre servicios; el repositorio documenta decisiones de consistencia eventual y coreografía en sus ADR. Los archivos combinan metadatos en PostgreSQL con almacenamiento compatible con S3, usando URLs prefirmadas para carga y descarga.

## Decisiones

- **Límites por capacidad.** Autenticación, expediente, archivos y facturación tienen responsabilidades separadas, lo que permite evolucionar cada parte sin convertir el gateway en un monolito de lógica.
- **Autorización en dos niveles.** Las rutas del frontend protegen la experiencia, pero las decisiones de acceso viven también en los servicios. Los flujos administrativos y clínicos usan guardas y permisos distintos.
- **Archivos fuera de la base de datos.** La base conserva metadatos y relaciones; el contenido binario vive en almacenamiento de objetos y se sirve mediante URLs temporales.
- **Reportes del lado del servidor.** Las exportaciones de pacientes, notas y evaluaciones se generan en backend para mantener consistencia entre pantalla, PDF y XLSX.
- **Catálogo de ubicaciones local.** Las sugerencias de direcciones usan catálogos importados en lugar de depender de un servicio de geocodificación en tiempo de ejecución.
- **Pruebas en varios anchos.** La matriz de rutas públicas del frontend se valida en 320, 768, 1024 y 1440 px para detectar desbordamientos y errores de carga.

## Resultados y estado

NeuraClinic está en producción y mantiene una landing pública en `neuraclinic.app`. El producto incluye agenda, gestión de pacientes, expediente, notas, evaluaciones y exportaciones verificables en el código. No se publican métricas de negocio ni datos clínicos reales; las imágenes de la galería son demostraciones con información ficticia.

El siguiente paso natural es seguir profundizando en observabilidad y automatización operativa, pero esas capacidades no se presentan aquí como terminadas.
