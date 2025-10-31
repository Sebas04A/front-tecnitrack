import {
    ActualizarEstadoComponenteRequest,
    OrdenesService,
    RegistrarEstadoComponenteRequest,
} from '../../../../../api'

import { parseComponentesTable } from '../adapters/componente'
import { ComponenteFormData } from '../models/componenteEstado'

import { ComponenteData } from '../ComponentesCrud'
import { createApiSearchFunction } from '../../../../../services/generalGetWithFilters'

export const getComponenteDisponible = async (id: number) => {
    const res = await OrdenesService.getApiOrdenesObtenerComponentesDisponiblesOrden({
        ordenId: id,
    })
    console.log('Componentes disponibles encontrados:', res)
    return res.data
}

export const getEstadosComponentes = (N_ORDEN: number) =>
    createApiSearchFunction<ComponenteData, any, any, any>({
        apiServiceCall: async params =>
            await OrdenesService.getApiOrdenesObtenerEstadosComponentesOrden({
                ordenId: N_ORDEN,
                ...params,
            }),
        sortKeyMapper: {},
        dataParser: parseComponentesTable,
        entityName: 'Estados de Componentes',
        filterAdapter: filters => ({
            ...filters,
        }),
    })

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
