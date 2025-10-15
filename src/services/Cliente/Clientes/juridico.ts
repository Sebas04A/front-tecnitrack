import { adapterPerfilJuridico, parseAdapterPerfilJuridico } from '../../../adapters/perfil'
import { ClientesService } from '../../../api'
import { PerfilEmpresaData } from '../../../validation/perfil.schema'

export async function getPerfilJuridico(): Promise<PerfilEmpresaData> {
    const data = await ClientesService.getApiClientesMiEmpresa()
    console.log('Datos obtenidos del perfil jurídico:', data)
    if (!data || !data.data) {
        throw new Error('No se encontraron datos del perfil jurídico')
    }
    return parseAdapterPerfilJuridico(data.data)
}
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
