import React from 'react'
import DateTimeSelector from '../../../citas/DateTimeSelector'
import GenericSelect from '../../../form/Controls/GenericSelect'
import GenericTextInput from '../../../form/Controls/GenericTextInput'
import GenericDate from '../../../form/Controls/GenericDate'

export default function FormSinFecha({ register, errors, readOnly }: any) {
    return (
        <div>
            <div style={{ height: '16px' }}></div>
            <GenericSelect
                label='Usuario'
                name={`usuario`}
                isReadOnly={readOnly}
                register={register}
                errors={errors}
                tipoCatalogo='usuarios'
            />
            <GenericSelect
                label='Tipo de Mantenimiento'
                name={`tipoMantenimiento`}
                isReadOnly={readOnly}
                register={register}
                errors={errors}
                tipoCatalogo='tipoMantenimiento'
            />
            <GenericTextInput
                label='Otro'
                name='otro'
                isReadOnly={readOnly}
                type='text'
                register={register}
                errors={errors}
            />
            <GenericTextInput
                label='Descripción'
                name='descripcion'
                isReadOnly={readOnly}
                type='text'
                register={register}
                errors={errors}
            />
        </div>
    )
}
