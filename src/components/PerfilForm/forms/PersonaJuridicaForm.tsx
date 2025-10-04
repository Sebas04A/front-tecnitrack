import GenericSection from '../../form/GenericSection'
import GenericRowForm from '../../form/GenericRowForm'
import GenericTextInput from '../../form/Controls/GenericTextInput'
import { Resolver, useForm, useWatch } from 'react-hook-form'
import {
    PerfilEmpresaCrudData,
    PerfilEmpresaData,
    personaJuridicaCrudSchema,
    personaJuridicaSchema,
} from '../../../validation/perfil.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProfileProps } from '../../../types/formsProfile'
import GenericForm from '../../form/GenericForm'
import { useEffect } from 'react'
import {
    crearPerfilJuridico,
    crearPerfilJuridicoAdmin,
    updatePerfilJuridico,
    updatePerfilJuridicoAdmin,
} from '../../../services/perfilApi'
import { useAuth } from '../../../hooks/useAuth'
import FormsButtons from '../../form/formsButtons'
import { useModalActions } from '../../../hooks/useModalActions'

export default function PersonaJuridicaForm({
    estaEditando,
    onDatosGuardados,
    changeEstaEditando,
    changeDirty,
    // onSubmitStart,
    // onSubmitError,
    // onLoadStart,
    // onLoadEnd,
    data,
    clienteId,
}: FormProfileProps & { data?: PerfilEmpresaData | null }) {
    const esCrud = clienteId !== undefined
    const { user } = useAuth()
    console.log('Usuario en PersonaJuridicaForm:', user)
    console.log(user?.usuario)

    type Persona = PerfilEmpresaData | PerfilEmpresaCrudData
    const resolver = esCrud
        ? (yupResolver(personaJuridicaCrudSchema) as any)
        : (yupResolver(personaJuridicaSchema) as any)

    const {
        register,
        formState: { errors, isDirty, dirtyFields },
        handleSubmit,
        reset,
        control,
    } = useForm<Persona>({
        mode: 'onChange',
        resolver: yupResolver(personaJuridicaSchema) as Resolver<Persona>,
        defaultValues: {
            emailEmpresa: esCrud ? '' : user?.usuario,
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
            emailEmpresa: data?.emailEmpresa ?? esCrud ? '' : user?.usuario ?? '',
            emailSecundario: data?.emailSecundario ?? '',
            telefonoSecundario: data?.telefonoSecundario ?? '',
            nombreRepresentanteLegal: data?.nombreRepresentanteLegal ?? '',
        }
        console.log('Cargando defaults en PersonaJuridicaForm:', defaults)

        reset(defaults, { keepDirty: false, keepTouched: false })
    }, [reset, data])

    const modalActions = useModalActions()

    const onSubmit = handleSubmit(async data => {
        console.log('Datos enviados:', data)
        const id = modalActions.showLoading('Enviando datos...')
        let res: number
        try {
            try {
                if (clienteId === undefined || clienteId === -1) {
                    if (esCrud) res = await crearPerfilJuridicoAdmin(data)
                    else res = await crearPerfilJuridico(data)
                } else {
                    if (esCrud) res = await updatePerfilJuridicoAdmin(data, clienteId)
                    else res = await updatePerfilJuridico(data)
                }
            } catch (e) {
                const errorMessage =
                    e instanceof Error ? e.message : 'Error con el servidor al enviar datos'
                console.error('Error enviando Persona Juridica:', errorMessage)
                modalActions.closeModal(id)
                modalActions.showAlert({
                    title: 'Error',
                    message: errorMessage,
                    type: 'error',
                })
                return
            }
            console.log('Datos enviados:', data)
            modalActions.closeModal(id)
            // Si todo ok
            changeDirty(false)
            onDatosGuardados(res)
        } catch (e) {
            modalActions.closeModal(id)
            console.error('Error enviando Persona Natural:', e)
            modalActions.showAlert({
                title: 'Error',
                message: e instanceof Error ? e.message : 'Error con el servidor al enviar datos',
                type: 'error',
            })
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
                    label='Tipo de Persona'
                    name='tipoPersona'
                    value={'Persona Jurídica'}
                    type='text'
                    isReadOnly={true}
                    mostrarEspacioError={true}
                    className='min-w-[20ch] max-w-[20ch]'
                    // className='max-w-xs'
                />
                <GenericTextInput
                    label='RUC'
                    name='RUC'
                    type='text'
                    register={register}
                    errors={errors}
                    placeholder='Ingresa tu RUC'
                    className='min-w-[20ch] max-w-[20ch]'
                    isReadOnly={!estaEditando}
                    required
                />
                <GenericTextInput
                    label='Razón Social'
                    name='razonSocial'
                    type='text'
                    register={register}
                    errors={errors}
                    className='min-w-[40ch] '
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
                    className='min-w-[20ch] max-w-[20ch] flex-1'
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
                        isReadOnly={!estaEditando || !esCrud}
                        mostrarEspacioError={true}
                        required
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
                        // onSubmit()
                    }}
                />
            )}
        </GenericForm>
    )
}
