import { ProvinciaFormData } from "../../validation/localidades.schema"

export interface ProvinciaData {
    id?: number
    nombre: string
    paisId: number
    paisNombre?: string
    activo: boolean
    fechaCreacion?: string
    fechaModificacion?: string
}

export function provinciaFormToApi(input: ProvinciaFormData): any {
    return {
        nombre: input.nombre,
        paisId: input.paisId,
        activo: input.activo,
    }
}

export function apiProvinciaToData(api: any): ProvinciaData {
    return {
        id: api.id,
        nombre: api.nombre,
        paisId: api.paisId,
        paisNombre: api.paisNombre,
        activo: api.activo,
        fechaCreacion: api.fechaCreacion,
        fechaModificacion: api.fechaModificacion,
    }
}
