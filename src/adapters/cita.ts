import {
    CitaAdministradorResponse,
    CitaRequest,
    CitaResponse,
    CrearCitaAdministradorRequest,
    ListarCitasResponse,
    MisCitasResponse,
} from '../api'
import { CitasFiltersType } from '../components/crudGrid/cruds/Citas/CitasFilters'
import { FilterParamOption } from '../components/crudGrid/helper/fetchWithFilters'
import { CitaDataCrud, citaDataCompleta } from '../types/cita'
import { CitasClienteDataType } from '../types/cliente/Cita'
import { CitaDataForm, CitaData } from '../validation/cita.schema'
import { convertirDateParaInput, parseFechaHora, parseFechaHoraParaInput } from './fecha'

export function parseCita(cita: CitaResponse): citaDataCompleta {
    // if (!cita.citaId) throw new Error('ID de la cita es requerido')
    // const tipoMantenimiento = cita.tipoMantenimiento || cita.otro
    return {
        // id: cita.id,
        fechaHoraInicio: cita.fechaHora ?? '',
        // hora: cita.hora ,
        // id: cita.citaId,
        tipoMantenimiento: cita.tipoMantenimiento ?? 'Otro',
        descripcion: cita.observaciones ?? '',
    }
}
export function parseCitas(citas: MisCitasResponse[]): citaDataCompleta[] {
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

export function adapterCitaAdmin(cita: CitaDataForm): CrearCitaAdministradorRequest {
    const tipoMantenimiento = cita.tipoMantenimiento || cita.otro || 'Otro'
    return {
        clienteId: cita.usuario,
        fechaHoraInicio: cita.fechaHoraInicio,
        tipoMantenimiento: tipoMantenimiento,
        observaciones: cita.descripcion,
    }
}
function parseCitaAdmin(cita: ListarCitasResponse): CitaDataCrud {
    const fecha = parseFechaHora(cita.fecha ?? '', cita.hora ?? '')
    // console.log(
    //     'Fecha parseada:',
    //     fecha,
    //     'from cita.fecha:',
    //     cita.fecha,
    //     'and hora:',
    //     hora,
    //     'string:',
    //     convertirDateParaInput(fecha)
    // )

    return {
        tipoMantenimiento: cita.tipoMantenimiento ?? '',
        descripcion: cita.observaciones ?? '',
        usuario: cita.usuarioId ?? -1,
        fechaHoraInicio: convertirDateParaInput(fecha) ?? '-1',
        hora: cita.hora ?? '',
        fecha,

        id: cita.id ?? -1,
        usuarioId: cita.usuarioId ?? -1,
        clienteId: cita.clienteId ?? -1,
        tipoIdentificacion: cita.tipoIdentificacion ?? '',
        numeroIdentificacion: cita.numeroIdentificacion ?? '',
        nombreCompleto: cita.nombreCompleto ?? '',
        tipoCliente: cita.tipoCliente ?? '',
        estado: String(cita.estado) ?? '',

        // estado: cita.estado ?? '',
        fechaCreacion: cita.fechaCreacion ?? new Date(-1).toISOString(),
        fechaActualizacion: cita.fechaActualizacion ?? new Date(-1).toISOString(),
    }
}
export function parseCitasAdmin(citas: ListarCitasResponse[]): CitaDataCrud[] {
    return citas.map(cita => parseCitaAdmin(cita))
}

export function parseCitasCliente(citas: MisCitasResponse[]): CitasClienteDataType[] {
    console.log(citas)
    return citas.map(cita => {
        const fechaString = parseFechaHoraParaInput(cita.fecha ?? '', cita.hora ?? '')
        const [fecha, hora] = fechaString.split('T')

        // const [hour, minute] = cita.hora.split(':').map(Number))
        // dt.setHours(hour, minute, 0, 0)
        // const fecha = dt
        const citaConvertido: CitasClienteDataType = {
            id: cita.citaId ?? -1,
            numeroCita: cita.numeroCita,
            usuarioId: cita.usuarioId,
            clienteId: cita.usuarioId,
            nombreCompleto: cita.nombreCompleto,
            // fecha: cita.fechaHora,
            // hora: cita.fechaHora,
            fechaHoraInicio: fechaString,
            fecha: fecha,
            hora: hora,
            estado: cita.estado,
            tipoMantenimiento: cita.tipoMantenimiento ?? '',
            descripcion: cita.observaciones,
            fechaCreacion: cita.fechaCreacion,
            fechaActualizacion: cita.fechaActualizacion,
        }
        return citaConvertido
    })
}

const parseNameFilters: Record<keyof CitasFiltersType, string> = {
    estadoCita: 'estado',
    fechaInicio: 'fechaDesde',
    fechaFin: 'fechaHasta',
    tipoMantenimiento: 'tipoMantenimiento',
}

export function adapterFiltersCita(filters?: CitasFiltersType) {
    return {
        estado: filters?.estadoCita || '',
        fechaDesde: filters?.fechaInicio || '',
        fechaHasta: filters?.fechaFin || '',
        tipoMantenimiento: filters?.tipoMantenimiento || '',
    }
}
