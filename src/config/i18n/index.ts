import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from '@/config/i18n/locales/en/common.json'
import esCommon from '@/config/i18n/locales/es/common.json'

const resources = {
  en: {
    common: enCommon
  },
  es: {
    common: esCommon
  }
}

i18next.use(initReactI18next).init({
  lng: 'en',
  interpolation: {
    escapeValue: false
  },
  resources,
  ns: ['common'],
  defaultNS: 'common'
})

export { i18next }