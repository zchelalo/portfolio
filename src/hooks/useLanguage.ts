import { Language, LocalStorageKey } from '@/constants'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function useLanguage() {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState<Language>(() => {
    return localStorage.getItem(LocalStorageKey.LANGUAGE) as Language || i18n.language as Language
  })

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language, i18n])

  const changeLanguage = (language: Language) => {
    if (!Object.values(Language).includes(language)) {
      language = Language.EN
    }

    setLanguage(language)
    i18n.changeLanguage(language)
    localStorage.setItem(LocalStorageKey.LANGUAGE, language)
  }

  return {language, changeLanguage}
}

export { useLanguage }