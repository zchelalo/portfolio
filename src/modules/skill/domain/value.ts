import { SkillEntity } from '@/modules/skill/domain/entity'

import { Technology } from '@/constants'

export class SkillValue implements SkillEntity {
  readonly id?: string
  readonly name: Technology

  constructor(name: Technology, id?: string) {
    if (!Object.values(Technology).includes(name)) {
      throw new Error('invalid technology name')
    }

    this.name = name
    this.id = id
  }
}