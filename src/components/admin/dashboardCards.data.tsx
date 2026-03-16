import type { ReactNode } from 'react'

export interface DashboardCard {
  key: string
  label: string
  route: string
  value: number | string
  description: string
  svg: ReactNode
}

const stats = {
  pedidos: 128,
  vendedores: 14,
  clientes: 312,
  produtos: 87,
}

export const dashboardCards: DashboardCard[] = [
  {
    key: 'pedidos',
    label: 'Pedidos',
    route: '/pedidos',
    value: stats.pedidos,
    description: 'Gerencie e acompanhe todos os pedidos',
    svg: (
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="22" y="10" width="60" height="78" rx="3" fill="#27272A" stroke="#3F3F46" strokeWidth="1.5" />
        <rect x="22" y="10" width="60" height="78" rx="3" fill="url(#pedidoGrad)" />
        <path d="M67 10 L82 25 L67 25 Z" fill="#3F3F46" />
        <path d="M67 10 L82 25 H67 Z" fill="#52525B" />
        <rect x="32" y="34" width="32" height="2.5" rx="1.25" fill="#FACC15" opacity="0.9" />
        <rect x="32" y="42" width="42" height="2" rx="1" fill="#71717A" />
        <rect x="32" y="49" width="36" height="2" rx="1" fill="#71717A" />
        <rect x="32" y="56" width="40" height="2" rx="1" fill="#71717A" />
        <rect x="32" y="64" width="42" height="1" rx="0.5" fill="#3F3F46" />
        <rect x="32" y="70" width="18" height="2" rx="1" fill="#71717A" />
        <rect x="56" y="70" width="18" height="2" rx="1" fill="#FACC15" opacity="0.8" />
        <circle cx="96" cy="68" r="14" fill="#FACC15" opacity="0.12" />
        <circle cx="96" cy="68" r="9" fill="none" stroke="#FACC15" strokeWidth="1.5" />
        <path d="M91 68 L95 72 L101 64" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="pedidoGrad" x1="22" y1="10" x2="82" y2="88" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3F3F46" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#18181B" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    key: 'vendedores',
    label: 'Vendedores',
    route: '/admin/vendedores',
    value: stats.vendedores,
    description: 'Equipe de vendas e permissões',
    svg: (
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="60" cy="32" r="16" fill="#27272A" stroke="#3F3F46" strokeWidth="1.5" />
        <circle cx="60" cy="32" r="10" fill="#FACC15" opacity="0.15" />
        <circle cx="60" cy="29" r="6" fill="#FACC15" opacity="0.7" />
        <path d="M46 54 C46 44 74 44 74 54" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <circle cx="28" cy="42" r="11" fill="#27272A" stroke="#3F3F46" strokeWidth="1.2" />
        <circle cx="28" cy="39.5" r="4.5" fill="#71717A" opacity="0.8" />
        <path d="M18 60 C18 52 38 52 38 60" stroke="#52525B" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="92" cy="42" r="11" fill="#27272A" stroke="#3F3F46" strokeWidth="1.2" />
        <circle cx="92" cy="39.5" r="4.5" fill="#71717A" opacity="0.8" />
        <path d="M82 60 C82 52 102 52 102 60" stroke="#52525B" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="60" cy="32" r="16" fill="none" stroke="#FACC15" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <line x1="44" y1="50" x2="38" y2="54" stroke="#3F3F46" strokeWidth="1" />
        <line x1="76" y1="50" x2="82" y2="54" stroke="#3F3F46" strokeWidth="1" />
        <rect x="20" y="76" width="80" height="3" rx="1.5" fill="#27272A" />
        <rect x="20" y="76" width="52" height="3" rx="1.5" fill="#FACC15" opacity="0.6" />
        <rect x="20" y="82" width="80" height="2" rx="1" fill="#27272A" />
        <rect x="20" y="82" width="34" height="2" rx="1" fill="#52525B" />
      </svg>
    ),
  },
  {
    key: 'clientes',
    label: 'Clientes',
    route: '/admin/clientes',
    value: stats.clientes,
    description: 'Cadastro e histórico de clientes',
    svg: (
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="15" y="38" width="38" height="48" rx="2" fill="#27272A" stroke="#3F3F46" strokeWidth="1.5" />
        <rect x="21" y="44" width="8" height="7" rx="1" fill="#3F3F46" />
        <rect x="34" y="44" width="8" height="7" rx="1" fill="#FACC15" opacity="0.4" />
        <rect x="21" y="57" width="8" height="7" rx="1" fill="#3F3F46" />
        <rect x="34" y="57" width="8" height="7" rx="1" fill="#3F3F46" />
        <rect x="21" y="70" width="8" height="7" rx="1" fill="#FACC15" opacity="0.25" />
        <rect x="34" y="70" width="8" height="7" rx="1" fill="#3F3F46" />
        <rect x="27" y="72" width="14" height="14" rx="1" fill="#18181B" stroke="#3F3F46" strokeWidth="1" />
        <circle cx="88" cy="34" r="14" fill="#27272A" stroke="#3F3F46" strokeWidth="1.5" />
        <circle cx="88" cy="30" r="7" fill="#FACC15" opacity="0.5" />
        <path d="M74 54 C74 43 102 43 102 54" stroke="#FACC15" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
        <rect x="70" y="62" width="36" height="22" rx="3" fill="#27272A" stroke="#FACC15" strokeWidth="1" strokeOpacity="0.4" />
        <rect x="74" y="67" width="10" height="7" rx="1.5" fill="#FACC15" opacity="0.3" />
        <rect x="88" y="68" width="14" height="2" rx="1" fill="#52525B" />
        <rect x="88" y="73" width="10" height="2" rx="1" fill="#3F3F46" />
        <path d="M55 62 L68 62" stroke="#FACC15" strokeWidth="1.2" strokeDasharray="2.5 2" opacity="0.5" />
        <path d="M65 59 L68 62 L65 65" stroke="#FACC15" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    key: 'produtos',
    label: 'Produtos',
    route: '/admin/produtos',
    value: stats.produtos,
    description: 'Catálogo, preços e estoque',
    svg: (
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M50 22 L84 22 L96 38 L62 38 Z" fill="#27272A" stroke="#3F3F46" strokeWidth="1.5" />
        <path d="M50 22 L62 38 L62 78 L50 62 Z" fill="#1C1C1F" stroke="#3F3F46" strokeWidth="1.5" />
        <path d="M62 38 L96 38 L96 78 L62 78 Z" fill="#27272A" stroke="#3F3F46" strokeWidth="1.5" />
        <path d="M73 22 L73 38 L73 78" stroke="#FACC15" strokeWidth="2" opacity="0.5" />
        <path d="M50 30 L96 30" stroke="#FACC15" strokeWidth="1" opacity="0.3" />
        <circle cx="79" cy="28" r="5" fill="#FACC15" opacity="0.2" stroke="#FACC15" strokeWidth="1" strokeOpacity="0.6" />
        <text x="79" y="31" textAnchor="middle" fill="#FACC15" fontSize="6" fontFamily="monospace" opacity="0.9">★</text>
        <rect x="14" y="55" width="26" height="22" rx="2" fill="#27272A" stroke="#3F3F46" strokeWidth="1.2" />
        <path d="M14 63 L40 63" stroke="#3F3F46" strokeWidth="1" />
        <rect x="24" y="55" width="1.5" height="8" fill="#3F3F46" />
        <rect x="18" y="67" width="8" height="2" rx="1" fill="#52525B" />
        <rect x="18" y="71" width="5" height="2" rx="1" fill="#FACC15" opacity="0.5" />
        <rect x="14" y="28" width="22" height="22" rx="2" fill="#27272A" stroke="#3F3F46" strokeWidth="1.2" />
        <path d="M14 36 L36 36" stroke="#3F3F46" strokeWidth="1" />
        <rect x="22" y="28" width="1.5" height="8" fill="#3F3F46" />
        <rect x="88" y="62" width="26" height="16" rx="8" fill="#FACC15" opacity="0.12" stroke="#FACC15" strokeWidth="1" strokeOpacity="0.4" />
        <rect x="92" y="67" width="18" height="2" rx="1" fill="#FACC15" opacity="0.6" />
        <rect x="96" y="71" width="10" height="2" rx="1" fill="#FACC15" opacity="0.3" />
      </svg>
    ),
  },
  {
    key: 'financeiro',
    label: 'Financeiro',
    route: '/admin/financeiro',
    value: 'Ver relatório',
    description: 'Faturamento, pagamentos e pedidos em aberto',
    svg: (
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Cartão / extrato */}
        <rect x="18" y="22" width="72" height="48" rx="4" fill="#27272A" stroke="#3F3F46" strokeWidth="1.5" />
        <rect x="18" y="22" width="72" height="16" rx="4" fill="#FACC15" opacity="0.12" />
        <rect x="18" y="32" width="72" height="6" rx="0" fill="#FACC15" opacity="0.06" />
        {/* Chip */}
        <rect x="26" y="27" width="12" height="9" rx="1.5" fill="#FACC15" opacity="0.35" stroke="#FACC15" strokeWidth="0.8" strokeOpacity="0.5" />
        <line x1="26" y1="31" x2="38" y2="31" stroke="#FACC15" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="32" y1="27" x2="32" y2="36" stroke="#FACC15" strokeWidth="0.8" strokeOpacity="0.4" />
        {/* Linhas de valor */}
        <rect x="26" y="46" width="28" height="2.5" rx="1.25" fill="#FACC15" opacity="0.8" />
        <rect x="26" y="52" width="44" height="2" rx="1" fill="#52525B" />
        <rect x="26" y="58" width="36" height="2" rx="1" fill="#3F3F46" />
        {/* Gráfico de barras */}
        <rect x="98" y="58" width="8" height="32" rx="1" fill="#27272A" stroke="#3F3F46" strokeWidth="1" />
        <rect x="98" y="70" width="8" height="20" rx="1" fill="#FACC15" opacity="0.25" />
        <rect x="108" y="48" width="8" height="42" rx="1" fill="#27272A" stroke="#3F3F46" strokeWidth="1" />
        <rect x="108" y="58" width="8" height="32" rx="1" fill="#FACC15" opacity="0.5" />
        {/* Linha de base */}
        <line x1="94" y1="90" x2="120" y2="90" stroke="#3F3F46" strokeWidth="1" />
        {/* Seta de tendência */}
        <path d="M92 68 L100 56 L108 62 L116 46" stroke="#FACC15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
        <circle cx="116" cy="46" r="2.5" fill="#FACC15" opacity="0.8" />
      </svg>
    ),
  },
]