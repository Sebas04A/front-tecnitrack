import { adapterFiltersParams } from '../../../../../adapters/filtersToParams'
import { parsePagination } from '../../../../../adapters/pagination'
import {
    CrearOrdenConNumeroRequest,
    EditarCitaClienteRequest,
    GestionCitasService,
    OrdenesService,
    OrdenResponse,
} from '../../../../../api'
import {
    FetchParams,
    FetchReturn,
} from '../../../../../components/crudGrid/helper/fetchWithFilters'
import { parseAdapterOrden } from '../../../../../components/mantenimiento/Orden/adapters/orden'
import { createApiSearchFunction } from '../../../../../services/generalGetWithFilters'
import { OrdenData } from '../../../Ordenes/Crud/models/ordenData'
import {
    adapterCitaAdmin,
    adapterFiltersCita,
    mapperCitaAdminDataToApi,
    parseCitasAdmin,
} from '../adapter/cita'
import { parseOrden } from '../adapter/orden'
import { CitaDataCrud } from '../models/citaCrudModel'
import { CitasFiltersType } from '../models/citaFiltersType'
import { CitaDataForm } from '../models/validationCitaCrud'

// export const obtenerCitasAdmin = async (
//     filters: FetchParams<CitasFiltersType, CitaDataCrud>
// ): Promise<FetchReturn<CitaDataCrud>> => {
//     console.log('------------------FILTERS')
//     console.log('Obteniendo citas con filtros (admin):', filters)

//     const filtersParams = adapterFiltersParams(filters)
//     const filtersParamsExtras = adapterFiltersCita(filters.filters)
//     const filtersParamsFinal = { ...filtersParams, ...filtersParamsExtras }

//     const res = await GestionCitasService.getApiGestionCitasListarCitas({
//         ...filtersParamsFinal,
//         ordenarPor: mapperCitaAdminDataToApi[filters.sortColumns.key as string],
//         direccionOrden: filters.sortColumns.dir ?? 'desc',
//     })
//     console.log('Citas obtenidas (admin):', res)
//     if (!res.data || !Array.isArray(res.data)) {
//         console.error('Datos de citas no válidos (admin):', res.data)
//         return {} as FetchReturn<CitaDataCrud>
//     }
//     return { items: parseCitasAdmin(res.data), pagination: parsePagination(res.pagination ?? {}) }
// }

export const obtenerCitasAdmin = createApiSearchFunction<CitaDataCrud, any, CitasFiltersType, any>({
    apiServiceCall: GestionCitasService.getApiGestionCitasListarCitas,
    sortKeyMapper: mapperCitaAdminDataToApi,
    dataParser: parseCitasAdmin,
    filterAdapter: adapterFiltersCita,
    entityName: 'Citas (admin)',
})

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

export const crearOrden = async (citaId: number): Promise<OrdenData> => {
    const requestBody: CrearOrdenConNumeroRequest = {
        citaId: citaId,
    }
    const res = await OrdenesService.postApiOrdenesCrearOrdenConNumero({ requestBody })
    console.log('Orden creada:', res)
    if (!res.data) {
        throw new Error('No se recibió data al crear la orden')
    }
    return parseOrden(res.data)
}
