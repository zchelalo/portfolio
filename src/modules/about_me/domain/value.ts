import { AboutMeEntity, SocialMediaEntity } from '@/modules/about_me/domain/entity'
import { SocialMediaType } from '@/constants'

export class AboutMeEntityValue implements AboutMeEntity {
  readonly id?: string
  readonly personalStatement: string
  readonly pfpUrl: string
  readonly socialMedia: SocialMediaEntity[]

  constructor(personalStatement: string, pfpUrl: string, socialMedia: SocialMediaEntity[], id?: string) {
    this.personalStatement = personalStatement
    this.pfpUrl = pfpUrl

    if (!Array.isArray(socialMedia) || socialMedia.some(sm => !(sm instanceof SocialMediaValue))) {
      throw new Error('invalid social media list')
    }

    this.socialMedia = socialMedia
    this.id = id
  }
}

export class SocialMediaValue implements SocialMediaEntity {
  readonly id?: string
  readonly type: SocialMediaType
  readonly url: string
  readonly fileToUpload?: string

  constructor(type: SocialMediaType, url: string, fileToUpload?: string, id?: string) {
    if (!Object.values(SocialMediaType).includes(type)) {
      throw new Error(`invalid social media type: ${type}`)
    }

    this.type = type
    this.url = url
    this.fileToUpload = fileToUpload
    this.id = id
  }
}