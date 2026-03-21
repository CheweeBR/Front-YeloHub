import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { clearCredentials } from '../../store/slices/authSlice'

export default function SemAcesso() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(clearCredentials())
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex">
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
        <div className="absolute top-24 right-0 w-[300px] h-[300px] rounded-full bg-red-500 opacity-5 blur-2xl" />

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-sm rotate-12" />
          <span className="text-white text-2xl tracking-widest uppercase"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.2em' }}>
            yelohub
          </span>
        </div>

        <div className="relative z-10 select-none">
          <p className="text-zinc-800 leading-none mb-0"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", fontSize: 'clamp(8rem, 20vw, 18rem)', letterSpacing: '-0.02em' }}>
            403
          </p>
          <div className="flex items-center gap-3 -mt-4">
            <div className="h-px w-12 bg-yellow-400" />
            <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Acesso negado</p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-700" />
          <span className="text-zinc-600 text-xs font-mono tracking-widest">v1.0.0</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="flex lg:hidden items-center gap-2 mb-12">
            <div className="w-6 h-6 bg-yellow-400 rounded-sm rotate-12" />
            <span className="text-white text-xl tracking-widest uppercase"
              style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.2em' }}>
              yelohub
            </span>
          </div>

          <div className="inline-flex items-center gap-2 border border-red-900 bg-red-950 px-3 py-1.5 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="text-red-400 text-xs font-mono uppercase tracking-widest">Erro 403</span>
          </div>

          <h1 className="text-white text-5xl leading-tight mb-4"
            style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}>
            ACESSO<br /><span className="text-yellow-400">NEGADO</span>
          </h1>

          <p className="text-zinc-500 text-sm font-mono leading-relaxed mb-10">
            Você não tem permissão para acessar essa página.
            Entre em contato com o administrador do sistema
            caso acredite que isso é um erro.
          </p>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-zinc-700 text-xs font-mono">o que fazer?</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          <div className="space-y-3">
            <button onClick={() => navigate(-1)}
              className="w-full bg-yellow-400 text-zinc-950 font-mono text-sm uppercase tracking-widest py-3 px-6 hover:bg-yellow-300 transition-colors duration-200">
              Voltar
            </button>
            <button onClick={handleLogout}
              className="w-full bg-transparent border border-zinc-800 text-zinc-500 font-mono text-sm uppercase tracking-widest py-3 px-6 hover:border-zinc-600 hover:text-zinc-300 transition-colors duration-200">
              Sair da conta
            </button>
          </div>

          <p className="mt-8 text-zinc-700 text-xs font-mono text-center">
            Precisa de ajuda?{' '}
            <a href={`https://wa.me/${import.meta.env.VITE_TELEFONE_SUPORTE}`} target="_blank" rel="noopener noreferrer"
              className="text-yellow-600 hover:text-yellow-400 transition-colors">
              Fale com o suporte
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}