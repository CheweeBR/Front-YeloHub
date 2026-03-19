import type { Pedido } from '../types/pedidos.types'
import type { PedidoStatus } from '../types/pedidos.types'
import { transicoesPorStatus } from '../types/pedidos.types'

let mockPedidos: Pedido[] = [
  {
    id: 1, pedidoNum: 'PED-2025-001',
    clienteId: 10, clienteNome: 'Carlos Mendes', clienteDocument: '111.222.333-44',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 1, nome: 'Churrasqueira Inox Premium 80cm', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 1290, empresaId: 1 }, quantidade: 2, precoUnitario: 1290 }
    ],
    total: 2580, status: 'aguardando_aprovacao', criadoEm: '2025-03-10T09:15:00Z',
  },
  {
    id: 2, pedidoNum: 'PED-2025-002',
    clienteId: 11, clienteNome: 'Fernanda Lima', clienteDocument: '555.666.777-88',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 3, nome: 'Churrasqueira Portátil a Carvão', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 349.9, empresaId: 1 }, quantidade: 1, precoUnitario: 280 }
    ],
    total: 280, status: 'em_preparo', criadoEm: '2025-03-09T14:30:00Z',
  },
  {
    id: 3, pedidoNum: 'PED-2025-003',
    clienteId: 12, clienteNome: 'Açougue do Zé Ltda', clienteDocument: '12.345.678/0001-99',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 8, nome: 'Grelha Parrilla Profissional', descricao: '', foto: '', grupo: 'Grelhas', preco: 420, empresaId: 1 }, quantidade: 3, precoUnitario: 420 }
    ],
    total: 1260, status: 'saiu_para_entrega', criadoEm: '2025-03-08T11:00:00Z',
  },
  {
    id: 4, pedidoNum: 'PED-2025-004',
    clienteId: 13, clienteNome: 'Buffet Primavera', clienteDocument: '98.765.432/0001-11',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 4, nome: 'Churrasqueira Gourmet com Tampa', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 1590, empresaId: 1 }, quantidade: 1, precoUnitario: 1590 }
    ],
    total: 1590, status: 'aguardando_aprovacao', criadoEm: '2025-03-07T16:45:00Z',
  },
  {
    id: 5, pedidoNum: 'PED-2025-005',
    clienteId: 10, clienteNome: 'Carlos Mendes', clienteDocument: '111.222.333-44',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 12, nome: 'Kit Utensílios Churrasco 8 Peças', descricao: '', foto: '', grupo: 'Acessórios', preco: 149.9, empresaId: 1 }, quantidade: 5, precoUnitario: 149.9 }
    ],
    total: 749.5, status: 'cancelado', criadoEm: '2025-03-06T10:20:00Z',
  },
  {
    id: 6, pedidoNum: 'PED-2025-006',
    clienteId: 11, clienteNome: 'Fernanda Lima', clienteDocument: '555.666.777-88',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 5, nome: 'Churrasqueira a Bafo Redonda', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 890, empresaId: 1 }, quantidade: 1, precoUnitario: 850 }
    ],
    total: 850, status: 'entregue', criadoEm: '2025-03-05T08:00:00Z',
  },
  {
    id: 7, pedidoNum: 'PED-2025-007',
    clienteId: 12, clienteNome: 'Açougue do Zé Ltda', clienteDocument: '12.345.678/0001-99',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 20, nome: 'Suporte para Espetos em Inox', descricao: '', foto: '', grupo: 'Acessórios', preco: 189.9, empresaId: 1 }, quantidade: 4, precoUnitario: 189.9 }
    ],
    total: 759.6, status: 'pagamento_pendente', criadoEm: '2025-03-04T13:10:00Z',
  },
  {
    id: 8, pedidoNum: 'PED-2025-008',
    clienteId: 13, clienteNome: 'Buffet Primavera', clienteDocument: '98.765.432/0001-11',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 2, nome: 'Churrasqueira de Alvenaria Compacta', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 980, empresaId: 1 }, quantidade: 2, precoUnitario: 980 }
    ],
    total: 1960, status: 'recusado', criadoEm: '2025-03-03T09:30:00Z',
  },
  {
    id: 9, pedidoNum: 'PED-2025-009',
    clienteId: 10, clienteNome: 'Carlos Mendes', clienteDocument: '111.222.333-44',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 6, nome: 'Grelha Inox Argentina 60cm', descricao: '', foto: '', grupo: 'Grelhas', preco: 219.9, empresaId: 1 }, quantidade: 2, precoUnitario: 219.9 }
    ],
    total: 439.8, status: 'concluido', criadoEm: '2025-03-02T15:00:00Z',
  },
  {
    id: 10, pedidoNum: 'PED-2025-010',
    clienteId: 11, clienteNome: 'Fernanda Lima', clienteDocument: '555.666.777-88',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 17, nome: 'Tábua de Corte Madeira Gourmet', descricao: '', foto: '', grupo: 'Acessórios', preco: 119.9, empresaId: 1 }, quantidade: 3, precoUnitario: 119.9 }
    ],
    total: 359.7, status: 'concluido', criadoEm: '2025-03-01T10:00:00Z',
  },
  {
    id: 11, pedidoNum: 'PED-2025-011',
    clienteId: 14, clienteNome: 'Ricardo Alves', clienteDocument: '222.333.444-55',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 7, nome: 'Grelha Moeda Inox 50cm', descricao: '', foto: '', grupo: 'Grelhas', preco: 189.9, empresaId: 1 }, quantidade: 2, precoUnitario: 189.9 }
    ],
    total: 379.8, status: 'em_preparo', criadoEm: '2025-02-28T09:10:00Z',
  },
  {
    id: 12, pedidoNum: 'PED-2025-012',
    clienteId: 15, clienteNome: 'Restaurante Sabor Gaúcho', clienteDocument: '45.678.123/0001-55',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 9, nome: 'Espeto Simples 65cm', descricao: '', foto: '', grupo: 'Espetos', preco: 39.9, empresaId: 1 }, quantidade: 20, precoUnitario: 39.9 }
    ],
    total: 798, status: 'aguardando_aprovacao', criadoEm: '2025-02-27T11:40:00Z',
  },
  {
    id: 13, pedidoNum: 'PED-2025-013',
    clienteId: 16, clienteNome: 'Juliana Rocha', clienteDocument: '333.444.555-66',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 10, nome: 'Espeto Duplo 75cm', descricao: '', foto: '', grupo: 'Espetos', preco: 49.9, empresaId: 1 }, quantidade: 8, precoUnitario: 49.9 }
    ],
    total: 399.2, status: 'pagamento_pendente', criadoEm: '2025-02-26T13:00:00Z',
  },
  {
    id: 14, pedidoNum: 'PED-2025-014',
    clienteId: 17, clienteNome: 'Mercado Bom Preço', clienteDocument: '23.111.222/0001-88',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 11, nome: 'Jogo de Facas para Churrasco', descricao: '', foto: '', grupo: 'Acessórios', preco: 229.9, empresaId: 1 }, quantidade: 3, precoUnitario: 229.9 }
    ],
    total: 689.7, status: 'entregue', criadoEm: '2025-02-25T08:45:00Z',
  },
  {
    id: 15, pedidoNum: 'PED-2025-015',
    clienteId: 18, clienteNome: 'Patrícia Nunes', clienteDocument: '444.555.666-77',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 13, nome: 'Avental de Couro Premium', descricao: '', foto: '', grupo: 'Acessórios', preco: 179.9, empresaId: 1 }, quantidade: 2, precoUnitario: 179.9 }
    ],
    total: 359.8, status: 'cancelado', criadoEm: '2025-02-24T10:15:00Z',
  },
  {
    id: 16, pedidoNum: 'PED-2025-016',
    clienteId: 19, clienteNome: 'Casa de Carnes Boi Forte', clienteDocument: '67.890.321/0001-44',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 14, nome: 'Garfos Trinchantes Inox', descricao: '', foto: '', grupo: 'Acessórios', preco: 59.9, empresaId: 1 }, quantidade: 10, precoUnitario: 59.9 }
    ],
    total: 599, status: 'saiu_para_entrega', criadoEm: '2025-02-23T14:25:00Z',
  },
  {
    id: 17, pedidoNum: 'PED-2025-017',
    clienteId: 20, clienteNome: 'Marcos Vinícius', clienteDocument: '555.111.222-33',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 15, nome: 'Termômetro Digital para Carnes', descricao: '', foto: '', grupo: 'Acessórios', preco: 89.9, empresaId: 1 }, quantidade: 4, precoUnitario: 89.9 }
    ],
    total: 359.6, status: 'recusado', criadoEm: '2025-02-22T16:35:00Z',
  },
  {
    id: 18, pedidoNum: 'PED-2025-018',
    clienteId: 21, clienteNome: 'Churrascaria Estância Grill', clienteDocument: '78.901.234/0001-00',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 16, nome: 'Kit Limpeza para Churrasqueira', descricao: '', foto: '', grupo: 'Acessórios', preco: 99.9, empresaId: 1 }, quantidade: 6, precoUnitario: 99.9 }
    ],
    total: 599.4, status: 'concluido', criadoEm: '2025-02-21T12:00:00Z',
  },
  {
    id: 19, pedidoNum: 'PED-2025-019',
    clienteId: 22, clienteNome: 'Vanessa Martins', clienteDocument: '666.777.888-99',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 18, nome: 'Pedra Refratária para Pizza Grill', descricao: '', foto: '', grupo: 'Acessórios', preco: 139.9, empresaId: 1 }, quantidade: 2, precoUnitario: 139.9 }
    ],
    total: 279.8, status: 'em_preparo', criadoEm: '2025-02-20T09:50:00Z',
  },
  {
    id: 20, pedidoNum: 'PED-2025-020',
    clienteId: 23, clienteNome: 'Distribuidora Fogo & Brasa', clienteDocument: '89.012.345/0001-66',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 19, nome: 'Espeto Triplo 85cm', descricao: '', foto: '', grupo: 'Espetos', preco: 69.9, empresaId: 1 }, quantidade: 15, precoUnitario: 69.9 }
    ],
    total: 1048.5, status: 'aguardando_aprovacao', criadoEm: '2025-02-19T15:20:00Z',
  },
  {
    id: 21, pedidoNum: 'PED-2025-021',
    clienteId: 24, clienteNome: 'Roberta Dias', clienteDocument: '777.888.999-00',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 21, nome: 'Chapa Bifeteira em Ferro Fundido', descricao: '', foto: '', grupo: 'Acessórios', preco: 249.9, empresaId: 1 }, quantidade: 2, precoUnitario: 249.9 }
    ],
    total: 499.8, status: 'pagamento_pendente', criadoEm: '2025-02-18T10:40:00Z',
  },
  {
    id: 22, pedidoNum: 'PED-2025-022',
    clienteId: 25, clienteNome: 'Empório da Carne', clienteDocument: '90.123.456/0001-77',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 22, nome: 'Parrilla Argentina Completa', descricao: '', foto: '', grupo: 'Grelhas', preco: 1890, empresaId: 1 }, quantidade: 1, precoUnitario: 1890 }
    ],
    total: 1890, status: 'entregue', criadoEm: '2025-02-17T08:10:00Z',
  },
  {
    id: 23, pedidoNum: 'PED-2025-023',
    clienteId: 26, clienteNome: 'Leonardo Pires', clienteDocument: '888.999.000-11',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 23, nome: 'Grelha Uruguaia Regulável', descricao: '', foto: '', grupo: 'Grelhas', preco: 720, empresaId: 1 }, quantidade: 1, precoUnitario: 720 }
    ],
    total: 720, status: 'concluido', criadoEm: '2025-02-16T13:30:00Z',
  },
  {
    id: 24, pedidoNum: 'PED-2025-024',
    clienteId: 27, clienteNome: 'Pousada Serra Verde', clienteDocument: '11.222.333/0001-44',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 24, nome: 'Braseiro Portátil', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 399.9, empresaId: 1 }, quantidade: 3, precoUnitario: 399.9 }
    ],
    total: 1199.7, status: 'saiu_para_entrega', criadoEm: '2025-02-15T17:05:00Z',
  },
  {
    id: 25, pedidoNum: 'PED-2025-025',
    clienteId: 28, clienteNome: 'Daniela Castro', clienteDocument: '999.000.111-22',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 25, nome: 'Defumador Vertical', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 1299, empresaId: 1 }, quantidade: 1, precoUnitario: 1299 }
    ],
    total: 1299, status: 'recusado', criadoEm: '2025-02-14T09:00:00Z',
  },
  {
    id: 26, pedidoNum: 'PED-2025-026',
    clienteId: 29, clienteNome: 'Conveniência do Assador', clienteDocument: '22.333.444/0001-55',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 26, nome: 'Espetinho Giratório Elétrico', descricao: '', foto: '', grupo: 'Espetos', preco: 159.9, empresaId: 1 }, quantidade: 6, precoUnitario: 159.9 }
    ],
    total: 959.4, status: 'cancelado', criadoEm: '2025-02-13T11:10:00Z',
  },
  {
    id: 27, pedidoNum: 'PED-2025-027',
    clienteId: 30, clienteNome: 'André Luiz', clienteDocument: '123.123.123-12',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 27, nome: 'Luva Térmica para Churrasco', descricao: '', foto: '', grupo: 'Acessórios', preco: 49.9, empresaId: 1 }, quantidade: 5, precoUnitario: 49.9 }
    ],
    total: 249.5, status: 'em_preparo', criadoEm: '2025-02-12T14:55:00Z',
  },
  {
    id: 28, pedidoNum: 'PED-2025-028',
    clienteId: 31, clienteNome: 'Frigorífico Vale Sul', clienteDocument: '33.444.555/0001-66',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 28, nome: 'Fogareiro Industrial a Gás', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 890, empresaId: 1 }, quantidade: 2, precoUnitario: 890 }
    ],
    total: 1780, status: 'aguardando_aprovacao', criadoEm: '2025-02-11T16:00:00Z',
  },
  {
    id: 29, pedidoNum: 'PED-2025-029',
    clienteId: 32, clienteNome: 'Sônia Ribeiro', clienteDocument: '234.234.234-23',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 29, nome: 'Conjunto de Espetos 6 Peças', descricao: '', foto: '', grupo: 'Espetos', preco: 119.9, empresaId: 1 }, quantidade: 3, precoUnitario: 119.9 }
    ],
    total: 359.7, status: 'pagamento_pendente', criadoEm: '2025-02-10T08:35:00Z',
  },
  {
    id: 30, pedidoNum: 'PED-2025-030',
    clienteId: 33, clienteNome: 'Bar do Toninho', clienteDocument: '44.555.666/0001-77',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 30, nome: 'Grelha Elevatória Premium', descricao: '', foto: '', grupo: 'Grelhas', preco: 980, empresaId: 1 }, quantidade: 1, precoUnitario: 980 }
    ],
    total: 980, status: 'entregue', criadoEm: '2025-02-09T12:45:00Z',
  },
  {
    id: 31, pedidoNum: 'PED-2025-031',
    clienteId: 34, clienteNome: 'Renata Carvalho', clienteDocument: '345.345.345-34',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 31, nome: 'Churrasqueira Elétrica de Bancada', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 459.9, empresaId: 1 }, quantidade: 2, precoUnitario: 459.9 }
    ],
    total: 919.8, status: 'concluido', criadoEm: '2025-02-08T10:10:00Z',
  },
  {
    id: 32, pedidoNum: 'PED-2025-032',
    clienteId: 35, clienteNome: 'Lanchonete Ponto Certo', clienteDocument: '55.666.777/0001-88',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 32, nome: 'Prensa para Hambúrguer Artesanal', descricao: '', foto: '', grupo: 'Acessórios', preco: 79.9, empresaId: 1 }, quantidade: 10, precoUnitario: 79.9 }
    ],
    total: 799, status: 'saiu_para_entrega', criadoEm: '2025-02-07T15:15:00Z',
  },
  {
    id: 33, pedidoNum: 'PED-2025-033',
    clienteId: 36, clienteNome: 'Thiago Moraes', clienteDocument: '456.456.456-45',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 33, nome: 'Pegador de Carne Inox', descricao: '', foto: '', grupo: 'Acessórios', preco: 34.9, empresaId: 1 }, quantidade: 12, precoUnitario: 34.9 }
    ],
    total: 418.8, status: 'recusado', criadoEm: '2025-02-06T09:25:00Z',
  },
  {
    id: 34, pedidoNum: 'PED-2025-034',
    clienteId: 37, clienteNome: 'Restaurante Brasa Nobre', clienteDocument: '66.777.888/0001-99',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 34, nome: 'Mesa de Apoio para Churrasco', descricao: '', foto: '', grupo: 'Acessórios', preco: 329.9, empresaId: 1 }, quantidade: 2, precoUnitario: 329.9 }
    ],
    total: 659.8, status: 'cancelado', criadoEm: '2025-02-05T11:50:00Z',
  },
  {
    id: 35, pedidoNum: 'PED-2025-035',
    clienteId: 38, clienteNome: 'Eliane Freitas', clienteDocument: '567.567.567-56',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 35, nome: 'Churrasqueira Embutida 70cm', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 1490, empresaId: 1 }, quantidade: 1, precoUnitario: 1490 }
    ],
    total: 1490, status: 'em_preparo', criadoEm: '2025-02-04T14:05:00Z',
  },
  {
    id: 36, pedidoNum: 'PED-2025-036',
    clienteId: 39, clienteNome: 'Comercial Prime Carnes', clienteDocument: '77.888.999/0001-10',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 36, nome: 'Manta Térmica para Descanso de Carnes', descricao: '', foto: '', grupo: 'Acessórios', preco: 89.9, empresaId: 1 }, quantidade: 7, precoUnitario: 89.9 }
    ],
    total: 629.3, status: 'aguardando_aprovacao', criadoEm: '2025-02-03T16:40:00Z',
  },
  {
    id: 37, pedidoNum: 'PED-2025-037',
    clienteId: 40, clienteNome: 'Gustavo Henrique', clienteDocument: '678.678.678-67',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 37, nome: 'Afiador Profissional de Facas', descricao: '', foto: '', grupo: 'Acessórios', preco: 159.9, empresaId: 1 }, quantidade: 2, precoUnitario: 159.9 }
    ],
    total: 319.8, status: 'pagamento_pendente', criadoEm: '2025-02-02T08:20:00Z',
  },
  {
    id: 38, pedidoNum: 'PED-2025-038',
    clienteId: 41, clienteNome: 'Buffet Solar', clienteDocument: '88.999.000/0001-21',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 38, nome: 'Churrasqueira Bafo Grande', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 1390, empresaId: 1 }, quantidade: 1, precoUnitario: 1390 }
    ],
    total: 1390, status: 'entregue', criadoEm: '2025-02-01T10:30:00Z',
  },
  {
    id: 39, pedidoNum: 'PED-2025-039',
    clienteId: 42, clienteNome: 'Cristiane Lopes', clienteDocument: '789.789.789-78',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 39, nome: 'Kit Churrasco Executivo 12 Peças', descricao: '', foto: '', grupo: 'Acessórios', preco: 249.9, empresaId: 1 }, quantidade: 2, precoUnitario: 249.9 }
    ],
    total: 499.8, status: 'concluido', criadoEm: '2025-01-31T13:45:00Z',
  },
  {
    id: 40, pedidoNum: 'PED-2025-040',
    clienteId: 43, clienteNome: 'Armazém do Espeto', clienteDocument: '99.000.111/0001-32',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 40, nome: 'Espeto Espada 90cm', descricao: '', foto: '', grupo: 'Espetos', preco: 84.9, empresaId: 1 }, quantidade: 10, precoUnitario: 84.9 }
    ],
    total: 849, status: 'saiu_para_entrega', criadoEm: '2025-01-30T15:55:00Z',
  },
  {
    id: 41, pedidoNum: 'PED-2025-041',
    clienteId: 44, clienteNome: 'Luciana Prado', clienteDocument: '890.890.890-89',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 41, nome: 'Grelha Redonda para Costela', descricao: '', foto: '', grupo: 'Grelhas', preco: 289.9, empresaId: 1 }, quantidade: 2, precoUnitario: 289.9 }
    ],
    total: 579.8, status: 'recusado', criadoEm: '2025-01-29T09:05:00Z',
  },
  {
    id: 42, pedidoNum: 'PED-2025-042',
    clienteId: 45, clienteNome: 'Açougue Central Premium', clienteDocument: '10.210.310/0001-43',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 42, nome: 'Suporte para Grelha Ajustável', descricao: '', foto: '', grupo: 'Grelhas', preco: 149.9, empresaId: 1 }, quantidade: 4, precoUnitario: 149.9 }
    ],
    total: 599.6, status: 'cancelado', criadoEm: '2025-01-28T11:25:00Z',
  },
  {
    id: 43, pedidoNum: 'PED-2025-043',
    clienteId: 46, clienteNome: 'Hugo Santana', clienteDocument: '901.901.901-90',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 43, nome: 'Churrasqueira Portátil Dobrável', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 299.9, empresaId: 1 }, quantidade: 3, precoUnitario: 299.9 }
    ],
    total: 899.7, status: 'em_preparo', criadoEm: '2025-01-27T14:10:00Z',
  },
  {
    id: 44, pedidoNum: 'PED-2025-044',
    clienteId: 47, clienteNome: 'Espaço Eventos Horizonte', clienteDocument: '21.321.421/0001-54',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 44, nome: 'Churrasqueira Gourmet 5 Espetos', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 2190, empresaId: 1 }, quantidade: 1, precoUnitario: 2190 }
    ],
    total: 2190, status: 'aguardando_aprovacao', criadoEm: '2025-01-26T16:35:00Z',
  },
  {
    id: 45, pedidoNum: 'PED-2025-045',
    clienteId: 48, clienteNome: 'Márcia Helena', clienteDocument: '012.012.012-01',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 45, nome: 'Conjunto de Tábuas Rústicas', descricao: '', foto: '', grupo: 'Acessórios', preco: 189.9, empresaId: 1 }, quantidade: 2, precoUnitario: 189.9 }
    ],
    total: 379.8, status: 'pagamento_pendente', criadoEm: '2025-01-25T08:55:00Z',
  },
  {
    id: 46, pedidoNum: 'PED-2025-046',
    clienteId: 49, clienteNome: 'Loja Casa & Grill', clienteDocument: '32.432.532/0001-65',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 46, nome: 'Acendedor Elétrico de Carvão', descricao: '', foto: '', grupo: 'Acessórios', preco: 129.9, empresaId: 1 }, quantidade: 8, precoUnitario: 129.9 }
    ],
    total: 1039.2, status: 'entregue', criadoEm: '2025-01-24T10:05:00Z',
  },
  {
    id: 47, pedidoNum: 'PED-2025-047',
    clienteId: 50, clienteNome: 'Paulo César', clienteDocument: '123.321.123-21',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 47, nome: 'Kit Espetos Premium 10 Peças', descricao: '', foto: '', grupo: 'Espetos', preco: 199.9, empresaId: 1 }, quantidade: 1, precoUnitario: 199.9 }
    ],
    total: 199.9, status: 'concluido', criadoEm: '2025-01-23T13:15:00Z',
  },
  {
    id: 48, pedidoNum: 'PED-2025-048',
    clienteId: 51, clienteNome: 'Restaurante Costela de Ouro', clienteDocument: '43.543.643/0001-76',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 48, nome: 'Grelha Especial para Costelão', descricao: '', foto: '', grupo: 'Grelhas', preco: 640, empresaId: 1 }, quantidade: 2, precoUnitario: 640 }
    ],
    total: 1280, status: 'saiu_para_entrega', criadoEm: '2025-01-22T15:45:00Z',
  },
  {
    id: 49, pedidoNum: 'PED-2025-049',
    clienteId: 52, clienteNome: 'Helena Barbosa', clienteDocument: '234.432.234-32',
    empresaId: 1,
    vendedorId: 2, vendedorNome: 'João Silva', vendedorDocument: '111.111.111-11',
    itens: [
      { produto: { id: 49, nome: 'Mini Parrilla de Mesa', descricao: '', foto: '', grupo: 'Churrasqueiras', preco: 349.9, empresaId: 1 }, quantidade: 2, precoUnitario: 349.9 }
    ],
    total: 699.8, status: 'recusado', criadoEm: '2025-01-21T09:40:00Z',
  },
  {
    id: 50, pedidoNum: 'PED-2025-050',
    clienteId: 53, clienteNome: 'Distribuidora Pampa Sul', clienteDocument: '54.654.754/0001-87',
    empresaId: 1,
    vendedorId: 3, vendedorNome: 'Maria Souza', vendedorDocument: '222.222.222-22',
    itens: [
      { produto: { id: 50, nome: 'Kit Completo Assador Profissional', descricao: '', foto: '', grupo: 'Acessórios', preco: 890, empresaId: 1 }, quantidade: 3, precoUnitario: 890 }
    ],
    total: 2670, status: 'aguardando_aprovacao', criadoEm: '2025-01-20T12:20:00Z',
  },
]

