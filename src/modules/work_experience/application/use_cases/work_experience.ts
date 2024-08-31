import { WorkExperienceEntity } from '@/modules/work_experience/domain/entity'
import { WorkExperienceRepository } from '@/modules/work_experience/domain/repository'

import {
  getWorkExperienceByIDSchema,
  paginationSchema
} from '@/modules/work_experience/application/schemas/work_experience'

export class WorkExperienceUseCase {
  private readonly workExperienceRepository: WorkExperienceRepository

  constructor(workExperienceRepository: WorkExperienceRepository) {
    this.workExperienceRepository = workExperienceRepository
  }

  public async getWorkExperienceById(id: string): Promise<WorkExperienceEntity> {
    getWorkExperienceByIDSchema.parse({ id })

    const workExperienceObtained = await this.workExperienceRepository.getWorkExperienceById(id)
    return workExperienceObtained
  }

  public async getWorkExperiences(offset: number, limit: number): Promise<WorkExperienceEntity[]> {
    paginationSchema.parse({ offset, limit })

    const workExperiencesObtained = await this.workExperienceRepository.getWorkExperiences(offset, limit)
    return workExperiencesObtained
  }
}