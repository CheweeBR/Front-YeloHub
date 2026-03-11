import type { ClienteCatalogo } from '../../types/produtos.types'
import { useEffect, useMemo, useRef, useState } from 'react'


interface SeletorClienteProps {
  clientes: ClienteCatalogo[]
  clienteSelecionado: ClienteCatalogo | null
  onChange: (cliente: ClienteCatalogo | null) => void
}

export function SeletorCliente({ clientes, clienteSelecionado, onChange }: SeletorClienteProps) {
  const [busca, setBusca] = useState('')
  const [aberto, setAberto] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Fecha ao clicar fora
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setAberto(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const resultados = useMemo(() => {
    const termo = busca.toLowerCase().replace(/\D/g, '') || busca.toLowerCase()
    if (!busca.trim()) return clientes
    return clientes.filter((c) =>
      c.name.toLowerCase().includes(busca.toLowerCase()) ||
      c.document.replace(/\D/g, '').includes(termo)
    )
  }, [busca, clientes])

  const handleSelecionar = (c: ClienteCatalogo) => {
    onChange(c)
    setBusca('')
    setAberto(false)
  }

  const handleLimpar = () => {
    onChange(null)
    setBusca('')
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-1 relative">
      <label className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
        Atendendo cliente
      </label>

      {/* Campo de busca / cliente selecionado */}
      {clienteSelecionado ? (
        // Estado: cliente selecionado
        <div className="flex items-center gap-3 bg-zinc-900 border border-yellow-400/40 px-3 py-2 min-w-72">
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-mono truncate">{clienteSelecionado.name}</p>
            <p className="text-zinc-500 text-[10px] font-mono">{clienteSelecionado.document}</p>
          </div>
          <button
            onClick={handleLimpar}
            className="text-zinc-600 hover:text-red-400 transition-colors shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        // Estado: buscando
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 pointer-events-none"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={busca}
            onChange={(e) => { setBusca(e.target.value); setAberto(true) }}
            onFocus={() => setAberto(true)}
            placeholder="Buscar por nome ou CNPJ..."
            className="w-full min-w-72 bg-zinc-900 border border-zinc-700 text-white text-xs font-mono pl-9 pr-4 py-2 outline-none focus:border-yellow-400 transition-colors placeholder-zinc-600"
          />
        </div>
      )}

      {/* Dropdown de resultados */}
      {aberto && !clienteSelecionado && (
        <div className="absolute top-full mt-1 left-0 right-0 bg-zinc-900 border border-zinc-700 z-20 max-h-56 overflow-y-auto">
          {resultados.length === 0 ? (
            <p className="text-zinc-600 text-xs font-mono px-4 py-3">Nenhum cliente encontrado.</p>
          ) : (
            resultados.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelecionar(c)}
                className="w-full text-left px-4 py-3 border-b border-zinc-800 last:border-0 hover:bg-zinc-800 transition-colors"
              >
                <p className="text-white text-xs font-mono">{c.name}</p>
                <p className="text-zinc-500 text-[10px] font-mono mt-0.5">{c.document}</p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}