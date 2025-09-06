import {
    CitaAdministradorResponse,
    CitaRequest,
    CitaResponse,
    CrearCitaAdministradorRequest,
} from '../api'
import { CitaAdminType, citaDataCompleta } from '../types/cita'
import { CitaCrudData, CitaData } from '../validation/cita.schema'

export function parseCita(cita: CitaResponse): citaDataCompleta {
    // const tipoMantenimiento = cita.tipoMantenimiento || cita.otro
    return {
        // id: cita.id,
        fechaHoraInicio: cita.fechaHora ?? new Date().toISOString(),
        tipoMantenimiento: cita.tipoMantenimiento ?? 'Otro',
        descripcion: cita.observaciones ?? '',
    }
}
export function parseCitas(citas: CitaResponse[]): citaDataCompleta[] {
    return citas.map(cita => parseCita(cita))
}
export function adapterCita(cita: citaDataCompleta): CitaRequest {
    const tipoMantenimiento = cita.tipoMantenimiento || cita.otro || 'Otro'
    return {
        fechaHoraInicio: cita.fechaHoraInicio,
        tipoMantenimiento: tipoMantenimiento,
        descripcion: cita.descripcion,
    }
}

export function adapterCitaAdmin(cita: CitaCrudData): CrearCitaAdministradorRequest {
    const tipoMantenimiento = cita.tipoMantenimiento || cita.otro || 'Otro'
    return {
        clienteId: cita.usuario,
        fechaHoraInicio: new Date(cita.fechaHoraInicio).toISOString(),
        tipoMantenimiento: tipoMantenimiento,
        observaciones: cita.descripcion,
    }
}
function parseCitaAdmin(cita: CitaAdministradorResponse): CitaAdminType {
    const hora = cita.hora ?? '00:00'
    const [hour, minute] = hora.split(':').map(Number)
    const dt = new Date(cita.fecha ?? -1)
    dt.setHours(hour, minute, 0, 0)
    const fecha = dt

    return {
        tipoMantenimiento: cita.tipoMantenimiento ?? '',
        descripcion: cita.observaciones ?? '',
        usuario: cita.usuarioId ?? -1,
        fechaHoraInicio: cita.fecha ?? '-1',
        hora: cita.hora ?? '',
        fecha,

        id: cita.id ?? -1,
        usuarioId: cita.usuarioId ?? -1,
        clienteId: cita.clienteId ?? -1,
        tipoIdentificacion: cita.tipoIdentificacion ?? '',
        numeroIdentificacion: cita.numeroIdentificacion ?? '',
        nombreCompleto: cita.nombreCompleto ?? '',
        tipoCliente: cita.tipoCliente ?? '',
        estado: cita.estado ?? '',
        fechaCreacion: cita.fechaCreacion ?? new Date(-1).toISOString(),
        fechaActualizacion: cita.fechaActualizacion ?? new Date(-1).toISOString(),
    }
}
export function parseCitasAdmin(citas: CitaAdministradorResponse[]): CitaAdminType[] {
    return citas.map(cita => parseCitaAdmin(cita))
}
