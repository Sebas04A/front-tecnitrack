import { CitaDataForm, CitaData } from '../validation/cita.schema'

export type citaDataCompleta = CitaData & {
    fechaHoraInicio: string
}

// -------------------------ADMIN
export type CitaDataCrud = CitaDataForm & {
    id: number
    usuarioId: number
    clienteId: number
    tipoIdentificacion: string
    numeroIdentificacion: string
    nombreCompleto: string
    tipoCliente: string
    estado: string
    fechaCreacion: string
    fechaActualizacion: string
    hora: string
    fecha: Date
}

export type CitaClienteData = CitaDataForm & {
    estado: boolean
}
