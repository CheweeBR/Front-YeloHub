import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { stripDocument } from '../utils/formatters'
import { authMock } from '../mock'

export function useLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const login = async (document: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const data = await authMock.login({
        document: stripDocument(document),
        password,
      })
      sessionStorage.setItem('token', data.token)
      navigate('/catalogo')
      return data
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}