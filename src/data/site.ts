import type { Locale } from '@/i18n/ui'
import type { SiteLink } from './types'

export const site = {
  url: 'https://chelalo.me',
  name: 'Eduardo Saavedra',
  shortName: 'Chelalo',
  role: {
    es: 'Software Engineer',
    en: 'Software Engineer',
  },
  email: 'eduardosaavedra687@gmail.com',
  location: {
    es: 'México',
    en: 'Mexico',
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/chelalo',
    github: 'https://github.com/zchelalo',
  },
  cv: {
    es: '/files/EduardoSaavedra-cv-es.pdf',
    en: '/files/EduardoSaavedra-cv-en.pdf',
  } satisfies Record<Locale, string>,
} as const

export function contactLinks(locale: Locale): SiteLink[] {
  return [
    {
      label: locale === 'es' ? 'Escríbeme' : 'Email me',
      href: `mailto:${site.email}`,
    },
    {
      label: 'LinkedIn',
      href: site.links.linkedin,
      external: true,
    },
    {
      label: 'GitHub',
      href: site.links.github,
      external: true,
    },
    {
      label: locale === 'es' ? 'Currículum en PDF' : 'PDF resume',
      href: site.cv[locale],
    },
  ]
}
