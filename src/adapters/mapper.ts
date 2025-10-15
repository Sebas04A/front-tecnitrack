/**
 * Transforma las claves de un objeto según un mapa de correspondencias.
 *
 * @param sourceObject El objeto original que se va a transformar.
 * @param keyMap Un objeto que mapea las claves antiguas a las nuevas (ej: { backendKey: 'frontendKey' }).
 * Este mapa puede ser parcial; no necesita incluir todas las claves del objeto original.
 * @param options Opciones de configuración.
 * @param options.keepUnmappedKeys Si es `true`, las claves del objeto original que no estén en el mapa se mantendrán. Por defecto es `true`.
 * @returns Un nuevo objeto con las claves transformadas.
 */
export function adaptObjectKeys<T extends object, U extends object>(
    sourceObject: T,
    // 👇 LA CORRECCIÓN ESTÁ AQUÍ 👇
    keyMap: Partial<Record<keyof T, keyof U>>,
    options: { keepUnmappedKeys: boolean } = { keepUnmappedKeys: true }
): Partial<U> {
    if (!sourceObject || typeof sourceObject !== 'object') {
        return sourceObject as any
    }

    const { keepUnmappedKeys } = options
    const newObject: Partial<U> = {}

    for (const oldKey in sourceObject) {
        if (Object.prototype.hasOwnProperty.call(sourceObject, oldKey)) {
            const newKey = keyMap[oldKey as keyof T]

            if (newKey) {
                // Si hay una correspondencia en el mapa, usamos la nueva clave.
                newObject[newKey] = sourceObject[oldKey] as any
            } else if (keepUnmappedKeys) {
                // Si no hay correspondencia y queremos mantenerla, usamos la clave original.
                ;(newObject as any)[oldKey] = sourceObject[oldKey]
            }
            // Si no hay correspondencia y keepUnmappedKeys es false, la clave se omite.
        }
    }

    return newObject
}
