import { SkillEntity } from '@/modules/skill/domain/entity'
import { ProjectEntity } from '@/modules/project/domain/entity'

export interface SkillRepository {
  getSkillById(uuid: string): Promise<{ skill: SkillEntity, projects: ProjectEntity[] }>
  getSkills(offset: number, limit: number): Promise<SkillEntity[]>
}