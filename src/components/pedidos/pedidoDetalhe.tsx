import type { Pedido } from '../../types/pedidos.types'
import type { User } from '../../types/auth.types'
import { StatusBadge } from './statusBadge'

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const fmtDataHora = (iso: string) => {
  const d = new Date(iso)
  return d.toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

interface PedidoDetalheProps {
  pedido: Pedido
  user: User
  onVoltar: () => void
}

export function PedidoDetalhe({ pedido, user, onVoltar }: PedidoDetalheProps) {
  const totalItens = pedido.itens.reduce((s, i) => s + i.quantidade, 0)

  return (
    <div className="max-w-5xl mx-auto px-6 py-6 space-y-5">

      {/* Voltar */}
      <button
        onClick={onVoltar}
        className="flex items-center gap-2 text-zinc-500 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors duration-150 group"
      >
        <svg
          className="w-3.5 h-3.5 translate-x-0 group-hover:-translate-x-0.5 transition-transform duration-150"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Voltar para pedidos
      </button>

      {/* Cabeçalho do pedido */}
      <div className="border border-zinc-800 bg-zinc-900 px-5 py-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <p className="text-yellow-400 text-xs font-mono uppercase tracking-[0.25em] mb-1">
              Pedido
            </p>
            <h2
              className="text-white text-3xl uppercase leading-none"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}
            >
              {pedido.pedidoNum ?? `#${pedido.id}`}
            </h2>
            {pedido.criadoEm && (
              <p className="text-zinc-500 text-xs font-mono mt-1.5">
                {fmtDataHora(pedido.criadoEm)}
              </p>
            )}
          </div>
          <div className="flex items-start gap-3">
            <StatusBadge status={pedido.status} />
          </div>
        </div>
      </div>

      {/* Pessoas envolvidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Cliente */}
        {user.role !== 'cliente' && (
          <div className="border border-zinc-800 bg-zinc-900 px-5 py-4">
            <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest mb-3">
              Cliente
            </p>
            <div className="space-y-1.5">
              <p className="text-white text-sm font-mono">{pedido.clienteNome ?? '—'}</p>
              {pedido.clienteDocument && (
                <p className="text-zinc-500 text-xs font-mono">{pedido.clienteDocument}</p>
              )}
            </div>
          </div>
        )}

        {/* Vendedor */}
        {user.role !== 'vendedor' && pedido.vendedorNome && (
          <div className="border border-zinc-800 bg-zinc-900 px-5 py-4">
            <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest mb-3">
              Vendedor
            </p>
            <div className="space-y-1.5">
              <p className="text-white text-sm font-mono">{pedido.vendedorNome}</p>
              {pedido.vendedorDocument && (
                <p className="text-zinc-500 text-xs font-mono">{pedido.vendedorDocument}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Itens */}
      <div className="border border-zinc-800 bg-zinc-900">
        <div className="px-5 py-3.5 border-b border-zinc-800 flex items-center justify-between">
          <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
            Itens do pedido
          </p>
          <p className="text-zinc-600 text-[10px] font-mono">
            {pedido.itens.length} {pedido.itens.length === 1 ? 'produto' : 'produtos'} · {totalItens} un
          </p>
        </div>

        {/* Cabeçalho da tabela — desktop */}
        <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-2.5 bg-zinc-800/40 border-b border-zinc-800">
          <div className="col-span-6">
            <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Produto</span>
          </div>
          <div className="col-span-2 text-right">
            <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Qtd</span>
          </div>
          <div className="col-span-2 text-right">
            <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Unit.</span>
          </div>
          <div className="col-span-2 text-right">
            <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Subtotal</span>
          </div>
        </div>

        {pedido.itens.map((item) => (
          <div
            key={item.produto.id}
            className="flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-2 sm:gap-4 px-5 py-4 border-b border-zinc-800 last:border-0"
          >
            {/* Produto: foto + nome + grupo */}
            <div className="col-span-6 flex items-center gap-3">
              <img
                src={item.produto.foto}
                alt={item.produto.nome}
                className="w-12 h-12 object-cover shrink-0 rounded-sm bg-zinc-800"
              />
              <div className="min-w-0">
                <p className="text-white text-sm font-mono leading-snug">{item.produto.nome}</p>
                <p className="text-zinc-600 text-[10px] font-mono mt-0.5 uppercase tracking-widest">
                  {item.produto.grupo}
                </p>
              </div>
            </div>

            {/* Mobile: linha com qtd / unit / subtotal */}
            <div className="sm:hidden flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">{item.quantidade} un</span>
              <span className="text-zinc-400">{fmt(item.precoUnitario)}</span>
              <span className="text-yellow-400">{fmt(item.precoUnitario * item.quantidade)}</span>
            </div>

            {/* Desktop */}
            <div className="hidden sm:block col-span-2 text-right">
              <span className="text-zinc-300 text-sm font-mono">{item.quantidade}</span>
            </div>
            <div className="hidden sm:block col-span-2 text-right">
              <span className="text-zinc-400 text-sm font-mono">{fmt(item.precoUnitario)}</span>
            </div>
            <div className="hidden sm:block col-span-2 text-right">
              <span className="text-yellow-400 text-sm font-mono">
                {fmt(item.precoUnitario * item.quantidade)}
              </span>
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="px-5 py-4 bg-zinc-800/30 flex items-center justify-between">
          <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Total do pedido</span>
          <span className="text-white text-lg font-mono">{fmt(pedido.total)}</span>
        </div>
      </div>

    </div>
  )
}