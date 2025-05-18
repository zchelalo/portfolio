import { ProjectEntity } from '@/modules/project/domain/entity'
import { SkillEntity } from '@/modules/skill/domain/entity'
import { SkillValue } from '@/modules/skill/domain/value'

import { Language } from '@/constants'

export class ProjectValue implements ProjectEntity {
  readonly id?: string
  readonly title: string
  readonly description: string
  readonly technologies: SkillEntity[]
  readonly sourceCodeUrl?: string
  readonly previewUrl: string
  readonly imageUrls?: string[]
  readonly lang: Language

  constructor(title: string, description: string, technologies: SkillEntity[], previewUrl: string, imageUrls?: string[], sourceCodeUrl?: string, id?: string, lang?: Language) {
    this.title = title
    this.description = description

    if (!Array.isArray(technologies) || technologies.some(th => !(th instanceof SkillValue))) {
      throw new Error('invalid technology list')
    }

    this.technologies = technologies
    this.sourceCodeUrl = sourceCodeUrl
    this.previewUrl = previewUrl
    this.imageUrls = imageUrls
    this.id = id
    if (lang) {
      this.lang = lang
    } else {
      this.lang = Language.EN
    }
  }
}