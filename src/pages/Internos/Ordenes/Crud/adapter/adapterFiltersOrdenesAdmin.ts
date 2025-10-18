import { adaptObjectKeys, reverseMapObjectKeys } from '../../../../../adapters/mapper'
import { OrdenesFiltersType } from '../models/ordenFilter'

export const mapperOrdenesFiltersToApi: Record<keyof OrdenesFiltersType, string> = {
    fechaIngresoDesde: 'fechaDesde',
    fechaIngresoHasta: 'fechaHasta',
    estado: 'estado',
    tipoMantenimiento: 'tipoMantenimiento',
    tipoEquipo: 'tipoEquipo',
    tecnico: 'tecnico',
    prioridad: 'prioridad',
}
export const mapperOrdenesApiToFilters: Record<string, keyof OrdenesFiltersType> =
    reverseMapObjectKeys<OrdenesFiltersType, string>(mapperOrdenesFiltersToApi)

export function adapterFiltersOrdenesAdminFromApi(
    apiData: Record<string, any>
): Partial<OrdenesFiltersType> {
    return adaptObjectKeys<Record<string, any>, OrdenesFiltersType>(
        apiData,
        mapperOrdenesApiToFilters
    )
}
