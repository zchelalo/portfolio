import { SkillEntity } from '@/modules/skill/domain/entity'

import { SkillLevel, Technology } from '@/constants'

export class SkillValue implements SkillEntity {
  readonly id?: string
  readonly name: Technology
  readonly level: SkillLevel

  constructor(name: Technology, level: SkillLevel, id?: string) {
    if (!Object.values(Technology).includes(name)) {
      throw new Error('invalid technology name')
    }

    this.name = name

    if (!Object.values(SkillLevel).includes(level)) {
      throw new Error('invalid skill level')
    }

    this.level = level
    this.id = id
  }
}