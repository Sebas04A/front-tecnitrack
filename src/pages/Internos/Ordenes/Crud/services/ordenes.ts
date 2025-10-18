import { adapterFiltersCita } from '../../../../../adapters/cita'
import { adapterFiltersParams } from '../../../../../adapters/filtersToParams'
import { parsePagination } from '../../../../../adapters/pagination'
import { GestionOrdenesService, OrdenesService } from '../../../../../api'
import { makeLocalCrudFetcher } from '../../../../../components/crudGrid/helper/crud-helpers'
import {
    FetchParams,
    FetchReturn,
} from '../../../../../components/crudGrid/helper/fetchWithFilters'
import { createApiSearchFunction } from '../../../../../services/generalGetWithFilters'
import {
    adapterFiltersOrdenesAdminFromApi,
    mapperOrdenesApiToFilters,
    mapperOrdenesFiltersToApi,
} from '../adapter/adapterFiltersOrdenesAdmin'
import { mapperApiToOrdenesAdmin } from '../adapter/adapterOrdenesAdmin'

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

export const obtenerOrdenesAsignadasInternoFetcher = createApiSearchFunction<any, any, any, any>({
    apiServiceCall: GestionOrdenesService.getApiGestionOrdenesListarOrdenesActivas,
    sortKeyMapper: mapperApiToOrdenesAdmin,
    filterAdapter: adapterFiltersOrdenesAdminFromApi,
    dataParser: (apiData: any[]) => apiData,
    entityName: 'Órdenes Asignadas Interno',
})
