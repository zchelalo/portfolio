import { WorkExperienceEntity } from '@/modules/work_experience/domain/entity'

export interface WorkExperienceRepository {
  getWorkExperienceById(uuid: string): Promise<WorkExperienceEntity>
  getWorkExperiences(offset: number, limit: number): Promise<WorkExperienceEntity[]>
}