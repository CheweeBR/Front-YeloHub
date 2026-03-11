import type { Produto } from '../../types/produtos.types'

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

interface ProdutoCardProps {
  produto: Produto
  quantidade: number
  precoUnitario: number
  showPrice: boolean
  editablePrice: boolean
  onQtd: (delta: number) => void
  onQtdDireta: (qtd: number) => void
  onPreco: (v: number) => void
}

export function ProdutoCard({
  produto,
  quantidade,
  precoUnitario,
  showPrice,
  onQtd,
  onQtdDireta,
}: ProdutoCardProps) {

  const handleQtdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value) || 0
    onQtdDireta(Math.max(0, v))
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 flex flex-col overflow-hidden group transition-colors hover:border-zinc-700">
      {/* Foto */}
      <div className="relative h-52 overflow-hidden bg-zinc-800">
        <img
          src={produto.foto}
          alt={produto.nome}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {quantidade > 0 && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-zinc-950 text-sm font-mono px-2.5 py-0.5">
            {quantidade} un
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <p className="text-white text-base font-mono leading-snug">{produto.nome}</p>
          <p className="text-zinc-500 text-sm font-mono mt-1.5 leading-relaxed line-clamp-2">
            {produto.descricao}
          </p>
        </div>

        {/* Preço */}
        {showPrice && (
          <div>

              <p className="text-yellow-400 text-base font-mono">{fmt(precoUnitario)}</p>

          </div>
        )}

        {/* Quantidade com input editável */}
        <div className="flex items-center gap-2 mt-auto">
          <button
            onClick={() => onQtd(-1)}
            disabled={quantidade === 0}
            className="w-10 h-10 border border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-mono text-base flex items-center justify-center shrink-0"
          >
            −
          </button>

          <input
            type="number"
            min={0}
            value={quantidade === 0 ? '' : quantidade}
            placeholder="0"
            onChange={handleQtdInput}
            className="w-full text-center bg-zinc-800 border border-zinc-700 text-white text-base font-mono py-1.5 outline-none focus:border-yellow-400 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />

          <button
            onClick={() => onQtd(1)}
            className="w-10 h-10 border border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400 transition-colors font-mono text-base flex items-center justify-center shrink-0"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}