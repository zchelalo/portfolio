import { ProjectEntity } from '@/modules/project/domain/entity'
import { SkillEntity } from '@/modules/skill/domain/entity'
import { SkillValue } from '@/modules/skill/domain/value'

export class ProjectValue implements ProjectEntity {
  readonly id?: string
  readonly title: string
  readonly description: string
  readonly technologies: SkillEntity[]
  readonly sourceCodeUrl?: string
  readonly previewUrl?: string

  constructor(title: string, description: string, technologies: SkillEntity[], sourceCodeUrl?: string, previewUrl?: string, id?: string) {
    this.title = title
    this.description = description

    if (!Array.isArray(technologies) || technologies.some(th => !(th instanceof SkillValue))) {
      throw new Error('invalid technology list')
    }

    this.technologies = technologies
    this.sourceCodeUrl = sourceCodeUrl
    this.previewUrl = previewUrl
    this.id = id
  }
}