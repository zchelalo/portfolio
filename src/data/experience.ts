import type { Localized } from './types'

export type ExperienceHighlight = {
  title: Localized
  body: Localized
}

export type ExperienceEntry = {
  id: string
  company: string
  role: Localized
  start: string
  end: string | null
  summary: Localized
  highlights: ExperienceHighlight[]
  stack: string[]
}

/**
 * Dates are month-precision. COEN start date confirmed by the owner
 * (December 2025); earlier roles come from the existing portfolio history.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'coen',
    company: 'COEN',
    role: {
      es: 'Software Engineer',
      en: 'Software Engineer',
    },
    start: '2025-12',
    end: null,
    summary: {
      es: 'Desarrollo software empresarial y participo en la mejora de los procesos técnicos que rodean la entrega: documentación, orden del repositorio, preparación de despliegues y uso responsable de IA.',
      en: 'I build enterprise software and help improve the technical processes around delivery: documentation, repository order, deployment preparation and responsible use of AI.',
    },
    highlights: [
      {
        title: {
          es: 'Documentación con contexto',
          en: 'Documentation with context',
        },
        body: {
          es: 'Definí formatos de comentarios y documentación de tareas para que cada cambio llegara con el contexto necesario para revisarlo, probarlo y mantenerlo.',
          en: 'I defined comment formats and task documentation so every change arrived with the context needed to review, test and maintain it.',
        },
      },
      {
        title: {
          es: 'Un flujo de Git para el equipo',
          en: 'A Git workflow for the team',
        },
        body: {
          es: 'Implementé un flujo de ramas y convenciones para mantener el orden del repositorio y facilitar el trabajo en equipo.',
          en: 'I implemented a branch workflow and conventions to keep the repository organized and make teamwork easier.',
        },
      },
      {
        title: {
          es: 'Entregas reproducibles',
          en: 'Reproducible deliveries',
        },
        body: {
          es: 'Preparé scripts y el orden de ejecución de funcionalidades y modificaciones para la persona encargada de los despliegues, reduciendo pasos ambiguos en la entrega.',
          en: 'I prepared scripts and the execution order for features and changes for the person responsible for deployments, reducing ambiguous steps in delivery.',
        },
      },
      {
        title: {
          es: 'IA aplicada al desarrollo',
          en: 'AI applied to development',
        },
        body: {
          es: 'Orienté al equipo para mejorar su trabajo con Claude, compartiendo prácticas de mi flujo con OpenCode que pudieran adaptar a sus propias herramientas y procesos.',
          en: 'I guided the team to improve their work with Claude, sharing practices from my OpenCode workflow that they could adapt to their own tools and processes.',
        },
      },
    ],
    stack: ['Git', 'Documentation', 'AI workflows'],
  },
  {
    id: 'ngx-networks',
    company: 'NGX Networks',
    role: {
      es: 'Ingeniero de Software',
      en: 'Software Engineer',
    },
    start: '2025-02',
    end: '2025-05',
    summary: {
      es: 'Diseñé y desarrollé herramientas de monitoreo e integración, además de un portal móvil multiplataforma para clientes.',
      en: 'I designed and built monitoring and integration tools, along with a cross-platform mobile client portal.',
    },
    highlights: [
      {
        title: {
          es: 'Monitoreo de servidores',
          en: 'Server monitoring',
        },
        body: {
          es: 'Aplicación web para consultar el estado y rendimiento de múltiples servidores desde un solo lugar.',
          en: 'A web application to inspect the status and performance of multiple servers from a single place.',
        },
      },
      {
        title: {
          es: 'Proxy de integración',
          en: 'Integration proxy',
        },
        body: {
          es: 'Servidor proxy para comunicarse con una API de terceros, aislando credenciales y mejorando la fiabilidad de la integración.',
          en: 'A proxy server for a third-party API, isolating credentials and improving integration reliability.',
        },
      },
      {
        title: {
          es: 'Portal móvil',
          en: 'Mobile portal',
        },
        body: {
          es: 'Aplicación multiplataforma con Expo para ofrecer una experiencia consistente en iOS y Android.',
          en: 'A cross-platform Expo application providing a consistent experience on iOS and Android.',
        },
      },
    ],
    stack: ['TypeScript', 'Node.js', 'Expo', 'React'],
  },
  {
    id: 'under-apps',
    company: 'Under Apps Systems',
    role: {
      es: 'Ingeniero de Software',
      en: 'Software Engineer',
    },
    start: '2023-09',
    end: '2024-10',
    summary: {
      es: 'Mantuve microservicios, diseñé esquemas PostgreSQL y desarrollé una aplicación completa en TypeScript con autenticación, pruebas y documentación.',
      en: 'I maintained microservices, designed PostgreSQL schemas and built a complete TypeScript application with authentication, tests and documentation.',
    },
    highlights: [
      {
        title: {
          es: 'Microservicios en producción',
          en: 'Production microservices',
        },
        body: {
          es: 'Mantenimiento y corrección de errores en cuatro microservicios: tres con Node.js/Express y uno con Java/Spring Boot.',
          en: 'Maintenance and bug fixing across four microservices: three with Node.js/Express and one with Java/Spring Boot.',
        },
      },
      {
        title: {
          es: 'Producto de punta a punta',
          en: 'End-to-end product',
        },
        body: {
          es: 'Diseño y desarrollo de una aplicación con Hono, Drizzle, Zod y autenticación JWT con refresh tokens.',
          en: 'Designed and built an application with Hono, Drizzle, Zod and JWT authentication with refresh tokens.',
        },
      },
      {
        title: {
          es: 'Infraestructura y calidad',
          en: 'Infrastructure and quality',
        },
        body: {
          es: 'Dockerización, proxy inverso con NGINX, pruebas unitarias con Jest, documentación con Typedoc y automatización con scripts.',
          en: 'Dockerization, an NGINX reverse proxy, Jest unit tests, Typedoc documentation and script automation.',
        },
      },
    ],
    stack: ['Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'NGINX'],
  },
]
