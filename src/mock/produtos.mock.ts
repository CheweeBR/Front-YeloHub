import type { Produto } from '../types/produtos.types'

export const mockProdutos: Produto[] = [
  // Empresa 1 — Churrasqueiras, Grelhas & Acessórios
  {
    id: 1,
    nome: 'Churrasqueira Inox Premium 80cm',
    descricao:
      'Churrasqueira em aço inox escovado com grelha removível, bandeja coletora de gordura e acabamento premium.',
    foto: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop',
    grupo: 'Churrasqueiras',
    preco: 1290.0,
    empresaId: 1,
  },
  {
    id: 2,
    nome: 'Churrasqueira de Alvenaria Compacta',
    descricao:
      'Modelo ideal para áreas gourmet residenciais, com estrutura robusta e espaço para carvão e grelha.',
    foto: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    grupo: 'Churrasqueiras',
    preco: 980.0,
    empresaId: 1,
  },
  {
    id: 3,
    nome: 'Churrasqueira Portátil a Carvão',
    descricao:
      'Churrasqueira compacta com alças laterais, ideal para varandas, camping e pequenos eventos.',
    foto: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    grupo: 'Churrasqueiras',
    preco: 349.9,
    empresaId: 1,
  },
  {
    id: 4,
    nome: 'Churrasqueira Gourmet com Tampa',
    descricao:
      'Modelo com tampa metálica, controle de calor e design moderno para assados mais uniformes.',
    foto: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    grupo: 'Churrasqueiras',
    preco: 1590.0,
    empresaId: 1,
  },
  {
    id: 5,
    nome: 'Churrasqueira a Bafo Redonda',
    descricao:
      'Churrasqueira estilo bafo com tampa, termômetro embutido e excelente retenção de calor.',
    foto: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    grupo: 'Churrasqueiras',
    preco: 890.0,
    empresaId: 1,
  },
  {
    id: 6,
    nome: 'Grelha Inox Argentina 60cm',
    descricao:
      'Grelha de aço inox com canaletas para gordura, ideal para cortes nobres e preparo uniforme.',
    foto: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop',
    grupo: 'Grelhas',
    preco: 219.9,
    empresaId: 1,
  },
  {
    id: 7,
    nome: 'Grelha Basculante Cromada',
    descricao:
      'Grelha com sistema basculante e regulagem prática, perfeita para carnes, legumes e hambúrgueres.',
    foto: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    grupo: 'Grelhas',
    preco: 269.9,
    empresaId: 1,
  },
  {
    id: 8,
    nome: 'Grelha Parrilla Profissional',
    descricao:
      'Modelo parrilla com estrutura reforçada e inclinação para escoamento de gordura.',
    foto: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    grupo: 'Grelhas',
    preco: 420.0,
    empresaId: 1,
  },
  {
    id: 9,
    nome: 'Grelha Dupla para Peixes',
    descricao:
      'Grelha dupla cromada com trava lateral, ideal para peixes, legumes e cortes delicados.',
    foto: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=400&h=300&fit=crop',
    grupo: 'Grelhas',
    preco: 89.9,
    empresaId: 1,
  },
  {
    id: 10,
    nome: 'Grelha Moeda Inox 50x40',
    descricao:
      'Grelha resistente com malha moeda, ótima para evitar que alimentos menores caiam no braseiro.',
    foto: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop',
    grupo: 'Grelhas',
    preco: 199.9,
    empresaId: 1,
  },
  {
    id: 11,
    nome: 'Espeto Giratório Elétrico 6 Peças',
    descricao:
      'Conjunto com motor elétrico e 6 espetos em inox, ideal para frango, linguiça e picanha.',
    foto: 'data:image/webp;base64,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',
    grupo: 'Acessórios',
    preco: 359.9,
    empresaId: 1,
  },
  {
    id: 12,
    nome: 'Kit Utensílios Churrasco 8 Peças',
    descricao:
      'Kit completo com faca, garfo, pegador, espátula e acessórios em inox com cabo reforçado.',
    foto: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    grupo: 'Acessórios',
    preco: 149.9,
    empresaId: 1,
  },
  {
    id: 13,
    nome: 'Pegador de Carne Inox 40cm',
    descricao:
      'Pegador resistente com excelente firmeza para manuseio de carnes na grelha ou churrasqueira.',
    foto: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop',
    grupo: 'Acessórios',
    preco: 39.9,
    empresaId: 1,
  },
  {
    id: 14,
    nome: 'Acendedor Elétrico para Carvão',
    descricao:
      'Acendedor prático e seguro para iniciar o carvão rapidamente, sem necessidade de álcool.',
    foto: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=300&fit=crop',
    grupo: 'Acessórios',
    preco: 79.9,
    empresaId: 1,
  },
  {
    id: 15,
    nome: 'Bandeja Coletora de Gordura',
    descricao:
      'Bandeja metálica para coleta de gordura, facilita a limpeza e melhora a organização da churrasqueira.',
    foto: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    grupo: 'Acessórios',
    preco: 59.9,
    empresaId: 1,
  },
  {
    id: 16,
    nome: 'Escova de Limpeza para Grelha',
    descricao:
      'Escova com cerdas de aço e cabo anatômico para limpeza rápida e eficiente da grelha.',
    foto: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=400&h=300&fit=crop',
    grupo: 'Acessórios',
    preco: 34.9,
    empresaId: 1,
  },
  {
    id: 17,
    nome: 'Tábua de Corte Madeira Gourmet',
    descricao:
      'Tábua em madeira maciça para corte e apresentação de carnes, com acabamento elegante.',
    foto: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
    grupo: 'Acessórios',
    preco: 119.9,
    empresaId: 1,
  },
  {
    id: 18,
    nome: 'Kit 4 Facas para Churrasco',
    descricao:
      'Conjunto de facas afiadas em inox para cortes precisos, ideal para uso doméstico e profissional.',
    foto: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=400&h=300&fit=crop',
    grupo: 'Acessórios',
    preco: 129.9,
    empresaId: 1,
  },
  {
    id: 19,
    nome: 'Termômetro Culinário Digital',
    descricao:
      'Termômetro digital para medir o ponto ideal das carnes com rapidez e precisão.',
    foto: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    grupo: 'Acessórios',
    preco: 69.9,
    empresaId: 1,
  },
  {
    id: 20,
    nome: 'Suporte para Espetos em Inox',
    descricao:
      'Suporte reforçado para até 8 espetos, ideal para organização e praticidade no preparo do churrasco.',
    foto: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=300&fit=crop',
    grupo: 'Acessórios',
    preco: 189.9,
    empresaId: 1,
  },
]

export const getProdutosByEmpresa = (empresaId: number): Produto[] =>
  mockProdutos.filter((p) => p.empresaId === empresaId)