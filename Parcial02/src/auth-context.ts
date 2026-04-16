import { createContext, useContext } from 'react'
import type { AuthUser } from './types'

export interface AuthContextValue {
  user: AuthUser | null
  login: (correo: string, clave: string) => {
    ok: boolean
    mensaje: string
  }
  logout: () => void
  isRegisteredEmail: (correo: string) => boolean
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider.')
  }

  return context
}
