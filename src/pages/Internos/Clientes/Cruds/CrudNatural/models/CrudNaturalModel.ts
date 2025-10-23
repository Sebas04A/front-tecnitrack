export interface ClienteNaturalCrud {
    id: number
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
