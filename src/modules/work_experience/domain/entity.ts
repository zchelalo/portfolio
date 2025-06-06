import { Language } from '@/constants'

export interface WorkExperienceEntity {
  id?: string
  company: string
  position: string
  description: string
  fullDescription: string
  startDate: string
  endDate?: string
  lang: Language
}