import { Language } from '@/constants'

export interface StudyEntity {
  id?: string
  institution: string
  career: string
  startDate: string
  endDate: string
  lang: Language
}