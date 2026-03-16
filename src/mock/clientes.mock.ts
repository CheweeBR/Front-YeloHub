import type { ClienteCatalogo } from '../types/produtos.types'
import { getUsersByRole } from './users.mock'

export const getClientesByEmpresa = (empresaId: number): ClienteCatalogo[] =>
  getUsersByRole(empresaId, 'cliente').map((u) => ({
    id: u.id,
    name: u.name,
    document: u.document,
    empresaId: u.empresaId,
  }))