import React, { useEffect, useMemo } from 'react'
import GenericInput from './GenericInput'
import {
    Control,
    Controller,
    FieldErrors,
    get,
    UseFormRegister,
    UseFormWatch,
} from 'react-hook-form'
import { getNestedError } from '../../../utils/formError'
import { getCatalogo } from '../../../pages/Internos/catalogo/generales/services/catalogos'
import { Option } from '../../../types/form'
import { input } from 'framer-motion/client'

type BaseProps = {
    label?: string
    name: string
    control: Control<any>
    className?: string
    isReadOnly?: boolean
    required?: boolean
    endContent?: React.ReactNode
    mostrarEspacioError?: boolean
    /** Texto para opción vacía al inicio. Pásalo si quieres una opción de placeholder. */
    placeholderOptionLabel?: string
    /** Muestra un texto mientras carga opciones remotas */
    loadingLabel?: string
    /** Muestra un texto cuando hubo un error al cargar opciones remotas */
    errorLabel?: string
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'name' | 'className' | 'required'>

/** Puedes pasar options estáticas... */
type StaticOptions = {
    options: Option[]
    tipoCatalogo?: never
}

/** ...o una función que cargue opciones (se invoca al montar o cuando cambie refreshKey). */
type AsyncOptions = {
    options?: never
    tipoCatalogo?: string
    getOptions?: () => Promise<Option[]>
    /** Cambia este valor para forzar refetch (opcional). */
    refreshKey?: React.DependencyList
}

type GenericSelectProps = BaseProps & (StaticOptions | AsyncOptions)

const GenericSelect: React.FC<GenericSelectProps> = ({
    label,
    name,
    control,
    className,
    isReadOnly,
    required,
    placeholderOptionLabel,

    loadingLabel = 'Cargando…',
    mostrarEspacioError,
    errorLabel = 'No se pudieron cargar las opciones',
    ...rest
}) => {
    // useEffect(() => {
    //     console.log('ERRORS EN SELECT', errors)
    // }, [errors])
    // const errorObject = errors ? getNestedError(errors, name) : undefined
    // const errorMessage = errorObject?.message as string | undefined
    if (!control) {
        throw new Error(
            'GenericSelect requiere la prop "control" de react-hook-form. Select: ' + name
        )
    }

    const [remoteOptions, setRemoteOptions] = React.useState<Option[] | null>(null)
    const [loading, setLoading] = React.useState(false)
    const [loadError, setLoadError] = React.useState<string | null>(null)

    // // Extraer props de fuente de datos y separar de props HTML del select
    const {
        options: staticOptions,
        tipoCatalogo,
        getOptions,
        refreshKey,
        ...htmlSelectProps
    } = rest as {
        options?: Option[]
        tipoCatalogo?: string
        getOptions?: () => Promise<Option[]>
        refreshKey?: React.DependencyList
    } & React.SelectHTMLAttributes<HTMLSelectElement>

    // const currentValue = watch && watch(name)
    // console.log('GenericSelect - currentValue:', currentValue)

    // // Si nos pasaron tipoCatalogo, traemos datos
    const isAsync = typeof tipoCatalogo === 'string' || (getOptions && !!getOptions)

    React.useEffect(
        () => {
            // console.warn('SINCRONO', isAsync, tipoCatalogo, getOptions)
            if (!isAsync) return
            const controller = new AbortController()
            let mounted = true

            const run = async () => {
                // console.warn('Cargando opciones para select…', { tipoCatalogo, getOptions })
                try {
                    setLoading(true)
                    setLoadError(null)
                    let data
                    if (getOptions) {
                        data = await getOptions()
                    } else if (tipoCatalogo) {
                        data = await getCatalogo(tipoCatalogo)
                    } else {
                        return
                    }
                    // console.log('Datos obtenidos para select:', data)
                    if (!data) return
                    if (mounted) setRemoteOptions(data)
                } catch (e) {
                    console.error('Error cargando opciones para select:', e)
                    if (mounted && (e as any)?.name !== 'AbortError') {
                        setLoadError(errorLabel)
                        setRemoteOptions([])
                    }
                } finally {
                    if (mounted) setLoading(false)
                }
            }

            run()
            return () => {
                mounted = false
                controller.abort()
            }
            // Refetch si cambia refreshKey (si no lo pasas, corre sólo al montar)
        },
        isAsync ? refreshKey ?? [] : []
    )

    // // Determinar el origen de opciones
    // const baseOptions: Option[] = isAsync ? remoteOptions ?? [] : (staticOptions as Option[])
    // // Placeholder opcional al inicio
    // const computedOptions = useMemo(() => {
    //     const baseOptions: Option[] = isAsync ? remoteOptions ?? [] : (staticOptions as Option[])
    //     let finalOptions = [...baseOptions]
    //     console.log('Base options for select:', baseOptions, 'currentValue:', currentValue)

    //     const valueExistsInOptions = baseOptions.some(
    //         opt => String(opt.value) === String(currentValue)
    //     )

    //     if (isAsync && currentValue && !valueExistsInOptions) {
    //         console.log(
    //             'El valor actual no está en las opciones, agregando:',
    //             currentValue,
    //             'a las opciones',
    //             baseOptions
    //         )
    //         // Agregar el valor actual al inicio si no está en las opciones
    //         finalOptions.unshift({ value: currentValue, label: String(currentValue) })
    //     }
    //     console.log('Final options for select:', finalOptions)

    //     // El placeholder ahora tiene 'hidden: true'
    //     return [
    //         {
    //             value: '',
    //             label: placeholderOptionLabel ?? 'Escoger ' + label,
    //             hidden: true, // <-- ¡AQUÍ ESTÁ EL CAMBIO!
    //         },
    //         ...finalOptions,
    //     ]
    // }, [isAsync, remoteOptions, staticOptions, currentValue, placeholderOptionLabel, label])

    // // Estados especiales para async
    // const effectiveError = errorMessage ?? loadError ?? undefined

    // // Si quieres deshabilitar el select mientras carga (opcional)
    // const disabledWhileLoading = isAsync && loading
    // // console.log('HTML PROPS ', htmlSelectProps)
    // const safeRegister = React.useMemo(
    //     () => (remoteOptions && register ? register : undefined),
    //     [remoteOptions, register, name]
    // )
    return (
        <>
            {/* <GenericInput
                label={label}
                type='select'
                name={name}
                register={register}
                error={effectiveError}
                className={className}
                isReadOnly={isReadOnly || disabledWhileLoading}
                required={required}
                options={
                    isAsync && loading && !remoteOptions
                        ? // Mientras no hay datos, mostramos una “opción de carga”
                          [{ value: '', label: loadingLabel }]
                        : computedOptions
                }
                mostrarEspacioError={
                    mostrarEspacioError ?? (register && !isReadOnly) ? true : false
                }
                {...(htmlSelectProps as any)}
            /> */}
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => {
                    const computedOptions = useMemo(() => {
                        const baseOptions: Option[] = rest.options ?? remoteOptions ?? []

                        return [
                            { value: '', label: `Escoger ${label}`, disabled: true, hidden: true },
                            ...baseOptions,
                        ]
                    }, [remoteOptions, rest.options, field.value, label])

                    return (
                        <GenericInput
                            label={label}
                            type='select'
                            name={field.name}
                            isReadOnly={isReadOnly || loading}
                            required={required}
                            className={className}
                            options={
                                loading && !remoteOptions
                                    ? [{ value: '', label: 'Cargando...' }]
                                    : computedOptions
                            }
                            mostrarEspacioError={mostrarEspacioError ?? !isReadOnly ? true : false}
                            // Pasamos las propiedades del Controller al input
                            value={field.value || ''}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            // ref={field.ref}
                            // Y también el error
                            error={fieldState.error?.message}
                        />
                    )
                }}
            />
        </>
    )
}

export default GenericSelect
