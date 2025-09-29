import { adapterDireccion, parseAdapterDirecciones } from '../adapters/direccion'
import { DireccionesService, GestionClientesService } from '../api'
import { DireccionData } from '../validation/direccion.schema'

export const getDirecciones = async () => {
    try {
        const response = await DireccionesService.getApiDireccionesMisDirecciones()
        if (!response || !response.data) {
            throw new Error('No se recibieron datos de direcciones')
        }
        const data = parseAdapterDirecciones(response.data)
        console.log('Direcciones obtenidas:', data)
        return data
    } catch (error) {
        console.error('Error obteniendo direcciones:', error)
        throw error
    }
}
export const getDireccionByCliente = async (clienteId: number) => {
    const response = await GestionClientesService.getApiGestionClientesListarDirecciones({
        clienteId,
    })
    console.log('Datos obtenidos de direcciones por cliente:', response)
    if (!response || !response.data) {
        throw new Error('No se recibieron datos de direcciones')
    }
    return parseAdapterDirecciones(response.data)
}
export const createDireccion = async (direccion: DireccionData) => {
    const adaptedDireccion = adapterDireccion(direccion)
    console.log('Datos de la dirección a crear:', adaptedDireccion)
    // try {
    const response = await DireccionesService.postApiDireccionesCrearDireccion({
        requestBody: adaptedDireccion,
    })
    console.log('Dirección creada:', response)
    return response
}
export const createDireccionCliente = async (direccion: DireccionData, clienteId: number) => {
    const requestBody = adapterDireccion(direccion)
    console.log('Datos de la dirección a crear para cliente:', requestBody)
    const response = await GestionClientesService.postApiGestionClientesAgregarDireccion({
        clienteId,
        requestBody,
    })
    console.log('Dirección creada para cliente:', response)
    return response
}
export const updateDireccion = async (direccion: DireccionData) => {
    const adaptedDireccion = adapterDireccion(direccion)
    console.log('Datos de la dirección a actualizar:', adaptedDireccion)
    try {
        const response = await DireccionesService.putApiDireccionesActualizarDireccion({
            id: adaptedDireccion.id,
            requestBody: adaptedDireccion,
        })
        console.log('Dirección actualizada:', response)
        return response
    } catch (error) {
        console.error('Error al actualizar dirección:', error)
        throw error
    }
}
export const updateDireccionCliente = async (direccion: DireccionData) => {
    const requestBody = adapterDireccion(direccion)
    console.log('Datos de la dirección a actualizar para cliente:', requestBody)
    const response = await GestionClientesService.putApiGestionClientesActualizarDireccion({
        direccionId: requestBody.id!,
        requestBody,
    })
    console.log('Dirección actualizada para cliente:', response)
    return response
}
export const deleteDireccion = async (id: number) => {
    try {
        const response = await DireccionesService.deleteApiDireccionesEliminarDireccion({
            id,
        })
        console.log('Dirección eliminada:', response)
        return response
    } catch (error) {
        console.error('Error al eliminar dirección:', error)
        throw error
    }
}
export const deleteDireccionCliente = async (direccionId: number) => {
    const response = await GestionClientesService.deleteApiGestionClientesEliminarDireccion({
        direccionId,
    })
    console.log('Dirección eliminada para cliente:', response)
    return response
}
