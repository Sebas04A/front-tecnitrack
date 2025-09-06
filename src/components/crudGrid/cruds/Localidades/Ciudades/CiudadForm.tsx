// src/components/crud/Ciudades/CiudadesForm.tsx
import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { CiudadFormData } from '../../../../../validation/localidades.schema'
import GenericTextInput from '../../../../form/Controls/GenericTextInput'
import GenericSelect from '../../../../form/Controls/GenericSelect'
import GenericCheckbox from '../../../../form/Controls/GenericCheckbox'
import {
    obtenerPaisesSelect,
    obtenerProvinciasPorPaisSelect,
} from '../../../../../services/Select/localidadesSelectApi'

interface CiudadesFormProps {
    register: UseFormRegister<CiudadFormData>
    errors: FieldErrors<CiudadFormData>
    readOnly?: boolean
}

const CiudadesForm: React.FC<CiudadesFormProps> = ({ register, errors, readOnly }) => {
    const [provinciaId, setProvinciaId] = React.useState<number | null>(null)
    return (
        <div className='grid gap-3'>
            <GenericTextInput
                name='nombre'
                label='Nombre'
                register={register}
                errors={errors}
                isReadOnly={readOnly}
            />
            <GenericSelect
                name='paisId'
                value={provinciaId ?? undefined}
                label='País'
                onChange={e => {
                    const val = e.target.value ? parseInt(e.target.value) : null
                    setProvinciaId(val)
                }}
                getOptions={obtenerPaisesSelect}
            />

            {provinciaId && (
                <GenericSelect
                    name='provinciaId'
                    label='Provincia'
                    register={register}
                    errors={errors}
                    isReadOnly={readOnly}
                    getOptions={() => obtenerProvinciasPorPaisSelect(provinciaId || 0)}
                    refreshKey={[provinciaId]}
                />
            )}
            <GenericCheckbox
                name='esCapital'
                label='¿Es capital?'
                register={register}
                errors={errors}
                isReadOnly={readOnly}
            />

            <GenericCheckbox
                name='activo'
                label='¿Está activo?'
                register={register}
                errors={errors}
                isReadOnly={readOnly}
            />
        </div>
    )
}

export default CiudadesForm
