import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from '@/config/i18n/locales/en/common.json'
import esCommon from '@/config/i18n/locales/es/common.json'

import enAboutMe from '@/config/i18n/locales/en/about_me.json'
import esAboutMe from '@/config/i18n/locales/es/about_me.json'

const resources = {
  en: {
    common: enCommon,
    about_me: enAboutMe
  },
  es: {
    common: esCommon,
    about_me: esAboutMe
  }
}

i18next.use(initReactI18next).init({
  lng: 'en',
  interpolation: {
    escapeValue: false
  },
  resources,
  ns: ['common', 'about_me'],
  defaultNS: 'common'
})

export { i18next }