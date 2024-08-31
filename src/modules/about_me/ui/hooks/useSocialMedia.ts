import { SocialMediaType } from '@/constants'

import { HiOutlineMail } from 'react-icons/hi'
import {
  AiOutlineLinkedin,
  AiOutlineGithub,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineYoutube,
  AiOutlineTikTok
} from 'react-icons/ai'

const socialMediaUrlFunc = (url: string) => window.open(`https://${url}`)

const socialMediaFuncs = {
  [SocialMediaType.EMAIL]: {
    onClick: (mail: string) => window.open(`mailto:${mail}`),
    icon: HiOutlineMail
  },
  [SocialMediaType.LINKEDIN]: {
    onClick: (url: string) => socialMediaUrlFunc(url),
    icon: AiOutlineLinkedin
  },
  [SocialMediaType.GITHUB]: {
    onClick: (url: string) => socialMediaUrlFunc(url),
    icon: AiOutlineGithub
  },
  [SocialMediaType.TWITTER]: {
    onClick: (url: string) => socialMediaUrlFunc(url),
    icon: AiOutlineTwitter
  },
  [SocialMediaType.INSTAGRAM]: {
    onClick: (url: string) => socialMediaUrlFunc(url),
    icon: AiOutlineInstagram
  },
  [SocialMediaType.FACEBOOK]: {
    onClick: (url: string) => socialMediaUrlFunc(url),
    icon: AiOutlineFacebook
  },
  [SocialMediaType.YOUTUBE]: {
    onClick: (url: string) => socialMediaUrlFunc(url),
    icon: AiOutlineYoutube
  },
  [SocialMediaType.TIKTOK]: {
    onClick: (url: string) => socialMediaUrlFunc(url),
    icon: AiOutlineTikTok
  }
}

function useSocialMedia() {
  return { socialMediaFuncs }
}

export { useSocialMedia }