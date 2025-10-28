import { getCatalogo } from '../../../Internos/catalogo/generales/services/catalogos'

export const getTipoMantenimiento = async (): Promise<{ label: string; value: string }[]> => {
    const response = await getCatalogo('tipoMantenimiento')
    response.push({ label: 'Otro', value: 'otro' })
    return response
}
