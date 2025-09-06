import { yupResolver } from '@hookform/resolvers/yup'
import GenericSelect from '../../form/Controls/GenericSelect'
import GenericTextInput from '../../form/Controls/GenericTextInput'
import GenericRowForm from '../../form/GenericRowForm'
import { PerfilPersonaNaturalData, personaNaturalSchema } from '../../../validation/perfil.schema'
import { useForm } from 'react-hook-form'
import { FormProfileProps } from '../../../types/formsProfile'
import GenericForm from '../../form/GenericForm'
import FormsButtons from '../../form/formsButtons'
import { useEffect, useState } from 'react'
import GenericInput from '../../form/Controls/GenericInput'
import { ClientesService } from '../../../api'
import { parseAxiosError } from '../../../utils/parseError'
import {
    createPerfilNatural,
    getPerfilNatural,
    updatePerfilNatural,
} from '../../../services/perfilApi'

export default function PersonaNaturalForm({
    data,
    esNuevo,
    estaEditando,
    changeEstaEditando,
    changeDirty,
    onDatosGuardados,
    onSubmitStart,
    onSubmitError,
    onLoadStart,
    onLoadEnd,
}: FormProfileProps & { data?: PerfilPersonaNaturalData | null; esNuevo: boolean }) {
    const {
        register,
        formState: { errors, isDirty, dirtyFields },
        handleSubmit,
        reset,
    } = useForm<PerfilPersonaNaturalData>({
        mode: 'onChange',
        resolver: yupResolver(personaNaturalSchema),
        defaultValues: {
            nombreCompleto: '',
            apellidoCompleto: '',
            tipoDocumento: '',
            numeroDocumento: '',
            fechaNacimiento: '',
            genero: '',
        },
    })

    useEffect(() => {
        console.log('Datos obtenidos desde padre:', data)

        data = {
            nombreCompleto: data?.nombreCompleto || '',
            apellidoCompleto: data?.apellidoCompleto || '',
            tipoDocumento: data?.tipoDocumento || '',
            numeroDocumento: data?.numeroDocumento || '',
            fechaNacimiento: data?.fechaNacimiento || '',
            genero: data?.genero || '',
        }
        console.log('Reseteando formulario con datos:', data)
        reset(data, { keepDirty: false, keepTouched: false })
    }, [reset, data])

    const onSubmit = handleSubmit(async data => {
        try {
            onSubmitStart && onSubmitStart()
            // Simular envío (reemplazar por llamada real a API)
            console.log('Datos enviados:', data)
            if (esNuevo) {
                await createPerfilNatural(data)
            } else {
                await updatePerfilNatural(data)
            }

            changeDirty(false)
            onDatosGuardados()
        } catch (e) {
            console.error('Error enviando Persona Natural:', e)
            const errorMessage = parseAxiosError(e)
            onSubmitError && onSubmitError(errorMessage)
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
                    <GenericInput
                        label='Fecha de Nacimiento'
                        name='fechaNacimiento'
                        type='date'
                        register={register}
                        error={errors.fechaNacimiento?.message}
                        isReadOnly={!estaEditando}
                        required
                    />
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
                        required
                    />
                </GenericRowForm>
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
