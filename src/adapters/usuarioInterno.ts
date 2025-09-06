import { ClienteInternoRequest, ClienteInternoResponse } from '../api'
import { UsuarioInternoData } from '../validation/usuarioInterno'

export const adapterUsuarioInterno = (data: UsuarioInternoData): ClienteInternoRequest => {
    return {
        nombres: data.nombreCompleto,
        apellidos: data.apellidoCompleto,
        genero: data.genero ?? 'Masculino',
        fechaNacimiento: data.fechaNacimiento.split('T')[0],
        telefono: data.telefono,
        correoElectronico: data.email,
        rol: data.rol,
        username: data.usuario,
        password: data.contraseña,
        tipoDocumento: data.tipoDocumento,
        numeroIdentificacion: data.numeroDocumento,
    }
}

export const parseAdapterUsuarioInterno = (data: ClienteInternoResponse): UsuarioInternoData => {
    // const rol = data.rol === 'Empleado' ? 'Empleado' : 'Cliente'
    return {
        nombreCompleto: data.nombres ?? '',
        apellidoCompleto: data.apellidos ?? '',
        genero: data.genero ?? 'Masculino',
        fechaNacimiento: data.fechaNacimiento ?? '',
        telefono: data.telefono ?? '',
        email: data.correoElectronico ?? '',
        rol: data.rol ?? '',
        usuario: data.username ?? '',
        contraseña: 'Oculta',
        estado: 'Activo',
        id: data.id ?? -1,
        tipoDocumento: data.tipoDocumento ?? '',
        numeroDocumento: data.numeroIdentificacion ?? '',
    }
}
