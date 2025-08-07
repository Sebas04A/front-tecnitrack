import { useState } from 'react'
import GenericInput from './GenericInput'
import { FieldError, FieldErrors, UseFormRegister } from 'react-hook-form'
import { getNestedError } from '../../../utils/formError'

type GenericTextInputProps = {
    label?: string
    type: 'email' | 'password' | 'text'
    name: string
    register: UseFormRegister<any>
    errors?: FieldErrors
    className?: string
    isReadOnly?: boolean
    // requiredMessage?: string
}

const GenericTextInput: React.FC<GenericTextInputProps> = ({
    label,
    type,
    name,
    register,
    errors,
    className,
    isReadOnly,
    // requiredMessage,
}) => {
    if (!register) {
        throw new Error('Register function is required for GenericTextInput')
    }
    const errorObject = errors ? getNestedError(errors, name) : undefined
    const errorMessage = errorObject?.message

    return (
        <GenericInput
            label={label}
            type={type}
            name={name}
            register={register}
            error={errorMessage}
            className={className}
            isReadOnly={isReadOnly}
            // required={isRequired}
        />
    )
}

export default GenericTextInput
