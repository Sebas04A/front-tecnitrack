import {
    AutenticacionLoginInternoRequest,
    AutenticacionLoginRequest,
    AutenticacionLoginResponse,
    AutenticacionService,
    RestablecerPasswordRequest,
} from '../api'
// import http from '../api/http'
import { getDataApiResponse } from '../utils/getDataApiResponse'

export const forgotPasswordRequest = async (email: string) => {
    const requestBody = { email }
    const response = await AutenticacionService.postApiAutenticacionSolicitarRestablecimiento({
        requestBody,
    })
    return response.message
}
export const resetPasswordRequest = async (token: string, nuevaPassword: string) => {
    const requestBody: RestablecerPasswordRequest = {
        token,
        nuevaPassword,
    }
    const response = await AutenticacionService.postApiAutenticacionRestablecerPassword({
        requestBody,
    })
    return response.data
}
export const loginInternoRequest = async (usuario: string, password: string) => {
    const requestBody: AutenticacionLoginInternoRequest = {
        username: usuario,
        password,
    }
    const res = await AutenticacionService.postApiAutenticacionLoginInterno({
        requestBody,
    })
    if (!res.data) throw new Error('Login failed: no response data')
    return res.data
}
export const loginRequest = async (
    email: string,
    password: string
): Promise<AutenticacionLoginResponse> => {
    try {
        const body: AutenticacionLoginRequest = {
            email,
            password,
        }
        const response = await AutenticacionService.postApiAutenticacionLogin({
            requestBody: body,
        })
        const data = response.data
        console.log('Respuesta de la API al iniciar sesión:', data)
        return data ?? {}
    } catch (error) {
        console.error('Error al iniciar sesión:', error)
        throw error
    }
    // try {
    //     const response = await http.post(`/api/Autenticacion/login`, {
    //         email,
    //         password,
    //     })
    //     return response.data
    // } catch (error) {
    //     // console.error('Error en el login:', error)
    //     throw error
    // }
}
export const singupRequest = async (email: string, password: string) => {
    const response = await getDataApiResponse(
        AutenticacionService.postApiAutenticacionRegistro({
            requestBody: {
                email,
                password,
            },
        })
    )
    console.log('Respuesta de la API al registrarse:', response)
    return response
    // try {
    //     const response = await http.post(`/api/Autenticacion/registro`, {
    //         username,
    //         email,
    //         password,
    //     })
    //     return response.data
    // } catch (error) {
    //     // console.error('Error en el registro:', error)
    //     throw error
    // }
}
