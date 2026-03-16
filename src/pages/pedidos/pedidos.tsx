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

  const isAdmin = user.role === 'admin'

  return (
    <div className="bg-zinc-950 min-h-[calc(100dvh-3.5rem)]">

      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
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

            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3">
              {isAdmin && (
                <PedidosBusca
                  buscarPedido={buscarPedido}
                  buscarCliente={buscarCliente}
                  buscarVendedor={buscarVendedor}
                  onPedido={setBuscarPedido}
                  onCliente={setBuscarCliente}
                  onVendedor={setBuscarVendedor}
                />
              )}
              <PedidosFiltros
                filtroAtivo={filtroStatus}
                contadores={contadores}
                onChange={setFiltroStatus}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lista */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="border border-zinc-800 bg-zinc-900">

          {/* Cabeçalho da tabela — desktop */}
          <div className="hidden sm:flex items-center gap-4 px-5 py-3 border-b border-zinc-800 bg-zinc-800/40">
            <div className="w-28 shrink-0">
              <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Pedido</span>
            </div>
            <div className="flex-1 flex gap-3">
              {user.role !== 'vendedor' && (
                <div className="flex-1">
                  <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Vendedor</span>
                </div>
              )}
              {user.role !== 'cliente' && (
                <div className="flex-1">
                  <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Cliente</span>
                </div>
              )}
              <div className="w-24 shrink-0">
                <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Itens</span>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Total / Status</span>
            </div>
          </div>

          {pedidos.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-zinc-600 font-mono text-sm">Nenhum pedido encontrado.</p>
            </div>
          ) : (
            pedidos.map((pedido) => (
              <PedidoRow
                key={pedido.id}
                pedido={pedido}
                user={user}
              />
            ))
          )}
        </div>

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

    </div>
  )
}