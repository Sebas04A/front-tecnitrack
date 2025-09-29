import React, { useEffect, useState } from 'react'
import { Modal } from '../common/Modal'
import { useForm } from 'react-hook-form'
import GenericForm from '../form/GenericForm'
import GenericRowForm from '../form/GenericRowForm'
import GenericExclusiveCheckboxGroup from '../form/Controls/GenericExclusiveCheckboxGroup'
import GenericTextInput from '../form/Controls/GenericTextInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { useModal } from '../../hooks/useModal'
import { crearCita } from '../../services/citasApi'
import { citaSchema } from '../../validation/cita.schema'
import GenericSection from '../form/GenericSection'
import BaseModal from '../common/modals/BaseModal'
import FormModal from '../common/modals/FormModal'
import { useModalActions } from '../../hooks/useModalActions'
import { form } from 'framer-motion/client'
import { CitaResponse } from '../../api'
import GenericSelect from '../form/Controls/GenericSelect'
import { getCatalogo } from '../../services/catalogos'

export default function IngresarCitaModal({
    isOpen,
    onClose,
    fecha,
}: {
    isOpen: boolean
    onClose: () => void
    fecha: string
}) {
    console.log('Fecha seleccionada:', fecha)
    const [error, setError] = useState('')
    const {
        handleSubmit,
        register,
        // watch,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(citaSchema),
        defaultValues: {
            tipoMantenimiento: undefined,
            otro: '',
            descripcion: '',
        },
    })
    const modal = useModalActions()

    function onSubmit() {
        handleSubmit(async values => {
            console.log('Formulario enviado', values)
            const id = modal.showLoading('Creando cita...')
            try {
                const dataCreada: CitaResponse = await crearCita({
                    ...values,
                    fechaHoraInicio: fecha,
                })
                modal.closeModal(id)
                console.log('Cita creada:', dataCreada)
                modal.showAlert({
                    title: 'Cita creada Exitosamente',
                    message: `Cita creada: ${dataCreada.numeroCita} a las ${dataCreada.fechaHora}`,
                    type: 'success',
                })
                onClose()
            } catch (error) {
                modal.closeModal(id)
                modal.showAlert({
                    title: 'Error al crear cita',
                    message: error instanceof Error ? error.message : 'Error al crear la cita',
                    type: 'error',
                })
            }
        })()
    }
    const [tiposMantenimiento, setTiposMantenimiento] = useState<
        Array<{ label: string; value: string }>
    >([])
    useEffect(() => {
        const fetchTiposMantenimiento = async () => {
            const response = await getCatalogo('tipoMantenimiento')
            response.push({ label: 'Otro', value: 'otro' })
            setTiposMantenimiento(response)
        }
        fetchTiposMantenimiento()
    }, [])

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title='Ingresar Turno'
            // onSubmit={onSubmit}
            // onCancel={onClose}
            // submitText='Guardar'
            // isSubmitting={status === 'loading'}
        >
            <GenericForm
                onSubmit={handleSubmit(values => {
                    console.log('Formulario enviado', values)
                    onSubmit()
                })}
                title='Ingresar Turno'
                error={error}
                showButtons={true}
                onCancel={onClose}
                // onSubmit={onSubmit}
                // submitText='Guardar'
            >
                {/* Grupo exclusivo: solo una opción */}
                {/* <GenericSection title='Tipo de Mantenimiento'> */}
                {/* <GenericExclusiveCheckboxGroup
                    name='tipoMantenimiento'
                    options={tiposMantenimiento}
                    register={register}
                    errors={errors}
                /> */}
                <GenericSelect
                    label='Tipo de Mantenimiento'
                    name='tipoMantenimiento'
                    register={register}
                    errors={errors}
                    tipoCatalogo='tipoMantenimiento'
                    placeholderOptionLabel='Seleccione el tipo de mantenimiento'
                    required
                />

                {/* {watch('tipoMantenimiento') === 'otro' && (
                    <GenericTextInput
                        label='Otro'
                        name='otro'
                        register={register}
                        errors={errors}
                        type='text'
                    />
                )} */}
                {/* </GenericSection> */}
                <GenericTextInput
                    label='Descripción'
                    name='descripcion'
                    register={register}
                    errors={errors}
                    isReadOnly={false}
                    type='text'
                />
            </GenericForm>
        </BaseModal>
    )
}
