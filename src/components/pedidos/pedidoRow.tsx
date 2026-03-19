import { useNavigate } from 'react-router-dom'
import type { Pedido } from '../../types/pedidos.types'
import type { User } from '../../types/auth.types'
import { StatusBadge } from './statusBadge'

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const fmtData = (iso: string) => {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })
}

const fmtHora = (iso: string) => {
  const d = new Date(iso)
  return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

interface PedidoRowProps {
  pedido: Pedido
  user: User
}

export function PedidoRow({ pedido, user }: PedidoRowProps) {
  const navigate = useNavigate()
  const totalItens = pedido.itens.reduce((s, i) => s + i.quantidade, 0)

  return (
    <button
      onClick={() => navigate(`/pedidos/${pedido.id}`)}
      className="
        w-full text-left group
        bg-zinc-900 border-b border-zinc-800
        hover:bg-zinc-800/50
        active:bg-zinc-800
        transition-colors duration-150
        focus:outline-none focus-visible:ring-1 focus-visible:ring-yellow-400
      "
    >
      {/* Linha de acento lateral — aparece no hover */}
      <div className="flex">
        <div className="w-0.5 shrink-0 bg-transparent group-hover:bg-yellow-400 transition-colors duration-150" />

        <div className="flex-1 px-4 py-4 sm:px-5 sm:py-4">

          {/* ── Topo: número + data + seta ── */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-yellow-400 text-sm font-mono font-semibold group-hover:text-yellow-300 transition-colors shrink-0">
                {pedido.pedidoNum ?? `#${pedido.id}`}
              </span>
              <span className="hidden sm:block w-px h-3 bg-zinc-700" />
              <span className="hidden sm:block text-zinc-600 text-[10px] font-mono">
                {fmtData(pedido.criadoEm!)} · {fmtHora(pedido.criadoEm!)}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <StatusBadge status={pedido.status} />
              <svg
                className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-400 translate-x-0 group-hover:translate-x-0.5 transition-all duration-150 hidden sm:block"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Data visível só no mobile (abaixo do número) */}
          <p className="sm:hidden text-zinc-600 text-[10px] font-mono mb-3">
            {fmtData(pedido.criadoEm!)} · {fmtHora(pedido.criadoEm!)}
          </p>

          {/* ── Meio: envolvidos ── */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-3">
            {user.role !== 'vendedor' && pedido.vendedorNome && (
              <div className="flex items-center gap-2 min-w-0">
                {/* Ícone vendedor */}
                <div className="w-5 h-5 shrink-0 border border-zinc-700 bg-zinc-800 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-zinc-600 text-[9px] font-mono uppercase tracking-widest block leading-none mb-0.5">Vendedor</span>
                  <span className="text-zinc-300 text-xs font-mono truncate block">{pedido.vendedorNome}</span>
                </div>
              </div>
            )}

            {user.role !== 'cliente' && pedido.clienteNome && (
              <div className="flex items-center gap-2 min-w-0">
                {/* Ícone cliente */}
                <div className="w-5 h-5 shrink-0 border border-zinc-700 bg-zinc-800 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M19 21V19a4 4 0 00-4-4H9a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-zinc-600 text-[9px] font-mono uppercase tracking-widest block leading-none mb-0.5">Cliente</span>
                  <span className="text-zinc-300 text-xs font-mono truncate block">{pedido.clienteNome}</span>
                </div>
              </div>
            )}
          </div>

          {/* ── Rodapé: itens + total ── */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
            {/* Itens */}
            <div className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="text-zinc-500 text-[10px] font-mono">
                {pedido.itens.length} {pedido.itens.length === 1 ? 'produto' : 'produtos'} · {totalItens} un
              </span>
            </div>

            {/* Total */}
            <span className="text-white text-sm font-mono font-semibold">
              {fmt(pedido.total)}
            </span>
          </div>

        </div>
      </div>
    </button>
  )
}