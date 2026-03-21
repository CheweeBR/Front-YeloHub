import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { useAppSelector } from '../../store/hooks'
import { getPedidoById, updatePedidoStatus } from '../../mock/pedidos.mock'
import { PedidoDetalhe } from '../../components/pedidos/pedidoDetalhe'
import { PedidoPDF } from '../../components/pedidos/pedidoPdf'
import type { Pedido, PedidoStatus } from '../../types/pedidos.types'

export default function PedidoDetalhePage() {
  const { id } = useParams<{ id: string }>()
  const user = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const [pedido, setPedido] = useState<Pedido | null | undefined>(undefined)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!user || !id) return
    const numId = parseInt(id, 10)
    if (isNaN(numId)) { navigate('/pedidos', { replace: true }); return }
    setPedido(getPedidoById(numId, user.empresaId, user.role === 'vendedor' ? user.id : undefined))
  }, [id, user, navigate])

  const handleAtualizarStatus = (novoStatus: PedidoStatus) => {
    if (!pedido?.id) return
    const atualizado = updatePedidoStatus(pedido.id, novoStatus)
    if (!atualizado) return
    setPedido(atualizado)

    const labels: Record<PedidoStatus, string> = {
      aguardando_aprovacao: 'Aguardando aprovação',
      em_preparo:           'Em preparo',
      saiu_para_entrega:    'Saiu para entrega',
      entregue:             'Entregue',
      pagamento_pendente:   'Pagamento pendente',
      concluido:            'Concluído',
      recusado:             'Recusado',
      cancelado:            'Cancelado',
    }
    setToast(`Status atualizado para "${labels[novoStatus]}"`)
    setTimeout(() => setToast(null), 3000)
  }

  if (!user) return null

  if (pedido === undefined) {
    return (
      <div className="bg-zinc-950 min-h-[calc(100dvh-3.5rem)] flex items-center justify-center">
        <p className="text-zinc-600 font-mono text-sm">Carregando...</p>
      </div>
    )
  }

  if (pedido === null) {
    return (
      <div className="bg-zinc-950 min-h-[calc(100dvh-3.5rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-yellow-400 text-xs font-mono uppercase tracking-[0.3em] mb-2">Pedido não encontrado</p>
          <h1 className="text-white text-4xl uppercase mb-6"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}>
            Sem acesso
          </h1>
          <button onClick={() => navigate('/pedidos')}
            className="text-zinc-500 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors">
            ← Voltar para pedidos
          </button>
        </div>
      </div>
    )
  }

  const nomeArquivo = `${pedido.pedidoNum ?? `pedido-${pedido.id}`}.pdf`

  // Botão de ícone de documento — passado como slot para dentro dos itens
  const exportButton = (
    <PDFDownloadLink
      document={<PedidoPDF pedido={pedido} user={user} />}
      fileName={nomeArquivo}
    >
      {({ loading }) => (
        <button
          disabled={loading}
          title={loading ? 'Gerando PDF...' : 'Baixar PDF'}
          className="w-7 h-7 flex items-center justify-center border border-zinc-700 text-zinc-500 hover:border-yellow-400 hover:text-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 10v6m0 0l-2-2m2 2l2-2" />
            </svg>
          )}
        </button>
      )}
    </PDFDownloadLink>
  )

  return (
    <div className="bg-zinc-950 min-h-[calc(100dvh-3.5rem)]">

      {/* Toast */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-800 border border-zinc-700 text-white px-5 py-3 font-mono text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl transition-all duration-300 ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
        {toast}
      </div>

      {/* Header da página — limpo, sem botão */}
      <div className="border-b border-zinc-800 px-4 sm:px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-yellow-400 text-xs font-mono uppercase tracking-[0.3em] mb-1">
            {user.role === 'vendedor' ? 'Meus pedidos' : 'Todos os pedidos'}
          </p>
          <h1 className="text-white text-4xl uppercase leading-none"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}>
            {pedido.pedidoNum ?? `#${pedido.id}`}
          </h1>
        </div>
      </div>

      {/* Detalhe — recebe o botão como slot */}
      <PedidoDetalhe
        pedido={pedido}
        user={user}
        onVoltar={() => navigate('/pedidos')}
        onAtualizarStatus={user.role === 'admin' ? handleAtualizarStatus : undefined}
        exportButton={exportButton}
      />
    </div>
  )
}