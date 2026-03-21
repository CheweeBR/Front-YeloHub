import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { Role } from '../../types/auth.types'
import { useAppSelector } from '../../store/hooks'

interface ProtectedRouteProps {
  roles: Role[]
  children: ReactNode
}

export function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
  const user  = useAppSelector((state) => state.auth.user)
  const token = useAppSelector((state) => state.auth.token)

  if (!token) return <Navigate to="/login" replace />
  if (!user || !roles.includes(user.role)) return <Navigate to="/sem-acesso" replace />

  return <>{children}</>
}