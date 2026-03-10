import type { Role, VendedorTipo } from '../types/auth.types'

interface MockUser {
  document: string
  password: string
  token: string
  user: {
    id: number
    name: string
    role: Role
    empresaId: number
    vendedorTipo?: VendedorTipo
  }
}

export const mockUsers: MockUser[] = [
  {
    document: '11111111111',      // CPF
    password: '123',
    token: 'mock-token-001',
    user: { id: 1, name: 'João Silva', role: 'vendedor', empresaId: 1, vendedorTipo: 'tabelado' },
  },
  {
    document: '22222222222',      // CPF
    password: '123',
    token: 'mock-token-002',
    user: { id: 2, name: 'Maria Souza', role: 'vendedor', empresaId: 1, vendedorTipo: 'livre' },
  },
  {
    document: '11111111111111',   // CNPJ
    password: '123',
    token: 'mock-token-003',
    user: { id: 3, name: 'Yelotech', role: 'admin', empresaId: 1 },
  },
]