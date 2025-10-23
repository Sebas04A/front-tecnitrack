export interface ClienteEmpresaCrud {
    id: number
    numeroIdentificacion: string
    nombreComercial: string
    razonSocial: string
    telefonoPrincipal: string
    correoPrincipal: string
    direccion: string
    nombreRepresentanteLegal: string
    estado: boolean
    // fechaCreacion: Date
    [key: string]: unknown
}
