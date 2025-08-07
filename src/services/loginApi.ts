import { AutenticacionService } from '../api'
// import http from '../api/http'
import { getDataApiResponse } from '../utils/getDataApiResponse'

export const loginRequest = async (email: string, password: string) => {
    try {
        const response = (await AutenticacionService.postApiAutenticacionLogin({
            email,
            password,
        })) as unknown as string

        console.log('Respuesta de la API al iniciar sesión:', response)
        return response
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
            email,
            password,
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
