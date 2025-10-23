import {
    CitaRequest,
    CitaResponse,
    CrearCitaClienteRequest,
    ListarCitasResponse,
    MisCitasResponse,
} from '../../../../../api'

import { CitasClienteDataType } from '../../../../../types/cliente/Cita'

import {
    convertirDateParaInput,
    parseFechaHora,
    parseFechaHoraParaInput,
} from '../../../../../adapters/fecha'
import { adaptObjectKeys } from '../../../../../adapters/mapper'
import { citaDataCompleta } from '../../../../../types/cita'
import { CitaDataCrud } from '../models/citaCrudModel'
import { CitaDataForm } from '../models/validationCitaCrud'
import { CitasFiltersType } from '../models/citaFiltersType'

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

export const mapperCitaAdminApiToData: Record<
    keyof ListarCitasResponse,
    keyof CitaDataCrud | undefined
> = {
    tipoMantenimiento: 'tipoMantenimiento',
    observaciones: 'descripcion',
    usuarioId: 'usuarioId',
    fecha: 'fechaHoraInicio',
    hora: 'hora',
    // fecha: 'fechaHoraInicio',
    id: 'id',
    // usuarioId: 'usuario',
    clienteId: 'clienteId',
    tipoIdentificacion: 'tipoIdentificacion',
    numeroIdentificacion: 'numeroIdentificacion',
    nombreCompleto: 'nombreCompleto',
    tipoCliente: 'tipoCliente',
    estado: 'estado',
    fechaCreacion: 'fechaCreacion',
    fechaActualizacion: 'fechaActualizacion',
    numeroCita: undefined,
} as const
export const mapperCitaAdminDataToApi = Object.fromEntries(
    Object.entries(mapperCitaAdminApiToData).map(([key, value]) => [value, key])
)

export function adapterCitaAdmin(cita: CitaDataForm): CrearCitaClienteRequest {
    const baseAdaptedObject = adaptObjectKeys<CitaDataForm, CrearCitaClienteRequest>(
        cita,
        mapperCitaAdminDataToApi,
        { keepUnmappedKeys: false }
    ) as CrearCitaClienteRequest

    console.log('Cita adaptada (admin): ', { baseAdaptedObject })
    return {
        ...baseAdaptedObject,
        tipoMantenimiento: cita.tipoMantenimiento || cita.otro || 'Otro',
        clienteId: cita.usuario,
    }

    // const tipoMantenimiento = cita.tipoMantenimiento || cita.otro || 'Otro'
    // return {
    //     clienteId: cita.usuario,
    //     fechaHoraInicio: cita.fechaHoraInicio,
    //     tipoMantenimiento: tipoMantenimiento,
    //     observaciones: cita.descripcion,
    // }
}
function parseCitaAdmin(cita: ListarCitasResponse): CitaDataCrud {
    const fecha = parseFechaHora(cita.fecha ?? '', cita.hora ?? '')
    const baseAdaptedObject = adaptObjectKeys<ListarCitasResponse, CitaDataCrud>(
        cita,
        mapperCitaAdminApiToData,
        { keepUnmappedKeys: true }
    )
    const citaParseada: CitaDataCrud = {
        ...baseAdaptedObject,
        fechaHoraInicio: convertirDateParaInput(fecha) ?? '-1',
        fecha,
        estado: String(cita.estado) ?? '',
        usuario: cita.usuarioId ?? -1,
    } as CitaDataCrud
    console.log('CITA PARSEADA: ', citaParseada)
    return citaParseada

    // return {
    //     tipoMantenimiento: cita.tipoMantenimiento ?? '',
    //     descripcion: cita.observaciones ?? '',
    //     usuario: cita.usuarioId ?? -1,
    //     fechaHoraInicio: convertirDateParaInput(fecha) ?? '-1',
    //     hora: cita.hora ?? '',
    //     fecha,

    //     id: cita.id ?? -1,
    //     usuarioId: cita.usuarioId ?? -1,
    //     clienteId: cita.clienteId ?? -1,
    //     tipoIdentificacion: cita.tipoIdentificacion ?? '',
    //     numeroIdentificacion: cita.numeroIdentificacion ?? '',
    //     nombreCompleto: cita.nombreCompleto ?? '',
    //     tipoCliente: cita.tipoCliente ?? '',
    //     estado: String(cita.estado) ?? '',

    //     // estado: cita.estado ?? '',
    //     fechaCreacion: cita.fechaCreacion ?? new Date(-1).toISOString(),
    //     fechaActualizacion: cita.fechaActualizacion ?? new Date(-1).toISOString(),
    // }
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

export function adapterFiltersCita(filters?: CitasFiltersType) {
    return {
        estado: filters?.estadoCita || '',
        fechaDesde: filters?.fechaInicio || '',
        fechaHasta: filters?.fechaFin || '',
        tipoMantenimiento: filters?.tipoMantenimiento || '',
    }
}


