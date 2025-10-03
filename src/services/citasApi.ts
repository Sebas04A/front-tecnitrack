// src/services/citasApi.ts
import { adapterCita, adapterCitaAdmin, parseCitas, parseCitasAdmin } from '../adapters/cita'
import {
    AdministradorService,
    CitasService,
    CrearOrdenConNumeroRequest,
    OrdenesService,
    OrdenResponse,
} from '../api'

import { CitaDataCrud, citaDataCompleta } from '../types/cita'
import { CitaDataForm } from '../validation/cita.schema'

export const obtenerCitas = async (): Promise<citaDataCompleta[]> => {
    try {
        const response = await CitasService.getApiCitasObtenerCitas()
        console.log('Respuesta de la API al obtener citas:', response)
        if (!response.data || !Array.isArray(response.data)) {
            console.error('Datos de citas no válidos:', response.data)
            return []
        }
        const data = parseCitas(response.data)
        return data
    } catch (error) {
        console.error('Error al obtener las citas:', error)
        // Devolvemos un array vacío en caso de un error de red o de servidor
        return []
    }
}
export const crearCita = async (cita: citaDataCompleta): Promise<any> => {
    const citaConvertida = adapterCita(cita)
    console.log('Datos de la cita a crear:', citaConvertida)
    try {
        const response = await CitasService.postApiCitasCrearCita({
            requestBody: citaConvertida,
        })
        console.log('Respuesta de la API al crear cita:', response)
        return response.data
    } catch (error) {
        console.error('Error al crear la cita:', error)
        throw error
    }
}

// ---------------------ADMIN
export const obtenerCitasAdmin = async (): Promise<CitaDataCrud[]> => {
    const res = await AdministradorService.getApiAdministradorListaCitasClientes()
    console.log('Citas obtenidas (admin):', res)
    if (!res.data || !Array.isArray(res.data)) {
        console.error('Datos de citas no válidos (admin):', res.data)
        return []
    }
    return parseCitasAdmin(res.data)
}

export const createCitaAdmin = async (cita: CitaDataForm): Promise<any> => {
    console.log('Creando cita (admin):', cita)
    const requestBody = adapterCitaAdmin(cita)
    const res = await AdministradorService.postApiAdministradorCrearCitaCliente({ requestBody })
    return res
}
// export const updateCitaAdmin = async (cita:): Promise<any> => {
// if (!cita.id) throw new Error('ID de la cita es requerido para actualizar')
// const requestBody = adapterCitaAdmin(cita)
// const res = await AdministradorService.put
// return res
// }
export const eliminarCitaAdmin = async (citaId: number): Promise<any> => {
    console.log(citaId)
    throw new Error('Funcionalidad no implementada')
    // const res = await AdministradorService.deleteApiAdministradorEliminarCitaCliente({
    // citaId: citaId,
    // })
    // return res
}

export const crearOrden = async (citaId: number): Promise<OrdenResponse> => {
    const requestBody: CrearOrdenConNumeroRequest = {
        citaId: citaId,
    }
    const res = await OrdenesService.postApiOrdenesCrearOrdenConNumero({ requestBody })
    console.log('Orden creada:', res)
    if (!res.data) {
        throw new Error('No se recibió data al crear la orden')
    }
    return res.data
}
export const obtenerOrden = async (citaId: number): Promise<OrdenResponse | null> => {
    const res = await OrdenesService.getApiOrdenesObtenerOrden({ id: citaId })
    console.log('Orden obtenida por cita:', res)
    if (!res.data) {
        throw new Error('No se recibió data al obtener la orden')
    }
    // if (!res.data.id) throw new Error('No se recibió id de la orden')
    return res.data
}
