// En un archivo como src/utils/forms.ts

import { FieldErrors, FieldError } from 'react-hook-form'

/**
 * Navega un objeto de errores anidado de React Hook Form usando una cadena de texto.
 * @param errors El objeto de errores del formulario.
 * @param name El nombre del campo, ej: "direcciones.0.pais".
 * @returns El objeto FieldError o undefined si no se encuentra.
 */
export const getNestedError = (errors: FieldErrors, name: string): FieldError | undefined => {
    const nameParts = name.split('.')
    // La función reduce itera sobre las partes del nombre para profundizar en el objeto
    const error = nameParts.reduce((err, part) => {
        // Si en algún punto no encontramos la propiedad, devolvemos undefined
        if (!err) return undefined

        // Verificamos si la parte es un número (para los índices del array)
        const index = parseInt(part, 10)
        if (!isNaN(index)) {
            // Si es un índice, accedemos al array
            return Array.isArray(err) ? err[index] : undefined
        }

        // Si no es un índice, accedemos a la propiedad del objeto
        return err[part]
    }, errors)

    return error as unknown as FieldError | undefined
}
