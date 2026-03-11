import { useState, useMemo } from 'react'
import { getProdutosByEmpresa } from '../mock/produtos.mock'

export function useProdutos(empresaId: number) {
  const produtos = getProdutosByEmpresa(empresaId)
  const grupos = useMemo(() => [...new Set(produtos.map((p) => p.grupo))], [produtos])

  const [grupoAtivo, setGrupoAtivo] = useState('Todos')
  const [busca, setBusca] = useState('')

  const produtosFiltrados = useMemo(
    () =>
      produtos.filter((p) => {
        const grupoOk = grupoAtivo === 'Todos' || p.grupo === grupoAtivo
        const buscaOk =
          p.nome.toLowerCase().includes(busca.toLowerCase()) ||
          p.grupo.toLowerCase().includes(busca.toLowerCase())
        return grupoOk && buscaOk
      }),
    [produtos, grupoAtivo, busca]
  )

  return { produtos, produtosFiltrados, grupos, grupoAtivo, setGrupoAtivo, busca, setBusca }
}