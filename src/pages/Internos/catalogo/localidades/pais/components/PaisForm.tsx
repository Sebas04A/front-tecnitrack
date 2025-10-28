import { FieldErrors, UseFormRegister } from 'react-hook-form'

import GenericSelect from '../../../../../../components/form/Controls/GenericSelect'
import GenericTextInput from '../../../../../../components/form/Controls/GenericTextInput'

import { PaisFormData } from '../models/paises.schema'

interface PaisesFormProps {
    register: UseFormRegister<PaisFormData>
    errors: FieldErrors<PaisFormData>
    readOnly?: boolean
    control?: any
}

const PaisesForm: React.FC<PaisesFormProps> = ({ register, errors, control, readOnly }) => {
    console.log('Errores en el formulario de Países:', errors)
    console.log('Campos del formulario de Países:', register)
    console.log('Campos ReadOnly:', readOnly)
    return (
        <div className='grid gap-3'>
            {/* Textos */}
            <GenericTextInput
                name='nombre'
                label='Nombre'
                register={register}
                errors={errors}
                isReadOnly={readOnly}
            />
            <GenericTextInput
                name='codigoISO'
                label='Código ISO'
                register={register}
                errors={errors}
                isReadOnly={readOnly}
            />
            <GenericTextInput
                name='codigoTelefonico'
                label='Código Telefónico'
                register={register}
                errors={errors}
                isReadOnly={readOnly}
            />

            {/* Select para activo (true/false) */}
            <GenericSelect
                name='activo'
                label='Activo'
                options={[
                    { label: 'Sí', value: 'true' },
                    { label: 'No', value: 'false' },
                ]}
                control={control}
                isReadOnly={readOnly}
            />
        </div>
    )
}

export default PaisesForm
