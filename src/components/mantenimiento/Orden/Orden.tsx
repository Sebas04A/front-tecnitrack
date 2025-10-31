import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import GenericForm from '../../form/GenericForm'
import GenericTextInput from '../../form/Controls/GenericTextInput'
import GenericDate from '../../form/Controls/GenericDate'
import GenericRowForm from '../../form/GenericRowForm'
import GenericTextarea from '../../form/Controls/GenericTextArea'
import GenericSelect from '../../form/Controls/GenericSelect'
import GenericSelectSearch, { FetchFunction } from '../../form/Controls/GenericSelectSearch'

import { useAuth } from '../../../hooks/useAuth'

import { WindowProps } from '../MantenimientoIngreso'
import {
    getInformacionOrden,
    getInformacionUsuarioActual,
    postOrden,
    updateOrden,
} from './services/ordenApi'

import { OrderFormData, orderValidationSchema } from './models/orden'
import { getInspectoresSearch } from '../../../services/Select/usuariosSearch'
import { Option } from '../../../types/form'

import { useModalActions } from '../../../hooks/useModalActions'
import { citaSchema } from '../../../validation/cita.schema'
import { convertirDateParaInput, obtenerDateActualEnEcuador } from '../../../adapters/fecha'

const defaultValues = {
    numeroOrden: 'Cargando...',
    fechaIngreso: '',
    registradoPor: '',
    inspeccionadoPor: null, // O '', dependiendo de cómo manejes los valores
    tallerBodegaDestino: null, // O ''
    observacionesIngreso: '',
}

export default function Orden({
    handleClose,
    handleSave,
    orden,
    readOnly,
    estaEditando,
}: WindowProps) {
    const auth = useAuth()

    defaultValues.registradoPor = auth.user?.usuario || 'Usuario'

    const form = useForm({
        defaultValues,
        resolver: yupResolver(orderValidationSchema),
    })
    const { register, handleSubmit, reset } = form

    const modal = useModalActions()

    const onSubmit = async (data: OrderFormData) => {
        console.log('GUARDANDO DATA', data)
        if (!orden.id) throw new Error('La orden no tiene un ID válido')
        const idLoading = modal.showLoading('Guardando Orden...')
        try {
            let res
            if (estaEditando) {
                res = await updateOrden(data, orden.id)
            } else {
                res = await postOrden(data, orden.id)
            }

            modal.closeModal(idLoading)
            modal.showAlert({
                title: 'Éxito',
                message: 'La orden se ha guardado correctamente.',
                type: 'success',
            })
        } catch (error) {
            console.error('Error al guardar la orden:', error)
            modal.closeModal(idLoading)
            modal.showAlert({
                title: 'Error al Guardar la Orden',
                message: error instanceof Error ? error.message : 'Error desconocido',
                type: 'error',
            })
            return
        }

        handleSave()
    }

    function onCancel() {
        // reset({ ...defaultValues })
        handleClose()
    }
    async function fetchData() {
        const nombreLogeado = await getInformacionUsuarioActual()
        console.log('Usuario logeado', nombreLogeado)
        // setNombreUsuario(nombreLogeado?.nombre ?? 'No identificado')
        return nombreLogeado?.nombre ?? 'No identificado'
    }

    useEffect(() => {
        getInformacionOrden(orden.id!)
            .then(data => {
                if (!data) throw new Error('No se encontraron datos de la orden')
                console.log('DataObtenida', { data })
                const dateActual = obtenerDateActualEnEcuador()
                console.log('Fecha actual Ecuador', dateActual)
                data.fechaIngreso = convertirDateParaInput(dateActual)

                if (!data.registradoPor)
                    fetchData().then(nombre => {
                        data.registradoPor = nombre

                        reset({ ...data })
                    })
                console.log('Resetear formulario con data:', data)
                reset({
                    ...data,
                })
            })
            .catch(error => {
                console.error('Error al obtener la orden:', error)
                if (error instanceof Error && error.message === 'Orden no encontrada') {
                    const data: OrderFormData = { ...defaultValues }
                    const dateActual = obtenerDateActualEnEcuador()
                    console.log('Fecha actual Ecuador', dateActual)
                    data.fechaIngreso = convertirDateParaInput(dateActual)
                    fetchData().then(nombre => {
                        console.log('Usuario logeado', nombre)
                        if (data.registradoPor === null) data.registradoPor = 'No identificado'
                        // reset({ numeroOrden: data.numeroOrden ?? "No" })
                        reset({
                            numeroOrden: orden.numeroOrden ?? 'No encontrado',
                            fechaIngreso: data.fechaIngreso,
                            registradoPor: nombre,
                            tallerBodegaDestino: data.tallerBodegaDestino ?? null,
                            observacionesIngreso: data.observacionesIngreso ?? '',
                        })
                    })
                } else {
                }
            })
    }, [])

    const fetchInspectores: FetchFunction = async (query, signal) => {
        const res = await getInspectoresSearch(query)
        if (!res) return []
        const options: Option[] = res?.map(catalogo => {
            const informacion = catalogo.nombreCompleto + ' - ' + catalogo.numeroIdentificacion
            if (!catalogo.id) return { label: 'No definido', value: '-1' }
            return { label: informacion, value: String(catalogo.id) }
        })
        return options
    }

    return (
        <GenericForm
            showButtons={!readOnly}
            onSubmit={handleSubmit(onSubmit)}
            title='Orden'
            onCancel={onCancel}
        >
            <GenericRowForm>
                <GenericTextInput
                    label='Número de Orden'
                    register={register}
                    errors={form.formState.errors}
                    name='numeroOrden'
                    isReadOnly={true}
                />
                <GenericDate
                    inputType='datetime-local'
                    label='Fecha de Ingreso'
                    register={register}
                    errors={form.formState.errors}
                    name='fechaIngreso'
                    isReadOnly={true}
                />
                <GenericTextInput
                    label='Registrado Por'
                    register={register}
                    errors={form.formState.errors}
                    name='registradoPor'
                    // options={[{ label: 'Sebastian Arcentales', value: 'Sebastian Arcentales' }]}
                    isReadOnly={true}
                />
            </GenericRowForm>
            <GenericRowForm>
                <GenericSelectSearch<OrderFormData>
                    label='Inspector Asignado'
                    control={form.control}
                    name='inspeccionadoPor'
                    fetchOptions={fetchInspectores}
                    selectedLabel={form.getValues('inspeccionadoPor') as unknown as string}
                    isReadOnly={readOnly}
                    mostrarEspacioError={!readOnly}
                />
                <GenericSelect
                    label='Taller/Bodega'
                    control={form.control}
                    name='tallerBodegaDestino'
                    tipoCatalogo='tallerBodega'
                    isReadOnly={readOnly}
                />
            </GenericRowForm>
            <GenericTextarea
                label='Observaciones del Ingreso'
                register={register}
                errors={form.formState.errors}
                name='observacionesIngreso'
                isReadOnly={readOnly}
            />
        </GenericForm>
    )
}
