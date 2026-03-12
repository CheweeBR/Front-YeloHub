import type { DashboardCard } from './dashboardCards.data'

interface DashboardCardProps {
  card: DashboardCard
  onClick: () => void
}

export function DashboardCard({ card, onClick }: DashboardCardProps) {
  return (
    <button
      onClick={onClick}
      className="
        group relative bg-zinc-900 border border-zinc-800
        hover:border-yellow-400/50 hover:bg-zinc-800/60
        transition-all duration-300 text-left
        flex flex-col overflow-hidden w-full
      "
    >
      {/* Linha de acento top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      {/* SVG illustration */}
      <div className="relative h-36 p-4 overflow-hidden">
        <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300" />
        {card.svg}
      </div>

      {/* Separador */}
      <div className="mx-5 h-px bg-zinc-800 group-hover:bg-zinc-700 transition-colors duration-300" />

      {/* Info */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <span
            className="text-white text-2xl uppercase leading-none group-hover:text-yellow-400 transition-colors duration-300"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.08em' }}
          >
            {card.label}
          </span>
          <span className="text-yellow-400 text-xl font-mono leading-none mt-0.5 shrink-0">
            {card.value}
          </span>
        </div>

        <p className="text-zinc-500 text-xs font-mono leading-relaxed">
          {card.description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-1.5 mt-2 text-zinc-600 group-hover:text-yellow-400 transition-colors duration-300">
          <span className="text-[10px] font-mono uppercase tracking-widest">Acessar</span>
          <svg
            className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  )
}