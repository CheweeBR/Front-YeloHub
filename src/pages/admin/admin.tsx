import { useNavigate } from 'react-router-dom'
import { DashboardHeader } from '../../components/admin/dashboardHeader'
import { DashboardCard } from '../../components/admin/dashboardCard'
import { dashboardCards } from '../../components/admin/dashboardCards.data'

export default function AdminPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-zinc-950 min-h-[calc(100dvh-3.5rem)]">
      <DashboardHeader cards={dashboardCards} />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {dashboardCards.map((card) => (
            <DashboardCard
              key={card.key}
              card={card}
              onClick={() => navigate(card.route)}
            />
          ))}
        </div>
        <div className="flex items-center gap-4 mt-12">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-zinc-700 text-[10px] font-mono tracking-widest uppercase">yelohub admin v1.0</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>
      </div>
    </div>
  )
}