import { WorkExperienceEntity } from '@/modules/work_experience/domain/entity'
import { WorkExperienceRepository } from '@/modules/work_experience/domain/repository'

import { Language } from '@/constants'

import { i18next } from '@/config/i18n'

const workExperiences: WorkExperienceEntity[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    company: 'Under Apps Systems',
    position: 'Backend Developer',
    description: 'I maintained and fixed bugs in microservices, developed endpoints in NodeJS, designed and implemented PostgreSQL schemas, and created a full application using Hono, Drizzle, Zod, and JWT-based authentication. I also dockerized applications, set up a reverse proxy with NGINX, conducted unit testing with Jest, documented with Typedoc, and automated processes using bash scripts. Additionally, I actively participated in agile methodology projects.',
    fullDescription: `- Maintenance and bug fixing in four microservices, three developed in NodeJS with Express and one in Java with Spring Boot.
- Development of endpoints in NodeJS using JavaScript and TypeScript.
- Design and implementation of database schemas (PostgreSQL).
- Design and development of an application using Hono, Drizzle, Zod, and authentication with JWT and refresh tokens in NodeJS with TypeScript.
- Dockerization of applications in development and production.
- Implementation of a reverse proxy with NGINX.
- Unit testing with Jest and Hono's TestingHelper.
- Creation of temporary databases for testing purposes.
- Documentation using Typedoc.
- Endpoint documentation with Swagger.
- Process automation using bash scripts and scripts in package.json.
- Participation in projects implementing agile methodologies.
`,
    startDate: '2023-09-15T00:00:00Z',
    endDate: undefined,
    lang: Language.EN
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    company: 'Under Apps Systems',
    position: 'Desarrollador Backend',
    description: 'Mantuve y solucioné errores en microservicios, desarrollé endpoints en NodeJS, diseñé e implementé esquemas en PostgreSQL, y creé una aplicación completa utilizando Hono, Drizzle, Zod y autenticación basada en JWT. También contenedoricé aplicaciones, configuré un proxy inverso con NGINX, realicé pruebas unitarias con Jest, documenté con Typedoc y automatizé procesos mediante scripts en bash. Además, participé activamente en proyectos bajo metodología ágil.',
    fullDescription: `- Mantenimiento y corrección de errores en cuatro microservicios, tres de ellos desarrollados en NodeJS con Express y el cuarto hecho en Java con Spring Boot.
- Desarrollo de endpoints en NodeJS con Javascript y Typescript.
- Diseño e implementación de schemas de base de datos (PostgreSQL).
- Diseño y desarrollo de una aplicación utilizando Hono, Drizzle, Zod y autenticación mediante JWT y refresh tokens en NodeJS con Typescript.
- Dockerización de aplicaciones en desarrollo y producción.
- Implementación de un reverse proxy con NGINX.
- Testing unitario con Jest y el TestingHelper de Hono.
- Creación de base de datos temporales a la hora de hacer testing.
- Documentación con Typedoc.
- Documentación de endpoints con Swagger.
- Automatización de procesos con scripts bash y scripts en package.json.
- Participe de proyectos implementando metodologías ágiles.
`,
    startDate: '2023-09-15T00:00:00Z',
    endDate: undefined,
    lang: Language.ES
  }
]

export class MemoryRepository implements WorkExperienceRepository {
  async getWorkExperienceById(id: string): Promise<WorkExperienceEntity> {
    const workExperienceObtained = workExperiences.find(workExperience => workExperience.id === id)
    if (!workExperienceObtained) {
      throw new Error(`work experience with id ${id} not found`)
    }
    return workExperienceObtained
  }

  async getWorkExperiences(offset: number, limit: number): Promise<WorkExperienceEntity[]> {
    const workExperiencesObtainedLang = workExperiences.filter(workExperience => workExperience.lang === i18next.language)
    if (workExperiencesObtainedLang.length === 0) {
      throw new Error('work experiences not found')
    }
    let workExperiencesObtained: WorkExperienceEntity[] = workExperiencesObtainedLang

    workExperiencesObtained = workExperiencesObtained.slice(offset, offset + limit)
    if (workExperiencesObtained.length === 0) {
      throw new Error('work experiences not found')
    }
    return workExperiencesObtained
  }
}