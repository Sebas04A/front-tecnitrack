// src/services/citasApi.ts
import {
    adapterCita,
    parseCitas,
    parseCitasCliente,
} from '../pages/Internos/Citas/Crud/adapter/cita'
import { adapterFiltersParams } from '../adapters/filtersToParams'
import { parsePagination } from '../adapters/pagination'
import {
    CitasService,
    CrearOrdenConNumeroRequest,
    EditarCitaRequest,
    OrdenesService,
    OrdenResponse,
} from '../api'

import { FetchParams, FetchReturn } from '../components/crudGrid/helper/fetchWithFilters'

import { citaDataCompleta } from '../types/cita'
import { CitasClienteDataType } from '../types/cliente/Cita'
import { CitaClienteDataForm } from '../validation/cita.schema'

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

// ---------------------ADMIN

export const obtenerOrden = async (citaId: number): Promise<OrdenResponse | null> => {
    const res = await OrdenesService.getApiOrdenesObtenerOrden({ id: citaId })
    console.log('Orden obtenida por cita:', res)
    if (!res.data) {
        throw new Error('No se recibió data al obtener la orden')
    }
    // if (!res.data.id) throw new Error('No se recibió id de la orden')
    return res.data
}
