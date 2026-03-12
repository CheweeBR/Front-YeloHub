interface PedidosPaginacaoProps {
  numeroPagina: number
  totalPaginas: number
  total: number
  temAnterior: boolean
  temProxima: boolean
  onAnterior: () => void
  onProxima: () => void
}

export function PedidosPaginacao({
  numeroPagina,
  totalPaginas,
  total,
  temAnterior,
  temProxima,
  onAnterior,
  onProxima,
}: PedidosPaginacaoProps) {
  return (
    <div className="flex items-center justify-between mt-4">
      <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
        {total} {total === 1 ? 'pedido' : 'pedidos'} · página {numeroPagina} de {totalPaginas}
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={onAnterior}
          disabled={!temAnterior}
          className="
            flex items-center gap-1.5 px-3 py-2 border border-zinc-800 text-zinc-500
            text-[10px] font-mono uppercase tracking-widest
            hover:border-zinc-600 hover:text-white
            disabled:opacity-30 disabled:cursor-not-allowed
            transition-colors duration-150
          "
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Anterior
        </button>

        <span className="px-3 py-2 bg-zinc-800 text-zinc-400 text-[10px] font-mono">
          {numeroPagina}
        </span>

        <button
          onClick={onProxima}
          disabled={!temProxima}
          className="
            flex items-center gap-1.5 px-3 py-2 border border-zinc-800 text-zinc-500
            text-[10px] font-mono uppercase tracking-widest
            hover:border-zinc-600 hover:text-white
            disabled:opacity-30 disabled:cursor-not-allowed
            transition-colors duration-150
          "
        >
          Próxima
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}