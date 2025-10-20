import {
    ActualizarEstadoComponenteRequest,
    OrdenesService,
    RegistrarEstadoComponenteRequest,
} from '../../api'
import { ComponenteFormData } from '../../validation/IngresoOrden/componenteEstado'
import { ComponenteData } from '../../components/mantenimiento/Equipo/InformacionEquipo/ComponentesCrud'
import { parseComponentesTable } from '../../adapters/IngresoOrden/componente'
import { FetchParams, FetchReturn } from '../../components/crudGrid/helper/fetchWithFilters'
import { parsePagination } from '../../adapters/pagination'
import { createApiSearchFunction } from '../generalGetWithFilters'

export const getComponenteDisponible = async (id: number) => {
    const res = await OrdenesService.getApiOrdenesObtenerComponentesDisponiblesOrden({
        ordenId: id,
    })
    console.log('Componentes disponibles encontrados:', res)
    return res.data
}

export const getEstadosComponentes = async (
    filters: FetchParams<any, any>,
    N_ORDEN: number
): Promise<FetchReturn<ComponenteData>> => {
    console.log(
        'Obteniendo estados de componentes para orden ID:',
        N_ORDEN,
        'con filtros:',
        filters
    )
    const res = await OrdenesService.getApiOrdenesObtenerEstadosComponentesOrden({
        ordenId: N_ORDEN,
    })
    console.log('Estados de componentes encontrados:', res)
    if (!res.data) throw new Error('No se encontraron estados de componentes')
    return {
        items: parseComponentesTable(res.data),
        pagination: parsePagination(res.pagination ?? {}),
    }
}
// export const getEstadosComponentes = createApiSearchFunction({
//     apiServiceCall: async params =>
//         await OrdenesService.getApiOrdenesObtenerEstadosComponentesOrden({
//             ordenId: id,
//         }),
//     sortKeyMapper: {},
//     dataParser: parseComponentesTable,
//     entityName: 'Estados de Componentes',
// })

// export const getEstadosComponentes =
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
