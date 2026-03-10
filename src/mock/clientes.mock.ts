import type { ClienteCatalogo } from '../types/produtos.types'

export const mockClientes: ClienteCatalogo[] = [
  { id: 10, name: 'Carlos Mendes', document: '111.222.333-44', empresaId: 1 },
  { id: 11, name: 'Fernanda Lima', document: '555.666.777-88', empresaId: 1 },
  { id: 12, name: 'Açougue do Zé Ltda', document: '12.345.678/0001-99', empresaId: 1 },
  { id: 13, name: 'Buffet Primavera', document: '98.765.432/0001-11', empresaId: 1 },
]

export const getClientesByEmpresa = (empresaId: number): ClienteCatalogo[] =>
  mockClientes.filter((c) => c.empresaId === empresaId)