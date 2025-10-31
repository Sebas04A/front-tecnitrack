import {
    AutenticacionLoginInternoRequest,
    AutenticacionLoginRequest,
    AutenticacionLoginResponse,
    AutenticacionService,
    RegistroClienteEmpresaRequest,
    RegistroClienteNaturalRequest,
} from '../api'

import {
    RegisterEmpresaFormData,
    RegisterNaturalFormData,
} from '../pages/nologin/register/register.schema'

// export const forgotPasswordRequest = async (email: string) => {
//     const requestBody = { email }
//     const response = await AutenticacionService.postApiAutenticacionSolicitarRestablecimiento({
//         requestBody,
//     })
//     return response.message
// }

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
}
// export const singupRequest = async (email: string, password: string) => {
//     const response = await getDataApiResponse(
//         AutenticacionService.postApiAutenticacionRegistro({
//             requestBody: {
//                 email,
//                 password,
//             },
//         })
//     )
//     console.log('Respuesta de la API al registrarse:', response)
//     return response
//     // try {
//     //     const response = await http.post(`/api/Autenticacion/registro`, {
//     //         username,
//     //         email,
//     //         password,
//     //     })
//     //     return response.data
//     // } catch (error) {
//     //     // console.error('Error en el registro:', error)
//     //     throw error
//     // }
// }

export const registrarNatural = async (data: RegisterNaturalFormData) => {
    const requestBody: RegistroClienteNaturalRequest = {
        email: data.email,
        password: data.password,
        tipoDocumento: data.tipoIdentificacion!,
        numeroIdentificacion: data.numeroIdentificacion!,

        nombres: data.nombres,
        apellidos: data.apellidos,
    }
    const res = await AutenticacionService.postApiAutenticacionRegistroClienteNatural({
        requestBody,
    })
    console.log('Respuesta de la API al registrar cliente natural:', res)
    return res
}
export const registrarEmpresa = async (data: RegisterEmpresaFormData) => {
    const requestBody: RegistroClienteEmpresaRequest = {
        email: data.email,
        password: data.password,
        numeroIdentificacion: data.numeroIdentificacion!,

        razonSocial: data.razonSocial,
        // nombreComercial: data.nombreComercial!,
        // nombreRepresentanteLegal: data.nombreRepresentanteLegal!,
        // telefonoEmpresa: data.telefonoEmpresa!,
    }
    const res = await AutenticacionService.postApiAutenticacionRegistroClienteEmpresa({
        requestBody,
    })
    console.log('Respuesta de la API al registrar cliente empresa:', res)
    return res
}
