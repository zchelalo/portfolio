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

El trabajo incluyó el frontend clínico y administrativo, la integración con servicios backend, flujos de autenticación y autorización, gestión de archivos y exportaciones. También trabajé la landing pública en Astro: presenta el producto, ordena el recorrido clínico y mantiene el contenido en español e inglés. Las capturas de este caso se generaron con datos ficticios de demostración.

## Arquitectura

El frontend está construido con React, TypeScript, TanStack Router y TanStack Query. La API se organiza alrededor de un gateway en Go y servicios para autenticación, facturación, expediente clínico, archivos, notificaciones y catálogos de ubicación. El servicio de usuarios utiliza TypeScript y Drizzle sobre PostgreSQL.

Los servicios se comunican mediante contratos gRPC definidos en protobuf y mantienen bases de datos independientes. Cuando un cambio debe generar un evento, guardo el cambio y el evento en la misma transacción con el patrón outbox. Después, un relay publica esos eventos en RabbitMQ y los servicios que los necesitan los procesan. Para flujos que cruzan servicios, como la creación de un adjunto, uso compensaciones inspiradas en sagas: si un paso falla, libero o marco lo que ya se había creado. Así evito depender de una transacción distribuida sin perder de vista los estados intermedios. Los archivos combinan metadatos en PostgreSQL con almacenamiento compatible con S3, usando URLs prefirmadas para carga y descarga.

## Decisiones

- **Límites por capacidad.** Separé autenticación, expediente, archivos y facturación para que cada parte evolucione sin convertir el gateway en un monolito de lógica.
- **Consistencia sin transacciones distribuidas.** Cada servicio conserva su base de datos. Los eventos salen por outbox y los flujos que cruzan servicios se compensan cuando un paso falla.
- **Autorización en dos niveles.** La interfaz protege la navegación, pero las decisiones de acceso también se validan en los servicios. Los flujos administrativos y clínicos usan guardas y permisos distintos.
- **Archivos fuera de la base de datos.** La base conserva metadatos y relaciones; el contenido binario vive en almacenamiento de objetos y se sirve mediante URLs temporales.
- **Reportes del lado del servidor.** Genero las exportaciones de pacientes, notas y evaluaciones en backend para que la pantalla, el PDF y el XLSX salgan de la misma fuente.
- **Catálogo de ubicaciones local.** Las sugerencias de direcciones usan catálogos importados, sin depender de un servicio de geocodificación en tiempo de ejecución.
- **Pruebas en varios anchos.** Valido las rutas públicas del frontend en 320, 768, 1024 y 1440 px para detectar desbordamientos y errores de carga.

## Resultados y estado

NeuraClinic está en producción y mantiene una landing pública en `neuraclinic.app`. El producto incluye agenda, gestión de pacientes, expediente, notas, evaluaciones y exportaciones. No se publican métricas de negocio ni datos clínicos reales; las imágenes de la galería son demostraciones con información ficticia.

El siguiente paso es seguir trabajando en observabilidad y automatización operativa, pero esas capacidades todavía no forman parte de lo que presento aquí como terminado.
