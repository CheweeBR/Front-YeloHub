export interface Produto {
  id: number
  nome: string
  descricao: string
  foto: string
  grupo: string
  preco: number
  empresaId: number
}

export interface ItemCarrinho {
  produto: Produto
  quantidade: number
  precoUnitario: number // pode diferir do produto.preco se vendedor livre
}

export interface Pedido {
  id?: number
  clienteId: number
  empresaId: number
  vendedorId?: number
  itens: ItemCarrinho[]
  total: number
  status: 'rascunho' | 'enviado' | 'confirmado' | 'cancelado'
  criadoEm?: string
}

export interface ClienteCatalogo {
  id: number
  name: string
  document: string
  empresaId: number
}