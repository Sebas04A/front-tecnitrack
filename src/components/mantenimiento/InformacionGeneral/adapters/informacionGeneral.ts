import { InformacionGeneralType } from '../models/informacionGeneralOrden'

export const parseAdapterInformacionGeneral = (data: any): InformacionGeneralType => {
    const fecha = new Date(data.fechaHoraCita)
    const year = fecha.getFullYear()
    const month = String(fecha.getMonth() + 1).padStart(2, '0')
    const day = String(fecha.getDate()).padStart(2, '0')

    // Partes de la hora
    const hours = String(fecha.getHours()).padStart(2, '0')
    const minutes = String(fecha.getMinutes()).padStart(2, '0')

    // Construir formato YYYY-MM-DDTHH:MM
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`
    console.log({ formattedDateTime })
    return {
        numeroTurno: data.citaId ?? '',
        fechaTurno: formattedDateTime ?? '',
        numeroIdentificacion: data.numeroIdentificacion ?? '',
        nombreCompleto: data.nombreCompleto ?? '',
        direccion: data.direccionPrincipal ?? 'No registrada',
        telefono: data.telefonoPrincipal ?? 'No registrado',
    }
}
