import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import GenericForm from '../../../components/form/GenericForm.tsx'
import GenericTextInput from '../../../components/form/Controls/GenericTextInput.tsx'
import GenericButton from '../../../components/form/Controls/GenericButton.tsx'
import GenericLink from '../../../components/form/Controls/GenericLink.tsx'

import { useModalActions } from '../../../hooks/useModalActions.tsx'
import { parseAxiosError } from '../../../utils/parseError.ts'

import { resetPasswordRequest } from './services/restablecerContraServices.ts'

import { ResetPasswordFormData, resetPasswordSchema } from './models/resetPassword.schema.ts'

export default function RestablecerContra() {
    const [token, setToken] = useState<string | null>(null)
    const [error, setError] = useState<string>('')

    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const t = params.get('token')
        if (!t) {
            setError('No se encontró un token válido en el enlace.')
        }
        setToken(t)
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ResetPasswordFormData>({
        resolver: yupResolver(resetPasswordSchema) as Resolver<ResetPasswordFormData>,
        mode: 'onChange',
        defaultValues: { password: '', confirmPassword: '' },
    })

    const modalActions = useModalActions()

    const onSubmit: SubmitHandler<ResetPasswordFormData> = async ({ password }) => {
        setError('')

        try {
            if (!token) throw new Error('Token inválido o ausente')
            const res = await resetPasswordRequest(token, password)
            modalActions.showConfirm({
                title: 'Éxito',
                message: res,
                onConfirm: () => navigate('/login'),
                confirmText: 'Ir a Iniciar Sesión',
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
                title='Restablecer contraseña'
                error={error}
            >
                <GenericTextInput
                    type='password'
                    label='Nueva contraseña'
                    name='password'
                    register={register}
                    errors={errors}
                />
                <GenericTextInput
                    type='password'
                    label='Confirmar contraseña'
                    name='confirmPassword'
                    register={register}
                    errors={errors}
                />
                <GenericButton
                    type='submit'
                    text='Guardar nueva contraseña'
                    disabled={isSubmitting}
                />
                <div className='text-center'>
                    <GenericLink to='/login' text='Volver a iniciar sesión' />
                </div>
            </GenericForm>
        </>
    )
}
