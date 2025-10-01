import React from 'react'
import DateTimeSelector from '../../../citas/DateTimeSelector'
import GenericSelect from '../../../form/Controls/GenericSelect'
import GenericTextInput from '../../../form/Controls/GenericTextInput'
import GenericDate from '../../../form/Controls/GenericDate'
import GenericSelectSearch from '../../../form/Controls/GenericSelectSearch'
import { buscarUsuario } from '../../../../services/SelectSearch'
import GenericForm from '../../../form/GenericForm'

export default function FormCitas({ form, readOnly }: any) {
    console.log('Valores del formulario en FormCitas:', form.getValues())

    const tipoMantenimiento = form.watch('tipoMantenimiento')
    console.log('Tipo Mantenimiento observado:', tipoMantenimiento)

    return (
        <>
            {/* <GenericForm> */}
            <GenericDate
                label='Fecha y Hora de la Cita'
                name='fechaHoraInicio'
                inputType='datetime-local'
                isReadOnly={true}
                register={form.register}
                errors={form.formState.errors}
                // value={formatDate(fecha)}
            />
            <div style={{ height: '16px' }}></div>
            <GenericSelect
                label='Tipo de Mantenimiento'
                name={`tipoMantenimiento`}
                isReadOnly={readOnly}
                register={form.register}
                errors={form.formState.errors}
                tipoCatalogo='tipoMantenimiento'
                loadingLabel='Cargando...'
                watch={form.watch}
            />
            {tipoMantenimiento === 'Otro' && (
                <GenericTextInput
                    label='Otro'
                    name='otro'
                    isReadOnly={readOnly}
                    type='text'
                    register={form.register}
                    errors={form.formState.errors}
                />
            )}
            <GenericTextInput
                label='Descripción'
                name='descripcion'
                isReadOnly={readOnly}
                type='text'
                register={form.register}
                errors={form.formState.errors}
            />
            <GenericSelectSearch
                label='Cliente'
                name='usuario'
                control={form.control}
                fetchOptions={async query => {
                    const response = await buscarUsuario(query)
                    return response.map(user => ({
                        value: user.id ?? -1,
                        label: user.nombreCompleto + ' - ' + user.numeroIdentificacion,
                    }))
                }}
                minSearchLength={2}
                debounceMs={1000}
                isReadOnly={readOnly}
            />

            {/* </GenericForm> */}
        </>
    )
}
