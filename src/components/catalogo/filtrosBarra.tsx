interface FiltrosBarraProps {
  grupos: string[]
  grupoAtivo: string
  busca: string
  onGrupo: (g: string) => void
  onBusca: (v: string) => void
}

export function FiltrosBarra({ grupos, grupoAtivo, busca, onGrupo, onBusca }: FiltrosBarraProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* Busca */}
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={busca}
          onChange={(e) => onBusca(e.target.value)}
          placeholder="Buscar produto..."
          className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm font-mono pl-10 pr-4 py-3 outline-none focus:border-yellow-400 transition-colors placeholder-zinc-700"
        />
      </div>

      {/* Grupos */}
      <div className="flex gap-1.5 flex-wrap">
        {['Todos', ...grupos].map((g) => (
          <button
            key={g}
            onClick={() => onGrupo(g)}
            className={`
              px-4 py-2.5 text-sm font-mono uppercase tracking-widest transition-colors
              ${grupoAtivo === g
                ? 'bg-yellow-400 text-zinc-950'
                : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600'}
            `}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}