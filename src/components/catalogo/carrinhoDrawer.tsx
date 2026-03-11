import type { ItemCarrinho, ClienteCatalogo, Produto } from '../../types/produtos.types'
import { CarrinhoItem } from './carrinhoItem'

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

interface CarrinhoDrawerProps {
  aberto: boolean
  onFechar: () => void
  itens: ItemCarrinho[]
  total: number
  showPrice: boolean
  isVendedor: boolean
  isVendedorLivre: boolean
  clienteSelecionado: ClienteCatalogo | null
  onQtd: (produto: Produto, delta: number) => void
  onPreco: (produto: Produto, valor: number) => void
  onEnviar: () => void
}

export function CarrinhoDrawer({
  aberto,
  onFechar,
  itens,
  total,
  showPrice,
  isVendedor,
  isVendedorLivre,
  clienteSelecionado,
  onQtd,
  onPreco,
  onEnviar,
}: CarrinhoDrawerProps) {
  // Vendedor livre: todos os itens precisam ter preço > 0
  const todosPrecosDefinidos = isVendedorLivre
    ? itens.every((i) => i.precoUnitario > 0)
    : true

  const podeFinalizar =
    itens.length > 0 &&
    todosPrecosDefinidos &&
    (isVendedor ? !!clienteSelecionado : true)

  const motivoBloqueio = () => {
    if (itens.length === 0) return null
    if (isVendedor && !clienteSelecionado) return 'Selecione um cliente'
    if (!todosPrecosDefinidos) return 'Informe o valor de todos os itens'
    return null
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onFechar}
        className={`
          fixed inset-0 bg-black/60 z-40
          transition-opacity duration-300
          ${aberto ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      />

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900 border-l border-zinc-800 z-50
          flex flex-col transition-transform duration-300 ease-in-out
          ${aberto ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-14 border-b border-zinc-800 shrink-0">
          <span
            className="text-white text-xl uppercase"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.1em' }}
          >
            Carrinho
          </span>
          <button onClick={onFechar} className="text-zinc-500 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cliente selecionado */}
        {isVendedor && (
          <div className={`px-6 py-3 border-b border-zinc-800 shrink-0 ${!clienteSelecionado ? 'bg-red-950/30 border-red-900/40' : 'bg-zinc-800/30'}`}>
            {clienteSelecionado ? (
              <div>
                <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">Cliente</p>
                <p className="text-white text-xs font-mono mt-0.5">{clienteSelecionado.name}</p>
                <p className="text-zinc-600 text-[10px] font-mono">{clienteSelecionado.document}</p>
              </div>
            ) : (
              <p className="text-red-400 text-xs font-mono">⚠ Nenhum cliente selecionado</p>
            )}
          </div>
        )}

        {/* Aviso vendedor livre */}
        {isVendedorLivre && itens.length > 0 && !todosPrecosDefinidos && (
          <div className="px-6 py-2.5 bg-yellow-400/10 border-b border-yellow-400/20 shrink-0">
            <p className="text-yellow-400 text-xs font-mono">
              ⚠ Defina o valor unitário de todos os itens para finalizar
            </p>
          </div>
        )}

        {/* Itens */}
        <div className="flex-1 overflow-y-auto">
          {itens.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-zinc-600 font-mono text-sm">Carrinho vazio</p>
            </div>
          ) : (
            <div>
              {itens.map((item) => (
                <CarrinhoItem
                  key={item.produto.id}
                  item={item}
                  showPrice={showPrice}
                  isVendedorLivre={isVendedorLivre}
                  onQtd={onQtd}
                  onPreco={onPreco}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {itens.length > 0 && (
          <div className="shrink-0 border-t border-zinc-800 px-6 py-5 space-y-4">
            {showPrice && !isVendedorLivre && (
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Total</span>
                <span className="text-white text-lg font-mono">{fmt(total)}</span>
              </div>
            )}

            <button
              onClick={onEnviar}
              disabled={!podeFinalizar}
              className="w-full bg-yellow-400 text-zinc-950 font-mono text-sm uppercase tracking-widest py-3 hover:bg-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {motivoBloqueio() ?? 'Enviar pedido'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}