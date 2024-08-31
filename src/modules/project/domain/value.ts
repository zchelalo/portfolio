import { ProjectEntity, TechnologyEntity } from '@/modules/project/domain/entity'

import { Technology } from '@/constants'

export class ProjectValue implements ProjectEntity {
  readonly id?: string
  readonly title: string
  readonly description: string
  readonly technologies: TechnologyEntity[]
  readonly sourceCodeUrl?: string
  readonly previewUrl?: string

  constructor(title: string, description: string, technologies: TechnologyEntity[], sourceCodeUrl?: string, previewUrl?: string, id?: string) {
    this.title = title
    this.description = description

    if (!Array.isArray(technologies) || technologies.some(th => !(th instanceof TechnologyValue))) {
      throw new Error('invalid technology list')
    }

    this.technologies = technologies
    this.sourceCodeUrl = sourceCodeUrl
    this.previewUrl = previewUrl
    this.id = id
  }
}

export class TechnologyValue implements TechnologyEntity {
  readonly id?: string
  readonly name: Technology

  constructor(name: Technology, id?: string) {
    this.name = name
    this.id = id
  }
}