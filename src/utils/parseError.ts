export function parseAxiosError(error: unknown): string {
    error = error as Error
    if (error instanceof Error) {
        return error.message || 'Error desconocido'
    }

    return 'Error inesperado al procesar la solicitud'
}
