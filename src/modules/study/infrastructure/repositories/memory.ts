import { Language } from '@/constants'
import { StudyEntity } from '@/modules/study/domain/entity'
import { StudyRepository } from '@/modules/study/domain/repository'

import { i18next } from '@/config/i18n'

const studies: StudyEntity[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    institution: 'CECyTES',
    career: 'Programming Technician',
    startDate: '2018-08-01T00:00:00Z',
    endDate: '2021-08-01T00:00:00Z',
    lang: Language.EN
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    institution: 'Universidad Tecnológica de Nogales',
    career: 'Engineer in Software Development and Management',
    startDate: '2021-08-01T00:00:00Z',
    endDate: '2025-04-01T00:00:00Z',
    lang: Language.EN
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    institution: 'CECyTES',
    career: 'Técnico en Programación',
    startDate: '2018-08-01T00:00:00Z',
    endDate: '2021-08-01T00:00:00Z',
    lang: Language.ES
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    institution: 'Universidad Tecnológica de Nogales',
    career: 'Ingeniero en Desarrollo y Gestión de Software',
    startDate: '2021-08-01T00:00:00Z',
    endDate: '2025-04-01T00:00:00Z',
    lang: Language.ES
  }
]

export class MemoryRepository implements StudyRepository {
  async getStudyById(id: string): Promise<StudyEntity> {
    const studyObtained = studies.find(study => study.id === id)
    if (!studyObtained) {
      throw new Error(`study with id ${id} not found`)
    }
    return studyObtained
  }

  async getStudies(offset: number, limit: number): Promise<StudyEntity[]> {
    let studiesObtained = studies.filter(study => study.lang === i18next.language)
    if (studiesObtained.length === 0) {
      throw new Error('studies not found')
    }
    studiesObtained = studiesObtained.slice(offset, offset + limit)
    if (studiesObtained.length === 0) {
      throw new Error('studies not found')
    }
    return studiesObtained
  }
}