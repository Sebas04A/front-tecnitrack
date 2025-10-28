import { adapterFiltersCita } from '../../../Citas/Crud/adapter/cita'
import { adapterFiltersParams } from '../../../../../adapters/filtersToParams'
import { parsePagination } from '../../../../../adapters/pagination'
import { GestionOrdenesService, ListarOrdenesActivasDto, OrdenesService } from '../../../../../api'
import { makeLocalCrudFetcher } from '../../../../../components/crudGrid/helper/crud-helpers'
import {
    FetchParams,
    FetchReturn,
} from '../../../../../components/crudGrid/helper/fetchWithFilters'
import { createApiSearchFunction } from '../../../../../services/generalGetWithFilters'
import {
    adapterFiltersOrdenesAdminFromApi,
    adapterOrdenesFiltersToApi,
    mapperOrdenesApiToFilters,
    mapperOrdenesFiltersToApi,
} from '../adapter/adapterFiltersOrdenesAdmin'
import {
    adapterOrdenesAdminFromApi,
    adapterOrdenesAdminToApi,
    mapperApiToOrdenesAdmin,
} from '../adapter/adapterOrdenesAdmin'
import { OrdenData } from '../models/ordenData'
import { OrdenesFiltersType } from '../models/ordenFilter'

export const obtenerOrdenesAsignadasInterno = async (
    filters: FetchParams<any, any>
): Promise<FetchReturn<any>> => {
    console.log('------------------FILTERS')
    console.log('Obteniendo citas con filtros (admin):', filters)

    const filtersParams = adapterFiltersParams(filters)
    const filtersParamsExtras = adapterFiltersCita(filters.filters)
    const filtersParamsFinal = { ...filtersParams, ...filtersParamsExtras }

    const res = await GestionOrdenesService.getApiGestionOrdenesListarOrdenesActivas({
        ...filtersParamsFinal,
        // ordenarPor: mapperCitaAdminDataToApi[filters.sortColumns.key as string],
        // direccionOrden: filters.sortColumns.dir ?? 'desc',
    })
    console.log('Citas obtenidas (admin):', res)
    if (!res.data || !Array.isArray(res.data)) {
        console.error('Datos de citas no válidos (admin):', res.data)
        return {} as FetchReturn<any>
    }
    return { items: res.data, pagination: parsePagination(res.pagination ?? {}) }
}

export const obtenerOrdenesAsignadasInternoFetcher = createApiSearchFunction<
    OrdenData,
    ListarOrdenesActivasDto,
    OrdenesFiltersType,
    any
>({
    apiServiceCall: GestionOrdenesService.getApiGestionOrdenesListarOrdenesActivas,
    sortKeyMapper: mapperApiToOrdenesAdmin,
    filterAdapter: adapterOrdenesFiltersToApi,
    dataParser: adapterOrdenesAdminFromApi,
    entityName: 'Órdenes Asignadas Interno',
})
export const deleteOrden = async (id: number) => {
    const res = await GestionOrdenesService.deleteApiGestionOrdenesEliminarOrden({ id })
    return res.data
}
