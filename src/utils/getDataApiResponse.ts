export const getDataApiResponse = async (promise: Promise<any>): Promise<any> => {
    try {
        const response = await promise
        console.log('Respuesta de la API :', response)
        return response.value
    } catch (error) {
        console.error('Error al obtener datos de la API:', error)
        throw error
    }
}
