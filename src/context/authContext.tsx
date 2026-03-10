import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { User, AuthState, Role } from '../types/auth.types'

interface AuthContextProps extends AuthState {
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
  hasRole: (roles: Role[]) => boolean
}

const AuthContext = createContext<AuthContextProps | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuthState] = useState<AuthState>({
    user: null,
    token: sessionStorage.getItem('token'),
  })

  const setAuth = (user: User, token: string) => {
    sessionStorage.setItem('token', token)
    setAuthState({ user, token })
  }

  const clearAuth = () => {
    sessionStorage.removeItem('token')
    setAuthState({ user: null, token: null })
  }

  const hasRole = (roles: Role[]) => {
    if (!auth.user) return false
    return roles.includes(auth.user.role)
  }

  return (
    <AuthContext.Provider value={{ ...auth, setAuth, clearAuth, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro do AuthProvider')
  return context
}