const stripMask = (v: string) => v.replace(/\D/g, '')

const baseByEmpresa = (empresaId: number) =>
  mockPedidos
    .filter((p) => p.empresaId === empresaId)
    .sort((a, b) => new Date(b.criadoEm!).getTime() - new Date(a.criadoEm!).getTime())

export function getPedidoById(
  id: number,
  empresaId: number,
  vendedorId?: number,
): Pedido | null {
  const pedido = mockPedidos.find((p) => p.id === id)
  if (!pedido || pedido.empresaId !== empresaId) return null
  if (vendedorId !== undefined && pedido.vendedorId !== vendedorId) return null
  return pedido
}

export interface PedidosQuery {
  empresaId:       number
  vendedorId?:     number
  clienteId?:      number
  status?:         string
  buscarCliente?:  string
  buscarVendedor?: string
  buscarPedido?:   string
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

  if (vendedorId) items = items.filter((p) => p.vendedorId === vendedorId)
  if (clienteId)  items = items.filter((p) => p.clienteId  === clienteId)

  if (buscarPedido?.trim()) {
    const termo = buscarPedido.toLowerCase().trim()
    items = items.filter((p) => p.pedidoNum?.toLowerCase().includes(termo))
  }

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

  if (status && status !== 'todos')
    items = items.filter((p) => p.status === status)

