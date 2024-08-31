import { ProjectEntity } from '@/modules/project/domain/entity'
import { ProjectRepository } from '@/modules/project/domain/repository'

import { Technology } from '@/constants'

export const projects: ProjectEntity[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    title: 'Notitas',
    description: 'A simple note-taking app built with microservices architecture. It uses a React frontend, a Node.js backend, and a PostgreSQL database. It also uses Docker and Docker Compose for development and deployment.',
    technologies: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: Technology.NODE
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: Technology.SEQUELIZE
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174002',
        name: Technology.POSTGRESQL
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174003',
        name: Technology.DOCKER
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174004',
        name: Technology.REACT
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174005',
        name: Technology.TAILWIND_CSS
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174006',
        name: Technology.SHADCN
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174007',
        name: Technology.I18NEXT
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174008',
        name: Technology.ZOD
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174009',
        name: Technology.JAVASCRIPT
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174011',
        name: Technology.EXPRESS
      }
    ],
    sourceCodeUrl: 'https://github.com/zchelalo/notitas',
    previewUrl: undefined
  },
]

export class MemoryRepository implements ProjectRepository {
  async getProjectById(id: string): Promise<ProjectEntity> {
    const projectObtained = projects.find(project => project.id === id)
    if (!projectObtained) {
      throw new Error(`project with id ${id} not found`)
    }
    return projectObtained
  }

  async getProjects(offset: number, limit: number): Promise<ProjectEntity[]> {
    const projectsObtained = projects.slice(offset, offset + limit)
    if (projectsObtained.length === 0) {
      throw new Error('projects not found')
    }
    return projectsObtained
  }
}