export type rolType = 'interno' | 'usuario'

export interface ClienteNaturalCrud {
    clienteId: number
    tipoIdentificacion: string
    numeroIdentificacion: string
    nombreCompleto: string
    telefono: string
    correo: string
    direccion: string
    estado: boolean
    fechaCreacion: Date
    [key: string]: unknown
}
export interface ClienteEmpresaCrud {
    clienteId: number
    numeroIdentificacion: string
    nombreComercial: string
    razonSocial: string
    telefonoPrincipal: string
    correoPrincipal: string
    direccion: string
    nombreRepresentanteLegal: string
    estado: boolean
    fechaCreacion: Date
    [key: string]: unknown
}