  const total = items.length

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

// ── Financeiro ──────────────────────────────────────────────────────────────

export interface FinanceiroResumo {
  faturado:            number
  aguardandoPagamento: number
  emAberto:            number
  totalGeral:          number
  pedidosFaturados:    number
  pedidosPendentes:    number
  pedidosEmAberto:     number
}

const STATUS_FATURADO  = new Set(['concluido'])
const STATUS_PENDENTE  = new Set(['pagamento_pendente'])
const STATUS_EM_ABERTO = new Set(['aguardando_aprovacao', 'em_preparo', 'saiu_para_entrega', 'entregue'])

export function getFinanceiro(empresaId: number): FinanceiroResumo {
  const pedidos = mockPedidos.filter((p) => p.empresaId === empresaId)

  let faturado = 0,            pedidosFaturados = 0
  let aguardandoPagamento = 0, pedidosPendentes = 0
  let emAberto = 0,            pedidosEmAberto  = 0

  for (const p of pedidos) {
    if (STATUS_FATURADO.has(p.status))  { faturado            += p.total; pedidosFaturados++ }
    if (STATUS_PENDENTE.has(p.status))  { aguardandoPagamento += p.total; pedidosPendentes++ }
    if (STATUS_EM_ABERTO.has(p.status)) { emAberto            += p.total; pedidosEmAberto++  }
  }

  return {
    faturado,
    aguardandoPagamento,
    emAberto,
    totalGeral: faturado + aguardandoPagamento + emAberto,
    pedidosFaturados,
    pedidosPendentes,
    pedidosEmAberto,
  }
}

// ── Mutação de status ───────────────────────────────────────────────────────

export function updatePedidoStatus(
  id: number,
  novoStatus: PedidoStatus,
): Pedido | null {
  const idx = mockPedidos.findIndex((p) => p.id === id)
  if (idx === -1) return null

  const pedido = mockPedidos[idx]
  const permitidos = transicoesPorStatus[pedido.status]
  if (!permitidos.includes(novoStatus)) return null

  const updated = { ...pedido, status: novoStatus }
  mockPedidos = mockPedidos.map((p) => (p.id === id ? updated : p))
  return updated
}