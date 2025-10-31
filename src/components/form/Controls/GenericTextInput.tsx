import GenericInput from './GenericInput'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { getNestedError } from '../utils/formError'

type GenericTextInputProps = {
    label?: string
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
    name: string
    register?: UseFormRegister<any>
    errors?: FieldErrors
    className?: string
    isReadOnly?: boolean
    placeholder?: string
    required?: boolean
    endContent?: React.ReactNode
    mostrarEspacioError?: boolean
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'className' | 'required'>

const GenericTextInput: React.FC<GenericTextInputProps> = ({
    label,
    type = 'text',
    name,
    register,
    errors,
    className,
    isReadOnly,
    placeholder,
    required,
    ...rest
}) => {
    const errorObject = errors ? getNestedError(errors, name) : undefined
    const errorMessage = errorObject?.message as string | undefined

    return (
        <GenericInput
            label={label}
            type={type}
            name={name}
            register={register}
            error={errorMessage}
            className={className}
            isReadOnly={isReadOnly}
            placeholder={placeholder}
            required={required}
            {...rest}
        />
    )
}

export default GenericTextInput
