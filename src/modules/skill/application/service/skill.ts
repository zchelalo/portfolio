import { SkillEntity } from '@/modules/skill/domain/entity'
import { ProjectEntity } from '@/modules/project/domain/entity'
import { SkillUseCase } from '@/modules/skill/application/use_cases/skill'
import { paginationSchema } from '@/modules/skill/application/schemas/skill'

import { toast } from 'sonner'

export class SkillService {
  private readonly skillUseCase: SkillUseCase

  constructor(skillUseCase: SkillUseCase) {
    this.skillUseCase = skillUseCase
  }

  async fetchSkillAndProjects(skill: SkillEntity, offset: number, limit: number): Promise<{ skill: SkillEntity, projects: ProjectEntity[] } | null> {
    paginationSchema.parse({ offset, limit })

    if (!skill) {
      toast.info('No skill selected')
      return null
    }
    const skillObtained = await this.skillUseCase.getSkillById(skill.id as string, offset, limit)

    if (!skillObtained) {
      toast.error('Skill not found')
      return null
    }
    if (!skillObtained.projects.length) {
      toast.info('No projects to show')
      return null
    }

    return { skill: skillObtained.skill, projects: skillObtained.projects }
  }
}