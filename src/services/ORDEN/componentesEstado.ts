import {
    ActualizarEstadoComponenteRequest,
    OrdenesService,
    RegistrarEstadoComponenteRequest,
} from '../../api'
import { ComponenteFormData } from '../../validation/IngresoOrden/componenteEstado'
import { ComponenteData } from '../../components/mantenimiento/InformacionEquipo/ComponentesCrud'
import { parseComponentesTable } from '../../adapters/IngresoOrden/componente'

export const getComponenteDisponible = async (id: number) => {
    const res = await OrdenesService.getApiOrdenesObtenerComponentesDisponiblesOrden({
        ordenId: id,
    })
    console.log('Componentes disponibles encontrados:', res)
    return res.data
}

export const getEstadosComponentes = async ({ id }: { id: number }): Promise<ComponenteData[]> => {
    console.log('Obteniendo estados de componentes para orden ID:', id)
    const res = await OrdenesService.getApiOrdenesObtenerEstadosComponentesOrden({ ordenId: id })
    console.log('Estados de componentes encontrados:', res)
    if (!res.data) throw new Error('No se encontraron estados de componentes')
    return parseComponentesTable(res.data)
}
export const postEstadosComponentes = async (data: ComponenteFormData, N_ORDEN: number) => {
    const requestBody: RegistrarEstadoComponenteRequest = {
        parteSubtipoId: Number(data.componente),
        estadoComponente: data.condicion,
        severidadDaño: data.severidad || 'Ninguna',
        descripcion: data.observaciones,
    }

    const res = await OrdenesService.postApiOrdenesCrearEstadoComponenteOrden({
        ordenId: N_ORDEN,
        requestBody,
    })
    console.log('Estado del componente guardado:', res)
    return res.data
}

export const putEstadosComponentes = async (id: number, data: ComponenteFormData) => {
    const requestBody: ActualizarEstadoComponenteRequest = {
        estadoComponente: data.condicion,
        severidadDaño: data.severidad || 'Ninguna',
        descripcion: data.observaciones,
    }
    const res = await OrdenesService.putApiOrdenesActualizarEstadoComponente({
        id,
        requestBody,
    })
    console.log('Estado del componente actualizado:', res)
    return res.data
}

export const deleteEstadosComponentes = async (id: number) => {
    const res = await OrdenesService.deleteApiOrdenesEliminarEstadoComponente({ id })
    console.log('Estado del componente eliminado:', res)
    return res.data
}
