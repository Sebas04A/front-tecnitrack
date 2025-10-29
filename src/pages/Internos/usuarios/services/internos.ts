import { adapterUsuarioInterno, parseAdapterUsuarioInterno } from '../adapters/usuarioInterno'
import {
    ClienteInternoResponse,
    ClienteInternoService,
    GestionClientesInternosService,
    ObjectApiResponse,
} from '../../../../api'

import { UsuarioInternoData } from '../models/usuarioInterno'
import { createApiSearchFunction } from '../../../../services/generalGetWithFilters'

// export async function getInternos() {
//     const res = await ClienteInternoService.getApiClienteInternoMiPerfil()
//     if (!res.data) throw new Error('No se recibieron datos de la API')
//     return [parseAdapterUsuarioInterno(res.data)]
// }

export const getInternos = createApiSearchFunction<
    UsuarioInternoData,
    ClienteInternoResponse,
    any,
    any
>({
    apiServiceCall:
        GestionClientesInternosService.getApiGestionClientesInternosListarClientesInternos,
    sortKeyMapper: {},
    filterAdapter: filters => {
        return {}
    },
    dataParser: parseAdapterUsuarioInterno,
    entityName: 'Usuarios Internos',
})

export async function createInterno(data: UsuarioInternoData) {
    const requestBody = adapterUsuarioInterno(data)
    const res = await ClienteInternoService.postApiClienteInternoCrearEmpleado({ requestBody })
    return res
}
export async function updateInterno(
    id: number,
    data: UsuarioInternoData
): Promise<ObjectApiResponse> {
    console.log(id, data)
    throw new Error('Función no implementada')
    // const requestBody = adapterUsuarioInterno(data)
    // const res = ClienteInternoService.
    // console.log(`Actualizando interno ${id} con datos:`, data)
    // return { id, ...data }
    return { success: true }
}
export async function deleteInterno(id: number): Promise<ObjectApiResponse> {
    console.log(`Eliminando interno con ID: ${id}`)
    return { success: true }
}
