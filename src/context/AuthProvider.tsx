// src/components/AuthProvider.tsx
import { useEffect, useState, ReactNode } from 'react'
import { getTokenFromResponse } from '../utils/getToken'
import { loginInternoRequest, loginRequest, singupRequest } from '../services/loginApi'
import { AuthContext, User } from './auth-context'
import { setupApi } from '../api/setupApi'
import { rolType } from '../types/usuario'

const storageNames = {
    usuario: 'usuario',
    rol: 'rol',
    token: 'auth_token',
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.warn('Abriendo provider')
        const token = localStorage.getItem(storageNames.token)
        const usuario = localStorage.getItem(storageNames.usuario)
        const rol: rolType = localStorage.getItem(storageNames.rol) as rolType

        console.log('Token from localStorage:', token)
        console.log('Usuario from localStorage:', usuario)
        console.log(localStorage.getItem(storageNames.rol))

        if (token && usuario && rol) {
            setUser({ usuario, rol })
            setLoading(false)
        } else {
            setUser(null)
            setLoading(false)
        }
        setupApi()

        const onForceLogout = () => logout()
        window.addEventListener('force-logout', onForceLogout)
        return () => window.removeEventListener('force-logout', onForceLogout)
    }, [])

    async function login(usuario: string, password: string, interno: boolean) {
        let res
        if (interno) {
            res = await loginInternoRequest(usuario, password)
        } else {
            res = await loginRequest(usuario, password)
        }
        const token = getTokenFromResponse(res)
        if (!token) {
            throw new Error('Login failed: token not found')
        }
        localStorage.setItem(storageNames.token, token)
        localStorage.setItem(storageNames.usuario, usuario)
        const rol: rolType = interno ? 'interno' : 'usuario'
        localStorage.setItem(storageNames.rol, rol)
        setUser({ usuario, rol })
        setupApi()
    }

    function logout() {
        localStorage.removeItem(storageNames.rol)
        localStorage.removeItem(storageNames.token)
        localStorage.removeItem(storageNames.usuario)
        setUser(null)
        setupApi() // Reset API setup without token
    }

    async function signup(email: string, password: string) {
        const res = await singupRequest(email, password)
        // Aquí podrías extraer token/datos si tu API lo devuelve:
        // const token = getTokenFromResponse(res)
        // localStorage.setItem('auth_token', token)
        // setUser({ email })
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    )
}
