import { WorkExperienceEntity } from '@/modules/work_experience/domain/entity'
import { WorkExperienceRepository } from '@/modules/work_experience/domain/repository'

const workExperiences: WorkExperienceEntity[] = [
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    company: 'Under Apps Systems',
    position: 'Backend Developer',
    description: 'I maintained and fixed bugs in microservices, developed endpoints in NodeJS, designed and implemented PostgreSQL schemas, and created a full application using Hono, Drizzle, Zod, and JWT-based authentication. I also dockerized applications, set up a reverse proxy with NGINX, conducted unit testing with Jest, documented with Typedoc, and automated processes using bash scripts. Additionally, I actively participated in agile methodology projects.',
    startDate: '2023-09-15T00:00:00Z',
    endDate: undefined
  }
]

export class MemoryRepository implements WorkExperienceRepository {
  async getWorkExperienceById(id: string): Promise<WorkExperienceEntity> {
    const workExperienceObtained = workExperiences.find(workExperience => workExperience.id === id)
    if (!workExperienceObtained) {
      throw new Error(`work experience with id ${id} not found`)
    }
    return workExperienceObtained
  }

  async getWorkExperiences(offset: number, limit: number): Promise<WorkExperienceEntity[]> {
    const workExperiencesObtained = workExperiences.slice(offset, offset + limit)
    if (workExperiencesObtained.length === 0) {
      throw new Error('work experiences not found')
    }
    return workExperiencesObtained
  }
}