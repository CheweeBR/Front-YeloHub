import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'
import type { Pedido } from '../../types/pedidos.types'
import type { User } from '../../types/auth.types'
import { getEmpresaById } from '../../mock/empresa.mock'

// ── Paleta ────────────────────────────────────────────────────────────────────
const C = {
  black:    '#09090B',
  dark:     '#18181B',
  mid:      '#27272A',
  border:   '#3F3F46',
  muted:    '#71717A',
  sub:      '#A1A1AA',
  white:    '#FFFFFF',
  yellow:   '#FACC15',
  offWhite: '#F4F4F5',
  light:    '#E4E4E7',
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const fmtDataHora = (iso: string) =>
  new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

const statusConfig: Record<string, { label: string }> = {
  aguardando_aprovacao: { label: 'Aguardando aprovação' },
  em_preparo:           { label: 'Em preparo'           },
  saiu_para_entrega:    { label: 'Saiu para entrega'    },
  entregue:             { label: 'Entregue'             },
  pagamento_pendente:   { label: 'Pagamento pendente'   },
  concluido:            { label: 'Concluído'            },
  recusado:             { label: 'Recusado'             },
  cancelado:            { label: 'Cancelado'            },
}

// ── Estilos ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    fontFamily:      'Courier',
    fontSize:        10,
    backgroundColor: C.white,
    color:           C.black,
    paddingBottom:   56,
  },

  // ── Cabeçalho escuro ──
  headerBg: {
    backgroundColor: C.dark,
    paddingHorizontal: 48,
    paddingTop:  32,
    paddingBottom: 28,
  },
  headerTopRow: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'flex-start',
    marginBottom:   20,
  },

  // Logo
  logoRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           8,
    marginBottom:  6,
  },
  logoSquare: {
    width:           10,
    height:          10,
    backgroundColor: C.yellow,
  },
  logoText: {
    fontSize:    18,
    fontFamily:  'Courier-Bold',
    color:       C.white,
    letterSpacing: 3,
  },

  // Dados da empresa (lado esquerdo do header)
  empresaNome: {
    fontSize:   13,
    fontFamily: 'Courier-Bold',
    color:      C.white,
    marginBottom: 4,
  },
  empresaLinha: {
    fontSize:  8,
    color:     C.muted,
    marginTop: 2,
    letterSpacing: 0.3,
  },
  empresaDoc: {
    fontSize:  8,
    color:     C.sub,
    marginTop: 3,
    letterSpacing: 0.5,
  },

  // Pedido (lado direito do header)
  headerRight: {
    alignItems: 'flex-end',
  },
  pedidoLabel: {
    fontSize:     7,
    color:        C.muted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom:  4,
  },
  pedidoNum: {
    fontSize:   22,
    fontFamily: 'Courier-Bold',
    color:      C.white,
    letterSpacing: 1,
  },
  pedidoData: {
    fontSize:  8,
    color:     C.muted,
    marginTop: 4,
    letterSpacing: 0.3,
  },

  // Divisor interno do header
  headerDivider: {
    borderBottomWidth: 1,
    borderBottomColor: C.mid,
    marginVertical:    16,
  },

  // Endereço da empresa (linha inferior do header)
  empresaEndRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           16,
  },
  empresaEndItem: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           4,
  },
  empresaEndLabel: {
    fontSize:     7,
    color:        C.muted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  empresaEndValue: {
    fontSize:  8,
    color:     C.sub,
    letterSpacing: 0.2,
  },

  // ── Faixa de status ──
  statusBar: {
    backgroundColor: C.yellow,
    paddingHorizontal: 48,
    paddingVertical:    8,
    flexDirection:    'row',
    alignItems:       'center',
    justifyContent:   'space-between',
  },
  statusLabel: {
    fontSize:     7,
    fontFamily:   'Courier-Bold',
    color:        C.black,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  statusValue: {
    fontSize:   9,
    fontFamily: 'Courier-Bold',
    color:      C.black,
    letterSpacing: 0.5,
  },

  // ── Corpo ──
  body: {
    paddingHorizontal: 48,
    paddingTop:        28,
  },

  sectionTitle: {
    fontSize:     7,
    color:        C.muted,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom:  10,
    fontFamily:   'Courier-Bold',
  },

  // ── Cards de pessoas ──
  infoRow: {
    flexDirection: 'row',
    gap:           12,
    marginBottom:  24,
  },
  infoCard: {
    flex:            1,
    backgroundColor: C.offWhite,
    padding:         14,
    borderLeftWidth: 3,
    borderLeftColor: C.yellow,
  },
  infoCardLabel: {
    fontSize:     7,
    color:        C.muted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom:  5,
  },
  infoCardNome: {
    fontSize:   11,
    fontFamily: 'Courier-Bold',
    color:      C.black,
    marginBottom: 3,
  },
  infoCardSub: {
    fontSize: 9,
    color:    '#52525B',
  },

  // ── Tabela ──
  tableHeader: {
    flexDirection:   'row',
    backgroundColor: C.dark,
    paddingVertical:   8,
    paddingHorizontal: 12,
  },
  tableRow: {
    flexDirection:    'row',
    paddingVertical:  10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.light,
  },
  tableRowAlt: {
    backgroundColor: '#FAFAFA',
  },

  colProduto:  { flex: 5 },
  colGrupo:    { flex: 2 },
  colQtd:      { flex: 1, textAlign: 'right' },
  colUnit:     { flex: 2, textAlign: 'right' },
  colSubtotal: { flex: 2, textAlign: 'right' },

  thText: {
    fontSize:     7,
    color:        C.sub,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontFamily:   'Courier-Bold',
  },
  tdProduto: { fontSize: 10, color: C.black, fontFamily: 'Courier-Bold' },
  tdGrupo:   { fontSize:  8, color: C.muted },
  tdQtd:     { fontSize: 10, color: '#52525B', textAlign: 'right' },
  tdUnit:    { fontSize: 10, color: '#52525B', textAlign: 'right' },
  tdSubtotal:{ fontSize: 10, color: C.black,   textAlign: 'right', fontFamily: 'Courier-Bold' },

  // ── Bloco de total ──
  totalWrapper: {
    backgroundColor:  C.dark,
    paddingHorizontal: 12,
    paddingVertical:   14,
    flexDirection:    'row',
    justifyContent:   'space-between',
    alignItems:       'center',
  },
  totalMeta: {
    flexDirection: 'row',
    gap:           24,
  },
  totalMetaItem: { alignItems: 'flex-start' },
  totalMetaLabel: {
    fontSize:     7,
    color:        C.muted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom:  2,
  },
  totalMetaValue: {
    fontSize:   10,
    color:      C.sub,
    fontFamily: 'Courier-Bold',
  },
  totalRight:  { alignItems: 'flex-end' },
  totalLabel: {
    fontSize:     7,
    color:        C.muted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom:  4,
  },
  totalValue: {
    fontSize:   22,
    fontFamily: 'Courier-Bold',
    color:      C.yellow,
  },

  // ── Rodapé fixo ──
  footer: {
    position:         'absolute',
    bottom:            0,
    left:              0,
    right:             0,
    backgroundColor:  C.offWhite,
    paddingHorizontal: 48,
    paddingVertical:   10,
    flexDirection:    'row',
    justifyContent:   'space-between',
    alignItems:       'center',
    borderTopWidth:    1,
    borderTopColor:   C.light,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           6,
  },
  footerDot: {
    width:           4,
    height:          4,
    backgroundColor: C.yellow,
    borderRadius:    2,
  },
  footerText: {
    fontSize:  7,
    color:     C.muted,
    letterSpacing: 0.3,
  },
  footerPage: {
    fontSize:  7,
    color:     C.muted,
    letterSpacing: 0.3,
  },
})

