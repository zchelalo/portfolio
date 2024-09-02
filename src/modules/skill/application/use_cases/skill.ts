import { SkillEntity } from '@/modules/skill/domain/entity'
import { ProjectEntity } from '@/modules/project/domain/entity'
import { Filters, SkillRepository } from '@/modules/skill/domain/repository'

import {
  filtersSchema,
  getSkillByIDSchema,
  paginationSchema
} from '@/modules/skill/application/schemas/skill'

export class SkillUseCase {
  private readonly skillRepository: SkillRepository

  constructor(skillRepository: SkillRepository) {
    this.skillRepository = skillRepository
  }

  public async getSkillById(id: string): Promise<{ skill: SkillEntity, projects: ProjectEntity[] }> {
    getSkillByIDSchema.parse({ id })

    const skillObtained = await this.skillRepository.getSkillById(id)
    return skillObtained
  }

  public async getSkills(offset: number, limit: number, filters?: Filters): Promise<SkillEntity[]> {
    paginationSchema.parse({ offset, limit })
    if (filters) filtersSchema.parse(filters)

    const skillsObtained = await this.skillRepository.getSkills(offset, limit, filters)
    return skillsObtained
  }
}