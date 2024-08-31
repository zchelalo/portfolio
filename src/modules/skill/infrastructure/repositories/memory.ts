import { SkillEntity } from '@/modules/skill/domain/entity'
import { ProjectEntity } from '@/modules/project/domain/entity'
import { SkillRepository } from '@/modules/skill/domain/repository'

import { Technology } from '@/constants'

import { projects } from '@/modules/project/infrastructure/repositories/memory'

const skills: SkillEntity[] = [
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
    id: '123e4567-e89b-12d3-a456-426614174010',
    name: Technology.TYPESCRIPT
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174011',
    name: Technology.EXPRESS
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174012',
    name: Technology.DRIZZLE
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174013',
    name: Technology.MONGOOSE
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174014',
    name: Technology.MONGODB
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174015',
    name: Technology.JEST
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174016',
    name: Technology.ESLINT
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174017',
    name: Technology.GO
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174018',
    name: Technology.GIN
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174019',
    name: Technology.PYTHON
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174020',
    name: Technology.FASTAPI
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174021',
    name: Technology.SQLALCHEMY
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174022',
    name: Technology.MYSQL
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174023',
    name: Technology.REDIS
  }
]

export class MemoryRepository implements SkillRepository {
  async getSkillById(id: string): Promise<{ skill: SkillEntity, projects: ProjectEntity[] }> {
    const skillObtained = skills.find(skill => skill.id === id)
    if (!skillObtained) {
      throw new Error(`skill with id ${id} not found`)
    }
    const projectsObtained = projects.filter(project => project.technologies.some(technology => technology.name === skillObtained.name))
    return { skill: skillObtained, projects: projectsObtained }
  }

  async getSkills(offset: number, limit: number): Promise<SkillEntity[]> {
    const skillsObtained = skills.slice(offset, offset + limit)
    if (skillsObtained.length === 0) {
      throw new Error('skills not found')
    }
    return skillsObtained
  }
}