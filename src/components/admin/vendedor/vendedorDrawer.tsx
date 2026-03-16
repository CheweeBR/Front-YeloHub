import { useEffect, useState } from 'react'
import type { User, VendedorTipo } from '../../../types/auth.types'
import { formatCPF, formatCNPJ, stripDocument } from '../../../utils/formatters'
import { documentoJaExiste } from '../../../mock/users.mock'

export interface VendedorFormData {
  name: string
  email: string
  document: string
  vendedorTipo: VendedorTipo
  password: string
}

interface VendedorDrawerProps {
  aberto: boolean
  vendedor: User | null
  onFechar: () => void
  onSalvar: (data: VendedorFormData) => void
}

const vazio: VendedorFormData = {
  name: '',
  email: '',
  document: '',
  vendedorTipo: 'tabelado',
  password: '',
}

type DocType = 'cpf' | 'cnpj'

const detectDocType = (doc: string): DocType =>
  stripDocument(doc).length <= 11 ? 'cpf' : 'cnpj'

export function VendedorDrawer({ aberto, vendedor, onFechar, onSalvar }: VendedorDrawerProps) {
  const isEdicao = !!vendedor
  const [form, setForm] = useState<VendedorFormData>(vazio)
  const [docType, setDocType] = useState<DocType>('cpf')
  const [erros, setErros] = useState<Partial<Record<keyof VendedorFormData, string>>>({})
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (aberto) {
      if (vendedor) {
        setForm({
          name: vendedor.name,
          email: vendedor.email,
          document: vendedor.document,
          vendedorTipo: vendedor.vendedorTipo ?? 'tabelado',
          password: '',
        })
        setDocType(detectDocType(vendedor.document))
      } else {
        setForm(vazio)
        setDocType('cpf')
      }
      setErros({})
      setTouched(false)
    }
  }, [aberto, vendedor])

  const set = <K extends keyof VendedorFormData>(key: K, value: VendedorFormData[K]) => {
    const next = { ...form, [key]: value }
    setForm(next)
    if (touched) validar(next)
  }

  const handleDocTypeChange = (type: DocType) => {
    setDocType(type)
    set('document', '')
  }

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = docType === 'cpf'
      ? formatCPF(e.target.value)
      : formatCNPJ(e.target.value)
    set('document', formatted)
  }

  const validar = (data: VendedorFormData): boolean => {
    const e: typeof erros = {}

    if (!data.name.trim()) e.name = 'Nome obrigatório'

    if (!data.email.trim()) e.email = 'E-mail obrigatório'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'E-mail inválido'

    const digits = stripDocument(data.document)
    if (!digits) e.document = 'Documento obrigatório'
    else if (digits.length !== 11 && digits.length !== 14) e.document = 'CPF ou CNPJ inválido'
    else if (documentoJaExiste(data.document, vendedor?.id)) e.document = 'Documento já cadastrado'

    if (!isEdicao && !data.password.trim()) e.password = 'Senha obrigatória'

    setErros(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    setTouched(true)
    if (!validar(form)) return
    onSalvar(form)
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
            {isEdicao ? 'Editar vendedor' : 'Novo vendedor'}
          </span>
          <button onClick={onFechar} className="text-zinc-500 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">

          <Field label="Nome completo" erro={erros.name}>
            <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)}
              placeholder="Ex: João Silva" className={inputClass(erros.name)} />
          </Field>

          <Field label="E-mail" erro={erros.email}>
            <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)}
              placeholder="joao@empresa.com" className={inputClass(erros.email)} />
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

          <Field label="Tipo de precificação">
            <div className="flex border border-zinc-700">
              <button type="button" onClick={() => set('vendedorTipo', 'tabelado')}
                className={`flex-1 py-2.5 text-xs font-mono uppercase tracking-widest transition-colors ${form.vendedorTipo === 'tabelado' ? 'bg-yellow-400 text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'}`}>
                Tabelado
              </button>
              <button type="button" onClick={() => set('vendedorTipo', 'livre')}
                className={`flex-1 py-2.5 text-xs font-mono uppercase tracking-widest transition-colors ${form.vendedorTipo === 'livre' ? 'bg-yellow-400 text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'}`}>
                Livre
              </button>
            </div>
            <p className="text-zinc-600 text-[10px] font-mono mt-1">
              {form.vendedorTipo === 'tabelado'
                ? 'Vende pelo preço de tabela, sem editar valores'
                : 'Pode definir o preço de cada item no pedido'}
            </p>
          </Field>

          {!isEdicao && (
            <Field label="Senha inicial" erro={erros.password}>
              <input type="text" value={form.password} onChange={(e) => set('password', e.target.value)}
                placeholder="Mínimo 4 caracteres" className={inputClass(erros.password)} />
            </Field>
          )}

          {isEdicao && (
            <div className="border border-zinc-800 bg-zinc-800/30 px-4 py-3">
              <p className="text-zinc-500 text-xs font-mono">
                Para redefinir a senha use o botão <span className="text-yellow-400">Reset de senha</span> na listagem.
              </p>
            </div>
          )}
        </div>

        <div className="shrink-0 px-6 py-5 border-t border-zinc-800 flex gap-3">
          <button onClick={onFechar} className="flex-1 border border-zinc-700 text-zinc-400 font-mono text-sm uppercase tracking-widest py-3 hover:border-zinc-500 hover:text-white transition-colors">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="flex-1 bg-yellow-400 text-zinc-950 font-mono text-sm uppercase tracking-widest py-3 hover:bg-yellow-300 transition-colors">
            {isEdicao ? 'Salvar' : 'Criar vendedor'}
          </button>
        </div>
      </div>
    </>
  )
}