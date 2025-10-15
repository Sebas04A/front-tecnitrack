// src/services/citasApi.ts
import {
    adapterCita,
    adapterCitaAdmin,
    adapterFiltersCita,
    mapperCitaAdminDataToApi,
    parseCitas,
    parseCitasAdmin,
    parseCitasCliente,
} from '../adapters/cita'
import { adapterFiltersParams } from '../adapters/filtersToParams'
import { parsePagination } from '../adapters/pagination'
import {
    AdministradorService,
    CitasService,
    CrearOrdenConNumeroRequest,
    EditarCitaClienteRequest,
    EditarCitaRequest,
    GestionCitasService,
    MisCitasResponse,
    OrdenesService,
    OrdenResponse,
} from '../api'
import { CitasFilters, CitasFiltersType } from '../components/crudGrid/cruds/Citas/CitasFilters'
import { FetchParams, FetchReturn } from '../components/crudGrid/helper/fetchWithFilters'

import { CitaClienteData, CitaDataCrud, citaDataCompleta } from '../types/cita'
import { CitasClienteDataType } from '../types/cliente/Cita'
import { CitaClienteDataForm, CitaDataForm } from '../validation/cita.schema'

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
export const obtenerCitasCliente = async (
    filters: FetchParams<any, CitasClienteDataType>
): Promise<FetchReturn<CitasClienteDataType>> => {
    const res = await CitasService.getApiCitasMisCitas(adapterFiltersParams(filters))
    if (!res.data) throw new Error('No se encontraron datos')
    return { items: parseCitasCliente(res.data), pagination: parsePagination(res.pagination ?? {}) }
    // return parseCitasCliente(res.data)
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
export const editCita = async (cita: CitaClienteDataForm): Promise<any> => {
    const requestBody: EditarCitaRequest = {
        fechaHora: cita.fechaHoraInicio,
        tipoMantenimiento: cita.tipoMantenimiento ?? 'Otro',
        observaciones: cita.descripcion,
    }
    if (!cita.id) throw new Error('ID de la cita es requerido')
    const res = await CitasService.putApiCitasEditarCita({
        id: cita.id,
        requestBody,
    })
    return res
}
export const eliminarCita = async (cita: CitasClienteDataType): Promise<any> => {
    const res = await CitasService.deleteApiCitasCancelarCita({ id: cita.id })
    return res
}

// ---------------------ADMIN
export const obtenerCitasAdmin = async (
    filters: FetchParams<CitasFiltersType, CitaDataCrud>
): Promise<FetchReturn<CitaDataCrud>> => {
    console.log('------------------FILTERS')
    console.log('Obteniendo citas con filtros (admin):', filters)

    const filtersParams = adapterFiltersParams(filters)
    const filtersParamsExtras = adapterFiltersCita(filters.filters)
    const filtersParamsFinal = { ...filtersParams, ...filtersParamsExtras }

    const res = await GestionCitasService.getApiGestionCitasListarCitas({
        ...filtersParamsFinal,
        ordenarPor: mapperCitaAdminDataToApi[filters.sortColumns.key as string],
        direccionOrden: filters.sortColumns.dir ?? 'desc',
    })
    console.log('Citas obtenidas (admin):', res)
    if (!res.data || !Array.isArray(res.data)) {
        console.error('Datos de citas no válidos (admin):', res.data)
        return {} as FetchReturn<CitaDataCrud>
    }
    return { items: parseCitasAdmin(res.data), pagination: parsePagination(res.pagination ?? {}) }
}

export const createCitaAdmin = async (cita: CitaDataForm): Promise<any> => {
    console.log('Creando cita (admin):', cita)
    const requestBody = adapterCitaAdmin(cita)
    console.log('Datos de la cita a crear (admin):', requestBody)
    const res = await GestionCitasService.postApiGestionCitasCrearCitaCliente({ requestBody })
    // const res = await AdministradorService.postApiAdministradorCrearCitaCliente({ requestBody })
    return res
}
export const updateCitaAdmin = async (cita: CitaDataForm): Promise<any> => {
    const requestBody: EditarCitaClienteRequest = {
        clienteId: cita.usuario,
        fechaHora: cita.fechaHoraInicio,
        tipoMantenimiento: cita.tipoMantenimiento ?? 'Otro',
        observaciones: cita.descripcion,
    }
    const res = await GestionCitasService.putApiGestionCitasEditarCitaCliente({
        id: cita.id!,
        requestBody,
    })
    // throw new Error('Funcionalidad no implementada')
    // if (!cita.id) throw new Error('ID de la cita es requerido para actualizar')
    // const requestBody = adapterCitaAdmin(cita)
    // const res = await AdministradorService.pos
    return res
}
export const eliminarCitaAdmin = async (citaId: number): Promise<any> => {
    const requestBody = await GestionCitasService.deleteApiGestionCitasCancelarCitaCliente({
        id: citaId,
    })
    return requestBody
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
