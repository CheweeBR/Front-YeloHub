import type { ItemCarrinho, Produto } from '../../types/produtos.types'

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

interface CarrinhoItemProps {
  item: ItemCarrinho
  showPrice: boolean
  isVendedorLivre?: boolean
  onQtd: (produto: Produto, delta: number) => void
  onPreco?: (produto: Produto, valor: number) => void       // onBlur — valida mínimo
  onPrecoRaw?: (produto: Produto, valor: number) => void   // onChange — livre para digitar
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
    <div className="flex flex-col gap-3 px-6 py-4 border-b border-zinc-800">
      <div className="flex items-center gap-4">
        <img src={produto.foto} alt={produto.nome} className="w-16 h-16 object-cover shrink-0" />

        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-mono leading-snug truncate">{produto.nome}</p>
          {showPrice && !isVendedorLivre && (
            <p className="text-zinc-500 text-xs font-mono mt-0.5">
              {fmt(precoUnitario)} × {quantidade}
            </p>
          )}
          {isVendedorLivre && (
            <p className={`text-xs font-mono mt-0.5 ${precoPendente ? 'text-red-400' : 'text-zinc-500'}`}>
              {precoPendente ? 'Informe o valor unitário' : `${quantidade} un`}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onQtd(produto, -1)}
            className="w-8 h-8 border border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400 transition-colors text-sm font-mono flex items-center justify-center"
          >
            −
          </button>
          <span className="w-6 text-center text-white text-sm font-mono">{quantidade}</span>
          <button
            onClick={() => onQtd(produto, 1)}
            className="w-8 h-8 border border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400 transition-colors text-sm font-mono flex items-center justify-center"
          >
            +
          </button>
        </div>

        {showPrice && !isVendedorLivre && (
          <p className="text-yellow-400 text-sm font-mono w-20 text-right shrink-0">
            {fmt(precoUnitario * quantidade)}
          </p>
        )}
      </div>

      {/* Input de preço — só para vendedor livre */}
      {isVendedorLivre && (
        <div className="flex items-center gap-2 pl-20">
          <span className="text-zinc-600 text-xs font-mono shrink-0">Valor unitário R$</span>
          <input
            type="number"
            min={0}
            step={0.01}
            value={precoUnitario === 0 ? '' : precoUnitario}
            placeholder="0,00"
            onChange={(e) => onPrecoRaw?.(produto, parseFloat(e.target.value) || 0)}
            onBlur={(e) => onPreco?.(produto, parseFloat(e.target.value) || 0)}
            className={`
              flex-1 bg-zinc-800 border text-sm font-mono px-2.5 py-1.5 outline-none transition-colors
              ${precoPendente
                ? 'border-red-800 text-white focus:border-red-500 placeholder-red-900'
                : 'border-zinc-700 text-yellow-400 focus:border-yellow-400 placeholder-zinc-700'}
            `}
          />
        </div>
      )}
    </div>
  )
}