import {
    apiProvinciaToData,
    ProvinciaData,
    provinciaFormToApi,
} from '../../adapters/localidades/provincias'
import { LocalidadesService, ObjectApiResponse } from '../../api'
import { ProvinciaFormData } from '../../pages/Internos/catalogo/localidades/localidades.schema'
import { createApiSearchFunction } from '../generalGetWithFilters'

// export async function getProvincias(): Promise<ProvinciaData[]> {
//     const apiList = await LocalidadesService.getApiLocalidadesObtenerProvincias()
//     if (!apiList.data) throw new Error('No se recibieron datos de provincias')
//     return apiList.data.map(apiProvinciaToData)
// }

export const getProvincias = createApiSearchFunction<ProvinciaData, any, any, any>({
    apiServiceCall: LocalidadesService.getApiLocalidadesObtenerProvincias,
    sortKeyMapper: {},
    filterAdapter: filters => {
        return {
            ...filters,
        }
    },
    dataParser: data => {
        if (!data) return []
        return data.map(apiProvinciaToData)
    },
    entityName: 'Provincias',
})

// export async function getProvinciasPorPais(paisId: number): Promise<ProvinciaData[]> {
//     const apiList = await LocalidadesService.getApiLocalidadesObtenerProvinciasPorPais({ paisId })
//     if (!apiList.data) throw new Error('No se recibieron datos de provincias por país')
//     return apiList.data.map(apiProvinciaToData)
// }

export async function getProvinciaById(id: number): Promise<ProvinciaData> {
    const apiObj = await LocalidadesService.getApiLocalidadesObtenerProvincia({ id })
    if (!apiObj.data) throw new Error('No se recibieron datos de la provincia')
    return apiProvinciaToData(apiObj.data)
}

export async function createProvincia(values: ProvinciaFormData) {
    const requestBody = provinciaFormToApi(values)
    const created = await LocalidadesService.postApiLocalidadesCrearProvincia({ requestBody })
    return created.data!
}

export async function updateProvincia(
    id: number,
    values: ProvinciaFormData
): Promise<ProvinciaData> {
    const updated = await LocalidadesService.putApiLocalidadesActualizarProvincia({
        id,
        requestBody: provinciaFormToApi(values),
    })
    return apiProvinciaToData(updated.data!)
}

export async function deleteProvincia(id: number): Promise<ObjectApiResponse> {
    return await LocalidadesService.deleteApiLocalidadesEliminarProvincia({ id })
}
