/**
 * Crea un objeto Date ajustado para que sus métodos (getHours, getDate, etc.)
 * devuelvan los valores correspondientes a la hora actual de Ecuador (UTC-5),
 * sin importar la zona horaria del servidor o navegador.
 * * @returns {Date} Un objeto Date compensado.
 */
export function obtenerDateActualEnEcuador(): Date {
    // 1. Crear una fecha con la hora actual del sistema.
    const ahora = new Date()

    // 2. Obtener el offset de la zona horaria local en milisegundos.
    //    date.getTimezoneOffset() devuelve minutos (ej: para UTC-5 devuelve 300).
    //    Lo multiplicamos por 60000 para convertirlo a milisegundos.
    const offsetLocalMs = ahora.getTimezoneOffset() * 60000

    // 3. Calcular el tiempo UTC real sumando el offset local.
    const utcMs = ahora.getTime() + offsetLocalMs

    // 4. Definir el offset de Ecuador (UTC-5) en milisegundos.
    //    5 horas * 60 min/hora * 60 seg/min * 1000 ms/seg
    const offsetEcuadorMs = -5 * 60 * 60 * 1000

    // 5. Crear la nueva fecha aplicando el offset de Ecuador al tiempo UTC.
    const fechaEcuador = new Date(utcMs + offsetEcuadorMs)

    return fechaEcuador
}

export function convertirDateParaInput(date: Date): string {
    const year = date.getFullYear()

    // getMonth() es 0-indexado (0 = Enero), por eso se suma 1.
    // padStart asegura que tenga dos dígitos (ej. 01, 02, ... 12).
    const month = (date.getMonth() + 1).toString().padStart(2, '0')

    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    // Unimos todo en el formato requerido.
    return `${year}-${month}-${day}T${hours}:${minutes}`
}
export function convertirSoloFechaParaInput(date: Date): string {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
}

export function parseFechaHoraUnido(fechaHoraApi: string): Date {
    const [fecha, hora] = fechaHoraApi.split('T')
    const [year, month, day] = fecha.split('-').map(Number)
    const [hour, minute] = hora.split(':').map(Number)
    const dt = new Date(year, month - 1, day, hour, minute)
    return dt
}

export function parseFechaHora(fechaApi: string, horaApi: string): Date {
    const hora = horaApi ?? '00:00'
    const [hour, minute] = hora.split(':').map(Number)
    const dt = new Date(fechaApi ?? -1)
    dt.setHours(hour, minute, 0, 0)
    return dt
}

export function parseFechaHoraParaInput(fechaApi: string, horaApi: string): string {
    const date = parseFechaHora(fechaApi, horaApi)
    return convertirDateParaInput(date)
}
