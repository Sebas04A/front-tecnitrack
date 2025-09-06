import React, { useState } from 'react'
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
                await crearCita({ ...values, fechaHoraInicio: fecha })
                modal.closeModal(id)
                modal.showAlert({
                    title: 'Cita creada',
                    message: 'La cita ha sido creada exitosamente.',
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

    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            title='Ingresar Cita'
            onSubmit={onSubmit}
            onCancel={onClose}
            submitText='Guardar'
            isSubmitting={status === 'loading'}
        >
            <GenericForm
                onSubmit={handleSubmit(values => {
                    console.log('Formulario enviado', values)
                    // onClose()
                })}
                title='Ingresar Cita'
                error={error}
            >
                <GenericTextInput
                    label='Descripción'
                    name='descripcion'
                    register={register}
                    errors={errors}
                    isReadOnly={false}
                    type='text'
                />
                {/* Grupo exclusivo: solo una opción */}
                <GenericSection title='Tipo de Mantenimiento'>
                    <GenericExclusiveCheckboxGroup
                        name='tipoMantenimiento'
                        options={[
                            { label: 'Preventivo', value: 'preventivo' },
                            { label: 'Correctivo', value: 'correctivo' },
                        ]}
                        register={register}
                        errors={errors}
                    />
                    <GenericTextInput
                        label='Otro'
                        name='otro'
                        register={register}
                        errors={errors}
                        isReadOnly={false}
                        type='text'
                    />
                </GenericSection>
            </GenericForm>
        </FormModal>
    )
}
