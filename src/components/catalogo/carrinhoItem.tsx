import type { ItemCarrinho, Produto } from '../../types/produtos.types'

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

interface CarrinhoItemProps {
  item: ItemCarrinho
  showPrice: boolean
  isVendedorLivre?: boolean
  onQtd: (produto: Produto, delta: number) => void
  onPreco?: (produto: Produto, valor: number) => void
  onPrecoRaw?: (produto: Produto, valor: number) => void
}

export function CarrinhoItem({
  item,
  showPrice,
  isVendedorLivre = false,
  onQtd,
  onPreco,
  onPrecoRaw,
}: CarrinhoItemProps) {
  const { produto, quantidade, precoUnitario } = item
  const precoPendente = isVendedorLivre && precoUnitario === 0

  return (
    <div className="px-4 py-4 border-b border-zinc-800">

      {/* Linha 1: foto + nome + subtotal */}
      <div className="flex gap-3">
        <img
          src={produto.foto}
          alt={produto.nome}
          className="w-14 h-14 object-cover shrink-0 rounded-sm"
        />

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          {/* Nome completo — quebra em múltiplas linhas */}
          <p className="text-white text-sm font-mono leading-snug">
            {produto.nome}
          </p>

          {/* Subtotal (tabelado) ou pendência (livre) */}
          {!isVendedorLivre && showPrice && (
            <p className="text-yellow-400 text-xs font-mono mt-1">
              {fmt(precoUnitario * quantidade)}
            </p>
          )}
          {isVendedorLivre && precoUnitario > 0 && (
            <p className="text-yellow-400 text-xs font-mono mt-1">
              {fmt(precoUnitario)} × {quantidade} = {fmt(precoUnitario * quantidade)}
            </p>
          )}
        </div>
      </div>

      {/* Linha 2: controle de quantidade */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest w-20 shrink-0">
          Quantidade
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQtd(produto, -1)}
            className="w-8 h-8 border border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400 transition-colors text-sm font-mono flex items-center justify-center"
          >
            −
          </button>
          <span className="w-8 text-center text-white text-sm font-mono">{quantidade}</span>
          <button
            onClick={() => onQtd(produto, 1)}
            className="w-8 h-8 border border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400 transition-colors text-sm font-mono flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* Linha 3 (tabelado): preço unitário readonly */}
      {showPrice && !isVendedorLivre && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest w-20 shrink-0">
            Unitário
          </span>
          <span className="text-zinc-400 text-xs font-mono">{fmt(precoUnitario)}</span>
        </div>
      )}

      {/* Linha 3 (livre): input de preço */}
      {isVendedorLivre && (
        <div className="flex items-center gap-2 mt-3">
          <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest w-20 shrink-0">
            Valor R$
          </span>
          <input
            type="number"
            min={0}
            step={0.01}
            value={precoUnitario === 0 ? '' : precoUnitario}
            placeholder="0,00"
            onChange={(e) => onPrecoRaw?.(produto, parseFloat(e.target.value) || 0)}
            onBlur={(e) => onPreco?.(produto, parseFloat(e.target.value) || 0)}
            className={`
              flex-1 bg-zinc-800 border text-sm font-mono px-3 py-2 outline-none transition-colors
              ${precoPendente
                ? 'border-red-800 text-white focus:border-red-500 placeholder-red-900'
                : 'border-zinc-700 text-yellow-400 focus:border-yellow-400 placeholder-zinc-600'}
            `}
          />
        </div>
      )}
    </div>
  )
}