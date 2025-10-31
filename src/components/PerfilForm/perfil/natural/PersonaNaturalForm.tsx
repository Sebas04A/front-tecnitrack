import { useEffect, useState } from 'react'

import { AiOutlineEdit } from 'react-icons/ai'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import GenericTextInput from '../../../form/Controls/GenericTextInput'
import GenericRowForm from '../../../form/GenericRowForm'
import GenericForm from '../../../form/GenericForm'
import FormsButtons from '../../../form/formsButtons'
import GenericInput from '../../../form/Controls/GenericInput'
import GenericButton from '../../../form/Controls/GenericButton'
import GenericSelect from '../../../form/Controls/GenericSelect'

import { useModalActions } from '../../../../hooks/useModalActions'
import { parseAxiosError } from '../../../../utils/parseError'

import {
    PerfilPersonaNaturalCrudData,
    PerfilPersonaNaturalData,
    personaNaturalCrudSchema,
    personaNaturalSchema,
} from '../../../../validation/perfil.schema'

import { FormProfileProps } from '../../models/formsProfile'
import {
    crearPerfilNaturaAdmin,
    updatePerfilNatural,
    updatePerfilNaturalAdmin,
} from './services/personaNatural'

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
        control,
        reset,
    } = useForm<Persona>({
        mode: 'onChange',
        resolver: resolver,
        defaultValues: {
            nombreCompleto: '',
            apellidoCompleto: '',
            tipoIdentificacion: '',
            numeroIdentificacion: '',
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
            tipoIdentificacion: newData?.tipoIdentificacion || '',
            numeroIdentificacion: newData?.numeroIdentificacion || '',
            fechaNacimiento: newData?.fechaNacimiento || '',
            genero: newData?.genero || '',
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
            let clienteIdNuevo = clienteId ?? -1
            if (esCrud) {
                if (!clienteId) throw new Error('No se proporcionó clienteId en modo CRUD')
                if (clienteId === -1) {
                    console.log('Creando nuevo cliente, no se obtienen datos')
                    clienteIdNuevo = await crearPerfilNaturaAdmin(
                        data as PerfilPersonaNaturalCrudData
                    )
                } else {
                    console.log('Actualizando cliente existente, ID:', clienteId)
                    clienteIdNuevo = await updatePerfilNaturalAdmin(
                        data as PerfilPersonaNaturalCrudData,
                        clienteId
                    )
                }
            } else {
                await updatePerfilNatural(data as PerfilPersonaNaturalData)
            }
            modalActions.closeModal(id)
            changeDirty(false)

            onDatosGuardados(clienteIdNuevo)
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
            <GenericForm onSubmit={onSubmit}>
                <GenericRowForm>
                    <GenericTextInput
                        label='Tipo de Persona'
                        name='tipoPersona'
                        value={'Persona Natural'}
                        type='text'
                        isReadOnly={true}
                        mostrarEspacioError={true}
                        className='min-w-[20ch] max-w-[20ch]'
                    />
                    <GenericTextInput
                        label='Nombre Completo'
                        name='nombreCompleto'
                        type='text'
                        register={register}
                        errors={errors}
                        isReadOnly={!estaEditando}
                        required
                        mostrarEspacioError={true}
                        className='min-w-[30ch] max-w-[30ch]'
                    />
                    <GenericTextInput
                        label='Apellido Completo'
                        name='apellidoCompleto'
                        type='text'
                        register={register}
                        errors={errors}
                        isReadOnly={!estaEditando}
                        required
                        mostrarEspacioError={true}
                    />

                    {/* <div className='flex-1'></div> */}
                </GenericRowForm>
                {/* {esCrud && <h3 className='text-primary text-xl'>Persona Natural</h3>} */}

                <GenericRowForm>
                    <GenericSelect
                        label='Tipo de Documento'
                        name='tipoIdentificacion'
                        control={control}
                        placeholderOptionLabel='Seleccione un tipo de documento'
                        tipoCatalogo='tipoDocumento'
                        isReadOnly={!estaEditando}
                        required
                        mostrarEspacioError={true}
                        className='min-w-[20ch] max-w-[20ch]'
                    />
                    <GenericTextInput
                        label='Número de Documento'
                        name='numeroIdentificacion'
                        type='text'
                        register={register}
                        errors={errors}
                        isReadOnly={!estaEditando}
                        required
                        mostrarEspacioError={true}
                        className='min-w-[30ch] max-w-[30ch]'
                    />
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
                </GenericRowForm>
                <GenericRowForm>
                    <GenericSelect
                        label='Género'
                        name='genero'
                        control={control}
                        placeholderOptionLabel='Seleccione un género'
                        isReadOnly={!estaEditando}
                        mostrarEspacioError={true}
                        tipoCatalogo='genero'
                        className='min-w-[20ch] max-w-[20ch]'
                    />
                    <GenericInput
                        label='Fecha de Nacimiento'
                        name='fechaNacimiento'
                        type='date'
                        register={register}
                        error={errors.fechaNacimiento?.message}
                        isReadOnly={!estaEditando}
                        mostrarEspacioError={true}
                        // required
                        className='min-w-[20ch] max-w-[20ch]'
                    />
                </GenericRowForm>

                {estaEditando ? (
                    <FormsButtons
                        onCancelar={() => {
                            console.log('Cancel clicked')
                            reset()
                            changeEstaEditando(false)
                        }}
                        onGuardar={onSubmit}
                    />
                ) : (
                    <GenericButton
                        // <button
                        text='Editar'
                        icon={<AiOutlineEdit className='size-5' />}
                        type='button'
                        onClick={() => changeEstaEditando(true)}
                        className='max-w-xs self-end mt-4'
                        // className='flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm text-white bg-primary-auto hover:bg-secondary-light transition-all duration-300 shadow-md hover:shadow-lg'
                    />

                    // </GenericButton>
                    // </button>
                )}
            </GenericForm>

            {/* Modal de envío controlado por ContainerForm */}
        </>
    )
}
