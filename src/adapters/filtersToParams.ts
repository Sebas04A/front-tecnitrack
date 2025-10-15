import { FetchParams } from '../components/crudGrid/helper/fetchWithFilters'

export function adapterFiltersParams(filters: FetchParams<any, any>) {
    return {
        termino: filters.search,
        pagina: filters.page,
        limite: filters.pageSize,
        ordenarPor: String(filters.sortColumns.key) || undefined,
        orden: String(filters.sortColumns.dir) || undefined,
    }
}
