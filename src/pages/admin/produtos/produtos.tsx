import { useState, useEffect, useMemo } from 'react'
import type { Produto } from '../../../types/produtos.types'
import {
  getProdutosByEmpresa,
  getGruposByEmpresa,
  createProduto,
  updateProduto,
  deleteProduto,
  type ProdutoFormData,
} from '../../../mock/produtos.mock'
import { useAuth } from '../../../context/authContext'

const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const formVazio: ProdutoFormData = { nome: '', descricao: '', foto: '', grupo: '', preco: 0 }

// ── Ícone placeholder ──────────────────────────────────────────────────────
function ImgPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-zinc-800">
      <svg className="w-7 h-7 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  )
}

// ── Produto card ───────────────────────────────────────────────────────────
function ProdutoCard({ produto, onClick }: { produto: Produto; onClick: () => void }) {
  const [imgErr, setImgErr] = useState(false)
  return (
    <button onClick={onClick}
      className="group text-left bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-200 overflow-hidden">
      <div className="h-44 overflow-hidden relative">
        {produto.foto && !imgErr
          ? <img src={produto.foto} alt={produto.nome} onError={() => setImgErr(true)}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
          : <ImgPlaceholder />}
        <span className="absolute top-2 left-2 bg-zinc-950/80 text-zinc-400 text-[9px] font-mono px-2 py-0.5 uppercase tracking-widest">
          {produto.grupo}
        </span>
      </div>
      <div className="p-4">
        <p className="text-white text-sm font-mono leading-snug line-clamp-2 group-hover:text-yellow-400 transition-colors">
          {produto.nome}
        </p>
        <p className="text-yellow-400 text-base font-mono mt-2">{fmt(produto.preco)}</p>
      </div>
    </button>
  )
}

// ── Form view (criação/edição) ─────────────────────────────────────────────
interface FormViewProps {
  produto: Produto | null
  grupos: string[]
  empresaId: number
  onVoltar: () => void
  onSalvo: () => void
}

