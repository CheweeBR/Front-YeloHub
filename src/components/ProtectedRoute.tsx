import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import type { ReactNode } from 'react'
import type { Role } from '../types/auth.types'

interface ProtectedRouteProps {
  roles: Role[]
  children: ReactNode
}

export function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
  const { token, hasRole } = useAuth()

  if (!token) return <Navigate to="/login" replace />
  if (!hasRole(roles)) return <Navigate to="/sem-acesso" replace />

  return <>{children}</>
}