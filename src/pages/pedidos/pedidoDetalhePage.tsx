import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { getPedidoById, updatePedidoStatus } from '../../mock/pedidos.mock'
import { PedidoDetalhe } from '../../components/pedidos/pedidoDetalhe'
import type { Pedido, PedidoStatus } from '../../types/pedidos.types'

export default function PedidoDetalhePage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
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

    // Toast de feedback
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
          <h1
            className="text-white text-4xl uppercase mb-6"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}
          >
            Sem acesso
          </h1>
          <button
            onClick={() => navigate('/pedidos')}
            className="text-zinc-500 hover:text-white text-xs font-mono uppercase tracking-widest transition-colors"
          >
            ← Voltar para pedidos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-zinc-950 min-h-[calc(100dvh-3.5rem)]">

      {/* Toast */}
      <div
        className={`
          fixed bottom-6 left-1/2 -translate-x-1/2 z-50
          bg-zinc-800 border border-zinc-700 text-white
          px-5 py-3 font-mono text-xs uppercase tracking-widest
          flex items-center gap-2 shadow-xl
          transition-all duration-300
          ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
        `}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
        {toast}
      </div>

      {/* Header */}
      <div className="border-b border-zinc-800 px-4 sm:px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-yellow-400 text-xs font-mono uppercase tracking-[0.3em] mb-1">
            {user.role === 'vendedor' ? 'Meus pedidos' : 'Todos os pedidos'}
          </p>
          <h1
            className="text-white text-4xl uppercase leading-none"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}
          >
            {pedido.pedidoNum ?? `#${pedido.id}`}
          </h1>
        </div>
      </div>

      <PedidoDetalhe
        pedido={pedido}
        user={user}
        onVoltar={() => navigate('/pedidos')}
        onAtualizarStatus={user.role === 'admin' ? handleAtualizarStatus : undefined}
      />
    </div>
  )
}