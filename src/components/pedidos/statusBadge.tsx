import type { PedidoStatus } from '../../types/pedidos.types'

const config: Record<PedidoStatus, { label: string; classes: string; dot: string }> = {
  enviado: {
    label: 'Aguardando',
    classes: 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400',
    dot: 'bg-yellow-400',
  },
  confirmado: {
    label: 'Confirmado',
    classes: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    dot: 'bg-emerald-400',
  },
  em_preparacao: {
    label: 'Em preparação',
    classes: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    dot: 'bg-blue-400 animate-pulse',
  },
  cancelado: {
    label: 'Cancelado',
    classes: 'bg-red-500/10 border-red-500/30 text-red-400',
    dot: 'bg-red-500',
  },
  entregue: {
    label: 'Entregue',
    classes: 'bg-emerald-400/10 border-emerald-400/30 text-emerald-300',
    dot: 'bg-emerald-300',
  },
  aguardando_pagamento: {
    label: 'Ag. pagamento',
    classes: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
    dot: 'bg-orange-400 animate-pulse',
  },
  concluido: {
    label: 'Concluído',
    classes: 'bg-zinc-500/10 border-zinc-500/30 text-zinc-400',
    dot: 'bg-zinc-400',
  },
}

export function StatusBadge({ status }: { status: PedidoStatus }) {
  const { label, classes, dot } = config[status]
  return (
    <span className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest ${classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
      {label}
    </span>
  )
}