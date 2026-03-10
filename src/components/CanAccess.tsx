import { useAuth } from '../context/authContext'
import type { ReactNode } from 'react'
import type { Role } from '../types/auth.types'

interface CanAccessProps {
  roles: Role[]
  children: ReactNode
  fallback?: ReactNode
}

export function CanAccess({ roles, children, fallback = null }: CanAccessProps) {
  const { hasRole } = useAuth()
  return hasRole(roles) ? <>{children}</> : <>{fallback}</>
}