import { AutenticacionService } from '../../../../api'

export const solicitarRestablecimiento = async (email: string) => {
    const res = await AutenticacionService.postApiAutenticacionSolicitarRestablecimiento({
        requestBody: { email },
    })
    return res
}
