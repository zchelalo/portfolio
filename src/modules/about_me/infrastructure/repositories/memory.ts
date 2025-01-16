import { AboutMeEntity } from '@/modules/about_me/domain/entity'
import { AboutMeRepository } from '@/modules/about_me/domain/repository'

import { Language, SocialMediaType } from '@/constants'

import { i18next } from '@/config/i18n'

const aboutMe: AboutMeEntity[] = [
  {
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
        url: 'www.linkedin.com/in/chelalo',
        fileToUpload: '/src/assets/files/cv-en.pdf'
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174003',
        type: SocialMediaType.GITHUB,
        url: 'github.com/zchelalo'
      }
    ],
    lang: Language.EN
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174001',
    personalStatement: 'Soy un apasionado desarrollador de software backend y entusiasta de la tecnología, que disfruta creando soluciones innovadoras para los desafíos. Mi trayectoria me ha conectado con personas increíbles, permitiéndome aprender y crecer. Siempre busco mejorar, apuntando a obtener el mejor resultado posible en mi trabajo. Disfruto aprendiendo de los demás y compartiendo mis conocimientos.',
    pfpUrl: '/src/assets/images/pfp.jpg',
    socialMedia: [
      {
        id: '123e4567-e89b-12d3-a456-426614174001',
        type: SocialMediaType.EMAIL,
        url: 'eduardosaavedra687@gmail.com'
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174004',
        type: SocialMediaType.LINKEDIN,
        url: 'www.linkedin.com/in/chelalo',
        fileToUpload: '/src/assets/files/cv-es.pdf'
      },
      {
        id: '123e4567-e89b-12d3-a456-426614174003',
        type: SocialMediaType.GITHUB,
        url: 'github.com/zchelalo'
      }
    ],
    lang: Language.ES
  },
] 

export class MemoryRepository implements AboutMeRepository {
  async getAboutMe(): Promise<AboutMeEntity> {
    if (i18next.language === Language.ES) {
      const aboutMeObtained = aboutMe.find(aboutMe => aboutMe.lang === Language.ES)
      if (!aboutMeObtained) {
        throw new Error('About me not found')
      }
      return aboutMeObtained
    }

    const aboutMeObtained = aboutMe.find(aboutMe => aboutMe.lang === Language.EN)
    if (!aboutMeObtained) {
      throw new Error('About me not found')
    }
    return aboutMeObtained
  }
}