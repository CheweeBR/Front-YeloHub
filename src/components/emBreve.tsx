export default function EmBreve({ titulo }: { titulo: string }) {
  return (
    <div className="min-h-[100dvh] bg-zinc-950 flex items-center justify-center">
      <div className="text-center">
        <p className="text-yellow-400 text-xs font-mono uppercase tracking-[0.3em] mb-2">Em construção</p>
        <h1
          className="text-white text-5xl uppercase"
          style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", letterSpacing: '0.05em' }}
        >
          {titulo}
        </h1>
        <div className="mt-6 h-px w-24 bg-zinc-700 mx-auto" />
      </div>
    </div>
  )
}