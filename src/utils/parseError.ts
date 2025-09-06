// src/utils/parseError.ts

export function parseAxiosError(error: unknown): string {
    // console.log('Parsing error:', error)
    // if (error instanceof AxiosError) {
    //     const dataErrors: Record<string, any>[] = Array.isArray(error.response?.data)
    //         ? error.response?.data
    //         : []
    //     const errorMessages = dataErrors.map(err => err.message || err).join(', ')
    //     if (errorMessages) return errorMessages

    //     if (error.response?.status === 401) return 'No autorizado'
    //     if (error.response?.status === 403) return 'Acceso denegado'
    //     if (error.response?.status === 500) return 'Error interno del servidor'

    //     return `Error ${error.response?.status || ''} desconocido`
    // }
    error = error as Error
    if (error instanceof Error) {
        return error.message || 'Error desconocido'
    }

    return 'Error inesperado al procesar la solicitud'
}
