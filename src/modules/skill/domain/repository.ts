import { SkillEntity } from '@/modules/skill/domain/entity'
import { ProjectEntity } from '@/modules/project/domain/entity'

import { SkillLevel, Technology } from '@/constants'

export interface Filters {
  level?: SkillLevel
}

export interface SkillRepository {
  getSkillById(uuid: string, offset: number, limit: number): Promise<{ skill: SkillEntity, projects: ProjectEntity[] }>
  getSkillByTechnology(technology: Technology, offset: number, limit: number): Promise<{ skill: SkillEntity, projects: ProjectEntity[] }>
  getSkills(offset: number, limit: number, filters?: Filters): Promise<SkillEntity[]>
}