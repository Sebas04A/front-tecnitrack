import GenericInput from './GenericInput'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { getNestedError } from '../../../utils/formError'

type GenericTextareaProps = {
    label?: string
    name: string
    register?: UseFormRegister<any>
    errors?: FieldErrors
    className?: string
    isReadOnly?: boolean
    placeholder?: string
    required?: boolean
    rows?: number // Añadimos esta prop específica
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'className' | 'required'>

const GenericTextarea: React.FC<GenericTextareaProps> = ({
    label,
    name,
    register,
    errors,
    className,
    isReadOnly,
    placeholder,
    required,
    rows = 4, // Valor por defecto
    ...rest
}) => {
    const errorObject = errors ? getNestedError(errors, name) : undefined
    const errorMessage = errorObject?.message as string | undefined

    return (
        <GenericInput
            label={label}
            type='textarea' // <-- ¡Aquí está la magia!
            name={name}
            register={register}
            error={errorMessage}
            className={className}
            isReadOnly={isReadOnly}
            placeholder={placeholder}
            required={required}
            rows={rows}
            {...rest}
        />
    )
}

export default GenericTextarea
