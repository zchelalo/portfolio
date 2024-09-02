import { StudyEntity } from '@/modules/study/domain/entity'

export interface StudyRepository {
  getStudyById(uuid: string): Promise<StudyEntity>
  getStudies(offset: number, limit: number): Promise<StudyEntity[]>
}