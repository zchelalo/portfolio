import { StudyEntity } from '@/modules/study/domain/entity'
import { StudyRepository } from '@/modules/study/domain/repository'

import {
  getStudyByIDSchema,
  paginationSchema
} from '@/modules/study/application/schemas/study'

export class StudyUseCase {
  private readonly studyRepository: StudyRepository

  constructor(studyRepository: StudyRepository) {
    this.studyRepository = studyRepository
  }

  public async getStudyById(id: string): Promise<StudyEntity> {
    getStudyByIDSchema.parse({ id })

    const studyObtained = await this.studyRepository.getStudyById(id)
    return studyObtained
  }

  public async getStudies(offset: number, limit: number): Promise<StudyEntity[]> {
    paginationSchema.parse({ offset, limit })

    const studiesObtained = await this.studyRepository.getStudies(offset, limit)
    return studiesObtained
  }
}