import type { Role } from '../types/auth.types'

interface MockUser {
  document: string
  password: string
  token: string
  user: {
    id: number
    name: string
    role: Role
    empresaId: number
  }
}

export const mockUsers: MockUser[] = [
  {
    document: '11111111111',      // CPF
    password: '123456',
    token: 'mock-token-001',
    user: { id: 1, name: 'João Silva', role: 'vendedor' as Role, empresaId: 1 },
  },
  {
    document: '98765432100',      // CPF
    password: '123456',
    token: 'mock-token-002',
    user: { id: 2, name: 'Maria Souza', role: 'admin' as Role, empresaId: 1 },
  },
  {
    document: '11111111111111',   // CNPJ
    password: '123456',
    token: 'mock-token-003',
    user: { id: 3, name: 'Yelotech', role: 'admin' as Role, empresaId: 1 },
  },
]