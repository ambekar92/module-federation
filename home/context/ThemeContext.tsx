// context/ThemeContext.tsx
import React, { createContext, useContext, ReactNode } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import usePreferredTheme from '@/hooks/usePreferredTheme'

interface ThemeContextType {
   toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [theme, toggleTheme] = usePreferredTheme()

   return (
      <ThemeContext.Provider value={{ toggleTheme }}>
         <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </ThemeContext.Provider>
   )
}

export const useTheme = () => {
   const context = useContext(ThemeContext)
   if (context === undefined) {
      throw new Error('useTheme must be used within a ThemeProvider')
   }
   return context
}
