import type { User, Role, VendedorTipo } from '../types/auth.types'

interface MockUserAuth extends User {
  password: string
  token: string
}

let mockUsers: MockUserAuth[] = [
  // ── Admins ──────────────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Yelotech',
    email: 'admin@yelotech.com',
    document: '11.111.111/1111-11',
    role: 'admin',
    empresaId: 1,
    ativo: true,
    criadoEm: '2024-01-01T00:00:00Z',
    password: '123',
    token: 'mock-token-admin-001',
  },

  // ── Vendedores ───────────────────────────────────────────────────────────
  {
    id: 2,
    name: 'João Silva',
    email: 'joao.silva@yelotech.com',
    document: '111.111.111-11',
    role: 'vendedor',
    empresaId: 1,
    ativo: true,
    criadoEm: '2024-06-01T10:00:00Z',
    vendedorTipo: 'tabelado',
    password: '123',
    token: 'mock-token-vendedor-001',
  },
  {
    id: 3,
    name: 'Maria Souza',
    email: 'maria.souza@yelotech.com',
    document: '222.222.222-22',
    role: 'vendedor',
    empresaId: 1,
    ativo: true,
    criadoEm: '2024-07-15T09:30:00Z',
    vendedorTipo: 'livre',
    password: '123',
    token: 'mock-token-vendedor-002',
  },
  {
    id: 4,
    name: 'Ricardo Andrade',
    email: 'ricardo.andrade@yelotech.com',
    document: '333.333.333-33',
    role: 'vendedor',
    empresaId: 1,
    ativo: false,
    criadoEm: '2024-08-20T14:00:00Z',
    vendedorTipo: 'tabelado',
    password: '123',
    token: 'mock-token-vendedor-003',
  },

  // ── Clientes ─────────────────────────────────────────────────────────────
  {
    id: 5,
    name: 'Carlos Mendes',
    email: 'carlos.mendes@email.com',
    document: '111.222.333-44',
    role: 'cliente',
    empresaId: 1,
    ativo: true,
    criadoEm: '2024-09-01T08:00:00Z',
    endereco: {
      logradouro: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      cidade: 'Belo Horizonte',
      uf: 'MG',
      cep: '30110-000',
    },
    password: '123',
    token: 'mock-token-cliente-001',
  },
  {
    id: 6,
    name: 'Fernanda Lima',
    email: 'fernanda.lima@email.com',
    document: '555.666.777-88',
    role: 'cliente',
    empresaId: 1,
    ativo: true,
    criadoEm: '2024-09-10T10:00:00Z',
    endereco: {
      logradouro: 'Av. Afonso Pena',
      numero: '1000',
      complemento: 'Apto 42',
      bairro: 'Funcionários',
      cidade: 'Belo Horizonte',
      uf: 'MG',
      cep: '30130-001',
    },
    password: '123',
    token: 'mock-token-cliente-002',
  },
  {
    id: 7,
    name: 'Açougue do Zé Ltda',
    email: 'contato@acougue.com',
    document: '12.345.678/0001-99',
    role: 'cliente',
    empresaId: 1,
    ativo: true,
    criadoEm: '2024-10-05T11:00:00Z',
    endereco: {
      logradouro: 'Rua do Comércio',
      numero: '45',
      bairro: 'Lagoinha',
      cidade: 'Belo Horizonte',
      uf: 'MG',
      cep: '31110-060',
    },
    password: '123',
    token: 'mock-token-cliente-003',
  },
  {
    id: 8,
    name: 'Buffet Primavera',
    email: 'buffet@primavera.com',
    document: '98.765.432/0001-11',
    role: 'cliente',
    empresaId: 1,
    ativo: true,
    criadoEm: '2024-10-20T09:00:00Z',
    endereco: {
      logradouro: 'Rua Primavera',
      numero: '200',
      bairro: 'Pampulha',
      cidade: 'Belo Horizonte',
      uf: 'MG',
      cep: '31275-000',
    },
    password: '123',
    token: 'mock-token-cliente-004',
  },
]

