import { CrearPaisDto, PaisDto } from '../../../../../../api'
import { PaisFormData } from './paises.schema'

// Tipo de dominio (DATA) que usará tu tabla/lógica interna
export interface PaisData {
    id?: number
    nombre: string
    codigoISO: string
    codigoTelefonico: string
    activo: boolean
    fechaCreacion?: string
    fechaModificacion?: string
}

// form -> api (sin tipos de API)
export function formToApi(input: PaisFormData): CrearPaisDto {
    return {
        nombre: input.nombre,
        codigoISO: input.codigoISO,
        codigoTelefonico: input.codigoTelefonico,
        activo: input.activo,
    }
}

// api -> data (normaliza el objeto del SDK a tu dominio)
export function apiToData(api: PaisDto): PaisData {
    return {
        id: api.id,
        nombre: api.nombre ?? '',
        codigoISO: api.codigoISO ?? '',
        codigoTelefonico: api.codigoTelefonico ?? '',
        activo: api.activo ?? false,
        fechaCreacion: api.fechaCreacion ?? '',
        fechaModificacion: api.fechaModificacion ?? '',
    }
}
