export interface Empresa {
  id:         number
  nome:       string
  documento:  string   // CNPJ
  telefone:   string
  email:      string
  site:       string
  endereco: {
    logradouro:   string
    numero:       string
    complemento:  string
    bairro:       string
    cidade:       string
    uf:           string
    cep:          string
  }
}

export type EmpresaFormData = Omit<Empresa, 'id'>

let empresas: Empresa[] = [
  {
    id:        1,
    nome:      'Yelotech Comércio Ltda',
    documento: '11.111.111/1111-11',
    telefone:  '(31) 99999-0000',
    email:     'contato@yelotech.com.br',
    site:      'www.yelotech.com.br',
    endereco: {
      logradouro:  'Av. do Contorno',
      numero:      '1234',
      complemento: 'Sala 501',
      bairro:      'Funcionários',
      cidade:      'Belo Horizonte',
      uf:          'MG',
      cep:         '30110-080',
    },
  },
]

export function getEmpresaById(id: number): Empresa | null {
  return empresas.find((e) => e.id === id) ?? null
}

export function updateEmpresa(id: number, data: EmpresaFormData): Empresa | null {
  const idx = empresas.findIndex((e) => e.id === id)
  if (idx === -1) return null
  const updated = { ...empresas[idx], ...data }
  empresas = empresas.map((e) => (e.id === id ? updated : e))
  return updated
}