import { useState } from 'react'
import type { Pedido, PedidoStatus } from '../../types/pedidos.types'
import { transicoesPorStatus, statusTerminal } from '../../types/pedidos.types'
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

// ── Config visual de cada status de destino ────────────────────────────────
const transicaoConfig: Record<PedidoStatus, { label: string; style: string; destructive?: boolean }> = {
  em_preparo:           { label: 'Aprovar — Em preparo',       style: 'bg-yellow-400 text-zinc-950 hover:bg-yellow-300' },
  saiu_para_entrega:    { label: 'Saiu para entrega',          style: 'bg-blue-500 text-white hover:bg-blue-400' },
  entregue:             { label: 'Confirmar entrega',          style: 'bg-violet-500 text-white hover:bg-violet-400' },
  pagamento_pendente:   { label: 'Marcar pagamento pendente',  style: 'bg-orange-500 text-white hover:bg-orange-400' },
  concluido:            { label: 'Concluir pedido',            style: 'bg-emerald-500 text-white hover:bg-emerald-400' },
  recusado:             { label: 'Recusar pedido',             style: 'border border-red-800 text-red-400 hover:bg-red-950', destructive: true },
  cancelado:            { label: 'Cancelar pedido',            style: 'border border-red-900 text-red-600 hover:bg-red-950/50', destructive: true },
  // estados que nunca são destino — nunca aparecem como botão
  aguardando_aprovacao: { label: '', style: '' },
}

// ── Sub-componente: painel de transição ────────────────────────────────────
interface StatusTransitionProps {
  pedido: Pedido
  onAtualizar: (novoStatus: PedidoStatus) => void
}

