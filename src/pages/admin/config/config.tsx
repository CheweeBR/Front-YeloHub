import { useState } from 'react'
import { useAppSelector } from '../../../store/hooks'
import { getEmpresaById, updateEmpresa } from '../../../mock/empresa.mock'
import type { EmpresaFormData } from '../../../mock/empresa.mock'

const UFS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC',
  'SP','SE','TO',
]

const enderecoVazio = {
  logradouro:  '',
  numero:      '',
  complemento: '',
  bairro:      '',
  cidade:      '',
  uf:          '',
  cep:         '',
}

export default function ConfiguracoesPage() {
  const user = useAppSelector((state) => state.auth.user)

  const empresa = user ? getEmpresaById(user.empresaId) : null

  const [form, setForm] = useState<EmpresaFormData>(() => ({
    nome:      empresa?.nome      ?? '',
    documento: empresa?.documento ?? '',
    telefone:  empresa?.telefone  ?? '',
    email:     empresa?.email     ?? '',
    site:      empresa?.site      ?? '',
    endereco:  empresa?.endereco  ?? enderecoVazio,
  }))

  const [erros, setErros] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState(false)
  const [salvo, setSalvo] = useState(false)
  const [cepCarregando, setCepCarregando] = useState(false)

  if (!user || !empresa) return null

  // ── Helpers ──────────────────────────────────────────────────────────────

  const set = <K extends keyof EmpresaFormData>(key: K, value: EmpresaFormData[K]) => {
    const next = { ...form, [key]: value }
    setForm(next)
    if (touched) validar(next)
  }

  const setEnd = (key: keyof EmpresaFormData['endereco'], value: string) => {
    const next = { ...form, endereco: { ...form.endereco, [key]: value } }
    setForm(next)
    if (touched) validar(next)
  }

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    const formatted = raw.replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9)
    setEnd('cep', formatted)

    if (raw.length === 8) {
      setCepCarregando(true)
      try {
        const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`)
        const data = await res.json()
        if (!data.erro) {
          setForm((prev) => ({
            ...prev,
            endereco: {
              ...prev.endereco,
              cep:        formatted,
              logradouro: data.logradouro ?? '',
              bairro:     data.bairro     ?? '',
              cidade:     data.localidade ?? '',
              uf:         data.uf         ?? '',
            },
          }))
        }
      } catch { /* silencia */ }
      finally { setCepCarregando(false) }
    }
  }

  const validar = (data: EmpresaFormData): boolean => {
    const e: Record<string, string> = {}

    if (!data.nome.trim())      e.nome      = 'Nome obrigatório'
    if (!data.documento.trim()) e.documento = 'CNPJ obrigatório'
    if (!data.email.trim())     e.email     = 'E-mail obrigatório'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'E-mail inválido'

    const end = data.endereco
    if (!end.cep.replace(/\D/g, ''))  e['endereco.cep']        = 'CEP obrigatório'
    if (!end.logradouro.trim())        e['endereco.logradouro'] = 'Logradouro obrigatório'
    if (!end.numero.trim())            e['endereco.numero']     = 'Número obrigatório'
    if (!end.bairro.trim())            e['endereco.bairro']     = 'Bairro obrigatório'
    if (!end.cidade.trim())            e['endereco.cidade']     = 'Cidade obrigatória'
    if (!end.uf)                       e['endereco.uf']         = 'UF obrigatória'

    setErros(e)
    return Object.keys(e).length === 0
  }

  const handleSalvar = () => {
    setTouched(true)
    if (!validar(form)) return
    updateEmpresa(empresa.id, form)
    setSalvo(true)
    setTimeout(() => setSalvo(false), 3000)
  }

  // ── Sub-componentes de UI ─────────────────────────────────────────────────

  const Field = ({
    label, children, erro,
  }: { label: string; children: React.ReactNode; erro?: string }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">{label}</label>
      {children}
      {erro && <p className="text-red-400 text-[10px] font-mono">{erro}</p>}
    </div>
  )

  const inputClass = (erro?: string) =>
    `w-full bg-zinc-900 border ${
      erro
        ? 'border-red-800 focus:border-red-500'
        : 'border-zinc-800 focus:border-yellow-400'
    } text-white text-sm font-mono px-3 py-2.5 outline-none transition-colors placeholder-zinc-600`

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-3 mb-5">
      <span className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">{children}</span>
      <div className="flex-1 h-px bg-zinc-800" />
    </div>
  )

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="bg-zinc-950 min-h-[calc(100dvh-3.5rem)]">

      {/* Toast de salvo */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-800 border border-yellow-400/30 text-white px-5 py-3 font-mono text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl transition-all duration-300 ${salvo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
        Configurações salvas
      </div>

      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-yellow-400 text-xs font-mono uppercase tracking-[0.3em] mb-1">Painel administrativo</p>
          <h1 className="text-white text-4xl uppercase leading-none"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}>
            Configurações
          </h1>
          <p className="text-zinc-600 text-[10px] font-mono mt-2 uppercase tracking-widest">
            Dados da empresa · {empresa.nome}
          </p>
        </div>
      </div>

      {/* Formulário */}
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">

        {/* Dados principais */}
        <div>
          <SectionTitle>Dados da empresa</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div className="sm:col-span-2">
              <Field label="Razão social" erro={erros.nome}>
                <input type="text" value={form.nome}
                  onChange={(e) => set('nome', e.target.value)}
                  placeholder="Ex: Yelotech Comércio Ltda"
                  className={inputClass(erros.nome)} />
              </Field>
            </div>

            <Field label="CNPJ" erro={erros.documento}>
              <input type="text" value={form.documento}
                onChange={(e) => set('documento', e.target.value)}
                placeholder="00.000.000/0000-00"
                className={inputClass(erros.documento)} />
            </Field>

            <Field label="Telefone">
              <input type="text" value={form.telefone}
                onChange={(e) => set('telefone', e.target.value)}
                placeholder="(00) 00000-0000"
                className={inputClass()} />
            </Field>

            <Field label="E-mail comercial" erro={erros.email}>
              <input type="email" value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="contato@empresa.com.br"
                className={inputClass(erros.email)} />
            </Field>

            <Field label="Site">
              <input type="text" value={form.site}
                onChange={(e) => set('site', e.target.value)}
                placeholder="www.empresa.com.br"
                className={inputClass()} />
            </Field>

          </div>
        </div>

        {/* Endereço */}
        <div>
          <SectionTitle>Endereço comercial</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-6 gap-5">

            {/* CEP */}
            <div className="sm:col-span-2">
              <Field label={cepCarregando ? 'CEP — buscando...' : 'CEP'} erro={erros['endereco.cep']}>
                <div className="relative">
                  <input type="text" value={form.endereco.cep}
                    onChange={handleCepChange}
                    placeholder="00000-000" maxLength={9}
                    className={inputClass(erros['endereco.cep'])} />
                  {cepCarregando && (
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-400 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                  )}
                </div>
              </Field>
            </div>

            {/* Logradouro */}
            <div className="sm:col-span-4">
              <Field label="Logradouro" erro={erros['endereco.logradouro']}>
                <input type="text" value={form.endereco.logradouro}
                  onChange={(e) => setEnd('logradouro', e.target.value)}
                  placeholder="Rua, Av., Travessa..."
                  className={inputClass(erros['endereco.logradouro'])} />
              </Field>
            </div>

            {/* Número */}
            <div className="sm:col-span-2">
              <Field label="Número" erro={erros['endereco.numero']}>
                <input type="text" value={form.endereco.numero}
                  onChange={(e) => setEnd('numero', e.target.value)}
                  placeholder="123"
                  className={inputClass(erros['endereco.numero'])} />
              </Field>
            </div>

            {/* Complemento */}
            <div className="sm:col-span-4">
              <Field label="Complemento">
                <input type="text" value={form.endereco.complemento}
                  onChange={(e) => setEnd('complemento', e.target.value)}
                  placeholder="Sala, Andar, Bloco..."
                  className={inputClass()} />
              </Field>
            </div>

            {/* Bairro */}
            <div className="sm:col-span-3">
              <Field label="Bairro" erro={erros['endereco.bairro']}>
                <input type="text" value={form.endereco.bairro}
                  onChange={(e) => setEnd('bairro', e.target.value)}
                  placeholder="Centro"
                  className={inputClass(erros['endereco.bairro'])} />
              </Field>
            </div>

            {/* Cidade */}
            <div className="sm:col-span-2">
              <Field label="Cidade" erro={erros['endereco.cidade']}>
                <input type="text" value={form.endereco.cidade}
                  onChange={(e) => setEnd('cidade', e.target.value)}
                  placeholder="Belo Horizonte"
                  className={inputClass(erros['endereco.cidade'])} />
              </Field>
            </div>

            {/* UF */}
            <div className="sm:col-span-1">
              <Field label="UF" erro={erros['endereco.uf']}>
                <select value={form.endereco.uf}
                  onChange={(e) => setEnd('uf', e.target.value)}
                  className={`${inputClass(erros['endereco.uf'])} cursor-pointer`}>
                  <option value="">—</option>
                  {UFS.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                </select>
              </Field>
            </div>

          </div>
        </div>

        {/* Preview — como vai aparecer no PDF */}
        <div>
          <SectionTitle>Preview no PDF</SectionTitle>
          <div className="border border-zinc-800 bg-zinc-900 px-5 py-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 bg-yellow-400 rotate-12 shrink-0" />
              <span className="text-white text-sm font-mono tracking-widest uppercase">yelohub</span>
            </div>
            <div>
              <p className="text-white text-sm font-mono font-semibold">{form.nome || '—'}</p>
              <p className="text-zinc-500 text-xs font-mono mt-0.5">CNPJ: {form.documento || '—'}</p>
              {form.email    && <p className="text-zinc-500 text-xs font-mono">{form.email}</p>}
              {form.telefone && <p className="text-zinc-500 text-xs font-mono">{form.telefone}</p>}
              {form.site     && <p className="text-zinc-500 text-xs font-mono">{form.site}</p>}
            </div>
            {form.endereco.logradouro && (
              <p className="text-zinc-600 text-[10px] font-mono border-t border-zinc-800 pt-3">
                {form.endereco.logradouro}, {form.endereco.numero}
                {form.endereco.complemento ? ` — ${form.endereco.complemento}` : ''}
                {' · '}{form.endereco.bairro}
                {' · '}{form.endereco.cidade}/{form.endereco.uf}
                {' · '}{form.endereco.cep}
              </p>
            )}
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-3 pt-2 border-t border-zinc-800">
          <button
            onClick={() => {
              setForm({
                nome:      empresa.nome,
                documento: empresa.documento,
                telefone:  empresa.telefone,
                email:     empresa.email,
                site:      empresa.site,
                endereco:  empresa.endereco,
              })
              setErros({})
              setTouched(false)
            }}
            className="border border-zinc-700 text-zinc-400 font-mono text-sm uppercase tracking-widest px-6 py-3 hover:border-zinc-500 hover:text-white transition-colors"
          >
            Descartar
          </button>
          <button
            onClick={handleSalvar}
            className="bg-yellow-400 text-zinc-950 font-mono text-sm uppercase tracking-widest px-8 py-3 hover:bg-yellow-300 transition-colors"
          >
            Salvar configurações
          </button>
        </div>

      </div>
    </div>
  )
}