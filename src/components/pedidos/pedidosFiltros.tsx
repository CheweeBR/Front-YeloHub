import type { FiltroStatus } from '../../hooks/usePedidos'
import { statusFiltros } from '../../hooks/usePedidos'

interface PedidosFiltrosProps {
  filtroAtivo: FiltroStatus
  contadores: Record<FiltroStatus, number>
  onChange: (f: FiltroStatus) => void
}

export function PedidosFiltros({ filtroAtivo, contadores, onChange }: PedidosFiltrosProps) {
  return (
    <div className="relative">
      <select
        value={filtroAtivo}
        onChange={(e) => onChange(e.target.value as FiltroStatus)}
        className="
          appearance-none bg-zinc-900 border border-zinc-800 text-white
          text-xs font-mono uppercase tracking-widest
          px-4 py-2.5 pr-9 outline-none
          focus:border-yellow-400 transition-colors duration-150
          cursor-pointer
        "
      >
        {statusFiltros.map(({ value, label }) => (
          <option key={value} value={value}>
            {label} ({contadores[value]})
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-500"
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}