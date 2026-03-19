import type { DashboardCard } from './dashboardCards.data'

interface DashboardHeaderProps {
  cards: DashboardCard[]
}

export function DashboardHeader({ cards }: DashboardHeaderProps) {
  return (
    <div className="border-b border-zinc-800 px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Título + badge */}
        <div className="flex items-end gap-4">
          <div>
            <p className="text-yellow-400 text-xs font-mono uppercase tracking-[0.3em] mb-1">
              Painel administrativo
            </p>
            <h1
              className="text-white text-4xl uppercase leading-none"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}
            >
              Dashboard
            </h1>
          </div>
        </div>

        {/* Totalizadores rápidos */}
        <div className="flex flex-wrap gap-6 mt-6">
          {cards.map((c) => (
            <div key={c.key} className="flex items-center gap-2">
              <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">{c.label}</span>
              <span className="text-yellow-400 text-sm font-mono">{c.value}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}