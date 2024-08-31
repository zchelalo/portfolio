import { SocialMediaType } from '@/constants'

export interface AboutMeEntity {
  id?: string
  personalStatement: string
  socialMedia: SocialMediaEntity[]
}

export interface SocialMediaEntity {
  id?: string
  type: SocialMediaType
  url: string
}