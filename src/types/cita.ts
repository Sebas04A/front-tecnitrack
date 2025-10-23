import { CitaDataForm } from '../pages/Internos/Citas/Crud/models/validationCitaCrud'
import {  CitaData } from '../validation/cita.schema'

export type citaDataCompleta = CitaData & {
    fechaHoraInicio: string
}

// -------------------------ADMIN


export type CitaClienteData = CitaDataForm & {
    estado: boolean
}
