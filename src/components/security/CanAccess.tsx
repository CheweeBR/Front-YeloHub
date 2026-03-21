import type { ReactNode } from 'react'
import type { Role } from '../../types/auth.types'
import { useAppSelector } from '../../store/hooks'

interface CanAccessProps {
  roles: Role[]
  children: ReactNode
  fallback?: ReactNode
}

export function CanAccess({ roles, children, fallback = null }: CanAccessProps) {
  const user = useAppSelector((state) => state.auth.user)
  const hasRole = user ? roles.includes(user.role) : false
  return hasRole ? <>{children}</> : <>{fallback}</>
}