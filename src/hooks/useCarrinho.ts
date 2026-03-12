import { useState } from 'react'
import type { Produto, ItemCarrinho } from '../types/produtos.types'

interface UseCarrinhoOptions {
  precoInicial?: (produto: Produto) => number
}

export function useCarrinho({ precoInicial }: UseCarrinhoOptions = {}) {
  const [carrinho, setCarrinho] = useState<Record<number, ItemCarrinho>>({})

  const getPrecoInicial = (produto: Produto) =>
    precoInicial ? precoInicial(produto) : produto.preco

  const handleQtd = (produto: Produto, delta: number) => {
    setCarrinho((prev) => {
      const atual = prev[produto.id] ?? {
        produto,
        quantidade: 0,
        precoUnitario: getPrecoInicial(produto),
      }
      const novaQtd = Math.max(0, atual.quantidade + delta)
      if (novaQtd === 0) {
        const { [produto.id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [produto.id]: { ...atual, quantidade: novaQtd } }
    })
  }

  const setQtdDireta = (produto: Produto, qtd: number) => {
    setCarrinho((prev) => {
      if (qtd <= 0) {
        const { [produto.id]: _, ...rest } = prev
        return rest
      }
      const atual = prev[produto.id] ?? {
        produto,
        quantidade: 0,
        precoUnitario: getPrecoInicial(produto),
      }
      return { ...prev, [produto.id]: { ...atual, quantidade: qtd } }
    })
  }

  // onChange — livre para digitar (sem validação)
  const setPrecoRaw = (produto: Produto, valor: number) => {
    setCarrinho((prev) => {
      const atual = prev[produto.id]
      if (!atual) return prev
      return { ...prev, [produto.id]: { ...atual, precoUnitario: valor } }
    })
  }

  // Vendedor tabelado: onBlur — impõe mínimo = preço da tabela
  const handlePreco = (produto: Produto, valor: number) => {
    setCarrinho((prev) => {
      const atual = prev[produto.id]
      if (!atual) return prev
      return { ...prev, [produto.id]: { ...atual, precoUnitario: Math.max(valor, produto.preco) } }
    })
  }

  // Vendedor livre: onBlur — aceita qualquer valor >= 0, sem piso de tabela
  const handlePrecoLivre = (produto: Produto, valor: number) => {
    setCarrinho((prev) => {
      const atual = prev[produto.id]
      if (!atual) return prev
      return { ...prev, [produto.id]: { ...atual, precoUnitario: Math.max(0, valor) } }
    })
  }

  const limpar = () => setCarrinho({})

  const itens = Object.values(carrinho).filter((i) => i.quantidade > 0)
  const total = itens.reduce((s, i) => s + i.quantidade * i.precoUnitario, 0)
  const quantidade = itens.reduce((s, i) => s + i.quantidade, 0)

  return {
    carrinho,
    itens,
    total,
    quantidade,
    handleQtd,
    setQtdDireta,
    handlePreco,
    handlePrecoLivre,
    setPrecoRaw,
    limpar,
  }
}