import { useEffect, useState } from 'react'
import { useMediaQuery, Theme } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { darkTheme, lightTheme } from '@/utils/Theme'

const usePreferredTheme = (): [Theme, () => void] => {
   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

   const [theme, setTheme] = useState<Theme>(createTheme(prefersDarkMode ? darkTheme : lightTheme))

   useEffect(() => {
      const getPreferredTheme = (): Theme => {
         const storedThemePreference = typeof window !== 'undefined' ? localStorage.getItem('themePreference') : null
         if (storedThemePreference) {
            return createTheme(storedThemePreference === 'dark' ? darkTheme : lightTheme)
         }
         return createTheme(prefersDarkMode ? darkTheme : lightTheme)
      }

      setTheme(getPreferredTheme())
   }, [prefersDarkMode])

   const toggleTheme = () => {
      const newMode = theme.palette.mode === 'light' ? 'dark' : 'light'
      const newTheme = createTheme(newMode === 'dark' ? darkTheme : lightTheme)
      setTheme(newTheme)
      if (typeof window !== 'undefined') {
         localStorage.setItem('themePreference', newMode)
      }
   }

   return [theme, toggleTheme]
}

export default usePreferredTheme
