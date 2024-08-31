import { ProjectEntity } from '@/modules/project/domain/entity'

export interface ProjectRepository {
  getProjectById(uuid: string): Promise<ProjectEntity>
  getProjects(offset: number, limit: number): Promise<ProjectEntity[]>
}