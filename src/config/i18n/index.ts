import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from '@/config/i18n/locales/en/common.json'
import esCommon from '@/config/i18n/locales/es/common.json'

import enAboutMe from '@/config/i18n/locales/en/about_me.json'
import esAboutMe from '@/config/i18n/locales/es/about_me.json'

import enHeader from '@/config/i18n/locales/en/header.json'
import esHeader from '@/config/i18n/locales/es/header.json'

const resources = {
  en: {
    common: enCommon,
    about_me: enAboutMe,
    header: enHeader
  },
  es: {
    common: esCommon,
    about_me: esAboutMe,
    header: esHeader
  }
}

i18next.use(initReactI18next).init({
  lng: 'en',
  interpolation: {
    escapeValue: false
  },
  resources,
  ns: ['common', 'about_me', 'header'],
  defaultNS: 'common'
})

export { i18next }