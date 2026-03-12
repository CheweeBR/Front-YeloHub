import { useState } from 'react'
import { useAuth } from '../../context/authContext'
import { getClientesByEmpresa } from '../../mock/clientes.mock'
import type { ClienteCatalogo } from '../../types/produtos.types'
import { useCarrinho } from '../../hooks/useCarrinho'
import { useProdutos } from '../../hooks/useProdutos'
import { ProdutoCard } from '../../components/catalogo/produtoCard'
import { FiltrosBarra } from '../../components/catalogo/filtrosBarra'
import { SeletorCliente } from '../../components/catalogo/seletorCliente'
import { CarrinhoDrawer } from '../../components/catalogo/carrinhoDrawer'

export default function CatalogoPage() {
  const { user } = useAuth()
  if (!user) return null

  const isVendedorLivre = user.role === 'vendedor' && user.vendedorTipo === 'livre'
  const isVendedor = user.role === 'vendedor' || user.role === 'admin'

  // Vendedor livre não vê preço no card — só define no carrinho
  const showPrice = (user.role === 'admin' || user.role === 'vendedor') && !isVendedorLivre
  // Edição de preço no card só para admin (vendedor livre edita no carrinho)
  const editablePrice = user.role === 'admin'

  const clientes = getClientesByEmpresa(user.empresaId)
  const { produtosFiltrados, grupos, grupoAtivo, setGrupoAtivo, busca, setBusca } = useProdutos(user.empresaId)
  const {
    carrinho,
    itens,
    total,
    quantidade,
    handleQtd,
    setQtdDireta,
    handlePreco,
    handlePrecoLivre,
    setPrecoRaw,
    limpar,
  } = useCarrinho(
    isVendedorLivre ? { precoInicial: () => 0 } : {}
  )

  const [clienteSelecionado, setClienteSelecionado] = useState<ClienteCatalogo | null>(null)
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [pedidoEnviado, setPedidoEnviado] = useState(false)

  // Para vendedor livre: onBlur usa handlePrecoLivre (sem piso de tabela)
  // Para demais: onBlur usa handlePreco (impõe piso = preço tabelado)
  const onPrecoBlur = isVendedorLivre ? handlePrecoLivre : handlePreco

  const handleEnviarPedido = () => {
    // TODO: trocar por chamada real à API
    console.log('Pedido:', {
      clienteId: isVendedor ? clienteSelecionado?.id : user.id,
      vendedorId: isVendedor ? user.id : undefined,
      empresaId: user.empresaId,
      itens,
      total,
      itensAbaixoDaTabela: itens
        .filter((i) => i.precoUnitario < i.produto.preco)
        .map((i) => ({
          produtoId: i.produto.id,
          nome: i.produto.nome,
          precoTabelado: i.produto.preco,
          precoPraticado: i.precoUnitario,
        })),
    })
    limpar()
    setCarrinhoAberto(false)
    setPedidoEnviado(true)
    setTimeout(() => setPedidoEnviado(false), 3000)
  }

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* Toast */}
      {pedidoEnviado && (
        <div className="fixed top-4 right-4 z-50 bg-yellow-400 text-zinc-950 px-5 py-3 font-mono text-sm uppercase tracking-widest flex items-center gap-2 shadow-lg">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Pedido enviado com sucesso!
        </div>
      )}

      {/* Header da página */}
      <div className="border-b border-zinc-800 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1
              className="text-white text-4xl uppercase"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}
            >
              Catálogo
            </h1>
            <p className="text-zinc-500 text-sm font-mono mt-1">
              {produtosFiltrados.length} produtos disponíveis
            </p>
          </div>

          {isVendedor && (
            <SeletorCliente
              clientes={clientes}
              clienteSelecionado={clienteSelecionado}
              onChange={setClienteSelecionado}
            />
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <FiltrosBarra
          grupos={grupos}
          grupoAtivo={grupoAtivo}
          busca={busca}
          onGrupo={setGrupoAtivo}
          onBusca={setBusca}
        />

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

      {/* Botão flutuante do carrinho */}
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
          {/* Vendedor livre não vê total no botão até todos os preços estarem definidos */}
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