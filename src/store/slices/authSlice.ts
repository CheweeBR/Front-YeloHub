import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../types/auth.types'

interface AuthState {
  user: User | null
  token: string | null
}

const getUserFromStorage = (): User | null => {
  try {
    const raw = sessionStorage.getItem('user')
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

const initialState: AuthState = {
  user: getUserFromStorage(),
  token: sessionStorage.getItem('token'),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      sessionStorage.setItem('user', JSON.stringify(action.payload.user))
      sessionStorage.setItem('token', action.payload.token)
    },
    clearCredentials: (state) => {
      state.user = null
      state.token = null
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
    },
  },
})

export const { setCredentials, clearCredentials } = authSlice.actions
export default authSlice.reducer