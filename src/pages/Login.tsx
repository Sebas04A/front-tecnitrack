import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GenericTextInput from '../components/form/Controls/GenericTextInput'
import GenericButton from '../components/form/Controls/GenericButton'
import GenericForm from '../components/form/GenericForm'
import GenericLink from '../components/form/Controls/GenericLink'
import { useAuth } from '../hooks/useAuth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { LoginFormData, loginSchema } from '../validation/login.schema'
import { GenericCheckbox } from '../components/form/Controls/GenericCheckbox'
import { parseAxiosError } from '../utils/parseError'

interface LoginProps {
    onLogin: () => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const { login } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        mode: 'onChange',
    })

    const [error, setError] = useState('')

    const onLoginClick = async (data: LoginFormData) => {
        console.log('Login data:', data)
        setError('')
        try {
            await login(data.email, data.password)
            onLogin()
            navigate('/')
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
        <>
            <GenericForm
                onSubmit={handleSubmit(onLoginClick, onError)}
                title='Iniciar Sesión'
                error={error}
            >
                <GenericTextInput
                    type='email'
                    label='Correo Electrónico'
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
                {/* <GenericCheckbox
                        label='Recordar Contraseña'
                        name='rememberMe'
                        register={register}
                    ></GenericCheckbox> */}

                <GenericButton type='submit' text='Continuar' disabled={isSubmitting} />
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
        </>
    )
}

export default Login
