import { FieldError, FieldErrors, UseFormRegister } from 'react-hook-form'
import GenericInput from './GenericInput'
import { getNestedError } from '../../../utils/formError'

export default function GenericSelect({
    label,
    name,
    register,
    errors,
    options,
    isReadOnly,
}: {
    label?: string
    name: string
    register: UseFormRegister<any>
    errors?: FieldErrors
    options: { value: string; label: string }[]
    isReadOnly?: boolean
}) {
    const errorObject = errors ? getNestedError(errors, name) : undefined
    const errorMessage = errorObject?.message

    return (
        <GenericInput
            label={label}
            name={name}
            options={options}
            type='select'
            register={register}
            error={errorMessage}
            isReadOnly={isReadOnly}
        />
    )
}
