import { AboutMeEntity } from '@/modules/about_me/domain/entity'
import { AboutMeRepository } from '@/modules/about_me/domain/repository'

import { SocialMediaType } from '@/constants'

const aboutMe: AboutMeEntity = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  personalStatement: 'I am a passionate backend software developer and technology enthusiast who loves creating innovative solutions to challenges. My journey has connected me with incredible people, allowing me to learn and grow. I am constantly striving to improve, always aiming for the best possible outcome in my work. I enjoy learning from others and sharing my knowledge.',
  pfpUrl: '/src/assets/images/pfp.jpg',
  socialMedia: [
    {
      id: '123e4567-e89b-12d3-a456-426614174001',
      type: SocialMediaType.EMAIL,
      url: 'eduardosaavedra687@gmail.com'
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174002',
      type: SocialMediaType.LINKEDIN,
      url: 'www.linkedin.com/in/chelalo'
    },
    {
      id: '123e4567-e89b-12d3-a456-426614174003',
      type: SocialMediaType.GITHUB,
      url: 'github.com/zchelalo'
    }
  ]
}

export class MemoryRepository implements AboutMeRepository {
  async getAboutMe(): Promise<AboutMeEntity> {
    return aboutMe
  }
}