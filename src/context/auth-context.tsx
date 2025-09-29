// src/contexts/auth-context.tsx
import { createContext } from 'react'
import { RegisterFormData } from '../validation/register.schema'

export interface User {
    usuario: string
    rol: 'usuario' | 'interno'
}

export interface AuthContextData {
    user: User | null
    loading: boolean
    login: (email: string, password: string, interno: boolean) => Promise<void>
    logout: () => void
    signup: (data: RegisterFormData) => Promise<any>
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined)
