import api from './api'
import { tokenStorage } from '../../utils/tokenStorage'
import { stripDocument } from '../../utils/formatters'

interface LoginPayload {
  document: string
  password: string
}

interface LoginResponse {
  token: string
  user: {
    id: number
    name: string
    role: string
  }
}

export const authService = {
  login: async (payload: LoginPayload) => {
    const { data } = await api.post<LoginResponse>('/auth/login', {
      document: stripDocument(payload.document),
      password: payload.password,
    })
    tokenStorage.set(data.token)
    return data
  },

  logout: async () => {
    await api.post('/auth/logout')
    tokenStorage.remove()
  },
}