export type Role = 'admin' | 'vendedor' | 'cliente'
export type VendedorTipo = 'tabelado' | 'livre'

export interface Endereco {
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  uf: string
  cep: string
}

export interface User {
  id: number
  name: string
  email: string
  document: string
  role: Role
  empresaId: number
  ativo: boolean
  criadoEm: string
  // vendedor
  vendedorTipo?: VendedorTipo
  // cliente
  endereco?: Endereco
}

export interface AuthState {
  user: User | null
  token: string | null
}