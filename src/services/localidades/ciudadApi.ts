// src/services/ciudadApi.ts
import { apiCiudadToData, CiudadData, ciudadFormToApi } from '../../adapters/localidades/ciudad'
import { LocalidadesService, ObjectApiResponse } from '../../api'
import { CiudadFormData } from '../../validation/localidades.schema'

export async function getCiudades(): Promise<CiudadData[]> {
    const apiList = await LocalidadesService.getApiLocalidadesObtenerCiudades()
    if (!apiList.data) throw new Error('No se recibieron datos de ciudades')
    return apiList.data.map(apiCiudadToData)
}

export async function getCiudadesPorProvincia(provinciaId: number): Promise<CiudadData[]> {
    const apiList = await LocalidadesService.getApiLocalidadesObtenerCiudadesPorProvincia({
        provinciaId,
    })
    if (!apiList.data) throw new Error('No se recibieron datos de ciudades por provincia')
    return apiList.data.map(apiCiudadToData)
}

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
