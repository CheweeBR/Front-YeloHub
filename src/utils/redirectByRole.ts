import type { Role } from '../types/auth.types'

const roleRoutes: Record<Role, string> = {
  admin: '/admin',
  vendedor: '/catalogo',
  cliente: '/catalogo',
}

export const getRouteByRole = (role: string): string => {
  return roleRoutes[role as Role] ?? '/catalogo'
}