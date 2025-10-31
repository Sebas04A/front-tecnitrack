import { CiudadFormData } from '../../localidades.schema'
import { CiudadData } from '../models.ts/ciudad'

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
