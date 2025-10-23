import { adaptObjectKeys, reverseMapObjectKeys } from '../../../../../adapters/mapper'
import { ListarOrdenesActivasDto } from '../../../../../api'
import { OrdenData } from '../models/ordenData'

export const mapperOrdenesAdminToApi: Record<
    keyof OrdenData,
    keyof ListarOrdenesActivasDto | undefined
> = {
    id: 'idOrden',
    numeroOrden: 'numeroOrden',
    fechaIngresoOrden: 'fechaIngresoOrden',
    clienteNombre: 'cliente',
    tecnicoNombre: 'tecnicoAsignado',
    prioridad: 'prioridad',
    estado: 'estado',
    tipoMantenimiento: 'tipoMantenimiento',
    equipoNombre: 'equipo',
    progreso: undefined,
    idCita: 'idCita',
}

export const mapperApiToOrdenesAdmin: Record<keyof ListarOrdenesActivasDto, keyof OrdenData> =
    Object.entries(mapperOrdenesAdminToApi).reduce((acc, [frontKey, apiKey]) => {
        if (apiKey) {
            acc[apiKey] = frontKey as keyof OrdenData
        }
        return acc
    }, {} as Record<keyof ListarOrdenesActivasDto, keyof OrdenData>)

export function adapterOrdenesAdminToApi(data: Partial<OrdenData>): Record<string, any> {
    return adaptObjectKeys<Partial<OrdenData>, Record<string, any>>(data, mapperOrdenesAdminToApi)
}

export function adapterOrdenesAdminFromApi(apiData: ListarOrdenesActivasDto[]): OrdenData[] {
    return apiData.map(item =>
        adaptObjectKeys<ListarOrdenesActivasDto, OrdenData>(item, mapperApiToOrdenesAdmin)
    ) as OrdenData[]
}
