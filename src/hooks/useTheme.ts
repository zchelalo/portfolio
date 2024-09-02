import { useEffect, useState } from 'react'

import { LocalStorageKey, Theme } from '@/constants'

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(LocalStorageKey.THEME) as Theme
    if (storedTheme) return storedTheme
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDarkMode ? Theme.DARK : Theme.LIGHT
  })

  useEffect(() => {
    setThemeInHTML(theme)
    try {
      localStorage.setItem(LocalStorageKey.THEME, theme)
    } catch (error) {
      console.error('Error saving theme to localStorage', error)
    }
  }, [theme])

  const setThemeInHTML = (theme: Theme) => {
    document.documentElement.classList.toggle(Theme.DARK, theme === Theme.DARK)
  }

  const changeTheme = (theme: Theme) => {
    if (!Object.values(Theme).includes(theme)) {
      theme = Theme.LIGHT
    }

    setTheme(theme)
  }

  return {
    theme,
    changeTheme,
  }
}

export { useTheme }