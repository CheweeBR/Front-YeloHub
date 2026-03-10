export type Role = 'admin' | 'vendedor' | 'cliente'

export interface User {
  id: number
  name: string
  role: Role
}

export interface AuthState {
  user: User | null
  token: string | null
}