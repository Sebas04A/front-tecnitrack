import {
    ActivosService,
    AsociarActivoOrdenRequest,
    CrearActivoYAsociarRequest,
    OrdenesService,
} from '../../../../api'
import { Option } from '../../../../types/form'

export const buscarSelectActivo = async (ordenId: number, query: string): Promise<Option[]> => {
    console.log('Buscando activo con query:', query)
    const res = await OrdenesService.getApiOrdenesBuscarActivosOrden({
        ordenId,
        filtroTexto: query,
    })
    console.log('Activos encontrados:', res)
    if (!res.data) throw new Error('No se encontraron activos')
    const options: Option[] = res.data.map(activo => ({
        value: String(activo.id) ?? '-1',
        label: `${activo.nombreComercial} - ${activo.marca} ${activo.modelo} (S/N: ${activo.numeroSerie})`,
    }))
    return options
}

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

export const postActivo = async (data: any, N_ORDEN: number) => {
    // Simular llamada a API
    const requestBody: AsociarActivoOrdenRequest = {
        activoId: data.equipo,
        accesoriosIncluidos: data.accesorios,
    }
    console.log('POST ACTIVO EXISTENTE', { requestBody }, 'en orden', N_ORDEN)

    const res = await OrdenesService.postApiOrdenesAsociarActivo({ id: N_ORDEN, requestBody })
    console.log('Activo guardado:', res)
    return { success: true }
}

export const postActivoNuevo = async (data: any, N_ORDEN: number) => {
    console.log('POST ACTIVO NUEVO', { data })
    const requestBody: CrearActivoYAsociarRequest = {
        tipoActivoId: Number(data.tipoEquipo),
        subTipoActivoId: Number(data.subtipo),
        marcaId: Number(data.marca),
        modelo: data.modelo,
        numeroSerie: data.numeroSerie,
        nombreComercial: data.nombreComercial,
        accesoriosIncluidos: data.accesorios,
    }
    console.log(requestBody)
    const res = await OrdenesService.postApiOrdenesCrearActivoYAsociar({ id: N_ORDEN, requestBody })
    console.log('Activo nuevo creado y asociado:', res)
    return res
}
export const getInformacionActivo = async (id: number) => {
    const activo = await ActivosService.getApiActivosObtenerActivoDetalle({ id })
    console.log('Activo encontrado:', activo)
    // if (!res.data) throw new Error('No se encontraron datos del activo')
    return {
        tipoEquipo: activo.tipoActivoId,
        subtipo: activo.subTipoActivoId,
        marca: activo.marcaId,
        modelo: activo.modelo,
        numeroSerie: activo.numeroSerie,
        nombreComercial: activo.nombreComercial,
    }
}
export const getObtenerActivoOrden = async (ordenId: number) => {
    const res = await OrdenesService.getApiOrdenesBuscarActivosOrden({ ordenId })
    console.log('Activo de la orden encontrado:', res)
    if (!res.data) throw new Error('No se encontraron activos asociados a la orden')
    const activo = res.data[0]
    return {
        tipoEquipo: activo.tipoActivoId,
        subtipo: activo.subTipoActivoId,
        marca: activo.marcaId,
        modelo: activo.modelo,
        numeroSerie: activo.numeroSerie,
        nombreComercial: activo.nombreComercial,
    }
}

export const getInformacionActivoAsignado = async (ordenId: number) => {
    const res = await OrdenesService.getApiOrdenesObtenerActivoAsociadoOrden({ id: ordenId })
    console.log('Activo asignado a la orden encontrado:', res)
    if (!res || !res.data) throw new Error('No se encontraron activos asociados a la orden')
    const data = res.data
    return {
        tipoEquipo: data.tipoActivo?.id,
        subtipo: data.subtipoActivo?.id,
        marca: data.marca?.id,
        modelo: data.modelo,
        numeroSerie: data.numeroSerie,
        nombreComercial: data.nombreComercial,
    }
}
