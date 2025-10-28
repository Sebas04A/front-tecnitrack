import { useEffect } from 'react'
import GenericForm from '../../form/GenericForm'

import GenericTextInput from '../../form/Controls/GenericTextInput'
import GenericDate from '../../form/Controls/GenericDate'
import GenericRowForm from '../../form/GenericRowForm'
import GenericSection from '../../form/GenericSection'

import { useForm } from 'react-hook-form'
import { WindowProps } from '../MantenimientoIngreso'
import GenericButton from '../../form/Controls/GenericButton'
import { getInformacionGeneralOrden } from '../../../services/ORDEN/informacionApi'

export default function InformacionGeneral({
    // handleClose,
    change,
    orden,
}: WindowProps & { change: () => void }) {
    const form = useForm({
        // defaultValues,
    })
    const {
        register,
        formState: { errors },
    } = form
    useEffect(() => {
        if (!orden.idCita) {
            console.error('La orden no tiene un ID de cita válido')
            return
        }
        getInformacionGeneralOrden(orden.idCita).then(data => {
            form.reset(data)
        })
    }, [])
    return (
        <GenericForm title='Informacion General'>
            <GenericSection title='Turno'>
                <GenericRowForm>
                    <GenericTextInput
                        label='N° Turno'
                        placeholder='Ingrese el N° de Turno'
                        register={register}
                        name='numeroTurno'
                        isReadOnly={true}
                        errors={errors}
                    />
                    <GenericDate
                        inputType='datetime-local'
                        label='Fecha Turno'
                        placeholder='Ingrese la Fecha de Turno'
                        register={register}
                        name='fechaTurno'
                        isReadOnly={true}
                        errors={errors}
                    />
                </GenericRowForm>
            </GenericSection>
            <GenericSection title='Cliente'>
                <GenericRowForm>
                    <GenericTextInput
                        label='RUC/Cédula'
                        placeholder='Ingrese su RUC/Cédula'
                        register={register}
                        name='numeroIdentificacion'
                        isReadOnly={true}
                        errors={errors}
                    />
                    <GenericTextInput
                        label='Nombre Completo'
                        placeholder='Ingrese su Nombre Completo'
                        register={register}
                        name='nombreCompleto'
                        isReadOnly={true}
                        errors={errors}
                    />
                </GenericRowForm>
                <GenericRowForm>
                    <GenericTextInput
                        label='Direccion'
                        placeholder='Ingrese la Direccion'
                        register={register}
                        name='direccion'
                        isReadOnly={true}
                        errors={errors}
                    />
                    <GenericTextInput
                        label='Telefono'
                        placeholder='Ingrese el Telefono'
                        register={register}
                        name='telefono'
                        isReadOnly={true}
                        errors={errors}
                    />
                </GenericRowForm>
            </GenericSection>

            <div className='flex justify-end'>
                <GenericButton text='Siguiente' onClick={change} className='mt-4 ' />
            </div>
            {/* <GenericButton text='Siguiente' onClick={change} className='mt-4 ' /> */}
        </GenericForm>
    )
}
