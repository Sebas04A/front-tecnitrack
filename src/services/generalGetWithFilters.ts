import { adapterFiltersParams } from '../adapters/filtersToParams'
import { parsePagination } from '../adapters/pagination'
import { PaginationInfo } from '../api'
import { FetchParams, FetchReturn } from '../components/crudGrid/helper/fetchWithFilters'

export type ApiResponseSearch<Data> = {
    success?: boolean
    data?: Array<Data> | null
    message?: string | null
    timestamp?: string
    errors?: Array<string> | null
    pagination?: PaginationInfo
}
export type ApiSearchParams = {
    termino?: string
    pagina?: number
    limite?: number
    ordenarPor?: string
    direccion?: string
}
/**
 * Configuración para crear una función de búsqueda genérica.
 * @template T_FrontEnd El modelo de datos del lado del cliente.
 * @template T_Api El modelo de datos que retorna la API.
 * @template T_Filters Los parámetros que espera la función del servicio API.
 */
interface SearchFunctionConfig<T_FrontEnd, T_Api, T_Filters> {
    /**
     * La función del servicio que realiza la llamada a la API.
     * @param params Los filtros y parámetros de paginación adaptados para la API.
     * @returns Una promesa con la respuesta de la API.
     */
    apiServiceCall: (params: ApiSearchParams) => Promise<ApiResponseSearch<T_Api>>

    /**
     * Un objeto que mapea las claves de ordenamiento del frontend a las claves que espera la API.
     * Ejemplo: { 'nombreCompleto': 'nombres' }
     */
    sortKeyMapper: { [key in keyof Partial<T_FrontEnd>]: string }

    /**
     * Función que transforma la lista de datos de la API al formato del frontend.
     * @param apiData El array de datos recibido de la API.
     * @returns Un array de datos en el formato del frontend.
     */
    dataParser: (apiData: T_Api[]) => T_FrontEnd[]

    /**
     * Nombre de la entidad que se está buscando (usado para logs).
     */
    entityName: string
}

/**
 * Crea una función de búsqueda genérica y reutilizable para diferentes endpoints de API.
 * @param config La configuración que define cómo buscar, mapear y transformar los datos.
 * @returns Una función de búsqueda asíncrona y tipada.
 */
export function createApiSearchFunction<T_FrontEnd, T_Api, T_Filters extends object>(
    config: SearchFunctionConfig<T_FrontEnd, T_Api, T_Filters>
) {
    /**
     * Función generada que busca y procesa datos de una entidad específica.
     * @param filters Parámetros de paginación, ordenamiento y filtrado del frontend.
     */
    return async function generatedSearchFunction(
        filters: FetchParams<T_Filters, T_FrontEnd>
    ): Promise<FetchReturn<T_FrontEnd>> {
        const { apiServiceCall, sortKeyMapper, dataParser, entityName } = config

        console.log(`Buscando ${entityName}... con filtros:`, filters || 'Sin filtros')
        // if (!filters) {
        //     throw new Error('No se proporcionaron filtros para la búsqueda');
        // }

        const frontendSortKey = filters?.sortColumns.key as string
        const apiSortKey = (sortKeyMapper as any)[frontendSortKey] || frontendSortKey

        // Preparamos los parámetros para la llamada al servicio de la API
        const apiParams = {
            ...adapterFiltersParams(filters),
            ordenarPor: apiSortKey,
            direccion: filters.sortColumns.dir ?? 'desc',
        } as ApiSearchParams

        // Realizamos la llamada a la API
        const response = await apiServiceCall(apiParams)
        console.log(`Datos obtenidos de búsqueda de ${entityName}:`, response)

        if (!response || !response.data) {
            throw new Error(`No se encontraron datos para ${entityName}`)
        }

        // Procesamos y retornamos la respuesta en el formato esperado
        return {
            items: dataParser(response.data),
            pagination: parsePagination(response.pagination || {}),
        }
    }
}
