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
        flex flex-row sm:flex-col overflow-hidden w-full
      "
    >
      {/* Linha de acento */}
      <div className="absolute top-0 left-0 right-0 h-px bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      {/* SVG illustration — menor e à esquerda no mobile, topo no desktop */}
      <div className="
        relative shrink-0 overflow-hidden bg-zinc-800/30
        w-24 h-auto sm:w-full sm:h-36
      ">
        <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300" />
        <div className="w-full h-full p-3 sm:p-4 flex items-center justify-center">
          {card.svg}
        </div>
      </div>

      {/* Separador — vertical no mobile, horizontal no desktop */}
      <div className="
        shrink-0
        w-px self-stretch bg-zinc-800 group-hover:bg-zinc-700 sm:hidden
        transition-colors duration-300
      " />
      <div className="
        hidden sm:block h-px bg-zinc-800 group-hover:bg-zinc-700
        transition-colors duration-300
      " />

      {/* Info */}
      <div className="p-4 sm:p-5 flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-0 justify-center sm:justify-start">
        <div className="flex flex-col gap-0.5">
          <span
            className="text-white uppercase leading-none group-hover:text-yellow-400 transition-colors duration-300"
            style={{
              fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
              letterSpacing: '0.08em',
              fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
            }}
          >
            {card.label}
          </span>
          <span className="text-yellow-400 text-sm sm:text-xl font-mono leading-none">
            {card.value}
          </span>
        </div>

        <p className="text-zinc-500 text-xs font-mono leading-relaxed line-clamp-2">
          {card.description}
        </p>

        {/* CTA — esconde no mobile pra economizar espaço */}
        <div className="hidden sm:flex items-center gap-1.5 mt-1 text-zinc-600 group-hover:text-yellow-400 transition-colors duration-300">
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