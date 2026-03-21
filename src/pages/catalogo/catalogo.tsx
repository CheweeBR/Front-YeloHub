import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { getClientesByEmpresa } from '../../mock/clientes.mock'
import { createPedido } from '../../mock/pedidos.mock'
import type { ClienteCatalogo } from '../../types/produtos.types'
import { useCarrinho } from '../../hooks/useCarrinho'
import { useProdutos } from '../../hooks/useProdutos'
import { ProdutoCard } from '../../components/catalogo/produtoCard'
import { FiltrosBarra } from '../../components/catalogo/filtrosBarra'
import { SeletorCliente } from '../../components/catalogo/seletorCliente'
import { CarrinhoDrawer } from '../../components/catalogo/carrinhoDrawer'

export default function CatalogoPage() {
  const user = useAppSelector((state) => state.auth.user)
  if (!user) return null

  const navigate = useNavigate()

  const isVendedorLivre = user.role === 'vendedor' && user.vendedorTipo === 'livre'
  const isVendedor = user.role === 'vendedor' || user.role === 'admin'
  const showPrice = (user.role === 'admin' || user.role === 'vendedor') && !isVendedorLivre
  const editablePrice = user.role === 'admin'

  const clientes = getClientesByEmpresa(user.empresaId)
  const { produtosFiltrados, grupos, grupoAtivo, setGrupoAtivo, busca, setBusca } = useProdutos(user.empresaId)
  const {
    carrinho, itens, total, quantidade,
    handleQtd, setQtdDireta, handlePreco, handlePrecoLivre, setPrecoRaw, limpar,
  } = useCarrinho(isVendedorLivre ? { precoInicial: () => 0 } : {})

  const [clienteSelecionado, setClienteSelecionado] = useState<ClienteCatalogo | null>(null)
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [pedidoCriado, setPedidoCriado] = useState<{ num: string; id: number } | null>(null)

  const onPrecoBlur = isVendedorLivre ? handlePrecoLivre : handlePreco

  const handleEnviarPedido = () => {
    const clienteId       = isVendedor ? (clienteSelecionado?.id ?? 0)       : user.id
    const clienteNome     = isVendedor ? (clienteSelecionado?.name ?? '')     : user.name
    const clienteDocument = isVendedor ? (clienteSelecionado?.document ?? '') : user.document

    const pedido = createPedido({
      empresaId: user.empresaId,
      clienteId,
      clienteNome,
      clienteDocument,
      vendedorId:       isVendedor ? user.id       : undefined,
      vendedorNome:     isVendedor ? user.name     : undefined,
      vendedorDocument: isVendedor ? user.document : undefined,
      itens,
      total,
    })

    limpar()
    setCarrinhoAberto(false)
    setClienteSelecionado(null)
    setPedidoCriado({ num: pedido.pedidoNum!, id: pedido.id! })
    setTimeout(() => setPedidoCriado(null), 5000)
  }

  return (
    <div className="min-h-screen bg-zinc-950">

      {pedidoCriado && (
        <div className="fixed top-4 right-4 z-50 bg-zinc-900 border border-yellow-400/40 px-5 py-4 shadow-xl flex items-start gap-3 max-w-xs">
          <svg className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-mono">Pedido enviado!</p>
            <p className="text-zinc-400 text-[10px] font-mono mt-0.5">{pedidoCriado.num}</p>
            <button
              onClick={() => { setPedidoCriado(null); navigate(`/pedidos/${pedidoCriado.id}`) }}
              className="text-yellow-400 text-[10px] font-mono uppercase tracking-widest hover:text-yellow-300 transition-colors mt-1.5 flex items-center gap-1"
            >
              Ver pedido
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <button onClick={() => setPedidoCriado(null)} className="text-zinc-600 hover:text-white transition-colors shrink-0">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="border-b border-zinc-800 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-white text-4xl uppercase"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}>
              Catálogo
            </h1>
            <p className="text-zinc-500 text-sm font-mono mt-1">{produtosFiltrados.length} produtos disponíveis</p>
          </div>
          {isVendedor && (
            <SeletorCliente clientes={clientes} clienteSelecionado={clienteSelecionado} onChange={setClienteSelecionado} />
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <FiltrosBarra grupos={grupos} grupoAtivo={grupoAtivo} busca={busca} onGrupo={setGrupoAtivo} onBusca={setBusca} />

        {produtosFiltrados.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-600 font-mono text-base">Nenhum produto encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {produtosFiltrados.map((p) => {
              const item = carrinho[p.id]
              return (
                <ProdutoCard
                  key={p.id}
                  produto={p}
                  quantidade={item?.quantidade ?? 0}
                  precoUnitario={item?.precoUnitario ?? p.preco}
                  showPrice={showPrice}
                  editablePrice={editablePrice}
                  onQtd={(delta) => handleQtd(p, delta)}
                  onQtdDireta={(qtd) => setQtdDireta(p, qtd)}
                  onPreco={(v) => handlePreco(p, v)}
                />
              )
            })}
          </div>
        )}
      </div>

      {quantidade > 0 && (
        <button
          onClick={() => setCarrinhoAberto(true)}
          className="fixed bottom-6 right-6 bg-yellow-400 text-zinc-950 font-mono text-sm uppercase tracking-widest px-6 py-3.5 flex items-center gap-3 shadow-xl hover:bg-yellow-300 transition-colors z-30"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {quantidade} {quantidade === 1 ? 'item' : 'itens'}
          {showPrice && (
            <span className="border-l border-zinc-950/30 pl-3">
              {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          )}
        </button>
      )}

      <CarrinhoDrawer
        aberto={carrinhoAberto}
        onFechar={() => setCarrinhoAberto(false)}
        itens={itens}
        total={total}
        showPrice={showPrice}
        isVendedor={isVendedor}
        isVendedorLivre={isVendedorLivre}
        clienteSelecionado={clienteSelecionado}
        onQtd={handleQtd}
        onPreco={onPrecoBlur}
        onPrecoRaw={setPrecoRaw}
        onEnviar={handleEnviarPedido}
      />
    </div>
  )
}