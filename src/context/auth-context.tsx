// src/contexts/auth-context.tsx
import { createContext } from 'react'

export interface User {
    usuario: string
    rol: 'usuario' | 'interno'
}

export interface AuthContextData {
    user: User | null
    loading: boolean
    login: (email: string, password: string, interno: boolean) => Promise<void>
    logout: () => void
    signup: (email: string, password: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined)