function StatusTransition({ pedido, onAtualizar }: StatusTransitionProps) {
  const [confirmando, setConfirmando] = useState<PedidoStatus | null>(null)
  const [atualizando, setAtualizando] = useState(false)

  const proximos = transicoesPorStatus[pedido.status]

  // Pedido terminal — sem ações disponíveis
  if (statusTerminal.includes(pedido.status)) {
    return (
      <div className="border border-zinc-800 bg-zinc-900 px-5 py-4">
        <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest mb-2">
          Status do pedido
        </p>
        <div className="flex items-center gap-3">
          <StatusBadge status={pedido.status} />
          <span className="text-zinc-600 text-xs font-mono">Pedido encerrado — nenhuma ação disponível</span>
        </div>
      </div>
    )
  }

  const handleConfirmar = async (status: PedidoStatus) => {
    setAtualizando(true)
    // Simula latência de API
    await new Promise((r) => setTimeout(r, 400))
    onAtualizar(status)
    setConfirmando(null)
    setAtualizando(false)
  }

  return (
    <div className="border border-zinc-800 bg-zinc-900 px-5 py-4">
      <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest mb-3">
        Alterar status
      </p>

      {/* Status atual */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-zinc-600 text-xs font-mono">Atual:</span>
        <StatusBadge status={pedido.status} />
      </div>

      {/* Botões de próximo status */}
      <div className="flex flex-col gap-2">
        {proximos.map((status) => {
          const cfg = transicaoConfig[status]
          const esteConfirmando = confirmando === status

          // Ação destrutiva — pede confirmação inline
          if (cfg.destructive) {
            return (
              <div key={status}>
                {!esteConfirmando ? (
                  <button
                    onClick={() => setConfirmando(status)}
                    disabled={atualizando || confirmando !== null}
                    className={`
                      w-full sm:w-auto px-4 py-2.5 text-xs font-mono uppercase tracking-widest
                      transition-colors duration-150
                      disabled:opacity-30 disabled:cursor-not-allowed
                      ${cfg.style}
                    `}
                  >
                    {cfg.label}
                  </button>
                ) : (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-zinc-400 text-xs font-mono">Confirmar?</span>
                    <button
                      onClick={() => handleConfirmar(status)}
                      disabled={atualizando}
                      className="
                        px-4 py-2 bg-red-600 text-white text-xs font-mono uppercase tracking-widest
                        hover:bg-red-500 disabled:opacity-50 transition-colors duration-150
                        flex items-center gap-1.5
                      "
                    >
                      {atualizando && (
                        <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                      )}
                      Sim, confirmar
                    </button>
                    <button
                      onClick={() => setConfirmando(null)}
                      disabled={atualizando}
                      className="px-4 py-2 border border-zinc-700 text-zinc-400 text-xs font-mono uppercase tracking-widest hover:text-white transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            )
          }

          // Ação normal — executa direto
          return (
            <button
              key={status}
              onClick={() => handleConfirmar(status)}
              disabled={atualizando || confirmando !== null}
              className={`
                w-full sm:w-auto px-4 py-2.5 text-xs font-mono uppercase tracking-widest
                transition-colors duration-150
                disabled:opacity-30 disabled:cursor-not-allowed
                flex items-center gap-1.5
                ${cfg.style}
              `}
            >
              {atualizando && (
                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              )}
              {cfg.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Componente principal ────────────────────────────────────────────────────
interface PedidoDetalheProps {
  pedido: Pedido
  user: User
  onVoltar: () => void
  onAtualizarStatus?: (novoStatus: PedidoStatus) => void
}

export function PedidoDetalhe({ pedido, user, onVoltar, onAtualizarStatus }: PedidoDetalheProps) {
  const totalItens = pedido.itens.reduce((s, i) => s + i.quantidade, 0)
  const isAdmin = user.role === 'admin'

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-5">

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

      {/* Cabeçalho */}
      <div className="border border-zinc-800 bg-zinc-900 px-5 py-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <p className="text-yellow-400 text-xs font-mono uppercase tracking-[0.25em] mb-1">Pedido</p>
            <h2
              className="text-white text-3xl uppercase leading-none"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}
            >
              {pedido.pedidoNum ?? `#${pedido.id}`}
            </h2>
            {pedido.criadoEm && (
              <p className="text-zinc-500 text-xs font-mono mt-1.5">{fmtDataHora(pedido.criadoEm)}</p>
            )}
          </div>
          <div className="flex items-start gap-3">
            <StatusBadge status={pedido.status} />
          </div>
        </div>
      </div>

      {/* Painel de alteração de status — somente admin */}
      {isAdmin && onAtualizarStatus && (
        <StatusTransition pedido={pedido} onAtualizar={onAtualizarStatus} />
      )}

      {/* Pessoas envolvidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {user.role !== 'cliente' && (
          <div className="border border-zinc-800 bg-zinc-900 px-5 py-4">
            <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest mb-3">Cliente</p>
            <div className="space-y-1.5">
              <p className="text-white text-sm font-mono">{pedido.clienteNome ?? '—'}</p>
              {pedido.clienteDocument && (
                <p className="text-zinc-500 text-xs font-mono">{pedido.clienteDocument}</p>
              )}
            </div>
          </div>
        )}

        {user.role !== 'vendedor' && pedido.vendedorNome && (
          <div className="border border-zinc-800 bg-zinc-900 px-5 py-4">
            <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest mb-3">Vendedor</p>
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
          <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Itens do pedido</p>
          <p className="text-zinc-600 text-[10px] font-mono">
            {pedido.itens.length} {pedido.itens.length === 1 ? 'produto' : 'produtos'} · {totalItens} un
          </p>
        </div>

        <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-2.5 bg-zinc-800/40 border-b border-zinc-800">
          <div className="col-span-6"><span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Produto</span></div>
          <div className="col-span-2 text-right"><span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Qtd</span></div>
          <div className="col-span-2 text-right"><span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Unit.</span></div>
          <div className="col-span-2 text-right"><span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Subtotal</span></div>
        </div>

        {pedido.itens.map((item) => (
          <div
            key={item.produto.id}
            className="flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-2 sm:gap-4 px-5 py-4 border-b border-zinc-800 last:border-0"
          >
            <div className="col-span-6 flex items-center gap-3">
              <img
                src={item.produto.foto}
                alt={item.produto.nome}
                className="w-12 h-12 object-cover shrink-0 rounded-sm bg-zinc-800"
              />
              <div className="min-w-0">
                <p className="text-white text-sm font-mono leading-snug">{item.produto.nome}</p>
                <p className="text-zinc-600 text-[10px] font-mono mt-0.5 uppercase tracking-widest">{item.produto.grupo}</p>
              </div>
            </div>

            <div className="sm:hidden flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-500">{item.quantidade} un</span>
              <span className="text-zinc-400">{fmt(item.precoUnitario)}</span>
              <span className="text-yellow-400">{fmt(item.precoUnitario * item.quantidade)}</span>
            </div>

            <div className="hidden sm:block col-span-2 text-right">
              <span className="text-zinc-300 text-sm font-mono">{item.quantidade}</span>
            </div>
            <div className="hidden sm:block col-span-2 text-right">
              <span className="text-zinc-400 text-sm font-mono">{fmt(item.precoUnitario)}</span>
            </div>
            <div className="hidden sm:block col-span-2 text-right">
              <span className="text-yellow-400 text-sm font-mono">{fmt(item.precoUnitario * item.quantidade)}</span>
            </div>
          </div>
        ))}

        <div className="px-5 py-4 bg-zinc-800/30 flex items-center justify-between">
          <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Total do pedido</span>
          <span className="text-white text-lg font-mono">{fmt(pedido.total)}</span>
        </div>
      </div>

    </div>
  )
}