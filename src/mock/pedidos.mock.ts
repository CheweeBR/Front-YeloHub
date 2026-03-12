import type { Pedido } from '../types/pedidos.types'

export const mockPedidos: Pedido[] = [
  {
    id: 1, pedidoNum: 'PED-2025-001',
    clienteId: 10, clienteNome: 'Carlos Mendes',       clienteDocument: '111.222.333-44',
    empresaId: 1,
    vendedorId: 1, vendedorNome: 'João Silva',          vendedorDocument: '111.111.111-11',
    itens: [{ produto: { id: 1, nome: 'Churrasqueira Inox Premium 80cm', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 1290, empresaId: 1 }, quantidade: 2, precoUnitario: 1290 }],
    total: 2580, status: 'enviado', criadoEm: '2025-03-10T09:15:00Z',
  },
  {
    id: 2, pedidoNum: 'PED-2025-002',
    clienteId: 11, clienteNome: 'Fernanda Lima',        clienteDocument: '555.666.777-88',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'Maria Souza',         vendedorDocument: '222.222.222-22',
    itens: [{ produto: { id: 3, nome: 'Churrasqueira Portátil a Carvão', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 349.9, empresaId: 1 }, quantidade: 1, precoUnitario: 280 }],
    total: 280, status: 'confirmado', criadoEm: '2025-03-09T14:30:00Z',
  },
  {
    id: 3, pedidoNum: 'PED-2025-003',
    clienteId: 12, clienteNome: 'Açougue do Zé Ltda',  clienteDocument: '12.345.678/0001-99',
    empresaId: 1,
    vendedorId: 1, vendedorNome: 'João Silva',          vendedorDocument: '111.111.111-11',
    itens: [{ produto: { id: 8, nome: 'Grelha Parrilla Profissional', descricao: '', foto: '', grupo: 'Grelhas', preco: 420, empresaId: 1 }, quantidade: 3, precoUnitario: 420 }],
    total: 1260, status: 'em_preparacao', criadoEm: '2025-03-08T11:00:00Z',
  },
  {
    id: 4, pedidoNum: 'PED-2025-004',
    clienteId: 13, clienteNome: 'Buffet Primavera',     clienteDocument: '98.765.432/0001-11',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'Maria Souza',         vendedorDocument: '222.222.222-22',
    itens: [{ produto: { id: 4, nome: 'Churrasqueira Gourmet com Tampa', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 1590, empresaId: 1 }, quantidade: 1, precoUnitario: 1590 }],
    total: 1590, status: 'enviado', criadoEm: '2025-03-07T16:45:00Z',
  },
  {
    id: 5, pedidoNum: 'PED-2025-005',
    clienteId: 10, clienteNome: 'Carlos Mendes',        clienteDocument: '111.222.333-44',
    empresaId: 1,
    vendedorId: 1, vendedorNome: 'João Silva',          vendedorDocument: '111.111.111-11',
    itens: [{ produto: { id: 12, nome: 'Kit Utensílios Churrasco 8 Peças', descricao: '', foto: '', grupo: 'Acessórios', preco: 149.9, empresaId: 1 }, quantidade: 5, precoUnitario: 149.9 }],
    total: 749.5, status: 'cancelado', criadoEm: '2025-03-06T10:20:00Z',
  },
  {
    id: 6, pedidoNum: 'PED-2025-006',
    clienteId: 11, clienteNome: 'Fernanda Lima',        clienteDocument: '555.666.777-88',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'Maria Souza',         vendedorDocument: '222.222.222-22',
    itens: [{ produto: { id: 5, nome: 'Churrasqueira a Bafo Redonda', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 890, empresaId: 1 }, quantidade: 1, precoUnitario: 850 }],
    total: 850, status: 'confirmado', criadoEm: '2025-03-05T08:00:00Z',
  },
  {
    id: 7, pedidoNum: 'PED-2025-007',
    clienteId: 12, clienteNome: 'Açougue do Zé Ltda',  clienteDocument: '12.345.678/0001-99',
    empresaId: 1,
    vendedorId: 1, vendedorNome: 'João Silva',          vendedorDocument: '111.111.111-11',
    itens: [{ produto: { id: 20, nome: 'Suporte para Espetos em Inox', descricao: '', foto: '', grupo: 'Acessórios', preco: 189.9, empresaId: 1 }, quantidade: 4, precoUnitario: 189.9 }],
    total: 759.6, status: 'em_preparacao', criadoEm: '2025-03-04T13:10:00Z',
  },
  {
    id: 8, pedidoNum: 'PED-2025-008',
    clienteId: 13, clienteNome: 'Buffet Primavera',     clienteDocument: '98.765.432/0001-11',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'Maria Souza',         vendedorDocument: '222.222.222-22',
    itens: [{ produto: { id: 2, nome: 'Churrasqueira de Alvenaria Compacta', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 980, empresaId: 1 }, quantidade: 2, precoUnitario: 980 }],
    total: 1960, status: 'aguardando_pagamento', criadoEm: '2025-03-03T09:30:00Z',
  },
  {
    id: 9, pedidoNum: 'PED-2025-009',
    clienteId: 10, clienteNome: 'Carlos Mendes',        clienteDocument: '111.222.333-44',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'Maria Souza',         vendedorDocument: '222.222.222-22',
    itens: [{ produto: { id: 6, nome: 'Grelha Inox Argentina 60cm', descricao: '', foto: '', grupo: 'Grelhas', preco: 219.9, empresaId: 1 }, quantidade: 2, precoUnitario: 219.9 }],
    total: 439.8, status: 'entregue', criadoEm: '2025-03-02T15:00:00Z',
  },
  {
    id: 10, pedidoNum: 'PED-2025-010',
    clienteId: 11, clienteNome: 'Fernanda Lima',        clienteDocument: '555.666.777-88',
    empresaId: 1,
    vendedorId: 1, vendedorNome: 'João Silva',          vendedorDocument: '111.111.111-11',
    itens: [{ produto: { id: 17, nome: 'Tábua de Corte Madeira Gourmet', descricao: '', foto: '', grupo: 'Acessórios', preco: 119.9, empresaId: 1 }, quantidade: 3, precoUnitario: 119.9 }],
    total: 359.7, status: 'concluido', criadoEm: '2025-03-01T10:00:00Z',
  },
]

