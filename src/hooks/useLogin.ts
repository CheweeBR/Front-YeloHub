import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { stripDocument } from '../utils/formatters'
import { authMock } from '../mock/users.mock'
import { getRouteByRole } from '../utils/redirectByRole'
import { useAuth } from '../context/authContext'

export function useLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { setAuth } = useAuth()

  const login = async (document: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await authMock.login({
        document: stripDocument(document),
        password,
      })
      setAuth(data.user, data.token)
      navigate(getRouteByRole(data.user.role))
      return data
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}