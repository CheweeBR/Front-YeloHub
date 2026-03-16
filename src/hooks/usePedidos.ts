import { useState, useMemo, useCallback } from 'react'
import type { PedidoStatus } from '../types/pedidos.types'
import { queryPedidos } from '../mock/pedidos.mock'
import type { User } from '../types/auth.types'

export type FiltroStatus = PedidoStatus | 'todos'

export const statusFiltros: { value: FiltroStatus; label: string }[] = [
  { value: 'todos',                label: 'Todos'          },
  { value: 'enviado',              label: 'Aguardando'     },
  { value: 'aguardando_pagamento', label: 'Ag. pagamento'  },
  { value: 'confirmado',           label: 'Confirmado'     },
  { value: 'em_preparacao',        label: 'Em preparação'  },
  { value: 'entregue',             label: 'Entregue'       },
  { value: 'concluido',            label: 'Concluído'      },
  { value: 'cancelado',            label: 'Cancelado'      },
]

const LIMIT = 30

interface State {
  filtroStatus:   FiltroStatus
  buscarPedido:   string
  buscarCliente:  string
  buscarVendedor: string
}

export function usePedidos(user: User) {
  const [state, setState] = useState<State>({
    filtroStatus:   'todos',
    buscarPedido:   '',
    buscarCliente:  '',
    buscarVendedor: '',
  })

  const [paginas,     setPaginas]     = useState<ReturnType<typeof queryPedidos>['data'][]>([])
  const [cursors,     setCursors]     = useState<(number | null)[]>([null])
  const [paginaAtual, setPaginaAtual] = useState(0)
  const [total,       setTotal]       = useState(0)

  const baseParams = useMemo(() => ({
    empresaId:  user.empresaId,
    vendedorId: user.role === 'vendedor' ? user.id : undefined,
    clienteId:  user.role === 'cliente'  ? user.id : undefined,
  }), [user])

  const load = useCallback((
    s: State,
    cursor: number | null = null,
    acumular = false,
    paginaIdx = 0,
  ) => {
    const result = queryPedidos({
      ...baseParams,
      status:         s.filtroStatus !== 'todos' ? s.filtroStatus : undefined,
      buscarPedido:   s.buscarPedido,
      buscarCliente:  s.buscarCliente,
      buscarVendedor: s.buscarVendedor,
      cursor:         cursor ?? undefined,
      limit:          LIMIT,
    })

    setTotal(result.total)

    if (acumular) {
      setPaginas((prev) => { const n = [...prev]; n[paginaIdx] = result.data; return n })
      setCursors((prev) => { const n = [...prev]; n[paginaIdx + 1] = result.nextCursor; return n })
    } else {
      setPaginas([result.data])
      setCursors([null, result.nextCursor])
      setPaginaAtual(0)
    }
  }, [baseParams])

  // Inicializa
  useMemo(() => { load(state) }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const update = useCallback((partial: Partial<State>) => {
    setState((prev) => {
      const next = { ...prev, ...partial }
      load(next)
      return next
    })
  }, [load])

  const setFiltroStatus   = (v: FiltroStatus) => update({ filtroStatus: v })
  const setBuscarPedido   = (v: string)        => update({ buscarPedido: v })
  const setBuscarCliente  = (v: string)        => update({ buscarCliente: v })
  const setBuscarVendedor = (v: string)        => update({ buscarVendedor: v })

  const proximaPagina = useCallback(() => {
    const nextIdx = paginaAtual + 1
    if (paginas[nextIdx]) {
      setPaginaAtual(nextIdx)
    } else {
      const cursor = cursors[nextIdx] ?? null
      load(state, cursor, true, nextIdx)
      setPaginaAtual(nextIdx)
    }
  }, [paginaAtual, cursors, paginas, load, state])

  const paginaAnterior = useCallback(() => {
    if (paginaAtual > 0) setPaginaAtual((p) => p - 1)
  }, [paginaAtual])

  const pedidos      = paginas[paginaAtual] ?? []
  const temProxima   = !!(cursors[paginaAtual + 1])
  const temAnterior  = paginaAtual > 0
  const numeroPagina = paginaAtual + 1
  const totalPaginas = Math.max(1, Math.ceil(total / LIMIT))

  const contadores = useMemo(() => {
    const all = queryPedidos({ ...baseParams, buscarPedido: state.buscarPedido, buscarCliente: state.buscarCliente, buscarVendedor: state.buscarVendedor, limit: 9999 })
    return statusFiltros.reduce((acc, f) => {
      acc[f.value] = f.value === 'todos'
        ? all.total
        : all.data.filter((p) => p.status === f.value).length
      return acc
    }, {} as Record<FiltroStatus, number>)
  }, [baseParams, state.buscarPedido, state.buscarCliente, state.buscarVendedor])

  return {
    pedidos,
    filtroStatus:    state.filtroStatus,   setFiltroStatus,
    buscarPedido:    state.buscarPedido,   setBuscarPedido,
    buscarCliente:   state.buscarCliente,  setBuscarCliente,
    buscarVendedor:  state.buscarVendedor, setBuscarVendedor,
    contadores,
    proximaPagina,   paginaAnterior,
    temProxima,      temAnterior,
    numeroPagina,    totalPaginas,
    total,
  }
}



