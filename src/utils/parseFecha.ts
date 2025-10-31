export function formatDate(fecha: Date): string {
    const year = fecha.getFullYear()
    const month = String(fecha.getMonth() + 1).padStart(2, '0')
    const day = String(fecha.getDate()).padStart(2, '0')
    const hours = String(fecha.getHours()).padStart(2, '0')
    const minutes = String(fecha.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day}T${hours}:${minutes}`
}

export function parseFecha(fechaStr: string): Date | null {
    if (!fechaStr) return null

    const fecha = new Date(fechaStr)
    return isNaN(fecha.getTime()) ? null : fecha
}

// export function dateToInput
