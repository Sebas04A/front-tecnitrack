import { ActivosService } from '../../api'

export const getComponentes = async () => {
    const response = await ActivosService.getApiActivosObtenerTodasPartes()
    return response.data
}
export const postComponente = async (data: any) => {
    const response = await ActivosService.postApiActivosCrearParte(data)
    return response.data
}
export const putComponente = async (id: number, data: any) => {
    const response = await ActivosService.putApiActivosActualizarParte({ id, ...data })
    return response.data
}
export const deleteComponente = async (id: number) => {
    const response = await ActivosService.deleteApiActivosEliminarParte({ id })
    return response.data
}
