import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { set, SubmitHandler, useForm } from 'react-hook-form'
import { RegisterFormData, registerSchema } from '../validation/register.schema'
import { parseAxiosError } from '../utils/parseError'
import GenericForm from '../components/form/GenericForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import GenericTextInput from '../components/form/Controls/GenericTextInput'
import GenericButton from '../components/form/Controls/GenericButton'
import ModalConfirmarEmail from '../components/registro/ModalConfirmarEmail'
import { useModal } from '../hooks/useModal'
import GenericLink from '../components/form/Controls/GenericLink'

export default function Register() {
    const { signup } = useAuth() // asumiendo que AuthContext expone signup
    const navigate = useNavigate()
    // const intl = useIntl()

    const [error, setError] = useState('')

    const {
        register,
        handleSubmit,
        // watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        mode: 'onChange',
        defaultValues: {
            email: 'testing@example.com',
            password: 'Password*123',
            confirmPassword: 'Password*123',
        },
        resolver: yupResolver(registerSchema), // si usas yup
    })

    const onSubmit: SubmitHandler<RegisterFormData> = async ({ email, password }) => {
        setError('')
        try {
            await signup(email, password)
            openModal()
            reset()
            navigate('/login', { replace: true })
        } catch (err: unknown) {
            const message = parseAxiosError(err)
            console.error('Error during registration:', message)
            setError(message)
            // toast.error(message)
        }
    }

    const { isOpen, openModal, closeModal } = useModal()

    return (
        <>
            <GenericForm
                onSubmit={handleSubmit(onSubmit)}
                error={error}
                title='Regístrate para continuar'
            >
                <GenericTextInput
                    label='Correo electrónico'
                    type='email'
                    register={register}
                    name='email'
                    errors={errors}
                />
                <GenericTextInput
                    label='Contraseña'
                    type='password'
                    register={register}
                    name='password'
                    errors={errors}
                />
                <GenericTextInput
                    label='Confirmar contraseña'
                    type='password'
                    register={register}
                    name='confirmPassword'
                    errors={errors}
                />
                <GenericButton type='submit' text='Crear Cuenta' disabled={isSubmitting} />
                <div className=' text-center'>
                    <p className='text-sm text-text'>
                        ¿Ya tienes una cuenta? <GenericLink to='/login' text='Inicia sesión aquí' />
                    </p>
                </div>
            </GenericForm>
            <ModalConfirmarEmail isOpen={isOpen} closeModal={closeModal} openModal={openModal} />
        </>
    )
}
