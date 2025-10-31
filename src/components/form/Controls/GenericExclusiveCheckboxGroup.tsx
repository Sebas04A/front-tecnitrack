import React, { useCallback, useMemo, useState } from 'react'
import GenericCheckbox from './GenericCheckbox'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { getNestedError } from '../utils/formError'

type Option = { value: string; label: string; disabled?: boolean }

type ExclusiveCheckboxGroupProps = {
    name: string
    options: Option[]
    label?: string
    required?: boolean
    isReadOnly?: boolean
    className?: string
    /** RHF opcional, como antes */
    register?: UseFormRegister<any>
    errors?: FieldErrors
    /** Estado controlado opcional (sin RHF) */
    value?: string
    onChange?: (value: string) => void
    /** Placeholder de valor inicial si no usas value ni defaultValues */
    defaultValue?: string
    /** Reglas de validación (solo si pasas register) */
    rules?: any
}

const ExclusiveCheckboxGroup: React.FC<ExclusiveCheckboxGroupProps> = ({
    name,
    options,
    label,
    required,
    isReadOnly = false,
    className,
    register,
    errors,
    value,
    onChange,
    defaultValue = '',
    rules,
}) => {
    // ----- ERROR RHF -----
    const errorObject = errors ? getNestedError(errors, name) : undefined
    const errorMessage = errorObject?.message as string | undefined
    console.log('ExclusiveCheckboxGroup error:', errorMessage)

    // ----- RHF register (para el input oculto) -----
    const rhfField = useMemo(
        () => (register ? register(name, rules) : undefined),
        [register, name, rules]
    )

    // ----- Estado interno si no es controlado -----
    const [innerValue, setInnerValue] = useState<string>(value ?? defaultValue)
    const currentValue = value !== undefined ? value : innerValue

    const setValueBoth = useCallback(
        (next: string) => {
            // 1) Estado/control externo
            if (onChange) onChange(next)
            else setInnerValue(next)

            // 2) Notificar a RHF (disparar onChange del campo registrado oculto)
            if (rhfField?.onChange) {
                // Simulamos un evento compatible con RHF
                rhfField.onChange({
                    target: { name, value: next },
                    type: 'change',
                })
            }
        },
        [name, onChange, rhfField]
    )

    return (
        <div className={`flex flex-col  ${className ?? ''}`}>
            {label && (
                <span className='text-sm md:text-base font-medium'>
                    {label} {required && <span className='text-red-500'>*</span>}
                </span>
            )}

            {/* Input REAL que se registra con RHF y guarda el string */}
            {register && (
                <input
                    type='hidden'
                    name={name}
                    // RHF props
                    ref={rhfField?.ref}
                    onBlur={rhfField?.onBlur}
                    // Valor actual del grupo
                    value={currentValue}
                    readOnly
                />
            )}

            <div className='flex flex-col gap-2 px-4'>
                {options.map(opt => (
                    <GenericCheckbox
                        key={opt.value}
                        name={`${name}__option__${opt.value}`} // nombre único por accesibilidad
                        label={opt.label}
                        checked={currentValue === opt.value}
                        onChange={e => setValueBoth(e.target.checked ? opt.value : '')}
                        required={false} // requerido se valida a nivel de grupo (input oculto)
                        isReadOnly={isReadOnly || opt.disabled}
                        disabled={opt.disabled}
                        // Pasamos error solo si el grupo está en error y esta opción es la activa (opcional)
                        aria-invalid={!!errorMessage || undefined}
                    />
                ))}
            </div>

            {errorMessage && (
                <p id={`${name}-error`} className='text-error text-xs mb-4'>
                    {errorMessage}
                </p>
            )}
        </div>
    )
}

export default ExclusiveCheckboxGroup
