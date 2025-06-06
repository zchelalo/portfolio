import { SkillEntity } from '@/modules/skill/domain/entity'

import { Language, SkillLevel, Technology } from '@/constants'

export class SkillValue implements SkillEntity {
  readonly id?: string
  readonly name: Technology
  readonly level: SkillLevel
  readonly lang: Language

  constructor(name: Technology, level: SkillLevel, id?: string, lang?: Language) {
    if (!Object.values(Technology).includes(name)) {
      throw new Error('invalid technology name')
    }

    this.name = name

    if (!Object.values(SkillLevel).includes(level)) {
      throw new Error('invalid skill level')
    }

    this.level = level
    this.id = id

    if (lang) {
      this.lang = lang
    } else {
      this.lang = Language.EN
    }
  }
}