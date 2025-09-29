import { parseAdapterMantenimiento } from '../../adapters/IngresoOrden/mantenimiento'
import { OrdenesService, ProgramarMantenimientoRequest } from '../../api'
import { MantenimientoFormType } from '../../validation/IngresoOrden/mantenimiento'

export const getTecnicosMantenimiento = async () => {
    // const res =
}

export const getDatosMantenimiento = async (
    id: number
): Promise<Partial<MantenimientoFormType>> => {
    // Simular llamada a API
    const res = await OrdenesService.getApiOrdenesObtenerOrden({ id })
    console.log('Respuesta de la API:', res)
    if (!res.data) throw new Error('No se encontraron datos de la orden')
    return parseAdapterMantenimiento(res.data)
}
export const postMantenimiento = async (data: MantenimientoFormType, N_ORDEN: number) => {
    const requestBody: ProgramarMantenimientoRequest = {
        tipoMantenimiento: data.tipoMantenimiento,
        prioridad: data.prioridad,
        descripcionDelProblema: data.descripcionProblema,
        condicionGeneral: data.estado,
        observaciones: data.observaciones,
    }
    const res = await OrdenesService.postApiOrdenesProgramarMantenimiento({
        id: N_ORDEN,
        requestBody,
    })
    console.log('Mantenimiento guardado:', res)
    return res.data
}

export const getInspector = async (id: number) => {
    const res = await OrdenesService.getApiOrdenesObtenerInspectorOrden({ id })
    console.log('Inspector encontrado:', res)
    return res.data
}
