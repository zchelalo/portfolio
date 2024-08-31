import { ProjectEntity } from '@/modules/project/domain/entity'
import { ProjectRepository } from '@/modules/project/domain/repository'

import {
  getProjectByIDSchema,
  paginationSchema
} from '@/modules/project/application/schemas/project'

export class ProjectUseCase {
  private readonly projectRepository: ProjectRepository

  constructor(projectRepository: ProjectRepository) {
    this.projectRepository = projectRepository
  }

  public async getProjectById(id: string): Promise<ProjectEntity> {
    getProjectByIDSchema.parse({ id })

    const projectObtained = await this.projectRepository.getProjectById(id)
    return projectObtained
  }

  public async getProjects(offset: number, limit: number): Promise<ProjectEntity[]> {
    paginationSchema.parse({ offset, limit })

    const projectsObtained = await this.projectRepository.getProjects(offset, limit)
    return projectsObtained
  }
}