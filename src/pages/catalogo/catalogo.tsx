import { useState, useMemo } from 'react'
import { useAuth } from '../../context/authContext'
import { getProdutosByEmpresa } from '../../mock/produtos.mock'
import { getClientesByEmpresa } from '../../mock/clientes.mock'
import type { Produto, ItemCarrinho, ClienteCatalogo } from '../../types/produtos.types'

// ─── helpers ────────────────────────────────────────────────────────────────

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const canSeePrice = (role: string) => role === 'admin' || role === 'vendedor'
const canEditPrice = (user: { role: string; vendedorTipo?: string }) =>
  user.role === 'admin' || user.vendedorTipo === 'livre'

// ─── sub-components ──────────────────────────────────────────────────────────

function ProdutoCard({
  produto,
  quantidade,
  precoUnitario,
  showPrice,
  editablePrice,
  onQtd,
  onPreco,
}: {
  produto: Produto
  quantidade: number
  precoUnitario: number
  showPrice: boolean
  editablePrice: boolean
  onQtd: (delta: number) => void
  onPreco: (v: number) => void
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 flex flex-col overflow-hidden group transition-colors hover:border-zinc-700">
      {/* Foto */}
      <div className="relative h-44 overflow-hidden bg-zinc-800">
        <img
          src={produto.foto}
          alt={produto.nome}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {quantidade > 0 && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-zinc-950 text-xs font-mono px-2 py-0.5">
            {quantidade} un
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <p className="text-white text-sm font-mono leading-snug">{produto.nome}</p>
          <p className="text-zinc-500 text-xs font-mono mt-1 leading-relaxed line-clamp-2">
            {produto.descricao}
          </p>
        </div>

        {/* Preço */}
        {showPrice && (
          <div>
            {editablePrice ? (
              <div className="flex items-center gap-2">
                <span className="text-zinc-600 text-xs font-mono">R$</span>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={precoUnitario}
                  onChange={(e) => onPreco(parseFloat(e.target.value) || 0)}
                  className="w-full bg-zinc-800 border border-zinc-700 text-yellow-400 text-sm font-mono px-2 py-1 outline-none focus:border-yellow-400 transition-colors"
                />
              </div>
            ) : (
              <p className="text-yellow-400 text-sm font-mono">{fmt(precoUnitario)}</p>
            )}
          </div>
        )}

        {/* Quantidade */}
        <div className="flex items-center gap-2 mt-auto">
          <button
            onClick={() => onQtd(-1)}
            disabled={quantidade === 0}
            className="w-8 h-8 border border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-mono text-sm flex items-center justify-center"
          >
            −
          </button>
          <span className="w-10 text-center text-white text-sm font-mono">{quantidade}</span>
          <button
            onClick={() => onQtd(1)}
            className="w-8 h-8 border border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400 transition-colors font-mono text-sm flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── main page ───────────────────────────────────────────────────────────────

export default function CatalogoPage() {
  const { user } = useAuth()
  if (!user) return null

  const produtos = getProdutosByEmpresa(user.empresaId)
  const clientes = getClientesByEmpresa(user.empresaId)
  const grupos = useMemo(() => [...new Set(produtos.map((p) => p.grupo))], [produtos])

  // state
  const [grupoAtivo, setGrupoAtivo] = useState<string>('Todos')
  const [busca, setBusca] = useState('')
  const [carrinho, setCarrinho] = useState<Record<number, ItemCarrinho>>({})
  const [clienteSelecionado, setClienteSelecionado] = useState<ClienteCatalogo | null>(null)
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [pedidoEnviado, setPedidoEnviado] = useState(false)

  const showPrice = canSeePrice(user.role)
  const editPrice = canEditPrice(user)
  const isVendedor = user.role === 'vendedor' || user.role === 'admin'

  // filtros
  const produtosFiltrados = useMemo(() =>
    produtos.filter((p) => {
      const grupoOk = grupoAtivo === 'Todos' || p.grupo === grupoAtivo
      const buscaOk = p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        p.grupo.toLowerCase().includes(busca.toLowerCase())
      return grupoOk && buscaOk
    }),
    [produtos, grupoAtivo, busca]
  )

  const itensCarrinho = Object.values(carrinho).filter((i) => i.quantidade > 0)
  const totalCarrinho = itensCarrinho.reduce((s, i) => s + i.quantidade * i.precoUnitario, 0)
  const qtdCarrinho = itensCarrinho.reduce((s, i) => s + i.quantidade, 0)

  // handlers
  const handleQtd = (produto: Produto, delta: number) => {
    setCarrinho((prev) => {
      const atual = prev[produto.id] ?? { produto, quantidade: 0, precoUnitario: produto.preco }
      const novaQtd = Math.max(0, atual.quantidade + delta)
      if (novaQtd === 0) {
        const { [produto.id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [produto.id]: { ...atual, quantidade: novaQtd } }
    })
  }

  const handlePreco = (produto: Produto, valor: number) => {
    setCarrinho((prev) => {
      const atual = prev[produto.id]
      if (!atual) return prev
      return { ...prev, [produto.id]: { ...atual, precoUnitario: valor } }
    })
  }

  const handleEnviarPedido = () => {
    // TODO: chamar API real
    console.log('Pedido enviado:', {
      clienteId: isVendedor ? clienteSelecionado?.id : user.id,
      vendedorId: isVendedor ? user.id : undefined,
      empresaId: user.empresaId,
      itens: itensCarrinho,
      total: totalCarrinho,
    })
    setPedidoEnviado(true)
    setCarrinho({})
    setCarrinhoAberto(false)
    setTimeout(() => setPedidoEnviado(false), 3000)
  }

  const podeFinalizar = isVendedor ? !!clienteSelecionado && itensCarrinho.length > 0 : itensCarrinho.length > 0

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* Toast pedido enviado */}
      {pedidoEnviado && (
        <div className="fixed top-4 right-4 z-50 bg-yellow-400 text-zinc-950 px-5 py-3 font-mono text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Pedido enviado com sucesso!
        </div>
      )}

      {/* Header da página */}
      <div className="border-b border-zinc-800 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1
              className="text-white text-3xl uppercase"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}
            >
              Catálogo
            </h1>
            <p className="text-zinc-500 text-xs font-mono mt-0.5">
              {produtos.length} produtos disponíveis
            </p>
          </div>

          {/* Seletor de cliente — só para vendedor/admin */}
          {isVendedor && (
            <div className="flex flex-col gap-1">
              <label className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
                Atendendo cliente
              </label>
              <select
                value={clienteSelecionado?.id ?? ''}
                onChange={(e) => {
                  const c = clientes.find((cl) => cl.id === Number(e.target.value)) ?? null
                  setClienteSelecionado(c)
                }}
                className="bg-zinc-900 border border-zinc-700 text-white text-xs font-mono px-3 py-2 outline-none focus:border-yellow-400 transition-colors min-w-52"
              >
                <option value="">— Selecionar cliente —</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} · {c.document}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">

        {/* Busca + grupos */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar produto..."
              className="w-full bg-zinc-900 border border-zinc-800 text-white text-xs font-mono pl-9 pr-4 py-2.5 outline-none focus:border-yellow-400 transition-colors placeholder-zinc-700"
            />
          </div>

          <div className="flex gap-1 flex-wrap">
            {['Todos', ...grupos].map((g) => (
              <button
                key={g}
                onClick={() => setGrupoAtivo(g)}
                className={`
                  px-3 py-2 text-xs font-mono uppercase tracking-widest transition-colors
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

        {/* Grid de produtos */}
        {produtosFiltrados.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-600 font-mono text-sm">Nenhum produto encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {produtosFiltrados.map((p) => {
              const item = carrinho[p.id]
              return (
                <ProdutoCard
                  key={p.id}
                  produto={p}
                  quantidade={item?.quantidade ?? 0}
                  precoUnitario={item?.precoUnitario ?? p.preco}
                  showPrice={showPrice}
                  editablePrice={editPrice}
                  onQtd={(delta) => handleQtd(p, delta)}
                  onPreco={(v) => handlePreco(p, v)}
                />
              )
            })}
          </div>
        )}
      </div>

      {/* Botão flutuante do carrinho */}
      {qtdCarrinho > 0 && (
        <button
          onClick={() => setCarrinhoAberto(true)}
          className="fixed bottom-6 right-6 bg-yellow-400 text-zinc-950 font-mono text-xs uppercase tracking-widest px-5 py-3 flex items-center gap-3 shadow-xl hover:bg-yellow-300 transition-colors z-30"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {qtdCarrinho} {qtdCarrinho === 1 ? 'item' : 'itens'}
          {showPrice && <span className="border-l border-zinc-950/30 pl-3">{fmt(totalCarrinho)}</span>}
        </button>
      )}

      {/* Overlay carrinho */}
      <div
        onClick={() => setCarrinhoAberto(false)}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${carrinhoAberto ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer carrinho */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900 border-l border-zinc-800 z-50 flex flex-col transition-transform duration-300 ease-in-out ${carrinhoAberto ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header carrinho */}
        <div className="flex items-center justify-between px-6 h-14 border-b border-zinc-800 shrink-0">
          <span
            className="text-white text-xl uppercase"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.1em' }}
          >
            Carrinho
          </span>
          <button onClick={() => setCarrinhoAberto(false)} className="text-zinc-500 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cliente selecionado (vendedor) */}
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

        {/* Itens */}
        <div className="flex-1 overflow-y-auto">
          {itensCarrinho.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-zinc-600 font-mono text-sm">Carrinho vazio</p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800">
              {itensCarrinho.map(({ produto, quantidade, precoUnitario }) => (
                <div key={produto.id} className="flex items-center gap-4 px-6 py-4">
                  <img src={produto.foto} alt={produto.nome} className="w-12 h-12 object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-mono leading-snug truncate">{produto.nome}</p>
                    {showPrice && (
                      <p className="text-zinc-500 text-[10px] font-mono mt-0.5">
                        {fmt(precoUnitario)} × {quantidade}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => handleQtd(produto, -1)} className="w-6 h-6 border border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400 transition-colors text-xs font-mono flex items-center justify-center">−</button>
                    <span className="w-6 text-center text-white text-xs font-mono">{quantidade}</span>
                    <button onClick={() => handleQtd(produto, 1)} className="w-6 h-6 border border-zinc-700 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400 transition-colors text-xs font-mono flex items-center justify-center">+</button>
                  </div>
                  {showPrice && (
                    <p className="text-yellow-400 text-xs font-mono w-20 text-right shrink-0">
                      {fmt(precoUnitario * quantidade)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer carrinho */}
        {itensCarrinho.length > 0 && (
          <div className="shrink-0 border-t border-zinc-800 px-6 py-5 space-y-4">
            {showPrice && (
              <div className="flex justify-between items-center">
                <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Total</span>
                <span className="text-white text-lg font-mono">{fmt(totalCarrinho)}</span>
              </div>
            )}
            <button
              onClick={handleEnviarPedido}
              disabled={!podeFinalizar}
              className="w-full bg-yellow-400 text-zinc-950 font-mono text-sm uppercase tracking-widest py-3 hover:bg-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {isVendedor && !clienteSelecionado ? 'Selecione um cliente' : 'Enviar pedido'}
            </button>
          </div>
        )}
      </div>

    </div>
  )
}