import { OrdenResponse } from '../../../../api'
import { MantenimientoFormType } from '../models/mantenimiento'

export const parseAdapterMantenimiento = (data: OrdenResponse): Partial<MantenimientoFormType> => {
    return {
        tipoMantenimiento: data.tipoMantenimientoSegunCita || '',
        descripcionProblema: data.motivoIngresoSegunCita || '',
    }
}
