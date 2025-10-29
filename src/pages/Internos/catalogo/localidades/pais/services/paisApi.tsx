import { apiToData, formToApi, PaisData } from '../models/paises'
import { LocalidadesService, ObjectApiResponse, PaisDto } from '../../../../../../api'
import { PaisFormData } from '../models/paises.schema'
import { create } from 'framer-motion/client'
import { createApiSearchFunction } from '../../../../../../services/generalGetWithFilters'
import {
    FetchParams,
    FetchReturn,
} from '../../../../../../components/crudGrid/helper/fetchWithFilters'

// export async function getPaises(): Promise<PaisData[]> {
//     const apiList = await LocalidadesService.getApiLocalidadesObtenerPaises()
//     if (!apiList.data) throw new Error('No se recibieron datos de países')
//     return apiList.data.map(apiToData)
// }
export const getPaises = createApiSearchFunction<PaisData, PaisDto, any, any>({
    apiServiceCall: LocalidadesService.getApiLocalidadesObtenerPaises,
    sortKeyMapper: {},
    filterAdapter: filters => {
        return {
            ...filters,
        }
    },
    dataParser: data => {
        if (!data) return []
        return data.map(apiToData)
    },
    entityName: 'Países',
})
export async function getPaisById(id: number): Promise<PaisData> {
    const apiObj = await LocalidadesService.getApiLocalidadesObtenerPais({ id })
    if (!apiObj.data) throw new Error('No se recibieron datos del país')
    return apiToData(apiObj.data)
}

export async function createPais(values: PaisFormData) {
    const requestBody = formToApi(values)
    const created = await LocalidadesService.postApiLocalidadesCrearPais({ requestBody })
    return created.data!
}

export async function updatePais(id: number, values: PaisFormData): Promise<PaisData> {
    const updated = await LocalidadesService.putApiLocalidadesActualizarPais({
        id,
        requestBody: formToApi(values),
    })
    return apiToData(updated.data!)
}

export async function deletePais(id: number): Promise<ObjectApiResponse> {
    return await LocalidadesService.deleteApiLocalidadesEliminarPais({ id })
}

export const getPaisesCrud = (
    paisId?: number
): ((filters: FetchParams<any, PaisData>) => Promise<FetchReturn<PaisData>>) => {
    return getPaises
    // return paisId ? [await getPaisById(paisId)] : await getPaises
    // return data.map(apiToData)
}
