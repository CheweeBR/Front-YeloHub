import type { Produto } from '../types/produtos.types'

export const mockProdutos: Produto[] = [
  // Empresa 1 — Churrasqueiras & Grelhas
  {
    id: 1,
    nome: 'Churrasqueira Inox 80cm',
    descricao: 'Churrasqueira em aço inox escovado 430, com grelha removível e bandeja coletora de gordura.',
    foto: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    grupo: 'Churrasqueiras',
    preco: 1290.00,
    empresaId: 1,
  },
  {
    id: 2,
    nome: 'Churrasqueira de Tijolo Kit',
    descricao: 'Kit completo para montagem de churrasqueira de tijolo refratário, inclui grelha e suportes.',
    foto: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    grupo: 'Churrasqueiras',
    preco: 890.00,
    empresaId: 1,
  },
  {
    id: 3,
    nome: 'Grelha Inox 60cm',
    descricao: 'Grelha em inox 304 com alça dobrável, fácil de limpar e de alta durabilidade.',
    foto: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
    grupo: 'Grelhas',
    preco: 189.90,
    empresaId: 1,
  },
  {
    id: 4,
    nome: 'Grelha Cromada Basculante',
    descricao: 'Grelha basculante com regulagem de altura, suporta até 15kg, ideal para espetos.',
    foto: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop',
    grupo: 'Grelhas',
    preco: 249.90,
    empresaId: 1,
  },
  {
    id: 5,
    nome: 'Espeto Giratório Elétrico',
    descricao: 'Motor 12V com 6 espetos em inox, rotação automática, ideal para frango e picanha.',
    foto: 'https://images.unsplash.com/photo-1607116667981-ff148a2f5634?w=400&h=300&fit=crop',
    grupo: 'Acessórios',
    preco: 320.00,
    empresaId: 1,
  },
  {
    id: 6,
    nome: 'Kit Utensílios Churrasco 8 peças',
    descricao: 'Conjunto com faca, garfo, pegador, escova e mais 4 utensílios em inox com cabo de madeira.',
    foto: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop',
    grupo: 'Acessórios',
    preco: 149.90,
    empresaId: 1,
  },
]

export const getProdutosByEmpresa = (empresaId: number): Produto[] =>
  mockProdutos.filter((p) => p.empresaId === empresaId)