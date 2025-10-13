import { th } from 'framer-motion/client'
import {
    adapterPerfilJuridico,
    createAddapterPerfilNatural,
    parseAdapterPerfilesJuridicosCrud,
    parseAdapterPerfilJuridico,
    parseAdapterPerfilNatural,
    parseAdapterPerfilNaturalCrud,
    parseAdapterPersonasNaturalCrud,
    parseSearchAdapterPefilNaturalCrud,
} from '../adapters/perfil'
import {
    ActualizarClienteEmpresaDto,
    ActualizarClienteNaturalDto,
    ActualizarMisDatosRequest,
    AdministradorService,
    BusquedaClientesNaturalesResponseDto,
    ClienteNaturalBusquedaDto,
    ClientesService,
    CrearClienteEmpresaAdminRequest,
    CrearClienteEmpresaDto,
    CrearClienteNaturalDto,
    GestionClientesService,
} from '../api'
import { FetchParams, FilterParamOption } from '../components/crudGrid/helper/fetchWithFilters'
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
export async function crearPerfilJuridico(data: PerfilEmpresaData): Promise<number> {
    const requestBody = adapterPerfilJuridico(data)
    console.log('Datos del perfil jurídico a crear:', requestBody)
    try {
        const response = await ClientesService.postApiClientesCrearEmpresa({ requestBody })
        return response.data.id
    } catch (e) {
        console.error('Error creando perfil jurídico:', e)
        throw e
    }
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

export async function updatePerfilJuridico(data: PerfilEmpresaData): Promise<number> {
    const requestBody = adapterPerfilJuridico(data)
    console.log('Datos del perfil jurídico a actualizar:', requestBody)
    try {
        const response = await ClientesService.putApiClientesActualizarMiEmpresa({ requestBody })
        if (!response || !response.data || !response.data.id) {
            throw new Error('No se encontro el id del perfil jurídico')
        }
        return response.data.id
    } catch (e) {
        console.error('Error actualizando perfil jurídico:', e)
        throw e
    }
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

export async function buscarPerfilesNaturales(
    filters?: FetchParams<ClienteNaturalCrud>
): Promise<ClienteNaturalCrud[]> {
    console.log('Buscando perfiles naturales... con filtros:', filters || 'Sin filtros')
    if (!filters) throw new Error('No se encontraron filtros')
    const ordenarPor = filters.sortColumns
        ? filters.sortColumns.length > 0
            ? filters.sortColumns[0]
            : undefined
        : undefined
    const filtersParams = {
        termino: filters?.search,
        pagina: filters?.page ?? undefined,
        tamanoPagina: filters?.pageSize ?? undefined,
        ordenarPor: ordenarPor ?? undefined,
    }
    const data = await GestionClientesService.getApiGestionClientesBuscarClientesNaturales(
        filtersParams
    )
    console.log('Datos obtenidos de búsqueda de perfiles naturales:', data)
    if (!data || !data.data || !data.data.clientes) throw new Error('No se encontraron datos')

    return parseSearchAdapterPefilNaturalCrud(data.data.clientes || [])
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
    const requestBody: ActualizarMisDatosRequest = {
        nombre: data.nombreCompleto,
        apellido: data.apellidoCompleto,
        tipoIdentificacion: data.tipoIdentificacion,
        numeroIdentificacion: data.numeroIdentificacion,
        fechaNacimiento: data.fechaNacimiento,
        genero: data.genero,
    }
    console.log('Datos del perfil natural a actualizar:', requestBody)
    try {
        const response = await ClientesService.putApiClientesActualizarMisDatos({ requestBody })
        return response
    } catch (e) {
        console.error('Error actualizando perfil natural:', e)
        throw e
    }
}

export async function crearPerfilNaturaAdmin(data: PerfilPersonaNaturalCrudData): Promise<number> {
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
    if (!res.data || !res.data.id) throw new Error('No se encontro el id del perfil natural')
    return res.data.id
}
export async function updatePerfilNaturalAdmin(
    data: PerfilPersonaNaturalCrudData,
    clienteId: number
): Promise<number> {
    const requestBody: ActualizarClienteNaturalDto = {
        nombre: data.nombreCompleto,
        apellido: data.apellidoCompleto,
        tipoIdentificacion: data.tipoIdentificacion,
        numeroIdentificacion: data.numeroIdentificacion,
        fechaNacimiento: data.fechaNacimiento,
        genero: data.genero,
        email: data.email,
    }
    const res = await GestionClientesService.putApiGestionClientesActualizarClienteNatural({
        clienteId: clienteId,
        requestBody,
    })
    if (!res.data || !res.data.id) throw new Error('No se encontro el id del perfil natural')
    return res.data.id
}
export async function deletePerfilNaturalAdmin(clienteId: number) {
    const res = await GestionClientesService.deleteApiGestionClientesEliminarClienteNatural({
        clienteId: clienteId,
    })
    return res
}

export async function activarUsuario(clienteId: number) {
    const res = GestionClientesService.patchApiGestionClientesActivarCliente({
        clienteId: clienteId,
    })
    return res
}

export async function desactivarUsuario(clienteId: number) {
    const res = GestionClientesService.patchApiGestionClientesDesactivarCliente({
        clienteId: clienteId,
    })
    return res
}
