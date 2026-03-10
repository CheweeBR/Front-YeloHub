import { mockUsers } from './users.mock'

interface LoginPayload {
  document: string
  password: string
}

export const authMock = {
  login: async (payload: LoginPayload) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const match = mockUsers.find(
      (u) => u.document === payload.document && u.password === payload.password
    )

    if (!match) throw new Error('Documento ou senha inválidos')

    return { token: match.token, user: match.user }
  },
}