import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { PaisFormData } from '../../../../../validation/localidades.schema'
import GenericSelect from '../../../../form/Controls/GenericSelect'
import GenericTextInput from '../../../../form/Controls/GenericTextInput'

interface PaisesFormProps {
    register: UseFormRegister<PaisFormData>
    errors: FieldErrors<PaisFormData>
    readOnly?: boolean
}

const PaisesForm: React.FC<PaisesFormProps> = ({ register, errors, readOnly }) => {
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
                register={register}
                errors={errors}
                isReadOnly={readOnly}
            />
        </div>
    )
}

export default PaisesForm
