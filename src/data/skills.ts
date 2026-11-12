import type { Localized } from './types'

export type SkillGroup = {
  id: string
  title: Localized
  lead: Localized
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    title: { es: 'Backend', en: 'Backend' },
    lead: {
      es: 'Servicios, contratos y lógica de dominio.',
      en: 'Services, contracts and domain logic.',
    },
    items: ['Go', 'TypeScript', 'Node.js', 'REST', 'gRPC', 'JWT', 'RabbitMQ'],
  },
  {
    id: 'frontend',
    title: { es: 'Frontend', en: 'Frontend' },
    lead: {
      es: 'Interfaces mantenibles, accesibles y rápidas.',
      en: 'Maintainable, accessible and fast interfaces.',
    },
    items: ['React', 'TypeScript', 'Vite', 'Astro', 'HTML/CSS', 'TanStack'],
  },
  {
    id: 'data',
    title: { es: 'Datos', en: 'Data' },
    lead: {
      es: 'Modelado, consultas y consistencia.',
      en: 'Modeling, queries and consistency.',
    },
    items: ['PostgreSQL', 'MySQL', 'SQL', 'sqlc', 'Drizzle', 'S3 / MinIO'],
  },
  {
    id: 'infra',
    title: { es: 'Infraestructura', en: 'Infrastructure' },
    lead: {
      es: 'Entrega y operación de aplicaciones.',
      en: 'Application delivery and operations.',
    },
    items: ['Docker', 'AWS S3', 'CloudFront', 'Lightsail', 'NGINX', 'GitHub Actions'],
  },
  {
    id: 'quality',
    title: { es: 'Calidad', en: 'Quality' },
    lead: {
      es: 'Pruebas y documentación como parte del producto.',
      en: 'Testing and documentation as part of the product.',
    },
    items: ['Playwright', 'Vitest / Jest', 'Go testing', 'Technical writing', 'Git workflows'],
  },
]
