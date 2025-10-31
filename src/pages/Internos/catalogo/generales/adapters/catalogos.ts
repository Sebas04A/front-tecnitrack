import { CatalogoDto } from '../../../../../api'
import { Option } from '../../../../../types/form'
import { CatalogoFormData } from '../models/catalogo.schema'

export function obtenerCatalogos(data: CatalogoDto[]): Option[] {
    if (!data) return []
    return data.map(item => ({
        value: item.valor ?? '',
        label: item.valor ?? '',
    }))
}
export function parseAdapterCatalogo(data: CatalogoDto[]): CatalogoFormData[] {
    if (!data) return []
    return data.map(item => ({
        id: item.id,
        tipo: item.tipo ?? '',
        valor: item.valor ?? '',
        descripcion: item.descripcion ?? '',
        activo: item.activo ?? false,
        orden: item.orden ?? 0,
    }))
}
export function adapterCatalogo(data: CatalogoFormData): CatalogoDto {
    return {
        id: data.id,
        tipo: data.tipo,
        valor: data.valor,
        descripcion: data.descripcion,
        activo: data.activo,
        orden: data.orden,
    }
}
