import {
    mapperPerfilJuridicoDataToApi,
    parseAdapterPerfilesJuridicosCrud,
    parseAdapterPerfilJuridico,
} from '../../../adapters/perfil'
import {
    ActualizarClienteEmpresaDto,
    CrearClienteEmpresaDto,
    GestionClientesService,
    ListarClientesEmpresaDto,
} from '../../../api'
import { ClienteEmpresaCrud } from '../../../types/usuario'
import { PerfilEmpresaData } from '../../../validation/perfil.schema'
import { createApiSearchFunction } from '../../generalGetWithFilters'

export const buscarPerfilesJuridicos = createApiSearchFunction<
    ClienteEmpresaCrud,
    ListarClientesEmpresaDto,
    any
>({
    apiServiceCall: GestionClientesService.getApiGestionClientesListarClientesEmpresa,
    sortKeyMapper: mapperPerfilJuridicoDataToApi,
    dataParser: parseAdapterPerfilesJuridicosCrud,
    entityName: 'Perfiles Jurídicos',
})

export async function getPerfilJuridicoById(clienteId: number): Promise<PerfilEmpresaData> {
    const data = await GestionClientesService.getApiGestionClientesClienteEmpresa({
        clienteId: clienteId,
    })

    console.log('Datos obtenidos del perfil jurídico por ID:', data)
    if (!data || !data.data) {
        throw new Error('No se encontraron datos del perfil jurídico')
    }
    return parseAdapterPerfilJuridico(data.data)
}
export async function crearPerfilJuridicoAdmin(data: PerfilEmpresaData): Promise<number> {
    // const requestBody = adapterPerfilJuridico(data)
    // const requestBodyAdmin:CrearClienteEmpresaAdminRequest = {
    //     email: data.emailEmpresa,
    //     razonSocial: data.razonSocial,
    //     numero
    // }
    const requestBody: CrearClienteEmpresaDto = {
        razonSocial: data.razonSocial,
        numeroIdentificacion: data.RUC,
        nombreComercial: data.nombreComercial,
        representanteLegal: data.nombreRepresentanteLegal,
        nombreSucursal: data.nombreSucursal,
        numeroSucursal: data.numeroSucursal,
        telefonoEmpresa: data.telefonoEmpresa,
        correoEmpresa: data.emailEmpresa,
        telefonoEmpresaSecundario: data.telefonoSecundario,
        correoEmpresaSecundario: data.emailSecundario,
    }
    console.log('Datos del perfil jurídico a crear (Admin):', requestBody)
    const response = await GestionClientesService.postApiGestionClientesCrearClienteEmpresa({
        requestBody,
    })
    if (!response || !response.data || !response.data.id) {
        throw new Error('No se encontro el id del perfil jurídico')
    }
    return response.data?.id
}
export async function updatePerfilJuridicoAdmin(
    data: PerfilEmpresaData,
    clienteId: number
): Promise<number> {
    const requestBody: ActualizarClienteEmpresaDto = {
        numeroIdentificacion: data.RUC,
        // activo: data.activo,
        razonSocial: data.razonSocial,
        nombreComercial: data.nombreComercial,
        nombreSucursal: data.nombreSucursal,
        numeroSucursal: data.numeroSucursal,
        nombreRepresentanteLegal: data.nombreRepresentanteLegal,
        telefonoEmpresa: data.telefonoEmpresa,
        correoEmpresa: data.emailEmpresa,
        telefonoEmpresaSecundario: data.telefonoSecundario,
        correoEmpresaSecundario: data.emailSecundario,
    }
    const res = await GestionClientesService.putApiGestionClientesActualizarClienteEmpresa({
        clienteId,
        requestBody,
    })
    if (!res || !res.data || !res.data.id)
        throw new Error('No se encontro el id del perfil jurídico')
    return res.data?.id
}
