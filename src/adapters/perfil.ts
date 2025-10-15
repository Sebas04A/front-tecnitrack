import {
    // ClienteEmpresaListaResponse,
    // ClienteNaturalBusquedaDto,
    ClienteNaturalDto,
    // ClienteNaturalListaResponse,
    ClientesEmpresaRequest,
    ClientesEmpresaResponse,
    ClientesNaturalRequest,
    ClientesNaturalResponse,
    ListarClientesEmpresaDto,
    ListarClientesNaturalesDto,
} from '../api'
import { ClienteEmpresaCrud, ClienteNaturalCrud } from '../types/usuario'
import {
    PerfilEmpresaData,
    PerfilPersonaNaturalCrudData,
    PerfilPersonaNaturalData,
} from '../validation/perfil.schema'
// const tipoDocumentoMap: Record<string, any> = {
//     Cédula: 'Cedula',
//     Pasaporte: 'Pasaporte',
//     RUC: 'RUC',
//     '': '',
// }
// const tipoDocumentoReverseMap = Object.fromEntries(
//     Object.entries(tipoDocumentoMap).map(([k, v]) => [v, k])
// )

const parseFecha = (fecha: string | undefined): string => {
    if (!fecha) return ''
    const soloFecha = fecha.split('T')[0]
    return soloFecha
}
const adaptFecha = (fecha: string): string => {
    if (!fecha) return ''
    return fecha + 'T00:00:00'
}
// ----------------------CLIENTES NATURALES----------------------
export const adapterPerfilNaturalCliente = (
    perfil: PerfilPersonaNaturalData
): ClientesNaturalRequest => {
    return {
        nombres: perfil.nombreCompleto,
        apellidos: perfil.apellidoCompleto,
        tipoIdentificacion: perfil.tipoIdentificacion,
        numeroIdentificacion: perfil.numeroIdentificacion,
        fechaNacimiento: adaptFecha(perfil.fechaNacimiento || ''),
        genero: perfil.genero || '',
    }
}

export const parsePersonaNaturalById = (cliente: ClienteNaturalDto): PerfilPersonaNaturalData => {
    return {
        id: cliente.id || -1,
        genero: cliente.genero ?? '',
        fechaNacimiento: parseFecha(cliente.fechaNacimiento || ''),
        nombreCompleto: cliente.nombre ?? '',
        apellidoCompleto: cliente.apellido ?? '',
        tipoIdentificacion: cliente.tipoDocumento ?? '',
        numeroIdentificacion: cliente.numeroIdentificacion ?? '',
        email: cliente.email ?? '',
    }
}

const parseAdapterPersonaNaturalCrud = (perfil: ListarClientesNaturalesDto): ClienteNaturalCrud => {
    return {
        id: perfil.clienteId || -1,
        tipoIdentificacion: perfil.tipoIdentificacion || '',
        numeroIdentificacion: perfil.numeroIdentificacion ?? '',
        nombreCompleto: perfil.nombreCompleto ?? '',
        telefono: perfil.telefono ?? '',
        correo: perfil.correo ?? '',
        direccion: perfil.direccion ?? '',
        estado: perfil.activo ?? true,
        fechaCreacion: perfil.fechaCreacion ? new Date(perfil.fechaCreacion) : new Date(),
        // fechaNacimiento: parseFecha(perfil.),
    }
}
export const parseAdapterPersonasNaturalCrud = (
    api: ListarClientesNaturalesDto[]
): ClienteNaturalCrud[] => {
    return api.map(parseAdapterPersonaNaturalCrud)
}

export const parseAdapterPerfilNatural = (
    api: ClientesNaturalResponse
): PerfilPersonaNaturalData => {
    const allowedGeneros = new Set([
        '',
        'Masculino',
        'Femenino',
        'No binario',
        'Prefiero no decirlo',
    ])
    const genero =
        api.genero && allowedGeneros.has(api.genero)
            ? (api.genero as PerfilPersonaNaturalData['genero'])
            : ''
    return {
        nombreCompleto: api.nombres ?? '',
        apellidoCompleto: api.apellidos ?? '',
        tipoIdentificacion: api.tipoDocumento ?? '',
        numeroIdentificacion: api.numeroIdentificacion ?? '',
        fechaNacimiento: parseFecha(api.fechaNacimiento || ''),
        genero: genero,
        email: api.emailRegistrado ?? '',
    }
}
export const parseAdapterPerfilNaturalCrud = (
    api: ClienteNaturalDto
): PerfilPersonaNaturalCrudData => {
    return {
        id: api.id || -1,
        nombreCompleto: api.nombre ?? '',
        apellidoCompleto: api.apellido ?? '',
        tipoIdentificacion: api.tipoDocumento ?? '',
        numeroIdentificacion: api.numeroIdentificacion ?? '',
        fechaNacimiento: parseFecha(api.fechaNacimiento || ''),
        genero: api.genero ?? '',
        email: api.email ?? '',
    }
}
export const mapperPerfilNaturalApiToData = {
    clienteId: 'id',
    tipoIdentificacion: 'tipoIdentificacion',
    numeroIdentificacion: 'numeroIdentificacion',
    nombreCompleto: 'nombreCompleto',
    apellidoCompleto: 'apellidoCompleto',
    telefono: 'telefono',
    correo: 'correo',
    direccion: 'direccion',
    fechaNacimiento: 'fechaNacimiento',
    genero: 'genero',
    email: 'email',
    fechaCreacion: 'fechaCreacion',
}
export const mapperPerfilNaturalDataToApi = Object.fromEntries(
    Object.entries(mapperPerfilNaturalApiToData).map(([key, value]) => [value, key])
)
// export const parseSearchAdapterPerfilNaturalCrud = (
//     apis: ClienteNaturalBusquedaDto

