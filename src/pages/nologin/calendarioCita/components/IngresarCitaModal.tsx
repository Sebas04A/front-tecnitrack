import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import GenericForm from '../../../../components/form/GenericForm'
import GenericTextInput from '../../../../components/form/Controls/GenericTextInput'
import GenericSelect from '../../../../components/form/Controls/GenericSelect'

import BaseModal from '../../../../components/common/modals/BaseModal'
import { useModalActions } from '../../../../hooks/useModalActions'

// import { crearCita } from '../../../../services/citasApi'
import { citaSchema } from '../../../../validation/cita.schema'

import { CitaResponse } from '../../../../api'
import { crearCita } from '../../../cliente/citas/services/citasClientesServices'

export default function IngresarCitaModal({
    isOpen,
    onClose,
    fecha,
}: {
    isOpen: boolean
    onClose: () => void
    fecha: string
}) {
    const {
        handleSubmit,
        register,
        // watch,
        control,
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

    // useEffect(() => {
    //     const fetchTiposMantenimiento = async () => {
    //         const response = await getTipoMantenimiento()
    //         response.push({ label: 'Otro', value: 'otro' })
    //     }
    //     fetchTiposMantenimiento()
    // }, [])

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title='Ingresar Turno'>
            <GenericForm
                onSubmit={handleSubmit(values => {
                    console.log('Formulario enviado', values)
                    onSubmit()
                })}
                title='Ingresar Turno'
                // error={error}
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
                    control={control}
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
