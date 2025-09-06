import { apiToData, formToApi, PaisData } from '../../adapters/localidades/paises'
import { LocalidadesService, ObjectApiResponse } from '../../api'
import { PaisFormData } from '../../validation/localidades.schema'

export async function getPaises(): Promise<PaisData[]> {
    const apiList = await LocalidadesService.getApiLocalidadesObtenerPaises()
    if (!apiList.data) throw new Error('No se recibieron datos de países')
    return apiList.data.map(apiToData)
}

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
