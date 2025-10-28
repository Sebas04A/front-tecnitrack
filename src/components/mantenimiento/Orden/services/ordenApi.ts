import { parseAdapterOrden } from '../adapters/orden'
import {
    AgregarDatosFaltantesOrdenRequest,
    EditarDatosOrdenRequest,
    GestionOrdenesService,
    OrdenesService,
} from '../../../../api'
import { OrderFormData } from '../../../../validation/IngresoOrden/orden'

export const getInformacionOrden = async (id: number): Promise<OrderFormData> => {
    // const response = await OrdenesService.getApiOrdenesObtenerInformacionPreviaCita({ citaId })
    const response = await OrdenesService.getApiOrdenesObtenerOrden({ id })
    console.log('Respuesta de la API:', response)

    if (!response.data) throw new Error('No se recibió data de la orden')
    return parseAdapterOrden(response.data)
}
export const postOrden = async (data: OrderFormData, N_ORDEN: number) => {
    const requestBody: AgregarDatosFaltantesOrdenRequest = {
        fechaIngreso: data.fechaIngreso,
        registradoPor: data.registradoPor,
        inspectorId: Number(data.inspeccionadoPor) || undefined,
        tallerBodegaDestino: data.tallerBodegaDestino ?? '',
        observacionesIngreso: data.observacionesIngreso,
    }
    const res = await OrdenesService.putApiOrdenesAgregarDatosOrden({
        id: N_ORDEN,
        requestBody,
    })

    return res.data
}
export const updateOrden = async (data: OrderFormData, N_ORDEN: number) => {
    const requestBody: EditarDatosOrdenRequest = {
        fechaIngreso: data.fechaIngreso,
        registradoPor: data.registradoPor,
        inspectorId: Number(data.inspeccionadoPor),
        tallerBodegaDestino: data.tallerBodegaDestino ?? '',
        observacionesIngreso: data.observacionesIngreso,
    }
    const res = await GestionOrdenesService.putApiGestionOrdenesEditarDatosOrden({
        id: N_ORDEN,
        requestBody,
    })
    return res.data
}
