import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import GenericTextInput from '../components/form/Controls/GenericTextInput'
import GenericButton from '../components/form/Controls/GenericButton'
import GenericForm from '../components/form/GenericForm'
import GenericLink from '../components/form/Controls/GenericLink'
import { useAuth } from '../hooks/useAuth'
import { LoginFormData, loginSchema } from '../validation/login.schema'
import { parseAxiosError } from '../utils/parseError'
import { Resolver, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import GenericCheckbox from '../components/form/Controls/GenericCheckbox'

interface LoginProps {
    onLogin: () => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation() as { state?: any }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema) as Resolver<LoginFormData>,
        mode: 'onChange',
    })

    const interno = watch('interno', false)
    useEffect(() => {
        handleSubmit(() => {})(/* no-op */)
    }, [interno])

    const [error, setError] = useState('')

    const onLoginClick = async (data: LoginFormData) => {
        setError('')
        try {
            if (!data.email || !data.password) {
                setError('Email and password are required')
                return
            }
            await login(data.email, data.password, data.interno)
            onLogin()
            const returnTo = location.state?.returnTo || (data.interno ? '/interno' : '/')
            const citaSeleccionada = location.state?.citaSeleccionada
            console.log('Navigating to:', returnTo, 'with state:', { citaSeleccionada })
            navigate(returnTo, {
                replace: true,
                state: citaSeleccionada ? { citaSeleccionada } : undefined,
            })
        } catch (err: any) {
            // console.error('Login error:', err)
            const error = parseAxiosError(err)
            console.error('Login error:', error)
            setError(error)
        } finally {
            // setSubmitting(false)
        }
    }
    const onError = (errors: any) => {
        setError(errors.email?.message || errors.password?.message || 'Login failed')
        console.error('Form errors:', errors)
    }

    return (
        <div className='max-w-md mx-auto'>
            <GenericForm title='Iniciar Sesión' error={error}>
                <GenericTextInput
                    type='text'
                    label={interno ? 'Usuario' : 'Correo electrónico'}
                    name='email'
                    register={register}
                    errors={errors}
                />
                <GenericTextInput
                    type='password'
                    label='Contraseña'
                    name='password'
                    register={register}
                    errors={errors}
                />
                <GenericCheckbox
                    label='Usuario Interno'
                    name='interno'
                    register={register}
                    errors={errors}
                />

                <GenericButton
                    type='submit'
                    text='Continuar'
                    disabled={isSubmitting}
                    onClick={handleSubmit(onLoginClick, onError)}
                />
                <div className='flex  justify-center '>
                    <GenericLink
                        to='/forgotpassword'
                        text='Olvidaste tu contraseña?'
                        className='text-center'
                    ></GenericLink>
                </div>
            </GenericForm>
            <div className='mt-4 text-center'>
                <p className='text-sm text-text'>
                    ¿No tienes una cuenta? <GenericLink to='/register' text='Regístrate aquí' />
                </p>
            </div>
        </div>
    )
}

export default Login
