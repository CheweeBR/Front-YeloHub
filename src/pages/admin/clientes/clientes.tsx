import { useState } from 'react'
import type { User } from '../../../types/auth.types'
import {
  getUsersByRole,
  createUser,
  updateUser,
  toggleUserAtivo,
} from '../../../mock/users.mock'
import { useAuth } from '../../../context/authContext'
import { ClienteDrawer, type ClienteFormData } from '../../../components/admin/clientes/clienteDrawer'

const fmtData = (iso: string) =>
  new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })

export default function ClientesPage() {
  const { user } = useAuth()
  if (!user) return null

  const [lista, setLista] = useState<User[]>(() => getUsersByRole(user.empresaId, 'cliente'))
  const [drawerAberto, setDrawerAberto] = useState(false)
  const [clienteEditando, setClienteEditando] = useState<User | null>(null)
  const [busca, setBusca] = useState('')

  const reload = () => setLista(getUsersByRole(user.empresaId, 'cliente'))

  const handleSalvar = (data: ClienteFormData) => {
    if (clienteEditando) {
      updateUser(clienteEditando.id, {
        name:     data.name,
        email:    data.email,
        document: data.document,
      })
    } else {
      createUser({
        ...data,
        role:      'cliente',
        empresaId: user.empresaId,
        password:  '',           // cliente não acessa o sistema
      })
    }
    reload()
    setDrawerAberto(false)
  }

  const handleToggleAtivo = (c: User) => {
    toggleUserAtivo(c.id)
    reload()
  }

  const listaFiltrada = lista.filter((c) =>
    c.name.toLowerCase().includes(busca.toLowerCase()) ||
    c.document.includes(busca) ||
    c.email.toLowerCase().includes(busca.toLowerCase())
  )

  const ativos   = lista.filter((c) => c.ativo).length
  const inativos = lista.filter((c) => !c.ativo).length

  return (
    <div className="bg-zinc-950 min-h-[calc(100dvh-3.5rem)]">

      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-yellow-400 text-xs font-mono uppercase tracking-[0.3em] mb-1">Painel administrativo</p>
            <h1 className="text-white text-5xl uppercase leading-none"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}>
              Clientes
            </h1>
            <div className="flex gap-4 mt-3">
              <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
                Ativos <span className="text-yellow-400 ml-1">{ativos}</span>
              </span>
              <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
                Inativos <span className="text-zinc-500 ml-1">{inativos}</span>
              </span>
            </div>
          </div>
          <button
            onClick={() => { setClienteEditando(null); setDrawerAberto(true) }}
            className="flex items-center gap-2 bg-yellow-400 text-zinc-950 font-mono text-sm uppercase tracking-widest px-5 py-3 hover:bg-yellow-300 transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo cliente
          </button>
        </div>
      </div>

      {/* Busca */}
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" value={busca} onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome, documento ou e-mail..."
            className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm font-mono pl-10 pr-4 py-3 outline-none focus:border-yellow-400 transition-colors placeholder-zinc-700" />
        </div>
      </div>

      {/* Tabela */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="border border-zinc-800 bg-zinc-900">

          <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 border-b border-zinc-800 bg-zinc-800/40">
            <div className="col-span-4"><span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Cliente</span></div>
            <div className="col-span-3"><span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Documento / E-mail</span></div>
            <div className="col-span-3"><span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Endereço</span></div>
            <div className="col-span-1 text-center"><span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Status</span></div>
            <div className="col-span-1 text-right"><span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Ações</span></div>
          </div>

          {listaFiltrada.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-zinc-600 font-mono text-sm">
                {busca ? 'Nenhum cliente encontrado.' : 'Nenhum cliente cadastrado.'}
              </p>
            </div>
          ) : (
            listaFiltrada.map((c) => (
              <div key={c.id}
                className={`flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-3 sm:gap-4 px-5 py-4 border-b border-zinc-800 last:border-0 transition-opacity ${!c.ativo ? 'opacity-50' : ''}`}
              >
                {/* Nome + data */}
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                    <span className="text-yellow-400 text-xs font-mono uppercase">{c.name.charAt(0)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-mono truncate">{c.name}</p>
                    <p className="text-zinc-600 text-[10px] font-mono mt-0.5">desde {fmtData(c.criadoEm)}</p>
                  </div>
                </div>

                {/* Documento + Email */}
                <div className="col-span-3 min-w-0">
                  <p className="text-zinc-300 text-xs font-mono">{c.document}</p>
                  <p className="text-zinc-500 text-[10px] font-mono truncate mt-0.5">{c.email}</p>
                </div>

                {/* Endereço resumido */}
                <div className="col-span-3 min-w-0">
                  {c.endereco ? (
                    <>
                      <p className="text-zinc-300 text-xs font-mono truncate">
                        {c.endereco.logradouro}, {c.endereco.numero}
                        {c.endereco.complemento ? ` — ${c.endereco.complemento}` : ''}
                      </p>
                      <p className="text-zinc-500 text-[10px] font-mono mt-0.5 truncate">
                        {c.endereco.cidade} · {c.endereco.uf} · {c.endereco.cep}
                      </p>
                    </>
                  ) : (
                    <p className="text-zinc-600 text-[10px] font-mono">—</p>
                  )}
                </div>

                {/* Status */}
                <div className="col-span-1 flex sm:justify-center">
                  <button onClick={() => handleToggleAtivo(c)} title={c.ativo ? 'Desativar' : 'Ativar'} className="group">
                    <span className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest transition-colors ${
                      c.ativo
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 group-hover:bg-red-500/10 group-hover:border-red-500/30 group-hover:text-red-400'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-500 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 group-hover:text-emerald-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                        c.ativo ? 'bg-emerald-400 group-hover:bg-red-400' : 'bg-zinc-600 group-hover:bg-emerald-400'
                      }`} />
                      <span className="hidden sm:inline">{c.ativo ? 'Ativo' : 'Inativo'}</span>
                    </span>
                  </button>
                </div>

                {/* Ação — só editar */}
                <div className="col-span-1 flex items-center justify-end">
                  <button onClick={() => { setClienteEditando(c); setDrawerAberto(true) }} title="Editar"
                    className="w-8 h-8 border border-zinc-700 text-zinc-500 hover:border-yellow-400 hover:text-yellow-400 transition-colors flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <p className="text-zinc-700 text-[10px] font-mono mt-3 text-right">
          {listaFiltrada.length} {listaFiltrada.length === 1 ? 'cliente' : 'clientes'}{busca && ' encontrados'}
        </p>
      </div>

      <ClienteDrawer
        aberto={drawerAberto}
        cliente={clienteEditando}
        onFechar={() => setDrawerAberto(false)}
        onSalvar={handleSalvar}
      />
    </div>
  )
}