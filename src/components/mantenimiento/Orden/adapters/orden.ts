import { OrdenResponse } from '../../../../api'
import { OrderFormData } from '../models/orden'

export const parseAdapterOrden = (data: OrdenResponse): OrderFormData => {
    return {
        numeroOrden: data.numeroOrden ?? '',
        fechaIngreso: data.fechaIngreso ?? '',
        registradoPor: data.registradoPor ?? '',
        // inspeccionadoPor:  data.inspeccionadoPor ?? null,
        inspeccionadoPor: null,
        tallerBodegaDestino: data.tallerBodegaDestino ?? '',
        observacionesIngreso: data.observacionesIngreso ?? '',
    }
}
