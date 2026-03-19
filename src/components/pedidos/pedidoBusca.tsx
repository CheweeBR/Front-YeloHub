interface PedidosBuscaProps {
  buscarPedido:    string
  buscarCliente:   string
  buscarVendedor:  string
  onPedido:    (v: string) => void
  onCliente:   (v: string) => void
  onVendedor:  (v: string) => void
  showVendedor?: boolean
}

function InputBusca({
  value,
  onChange,
  placeholder,
  width = 'w-full sm:w-44',
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  width?: string
}) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 pointer-events-none"
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`bg-zinc-900 border border-zinc-800 text-white text-xs font-mono pl-9 pr-4 py-2.5 outline-none focus:border-yellow-400 transition-colors placeholder-zinc-600 ${width}`}
      />
    </div>
  )
}

export function PedidosBusca({
  buscarPedido,
  buscarCliente,
  buscarVendedor,
  onPedido,
  onCliente,
  onVendedor,
  showVendedor = true,
}: PedidosBuscaProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <InputBusca
        value={buscarPedido}
        onChange={onPedido}
        placeholder="Nº do pedido..."
        width="w-full sm:w-36"
      />
      <InputBusca
        value={buscarCliente}
        onChange={onCliente}
        placeholder="Cliente ou CPF/CNPJ..."
      />
      {showVendedor && (
        <InputBusca
          value={buscarVendedor}
          onChange={onVendedor}
          placeholder="Vendedor ou CPF..."
        />
      )}
    </div>
  )
}