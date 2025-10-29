import { ClienteInternoRequest, ClienteInternoResponse } from '../../../../api'
import { UsuarioInternoData } from '../models/usuarioInterno'
import { adaptObjectKeys } from '../../../../adapters/mapper'

export const adapterUsuarioInterno = (data: UsuarioInternoData): ClienteInternoRequest => {
    return {
        nombres: data.nombreCompleto,
        apellidos: data.apellidoCompleto,
        genero: data.genero ?? 'Masculino',
        fechaNacimiento: data.fechaNacimiento?.split('T')[0] ?? '2000-01-01',
        telefono: data.telefono,
        correoElectronico: data.email,
        rol: data.rol,
        username: data.usuario,
        password: data.contraseña,
        tipoDocumento: data.tipoIdentificacion,
        numeroIdentificacion: data.numeroIdentificacion,
    }
}

export const mapperUsuarioInternoFromApi: Partial<
    Record<keyof ClienteInternoResponse, keyof UsuarioInternoData>
> = {
    id: 'id',
    usuarioId: 'id',
    nombreCompleto: 'nombreCompleto',
    apellidos: 'apellidoCompleto',
    genero: 'genero',
    fechaNacimiento: 'fechaNacimiento',
    telefono: 'telefono',
    correoElectronico: 'email',
    rol: 'rol',
    username: 'usuario',
    // contraseña: 'password',
    // estado: 'estado',
    tipoDocumento: 'tipoIdentificacion',
    numeroIdentificacion: 'numeroIdentificacion',
    usuarioActivo: 'estado',
}

export const parseAdapterUsuarioInterno = (
    data: ClienteInternoResponse[]
): UsuarioInternoData[] => {
    // const rol = data.rol === 'Empleado' ? 'Empleado' : 'Cliente'
    const usuarios = data.map(cliente => {
        return adaptObjectKeys(cliente, mapperUsuarioInternoFromApi)
    })
    return usuarios as UsuarioInternoData[]
}

// return {
//     nombreCompleto: data.nombres ?? '',
//     apellidoCompleto: data.apellidos ?? '',
//     genero: data.genero ?? 'Masculino',
//     fechaNacimiento: data.fechaNacimiento ?? '',
//     telefono: data.telefono ?? '',
//     email: data.correoElectronico ?? '',
//     rol: data.rol ?? '',
//     usuario: data.username ?? '',
//     contraseña: 'Oculta',
//     estado: 'Activo',
//     id: data.id ?? -1,
//     tipoDocumento: data.tipoDocumento ?? '',
//     numeroDocumento: data.numeroIdentificacion ?? '',
// }
