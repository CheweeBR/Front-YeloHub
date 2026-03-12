import type { Pedido } from '../../types/pedidos.types'
import type { User } from '../../types/auth.types'
import { StatusBadge } from './statusBadge'

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const fmtData = (iso: string) => {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
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
  const totalItens = pedido.itens.reduce((s, i) => s + i.quantidade, 0)

  return (
    <div className="
      group flex flex-col sm:flex-row sm:items-center gap-4
      px-5 py-4 border-b border-zinc-800
      hover:bg-zinc-800/30 transition-colors duration-150 cursor-pointer
    ">

      {/* Número + data */}
      <div className="sm:w-28 shrink-0">
        <p className="text-yellow-400 text-sm font-mono">{pedido.pedidoNum ?? `#${pedido.id}`}</p>
        <p className="text-zinc-600 text-[10px] font-mono mt-0.5">{fmtData(pedido.criadoEm!)}</p>
        <p className="text-zinc-700 text-[10px] font-mono">{fmtHora(pedido.criadoEm!)}</p>
      </div>

      {/* Vendedor + Cliente */}
      <div className="flex-1 min-w-0 flex flex-col sm:flex-row gap-3">

        {/* Vendedor — oculto para o próprio vendedor */}
        {user.role !== 'vendedor' && (
          <div className="sm:flex-1 min-w-0">
            <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest mb-0.5">Vendedor</p>
            <p className="text-white text-xs font-mono truncate">{pedido.vendedorNome ?? '—'}</p>
          </div>
        )}

        {/* Cliente — oculto para o próprio cliente */}
        {user.role !== 'cliente' && (
          <div className="sm:flex-1 min-w-0">
            <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest mb-0.5">Cliente</p>
            <p className="text-white text-xs font-mono truncate">{pedido.clienteNome ?? '—'}</p>
          </div>
        )}

        {/* Itens */}
        <div className="sm:w-24 shrink-0">
          <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest mb-0.5">Itens</p>
          <p className="text-zinc-300 text-xs font-mono">
            {pedido.itens.length} {pedido.itens.length === 1 ? 'produto' : 'produtos'} · {totalItens} un
          </p>
        </div>
      </div>

      {/* Total + status */}
      <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1.5 shrink-0">
        <p className="text-white text-sm font-mono">{fmt(pedido.total)}</p>
        <StatusBadge status={pedido.status} />
      </div>
    </div>
  )
}