export const mockUsers = [
  {
    document: '12345678900',      // CPF
    password: '123456',
    token: 'mock-token-001',
    user: { id: 1, name: 'João Silva', role: 'vendedor' },
  },
  {
    document: '98765432100',      // CPF
    password: '123456',
    token: 'mock-token-002',
    user: { id: 2, name: 'Maria Souza', role: 'admin' },
  },
  {
    document: '12345678000195',   // CNPJ
    password: '123456',
    token: 'mock-token-003',
    user: { id: 3, name: 'Empresa XYZ', role: 'empresa' },
  },
]