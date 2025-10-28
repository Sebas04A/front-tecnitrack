// src/adapters/localidades.ts

import { CiudadFormData } from '../localidades.schema'

export interface CiudadData {
    id?: number
    nombre: string
    provinciaId: number
    provinciaNombre?: string
    paisNombre?: string
    esCapital: boolean
    activo: boolean
    fechaCreacion?: string
    fechaModificacion?: string
}

export function ciudadFormToApi(input: CiudadFormData): any {
    return {
        nombre: input.nombre,
        provinciaId: input.provinciaId,
        esCapital: input.esCapital,
        activo: input.activo,
    }
}

export function apiCiudadToData(api: any): CiudadData {
    return {
        id: api.id,
        nombre: api.nombre,
        provinciaId: api.provinciaId,
        provinciaNombre: api.provinciaNombre,
        paisNombre: api.paisNombre,
        esCapital: api.esCapital,
        activo: api.activo,
        fechaCreacion: api.fechaCreacion,
        fechaModificacion: api.fechaModificacion,
    }
}
