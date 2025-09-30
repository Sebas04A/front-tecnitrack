import { yupResolver } from '@hookform/resolvers/yup'
import GenericSelect from '../../form/Controls/GenericSelect'
import GenericTextInput from '../../form/Controls/GenericTextInput'
import GenericRowForm from '../../form/GenericRowForm'
import {
    PerfilPersonaNaturalCrudData,
    PerfilPersonaNaturalData,
    personaNaturalCrudSchema,
    personaNaturalSchema,
} from '../../../validation/perfil.schema'
import { useForm } from 'react-hook-form'
import { FormProfileProps } from '../../../types/formsProfile'
import GenericForm from '../../form/GenericForm'
import FormsButtons from '../../form/formsButtons'
import { useEffect, useState } from 'react'
import GenericInput from '../../form/Controls/GenericInput'
import { parseAxiosError } from '../../../utils/parseError'
import {
    crearPerfilNaturaAdmin,
    updatePerfilNatural,
    updatePerfilNaturalAdmin,
} from '../../../services/perfilApi'
import { useModalActions } from '../../../hooks/useModalActions'
import { h3 } from 'framer-motion/client'

export default function PersonaNaturalForm({
    data,
    clienteId,
    // esCrud,
    estaEditando,
    changeEstaEditando,
    changeDirty,
    onDatosGuardados,
}: FormProfileProps & { data?: PerfilPersonaNaturalData | PerfilPersonaNaturalCrudData | null }) {
    const esCrud = clienteId !== undefined
    const resolver = esCrud
        ? (yupResolver(personaNaturalSchema) as any)
        : (yupResolver(personaNaturalCrudSchema) as any)

    if (esCrud) data = data as PerfilPersonaNaturalCrudData
    else data = data as PerfilPersonaNaturalData

    type Persona = PerfilPersonaNaturalData | PerfilPersonaNaturalCrudData
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        formState: { errors, isDirty, dirtyFields },
        handleSubmit,
        reset,
    } = useForm<Persona>({
        mode: 'onChange',
        resolver: resolver,
        defaultValues: {
            nombreCompleto: '',
            apellidoCompleto: '',
            tipoDocumento: '',
            numeroDocumento: '',
            fechaNacimiento: '',
            genero: '',
            email: '',
        },
    })

    useEffect(() => {
        console.log('Datos obtenidos desde padre:', data)
        let newData = data as Persona & { email?: string }
        data = {
            email: newData?.email || '',
            nombreCompleto: newData?.nombreCompleto || '',
            apellidoCompleto: newData?.apellidoCompleto || '',
            tipoDocumento: newData?.tipoDocumento || '',
            numeroDocumento: data?.numeroDocumento || '',
            fechaNacimiento: data?.fechaNacimiento || '',
            genero: data?.genero || '',
        }

        console.log('Reseteando formulario con datos:', data)
        reset(data, { keepDirty: false, keepTouched: false })
    }, [reset, data])

    const modalActions = useModalActions()
    const onSubmit = handleSubmit(async data => {
        const id = modalActions.showLoading('Enviando datos...')
        try {
            // Simular envío (reemplazar por llamada real a API)
            console.log('Datos enviados:', data)
            if (esCrud) {
                if (!clienteId) throw new Error('No se proporcionó clienteId en modo CRUD')
                if (clienteId === -1) {
                    console.log('Creando nuevo cliente, no se obtienen datos')
                    await crearPerfilNaturaAdmin(data as PerfilPersonaNaturalCrudData)
                } else {
                    console.log('Actualizando cliente existente, ID:', clienteId)
                    await updatePerfilNaturalAdmin(data as PerfilPersonaNaturalCrudData, clienteId)
                }
            } else {
                await updatePerfilNatural(data as PerfilPersonaNaturalData)
            }
            modalActions.closeModal(id)
            changeDirty(false)
            onDatosGuardados()
        } catch (e) {
            modalActions.closeModal(id)

            console.error('Error enviando Persona Natural:', e)
            const errorMessage = parseAxiosError(e)
            modalActions.showAlert({
                title: 'Error',
                message: errorMessage,
                type: 'error',
            })
        }
    })

    useEffect(() => {
        changeDirty(isDirty)
        console.log('isDirty changed:', isDirty)
        console.log('Dirty Fields:', dirtyFields)
    }, [isDirty, changeDirty])

    return (
        <>
            <GenericForm onSubmit={onSubmit} title='Información Personal'>
                {esCrud && <h3 className='text-primary text-xl'>Persona Natural</h3>}
                <GenericRowForm>
                    <GenericTextInput
                        label='Nombre Completo'
                        name='nombreCompleto'
                        type='text'
                        register={register}
                        errors={errors}
                        isReadOnly={!estaEditando}
                        required
                    />
                    <GenericTextInput
                        label='Apellido Completo'
                        name='apellidoCompleto'
                        type='text'
                        register={register}
                        errors={errors}
                        isReadOnly={!estaEditando}
                        required
                    />
                </GenericRowForm>
                <GenericRowForm>
                    <GenericSelect
                        label='Tipo de Documento'
                        name='tipoDocumento'
                        register={register}
                        errors={errors}
                        placeholderOptionLabel='Seleccione un tipo de documento'
                        tipoCatalogo='tipoDocumento'
                        isReadOnly={!estaEditando}
                        required
                    />
                    <GenericTextInput
                        label='Número de Documento'
                        name='numeroDocumento'
                        type='text'
                        register={register}
                        errors={errors}
                        isReadOnly={!estaEditando}
                        required
                    />
                </GenericRowForm>

                <GenericRowForm>
                    {esCrud && (
                        <GenericTextInput
                            label='Email'
                            name='email'
                            type='email'
                            register={register}
                            errors={errors}
                            isReadOnly={!estaEditando || clienteId !== -1}
                            mostrarEspacioError={true}
                            required
                        />
                    )}
                    <GenericInput
                        label='Fecha de Nacimiento'
                        name='fechaNacimiento'
                        type='date'
                        register={register}
                        error={errors.fechaNacimiento?.message}
                        isReadOnly={!estaEditando}
                        // required
                    />
                </GenericRowForm>
                <GenericInput
                    label='Género'
                    name='genero'
                    type='select'
                    register={register}
                    options={[
                        { value: '', label: 'Seleccione un género' },
                        { value: 'Masculino', label: 'Masculino' },
                        { value: 'Femenino', label: 'Femenino' },
                        { value: 'Otro', label: 'Otro' },
                    ]}
                    error={errors.genero?.message}
                    isReadOnly={!estaEditando}
                    // required
                />
                {estaEditando && (
                    <FormsButtons
                        onCancelar={() => {
                            console.log('Cancel clicked')
                            reset()
                            changeEstaEditando(false)
                        }}
                        onGuardar={onSubmit}
                    />
                )}
            </GenericForm>

            {/* Modal de envío controlado por ContainerForm */}
        </>
    )
}
