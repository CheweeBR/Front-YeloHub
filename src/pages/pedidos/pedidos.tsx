import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../context/authContext'
import { usePedidos } from '../../hooks/usePedidos'
import { PedidosFiltros } from '../../components/pedidos/pedidosFiltros'
import { PedidosBusca } from '../../components/pedidos/pedidoBusca'
import { PedidoRow } from '../../components/pedidos/pedidoRow'
import { PedidosPaginacao } from '../../components/pedidos/pedidoPaginacao'

const subtituloByRole = {
  admin:    'Todos os pedidos',
  vendedor: 'Meus pedidos',
  cliente:  'Meus pedidos',
}

function useHideOnScroll(threshold = 8) {
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastY.current

      if (Math.abs(delta) < threshold) return

      setVisible(delta < 0 || currentY < 60)
      lastY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return visible
}

export default function PedidosPage() {
  const { user } = useAuth()
  if (!user) return null

  const {
    pedidos,
    filtroStatus,    setFiltroStatus,
    buscarPedido,    setBuscarPedido,
    buscarCliente,   setBuscarCliente,
    buscarVendedor,  setBuscarVendedor,
    contadores,
    proximaPagina,   paginaAnterior,
    temProxima,      temAnterior,
    numeroPagina,    totalPaginas,
    total,
  } = usePedidos(user)

  const isAdmin    = user.role === 'admin'
  const isVendedor = user.role === 'vendedor'
  const showBusca  = isAdmin || isVendedor

  const filtrosVisiveis = useHideOnScroll()

  return (
    <div className="bg-zinc-950 min-h-[calc(100dvh-3.5rem)]">

      {/* Header */}
      <div className="border-b border-zinc-800 px-4 sm:px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-yellow-400 text-xs font-mono uppercase tracking-[0.3em] mb-1">
            {subtituloByRole[user.role]}
          </p>
          <h1
            className="text-white text-4xl uppercase leading-none"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}
          >
            Pedidos
          </h1>
        </div>
      </div>

      {/* Filtros sticky — some ao rolar para baixo, volta ao rolar para cima */}
      <div
        className={`
          border-b border-zinc-800 px-4 sm:px-6 py-3
          bg-zinc-900/80 backdrop-blur-sm
          sticky top-14 z-10
          transition-transform duration-200 ease-in-out
          ${filtrosVisiveis ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <div className="max-w-5xl mx-auto flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <PedidosFiltros
              filtroAtivo={filtroStatus}
              contadores={contadores}
              onChange={setFiltroStatus}
            />
            <span className="text-zinc-700 text-[10px] font-mono shrink-0">
              {total} {total === 1 ? 'pedido' : 'pedidos'}
            </span>
          </div>

          {showBusca && (
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <PedidosBusca
                buscarPedido={buscarPedido}
                buscarCliente={buscarCliente}
                buscarVendedor={buscarVendedor}
                onPedido={setBuscarPedido}
                onCliente={setBuscarCliente}
                onVendedor={setBuscarVendedor}
                showVendedor={isAdmin}
              />
            </div>
          )}
        </div>
      </div>

      {/* Lista */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">

        {pedidos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center">
              <svg className="w-5 h-5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-zinc-600 font-mono text-sm">Nenhum pedido encontrado.</p>
          </div>
        ) : (
          <>
            <div className="border border-zinc-800 overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-2.5 border-b border-zinc-800 bg-zinc-800/50">
                <div className="col-span-3">
                  <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Pedido / Data</span>
                </div>
                <div className="col-span-4">
                  <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
                    {isAdmin ? 'Vendedor / Cliente' : isVendedor ? 'Cliente' : 'Vendedor'}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Status</span>
                </div>
                <div className="col-span-3 text-right">
                  <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Total</span>
                </div>
              </div>

              {pedidos.map((pedido) => (
                <PedidoRow
                  key={pedido.id}
                  pedido={pedido}
                  user={user}
                />
              ))}
            </div>

            <div className="mt-4">
              <PedidosPaginacao
                numeroPagina={numeroPagina}
                totalPaginas={totalPaginas}
                total={total}
                temAnterior={temAnterior}
                temProxima={temProxima}
                onAnterior={paginaAnterior}
                onProxima={proximaPagina}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}