import { useSessionUCMS } from '@/app/lib/auth'
import { SessionType } from '@/app/tarmac/types'
import React, { createContext, useContext } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  session: SessionType | null
}

interface AuthProps {
	children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: AuthProps) => {
  const session  = useSessionUCMS()

  const isAuthenticated = !!session

  return (
    <AuthContext.Provider value={{ isAuthenticated, session }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
