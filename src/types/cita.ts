export interface Cita {
    id: number
    userId: number
    fechaHoraInicio: string // Formato ISO: "2025-07-22T20:15:00"
    fechaHoraFin: string
    tipoMantenimiento: string
    descripcion: string
    activo: boolean
    usuarios: null | any // Ajustar si 'usuarios' tiene una estructura definida
}
export interface CitaFormData {
    fechaHoraInicio: string // Formato ISO: "2025-07-22T
    tipoMantenimiento: string
    descripcion: string
}
