import type { ItemCarrinho } from './produtos.types'

export type PedidoStatus =
  | 'aguardando_aprovacao'  // vendedor criou, aguarda admin
  | 'em_preparo'            // admin aprovou
  | 'saiu_para_entrega'     // admin avançou
  | 'entregue'              // admin confirmou entrega
  | 'pagamento_pendente'    // admin sinalizou não pago
  | 'concluido'             // terminal — pago e encerrado
  | 'recusado'              // terminal — admin recusou
  | 'cancelado'             // terminal — cancelado até saiu_para_entrega


export const transicoesPorStatus: Record<PedidoStatus, PedidoStatus[]> = {
  aguardando_aprovacao: ['em_preparo', 'recusado', 'cancelado'],
  em_preparo:           ['saiu_para_entrega', 'cancelado'],
  saiu_para_entrega:    ['entregue'],
  entregue:             ['concluido', 'pagamento_pendente'],
  pagamento_pendente:   ['concluido'],
  concluido:            [],
  recusado:             [],
  cancelado:            [],
}

export const statusTerminal: PedidoStatus[] = ['concluido', 'recusado', 'cancelado']

export const statusCancelavel: PedidoStatus[] = [
  'aguardando_aprovacao',
  'em_preparo',
]

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