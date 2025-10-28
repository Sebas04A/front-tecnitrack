// src/components/AuthProvider.tsx
import { useEffect, useState, ReactNode } from 'react'
import { getTokenFromResponse } from '../utils/getToken'
import {
    loginInternoRequest,
    loginRequest,
    registrarEmpresa,
    registrarNatural,
} from '../services/loginApi'
import { AuthContext, User } from './auth-context'
import { setupApi } from '../api/setupApi'
import { rolType } from '../types/usuario'
import {
    RegisterEmpresaFormData,
    RegisterFormData,
    RegisterNaturalFormData,
} from '../pages/nologin/register/register.schema'

const storageNames = {
    usuario: 'usuario',
    rol: 'rol',
    token: 'auth_token',
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem(storageNames.token)
        const usuario = localStorage.getItem(storageNames.usuario)
        const rol: rolType = localStorage.getItem(storageNames.rol) as rolType

        console.log('Token from localStorage:', token, usuario, rol)

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

    async function signupEmpresa(data: RegisterEmpresaFormData) {
        return signup(data, 'Empresa')
    }

    async function signupNatural(data: RegisterNaturalFormData) {
        return signup(data, 'Natural')
    }

    async function signup(
        data: RegisterEmpresaFormData | RegisterNaturalFormData,
        tipoCliente: 'Natural' | 'Empresa'
    ) {
        console.log('Registrando usuario:', data)
        // return
        if (!data.email || !data.password) throw new Error('Email y password son obligatorios')

        if (tipoCliente === 'Empresa') {
            const res = await registrarEmpresa(data as RegisterEmpresaFormData)
            return res
        } else if (tipoCliente === 'Natural') {
            const res = await registrarNatural(data as RegisterNaturalFormData)
            return res
        } else {
            throw new Error('Tipo de cliente inválido')
        }

        // Aquí podrías extraer token/datos si tu API lo devuelve:
        // const token = getTokenFromResponse(res)
        // localStorage.setItem('auth_token', token)
        // setUser({ email })
    }

    return (
        <AuthContext.Provider
            value={{ user, loading, login, logout, signupEmpresa, signupNatural }}
        >
            {children}
        </AuthContext.Provider>
    )
}
