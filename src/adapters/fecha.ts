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
