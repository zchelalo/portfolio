import { useEffect, useState } from 'react'

import { LocalStorageKey } from '@/constants'

type Theme = 'light' | 'dark'

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(LocalStorageKey.THEME) as Theme
    if (storedTheme) return storedTheme
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDarkMode ? 'dark' : 'light'
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
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }

  const changeTheme = (theme: Theme) => {
    if (theme !== 'light' && theme !== 'dark') {
      theme = 'light'
    }

    setTheme(theme)
  }

  return {
    theme,
    changeTheme,
  }
}

export { useTheme }