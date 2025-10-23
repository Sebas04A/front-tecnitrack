import { CitaDataForm } from './validationCitaCrud'

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
