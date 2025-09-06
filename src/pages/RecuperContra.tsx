import { useState } from 'react'
import GenericForm from '../components/form/GenericForm'
import GenericTextInput from '../components/form/Controls/GenericTextInput'
import GenericButton from '../components/form/Controls/GenericButton'
import GenericLink from '../components/form/Controls/GenericLink'
import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AutenticacionService } from '../api'
import { parseAxiosError } from '../utils/parseError'
import { ForgotPasswordFormData, forgotPasswordSchema } from '../validation/recover.schema'
import { Modal } from '../components/common/Modal.tsx'

export default function RecuperContra() {
    const [error, setError] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ForgotPasswordFormData>({
        resolver: yupResolver(forgotPasswordSchema) as Resolver<ForgotPasswordFormData>,
        mode: 'onChange',
    })

    const onSubmit: SubmitHandler<ForgotPasswordFormData> = async ({ email }) => {
        setError('')
        setMessage('')
        try {
            await AutenticacionService.postApiAutenticacionSolicitarRestablecimiento({
                requestBody: { email },
            })
            setMessage(
                'Si el correo existe en nuestro sistema, te enviaremos un enlace para restablecer tu contraseña.'
            )
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
            <Modal isOpen={!!message} onClose={() => setMessage('')} title='Éxito'>
                {message && <p className=' text-center'>{message}</p>}
            </Modal>
        </>
    )
}