const stripMask = (v: string) => v.replace(/\D/g, '')

const baseByEmpresa = (empresaId: number) =>
  mockPedidos
    .filter((p) => p.empresaId === empresaId)
    .sort((a, b) => new Date(b.criadoEm!).getTime() - new Date(a.criadoEm!).getTime())

export interface PedidosQuery {
  empresaId:       number
  vendedorId?:     number
  clienteId?:      number
  status?:         string
  buscarCliente?:  string  // nome, CPF/CNPJ
  buscarVendedor?: string  // nome, CPF/CNPJ
  buscarPedido?:   string  // pedidoNum
  cursor?:         number
  limit?:          number
}

export interface PedidosResult {
  data:       Pedido[]
  nextCursor: number | null
  total:      number
}

export function queryPedidos({
  empresaId,
  vendedorId,
  clienteId,
  status,
  buscarCliente,
  buscarVendedor,
  buscarPedido,
  cursor,
  limit = 30,
}: PedidosQuery): PedidosResult {
  let items = baseByEmpresa(empresaId)

  // Escopo por role
  if (vendedorId) items = items.filter((p) => p.vendedorId === vendedorId)
  if (clienteId)  items = items.filter((p) => p.clienteId  === clienteId)

  // Busca por número do pedido
  if (buscarPedido?.trim()) {
    const termo = buscarPedido.toLowerCase().trim()
    items = items.filter((p) =>
      p.pedidoNum?.toLowerCase().includes(termo)
    )
  }

  // Busca por cliente: nome ou CPF/CNPJ
  if (buscarCliente?.trim()) {
    const termo       = buscarCliente.toLowerCase().trim()
    const termoDigits = stripMask(termo)
    items = items.filter((p) => {
      const porNome = p.clienteNome?.toLowerCase().includes(termo)
      const porDoc  = termoDigits.length >= 3
        ? stripMask(p.clienteDocument ?? '').includes(termoDigits)
        : false
      return porNome || porDoc
    })
  }

  // Busca por vendedor: nome ou CPF/CNPJ
  if (buscarVendedor?.trim()) {
    const termo       = buscarVendedor.toLowerCase().trim()
    const termoDigits = stripMask(termo)
    items = items.filter((p) => {
      const porNome = p.vendedorNome?.toLowerCase().includes(termo)
      const porDoc  = termoDigits.length >= 3
        ? stripMask(p.vendedorDocument ?? '').includes(termoDigits)
        : false
      return porNome || porDoc
    })
  }

  // Filtro de status
  if (status && status !== 'todos')
    items = items.filter((p) => p.status === status)

  const total = items.length

  // Cursor-based: pula até o item cursor (exclusive)
  if (cursor) {
    const idx = items.findIndex((p) => p.id === cursor)
    if (idx !== -1) items = items.slice(idx + 1)
  }

  const page    = items.slice(0, limit)
  const hasMore = items.length > limit

  return {
    data:       page,
    nextCursor: hasMore ? page[page.length - 1].id! : null,
    total,
  }
}