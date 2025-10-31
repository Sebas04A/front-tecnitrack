import { ActivosService } from '../../../../../api'
import { Option } from '../../../../../types/form'

export const obtenerTiposActivosSelect = async (): Promise<Option[]> => {
    const res = await ActivosService.getApiActivosObtenerTipos()
    console.log('Tipos de activos encontrados:', res)
    return res.map((tipo: any) => ({
        value: tipo.id,
        label: tipo.nombre,
    }))
}
export const obtenerSubtiposActivosSelect = async (tipoId: number): Promise<Option[]> => {
    const res = await ActivosService.getApiActivosObtenerSubtiposPorTipo({ tipoId })
    console.log('Subtipos de activos encontrados:', res)
    return res.map((subtipo: any) => ({
        value: subtipo.id,
        label: subtipo.nombre,
    }))
}
export const obtenerMarcasActivosSelect = async (subTipoId: number): Promise<Option[]> => {
    const res = await ActivosService.getApiActivosObtenerMarcasPorSubtipo({ subTipoId })

    console.log('Marcas de activos encontrados:', res)
    return res.map((marca: any) => ({
        value: marca.id,
        label: marca.nombre,
    }))
}
