export const stripDocument = (value: string) => value.replace(/\D/g, '')

export const formatCPF = (value: string) => {
  const digits = stripDocument(value)
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export const formatCNPJ = (value: string) => {
  const digits = stripDocument(value)
  return digits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
}

export const detectDocumentType = (value: string) => {
  const digits = stripDocument(value)
  if (digits.length <= 11) return 'cpf'
  return 'cnpj'
}

export const formatDocument = (value: string) => {
  const type = detectDocumentType(value)
  if (type === 'cpf') return formatCPF(value)
  return formatCNPJ(value)
}