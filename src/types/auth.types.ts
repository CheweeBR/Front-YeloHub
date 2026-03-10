export type Role = 'admin' | 'vendedor' | 'cliente'
export type VendedorTipo = 'tabelado' | 'livre'

export interface User {
  id: number
  name: string
  role: Role
  empresaId: number
  vendedorTipo?: VendedorTipo 
}

export interface AuthState {
  user: User | null
  token: string | null
}