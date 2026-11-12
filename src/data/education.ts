import type { Localized } from './types'

export type EducationEntry = {
  institution: string
  degree: Localized
  start: number
  end: number
  note?: Localized
}

export const education: EducationEntry[] = [
  {
    institution: 'Universidad Tecnológica de Nogales',
    degree: {
      es: 'Ingeniería en Desarrollo y Gestión de Software',
      en: 'Engineer in Software Development and Management',
    },
    start: 2021,
    end: 2025,
  },
  {
    institution: 'CECyTES',
    degree: {
      es: 'Técnico en Programación',
      en: 'Programming Technician',
    },
    start: 2018,
    end: 2021,
  },
]
