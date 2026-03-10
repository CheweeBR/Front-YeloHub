import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import { formatCPF, formatCNPJ } from '../../utils/formatters'

type DocType = 'cpf' | 'cnpj'

export default function Login() {
  const [docType, setDocType] = useState<DocType>('cpf')
  const [document, setDocument] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login, loading, error } = useLogin()

  const maxLength = docType === 'cpf' ? 14 : 18
  const placeholder = docType === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'

  const handleDocTypeChange = (type: DocType) => {
    setDocType(type)
    setDocument('') // limpa ao trocar o tipo
  }

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = docType === 'cpf'
      ? formatCPF(e.target.value)
      : formatCNPJ(e.target.value)
    setDocument(formatted)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(document, password)
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex">

      {/* Painel esquerdo — decorativo */}
      <div className="hidden lg:flex w-2/3 relative overflow-hidden bg-zinc-900 flex-col justify-between p-12">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(234,179,8,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(234,179,8,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-yellow-400 opacity-5 blur-3xl" />
        <div className="absolute top-24 right-0 w-[300px] h-[300px] rounded-full bg-yellow-400 opacity-5 blur-2xl" />

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-sm rotate-12" />
          <span
            className="text-white text-2xl tracking-widest uppercase"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.2em' }}
          >
            yelohub
          </span>
        </div>

        <div className="relative z-10">
          <p className="text-yellow-400 text-4xl uppercase tracking-[0.3em] mb-4 font-mono">
            Plataforma de gestão
          </p>
          <h2
            className="text-white text-5xl leading-tight mb-6"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}
          >
            CONECTE.<br />
            GERENCIE.<br />
            <span className="text-yellow-400">VENDA.</span>
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs font-mono">
            Acesse sua conta para gerenciar pedidos, catálogos e equipes em um só lugar.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-700" />
          <span className="text-zinc-600 text-xs font-mono tracking-widest">v1.0.0</span>
        </div>
      </div>

      {/* Painel direito — formulário */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">

          {/* Logo mobile */}
          <div className="flex lg:hidden items-center gap-2 mb-12">
            <div className="w-6 h-6 bg-yellow-400 rounded-sm rotate-12" />
            <span
              className="text-white text-xl tracking-widest uppercase"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.2em' }}
            >
              yelohub
            </span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h1
              className="text-white text-4xl mb-2"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}
            >
              ENTRAR
            </h1>
            <p className="text-zinc-500 text-sm font-mono">
              Use seu CPF ou CNPJ e senha para acessar
            </p>
          </div>

          {/* Toggle CPF / CNPJ */}
          <div className="flex mb-6 border border-zinc-800">
            <button
              type="button"
              onClick={() => handleDocTypeChange('cpf')}
              className={`
                flex-1 py-2 text-xs font-mono uppercase tracking-widest transition-colors duration-200
                ${docType === 'cpf'
                  ? 'bg-yellow-400 text-zinc-950'
                  : 'bg-transparent text-zinc-500 hover:text-zinc-300'}
              `}
            >
              Pessoa Física
            </button>
            <button
              type="button"
              onClick={() => handleDocTypeChange('cnpj')}
              className={`
                flex-1 py-2 text-xs font-mono uppercase tracking-widest transition-colors duration-200
                ${docType === 'cnpj'
                  ? 'bg-yellow-400 text-zinc-950'
                  : 'bg-transparent text-zinc-500 hover:text-zinc-300'}
              `}
            >
              Pessoa Jurídica
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* CPF / CNPJ */}
            <div className="group">
              <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                {docType === 'cpf' ? 'CPF' : 'CNPJ'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={document}
                  onChange={handleDocumentChange}
                  placeholder={placeholder}
                  maxLength={maxLength}
                  required
                  className="
                    w-full bg-zinc-900 border border-zinc-800 text-white
                    px-4 py-3 text-sm font-mono rounded-none
                    outline-none placeholder-zinc-700
                    focus:border-yellow-400 focus:bg-zinc-900
                    transition-colors duration-200
                  "
                />
                <div className="absolute left-0 bottom-0 h-px w-0 bg-yellow-400 group-focus-within:w-full transition-all duration-300" />
              </div>
            </div>

            {/* Senha */}
            <div className="group">
              <label className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="
                    w-full bg-zinc-900 border border-zinc-800 text-white
                    px-4 py-3 pr-12 text-sm font-mono rounded-none
                    outline-none placeholder-zinc-700
                    focus:border-yellow-400
                    transition-colors duration-200
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-yellow-400 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M3 3l18 18M10.477 10.477A3 3 0 0013.523 13.523M6.343 6.343A8 8 0 004.17 9.17M17.657 17.657A8 8 0 0019.83 14.83M9.88 4.122A9.003 9.003 0 0121 12a8.935 8.935 0 01-1.342 4.727M3 12a8.935 8.935 0 011.342-4.727" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
                <div className="absolute left-0 bottom-0 h-px w-0 bg-yellow-400 group-focus-within:w-full transition-all duration-300" />
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="border border-red-900 bg-red-950 px-4 py-3">
                <p className="text-red-400 text-xs font-mono">{error}</p>
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full bg-yellow-400 text-zinc-950 font-mono text-sm
                uppercase tracking-widest py-3 px-6 mt-2
                hover:bg-yellow-300 active:bg-yellow-500
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-colors duration-200
                flex items-center justify-center gap-2
              "
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Entrando...
                </>
              ) : (
                'Acessar sistema'
              )}
            </button>

          </form>

          {/* Rodapé */}
          <p className="mt-8 text-zinc-700 text-xs font-mono text-center">
            Problemas para acessar?{' '}
            <a
              href={`https://wa.me/${import.meta.env.VITE_TELEFONE_SUPORTE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-600 hover:text-yellow-400 transition-colors"
            >
              Fale com o suporte
            </a>
          </p>

        </div>
      </div>
    </div>
  )
}