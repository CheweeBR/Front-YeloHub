import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { clearCredentials } from '../../store/slices/authSlice'

export default function Header() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const clearAuth = () => dispatch(clearCredentials())

  const hasRole = (roles: string[]) => {
    if (!user) return false
    return roles.includes(user.role)
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'px-4 py-1.5 text-xs font-mono uppercase tracking-widest transition-colors duration-200',
      isActive ? 'text-zinc-950 bg-yellow-400' : 'text-zinc-400 hover:text-white',
    ].join(' ')

  const drawerLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      'block px-6 py-4 text-sm font-mono uppercase tracking-widest border-b border-zinc-800 transition-colors duration-200',
      isActive ? 'text-yellow-400 bg-zinc-800/50' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30',
    ].join(' ')

  const closeDrawer = () => setDrawerOpen(false)

  return (
    <>
      <nav className="bg-zinc-900 border-b border-zinc-800 fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto px-6 flex items-center justify-between h-14">

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 bg-yellow-400 rounded-sm rotate-12 shrink-0" />
              <span
                className="text-white text-lg tracking-widest uppercase"
                style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.2em' }}
              >
                yelohub
              </span>
            </div>

            <div className="hidden md:block h-4 w-px bg-zinc-700" />

            <div className="hidden md:flex items-center gap-1">
              {hasRole(['admin', 'vendedor', 'cliente']) && (
                <NavLink to="/catalogo" className={navLinkClass}>Catálogo</NavLink>
              )}
              {hasRole(['admin']) && (
                <NavLink to="/admin" className={navLinkClass}>Dashboard</NavLink>
              )}
              {hasRole(['admin', 'vendedor']) && (
                <NavLink to="/pedidos" className={navLinkClass}>Pedidos</NavLink>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden md:flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-white text-xs font-mono leading-none">{user.name}</span>
                  <span className="text-yellow-500 text-[10px] font-mono uppercase tracking-widest mt-0.5">
                    {user.role}
                  </span>
                </div>
                <button
                  onClick={clearAuth}
                  className="text-zinc-500 hover:text-red-400 text-xs font-mono uppercase tracking-widest transition-colors duration-200 flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sair
                </button>
              </div>
            )}

            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden text-zinc-400 hover:text-white transition-colors p-1"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div
        onClick={closeDrawer}
        className={`fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity duration-300 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-zinc-900 border-l border-zinc-800 z-50 md:hidden flex flex-col transition-transform duration-300 ease-in-out ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 h-14 border-b border-zinc-800 shrink-0">
          {user && (
            <div className="flex flex-col">
              <span className="text-white text-xs font-mono leading-none">{user.name}</span>
              <span className="text-yellow-500 text-[10px] font-mono uppercase tracking-widest mt-0.5">{user.role}</span>
            </div>
          )}
          <button onClick={closeDrawer} className="text-zinc-500 hover:text-white transition-colors p-1 ml-auto">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {hasRole(['admin', 'vendedor', 'cliente']) && (
            <NavLink to="/catalogo" className={drawerLinkClass} onClick={closeDrawer}>Catálogo</NavLink>
          )}
          {hasRole(['admin']) && (
            <NavLink to="/admin" className={drawerLinkClass} onClick={closeDrawer}>Admin</NavLink>
          )}
          {hasRole(['admin', 'vendedor']) && (
            <NavLink to="/pedidos" className={drawerLinkClass} onClick={closeDrawer}>Pedidos</NavLink>
          )}
        </div>

        <div className="shrink-0 px-6 py-5 border-t border-zinc-800">
          <button
            onClick={() => { clearAuth(); closeDrawer() }}
            className="w-full flex items-center gap-2 text-zinc-500 hover:text-red-400 text-xs font-mono uppercase tracking-widest transition-colors duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sair da conta
          </button>
        </div>
      </div>
    </>
  )
}