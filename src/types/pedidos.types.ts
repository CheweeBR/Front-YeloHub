import type { ItemCarrinho } from './produtos.types'

export type PedidoStatus = 'enviado' | 'confirmado' | 'em_preparacao' | 'cancelado' | 'entregue' | 'aguardando_pagamento' | 'concluido'

export interface Pedido {
  id?: number
  pedidoNum?: string
  clienteId: number
  clienteNome?: string
  clienteDocument?: string
  empresaId: number
  vendedorId?: number
  vendedorNome?: string
  vendedorDocument?: string
  itens: ItemCarrinho[]
  total: number
  status: PedidoStatus
  criadoEm?: string
}