// ── Componente ────────────────────────────────────────────────────────────────
interface PedidoPDFProps {
  pedido: Pedido
  user:   User
}

export function PedidoPDF({ pedido, user }: PedidoPDFProps) {
  const empresa    = getEmpresaById(user.empresaId)
  const totalItens = pedido.itens.reduce((s, i) => s + i.quantidade, 0)
  const status     = statusConfig[pedido.status] ?? { label: pedido.status }
  const temCliente  = user.role !== 'cliente' && !!pedido.clienteNome
  const temVendedor = !!pedido.vendedorNome

  // Endereço formatado em uma linha
  const enderecoFormatado = empresa?.endereco
    ? `${empresa.endereco.logradouro}, ${empresa.endereco.numero}${empresa.endereco.complemento ? ` — ${empresa.endereco.complemento}` : ''} · ${empresa.endereco.bairro} · ${empresa.endereco.cidade}/${empresa.endereco.uf} · ${empresa.endereco.cep}`
    : null

  return (
    <Document title={pedido.pedidoNum ?? `Pedido #${pedido.id}`} author={empresa?.nome ?? 'yelohub'}>
      <Page size="A4" style={s.page}>

        {/* ── Cabeçalho escuro ── */}
        <View style={s.headerBg}>

          {/* Linha superior: logo+empresa à esquerda, número do pedido à direita */}
          <View style={s.headerTopRow}>

            {/* Esquerda: logo + dados da empresa */}
            <View>
              <View style={s.logoRow}>
                <View style={s.logoSquare} />
                <Text style={s.logoText}>YELOHUB</Text>
              </View>

              {empresa && (
                <>
                  <Text style={s.empresaNome}>{empresa.nome}</Text>
                  <Text style={s.empresaDoc}>CNPJ: {empresa.documento}</Text>
                  {empresa.email && (
                    <Text style={s.empresaLinha}>{empresa.email}</Text>
                  )}
                  {empresa.telefone && (
                    <Text style={s.empresaLinha}>{empresa.telefone}</Text>
                  )}
                  {empresa.site && (
                    <Text style={s.empresaLinha}>{empresa.site}</Text>
                  )}
                </>
              )}
            </View>

            {/* Direita: número e data do pedido */}
            <View style={s.headerRight}>
              <Text style={s.pedidoLabel}>Pedido</Text>
              <Text style={s.pedidoNum}>{pedido.pedidoNum ?? `#${pedido.id}`}</Text>
              {pedido.criadoEm && (
                <Text style={s.pedidoData}>{fmtDataHora(pedido.criadoEm)}</Text>
              )}
            </View>
          </View>

          {/* Endereço da empresa na linha inferior do header */}
          {enderecoFormatado && (
            <>
              <View style={s.headerDivider} />
              <View style={s.empresaEndRow}>
                <Text style={s.empresaEndLabel}>Endereço</Text>
                <Text style={s.empresaEndValue}>{enderecoFormatado}</Text>
              </View>
            </>
          )}
        </View>

        {/* ── Faixa de status ── */}
        <View style={s.statusBar}>
          <Text style={s.statusLabel}>Status do pedido</Text>
          <Text style={s.statusValue}>● {status.label.toUpperCase()}</Text>
        </View>

        {/* ── Corpo ── */}
        <View style={s.body}>

          {/* Cards de pessoas */}
          {(temCliente || temVendedor) && (
            <View style={{ marginBottom: 24 }}>
              <Text style={s.sectionTitle}>Partes envolvidas</Text>
              <View style={s.infoRow}>
                {temCliente && (
                  <View style={s.infoCard}>
                    <Text style={s.infoCardLabel}>Cliente</Text>
                    <Text style={s.infoCardNome}>{pedido.clienteNome}</Text>
                    {pedido.clienteDocument && (
                      <Text style={s.infoCardSub}>{pedido.clienteDocument}</Text>
                    )}
                  </View>
                )}
                {temVendedor && (
                  <View style={s.infoCard}>
                    <Text style={s.infoCardLabel}>Vendedor</Text>
                    <Text style={s.infoCardNome}>{pedido.vendedorNome}</Text>
                    {pedido.vendedorDocument && (
                      <Text style={s.infoCardSub}>{pedido.vendedorDocument}</Text>
                    )}
                  </View>
                )}
                {(temCliente ? 1 : 0) + (temVendedor ? 1 : 0) === 1 && (
                  <View style={{ flex: 1 }} />
                )}
              </View>
            </View>
          )}

          {/* Seção de itens */}
          <Text style={s.sectionTitle}>
            Itens do pedido — {pedido.itens.length} {pedido.itens.length === 1 ? 'produto' : 'produtos'} · {totalItens} unidades
          </Text>

          {/* Cabeçalho da tabela */}
          <View style={s.tableHeader}>
            <View style={s.colProduto}><Text style={s.thText}>Produto</Text></View>
            <View style={s.colGrupo}><Text style={s.thText}>Grupo</Text></View>
            <View style={s.colQtd}><Text style={[s.thText, { textAlign: 'right' }]}>Qtd</Text></View>
            <View style={s.colUnit}><Text style={[s.thText, { textAlign: 'right' }]}>Unit.</Text></View>
            <View style={s.colSubtotal}><Text style={[s.thText, { textAlign: 'right' }]}>Subtotal</Text></View>
          </View>

          {/* Linhas */}
          {pedido.itens.map((item, idx) => (
            <View
              key={item.produto.id}
              style={[s.tableRow, idx % 2 !== 0 ? s.tableRowAlt : {}]}
              wrap={false}
            >
              <View style={s.colProduto}>
                <Text style={s.tdProduto}>{item.produto.nome}</Text>
              </View>
              <View style={s.colGrupo}>
                <Text style={s.tdGrupo}>{item.produto.grupo}</Text>
              </View>
              <View style={s.colQtd}>
                <Text style={s.tdQtd}>{item.quantidade}</Text>
              </View>
              <View style={s.colUnit}>
                <Text style={s.tdUnit}>{fmt(item.precoUnitario)}</Text>
              </View>
              <View style={s.colSubtotal}>
                <Text style={s.tdSubtotal}>{fmt(item.precoUnitario * item.quantidade)}</Text>
              </View>
            </View>
          ))}

          {/* Total */}
          <View style={s.totalWrapper}>
            <View style={s.totalMeta}>
              <View style={s.totalMetaItem}>
                <Text style={s.totalMetaLabel}>Produtos</Text>
                <Text style={s.totalMetaValue}>{pedido.itens.length}</Text>
              </View>
              <View style={s.totalMetaItem}>
                <Text style={s.totalMetaLabel}>Unidades</Text>
                <Text style={s.totalMetaValue}>{totalItens}</Text>
              </View>
            </View>
            <View style={s.totalRight}>
              <Text style={s.totalLabel}>Total do pedido</Text>
              <Text style={s.totalValue}>{fmt(pedido.total)}</Text>
            </View>
          </View>

        </View>

        {/* ── Rodapé fixo ── */}
        <View style={s.footer} fixed>
          <View style={s.footerLeft}>
            <View style={s.footerDot} />
            <Text style={s.footerText}>
              Gerado em {new Date().toLocaleString('pt-BR')}
              {empresa ? ` · ${empresa.nome}` : ' · yelohub'}
            </Text>
          </View>
          <Text
            style={s.footerPage}
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
          />
        </View>

      </Page>
    </Document>
  )
}