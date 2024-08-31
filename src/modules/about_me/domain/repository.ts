import { AboutMeEntity } from '@/modules/about_me/domain/entity'

export interface AboutMeRepository {
  getAboutMe(): Promise<AboutMeEntity>
}