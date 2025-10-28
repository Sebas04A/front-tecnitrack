import { AutenticacionService, RestablecerPasswordRequest } from '../../../../api'

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
