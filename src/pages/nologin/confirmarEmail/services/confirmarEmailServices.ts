import { AutenticacionService } from '../../../../api'

export const confirmarEmail = async (token: string) => {
    return await AutenticacionService.getApiAutenticacionConfirmarEmail({ token })
}
