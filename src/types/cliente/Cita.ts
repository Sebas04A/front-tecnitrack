export type CitasClienteDataType = {
    id: number
    numeroCita?: string | null
    usuarioId?: number
    clienteId?: number
    nombreCompleto?: string | null
    fecha?: string
    hora?: string | null
    fechaHoraInicio?: string | null
    estado?: string | null
    tipoMantenimiento: string | null
    descripcion?: string | null
    fechaCreacion?: string
    fechaActualizacion?: string | null
}
