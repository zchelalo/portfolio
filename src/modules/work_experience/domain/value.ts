import { WorkExperienceEntity } from '@/modules/work_experience/domain/entity'

import { Language } from '@/constants'

export class WorkExperienceValue implements WorkExperienceEntity {
  readonly id?: string
  readonly company: string
  readonly position: string
  readonly description: string
  readonly fullDescription: string
  readonly startDate: string
  readonly endDate?: string
  readonly lang: Language

  constructor(company: string, position: string, description: string, fullDescription: string, startDate: string, endDate?: string, id?: string, lang?: Language) {
    this.company = company
    this.position = position
    this.description = description
    this.fullDescription = fullDescription

    if (!this.isValidISODate(startDate)) {
      throw new Error(`invalid ISO format for startDate: ${startDate}`)
    }
    if (endDate && !this.isValidISODate(endDate)) {
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