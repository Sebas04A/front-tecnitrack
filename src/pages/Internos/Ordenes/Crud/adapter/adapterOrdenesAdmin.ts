import { adaptObjectKeys, reverseMapObjectKeys } from '../../../../../adapters/mapper'
import { ListarOrdenesActivasDto } from '../../../../../api'
import { OrdenData } from '../models/ordenData'

export const mapperOrdenesAdminToApi: Record<
    keyof OrdenData,
    keyof ListarOrdenesActivasDto | undefined
> = {
    numeroOrden: 'numeroOrden',
    fechaIngresoOrden: 'fechaIngresoOrden',
    clienteNombre: 'cliente',
    tecnicoNombre: 'tecnicoAsignado',
    prioridad: 'prioridad',
    estado: 'estado',
    tipoMantenimiento: undefined,
    equipoNombre: undefined,
    progreso: undefined,
}

export const mapperApiToOrdenesAdmin: Record<keyof ListarOrdenesActivasDto, keyof OrdenData> =
    Object.entries(mapperOrdenesAdminToApi).reduce((acc, [frontKey, apiKey]) => {
        if (apiKey) {
            acc[apiKey] = frontKey as keyof OrdenData
        }
        return acc
    }, {} as Record<keyof ListarOrdenesActivasDto, keyof OrdenData>)

export function adapterOrdenesAdminFromApi(apiData: ListarOrdenesActivasDto): Partial<OrdenData> {
    return adaptObjectKeys<ListarOrdenesActivasDto, OrdenData>(apiData, mapperApiToOrdenesAdmin)
}
