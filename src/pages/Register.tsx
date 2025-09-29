import { useAuth } from '../hooks/useAuth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RegisterFormData, registerSchema } from '../validation/register.schema'
import { parseAxiosError } from '../utils/parseError'
import GenericForm from '../components/form/GenericForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import GenericTextInput from '../components/form/Controls/GenericTextInput'
import GenericButton from '../components/form/Controls/GenericButton'
import GenericLink from '../components/form/Controls/GenericLink'
import { useModalActions } from '../hooks/useModalActions'
import GenericRowForm from '../components/form/GenericRowForm'
import GenericSelect from '../components/form/Controls/GenericSelect'

export default function Register() {
    const { signup } = useAuth() // asumiendo que AuthContext expone signup
    // const intl = useIntl()

    const [error, setError] = useState('')
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        mode: 'onChange',

        resolver: yupResolver(registerSchema), // si usas yup
    })

    const onSubmit: SubmitHandler<RegisterFormData> = async data => {
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
    const tipoPersona = watch('tipoCliente')
    useEffect(() => {
        if (tipoPersona === 'Empresa') {
            setValue('tipoIdentificacion', 'RUC')
        }
    }, [tipoPersona])

    return (
        <>
            <GenericForm
                onSubmit={e => {
                    e.preventDefault()
                    console.log(getValues())
                    console.log(errors)
                    handleSubmit(onSubmit)()
                }}
                error={error}
                title='Regístrate para continuar'
            >
                <GenericSelect
                    label='Tipo de Persona'
                    register={register}
                    name='tipoCliente'
                    errors={errors}
                    tipoCatalogo='tipoCliente'
                    loadingLabel='Cargando...'
                    required
                />
                <GenericRowForm>
                    <GenericSelect
                        label='Tipo de Identificación'
                        register={register}
                        name='tipoIdentificacion'
                        errors={errors}
                        tipoCatalogo='tipoDocumento'
                        loadingLabel='Cargando...'
                        isReadOnly={tipoPersona === 'Empresa'}
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
                {tipoPersona === 'Natural' && (
                    <GenericRowForm>
                        <GenericTextInput
                            label='Nombre Completo'
                            type='text'
                            register={register}
                            name='nombreCompleto'
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
                {tipoPersona === 'Empresa' && (
                    <GenericTextInput
                        label='Nombre Comercial'
                        type='text'
                        register={register}
                        name='nombreCompleto'
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
                <GenericButton type='submit' text='Crear Cuenta' disabled={isSubmitting} />
                <div className=' text-center'>
                    <p className='text-sm text-text'>
                        ¿Ya tienes una cuenta? <GenericLink to='/login' text='Inicia sesión aquí' />
                    </p>
                </div>
            </GenericForm>
        </>
    )
}
