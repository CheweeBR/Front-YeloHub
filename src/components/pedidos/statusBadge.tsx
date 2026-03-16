import type { PedidoStatus } from '../../types/pedidos.types'

const config: Record<PedidoStatus, { label: string; classes: string; dot: string }> = {
  aguardando_aprovacao: {
    label: 'Aguard. aprovação',
    classes: 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400',
    dot: 'bg-yellow-400 animate-pulse',
  },
  em_preparo: {
    label: 'Em preparo',
    classes: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    dot: 'bg-blue-400 animate-pulse',
  },
  saiu_para_entrega: {
    label: 'Saiu p/ entrega',
    classes: 'bg-violet-500/10 border-violet-500/30 text-violet-400',
    dot: 'bg-violet-400 animate-pulse',
  },
  entregue: {
    label: 'Entregue',
    classes: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    dot: 'bg-emerald-400',
  },
  pagamento_pendente: {
    label: 'Pagto. pendente',
    classes: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
    dot: 'bg-orange-400 animate-pulse',
  },
  concluido: {
    label: 'Concluído',
    classes: 'bg-zinc-500/10 border-zinc-500/30 text-zinc-400',
    dot: 'bg-zinc-400',
  },
  recusado: {
    label: 'Recusado',
    classes: 'bg-red-500/10 border-red-500/30 text-red-400',
    dot: 'bg-red-500',
  },
  cancelado: {
    label: 'Cancelado',
    classes: 'bg-red-900/20 border-red-900/30 text-red-600',
    dot: 'bg-red-700',
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