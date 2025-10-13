import { PaginationInfo } from '../api'
import { FetchReturn } from '../components/crudGrid/helper/fetchWithFilters'
import { FetchFunction } from '../components/form/Controls/GenericSelectSearch'

export function parsePagination(pagination: PaginationInfo): FetchReturn<any>['pagination'] {
    return {
        currentPage: pagination.currentPage ?? -1,
        totalPages: pagination.totalPages ?? -1,
        totalRecords: pagination.totalRecords ?? -1,
        pageSize: pagination.pageSize ?? -1,
        hasNextPage: pagination.hasNextPage ?? false,
        hasPreviousPage: pagination.hasPreviousPage ?? false,
    }
}
