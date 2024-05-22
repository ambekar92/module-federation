import React, { createContext, useContext } from 'react'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'

interface AuthContextType {
  isAuthenticated: boolean
  session: Session | null
}

interface AuthProps {
	children: React.ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: AuthProps) => {
  const { data: session, status } = useSession()

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
