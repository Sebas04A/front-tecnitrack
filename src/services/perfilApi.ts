import {
    adapterPerfilJuridico,
    createAddapterPerfilNatural,
    parseAdapterPerfilesJuridicosCrud,
    parseAdapterPerfilJuridico,
    parseAdapterPerfilNatural,
    parseAdapterPerfilNaturalCrud,
    parseAdapterPersonasNaturalCrud,
} from '../adapters/perfil'
import {
    ActualizarClienteEmpresaDto,
    ActualizarClienteNaturalDto,
    AdministradorService,
    ClientesService,
    CrearClienteEmpresaAdminRequest,
    CrearClienteEmpresaDto,
    CrearClienteNaturalDto,
    GestionClientesService,
} from '../api'
import { ClienteEmpresaCrud, ClienteNaturalCrud } from '../types/usuario'
import {
    PerfilEmpresaData,
    PerfilPersonaNaturalCrudData,
    PerfilPersonaNaturalData,
} from '../validation/perfil.schema'

export async function getPerfilesJuridicos(): Promise<ClienteEmpresaCrud[]> {
    const data = await AdministradorService.getApiAdministradorListaClientesEmpresa()
    console.log('Datos obtenidos de perfiles jurídicos:', data.data)
    return parseAdapterPerfilesJuridicosCrud(data.data || [])
}
export async function getPerfilJuridicoById(clienteId: number): Promise<PerfilEmpresaData> {
    const data = await AdministradorService.getApiAdministradorObtenerClienteEmpresa({
        clienteId: clienteId,
    })
    console.log('Datos obtenidos del perfil jurídico por ID:', data)
    if (!data || !data.data) {
        throw new Error('No se encontraron datos del perfil jurídico')
    }
    return parseAdapterPerfilJuridico(data.data)
}
export async function getPerfilJuridico(): Promise<PerfilEmpresaData> {
    try {
        const data = await ClientesService.getApiClientesMiEmpresa()
        console.log('Datos obtenidos del perfil jurídico:', data)
        if (!data || !data.data) {
            throw new Error('No se encontraron datos del perfil jurídico')
        }
        return parseAdapterPerfilJuridico(data.data)
    } catch (e) {
        console.error('Error obteniendo perfil jurídico:', e)
        throw e
    }
}
export async function crearPerfilJuridico(data: PerfilEmpresaData) {
    const requestBody = adapterPerfilJuridico(data)
    console.log('Datos del perfil jurídico a crear:', requestBody)
    try {
        const response = await ClientesService.postApiClientesCrearEmpresa({ requestBody })
        return response
    } catch (e) {
        console.error('Error creando perfil jurídico:', e)
        throw e
    }
}
export async function crearPerfilJuridicoAdmin(data: PerfilEmpresaData) {
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
    return response
}

export async function updatePerfilJuridico(data: PerfilEmpresaData) {
    const requestBody = adapterPerfilJuridico(data)
    console.log('Datos del perfil jurídico a actualizar:', requestBody)
    try {
        const response = await ClientesService.putApiClientesActualizarMiEmpresa({ requestBody })
        return response
    } catch (e) {
        console.error('Error actualizando perfil jurídico:', e)
        throw e
    }
}
export async function updatePerfilJuridicoAdmin(data: PerfilEmpresaData, clienteId: number) {
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
    return res.data
}
export async function getTipoPerfil() {
    const response = await ClientesService.getApiClientesTipoCliente()
    console.log('Tipos de perfil obtenidos:', response)
    return response.data?.tipoCliente
}
export async function getPerfilesNaturales(): Promise<ClienteNaturalCrud[]> {
    const data = await AdministradorService.getApiAdministradorListaClientesNaturales()
    console.log('Datos obtenidos de perfiles naturales:', data.data)
    return parseAdapterPersonasNaturalCrud(data.data || [])
}
export async function getPerfilNatural(): Promise<PerfilPersonaNaturalData> {
    try {
        const data = await ClientesService.getApiClientesMisDatos()
        console.log('Datos obtenidos del perfil natural:', data)
        if (!data || !data.data) {
            throw new Error('No se encontraron datos del perfil natural')
        }
        return parseAdapterPerfilNatural(data.data)
    } catch (e) {
        console.error('Error obteniendo perfil natural:', e)
        throw e
    }
}
export async function getPerfilNaturalById(clienteId: number): Promise<any> {
    const data = await GestionClientesService.getApiGestionClientesClienteNatural({
        clienteId: clienteId,
    })
    console.log('Datos obtenidos del perfil natural por ID:', data)
    if (!data || !data.data) {
        throw new Error('No se encontraron datos del perfil natural')
    }
    return parseAdapterPerfilNaturalCrud(data.data)
}
export async function createPerfilNatural(data: PerfilPersonaNaturalData) {
    const requestBody = createAddapterPerfilNatural(data)
    console.log('Datos del perfil natural a crear:', requestBody)
    try {
        const response = await ClientesService.postApiClientesCrearCliente({ requestBody })
        return response
    } catch (e) {
        console.error('Error creando perfil natural:', e)
        throw e
    }
}

export async function updatePerfilNatural(data: PerfilPersonaNaturalData) {
    const requestBody = createAddapterPerfilNatural(data)
    console.log('Datos del perfil natural a actualizar:', requestBody)
    try {
        const response = await ClientesService.putApiClientesActualizarMisDatos({ requestBody })
        return response
    } catch (e) {
        console.error('Error actualizando perfil natural:', e)
        throw e
    }
}

export async function crearPerfilNaturaAdmin(data: PerfilPersonaNaturalCrudData) {
    const requestBody: CrearClienteNaturalDto = {
        nombre: data.nombreCompleto,
        apellido: data.apellidoCompleto,
        tipoIdentificacion: data.tipoIdentificacion,
        numeroIdentificacion: data.numeroIdentificacion,
        fechaNacimiento: data.fechaNacimiento,
        genero: data.genero,
        email: data.email,
    }
    const res = await GestionClientesService.postApiGestionClientesCrearClienteNatural({
        requestBody,
    })
    return res
}
export async function updatePerfilNaturalAdmin(
    data: PerfilPersonaNaturalCrudData,
    clienteId: number
) {
    const requestBody: ActualizarClienteNaturalDto = {
        nombre: data.nombreCompleto,
        apellido: data.apellidoCompleto,
        tipoIdentificacion: data.tipoDocumento,
        numeroIdentificacion: data.numeroDocumento,
        fechaNacimiento: data.fechaNacimiento,
        genero: data.genero,
        email: data.email,
    }
    const res = await GestionClientesService.putApiGestionClientesActualizarClienteNatural({
        clienteId: clienteId,
        requestBody,
    })
    return res
}
