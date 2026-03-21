// Este arquivo agora é apenas um adaptador que lê do Redux.
// Todos os componentes que usam useAuth() continuam funcionando sem nenhuma mudança.

import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setCredentials, clearCredentials } from '../store/slices/authSlice'
import type { User, Role } from '../types/auth.types'

export function useAuth() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const token = useAppSelector((state) => state.auth.token)

  const setAuth = (user: User, token: string) => {
    dispatch(setCredentials({ user, token }))
  }

  const clearAuth = () => {
    dispatch(clearCredentials())
  }

  const hasRole = (roles: Role[]): boolean => {
    if (!user) return false
    return roles.includes(user.role)
  }

  return { user, token, setAuth, clearAuth, hasRole }
}

// AuthProvider não faz mais nada — existe só para não quebrar o App.tsx
// enquanto você não remove ele de lá
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}