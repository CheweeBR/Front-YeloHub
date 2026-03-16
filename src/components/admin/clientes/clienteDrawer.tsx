import { useEffect, useState } from 'react'
import type { User, Endereco } from '../../../types/auth.types'
import { formatCPF, formatCNPJ, stripDocument } from '../../../utils/formatters'
import { documentoJaExiste } from '../../../mock/users.mock'

export interface ClienteFormData {
  name: string
  email: string
  document: string
  endereco?: Endereco
}

interface ClienteDrawerProps {
  aberto: boolean
  cliente: User | null
  onFechar: () => void
  onSalvar: (data: ClienteFormData) => void
}

type DocType = 'cpf' | 'cnpj'

const detectDocType = (doc: string): DocType =>
  stripDocument(doc).length <= 11 ? 'cpf' : 'cnpj'

const enderecoVazio: Endereco = {
  logradouro: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  uf: '',
  cep: '',
}

const vazio: ClienteFormData = {
  name: '',
  email: '',
  document: '',
  endereco: enderecoVazio,
}

const UFS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC',
  'SP','SE','TO',
]

export function ClienteDrawer({ aberto, cliente, onFechar, onSalvar }: ClienteDrawerProps) {
  const isEdicao = !!cliente
  const [form, setForm] = useState<ClienteFormData>(vazio)
  const [docType, setDocType] = useState<DocType>('cpf')
  const [erros, setErros] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState(false)
  const [cepCarregando, setCepCarregando] = useState(false)

  useEffect(() => {
    if (aberto) {
      if (cliente) {
        setForm({
          name: cliente.name,
          email: cliente.email,
          document: cliente.document,
          endereco: cliente.endereco ?? enderecoVazio,
        })
        setDocType(detectDocType(cliente.document))
      } else {
        setForm(vazio)
        setDocType('cpf')
      }
      setErros({})
      setTouched(false)
    }
  }, [aberto, cliente])

  const set = <K extends keyof ClienteFormData>(key: K, value: ClienteFormData[K]) => {
    const next = { ...form, [key]: value }
    setForm(next)
    if (touched) validar(next)
  }

  const setEnd = (key: keyof Endereco, value: string) => {
    const next = { ...form, endereco: { ...enderecoVazio, ...form.endereco, [key]: value } }
    setForm(next)
    if (touched) validar(next)
  }

  const handleDocTypeChange = (type: DocType) => {
    setDocType(type)
    set('document', '')
  }

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = docType === 'cpf' ? formatCPF(e.target.value) : formatCNPJ(e.target.value)
    set('document', formatted)
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
              // preserva campos que o ViaCEP não retorna
              numero:      prev.endereco?.numero      ?? '',
              complemento: prev.endereco?.complemento ?? '',
              // campos preenchidos pelo ViaCEP
              cep:         formatted,
              logradouro:  data.logradouro ?? '',
              bairro:      data.bairro     ?? '',
              cidade:      data.localidade ?? '',
              uf:          data.uf         ?? '',
            },
          }))
        }
      } catch { /* silencia erro de rede */ }
      finally { setCepCarregando(false) }
    }
  }

  const validar = (data: ClienteFormData): boolean => {
    const e: Record<string, string> = {}

    if (!data.name.trim()) e.name = 'Nome obrigatório'

    if (!data.email.trim()) e.email = 'E-mail obrigatório'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'E-mail inválido'

    const digits = stripDocument(data.document)
    if (!digits) e.document = 'Documento obrigatório'
    else if (digits.length !== 11 && digits.length !== 14) e.document = 'CPF ou CNPJ inválido'
    else if (documentoJaExiste(data.document, cliente?.id)) e.document = 'Documento já cadastrado'

    const end = data.endereco
    if (end) {
      const algumPreenchido = end.cep || end.logradouro || end.numero || end.bairro || end.cidade || end.uf
      if (algumPreenchido) {
        if (!end.cep.replace(/\D/g, '')) e['endereco.cep']        = 'CEP obrigatório'
        if (!end.logradouro.trim())       e['endereco.logradouro'] = 'Logradouro obrigatório'
        if (!end.numero.trim())           e['endereco.numero']     = 'Número obrigatório'
        if (!end.bairro.trim())           e['endereco.bairro']     = 'Bairro obrigatório'
        if (!end.cidade.trim())           e['endereco.cidade']     = 'Cidade obrigatória'
        if (!end.uf)                      e['endereco.uf']         = 'UF obrigatória'
      }
    }

    setErros(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    setTouched(true)
    if (!validar(form)) return

    const end = form.endereco
    const enderecoPreenchido = end && (end.cep || end.logradouro || end.numero || end.bairro || end.cidade || end.uf)
      ? end : undefined

    onSalvar({ ...form, endereco: enderecoPreenchido })
  }

  const Field = ({ label, children, erro }: { label: string; children: React.ReactNode; erro?: string }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">{label}</label>
      {children}
      {erro && <p className="text-red-400 text-[10px] font-mono">{erro}</p>}
    </div>
  )

  const inputClass = (erro?: string) =>
    `w-full bg-zinc-800 border ${erro ? 'border-red-800 focus:border-red-500' : 'border-zinc-700 focus:border-yellow-400'} text-white text-sm font-mono px-3 py-2.5 outline-none transition-colors placeholder-zinc-600`

  return (
    <>
      <div onClick={onFechar} className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${aberto ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />

      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900 border-l border-zinc-800 z-50 flex flex-col transition-transform duration-300 ease-in-out ${aberto ? 'translate-x-0' : 'translate-x-full'}`}>

        <div className="flex items-center justify-between px-6 h-14 border-b border-zinc-800 shrink-0">
          <span className="text-white text-xl uppercase" style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.1em' }}>
            {isEdicao ? 'Editar cliente' : 'Novo cliente'}
          </span>
          <button onClick={onFechar} className="text-zinc-500 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">

          <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest border-b border-zinc-800 pb-2">
            Dados do cliente
          </p>

          <Field label="Nome / Razão social" erro={erros.name}>
            <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)}
              placeholder="Ex: Açougue do Zé Ltda" className={inputClass(erros.name)} />
          </Field>

          <Field label="E-mail" erro={erros.email}>
            <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)}
              placeholder="contato@empresa.com" className={inputClass(erros.email)} />
          </Field>

          <Field label="Documento" erro={erros.document}>
            <div className="flex border border-zinc-700 mb-1">
              <button type="button" onClick={() => handleDocTypeChange('cpf')}
                className={`flex-1 py-2 text-xs font-mono uppercase tracking-widest transition-colors ${docType === 'cpf' ? 'bg-yellow-400 text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'}`}>
                CPF
              </button>
              <button type="button" onClick={() => handleDocTypeChange('cnpj')}
                className={`flex-1 py-2 text-xs font-mono uppercase tracking-widest transition-colors ${docType === 'cnpj' ? 'bg-yellow-400 text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'}`}>
                CNPJ
              </button>
            </div>
            <input type="text" value={form.document} onChange={handleDocumentChange}
              placeholder={docType === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'}
              maxLength={docType === 'cpf' ? 14 : 18}
              className={inputClass(erros.document)} />
          </Field>

          <p className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest border-b border-zinc-800 pb-2 pt-2">
            Endereço
          </p>

          <Field label={cepCarregando ? 'CEP — buscando...' : 'CEP'} erro={erros['endereco.cep']}>
            <div className="relative">
              <input type="text" value={form.endereco?.cep ?? ''} onChange={handleCepChange}
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

          <Field label="Logradouro" erro={erros['endereco.logradouro']}>
            <input type="text" value={form.endereco?.logradouro ?? ''} onChange={(e) => setEnd('logradouro', e.target.value)}
              placeholder="Rua, Av., Travessa..." className={inputClass(erros['endereco.logradouro'])} />
          </Field>

          <div className="grid grid-cols-3 gap-3">
            <Field label="Número" erro={erros['endereco.numero']}>
              <input type="text" value={form.endereco?.numero ?? ''} onChange={(e) => setEnd('numero', e.target.value)}
                placeholder="123" className={inputClass(erros['endereco.numero'])} />
            </Field>
            <div className="col-span-2">
              <Field label="Complemento">
                <input type="text" value={form.endereco?.complemento ?? ''} onChange={(e) => setEnd('complemento', e.target.value)}
                  placeholder="Apto, Sala..." className={inputClass()} />
              </Field>
            </div>
          </div>

          <Field label="Bairro" erro={erros['endereco.bairro']}>
            <input type="text" value={form.endereco?.bairro ?? ''} onChange={(e) => setEnd('bairro', e.target.value)}
              placeholder="Centro" className={inputClass(erros['endereco.bairro'])} />
          </Field>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <Field label="Cidade" erro={erros['endereco.cidade']}>
                <input type="text" value={form.endereco?.cidade ?? ''} onChange={(e) => setEnd('cidade', e.target.value)}
                  placeholder="Belo Horizonte" className={inputClass(erros['endereco.cidade'])} />
              </Field>
            </div>
            <Field label="UF" erro={erros['endereco.uf']}>
              <select value={form.endereco?.uf ?? ''} onChange={(e) => setEnd('uf', e.target.value)}
                className={`${inputClass(erros['endereco.uf'])} cursor-pointer`}>
                <option value="">—</option>
                {UFS.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
              </select>
            </Field>
          </div>

          <div className="border border-zinc-800 bg-zinc-800/30 px-4 py-3 flex items-start gap-2.5">
            <svg className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-zinc-500 text-xs font-mono leading-relaxed">
              Clientes não têm acesso ao sistema por padrão. O cadastro é usado apenas para vínculo com pedidos.
            </p>
          </div>
        </div>

        <div className="shrink-0 px-6 py-5 border-t border-zinc-800 flex gap-3">
          <button onClick={onFechar} className="flex-1 border border-zinc-700 text-zinc-400 font-mono text-sm uppercase tracking-widest py-3 hover:border-zinc-500 hover:text-white transition-colors">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="flex-1 bg-yellow-400 text-zinc-950 font-mono text-sm uppercase tracking-widest py-3 hover:bg-yellow-300 transition-colors">
            {isEdicao ? 'Salvar' : 'Criar cliente'}
          </button>
        </div>
      </div>
    </>
  )
}