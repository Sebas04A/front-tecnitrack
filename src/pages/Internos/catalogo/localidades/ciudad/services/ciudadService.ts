import { LocalidadesService, ObjectApiResponse } from '../../../../../../api'

import { createApiSearchFunction } from '../../../../../../services/generalGetWithFilters'

import { CiudadFormData } from '../../localidades.schema'
import { apiCiudadToData, ciudadFormToApi } from '../adapters/ciudad'
import { CiudadData } from '../models.ts/ciudad'

export const getCiudades = createApiSearchFunction<CiudadData, any, any, any>({
    apiServiceCall: LocalidadesService.getApiLocalidadesObtenerCiudades,
    sortKeyMapper: {},
    filterAdapter: filters => {
        return {
            ...filters,
        }
    },
    dataParser: data => {
        if (!data) return []
        return data.map(apiCiudadToData)
    },
    entityName: 'Ciudades',
})
export async function getCiudadById(id: number): Promise<CiudadData> {
    const apiObj = await LocalidadesService.getApiLocalidadesObtenerCiudad({ id })
    if (!apiObj.data) throw new Error('No se recibieron datos de la ciudad')
    return apiCiudadToData(apiObj.data)
}

export async function createCiudad(values: CiudadFormData) {
    const requestBody = ciudadFormToApi(values)
    const created = await LocalidadesService.postApiLocalidadesCrearCiudad({ requestBody })
    return created.data!
}

export async function updateCiudad(id: number, values: CiudadFormData): Promise<CiudadData> {
    const updated = await LocalidadesService.putApiLocalidadesActualizarCiudad({
        id,
        requestBody: ciudadFormToApi(values),
    })
    return apiCiudadToData(updated.data!)
}

export async function deleteCiudad(id: number): Promise<ObjectApiResponse> {
    return await LocalidadesService.deleteApiLocalidadesEliminarCiudad({ id })
}
