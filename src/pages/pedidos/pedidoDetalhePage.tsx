import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { getPedidoById } from '../../mock/pedidos.mock'
import { PedidoDetalhe } from '../../components/pedidos/pedidoDetalhe'
import type { Pedido } from '../../types/pedidos.types'

export default function PedidoDetalhePage() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [pedido, setPedido] = useState<Pedido | null | undefined>(undefined)

  useEffect(() => {
    if (!user || !id) return

    const numId = parseInt(id, 10)
    if (isNaN(numId)) {
      navigate('/pedidos', { replace: true })
      return
    }

    const found = getPedidoById(
      numId,
      user.empresaId,
      user.role === 'vendedor' ? user.id : undefined,
    )

    // null = não encontrado ou sem acesso
    setPedido(found)
  }, [id, user, navigate])

  if (!user) return null

  // Ainda carregando
  if (pedido === undefined) {
    return (
      <div className="bg-zinc-950 min-h-[calc(100dvh-3.5rem)] flex items-center justify-center">
        <p className="text-zinc-600 font-mono text-sm">Carregando...</p>
      </div>
    )
  }

  // Não encontrado ou sem acesso
  if (pedido === null) {
    return (
      <div className="bg-zinc-950 min-h-[calc(100dvh-3.5rem)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-yellow-400 text-xs font-mono uppercase tracking-[0.3em] mb-2">
            Pedido não encontrado
          </p>
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
      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-6">
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
      />
    </div>
  )
}