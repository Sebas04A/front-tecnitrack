import { parseAdapterInformacionGeneral } from '../../adapters/IngresoOrden/informacionGeneral'
import { OrdenesService } from '../../api'

export const getInformacionGeneralOrden = async (citaId: number) => {
    const res = await OrdenesService.getApiOrdenesObtenerInformacionPreviaCita({ citaId })
    // Simular llamada a API
    console.log('Respuesta de la API:', res)
    // if (!res.data) throw new Error('No se encontraron datos de la orden')
    return parseAdapterInformacionGeneral(res.data)
}
export const getInformacionUsuarioActual = async () => {
    const res = await OrdenesService.getApiOrdenesObtenerNombreClienteLogueado()
    return res.data
}
