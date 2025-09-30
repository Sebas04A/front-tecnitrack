// src/contexts/auth-context.tsx
import { createContext } from 'react'
import { RegisterEmpresaFormData, RegisterNaturalFormData } from '../validation/register.schema'

export interface User {
    usuario: string
    rol: 'usuario' | 'interno'
}

export interface AuthContextData {
    user: User | null
    loading: boolean
    login: (email: string, password: string, interno: boolean) => Promise<void>
    logout: () => void
    signupEmpresa: (data: RegisterEmpresaFormData) => Promise<any>
    signupNatural: (data: RegisterNaturalFormData) => Promise<any>
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined)
