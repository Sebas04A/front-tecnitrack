import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { ProvinciaFormData } from '../../localidades.schema'
import GenericTextInput from '../../../../../../components/form/Controls/GenericTextInput'
import GenericSelect from '../../../../../../components/form/Controls/GenericSelect'
import { obtenerPaisesSelect } from '../../../../../../services/Select/localidadesSelectApi'

interface ProvinciasFormProps {
    register: UseFormRegister<ProvinciaFormData>
    errors: FieldErrors<ProvinciaFormData>
    readOnly?: boolean
    control: any
}

const ProvinciasForm: React.FC<ProvinciasFormProps> = ({ register, errors, readOnly, control }) => {
    return (
        <div className='grid gap-3'>
            <GenericSelect
                name='paisId'
                label='País'
                // register={register}
                // errors={errors}
                isReadOnly={readOnly}
                getOptions={obtenerPaisesSelect}
                control={control}
            />
            <GenericTextInput
                name='nombre'
                label='Nombre'
                register={register}
                errors={errors}
                isReadOnly={readOnly}
            />

            <GenericSelect
                name='activo'
                label='Activo'
                options={[
                    { label: 'Sí', value: 'true' },
                    { label: 'No', value: 'false' },
                ]}
                // register={register}

                // errors={errors}
                control={control}
                isReadOnly={readOnly}
            />
        </div>
    )
}

export default ProvinciasForm
