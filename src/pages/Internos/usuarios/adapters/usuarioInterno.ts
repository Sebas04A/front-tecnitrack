import { ClienteInternoRequest, ClienteInternoResponse } from '../../../../api'
import { UsuarioInternoData } from '../models/usuarioInterno'
import { adaptObjectKeys } from '../../../../adapters/mapper'
import { convertirDateParaInput, convertirSoloFechaParaInput } from '../../../../adapters/fecha'

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
    nombres: 'nombreCompleto',
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
    usuarioActivo: 'estadoString',
}

export const parseAdapterUsuarioInterno = (
    data: ClienteInternoResponse[]
): UsuarioInternoData[] => {
    // const rol = data.rol === 'Empleado' ? 'Empleado' : 'Cliente'
    const usuarios = data.map(cliente => {
        const usuario = adaptObjectKeys(cliente, mapperUsuarioInternoFromApi, {
            keepUnmappedKeys: false,
        })
        usuario.estadoString = cliente.usuarioActivo ? 'Activo' : 'Inactivo'
        const fecha = cliente.fechaNacimiento?.split('T')[0] ?? ''
        // const [year, month, day] = fecha.split('-')
        const fechaDate = new Date(cliente.fechaNacimiento ?? '')
        usuario.fechaNacimiento = convertirSoloFechaParaInput(fechaDate) ?? fecha

        // usuario.fechaNacimiento = `${day}-${month}-${year}`

        return usuario
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
