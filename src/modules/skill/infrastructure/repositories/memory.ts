import { SkillEntity } from '@/modules/skill/domain/entity'
import { ProjectEntity } from '@/modules/project/domain/entity'
import { Filters, SkillRepository } from '@/modules/skill/domain/repository'

import { SkillLevel, Technology } from '@/constants'

import { i18next } from '@/config/i18n'

import { projects } from '@/modules/project/infrastructure/repositories/memory'

export const skills: SkillEntity[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: Technology.NODE,
    level: SkillLevel.ADVANCED
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    name: Technology.POSTGRESQL,
    level: SkillLevel.ADVANCED
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174003',
    name: Technology.DOCKER,
    level: SkillLevel.INTERMEDIATE
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174004',
    name: Technology.REACT,
    level: SkillLevel.INTERMEDIATE
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174009',
    name: Technology.JAVASCRIPT,
    level: SkillLevel.ADVANCED
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174010',
    name: Technology.TYPESCRIPT,
    level: SkillLevel.ADVANCED
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174011',
    name: Technology.EXPRESS,
    level: SkillLevel.ADVANCED
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174014',
    name: Technology.MONGODB,
    level: SkillLevel.BASIC
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174015',
    name: Technology.JEST,
    level: SkillLevel.INTERMEDIATE
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174017',
    name: Technology.GO,
    level: SkillLevel.ADVANCED
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174019',
    name: Technology.PYTHON,
    level: SkillLevel.BASIC
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174020',
    name: Technology.FASTAPI,
    level: SkillLevel.BASIC
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174022',
    name: Technology.MYSQL,
    level: SkillLevel.ADVANCED
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174023',
    name: Technology.AWS,
    level: SkillLevel.BASIC
  },
]

export class MemoryRepository implements SkillRepository {
  async getSkillById(id: string, offset: number, limit: number): Promise<{ skill: SkillEntity, projects: ProjectEntity[] }> {
    const skillObtained = skills.find(skill => skill.id === id)
    if (!skillObtained) {
      throw new Error(`skill with id ${id} not found`)
    }
    let projectsObtained = projects.filter(project => project.lang === i18next.language)
    projectsObtained = projectsObtained.filter(project => project.technologies.some(technology => technology.name === skillObtained.name)).slice(offset, offset + limit)
    return { skill: skillObtained, projects: projectsObtained }
  }

  async getSkillByTechnology(technology: Technology, offset: number, limit: number): Promise<{ skill: SkillEntity, projects: ProjectEntity[] }> {
    const skillObtained = skills.find(skill => skill.name === technology)
    if (!skillObtained) {
      throw new Error(`skill with technology ${technology} not found`)
    }
    const projectsObtained = projects.filter(project => project.technologies.some(technology => technology.name === skillObtained.name)).slice(offset, offset + limit)
    return { skill: skillObtained, projects: projectsObtained }
  }

  async getSkills(offset: number, limit: number, filters?: Filters): Promise<SkillEntity[]> {
    let skillsObtained = skills
    if (filters) {
      if (filters.level) {
        skillsObtained = skillsObtained.filter(skill => skill.level == filters.level)
      }
    }

    skillsObtained = skillsObtained.slice(offset, offset + limit)
    if (skillsObtained.length === 0) {
      throw new Error('skills not found')
    }
    return skillsObtained
  }
}