//     []
// ): ClienteNaturalCrud[] => {
//     return apis.map(api => ({
//         id: api.clienteId || -1,
//         tipoIdentificacion: api.tipoIdentificacion || '',
//         numeroIdentificacion: api.numeroIdentificacion ?? '',
//         nombreCompleto: api.nombreCompleto ?? '',
//         telefono: api.telefono ?? '',
//         correo: api.correo ?? '',
//         direccion: api.direccion ?? '',
//         estado: api.estado ?? true,
//         fechaCreacion: api.fechaCreacion ? new Date(api.fechaCreacion) : new Date(),
//         // fechaNacimiento: parseFecha(perfil.),
//     }))
// }

export const adapterPerfilJuridico = (data: PerfilEmpresaData) => {
    const requestBody: ClientesEmpresaRequest = {
        razonSocial: data.razonSocial,
        numeroIdentificacion: data.RUC,
        nombreComercial: data.nombreComercial,
        telefonoEmpresa: data.telefonoEmpresa,
        correoEmpresa: data.emailEmpresa,
        nombreRepresentanteLegal: data.nombreRepresentanteLegal,
        // telefonoContacto1: data.telefonoEmpresa,
        // correoContacto1: data.emailEmpresa,
        // telefonoContacto2: data.telefonoSecundario,
        // correoContacto2: data.emailSecundario,
    }
    return requestBody
}

export const mapperPerfilJuridicoApiToData = {
    clienteId: 'id',
    numeroIdentificacion: 'RUC',
    razonSocial: 'razonSocial',
    nombreComercial: 'nombreComercial',
    telefonoPrincipal: 'telefonoEmpresa',
    correoPrincipal: 'emailEmpresa',
    direccion: 'direccion',
    nombreRepresentanteLegal: 'nombreRepresentanteLegal',
    estado: 'estado',
    fechaCreacion: 'fechaCreacion',
}
export const mapperPerfilJuridicoDataToApi = Object.fromEntries(
    Object.entries(mapperPerfilJuridicoApiToData).map(([key, value]) => [value, key])
)

export const parseAdapterPerfilJuridicoCrud = (
    api: ListarClientesEmpresaDto
): ClienteEmpresaCrud => {
    return {
        id: api.clienteId || -1,
        numeroIdentificacion: api.numeroIdentificacion ?? '',
        nombreComercial: api.nombreComercial ?? '',
        razonSocial: api.razonSocial ?? '',
        telefonoPrincipal: api.telefonoEmpresa ?? '',
        correoPrincipal: api.correoEmpresa ?? '',
        direccion: api.direccion ?? '',
        nombreRepresentanteLegal: api.nombreRepresentanteLegal ?? '',
        estado: api.activo ?? true,
        // fechaCreacion: api. ? new Date(api.fechaCreacion) : new Date(),
    }
}
export const parseAdapterPerfilesJuridicosCrud = (
    api: ListarClientesEmpresaDto[]
): ClienteEmpresaCrud[] => {
    return api.map(parseAdapterPerfilJuridicoCrud)
}
export const parseAdapterPerfilJuridico = (api: ClientesEmpresaResponse): PerfilEmpresaData => {
    return {
        RUC: api.numeroIdentificacion ?? '',
        razonSocial: api.razonSocial ?? '',
        nombreComercial: api.nombreComercial ?? '',
        numeroSucursal: api.numeroSucursal ?? '',
        nombreSucursal: api.nombreSucursal ?? '',
        telefonoEmpresa: api.telefonoEmpresa ?? '',
        emailEmpresa: api.correoEmpresa ?? '',
        telefonoSecundario: api.telefonoEmpresaSecundario,
        emailSecundario: api.correoEmpresaSecundario,
        nombreRepresentanteLegal: api.nombreRepresentanteLegal ?? '',
    }
}
