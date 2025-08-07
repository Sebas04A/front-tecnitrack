import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { getTokenFromResponse } from '../utils/getToken'
import { loginRequest, singupRequest } from '../services/loginApi'

interface User {
    email: string
}
interface AuthContextData {
    user: User | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    signup: (email: string, password: string) => Promise<void>
}
const AuthContext = createContext<AuthContextData | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    // Al montar, tratar de recuperar sesión
    useEffect(() => {
        const token = localStorage.getItem('auth_token')
        if (token) {
            setUser({ email: '' })
            // http.get<User>('/me')
            //     .then(res => setUser(res.data))
            //     .catch(() => localStorage.removeItem('auth_token'))
            //     .finally(() => setLoading(false))

            setLoading(false)
        } else {
            setUser(null)
            setLoading(false)
        }

        // manejo de logout forzado
        const onForceLogout = () => logout()
        window.addEventListener('force-logout', onForceLogout)
        return () => window.removeEventListener('force-logout', onForceLogout)
    }, [])

    async function login(email: string, password: string) {
        console.log('Attempting login with:', { email, password })
        const res = await loginRequest(email, password)
        console.log('Login response:', res)
        const token = getTokenFromResponse(res)
        if (!token) {
            throw new Error('Login failed: token not found')
        }
        localStorage.setItem('auth_token', token)
        setUser({ email })
    }

    function logout() {
        localStorage.removeItem('auth_token')
        setUser(null)
    }
    async function signup(email: string, password: string) {
        console.log('Attempting signup with:', { email, password })
        const res = await singupRequest(email, password)
        console.log('Signup response:', res)

        // localStorage.setItem('auth_token', token)
        // setUser({ email }) // Aquí podrías guardar más datos del usuario si los recibes
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook de consumo
export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
    return ctx
}
