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

// const defaultValues = {
//     numeroTurno: 'TUR-000123',
//     fechaTurno: new Date().toISOString().slice(0, 16),
//     numeroIdentificacion: '1717171717',
//     nombreCompleto: 'Juan Perez',
//     direccion: 'Av. Siempre Viva 123',
//     telefono: '0999999999',
// }
export default function InformacionGeneral({
    // handleClose,
    change,
    N_ORDEN,
}: WindowProps & { change: () => void }) {
    const form = useForm({
        // defaultValues,
    })
    const {
        register,
        formState: { errors },
    } = form
    useEffect(() => {
        getInformacionGeneralOrden(N_ORDEN).then(data => {
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
            <GenericButton text='Siguiente' onClick={change} className='mt-4' />
        </GenericForm>
    )
}
