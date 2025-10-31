import React from 'react'
import { useForm } from 'react-hook-form'

import { useModalActions } from '../../../hooks/useModalActions'

import GenericForm from '../../form/GenericForm'
import GenericTextarea from '../../form/Controls/GenericTextArea'

import { EquipoSection } from './InformacionEquipo/components/InformacionEquipo'
import { WindowProps } from '../MantenimientoIngreso'
import {
    getInformacionActivo,
    getInformacionActivoAsignado,
    postActivo,
    postActivoNuevo,
    updateActivo,
} from './services/activoApi'

export default function FormularioEquipo({
    handleClose,
    handleSave,
    estaEditando,
    orden,
    readOnly,
}: WindowProps) {
    // const [confirmoEditar, setConfirmoEditar] = React.useState(false)
    const form = useForm()
    const { register, handleSubmit, watch } = form

    React.useEffect(() => {
        getInformacionActivoAsignado(orden.id!).then(data => {
            console.log('Activo asociado a la orden:', data)
            console.log(data.nombreComercial)
            form.reset(data)
            setTimeout(() => form.reset({ ...data }), 1000) // pequeño retardo para evitar que se sobreescriba al seleccionar equipo
            setBlockForm(false)
        })
    }, [])

    const equipoSeleccionado = watch('equipo')
    React.useEffect(() => {
        console.log('Equipo seleccionado:', equipoSeleccionado)
        if (equipoSeleccionado) {
            // bloquear el formulario si hay un equipo seleccionado
            getInformacionActivo(equipoSeleccionado).then(data => {
                console.log('Activo Seleccionado:', { data })
                form.reset({ ...data, equipo: equipoSeleccionado })
                setTimeout(() => form.reset({ equipo: equipoSeleccionado, ...data }), 1000) // pequeño retardo para evitar que se sobreescriba al seleccionar equipo
                setBlockForm(true)
            })
        }
    }, [equipoSeleccionado])

    const modalActions = useModalActions()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (estaEditando) {
            modalActions.showConfirm({
                title: 'Confirmar Edición',
                message:
                    'Está a punto de editar un activo ya asignado a una orden. ¿Desea continuar?',
                onConfirm: () => {
                    // setConfirmoEditar(true)
                    submit(e)
                },
                onCancel: () => {
                    return form.reset()
                },
                type: 'warning',
            })
        } else {
            submit(e)
        }
    }
    const submit = handleSubmit(async data => {
        console.log({ equipoSeleccionado })
        console.log('data a submit', data)
        if (!orden || !orden.id) throw new Error('No se recibió orden id en FormularioEquipo')

        const id = modalActions.showLoading('Guardando Activo...')
        try {
            if (data.equipo) {
                if (estaEditando) {
                    let res = await updateActivo(data, orden.id!)
                } else {
                    let res = await postActivo(data, orden.id!)
                }
                // handleSave()
            } else {
                if (estaEditando) {
                }
                postActivoNuevo(data, orden.id!)
            }
            modalActions.closeModal(id)
            modalActions.showAlert({
                title: 'Éxito',
                message: 'El activo se ha guardado correctamente.',
                type: 'success',
            })
            handleSave()
        } catch (error) {
            modalActions.closeModal(id)
            console.error('Error al guardar el activo:', error)
            modalActions.showAlert({
                title: 'Error',
                message: `No se pudo guardar el activo. ${error}`,
                type: 'error',
            })
        }
    })
    const onCancel = () => {
        // form.reset()
        handleClose()
    }

    const [blockForm, setBlockForm] = React.useState(false)

    return (
        <>
            <GenericForm
                showButtons={!readOnly}
                onSubmit={onSubmit}
                onCancel={onCancel}
                title='Informacion Equipo'
            >
                <EquipoSection
                    estaEditando={estaEditando}
                    form={form}
                    blockForm={blockForm}
                    ordenId={orden.id ?? -1}
                    readOnly={readOnly}
                />
                <GenericTextarea
                    label='Accesorios'
                    placeholder='Ingrese los Accesorios'
                    register={register}
                    name='accesorios'
                    isReadOnly={readOnly}
                />
            </GenericForm>

            {/* <InspeccionForm /> */}
        </>
    )
}
