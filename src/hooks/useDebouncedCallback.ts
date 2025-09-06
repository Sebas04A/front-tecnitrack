import { useCallback, useEffect, useRef } from 'react'

/**
 * Hook para crear una función debounced que se mantiene estable entre renders.
 * Cancela automáticamente el timeout al desmontar.
 */
export function useDebouncedCallback<T extends (...args: any[]) => void>(
    callback: T,
    delay: number
) {
    const timeoutRef = useRef<number | undefined>()
    const cbRef = useRef(callback)

    // Mantener callback actualizada sin recrear la función debounced
    useEffect(() => {
        cbRef.current = callback
    }, [callback])

    const debounced = useCallback(
        (...args: Parameters<T>) => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
            timeoutRef.current = window.setTimeout(() => {
                cbRef.current(...args)
            }, delay)
        },
        [delay]
    )

    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current)
            timeoutRef.current = undefined
        }
    }, [])

    const flush = useCallback(() => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current)
            timeoutRef.current = undefined
            cbRef.current()
        }
    }, [])

    useEffect(() => () => cancel(), [cancel])

    return { debounced, cancel, flush }
}

export default useDebouncedCallback
