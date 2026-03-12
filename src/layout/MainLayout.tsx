import { Outlet } from 'react-router-dom'
import Header from '../components/header/header'

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="pt-14 min-h-[100dvh] bg-zinc-950">
        <Outlet />
      </main>
    </>
  )
}