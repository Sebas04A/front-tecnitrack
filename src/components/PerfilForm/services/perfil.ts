import { ClientesService } from '../../../api'
import { PerfilEmpresaData, PerfilPersonaNaturalData } from '../../../validation/perfil.schema'
import { parseAdapterPerfilNatural } from '../adapters/perfilForm'
import { parseAdapterPerfilJuridico } from '../perfil/juridico/adapters/juridico'

export async function getPerfilNatural(): Promise<PerfilPersonaNaturalData> {
    const data = await ClientesService.getApiClientesMisDatos()
    console.log('Datos obtenidos del perfil natural:', data)
    if (!data || !data.data) {
        throw new Error('No se encontraron datos del perfil natural')
    }
    return parseAdapterPerfilNatural(data.data)
}
export async function getPerfilJuridico(): Promise<PerfilEmpresaData> {
    const data = await ClientesService.getApiClientesMiEmpresa()
    console.log('Datos obtenidos del perfil jurídico:', data)
    if (!data || !data.data) {
        throw new Error('No se encontraron datos del perfil jurídico')
    }
    return parseAdapterPerfilJuridico(data.data)
}
