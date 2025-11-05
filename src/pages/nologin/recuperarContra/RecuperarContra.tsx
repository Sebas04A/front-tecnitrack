import { useState } from 'react'

import GenericForm from '../../../components/form/GenericForm.tsx'
import GenericTextInput from '../../../components/form/Controls/GenericTextInput.tsx'
import GenericButton from '../../../components/form/Controls/GenericButton.tsx'
import GenericLink from '../../../components/form/Controls/GenericLink.tsx'

import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { parseAxiosError } from '../../../utils/parseError.ts'
import { useModalActions } from '../../../hooks/useModalActions.tsx'

import { ForgotPasswordFormData, forgotPasswordSchema } from './models/recover.schema.ts'
import { solicitarRestablecimiento } from './services/recuperarContraService.ts'

export default function RecuperarContra() {
    const [error, setError] = useState<string>('')

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ForgotPasswordFormData>({
        resolver: yupResolver(forgotPasswordSchema) as Resolver<ForgotPasswordFormData>,
        mode: 'onChange',
    })

    const modalActions = useModalActions()

    const onSubmit: SubmitHandler<ForgotPasswordFormData> = async ({ email }) => {
        setError('')

        try {
            const res = await solicitarRestablecimiento(email)

            modalActions.showAlert({
                title: 'Correcto',
                message:
                    res.message ||
                    'Se ha enviado un enlace de restablecimiento a su correo electrónico.',
                type: 'success',
            })

            reset()
        } catch (err) {
            setError(parseAxiosError(err))
        }
    }

    return (
        <>
            <GenericForm
                onSubmit={handleSubmit(onSubmit)}
                title='Recuperar contraseña'
                error={error}
            >
                <GenericTextInput
                    type='email'
                    label='Correo electrónico'
                    name='email'
                    register={register}
                    errors={errors}
                />
                <GenericButton type='submit' text='Enviar enlace' disabled={isSubmitting} />
                <div className='flex justify-between'>
                    <GenericLink to='/login' text='Volver a iniciar sesión' />
                    <GenericLink to='/register' text='Crear cuenta' />
                </div>
            </GenericForm>
        </>
    )
}
