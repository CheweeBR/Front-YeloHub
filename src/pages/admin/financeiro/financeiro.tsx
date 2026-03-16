import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFinanceiro } from '../../../mock/pedidos.mock'
import { useAuth } from '../../../context/authContext'
import { DashboardCard } from '../../../components/admin/dashboardCard'
import type { DashboardCard as DashboardCardData } from '../../../components/admin/dashboardCards.data'

const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const pluralPedido = (n: number) => `${n} ${n === 1 ? 'pedido' : 'pedidos'}`

const SvgFaturado = (
  <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="60" cy="48" r="28" fill="#27272A" stroke="#3F3F46" strokeWidth="1.5" />
    <circle cx="60" cy="48" r="22" fill="#1C1C1F" stroke="#FACC15" strokeWidth="1" strokeOpacity="0.3" />
    <circle cx="60" cy="48" r="14" fill="#FACC15" opacity="0.12" />
    <text x="60" y="53" textAnchor="middle" fill="#FACC15" fontSize="14" fontFamily="monospace" fontWeight="bold" opacity="0.9">R$</text>
    <circle cx="84" cy="26" r="10" fill="#18181B" stroke="#FACC15" strokeWidth="1.5" />
    <path d="M79 26 L83 30 L89 22" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="16" y="84" width="88" height="3" rx="1.5" fill="#FACC15" opacity="0.7" />
    <rect x="16" y="89" width="60" height="2" rx="1" fill="#3F3F46" />
  </svg>
)

const SvgAguardando = (
  <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="28" y="12" width="50" height="64" rx="3" fill="#27272A" stroke="#3F3F46" strokeWidth="1.5" />
    <path d="M64 12 L78 26 L64 26 Z" fill="#3F3F46" />
    <path d="M64 12 L78 26 H64 Z" fill="#52525B" />
    <rect x="36" y="34" width="28" height="2.5" rx="1.25" fill="#EF4444" opacity="0.8" />
    <rect x="36" y="41" width="36" height="2" rx="1" fill="#71717A" />
    <rect x="36" y="48" width="30" height="2" rx="1" fill="#71717A" />
    <circle cx="84" cy="72" r="16" fill="#1C1C1F" stroke="#EF4444" strokeWidth="1.5" strokeOpacity="0.6" />
    <circle cx="84" cy="72" r="10" fill="#EF4444" opacity="0.08" />
    <line x1="84" y1="65" x2="84" y2="72" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    <line x1="84" y1="72" x2="90" y2="76" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    <circle cx="84" cy="72" r="2" fill="#EF4444" opacity="0.8" />
    <rect x="28" y="82" width="50" height="2" rx="1" fill="#EF4444" opacity="0.5" />
  </svg>
)

const SvgEmAberto = (
  <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M20 20 L100 20 L80 46 L80 78 L40 78 L40 46 Z" fill="#27272A" stroke="#3F3F46" strokeWidth="1.5" />
    <path d="M20 20 L100 20 L80 46 H40 Z" fill="#1C1C1F" stroke="#3F3F46" strokeWidth="1.5" />
    <rect x="48" y="50" width="24" height="3" rx="1.5" fill="#71717A" opacity="0.8" />
    <rect x="48" y="57" width="18" height="3" rx="1.5" fill="#71717A" opacity="0.6" />
    <rect x="48" y="64" width="12" height="3" rx="1.5" fill="#71717A" opacity="0.4" />
    <circle cx="60" cy="88" r="6" fill="#27272A" stroke="#71717A" strokeWidth="1" />
    <path d="M57 88 L60 91 L63 88" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="20" y="20" width="80" height="3" rx="1.5" fill="#FACC15" opacity="0.3" />
    <circle cx="14" cy="50" r="5" fill="#27272A" stroke="#52525B" strokeWidth="1" />
    <circle cx="106" cy="50" r="5" fill="#27272A" stroke="#52525B" strokeWidth="1" />
    <line x1="14" y1="50" x2="40" y2="50" stroke="#3F3F46" strokeWidth="1" strokeDasharray="3 2" />
    <line x1="80" y1="50" x2="106" y2="50" stroke="#3F3F46" strokeWidth="1" strokeDasharray="3 2" />
  </svg>
)

export default function FinanceiroPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  if (!user) return null

  const fin = useMemo(() => getFinanceiro(user.empresaId), [user.empresaId])

  const pctFaturado = fin.totalGeral > 0 ? Math.round((fin.faturado / fin.totalGeral) * 100) : 0
  const pctPendente = fin.totalGeral > 0 ? Math.round((fin.aguardandoPagamento / fin.totalGeral) * 100) : 0
  const pctAberto   = 100 - pctFaturado - pctPendente

  const cards: DashboardCardData[] = [
    {
      key: 'faturado',
      label: 'Faturado',
      route: '/pedidos?status=concluido',
      value: fmt(fin.faturado),
      description: pluralPedido(fin.pedidosFaturados) + ' · concluídos e pagos',
      svg: SvgFaturado,
    },
    {
      key: 'aguardando_pagamento',
      label: 'Aguardando pagamento',
      route: '/pedidos?status=pagamento_pendente',
      value: fmt(fin.aguardandoPagamento),
      description: pluralPedido(fin.pedidosPendentes) + ' · entregues, pagamento pendente',
      svg: SvgAguardando,
    },
    {
      key: 'em_aberto',
      label: 'Em aberto',
      route: '/pedidos',
      value: fmt(fin.emAberto),
      description: pluralPedido(fin.pedidosEmAberto) + ' · em aprovação, preparo ou entrega',
      svg: SvgEmAberto,
    },
  ]

  return (
    <div className="bg-zinc-950 min-h-[calc(100dvh-3.5rem)]">

      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-6">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-yellow-400 text-xs font-mono uppercase tracking-[0.3em] mb-1">Painel administrativo</p>
          <h1 className="text-white text-5xl uppercase leading-none"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}>
            Financeiro
          </h1>
          <p className="text-zinc-600 text-[10px] font-mono mt-1.5 uppercase tracking-widest">
            Total em carteira · {fmt(fin.totalGeral)}
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8 space-y-8">

        {/* Barra de distribuição */}
        <div>
          <div className="flex h-1.5 overflow-hidden bg-zinc-800">
            {pctFaturado > 0 && <div className="bg-yellow-400 transition-all duration-700" style={{ width: `${pctFaturado}%` }} />}
            {pctPendente > 0 && <div className="bg-red-500   transition-all duration-700" style={{ width: `${pctPendente}%` }} />}
            {pctAberto   > 0 && <div className="bg-zinc-600  transition-all duration-700" style={{ width: `${pctAberto}%`   }} />}
          </div>
          <div className="flex gap-4 mt-2">
            <span className="text-yellow-400 text-[9px] font-mono">■ Faturado {pctFaturado}%</span>
            <span className="text-red-400    text-[9px] font-mono">■ Pendente {pctPendente}%</span>
            <span className="text-zinc-500   text-[9px] font-mono">■ Em aberto {pctAberto}%</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {cards.map((card) => (
            <DashboardCard key={card.key} card={card} onClick={() => navigate(card.route)} />
          ))}
        </div>
      </div>
    </div>
  )
}