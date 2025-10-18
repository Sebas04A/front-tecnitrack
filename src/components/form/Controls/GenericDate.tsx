import GenericInput from './GenericInput'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { getNestedError } from '../../../utils/formError'

type GenericDateProps = {
    label?: string
    name: string
    register?: UseFormRegister<any>
    errors?: FieldErrors
    className?: string
    isReadOnly?: boolean
    placeholder?: string
    required?: boolean
    /** Tipo de input. Por defecto 'date'. */
    inputType?: 'date' | 'datetime-local' | 'time'
    // Permitir uso controlado/no controlado
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    value?: string | number | readonly string[]
    defaultValue?: string | number
    mostrarEspacioError?: boolean
}

const GenericDate: React.FC<GenericDateProps> = ({
    label,
    name,
    register,
    errors,
    className,
    isReadOnly,
    placeholder,
    required,
    inputType = 'date',
    mostrarEspacioError,
    ...rest
}) => {
    const errorObject = errors ? getNestedError(errors, name) : undefined
    const errorMessage = errorObject?.message as string | undefined

    return (
        <GenericInput
            label={label}
            type={inputType}
            name={name}
            register={register}
            error={errorMessage}
            className={className}
            isReadOnly={isReadOnly}
            placeholder={placeholder}
            required={required}
            value={rest.value}
            mostrarEspacioError={mostrarEspacioError}
            {...rest}
        />
    )
}

export default GenericDate