function FormView({ produto, grupos, empresaId, onVoltar, onSalvo }: FormViewProps) {
  const isEdicao = !!produto
  const [form, setForm] = useState<ProdutoFormData>(
    produto ? { nome: produto.nome, descricao: produto.descricao, foto: produto.foto, grupo: produto.grupo, preco: produto.preco }
    : formVazio
  )
  const [grupoCustom, setGrupoCustom] = useState(!produto ? false : !grupos.includes(produto.grupo))
  const [erros, setErros] = useState<Partial<Record<keyof ProdutoFormData, string>>>({})
  const [touched, setTouched] = useState(false)
  const [fotoErr, setFotoErr] = useState(false)
  const [confirmExcluir, setConfirmExcluir] = useState(false)

  const set = <K extends keyof ProdutoFormData>(k: K, v: ProdutoFormData[K]) => {
    const next = { ...form, [k]: v }
    setForm(next)
    if (touched) validar(next)
  }

  const validar = (data: ProdutoFormData) => {
    const e: typeof erros = {}
    if (!data.nome.trim())  e.nome  = 'Nome obrigatório'
    if (!data.grupo.trim()) e.grupo = 'Grupo obrigatório'
    if (data.preco <= 0)    e.preco = 'Preço deve ser maior que zero'
    setErros(e)
    return Object.keys(e).length === 0
  }

  const handleSalvar = () => {
    setTouched(true)
    if (!validar(form)) return
    if (isEdicao) updateProduto(produto.id, form)
    else createProduto(form, empresaId)
    onSalvo()
  }

  const handleExcluir = () => {
    if (produto) deleteProduto(produto.id)
    onSalvo()
  }

  const inputCls = (erro?: string) =>
    `w-full bg-zinc-900 border ${erro ? 'border-red-800 focus:border-red-500' : 'border-zinc-800 focus:border-yellow-400'} text-white text-sm font-mono px-3 py-2.5 outline-none transition-colors placeholder-zinc-600`

  const preview = {
    nome:     form.nome     || 'Nome do produto',
    descricao: form.descricao || 'A descrição aparece aqui.',
    foto:     form.foto,
    preco:    form.preco,
    grupo:    form.grupo    || 'Grupo',
  }

  return (
    <div className="bg-zinc-950 min-h-[calc(100dvh-3.5rem)]">

      {/* Breadcrumb / header */}
      <div className="border-b border-zinc-800 px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onVoltar}
              className="flex items-center gap-1.5 text-zinc-500 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              Produtos
            </button>
            <span className="text-zinc-700 text-xs">/</span>
            <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
              {isEdicao ? 'Editar' : 'Novo produto'}
            </span>
          </div>

          {isEdicao && !confirmExcluir && (
            <button onClick={() => setConfirmExcluir(true)}
              className="flex items-center gap-1.5 text-zinc-600 hover:text-red-400 font-mono text-xs uppercase tracking-widest transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Excluir produto
            </button>
          )}

          {confirmExcluir && (
            <div className="flex items-center gap-3">
              <span className="text-zinc-500 font-mono text-xs">Confirmar exclusão?</span>
              <button onClick={() => setConfirmExcluir(false)}
                className="text-zinc-500 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors px-3 py-1.5 border border-zinc-800 hover:border-zinc-600">
                Não
              </button>
              <button onClick={handleExcluir}
                className="text-red-300 font-mono text-xs uppercase tracking-widest transition-colors px-3 py-1.5 bg-red-950 border border-red-900 hover:bg-red-900">
                Sim, excluir
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-10">

        {/* Preview ao vivo */}
        <div>
          <p className="text-zinc-700 text-[9px] font-mono uppercase tracking-[0.3em] mb-4">Como vai aparecer no catálogo</p>
          <div className="border border-zinc-800 bg-zinc-900 overflow-hidden flex flex-col sm:flex-row">
            <div className="w-full sm:w-64 h-48 shrink-0 bg-zinc-800 overflow-hidden relative">
              {preview.foto && !fotoErr
                ? <img src={preview.foto} alt={preview.nome} onError={() => setFotoErr(true)} className="w-full h-full object-cover" />
                : <ImgPlaceholder />}
              <span className="absolute top-2 left-2 bg-zinc-950/80 text-zinc-400 text-[9px] font-mono px-2 py-0.5 uppercase tracking-widest">
                {preview.grupo}
              </span>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <p className={`text-lg font-mono leading-snug ${preview.nome === 'Nome do produto' ? 'text-zinc-600' : 'text-white'}`}>
                {preview.nome}
              </p>
              <p className={`text-sm font-mono mt-2 leading-relaxed ${preview.descricao === 'A descrição aparece aqui.' ? 'text-zinc-700' : 'text-zinc-400'}`}>
                {preview.descricao}
              </p>
              {preview.preco > 0 && (
                <p className="text-yellow-400 text-xl font-mono mt-4">{fmt(preview.preco)}</p>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* Nome */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Nome</label>
            <input type="text" value={form.nome} onChange={(e) => set('nome', e.target.value)}
              placeholder="Ex: Churrasqueira Inox Premium 80cm" className={inputCls(erros.nome)} />
            {erros.nome && <p className="text-red-400 text-[10px] font-mono">{erros.nome}</p>}
          </div>

          {/* Descrição */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Descrição</label>
            <textarea value={form.descricao} onChange={(e) => set('descricao', e.target.value)}
              placeholder="Descrição do produto..." rows={3}
              className={`${inputCls()} resize-none`} />
          </div>

          {/* Grupo */}
          <div className="space-y-1.5">
            <label className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Grupo</label>
            {!grupoCustom && grupos.length > 0 ? (
              <div className="flex gap-2">
                <select value={grupos.includes(form.grupo) ? form.grupo : ''}
                  onChange={(e) => set('grupo', e.target.value)}
                  className={`flex-1 ${inputCls(erros.grupo)} cursor-pointer`}>
                  <option value="">Selecione...</option>
                  {grupos.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
                <button onClick={() => setGrupoCustom(true)}
                  className="px-3 border border-zinc-800 text-zinc-500 hover:border-yellow-400 hover:text-yellow-400 transition-colors text-[10px] font-mono uppercase tracking-widest whitespace-nowrap">
                  + Novo
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input type="text" value={form.grupo} onChange={(e) => set('grupo', e.target.value)}
                  placeholder="Ex: Acessórios" className={`flex-1 ${inputCls(erros.grupo)}`} />
                {grupos.length > 0 && (
                  <button onClick={() => setGrupoCustom(false)}
                    className="px-3 border border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-widest whitespace-nowrap">
                    Existente
                  </button>
                )}
              </div>
            )}
            {erros.grupo && <p className="text-red-400 text-[10px] font-mono">{erros.grupo}</p>}
          </div>

          {/* Preço */}
          <div className="space-y-1.5">
            <label className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Preço (R$)</label>
            <input type="number" min={0} step={0.01}
              value={form.preco === 0 ? '' : form.preco}
              onChange={(e) => set('preco', parseFloat(e.target.value) || 0)}
              placeholder="0,00"
              className={`${inputCls(erros.preco)} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`} />
            {erros.preco && <p className="text-red-400 text-[10px] font-mono">{erros.preco}</p>}
          </div>

          {/* URL da foto */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">URL da foto</label>
            <input type="text" value={form.foto}
              onChange={(e) => { set('foto', e.target.value); setFotoErr(false) }}
              placeholder="https://..." className={inputCls()} />
            {fotoErr && <p className="text-zinc-600 text-[10px] font-mono">URL inválida ou imagem não carregou</p>}
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-3 pt-2 border-t border-zinc-800">
          <button onClick={onVoltar}
            className="border border-zinc-700 text-zinc-400 font-mono text-sm uppercase tracking-widest px-6 py-3 hover:border-zinc-500 hover:text-white transition-colors">
            Cancelar
          </button>
          <button onClick={handleSalvar}
            className="bg-yellow-400 text-zinc-950 font-mono text-sm uppercase tracking-widest px-8 py-3 hover:bg-yellow-300 transition-colors">
            {isEdicao ? 'Salvar alterações' : 'Criar produto'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── List view ──────────────────────────────────────────────────────────────
type View =
  | { tipo: 'lista' }
  | { tipo: 'novo' }
  | { tipo: 'editar'; produto: Produto }

export default function ProdutosPage() {
  const { user } = useAuth()
  if (!user) return null

  const [lista, setLista] = useState<Produto[]>(() => getProdutosByEmpresa(user.empresaId))
  const [grupos, setGrupos] = useState<string[]>(() => getGruposByEmpresa(user.empresaId))
  const [view, setView] = useState<View>({ tipo: 'lista' })
  const [busca, setBusca] = useState('')
  const [grupoFiltro, setGrupoFiltro] = useState('Todos')

  const reload = () => {
    setLista(getProdutosByEmpresa(user.empresaId))
    setGrupos(getGruposByEmpresa(user.empresaId))
  }

  const voltarLista = () => {
    reload()
    setView({ tipo: 'lista' })
  }

  const listaFiltrada = useMemo(() =>
    lista.filter((p) => {
      const grupoOk = grupoFiltro === 'Todos' || p.grupo === grupoFiltro
      const buscaOk = p.nome.toLowerCase().includes(busca.toLowerCase()) ||
                      p.grupo.toLowerCase().includes(busca.toLowerCase())
      return grupoOk && buscaOk
    }),
  [lista, busca, grupoFiltro])

  // Form views
  if (view.tipo === 'novo') {
    return <FormView produto={null} grupos={grupos} empresaId={user.empresaId}
      onVoltar={() => setView({ tipo: 'lista' })} onSalvo={voltarLista} />
  }
  if (view.tipo === 'editar') {
    return <FormView produto={view.produto} grupos={grupos} empresaId={user.empresaId}
      onVoltar={() => setView({ tipo: 'lista' })} onSalvo={voltarLista} />
  }

  // Lista view
  return (
    <div className="bg-zinc-950 min-h-[calc(100dvh-3.5rem)]">

      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-6">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-yellow-400 text-xs font-mono uppercase tracking-[0.3em] mb-1">Painel administrativo</p>
            <h1 className="text-white text-4xl uppercase leading-none"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}>
              Produtos
            </h1>
            <p className="text-zinc-600 text-[10px] font-mono mt-1.5 uppercase tracking-widest">
              {lista.length} produtos · {grupos.length} grupos
            </p>
          </div>
          <button
            onClick={() => setView({ tipo: 'novo' })}
            className="flex items-center gap-2 bg-yellow-400 text-zinc-950 font-mono text-sm uppercase tracking-widest px-5 py-3 hover:bg-yellow-300 transition-colors shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Novo produto
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="border-b border-zinc-800 px-6 py-4">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-xs">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" value={busca} onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar produto..."
              className="w-full bg-zinc-900 border border-zinc-800 text-white text-xs font-mono pl-9 pr-4 py-2.5 outline-none focus:border-yellow-400 transition-colors placeholder-zinc-700" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {['Todos', ...grupos].map((g) => (
              <button key={g} onClick={() => setGrupoFiltro(g)}
                className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-colors ${
                  grupoFiltro === g ? 'bg-yellow-400 text-zinc-950' : 'border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600'
                }`}>
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {listaFiltrada.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <p className="text-zinc-700 font-mono text-sm">Nenhum produto encontrado.</p>
            {busca && (
              <button onClick={() => setBusca('')} className="text-zinc-600 hover:text-yellow-400 font-mono text-xs mt-2 transition-colors">
                Limpar busca
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {listaFiltrada.map((p) => (
              <ProdutoCard key={p.id} produto={p} onClick={() => setView({ tipo: 'editar', produto: p })} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}