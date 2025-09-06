import GenericSection from '../../form/GenericSection'
import GenericRowForm from '../../form/GenericRowForm'
import GenericTextInput from '../../form/Controls/GenericTextInput'
import { Resolver, useForm, useWatch } from 'react-hook-form'
import { PerfilEmpresaData, personaJuridicaSchema } from '../../../validation/perfil.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProfileProps } from '../../../types/formsProfile'
import GenericForm from '../../form/GenericForm'
import GenericButton from '../../form/Controls/GenericButton'
import { useEffect, useState } from 'react'
import {
    crearPerfilJuridico,
    getPerfilJuridico,
    updatePerfilJuridico,
} from '../../../services/perfilApi'
import { useAuth } from '../../../hooks/useAuth'
import FormsButtons from '../../form/formsButtons'

export default function PersonaJuridicaForm({
    estaEditando,
    onDatosGuardados,
    changeEstaEditando,
    changeDirty,
    onSubmitStart,
    onSubmitError,
    onLoadStart,
    onLoadEnd,
    data,
    esNuevo,
}: FormProfileProps & { data?: PerfilEmpresaData | null }) {
    const { user } = useAuth()
    console.log('Usuario en PersonaJuridicaForm:', user)
    console.log(user?.usuario)
    const {
        register,
        formState: { errors, isDirty, dirtyFields },
        handleSubmit,
        reset,
        control,
    } = useForm<PerfilEmpresaData>({
        mode: 'onChange',
        resolver: yupResolver(personaJuridicaSchema) as Resolver<PerfilEmpresaData>,
        defaultValues: {
            emailEmpresa: user?.usuario,
        },
    })
    const values = useWatch({ control })
    useEffect(() => {
        const defaults: PerfilEmpresaData = {
            RUC: data?.RUC ?? '',
            razonSocial: data?.razonSocial ?? '',
            nombreComercial: data?.nombreComercial ?? '',
            numeroSucursal: data?.numeroSucursal ?? '',
            nombreSucursal: data?.nombreSucursal ?? '',
            telefonoEmpresa: data?.telefonoEmpresa ?? '',
            emailEmpresa: data?.emailEmpresa ?? user?.usuario ?? '',
            emailSecundario: data?.emailSecundario ?? '',
            telefonoSecundario: data?.telefonoSecundario ?? '',
            nombreRepresentanteLegal: data?.nombreRepresentanteLegal ?? '',
        }
        console.log('Cargando defaults en PersonaJuridicaForm:', defaults)

        reset(defaults, { keepDirty: false, keepTouched: false })
    }, [reset, data])

    const onSubmit = handleSubmit(async data => {
        console.log('Datos enviados:', data)
        try {
            onSubmitStart && onSubmitStart()
            try {
                if (esNuevo) {
                    await crearPerfilJuridico(data)
                } else {
                    await updatePerfilJuridico(data)
                }
            } catch (e) {
                const errorMessage =
                    e instanceof Error ? e.message : 'Error con el servidor al enviar datos'
                console.error('Error enviando Persona Juridica:', errorMessage)
            }
            console.log('Datos enviados:', data)
            // Si todo ok
            changeDirty(false)
            onDatosGuardados()
        } catch (e) {
            console.error('Error enviando Persona Natural:', e)
            onSubmitError && onSubmitError()
        }
    })
    useEffect(() => {
        console.log('isDirty:', isDirty)
        console.log('dirtyFields:', dirtyFields)
        console.log('current values:', values)
        console.log('defaultValues:')
    }, [isDirty, dirtyFields, values])
    return (
        <GenericForm onSubmit={onSubmit} title='Información de la Empresa'>
            <GenericRowForm>
                <GenericTextInput
                    label='RUC'
                    name='RUC'
                    type='text'
                    register={register}
                    errors={errors}
                    className='min-w-[14ch]'
                    isReadOnly={!estaEditando}
                    required
                />
                <GenericTextInput
                    label='Razón Social'
                    name='razonSocial'
                    type='text'
                    register={register}
                    errors={errors}
                    className='min-w-[40ch]'
                    isReadOnly={!estaEditando}
                    required
                />
                <GenericTextInput
                    label='Nombre Comercial'
                    name='nombreComercial'
                    type='text'
                    register={register}
                    errors={errors}
                    className='min-w-[30ch]'
                    isReadOnly={!estaEditando}
                    required
                />
                <GenericTextInput
                    label='Nombre del Representante Legal'
                    name='nombreRepresentanteLegal'
                    type='text'
                    register={register}
                    errors={errors}
                    className='min-w-[30ch]'
                    isReadOnly={!estaEditando}
                    required
                />
            </GenericRowForm>

            <GenericRowForm>
                <GenericTextInput
                    label='Número de la Sucursal'
                    name='numeroSucursal'
                    type='text'
                    register={register}
                    errors={errors}
                    className=' min-w-[10ch] flex-1'
                    isReadOnly={!estaEditando}
                />
                <GenericTextInput
                    label='Nombre de la Sucursal'
                    name='nombreSucursal'
                    type='text'
                    register={register}
                    errors={errors}
                    className='min-w-[20ch] flex-[3_1_auto]'
                    isReadOnly={!estaEditando}
                />
            </GenericRowForm>
            <GenericSection title='Contacto de la Empresa'>
                <GenericRowForm>
                    <GenericTextInput
                        label='Teléfono Principal'
                        name='telefonoEmpresa'
                        type='text'
                        register={register}
                        errors={errors}
                        isReadOnly={!estaEditando}
                        required
                    />
                    <GenericTextInput
                        label='Correo Electrónico Principal'
                        name='emailEmpresa'
                        type='email'
                        register={register}
                        errors={errors}
                        isReadOnly={true}
                    />
                </GenericRowForm>
                <GenericRowForm>
                    <GenericTextInput
                        label='Teléfono Secundario'
                        name='telefonoSecundario'
                        type='text'
                        register={register}
                        errors={errors}
                        isReadOnly={!estaEditando}
                    />
                    <GenericTextInput
                        label='Correo Electrónico Secundario'
                        name='emailSecundario'
                        type='email'
                        register={register}
                        errors={errors}
                        isReadOnly={!estaEditando}
                    />
                </GenericRowForm>
            </GenericSection>
            {estaEditando && (
                <FormsButtons
                    onCancelar={() => {
                        console.log('Cancel clicked')
                        reset()
                        changeEstaEditando(false)
                    }}
                    onGuardar={() => {
                        console.log('Guardar clicked')
                        console.log(errors)
                        onSubmit()
                    }}
                />
            )}
        </GenericForm>
    )
}
