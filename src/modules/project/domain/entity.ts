import { SkillEntity } from '@/modules/skill/domain/entity'

export interface ProjectEntity {
  id?: string
  title: string
  description: string
  technologies: SkillEntity[]
  sourceCodeUrl?: string
  previewUrl?: string
}