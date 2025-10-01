import { SubmitHandler } from 'react-hook-form'
import { RegisterFormData } from '../../validation/register.schema'
import { parseAxiosError } from '../../utils/parseError'
import { useModalActions } from '../../hooks/useModalActions'
import { useEffect, useState } from 'react'
import GenericForm from '../form/GenericForm'
import GenericRowForm from '../form/GenericRowForm'
import GenericSelect from '../form/Controls/GenericSelect'
import GenericTextInput from '../form/Controls/GenericTextInput'
import GenericButton from '../form/Controls/GenericButton'
import GenericLink from '../form/Controls/GenericLink'

export default function RegisterComun<T>({
    tipoPersonaProp,
    form,
    signup,
}: {
    tipoPersonaProp?: 'Natural' | 'Empresa'
    form: any
    signup: (data: T) => Promise<any>
}) {
    console.log('Render RegisterComun')
    const [error, setError] = useState('')
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = form

    const onSubmit: SubmitHandler<T> = async data => {
        console.log('Registrando usuario:', data)
        setError('')
        try {
            const res = await signup(data)
            console.log(res)
            openModal()
            reset()
        } catch (err) {
            const message = parseAxiosError(err)
            console.error('Error during registration:', message)
            modal.showAlert({
                title: 'Error de Registro',
                message,
                type: 'error',
            })
            setError(message)
            // toast.error(message)
        }
    }

    const modal = useModalActions()

    function openModal() {
        console.log('Abriendo modal')
        modal.showAlert({
            title: 'Registro Exitoso',
            message: 'Revisa tu correo para verificar tu cuenta.',
            type: 'success',
        })
    }

    useEffect(() => {
        if (tipoPersonaProp === 'Empresa') {
            setTimeout(() => {
                setValue('tipoIdentificacion', 'RUC')
                console.log('Set tipoIdentificacion to RUC for Empresa')
            }, 1000)
        }
    }, [tipoPersonaProp])

    return (
        <>
            <GenericRowForm>
                <GenericSelect
                    label='Tipo de Identificación'
                    register={register}
                    name='tipoIdentificacion'
                    errors={errors}
                    tipoCatalogo='tipoDocumento'
                    loadingLabel='Cargando...'
                    isReadOnly={tipoPersonaProp === 'Empresa'}
                    mostrarEspacioError={true}
                />
                <GenericTextInput
                    label='Número de Identificación'
                    type='text'
                    register={register}
                    name='numeroIdentificacion'
                    errors={errors}
                    required
                />
            </GenericRowForm>
            {tipoPersonaProp === 'Natural' && (
                <GenericRowForm>
                    <GenericTextInput
                        label='Nombre Completo'
                        type='text'
                        register={register}
                        name='nombres'
                        errors={errors}
                        required
                    />
                    <GenericTextInput
                        label='Apellidos'
                        type='text'
                        register={register}
                        name='apellidos'
                        errors={errors}
                        required
                    />
                </GenericRowForm>
            )}
            {tipoPersonaProp === 'Empresa' && (
                <GenericTextInput
                    label='Razón Social'
                    type='text'
                    register={register}
                    name='razonSocial'
                    errors={errors}
                    required
                />
            )}

            <GenericTextInput
                label='Correo electrónico'
                type='email'
                register={register}
                name='email'
                errors={errors}
                required
            />
            <GenericRowForm>
                <GenericTextInput
                    label='Contraseña'
                    type='password'
                    register={register}
                    name='password'
                    errors={errors}
                    required
                />
                <GenericTextInput
                    label='Confirmar contraseña'
                    type='password'
                    register={register}
                    name='confirmPassword'
                    errors={errors}
                    required
                />
            </GenericRowForm>
            <GenericButton
                type='submit'
                text='Crear Cuenta'
                disabled={isSubmitting}
                onClick={e => {
                    e.preventDefault()
                    console.log('Submitting form')
                    handleSubmit(onSubmit)()
                    console.log('Form submitted')
                    console.log(form.formState.errors)
                }}
            />
            <div className=' text-center'>
                <p className='text-sm text-text'>
                    ¿Ya tienes una cuenta? <GenericLink to='/login' text='Inicia sesión aquí' />
                </p>
            </div>
        </>
    )
}
