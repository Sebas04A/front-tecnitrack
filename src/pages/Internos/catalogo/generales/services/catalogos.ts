import {
    adapterCatalogo,
    obtenerCatalogos,
    parseAdapterCatalogo,
} from '../../../../../adapters/catalogos'
import { CatalogoDto, CatalogosService, CrearCatalogoDto } from '../../../../../api'
import { makeLocalCrudFetcher } from '../../../../../components/crudGrid/helper/crud-helpers'
import {
    fetchDataCrudWithFilters,
    FetchParams,
} from '../../../../../components/crudGrid/helper/fetchWithFilters'
import { createApiSearchFunction } from '../../../../../services/generalGetWithFilters'
import { CatalogoFormData } from '../models/catalogo.schema'

export async function getTiposCatalogos(): Promise<string[]> {
    const res = await CatalogosService.getApiCatalogosObtenerTiposCatalogo()
    return res.data ?? []
}

export async function getCatalogo(tipo: string) {
    const response = await CatalogosService.getApiCatalogosObtenerCatalogosPorTipo({ tipo })
    return obtenerCatalogos(response.data ?? [])
}
// export async function getCatalogoLimpio(filters:FetchParams<any,CatalogoDto >) {
//     console.log('Obteniendo catálogo limpio para tipo:', tipo)
//     const response = await CatalogosService.getApiCatalogosObtenerCatalogosPorTipo({
//         tipo,
//     })
//     return parseAdapterCatalogo(response.data ?? [])
// }
export const getCatalogoPorTipo = (tipo: string) =>
    createApiSearchFunction<CatalogoFormData, CatalogoFormData, any, any>({
        apiServiceCall: () => CatalogosService.getApiCatalogosObtenerCatalogosPorTipo({ tipo }),
        sortKeyMapper: {},
        filterAdapter: filters => ({ ...filters, tipo }),
        dataParser: parseAdapterCatalogo,
        entityName: 'Catálogos',
    })

// export const getCatalogoFiltros =  createApiSearchFunction<CatalogoFormData,CatalogoFormData,any,any>({
//     apiServiceCall: CatalogosService.getApiCatalogosObtenerCatalogosPorTipo,
//     sortKeyMapper: {},
//     filterAdapter: (filters) => filters,
//     dataParser: parseAdapterCatalogo,
//     entityName: 'Catálogos',

// })

export async function getCatalogos() {
    const response = await CatalogosService.getApiCatalogosObtenerTodosCatalogos()
    return response
}
export async function createCatalogo(data: CatalogoFormData) {
    const adaptCatalogo: CatalogoDto = adapterCatalogo(data)
    const requestBody: CrearCatalogoDto = adaptCatalogo as CrearCatalogoDto
    const response = await CatalogosService.postApiCatalogosCrearCatalogo({
        requestBody,
    })
    return response
}
export async function updateCatalogo(data: CatalogoFormData) {
    if (!data.id) throw new Error('ID del catálogo es requerido para actualizar')
    const adaptCatalogo: CatalogoDto = adapterCatalogo(data)
    const requestBody: CrearCatalogoDto = adaptCatalogo as CrearCatalogoDto
    const response = await CatalogosService.putApiCatalogosEditarCatalogo({
        id: data.id,
        requestBody,
    })
    return response
}
export async function deleteCatalogo(id: number) {
    if (!id) throw new Error('ID del catálogo es requerido para eliminar')
    const response = await CatalogosService.deleteApiCatalogosEliminarCatalogo({ id })
    return response
}
