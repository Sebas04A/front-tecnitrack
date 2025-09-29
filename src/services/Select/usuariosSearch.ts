import {
    BuscarInspectorMantenimientoRequest,
    BuscarTecnicoMantenimientoRequest,
    OrdenesService,
} from '../../api'

export const getInspectoresSearch = async (query: string) => {
    const requestBody: BuscarInspectorMantenimientoRequest = {
        termino: query,
    }
    const res = await OrdenesService.postApiOrdenesBuscarInspectoresMantenimiento({ requestBody })
    console.warn({ res })
    return res.data
}
export const getTecnicosSearch = async (query: string) => {
    const requestBody: BuscarTecnicoMantenimientoRequest = {
        termino: query,
    }
    const res = await OrdenesService.postApiOrdenesBuscarTecnicosMantenimiento({ requestBody })
    console.warn({ res })
    if (!res || !res.data) return []
    return res.data
}
