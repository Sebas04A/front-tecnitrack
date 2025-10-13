import { FetchParams } from '../components/crudGrid/helper/fetchWithFilters'

export function adapterFiltersParams(filters: FetchParams<any>) {
    return {
        termino: filters.search,
        pagina: filters.page,
        limite: filters.pageSize,
        ordenarPor: filters.sortColumns,
    }
}
