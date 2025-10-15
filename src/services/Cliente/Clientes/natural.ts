import { adapterPerfilNaturalCliente, parseAdapterPerfilNatural } from '../../../adapters/perfil'
import { ActualizarMisDatosRequest, ClientesService } from '../../../api'
import { PerfilPersonaNaturalData } from '../../../validation/perfil.schema'

export async function getPerfilNatural(): Promise<PerfilPersonaNaturalData> {
    const data = await ClientesService.getApiClientesMisDatos()
    console.log('Datos obtenidos del perfil natural:', data)
    if (!data || !data.data) {
        throw new Error('No se encontraron datos del perfil natural')
    }
    return parseAdapterPerfilNatural(data.data)
}
export async function createPerfilNatural(data: PerfilPersonaNaturalData) {
    const requestBody = adapterPerfilNaturalCliente(data)
    console.log('Datos del perfil natural a crear:', requestBody)

    const response = await ClientesService.postApiClientesCrearCliente({ requestBody })
    return response
}
export async function updatePerfilNatural(data: PerfilPersonaNaturalData) {
    const requestBody: ActualizarMisDatosRequest = {
        nombre: data.nombreCompleto,
        apellido: data.apellidoCompleto,
        tipoIdentificacion: data.tipoIdentificacion,
        numeroIdentificacion: data.numeroIdentificacion,
        fechaNacimiento: data.fechaNacimiento,
        genero: data.genero,
    }
    console.log('Datos del perfil natural a actualizar:', requestBody)

    const response = await ClientesService.putApiClientesActualizarMisDatos({ requestBody })
    return response
}
