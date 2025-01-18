import { StudyEntity } from '@/modules/study/domain/entity'

import { Language } from '@/constants'

export class SkillValue implements StudyEntity {
  readonly id?: string
  readonly institution: string
  readonly career: string
  readonly startDate: string
  readonly endDate: string
  readonly lang: Language

  constructor(institution: string, career: string, startDate: string, endDate: string, id?: string, lang?: Language) {
    this.institution = institution
    this.career = career

    if (!this.isValidISODate(startDate)) {
      throw new Error(`invalid ISO format for startDate: ${startDate}`)
    }

    if (!this.isValidISODate(endDate)) {
      throw new Error(`invalid ISO format for endDate: ${endDate}`)
    }

    this.startDate = startDate
    this.endDate = endDate
    this.id = id

    if (lang) {
      this.lang = lang
    } else {
      this.lang = Language.EN
    }
  }

  private isValidISODate(date: string): boolean {
    // Expresión regular para verificar el formato ISO 8601
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/
    return isoDateRegex.test(date)
  }
}