import type { FiltroStatus } from '../../hooks/usePedidos'
import { statusFiltros } from '../../hooks/usePedidos'

interface PedidosFiltrosProps {
  filtroAtivo: FiltroStatus
  contadores: Record<FiltroStatus, number>
  onChange: (f: FiltroStatus) => void
}

export function PedidosFiltros({ filtroAtivo, contadores, onChange }: PedidosFiltrosProps) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {statusFiltros.map(({ value, label }) => {
        const ativo = filtroAtivo === value
        const count = contadores[value]
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`
              flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-widest
              transition-colors duration-150
              ${ativo
                ? 'bg-yellow-400 text-zinc-950'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600'}
            `}
          >
            {label}
            <span className={`
              text-[10px] font-mono px-1.5 py-0.5 rounded-sm
              ${ativo ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-800 text-zinc-500'}
            `}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}