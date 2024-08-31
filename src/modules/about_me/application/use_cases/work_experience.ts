import { AboutMeEntity } from '@/modules/about_me/domain/entity'
import { AboutMeRepository } from '@/modules/about_me/domain/repository'

export class AboutMeUseCase {
  private readonly aboutMeRepository: AboutMeRepository

  constructor(aboutMeRepository: AboutMeRepository) {
    this.aboutMeRepository = aboutMeRepository
  }

  public async getAboutMe(): Promise<AboutMeEntity> {
    const aboutMeObtained = await this.aboutMeRepository.getAboutMe()
    return aboutMeObtained
  }
}