let nextId = 9

// ── Auth ─────────────────────────────────────────────────────────────────

interface LoginPayload { document: string; password: string }
interface LoginResponse { token: string; user: User }

export const authMock = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    await new Promise((r) => setTimeout(r, 800))
    const raw = payload.document.replace(/\D/g, '')
    const match = mockUsers.find(
      (u) => u.document.replace(/\D/g, '') === raw && u.password === payload.password
    )
    if (!match) throw new Error('Documento ou senha inválidos')
    if (!match.ativo) throw new Error('Usuário inativo. Contate o administrador.')
    const { password: _, token, ...user } = match
    return { token, user }
  },
}

// ── Queries ───────────────────────────────────────────────────────────────

export function getUsersByRole(empresaId: number, role: Role): User[] {
  return mockUsers
    .filter((u) => u.empresaId === empresaId && u.role === role)
    .map(({ password: _, token: __, ...u }) => u)
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
}

export function getUserById(id: number, empresaId: number): User | null {
  const u = mockUsers.find((u) => u.id === id && u.empresaId === empresaId)
  if (!u) return null
  const { password: _, token: __, ...user } = u
  return user
}

// ── Mutations ─────────────────────────────────────────────────────────────

export interface CreateUserPayload {
  name: string
  email: string
  document: string
  role: Role
  empresaId: number
  password: string
  vendedorTipo?: VendedorTipo
}

export function createUser(data: CreateUserPayload): User {
  const newUser: MockUserAuth = {
    id: nextId++,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    document: data.document,
    role: data.role,
    empresaId: data.empresaId,
    ativo: true,
    criadoEm: new Date().toISOString(),
    password: data.password,
    token: `mock-token-${data.role}-${Date.now()}`,
    ...(data.vendedorTipo ? { vendedorTipo: data.vendedorTipo } : {}),
  }
  mockUsers = [...mockUsers, newUser]
  const { password: _, token: __, ...user } = newUser
  return user
}

export interface UpdateUserPayload {
  name?: string
  email?: string
  document?: string
  vendedorTipo?: VendedorTipo
  password?: string
}

export function updateUser(id: number, data: UpdateUserPayload): User | null {
  const idx = mockUsers.findIndex((u) => u.id === id)
  if (idx === -1) return null
  const updated: MockUserAuth = {
    ...mockUsers[idx],
    ...(data.name        ? { name: data.name.trim() }                 : {}),
    ...(data.email       ? { email: data.email.trim().toLowerCase() } : {}),
    ...(data.document    ? { document: data.document }                : {}),
    ...(data.vendedorTipo ? { vendedorTipo: data.vendedorTipo }       : {}),
    ...(data.password    ? { password: data.password }                : {}),
  }
  mockUsers = mockUsers.map((u) => (u.id === id ? updated : u))
  const { password: _, token: __, ...user } = updated
  return user
}

export function toggleUserAtivo(id: number): User | null {
  const idx = mockUsers.findIndex((u) => u.id === id)
  if (idx === -1) return null
  const updated = { ...mockUsers[idx], ativo: !mockUsers[idx].ativo }
  mockUsers = mockUsers.map((u) => (u.id === id ? updated : u))
  const { password: _, token: __, ...user } = updated
  return user
}

export function resetUserPassword(id: number): string | null {
  const idx = mockUsers.findIndex((u) => u.id === id)
  if (idx === -1) return null
  const novaSenha = Math.random().toString(36).slice(-8).toUpperCase()
  mockUsers = mockUsers.map((u) => (u.id === id ? { ...u, password: novaSenha } : u))
  return novaSenha
}

export function documentoJaExiste(document: string, ignorarId?: number): boolean {
  const digits = document.replace(/\D/g, '')
  return mockUsers.some(
    (u) => u.document.replace(/\D/g, '') === digits && u.id !== ignorarId
  )
}