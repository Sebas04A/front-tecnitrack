// src/services/citasApi.ts
import { CitasService } from '../api'
import { Cita } from '../types/cita'
import { getDataApiResponse } from '../utils/getDataApiResponse'

/**
 * Obtiene todas las citas desde la API.
 * Ahora procesa el objeto contenedor que retorna el backend.
 */
export const obtenerCitas = async (): Promise<Cita[]> => {
    try {
        const response = await getDataApiResponse(CitasService.getApiCitasObtenerCitas())
        console.log('Respuesta de la API al obtener citas:', response)
        return response // Devolvemos un array vacío para no romper la UI
    } catch (error) {
        console.error('Error al obtener las citas:', error)
        // Devolvemos un array vacío en caso de un error de red o de servidor
        return []
    }
}
export const crearCita = async (cita: Cita): Promise<Cita> => {
    try {
        const response = await getDataApiResponse(CitasService.postApiCitasCrearCita(cita))
        console.log('Respuesta de la API al crear cita:', response)
        return response
    } catch (error) {
        console.error('Error al crear la cita:', error)
        throw error
    }
}
