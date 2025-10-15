import { ClientesService } from '../api'

export async function getTipoPerfil() {
    const response = await ClientesService.getApiClientesTipoCliente()
    console.log('Tipos de perfil obtenidos:', response)
    return response.data?.tipoCliente
}

// export async function getPerfilesJuridicos(
//     filters: FetchParams<any, ClienteEmpresaCrud>
// ): Promise<FetchReturn<ClienteEmpresaCrud>> {
//     const filtersParams = adapterFiltersParams(filters)
//     const data = await GestionClientesService.getApiGestionClientesListarClientesEmpresa({
//         ...filtersParams,
//         ordenarPor: mapperPerfilJuridicoDataToApi[filters.sortColumns.key as string],
//         direccion: filters.sortColumns.dir ?? 'desc',
//     })
//     console.log('Datos obtenidos de perfiles jurídicos:', data.data)
//     return {
//         items: parseAdapterPerfilesJuridicosCrud(data.data || []),
//         pagination: parsePagination(data.pagination || {}),
//     }
// }

// ---------------------------- JURIDICOS ----------------------------

// ------------------------ NATURALES ------------------------

// export async function getPerfilesNaturales(): Promise<ClienteNaturalCrud[]> {
//     const data = await AdministradorService.getApiAdministradorListaClientesNaturales()
//     console.log('Datos obtenidos de perfiles naturales:', data.data)
//     return parseAdapterPersonasNaturalCrud(data.data || [])
// }

// export async function buscarPerfilesNaturales(
//     filters?: FetchParams<any, ClienteNaturalCrud>
// ): Promise<FetchReturn<ClienteNaturalCrud>> {
//     console.log('Buscando perfiles naturales... con filtros:', filters || 'Sin filtros')
//     if (!filters) throw new Error('No se encontraron filtros')

// const data:ListarClientesNaturalesDtoPagedResponse = await GestionClientesService.getApiGestionClientesListarClientesNaturales({
//         ...adapterFiltersParams(filters),
//         ordenarPor: mapperPerfilNaturalDataToApi[filters.sortColumns.key as string],
//         direccion: filters.sortColumns.dir ?? 'desc',
//     })
//     console.log('Datos obtenidos de búsqueda de perfiles naturales:', data)
//     if (!data || !data.data || !data.data) throw new Error('No se encontraron datos')

//     return {
//         items: parseAdapterPersonasNaturalCrud(data.data),
//         pagination: parsePagination(data.pagination || {}),
//     }
// }
