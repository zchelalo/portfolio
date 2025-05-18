import { SkillEntity } from '@/modules/skill/domain/entity'

import { Language } from '@/constants'

export interface ProjectEntity {
  id?: string
  title: string
  description: string
  technologies: SkillEntity[]
  sourceCodeUrl?: string
  previewUrl: string
  imageUrls?: string[]
  lang: Language
}