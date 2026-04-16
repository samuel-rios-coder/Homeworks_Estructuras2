import { useMemo, useState, type ReactNode } from 'react'
import { AuthContext, type AuthContextValue } from './auth-context'
import { registeredUsers } from './mockUsers'
import type { AuthUser } from './types'

const STORAGE_KEY = 'parcial02-auth-user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const rawUser = localStorage.getItem(STORAGE_KEY)
    return rawUser ? (JSON.parse(rawUser) as AuthUser) : null
  })

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (correo: string, clave: string) => {
        const foundUser = registeredUsers.find(
          (registeredUser) =>
            registeredUser.correo.toLowerCase() === correo.toLowerCase() &&
            registeredUser.clave === clave,
        )

        if (!foundUser) {
          return {
            ok: false,
            mensaje: 'Contraseña incorrecta o correo no registrado.',
          }
        }

        const authUser = {
          nombre: foundUser.nombre,
          correo: foundUser.correo,
        }

        setUser(authUser)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser))

        return {
          ok: true,
          mensaje: `Bienvenid@, ${foundUser.nombre}.`,
        }
      },
      logout: () => {
        setUser(null)
        localStorage.removeItem(STORAGE_KEY)
      },
      isRegisteredEmail: (correo: string) =>
        registeredUsers.some(
          (registeredUser) =>
            registeredUser.correo.toLowerCase() === correo.toLowerCase(),
        ),
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
