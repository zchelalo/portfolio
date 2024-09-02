import { SkillEntity } from '@/modules/skill/domain/entity'
import { ProjectEntity } from '@/modules/project/domain/entity'
import { Filters, SkillRepository } from '@/modules/skill/domain/repository'

import {
  filtersSchema,
  getSkillByIDSchema,
  paginationSchema
} from '@/modules/skill/application/schemas/skill'

import { Technology } from '@/constants'

export class SkillUseCase {
  private readonly skillRepository: SkillRepository

  constructor(skillRepository: SkillRepository) {
    this.skillRepository = skillRepository
  }

  public async getSkillById(id: string, offset: number, limit: number): Promise<{ skill: SkillEntity, projects: ProjectEntity[] }> {
    getSkillByIDSchema.parse({ id })
    paginationSchema.parse({ offset, limit })

    const skillObtained = await this.skillRepository.getSkillById(id, offset, limit)
    return skillObtained
  }

  public async getSkillByTechnology(technology: Technology, offset: number, limit: number): Promise<{ skill: SkillEntity, projects: ProjectEntity[] }> {
    if (!Object.values(Technology).includes(technology)) {
      throw new Error('invalid technology name')
    }
    paginationSchema.parse({ offset, limit })

    const skillsObtained = await this.skillRepository.getSkillByTechnology(technology, offset, limit)
    return skillsObtained
  }

  public async getSkills(offset: number, limit: number, filters?: Filters): Promise<SkillEntity[]> {
    paginationSchema.parse({ offset, limit })
    if (filters) filtersSchema.parse(filters)

    const skillsObtained = await this.skillRepository.getSkills(offset, limit, filters)
    return skillsObtained
  }
}