import { ClientesService } from '../../../../../api'
import { PerfilEmpresaData } from '../../../../../validation/perfil.schema'
import { adapterPerfilJuridico } from '../adapters/juridico'

export async function crearPerfilJuridico(data: PerfilEmpresaData): Promise<number> {
    const requestBody = adapterPerfilJuridico(data)
    console.log('Datos del perfil jurídico a crear:', requestBody)

    const response = await ClientesService.postApiClientesCrearEmpresa({ requestBody })
    return response.data.id
}
export async function updatePerfilJuridico(data: PerfilEmpresaData): Promise<number> {
    const requestBody = adapterPerfilJuridico(data)
    console.log('Datos del perfil jurídico a actualizar:', requestBody)

    const response = await ClientesService.putApiClientesActualizarMiEmpresa({ requestBody })
    if (!response || !response.data || !response.data.id) {
        throw new Error('No se encontro el id del perfil jurídico')
    }
    return response.data.id
}
