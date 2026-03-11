import { useState } from 'react'
import type { Produto, ItemCarrinho } from '../types/produtos.types'

export function useCarrinho() {
  const [carrinho, setCarrinho] = useState<Record<number, ItemCarrinho>>({})

  const handleQtd = (produto: Produto, delta: number) => {
    setCarrinho((prev) => {
      const atual = prev[produto.id] ?? { produto, quantidade: 0, precoUnitario: produto.preco }
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
      const atual = prev[produto.id] ?? { produto, quantidade: 0, precoUnitario: produto.preco }
      return { ...prev, [produto.id]: { ...atual, quantidade: qtd } }
    })
  }

  const setPrecoRaw = (produto: Produto, valor: number) => {
  setCarrinho((prev) => {
    const atual = prev[produto.id]
    if (!atual) return prev
    return { ...prev, [produto.id]: { ...atual, precoUnitario: valor } }
  })
}

  // Silently enforces minimum = table price (produto.preco)
  // without exposing the value to the UI
const handlePreco = (produto: Produto, valor: number) => {
  setCarrinho((prev) => {
    const atual = prev[produto.id]
    if (!atual) return prev
    return { ...prev, [produto.id]: { ...atual, precoUnitario: Math.max(valor, produto.preco) } }
  })
}
  const limpar = () => setCarrinho({})

  const itens = Object.values(carrinho).filter((i) => i.quantidade > 0)
  const total = itens.reduce((s, i) => s + i.quantidade * i.precoUnitario, 0)
  const quantidade = itens.reduce((s, i) => s + i.quantidade, 0)

  return { carrinho, itens, total, quantidade, handleQtd, setQtdDireta, handlePreco, limpar, setPrecoRaw }
}
