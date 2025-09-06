// src/hooks/useAuth.ts
import { useContext } from 'react'
import { AuthContext } from '../context/auth-context'

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
    return ctx
}
