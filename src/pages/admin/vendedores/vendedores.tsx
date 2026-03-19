import { useState } from 'react'
import type { User } from '../../../types/auth.types'
import {
  getUsersByRole,
  createUser,
  updateUser,
  toggleUserAtivo,
  resetUserPassword,
} from '../../../mock/users.mock'
import { useAuth } from '../../../context/authContext'
import { VendedorDrawer, type VendedorFormData } from '../../../components/admin/vendedor/vendedorDrawer'

const fmtData = (iso: string) =>
  new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })

interface SenhaModal { nome: string; senha: string }

export default function VendedoresPage() {
  const { user } = useAuth()
  if (!user) return null

  const [lista, setLista] = useState<User[]>(() => getUsersByRole(user.empresaId, 'vendedor'))
  const [drawerAberto, setDrawerAberto] = useState(false)
  const [vendedorEditando, setVendedorEditando] = useState<User | null>(null)
  const [senhaModal, setSenhaModal] = useState<SenhaModal | null>(null)
  const [busca, setBusca] = useState('')

  const reload = () => setLista(getUsersByRole(user.empresaId, 'vendedor'))

  const handleSalvar = (data: VendedorFormData) => {
    if (vendedorEditando) {
      updateUser(vendedorEditando.id, data)
    } else {
      createUser({ ...data, role: 'vendedor', empresaId: user.empresaId })
    }
    reload()
    setDrawerAberto(false)
  }

  const handleToggleAtivo = (v: User) => {
    toggleUserAtivo(v.id)
    reload()
  }

  const handleResetSenha = (v: User) => {
    const novaSenha = resetUserPassword(v.id)
    if (novaSenha) setSenhaModal({ nome: v.name, senha: novaSenha })
  }

  const listaFiltrada = lista.filter((v) =>
    v.name.toLowerCase().includes(busca.toLowerCase()) ||
    v.document.includes(busca) ||
    v.email.toLowerCase().includes(busca.toLowerCase())
  )

  const ativos   = lista.filter((v) => v.ativo).length
  const inativos = lista.filter((v) => !v.ativo).length

  return (
    <div className="bg-zinc-950 min-h-[calc(100dvh-3.5rem)]">

      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-yellow-400 text-xs font-mono uppercase tracking-[0.3em] mb-1">Painel administrativo</p>
            <h1 className="text-white text-4xl uppercase leading-none"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}>
              Vendedores
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
            onClick={() => { setVendedorEditando(null); setDrawerAberto(true) }}
            className="flex items-center gap-2 bg-yellow-400 text-zinc-950 font-mono text-sm uppercase tracking-widest px-5 py-3 hover:bg-yellow-300 transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo vendedor
          </button>
        </div>
      </div>

      {/* Busca */}
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text" value={busca} onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome, documento ou e-mail..."
            className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm font-mono pl-10 pr-4 py-3 outline-none focus:border-yellow-400 transition-colors placeholder-zinc-700"
          />
        </div>
      </div>

      {/* Tabela */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="border border-zinc-800 bg-zinc-900">

          <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 border-b border-zinc-800 bg-zinc-800/40">
            <div className="col-span-4"><span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Vendedor</span></div>
            <div className="col-span-3"><span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Documento / E-mail</span></div>
            <div className="col-span-2 text-center"><span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Tipo</span></div>
            <div className="col-span-1 text-center"><span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Status</span></div>
            <div className="col-span-2 text-right"><span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Ações</span></div>
          </div>

          {listaFiltrada.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-zinc-600 font-mono text-sm">
                {busca ? 'Nenhum vendedor encontrado.' : 'Nenhum vendedor cadastrado.'}
              </p>
            </div>
          ) : (
            listaFiltrada.map((v) => (
              <div key={v.id}
                className={`flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-3 sm:gap-4 px-5 py-4 border-b border-zinc-800 last:border-0 transition-opacity ${!v.ativo ? 'opacity-50' : ''}`}
              >
                {/* Nome */}
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                    <span className="text-yellow-400 text-xs font-mono uppercase">{v.name.charAt(0)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-sm font-mono truncate">{v.name}</p>
                    <p className="text-zinc-600 text-[10px] font-mono mt-0.5">desde {fmtData(v.criadoEm)}</p>
                  </div>
                </div>

                {/* Documento + Email */}
                <div className="col-span-3 min-w-0">
                  <p className="text-zinc-300 text-xs font-mono">{v.document}</p>
                  <p className="text-zinc-500 text-[10px] font-mono truncate mt-0.5">{v.email}</p>
                </div>

                {/* Tipo */}
                <div className="col-span-2 flex sm:justify-center">
                  <span className={`inline-flex items-center border px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest ${
                    v.vendedorTipo === 'livre'
                      ? 'bg-violet-500/10 border-violet-500/30 text-violet-400'
                      : 'bg-zinc-500/10 border-zinc-500/30 text-zinc-400'
                  }`}>
                    {v.vendedorTipo === 'livre' ? 'Livre' : 'Tabelado'}
                  </span>
                </div>

                {/* Status — toggle ao clicar */}
                <div className="col-span-1 flex sm:justify-center">
                  <button onClick={() => handleToggleAtivo(v)} title={v.ativo ? 'Desativar' : 'Ativar'} className="group">
                    <span className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest transition-colors ${
                      v.ativo
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 group-hover:bg-red-500/10 group-hover:border-red-500/30 group-hover:text-red-400'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-500 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 group-hover:text-emerald-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                        v.ativo ? 'bg-emerald-400 group-hover:bg-red-400' : 'bg-zinc-600 group-hover:bg-emerald-400'
                      }`} />
                      <span className="hidden sm:inline">{v.ativo ? 'Ativo' : 'Inativo'}</span>
                    </span>
                  </button>
                </div>

                {/* Ações */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button onClick={() => { setVendedorEditando(v); setDrawerAberto(true) }} title="Editar"
                    className="w-8 h-8 border border-zinc-700 text-zinc-500 hover:border-yellow-400 hover:text-yellow-400 transition-colors flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button onClick={() => handleResetSenha(v)} title="Redefinir senha"
                    className="w-8 h-8 border border-zinc-700 text-zinc-500 hover:border-yellow-400 hover:text-yellow-400 transition-colors flex items-center justify-center">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <p className="text-zinc-700 text-[10px] font-mono mt-3 text-right">
          {listaFiltrada.length} {listaFiltrada.length === 1 ? 'vendedor' : 'vendedores'}{busca && ' encontrados'}
        </p>
      </div>

      <VendedorDrawer
        aberto={drawerAberto}
        vendedor={vendedorEditando}
        onFechar={() => setDrawerAberto(false)}
        onSalvar={handleSalvar}
      />

      {/* Modal nova senha */}
      {senhaModal && (
        <>
          <div className="fixed inset-0 bg-black/70 z-50" onClick={() => setSenhaModal(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm">
              <div className="px-6 py-5 border-b border-zinc-800">
                <p className="text-yellow-400 text-xs font-mono uppercase tracking-[0.25em]">Senha redefinida</p>
                <p className="text-white text-lg font-mono mt-1">{senhaModal.nome}</p>
              </div>
              <div className="px-6 py-6 space-y-4">
                <p className="text-zinc-400 text-sm font-mono leading-relaxed">
                  Compartilhe a nova senha com o vendedor e oriente-o a alterá-la no primeiro acesso.
                </p>
                <div className="bg-zinc-800 border border-zinc-700 px-4 py-3 flex items-center justify-between gap-3">
                  <span className="text-yellow-400 text-xl font-mono tracking-[0.2em]">{senhaModal.senha}</span>
                  <button onClick={() => navigator.clipboard.writeText(senhaModal.senha)}
                    className="text-zinc-500 hover:text-white transition-colors" title="Copiar">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="px-6 pb-5">
                <button onClick={() => setSenhaModal(null)}
                  className="w-full bg-yellow-400 text-zinc-950 font-mono text-sm uppercase tracking-widest py-3 hover:bg-yellow-300 transition-colors">
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}