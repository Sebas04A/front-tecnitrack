import { ListarClientesNaturalesDto } from '../../../../../../api'
import { ClienteNaturalCrud } from '../models/CrudNaturalModel'

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
