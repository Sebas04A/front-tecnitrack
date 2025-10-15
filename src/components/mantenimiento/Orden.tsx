import React, { useEffect } from 'react'
import { get, useForm } from 'react-hook-form'
import GenericForm from '../form/GenericForm'
import GenericTextInput from '../form/Controls/GenericTextInput'
import GenericDate from '../form/Controls/GenericDate'
import GenericRowForm from '../form/GenericRowForm'
import GenericTextarea from '../form/Controls/GenericTextArea'
import GenericSelect from '../form/Controls/GenericSelect'
import GenericSelectSearch, { FetchFunction } from '../form/Controls/GenericSelectSearch'
import { useAuth } from '../../hooks/useAuth'
import { buscarUsuario } from '../../services/SelectSearch'
import { WindowProps } from './MantenimientoIngreso'
import { getInformacionOrden, postOrden } from '../../services/ORDEN/ordenApi'
import { yupResolver } from '@hookform/resolvers/yup'
import { OrderFormData, orderValidationSchema } from '../../validation/IngresoOrden/orden'
import { getInspectoresSearch } from '../../services/Select/usuariosSearch'
import { Option } from '../../types/form'
import { getInformacionUsuarioActual } from '../../services/ORDEN/informacionApi'
import { useModalActions } from '../../hooks/useModalActions'
import { citaSchema } from '../../validation/cita.schema'

// const defaultValues = {
//     registradoPor: '',
//     numeroOrden: 'Cargando...',
//     fechaIngreso: 'Cargando...',
// }
const defaultValues = {
    numeroOrden: 'Cargando...',
    fechaIngreso: '',
    registradoPor: '',
    inspeccionadoPor: null, // O '', dependiendo de cómo manejes los valores
    tallerBodegaDestino: null, // O ''
    observacionesIngreso: '',
}

export default function Orden({ handleClose, handleSave, N_ORDEN, orden }: WindowProps) {
    const auth = useAuth()
    const [nombreUsuario, setNombreUsuario] = React.useState<string>('Cargando...')

    defaultValues.registradoPor = auth.user?.usuario || 'Usuario'
    console.log({ defaultValues })
    const form = useForm({
        defaultValues,
        resolver: yupResolver(orderValidationSchema),
    })
    const modal = useModalActions()

    const { register, handleSubmit, reset } = form
    const onSubmit = (data: OrderFormData) => {
        console.log('GUARDANDO DATA', data)
        if (!orden.idOrden) throw new Error('La orden no tiene un ID válido')
        const idLoading = modal.showLoading('Guardando Orden...')
        try {
            const res = postOrden(data, orden.idOrden)
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
                title: 'Error',
                message: 'Ocurrió un error al guardar la orden. Por favor, inténtelo de nuevo.',
                type: 'error',
            })
            return
        }

        handleSave()
    }

    useEffect(() => {
        // const user = auth.user?.usuario
        // buscarUsuario(user!).then(res => {
        //     console.log({ res })
        // })
        // reset({ ...defaultValues })
    }, [auth.user])

    function onCancel() {
        // reset({ ...defaultValues })
        handleClose()
    }
    async function fetchData() {
        const nombreLogeado = await getInformacionUsuarioActual()
        console.log('Usuario logeado', nombreLogeado)
        setNombreUsuario(nombreLogeado?.nombre ?? 'No identificado')
        return nombreLogeado?.nombre ?? 'No identificado'
    }

    useEffect(() => {
        getInformacionOrden(orden.idOrden!)
            .then(data => {
                if (!data) throw new Error('No se encontraron datos de la orden')
                console.log('DataObtenida', { data })
                data.fechaIngreso = new Date().toISOString().slice(0, 16)
                console.log('DataObtenida despues de setear fecha', { data })
                if (!data.registradoPor)
                    fetchData().then(nombre => {
                        data.registradoPor = nombre

                        reset({ ...data })
                    })
                reset({
                    ...data,
                })
                // data.fechaIngreso = new Date().toISOString().slice(0, 16)
                // fetchData().then(nombre => {
                //     console.log('Usuario logeado', nombre)
                //     if (data.registradoPor === null) data.registradoPor = 'No identificado'
                //     // reset({ numeroOrden: data.numeroOrden ?? "No" })
                //     reset({
                //         numeroOrden: data.numeroOrden ?? 'No encontrado',
                //         fechaIngreso: data.fechaIngreso,
                //         registradoPor: nombre,
                //         tallerBodegaDestino: data.tallerBodegaDestino ?? null,
                //         observacionesIngreso: data.observacionesIngreso ?? '',
                //     })
                // })
            })
            .catch(error => {
                console.error('Error al obtener la orden:', error)
                if (error instanceof Error && error.message === 'Orden no encontrada') {
                    const data: OrderFormData = { ...defaultValues }
                    data.fechaIngreso = new Date().toUTCString().slice(0, 16) //cambiar
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
            showButtons={true}
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
                />
                <GenericSelect
                    label='Taller/Bodega'
                    control={form.control}
                    name='tallerBodegaDestino'
                    tipoCatalogo='tallerBodega'
                />
            </GenericRowForm>
            <GenericTextarea
                label='Observaciones del Ingreso'
                register={register}
                errors={form.formState.errors}
                name='observacionesIngreso'
            />
        </GenericForm>
    )
}
