import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { getNestedError } from '../../../utils/formError'

type GenericCheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'name'> & {
    /** Texto que aparece a la derecha del checkbox */
    label?: string
    /** Nombre del campo (requerido para RHF y accesibilidad) */
    name: string
    /** Opcional: register de react-hook-form */
    register?: UseFormRegister<any>
    /** Opcional: errores de RHF (para pintar y mostrar el mensaje) */
    errors?: FieldErrors
    /** Marca visual y atributo required */
    required?: boolean
    /** Readonly visual/UX; se mapea a disabled para inputs */
    isReadOnly?: boolean
    /** Clase extra para el contenedor */
    className?: string
}

const GenericCheckbox: React.FC<GenericCheckboxProps> = ({
    label,
    name,
    register,
    errors,
    required,
    isReadOnly = false,
    className,
    defaultChecked,
    onChange,
    onBlur,
    ...rest
}) => {
    // RHF: props del register si está presente
    const rhfProps = register ? register(name) : {}

    // Error de RHF (anidado) si se provee "errors"
    const errorObject = errors ? getNestedError(errors, name) : undefined
    const errorMessage = errorObject?.message as string | undefined

    const disabled = isReadOnly || rest.disabled

    // Clases
    const borderClasses = errorMessage ? 'border-red-500' : 'border-gray-300'
    const readonlyClasses = isReadOnly ? 'cursor-not-allowed' : 'cursor-pointer'

    return (
        <div
            className={`flex-1 min-w-[100px] flex h-full w-full items-center justify-center ${
                className ?? ''
            }`}
        >
            <div className='flex items-center gap-4'>
                <input
                    id={name}
                    name={name} // útil cuando NO usamos RHF
                    type='checkbox'
                    // Estilo base para checkbox
                    className={`size-6 border-2 rounded-2xl align-middle ${borderClasses} ${readonlyClasses}`}
                    // Accesibilidad
                    aria-invalid={!!errorMessage || undefined}
                    aria-describedby={errorMessage ? `${name}-error` : undefined}
                    // Comportamiento
                    disabled={disabled}
                    required={required}
                    // Default (uncontrolled) si no usamos controlled value
                    defaultChecked={defaultChecked}
                    // Eventos (si el consumidor pasa onChange/onBlur, se respetan; RHF también los maneja)
                    onChange={onChange}
                    onBlur={onBlur}
                    // Props de RHF (si existen)
                    {...rhfProps}
                    // Resto de props del input
                    {...rest}
                />

                {label && (
                    <label htmlFor={name} className='text-sm md:text-base select-none'>
                        {label} {required && <span className='text-red-500'>*</span>}
                    </label>
                )}
            </div>

            <div className='h-[1.25rem]'>
                {errorMessage && (
                    <p id={`${name}-error`} className='text-error text-xs'>
                        {errorMessage}
                    </p>
                )}
            </div>
        </div>
    )
}

export default GenericCheckbox
