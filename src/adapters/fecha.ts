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
