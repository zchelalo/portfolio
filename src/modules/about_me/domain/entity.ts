import { SocialMediaType, Language } from '@/constants'

export interface AboutMeEntity {
  id?: string
  personalStatement: string
  pfpUrl: string
  socialMedia: SocialMediaEntity[]
  lang: Language
}

export interface SocialMediaEntity {
  id?: string
  type: SocialMediaType
  url: string
  fileToUpload?: string
}