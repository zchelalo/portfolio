import { StudyEntity } from '@/modules/study/domain/entity'
import { StudyRepository } from '@/modules/study/domain/repository'

const studies: StudyEntity[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    institution: 'CECyTES',
    career: 'Programming Technician',
    startDate: '2018-08-01T00:00:00Z',
    endDate: '2021-08-01T00:00:00Z'
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    institution: 'Universidad Tecnológica de Nogales',
    career: 'Higher University Technician in Information Technologies',
    startDate: '2021-08-01T00:00:00Z',
    endDate: '2023-08-01T00:00:00Z'
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174002',
    institution: 'Universidad Tecnológica de Nogales',
    career: 'Engineer in Multiplatform Software Development and Management',
    startDate: '2023-08-01T00:00:00Z',
    endDate: '2025-04-01T00:00:00Z'
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
    const studiesObtained = studies.slice(offset, offset + limit)
    if (studiesObtained.length === 0) {
      throw new Error('studies not found')
    }
    return studiesObtained
  }
}