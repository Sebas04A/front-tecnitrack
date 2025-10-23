import React, { useEffect } from 'react'
import GenericForm from '../../form/GenericForm'
import GenericTextInput from '../../form/Controls/GenericTextInput'
import { useForm } from 'react-hook-form'
import GenericRowForm from '../../form/GenericRowForm'
import GenericSelectSearch from '../../form/Controls/GenericSelectSearch'
import GenericSection from '../../form/GenericSection'
import GenericButton from '../../form/Controls/GenericButton'
import { FaPlus } from 'react-icons/fa'
import GenericTextarea from '../../form/Controls/GenericTextArea'
import GenericSelect from '../../form/Controls/GenericSelect'
import InspeccionForm from '../Inspeccion/InspeccionForm'
import { EquipoSection } from './InformacionEquipo/InformacionEquipo'
import { WindowProps } from '../MantenimientoIngreso'
import {
    getInformacionActivo,
    getInformacionActivoAsignado,
    getObtenerActivoOrden,
    postActivo,
    postActivoNuevo,
} from './services/activoApi'
import { th } from 'framer-motion/client'
import { useModalActions } from '../../../hooks/useModalActions'
import { useModal } from '../../../hooks/useModal'

export default function FormularioEquipo({
    handleClose,
    handleSave,
    estaEditando,
    orden,
    readOnly,
}: WindowProps) {
    const form = useForm()
    const [confirmoEditar, setConfirmoEditar] = React.useState(false)
    const { register, handleSubmit, watch } = form
    const equipoSeleccionado = watch('equipo')
    React.useEffect(() => {
        getInformacionActivoAsignado(orden.id!).then(data => {
            console.log('Activo asociado a la orden:', data)
            console.log(data.nombreComercial)
            form.reset(data)
            setTimeout(() => form.reset({ ...data }), 1000) // pequeño retardo para evitar que se sobreescriba al seleccionar equipo
            setBlockForm(false)
        })
    }, [])
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
        if (estaEditando && !confirmoEditar) {
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
    const submit = handleSubmit(data => {
        console.log({ equipoSeleccionado })
        console.log('data a submit', data)
        if (!orden || !orden.id) throw new Error('No se recibió orden id en FormularioEquipo')
        const id = modalActions.showLoading('Guardando Activo...')
        try {
            if (data.equipo) {
                postActivo(data, orden.id!)
                handleSave()
            } else {
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
                showButtons={true}
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
